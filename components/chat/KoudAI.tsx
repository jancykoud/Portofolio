"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUp, Maximize2, Minimize2, RotateCcw, Square, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { RichText } from "./RichText";
import { useChat } from "./useChat";
import { cn } from "@/lib/utils";
import { Orb } from "./shared";
import { useDict, useLocale } from "@/lib/i18n/client";
import { href } from "@/lib/i18n/routing";

type PanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  question: string | null;
  onQuestionTaken: () => void;
  returnFocusTo: React.RefObject<HTMLButtonElement | null>;
};

/** Full assistant panel — loaded on demand by KoudAILauncher. */
export default function KoudAIPanel({ open, onOpenChange: setOpen, question, onQuestionTaken, returnFocusTo }: PanelProps) {
  const locale = useLocale();
  const t = useDict().chat;
  const [expanded, setExpanded] = useState(false);
  const [input, setInput] = useState("");
  const { messages, status, pending, error, send, stop, reset, checkStatus } = useChat(t.errors);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const queued = useRef<string | null>(null);

  useEffect(() => {
    if (!question) return;
    queued.current = question;
    onQuestionTaken();
  }, [question, onQuestionTaken]);

  useEffect(() => {
    if (!open) return;
    if (status === "checking") void checkStatus();
    if (status === "ready" && queued.current) {
      void send(queued.current);
      queued.current = null;
    }
  }, [open, status, checkStatus, send]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const submit = (text: string) => {
    if (!text.trim() || status !== "ready") return;
    void send(text);
    setInput("");
  };

  const statusLabel = t.status[status];

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>

      <Dialog.Portal>
        <Dialog.Overlay className={cn("fixed inset-0 z-[60] bg-black/50", !expanded && "sm:bg-black/20")} />
        <Dialog.Content
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            inputRef.current?.focus();
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            returnFocusTo.current?.focus();
          }}
          className={cn(
            "fixed z-[70] flex flex-col overflow-hidden border-line-strong bg-bg shadow-[var(--shadow)]",
            "inset-0 sm:border",
            expanded
              ? "sm:inset-6 sm:rounded-[var(--radius-lg)]"
              : "sm:inset-auto sm:right-6 sm:bottom-6 sm:h-[min(680px,calc(100dvh-3rem))] sm:w-[420px] sm:rounded-[var(--radius-lg)]",
          )}
        >
          <div className="atmosphere pointer-events-none absolute inset-0 opacity-70" aria-hidden />

          <div className="relative flex items-center justify-between gap-2 border-b border-line px-4 py-3">
            <div className="flex items-center gap-2.5">
              <Orb size={28} />
              <Dialog.Title className="font-semibold tracking-tight">KOUD AI</Dialog.Title>
              <Dialog.Description className="sr-only">{t.description}</Dialog.Description>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[0.7rem]",
                  status === "ready" ? "border-line-strong text-success" : "border-line text-muted",
                )}
              >
                <span className={cn("size-1.5 rounded-full", status === "ready" ? "bg-success" : "bg-muted")} aria-hidden />
                {statusLabel}
              </span>
            </div>
            <div className="flex items-center">
              {messages.length > 0 && (
                <button onClick={reset} className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-xs text-muted hover:bg-surface-2 hover:text-fg">
                  <RotateCcw className="size-3.5" aria-hidden /> {t.reset}
                </button>
              )}
              <button
                onClick={() => setExpanded((v) => !v)}
                className="hidden size-10 items-center justify-center rounded-full text-muted hover:bg-surface-2 hover:text-fg sm:inline-flex"
                aria-label={expanded ? t.collapse : t.expand}
              >
                {expanded ? <Minimize2 className="size-4" aria-hidden /> : <Maximize2 className="size-4" aria-hidden />}
              </button>
              <Dialog.Close className="inline-flex size-10 items-center justify-center rounded-full text-muted hover:bg-surface-2 hover:text-fg" aria-label={t.close}>
                <X className="size-4" aria-hidden />
              </Dialog.Close>
            </div>
          </div>

          <div ref={listRef} className="relative flex-1 overflow-y-auto px-4 py-5" aria-live="polite" aria-busy={pending}>
            <div className={cn("mx-auto", expanded && "max-w-2xl")}>
              {messages.length === 0 ? (
                <div className="flex flex-col items-center pt-6 text-center">
                  <Orb size={88} />
                  <p className="mt-6 text-xl font-semibold tracking-tight">{t.hello}</p>
                  <p className="mt-2 max-w-sm text-sm text-muted">
                    {t.intro}
                  </p>

                  {status === "unconfigured" && (
                    <p role="status" className="mt-5 max-w-sm rounded-[var(--radius)] border border-line bg-surface p-3 text-sm">
                      {t.notConfigured}{" "}
                      <Link href={href(locale, "/contact")} className="text-accent-fg underline" onClick={() => setOpen(false)}>
                        {t.writeDirectly}
                      </Link>
                      .
                    </p>
                  )}
                  {status === "offline" && (
                    <p role="status" className="mt-5 text-sm text-muted">{t.offline}</p>
                  )}

                  <ul className={cn("mt-6 grid w-full gap-2", expanded && "sm:grid-cols-2")}>
                    {t.suggestions.map((q) => (
                      <li key={q}>
                        <button
                          onClick={() => submit(q)}
                          disabled={status !== "ready"}
                          className="w-full rounded-full border border-line-strong bg-surface/60 px-4 py-2.5 text-left text-sm transition-colors hover:border-fg disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {q}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <ol className="space-y-5">
                  {messages.map((m) => (
                    <li key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start gap-2.5")}>
                      {m.role === "assistant" && <Orb size={24} className="mt-0.5" />}
                      <div
                        className={cn(
                          "max-w-[85%] text-[0.94rem] leading-relaxed",
                          m.role === "user" ? "rounded-2xl rounded-br-md bg-accent px-4 py-2.5 text-accent-ink" : "pt-0.5",
                        )}
                      >
                        <span className="sr-only">{m.role === "user" ? t.you : "KOUD AI : "}</span>
                        {m.role === "assistant" ? (
                          m.content ? (
                            <RichText text={m.content} />
                          ) : (
                            <span className="inline-flex gap-1 py-2" aria-label={t.typing}>
                              {[0, 1, 2].map((i) => (
                                <span key={i} className="size-1.5 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${i * 120}ms` }} />
                              ))}
                            </span>
                          )
                        ) : (
                          m.content
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              )}
              {error && (
                <p role="alert" className="mt-4 rounded-[var(--radius)] border border-line px-3 py-2 text-sm text-danger">
                  {error}
                </p>
              )}
            </div>
          </div>

          <form
            className="relative border-t border-line p-3"
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
          >
            <div className={cn("mx-auto flex items-end gap-2 rounded-[22px] border border-line-strong bg-surface p-1.5 pl-4 focus-within:border-fg", expanded && "max-w-2xl")}>
              <label htmlFor="koud-ai-input" className="sr-only">
                {t.inputLabel}
              </label>
              <textarea
                id="koud-ai-input"
                ref={inputRef}
                rows={1}
                maxLength={1200}
                value={input}
                disabled={status !== "ready"}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit(input);
                  }
                }}
                placeholder={status === "ready" ? t.placeholder : t.unavailable}
                className="max-h-32 min-h-10 flex-1 resize-none bg-transparent py-2 text-[0.95rem] outline-none placeholder:text-muted disabled:cursor-not-allowed"
              />
              {pending ? (
                <button type="button" onClick={stop} className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-fg text-bg" aria-label={t.stop}>
                  <Square className="size-3.5" aria-hidden />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim() || status !== "ready"}
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink disabled:opacity-40"
                  aria-label={t.send}
                >
                  <ArrowUp className="size-4" aria-hidden />
                </button>
              )}
            </div>
            <p className="mt-2 text-center text-[0.7rem] text-muted">
              {t.disclaimer}
            </p>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
