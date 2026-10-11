"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { SUBJECTS, type SubjectId } from "@/content/contact";
import { SITE } from "@/content/site";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"name" | "email" | "message" | "form", string>>;

const field =
  "w-full rounded-[var(--radius)] border border-line-strong bg-bg/60 px-4 py-3 text-[0.95rem] outline-none transition-colors placeholder:text-muted/80 focus:border-fg aria-[invalid=true]:border-danger";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [subject, setSubject] = useState<SubjectId>("mission");
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("sujet");
    if (s && SUBJECTS.some((x) => x.id === s)) setSubject(s as SubjectId);
  }, []);

  const validate = (fd: FormData): Errors => {
    const e: Errors = {};
    if (String(fd.get("name") ?? "").trim().length < 2) e.name = "Indiquez votre nom (2 caractères minimum).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(fd.get("email") ?? ""))) e.email = "Adresse e-mail invalide.";
    if (String(fd.get("message") ?? "").trim().length < 10) e.message = "Votre message doit contenir au moins 10 caractères.";
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
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; fields?: Errors };
      if (!res.ok || !data.ok) {
        setErrors({ ...(data.fields ?? {}), form: data.message ?? "L'envoi a échoué. Réessayez dans un instant." });
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setErrors({ form: `Connexion impossible. Vous pouvez écrire directement à ${SITE.email}.` });
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex min-h-[420px] flex-col items-center justify-center rounded-[var(--radius-lg)] border border-line bg-surface p-8 text-center">
        <CheckCircle2 className="size-10 text-success" aria-hidden />
        <h2 className="mt-5 text-2xl font-semibold tracking-tight">Message envoyé.</h2>
        <p className="mt-3 max-w-sm text-muted">Merci ! Je reviens vers vous personnellement à l'adresse indiquée.</p>
        <button
          onClick={() => {
            startedAt.current = Date.now();
            setStatus("idle");
          }}
          className="mt-6 min-h-11 text-sm text-accent-fg underline-offset-4 hover:underline"
        >
          Envoyer un autre message
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
            Nom <span aria-hidden className="text-muted">*</span>
          </label>
          <input id="name" name="name" autoComplete="name" required maxLength={100} className={cn(field, "mt-2")} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            E-mail <span aria-hidden className="text-muted">*</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required maxLength={200} className={cn(field, "mt-2")} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="company" className="text-sm font-medium">
            Organisation <span className="text-muted">(facultatif)</span>
          </label>
          <input id="company" name="company" autoComplete="organization" maxLength={120} className={cn(field, "mt-2")} />
        </div>
        <div>
          <label htmlFor="subject" className="text-sm font-medium">
            Sujet
          </label>
          <select id="subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value as SubjectId)} className={cn(field, "mt-2 appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10")} style={{ backgroundImage: "linear-gradient(45deg, transparent 50%, var(--muted) 50%), linear-gradient(135deg, var(--muted) 50%, transparent 50%)", backgroundPosition: "calc(100% - 20px) 50%, calc(100% - 15px) 50%", backgroundSize: "5px 5px, 5px 5px" }}>
            {SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message <span aria-hidden className="text-muted">*</span>
          </label>
          <textarea id="message" name="message" rows={7} required maxLength={3000} placeholder="Contexte, besoin, échéances éventuelles…" className={cn(field, "mt-2 resize-y")} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
          {err("message")}
        </div>
        {/* Honeypot: hidden from people and assistive tech, filled by naive bots */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Site web</label>
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
          Vos données servent uniquement à vous répondre. Elles sont transmises par e-mail et ne sont pas stockées sur ce site.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 font-medium text-accent-ink disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden /> Envoi…
            </>
          ) : (
            <>
              Envoyer le message <ArrowRight className="size-4" aria-hidden />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
