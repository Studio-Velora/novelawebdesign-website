import { useState, useEffect } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("sv_cookie_consent")) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("sv_cookie_consent", "all");
    (window as Window & { svLoadAnalytics?: () => void }).svLoadAnalytics?.();
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("sv_cookie_consent", "functional");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-[999] w-[calc(100%-3rem)] max-w-xl -translate-x-1/2 rounded-2xl border border-ink/10 bg-surface shadow-2xl shadow-ink/10 p-5 md:p-6">
      <p className="text-sm text-ink-soft leading-relaxed">
        <span className="block font-display text-base text-ink mb-1">Cookies</span>
        Wij gebruiken functionele cookies en — met uw toestemming — verbetercookies.{" "}
        <a href="/privacybeleid" className="underline underline-offset-2 hover:text-accent transition-colors">
          Privacyverklaring
        </a>
        .
      </p>
      <div className="mt-4 flex gap-3">
        <button
          onClick={accept}
          className="flex-1 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Accepteren
        </button>
        <button
          onClick={decline}
          className="flex-1 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
        >
          Alleen functioneel
        </button>
      </div>
    </div>
  );
}
