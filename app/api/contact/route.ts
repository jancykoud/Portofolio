import { Resend } from "resend";
import { z } from "zod";
import { clientIp, isSameOrigin, rateLimit } from "@/lib/ai/rate-limit";
import { SITE } from "@/content/site";
import { SUBJECTS, SUBJECT_IDS } from "@/content/contact";

export const dynamic = "force-dynamic";

const Schema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(100),
  email: z.email("Adresse e-mail invalide").max(200),
  company: z.string().trim().max(120).optional().default(""),
  subject: z.enum(SUBJECT_IDS).default("autre"),
  message: z.string().trim().min(10, "Message trop court (10 caractères minimum)").max(3000),
  website: z.string().max(0).optional().default(""), // honeypot
  startedAt: z.number().int().positive(),
});

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function json(body: unknown, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  if (!isSameOrigin(req)) return json({ error: "forbidden" }, 403);

  const limited = rateLimit(`contact:${clientIp(req.headers)}`, { limit: Number(process.env.CONTACT_RATE_LIMIT) || 5, windowMs: 10 * 60_000 });
  if (!limited.ok) return json({ error: "rate_limited", message: "Trop d'envois rapprochés. Réessayez dans quelques minutes." }, 429);

  let data: z.infer<typeof Schema>;
  try {
    const parsed = Schema.safeParse(await req.json());
    if (!parsed.success) {
      const fields = Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message]));
      if (fields.website !== undefined) return json({ ok: true }, 200); // bot: pretend success
      return json({ error: "invalid", fields }, 400);
    }
    data = parsed.data;
  } catch {
    return json({ error: "invalid" }, 400);
  }

  // Filled in under 2.5 s: almost certainly automated.
  if (Date.now() - data.startedAt < 2500) return json({ ok: true }, 200);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return json(
      { error: "not_configured", message: `L'envoi de formulaire n'est pas encore activé. Écrivez directement à ${SITE.email}.` },
      503,
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || SITE.email;
  const from = process.env.CONTACT_FROM_EMAIL || "KOUD Portfolio <onboarding@resend.dev>";
  const subjectLabel = SUBJECTS.find((x) => x.id === data.subject)?.label ?? data.subject;
  const fields: [string, string][] = [
    ["Nom", data.name],
    ["E-mail", data.email],
    ...(data.company ? ([["Organisation", data.company]] as [string, string][]) : []),
    ["Sujet", subjectLabel],
  ];

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `[Portfolio] ${subjectLabel} — ${data.name}`,
      text: `${fields.map(([k, v]) => `${k} : ${v}`).join("\n")}\n\n${data.message}`,
      html: `<div style="font-family:system-ui,sans-serif;line-height:1.5">${fields
        .map(([k, v]) => `<p style="margin:0 0 4px"><strong>${k} :</strong> ${escape(v)}</p>`)
        .join("")}<hr/><p style="white-space:pre-wrap">${escape(data.message)}</p></div>`,
    });
    if (error) throw new Error(error.message);
  } catch (e) {
    console.error("[contact] send failed", e);
    return json({ error: "send_failed", message: `L'envoi a échoué. Vous pouvez écrire directement à ${SITE.email}.` }, 502);
  }

  return json({ ok: true }, 200);
}
