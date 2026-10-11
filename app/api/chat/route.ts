import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { getSystemPrompt } from "@/lib/ai/knowledge";
import { clientIp, isSameOrigin, rateLimit } from "@/lib/ai/rate-limit";

export const dynamic = "force-dynamic";

const MODEL = process.env.KOUD_AI_MODEL || "claude-opus-5-5";

const BodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(1200),
      }),
    )
    .min(1)
    .max(24),
});

function json(body: unknown, status: number, headers?: HeadersInit) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

/** Lets the widget show an honest status before anyone types. */
export function GET() {
  return json({ configured: Boolean(process.env.ANTHROPIC_API_KEY), model: process.env.ANTHROPIC_API_KEY ? MODEL : null }, 200);
}

export async function POST(req: Request) {
  if (!isSameOrigin(req)) return json({ error: "forbidden" }, 403);
  if (!process.env.ANTHROPIC_API_KEY) return json({ error: "not_configured" }, 503);

  const ip = clientIp(req.headers);
  const perIp = rateLimit(`chat:${ip}`, { limit: 10, windowMs: 5 * 60_000 });
  const global = rateLimit("chat:global", { limit: 300, windowMs: 60 * 60_000 });
  if (!perIp.ok || !global.ok) {
    const retryAfter = !perIp.ok ? perIp.retryAfter : !global.ok ? global.retryAfter : 60;
    return json({ error: "rate_limited", retryAfter }, 429, { "Retry-After": String(retryAfter) });
  }

  let body: z.infer<typeof BodySchema>;
  try {
    body = BodySchema.parse(await req.json());
  } catch {
    return json({ error: "invalid_request" }, 400);
  }

  // Keep the last 12 turns, starting on a user turn and ending on one.
  let messages = body.messages.slice(-12);
  while (messages.length && messages[0]!.role !== "user") messages = messages.slice(1);
  if (!messages.length || messages.at(-1)!.role !== "user") return json({ error: "invalid_request" }, 400);

  const client = new Anthropic();
  const encoder = new TextEncoder();

  let stream;
  try {
    stream = client.beta.messages.stream(
      {
        model: MODEL,
        max_tokens: 1500,
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
        output_config: { effort: "low" },
        system: [{ type: "text", text: getSystemPrompt(), cache_control: { type: "ephemeral" } }],
        messages,
      },
      { signal: req.signal },
    );
  } catch (error) {
    console.error("[koud-ai] stream init failed", error);
    return json({ error: "upstream" }, 502);
  }

  const body$ = new ReadableStream<Uint8Array>({
    async start(controller) {
      let sent = false;
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            sent = true;
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal" && !sent) {
          controller.enqueue(encoder.encode("Je ne peux pas répondre à cette demande. Pour toute question sur le parcours ou les projets de Jancy, je reste à votre disposition."));
        } else if (final.stop_reason === "max_tokens") {
          controller.enqueue(encoder.encode("…"));
        }
      } catch (error) {
        if (error instanceof Anthropic.RateLimitError) {
          controller.enqueue(encoder.encode(`${sent ? "\n\n" : ""}KOUD AI est très sollicité en ce moment. Réessayez dans une minute.`));
        } else if (!(error instanceof Anthropic.APIUserAbortError)) {
          console.error("[koud-ai] stream failed", error);
          controller.enqueue(encoder.encode(`${sent ? "\n\n" : ""}La réponse a été interrompue. Réessayez, ou écrivez directement via la page /contact.`));
        }
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body$, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
