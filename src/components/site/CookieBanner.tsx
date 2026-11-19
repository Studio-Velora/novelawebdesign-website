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
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("sv_cookie_consent", "functional");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookievoorkeuren"
      className="fixed bottom-3 left-1/2 z-[999] w-[calc(100%-1.5rem)] max-w-xl -translate-x-1/2 rounded-2xl border border-ink/10 bg-surface p-4 shadow-2xl shadow-ink/10 md:bottom-6 md:w-[calc(100%-3rem)] md:p-6"
    >
      <p className="text-sm text-ink-soft leading-relaxed">
        <span className="block font-display text-base text-ink mb-1">Cookies</span>
        Wij gebruiken functionele cookies en — met uw toestemming — verbetercookies.{" "}
        <a
          href="/privacybeleid"
          className="underline underline-offset-2 hover:text-accent transition-colors"
        >
          Privacyverklaring
        </a>
        .
      </p>
      <div className="mt-3 flex gap-3 md:mt-4">
        <button
          onClick={accept}
          className="min-h-11 flex-1 rounded-full bg-accent-deep px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Accepteren
        </button>
        <button
          onClick={decline}
          className="min-h-11 flex-1 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
        >
          Alleen functioneel
        </button>
      </div>
    </div>
  );
}
