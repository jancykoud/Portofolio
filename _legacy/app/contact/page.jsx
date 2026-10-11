"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaGitlab, FaPhone } from "react-icons/fa";
import Link from "next/link";

const SUBJECTS = [
  "Mission freelance",
  "Opportunité CDI",
  "Collaboration projet",
  "Question technique",
  "Autre",
];

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const INPUT_STYLE = {
  background: "#1a1a1a",
  border: "0.5px solid rgba(255,255,255,0.1)",
  color: "#ffffff",
  borderRadius: 10,
};

const ContactInfo = () => (
  <ul className="flex flex-col gap-6">
    {[
      { icon: <FaPhone />, label: "Téléphone", value: "(+33) 7 88 70 29 85", href: "tel:+33788702985" },
      { icon: <FaEnvelope />, label: "Email", value: "fridelinbanga@gmail.com", href: "mailto:fridelinbanga@gmail.com" },
      { icon: <FaMapMarkerAlt />, label: "Localisation", value: "Clermont-Ferrand, France" },
      { icon: <FaGithub />, label: "GitHub", value: "github.com/jancykoud", href: "https://github.com/jancykoud", external: true },
      { icon: <FaGitlab />, label: "GitLab", value: "gitlab.com/fridelinbanga", href: "https://gitlab.com/fridelinbanga", external: true },
    ].map((item, i) => (
      <li key={i} className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-sm"
          style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa", border: "0.5px solid rgba(139,92,246,0.25)" }}
        >
          {item.icon}
        </div>
        <div>
          <p className="font-inter text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
            {item.label}
          </p>
          {item.href ? (
            <Link
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="font-inter text-sm text-white hover:text-accent transition-colors"
            >
              {item.value}
            </Link>
          ) : (
            <p className="font-inter text-sm text-white">{item.value}</p>
          )}
        </div>
      </li>
    ))}
  </ul>
);

