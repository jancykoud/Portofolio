"use client";

import { openKoudAI } from "./shared";
import { buttonClasses } from "@/components/ui/Button";
import { Sparkles } from "lucide-react";
import { useDict } from "@/lib/i18n/client";

export function AskKoud({ question, label, variant = "ghost" }: { question?: string; label?: string; variant?: "primary" | "ghost" }) {
  const t = useDict().chat;
  return (
    <button type="button" onClick={() => openKoudAI(question)} className={buttonClasses(variant, "lg")}>
      <Sparkles className="size-4" aria-hidden />
      {label ?? t.askCta}
    </button>
  );
}
