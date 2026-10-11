"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ModeContext = createContext({ mode: "recruiter", setMode: () => {} });

export function ModeProvider({ children }) {
  const [mode, setModeRaw] = useState("recruiter");

  useEffect(() => {
    const stored = localStorage.getItem("portfolio_mode");
    if (stored === "freelance" || stored === "recruiter") setModeRaw(stored);
  }, []);

  const setMode = (m) => {
    setModeRaw(m);
    localStorage.setItem("portfolio_mode", m);
  };

  return <ModeContext.Provider value={{ mode, setMode }}>{children}</ModeContext.Provider>;
}

export const useMode = () => useContext(ModeContext);
