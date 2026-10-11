"use client";

import { openKoudAI } from "./shared";
import { buttonClasses } from "@/components/ui/Button";
import { Sparkles } from "lucide-react";

export function AskKoud({ question, label = "Demander à KOUD AI", variant = "ghost" }: { question?: string; label?: string; variant?: "primary" | "ghost" }) {
  return (
    <button type="button" onClick={() => openKoudAI(question)} className={buttonClasses(variant, "lg")}>
      <Sparkles className="size-4" aria-hidden />
      {label}
    </button>
  );
}
