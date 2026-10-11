"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type ChatMessage = { id: string; role: "user" | "assistant"; content: string };
export type ChatStatus = "checking" | "ready" | "unconfigured" | "offline";

const STORAGE_KEY = "koud-ai:session";

const uid = () => Math.random().toString(36).slice(2, 10);

type ChatErrors = {
  rateLimited: (s: number) => string;
  notConfigured: string;
  unavailable: string;
  empty: string;
};

export function useChat(errors: ChatErrors) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]") as ChatMessage[];
    } catch {
      return [];
    }
  });
  const [status, setStatus] = useState<ChatStatus>("checking");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Session-only history: cleared when the tab closes. Nothing is stored server-side.
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* ignore */
    }
  }, [messages]);

  const checkStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/chat", { cache: "no-store" });
      const data = (await res.json()) as { configured: boolean };
      setStatus(data.configured ? "ready" : "unconfigured");
    } catch {
      setStatus("offline");
    }
  }, []);

  const send = useCallback(
    async (text: string) => {
      const content = text.trim().slice(0, 1200);
      if (!content || pending) return;
      setError(null);
      const userMsg: ChatMessage = { id: uid(), role: "user", content };
      const assistantMsg: ChatMessage = { id: uid(), role: "assistant", content: "" };
      const history = [...messages, userMsg];
      setMessages([...history, assistantMsg]);
      setPending(true);

      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
          signal: controller.signal,
        });
        if (!res.ok || !res.body) {
          const data = (await res.json().catch(() => ({}))) as { error?: string; retryAfter?: number };
          if (data.error === "not_configured") setStatus("unconfigured");
          throw new Error(
            data.error === "rate_limited"
              ? errors.rateLimited(data.retryAfter ?? 60)
              : data.error === "not_configured"
                ? errors.notConfigured
                : errors.unavailable,
          );
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          const snapshot = acc;
          setMessages((m) => m.map((msg) => (msg.id === assistantMsg.id ? { ...msg, content: snapshot } : msg)));
        }
        if (!acc.trim()) throw new Error(errors.empty);
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
        setError((e as Error).message);
        setMessages((m) => m.filter((msg) => msg.id !== assistantMsg.id || msg.content));
      } finally {
        setPending(false);
        abortRef.current = null;
      }
    },
    [messages, pending, errors],
  );

  const stop = () => abortRef.current?.abort();

  const reset = () => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
  };

  return { messages, status, pending, error, send, stop, reset, checkStatus };
}
