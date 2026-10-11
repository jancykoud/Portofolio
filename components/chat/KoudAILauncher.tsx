"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { Orb } from "./shared";
import { cn } from "@/lib/utils";

// The panel (dialog, streaming, rich text) is only downloaded when first needed.
const KoudAIPanel = dynamic(() => import("./KoudAI"), { ssr: false });

export function KoudAILauncher() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [question, setQuestion] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const openPanel = useCallback((q?: string) => {
    if (q) setQuestion(q);
    setLoaded(true);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => openPanel((e as CustomEvent<{ question?: string }>).detail?.question);
    window.addEventListener("koud-ai:open", onOpen);
    return () => window.removeEventListener("koud-ai:open", onOpen);
  }, [openPanel]);

  const takeQuestion = useCallback(() => setQuestion(null), []);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => openPanel()}
        // Warm the chunk on intent so opening feels instant.
        onPointerEnter={() => void import("./KoudAI")}
        onFocus={() => void import("./KoudAI")}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Ouvrir KOUD AI, l'assistant du portfolio"
        className={cn(
          "glass fixed right-4 bottom-4 z-40 inline-flex h-14 items-center gap-3 rounded-full border border-line-strong p-1.5 shadow-[var(--shadow)] transition-transform hover:-translate-y-0.5 sm:right-6 sm:bottom-6 sm:pr-5",
          open && "pointer-events-none opacity-0",
        )}
      >
        <Orb size={44} />
        <span className="hidden text-sm font-medium sm:inline">KOUD AI</span>
      </button>
      {loaded && (
        <KoudAIPanel open={open} onOpenChange={setOpen} question={question} onQuestionTaken={takeQuestion} returnFocusTo={buttonRef} />
      )}
    </>
  );
}
