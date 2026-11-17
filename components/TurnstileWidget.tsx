"use client";

import { useEffect, useId, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          action?: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "flexible";
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

const SCRIPT_ID = "cf-turnstile-script";
const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad";

type Props = {
  siteKey: string;
  action: string;
  onToken: (token: string | null) => void;
  onWidgetId?: (widgetId: string | null) => void;
  className?: string;
};

export function TurnstileWidget({
  siteKey,
  action,
  onToken,
  onWidgetId,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  const onWidgetIdRef = useRef(onWidgetId);
  const reactId = useId();

  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useEffect(() => {
    onWidgetIdRef.current = onWidgetId;
  }, [onWidgetId]);

  useEffect(() => {
    let cancelled = false;

    function mount() {
      if (cancelled || !containerRef.current || !window.turnstile) return;
      if (widgetIdRef.current) return;

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action,
        theme: "light",
        size: "flexible",
        callback: (token) => onTokenRef.current(token),
        "expired-callback": () => onTokenRef.current(null),
        "error-callback": () => onTokenRef.current(null),
      });
      onWidgetIdRef.current?.(widgetIdRef.current);
    }

    function ensureScript() {
      if (window.turnstile) {
        mount();
        return;
      }

      const existing = document.getElementById(SCRIPT_ID);
      if (existing) {
        const previous = window.onTurnstileLoad;
        window.onTurnstileLoad = () => {
          previous?.();
          mount();
        };
        return;
      }

      window.onTurnstileLoad = () => {
        mount();
      };
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    ensureScript();

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* ignore */
        }
      }
      widgetIdRef.current = null;
      onWidgetIdRef.current?.(null);
    };
  }, [siteKey, action, reactId]);

  return <div ref={containerRef} className={className} />;
}

export function resetTurnstile(widgetId?: string | null) {
  if (typeof window === "undefined" || !window.turnstile) return;
  try {
    if (widgetId) window.turnstile.reset(widgetId);
    else window.turnstile.reset();
  } catch {
    /* ignore */
  }
}
