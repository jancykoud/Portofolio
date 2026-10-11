"use client";

import { useEffect } from "react";

/** Marks <html data-hydrated> once React is interactive (used by E2E tests to avoid pre-hydration clicks). */
export function HydrationMark() {
  useEffect(() => {
    document.documentElement.dataset.hydrated = "true";
  }, []);
  return null;
}