export default function Contact() {
  const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "", honeypot: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nom.trim() || form.nom.trim().length < 2) newErrors.nom = "Nom requis (min 2 caractères)";
    if (!validateEmail(form.email)) newErrors.email = "Adresse e-mail invalide";
    if (!form.message.trim() || form.message.trim().length < 10) newErrors.message = "Message trop court (min 10 caractères)";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.honeypot) return;
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setStatus("loading");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom: form.nom, email: form.email, sujet: form.sujet, message: form.message }),
      });
      const data = await res.json();
      if (!res.ok) { setServerError(data.error || "Une erreur est survenue."); setStatus("error"); return; }
      setStatus("success");
      setForm({ nom: "", email: "", sujet: "", message: "", honeypot: "" });
    } catch {
      setServerError("Impossible de joindre le serveur. Réessayez.");
      setStatus("error");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-12 xl:py-20"
      style={{ background: "#0a0a0a" }}
    >
      <div className="container mx-auto">
        {/* En-tête */}
        <div className="mb-12">
          <p className="font-inter text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
            Parlons-en
          </p>
          <h1 className="font-syne font-black text-[38px] xl:text-[52px] leading-[1.05] text-white" style={{ letterSpacing: "-0.025em" }}>
            Travaillons<br /><span style={{ color: "#8b5cf6" }}>ensemble.</span>
          </h1>
        </div>

        <div className="flex flex-col xl:flex-row gap-14">
          {/* Formulaire */}
          <div className="xl:flex-[3]">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center text-center py-20 gap-5"
                  style={{ border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 16, background: "#111111", minHeight: 360 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(139,92,246,0.15)", border: "0.5px solid rgba(139,92,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#a78bfa" }}
                  >
                    ✓
                  </motion.div>
                  <h3 className="font-syne font-bold text-2xl text-white">Message envoyé !</h3>
                  <p className="font-inter text-sm max-w-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                    Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                  </p>
                  <button onClick={() => setStatus("idle")} className="font-inter text-sm text-accent hover:text-accent-hover transition-colors mt-2">
                    Envoyer un autre message →
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                  style={{ background: "#111111", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "32px" }}
                >
                  <h2 className="font-syne font-bold text-xl text-white mb-1">Envoyer un message</h2>

                  <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange} style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nom */}
                    <div>
                      <label className="font-inter text-[11px] uppercase tracking-wider block mb-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                        Nom *
                      </label>
                      <input
                        type="text" name="nom" value={form.nom} onChange={handleChange} placeholder="Votre nom"
                        className="w-full font-inter text-sm px-4 py-3 outline-none transition-colors"
                        style={{ ...INPUT_STYLE, border: errors.nom ? "0.5px solid #ef4444" : INPUT_STYLE.border }}
                        onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
                        onBlur={(e) => (e.target.style.borderColor = errors.nom ? "#ef4444" : "rgba(255,255,255,0.1)")}
                      />
                      {errors.nom && <p className="text-[11px] text-red-400 mt-1 font-inter">{errors.nom}</p>}
                    </div>
                    {/* Email */}
                    <div>
                      <label className="font-inter text-[11px] uppercase tracking-wider block mb-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                        Email *
                      </label>
                      <input
                        type="email" name="email" value={form.email} onChange={handleChange} placeholder="votre@email.com"
                        className="w-full font-inter text-sm px-4 py-3 outline-none transition-colors"
                        style={{ ...INPUT_STYLE, border: errors.email ? "0.5px solid #ef4444" : INPUT_STYLE.border }}
                        onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
                        onBlur={(e) => (e.target.style.borderColor = errors.email ? "#ef4444" : "rgba(255,255,255,0.1)")}
                      />
                      {errors.email && <p className="text-[11px] text-red-400 mt-1 font-inter">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Sujet */}
                  <div>
                    <label className="font-inter text-[11px] uppercase tracking-wider block mb-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                      Sujet
                    </label>
                    <select
                      name="sujet" value={form.sujet} onChange={handleChange}
                      className="w-full font-inter text-sm px-4 py-3 outline-none appearance-none cursor-pointer"
                      style={{ ...INPUT_STYLE, color: form.sujet ? "#ffffff" : "rgba(255,255,255,0.35)" }}
                    >
                      <option value="" style={{ background: "#1a1a1a" }}>Sélectionner un sujet</option>
                      {SUBJECTS.map((s) => <option key={s} value={s} style={{ background: "#1a1a1a" }}>{s}</option>)}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-inter text-[11px] uppercase tracking-wider block mb-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                      Message *
                    </label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      placeholder="Décrivez votre projet, vos besoins..." rows={6}
                      className="w-full font-inter text-sm px-4 py-3 outline-none resize-none transition-colors"
                      style={{ ...INPUT_STYLE, border: errors.message ? "0.5px solid #ef4444" : INPUT_STYLE.border }}
                      onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
                      onBlur={(e) => (e.target.style.borderColor = errors.message ? "#ef4444" : "rgba(255,255,255,0.1)")}
                    />
                    <div className="flex items-center justify-between mt-1">
                      {errors.message ? <p className="text-[11px] text-red-400 font-inter">{errors.message}</p> : <span />}
                      <p className="text-[10px] font-inter ml-auto" style={{ color: "rgba(255,255,255,0.3)" }}>{form.message.length}/3000</p>
                    </div>
                  </div>

                  {/* Erreur serveur */}
                  {status === "error" && serverError && (
                    <p className="font-inter text-sm text-center py-3 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "0.5px solid rgba(239,68,68,0.25)" }}>
                      {serverError}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit" disabled={status === "loading"}
                    className="font-inter font-medium text-sm transition-opacity hover:opacity-85"
                    style={{ background: status === "loading" ? "rgba(255,255,255,0.2)" : "#ffffff", color: "#0a0a0a", borderRadius: 100, padding: "12px 28px", cursor: status === "loading" ? "not-allowed" : "pointer", alignSelf: "flex-start" }}
                  >
                    {status === "loading" ? "Envoi en cours…" : "Envoyer le message →"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Infos contact */}
          <div className="xl:flex-[2]">
            <div className="p-8 rounded-2xl" style={{ background: "#111111", border: "0.5px solid rgba(255,255,255,0.08)" }}>
              <h2 className="font-syne font-bold text-lg text-white mb-6">Coordonnées</h2>
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
