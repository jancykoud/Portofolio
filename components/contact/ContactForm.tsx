"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { SUBJECTS } from "@/content/contact";
import { SITE } from "@/content/site";
import { cn } from "@/lib/utils";
import { useDict } from "@/lib/i18n/client";

type Errors = Partial<Record<"name" | "email" | "message" | "form", string>>;

const field =
  "w-full rounded-[var(--radius)] border border-line-strong bg-bg/60 px-4 py-3 text-[0.95rem] outline-none transition-colors placeholder:text-muted/80 focus:border-fg aria-[invalid=true]:border-danger";

export function ContactForm() {
  const t = useDict().contact;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const subjectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    // Preselect from ?sujet=… on the uncontrolled <select> (no re-render needed).
    const s = new URLSearchParams(window.location.search).get("sujet");
    if (s && subjectRef.current && SUBJECTS.some((x) => x.id === s)) subjectRef.current.value = s;
  }, []);

  const validate = (fd: FormData): Errors => {
    const e: Errors = {};
    if (String(fd.get("name") ?? "").trim().length < 2) e.name = t.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(fd.get("email") ?? ""))) e.email = t.errors.email;
    if (String(fd.get("message") ?? "").trim().length < 10) e.message = t.errors.message;
    return e;
  };

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const e = validate(fd);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(fd), startedAt: startedAt.current }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: Errors };
      if (!res.ok || !data.ok) {
        // Server field messages are French; map codes to the current language instead.
        const fieldErrors: Errors = {};
        for (const k of ["name", "email", "message"] as const) if (data.fields?.[k]) fieldErrors[k] = t.errors[k];
        const form =
          data.error === "not_configured"
            ? t.errors.notConfigured(SITE.email)
            : data.error === "rate_limited"
              ? t.errors.rateLimited
              : data.error === "invalid"
                ? undefined
                : t.errors.failed(SITE.email);
        setErrors({ ...fieldErrors, ...(form ? { form } : {}) });
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setErrors({ form: t.errors.network(SITE.email) });
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex min-h-[420px] flex-col items-center justify-center rounded-[var(--radius-lg)] border border-line bg-surface p-8 text-center">
        <CheckCircle2 className="size-10 text-success" aria-hidden />
        <h2 className="mt-5 text-2xl font-semibold tracking-tight">{t.sentTitle}</h2>
        <p className="mt-3 max-w-sm text-muted">{t.sentBody}</p>
        <button
          onClick={() => {
            startedAt.current = Date.now();
            setStatus("idle");
          }}
          className="mt-6 min-h-11 text-sm text-accent-fg underline-offset-4 hover:underline"
        >
          {t.another}
        </button>
      </div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1.5 text-sm text-danger">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="glass rounded-[var(--radius-lg)] border border-line p-5 sm:p-8" aria-describedby={errors.form ? "form-error" : undefined}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            {t.name} <span aria-hidden className="text-muted">*</span>
          </label>
          <input id="name" name="name" autoComplete="name" required maxLength={100} className={cn(field, "mt-2")} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            {t.email} <span aria-hidden className="text-muted">*</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required maxLength={200} className={cn(field, "mt-2")} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="company" className="text-sm font-medium">
            {t.company} <span className="text-muted">{t.optional}</span>
          </label>
          <input id="company" name="company" autoComplete="organization" maxLength={120} className={cn(field, "mt-2")} />
        </div>
        <div>
          <label htmlFor="subject" className="text-sm font-medium">
            {t.subject}
          </label>
          <select id="subject" name="subject" ref={subjectRef} defaultValue="mission" className={cn(field, "mt-2 appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10")} style={{ backgroundImage: "linear-gradient(45deg, transparent 50%, var(--muted) 50%), linear-gradient(135deg, var(--muted) 50%, transparent 50%)", backgroundPosition: "calc(100% - 20px) 50%, calc(100% - 15px) 50%", backgroundSize: "5px 5px, 5px 5px" }}>
            {SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>
                {t.subjects[s.id]}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium">
            {t.message} <span aria-hidden className="text-muted">*</span>
          </label>
          <textarea id="message" name="message" rows={7} required maxLength={3000} placeholder={t.placeholder} className={cn(field, "mt-2 resize-y")} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
          {err("message")}
        </div>
        {/* Honeypot: hidden from people and assistive tech, filled by naive bots */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">{t.website}</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {errors.form && (
        <p id="form-error" role="alert" className="mt-5 rounded-[var(--radius)] border border-danger/40 px-4 py-3 text-sm text-danger">
          {errors.form}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted sm:max-w-xs">
          {t.privacy}
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 font-medium text-accent-ink disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden /> {t.sending}
            </>
          ) : (
            <>
              {t.send} <ArrowRight className="size-4" aria-hidden />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
