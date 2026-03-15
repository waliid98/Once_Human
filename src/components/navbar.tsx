import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";

import { NAV_ITEMS } from "@/constants";
import type { Locale } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const { locale, setLocale, t } = useI18n();
  const navContainerRef = useRef<HTMLDivElement>(null);
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  const SOUND_UNLOCKED_KEY = "soundUnlocked";

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [needsUnmute, setNeedsUnmute] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    const el = audioElementRef.current;
    if (!el) return;

    const tryStart = async (opts?: { muted?: boolean }) => {
      try {
        if (typeof opts?.muted === "boolean") el.muted = opts.muted;
        el.volume = 1;
        el.loop = true;
        await el.play();
        setIsAudioPlaying(true);
        setIsIndicatorActive(true);
        setNeedsUnmute(el.muted);
        return true;
      } catch {
        setIsAudioPlaying(false);
        setIsIndicatorActive(false);
        setNeedsUnmute(true);
        return false;
      }
    };

    const startWithFallback = async () => {
      const prefersSound = window.localStorage.getItem(SOUND_UNLOCKED_KEY) === "true";
      if (prefersSound) {
        const ok = await tryStart({ muted: false });
        if (!ok && el.paused) {
          const startedMuted = await tryStart({ muted: true });
          if (startedMuted) {
            el.muted = false;
            setNeedsUnmute(false);
          }
        }
        return;
      }

      const startedMuted = await tryStart({ muted: true });
      if (startedMuted) return;
      await tryStart({ muted: false });
    };

    void startWithFallback();
  }, []);

  const enableSound = () => {
    void (async () => {
      const el = audioElementRef.current;
      if (!el) return;
      el.muted = false;
      try {
        await el.play();
        setIsAudioPlaying(true);
        setIsIndicatorActive(true);
        setNeedsUnmute(false);
        window.localStorage.setItem(SOUND_UNLOCKED_KEY, "true");
      } catch {
        setNeedsUnmute(true);
      }
    })();
  };

  const toggleAudioIndicator = () => {
    if (needsUnmute) {
      enableSound();
      return;
    }
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current?.play().catch(() => undefined);
    } else {
      audioElementRef.current?.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (!isLanguageOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (!languageMenuRef.current) return;
      if (!languageMenuRef.current.contains(target)) setIsLanguageOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLanguageOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isLanguageOpen]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
  }, [isNavVisible]);

  return (
    <header
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <div className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo Section */}
          <div className="flex items-center gap-7">
            <a href="#hero" className="transition hover:opacity-75">
              <img src="/img/Logo.webp" alt={t("alt.logo")} className="w-40" />
            </a>
          </div>

          {/* Navigation & Controls */}
          <div className="flex h-full items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              {NAV_ITEMS.map(({ labelKey, href }) => (
                <a key={href} href={href} className="nav-hover-btn">
                  {t(labelKey)}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center space-x-1 p-2"
                  aria-hidden
                >
                  <audio
                    ref={audioElementRef}
                    src="/audio/loop.mp3"
                    className="hidden"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  />
                  {Array(4).fill("").map((_, i) => (
                    <div
                      key={i + 1}
                      className={cn("indicator-line", isIndicatorActive && "active")}
                      style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={toggleAudioIndicator}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white/90 shadow-[0_12px_32px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
                  title={needsUnmute ? t("nav.enableSound") : t("nav.audio")}
                >
                  {needsUnmute ? t("nav.enableSound") : t("nav.audio")}
                </button>
              </div>

              {/* Professional Language Selector */}
              <div ref={languageMenuRef} className="relative flex items-center">
                <button
                  type="button"
                  onClick={() => setIsLanguageOpen((v) => !v)}
                  title={t("nav.language")}
                  aria-haspopup="menu"
                  aria-expanded={isLanguageOpen}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white shadow-[0_12px_32px_rgba(0,0,0,0.25)] backdrop-blur-md outline-none transition-all duration-300 hover:border-white/25 hover:bg-white/12 hover:shadow-[0_14px_40px_rgba(0,0,0,0.35)] focus-visible:ring-2 focus-visible:ring-white/25"
                >
                  <span className="absolute inset-0 bg-gradient-to-b from-white/14 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative inline-flex size-7 items-center justify-center rounded-full bg-white/6 text-white/70 transition group-hover:text-white">
                    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
                      <path
                        d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path d="M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path
                        d="M12 2c2.5 2.8 4 6.2 4 10s-1.5 7.2-4 10c-2.5-2.8-4-6.2-4-10s1.5-7.2 4-10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="relative min-w-8 text-left">{locale.toUpperCase()}</span>
                  <span className={cn("relative text-white/60 transition", isLanguageOpen && "rotate-180")}>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="size-3">
                      <path
                        fillRule="evenodd"
                        d="M5.22 7.47a.75.75 0 0 1 1.06 0L10 11.19l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.53a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  role="menu"
                  className={cn(
                    "absolute right-0 top-[calc(100%+10px)] z-50 w-60 origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-black/75 p-1 text-white shadow-2xl backdrop-blur-xl transition",
                    isLanguageOpen ? "scale-100 opacity-100 translate-y-0" : "pointer-events-none scale-[0.98] opacity-0 -translate-y-1"
                  )}
                >
                  <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
                    {t("nav.language")}
                  </div>
                  <div className="mx-2 mb-1 h-px bg-white/10" />
                  {(
                    [
                      { value: "en", label: "English", code: "EN" },
                      { value: "fr", label: "Français", code: "FR" },
                      { value: "de", label: "Deutsch", code: "DE" },
                      { value: "nl", label: "Nederlands", code: "NL" },
                      { value: "no", label: "Norsk", code: "NO" },
                    ] as const satisfies readonly { value: Locale; label: string; code: string }[]
                  ).map((opt) => {
                    const isActive = opt.value === locale;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setLocale(opt.value);
                          setIsLanguageOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-xs transition",
                          isActive ? "bg-white/10" : "hover:bg-white/8"
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={cn(
                              "inline-flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[10px] font-extrabold tracking-widest",
                              isActive && "border-white/20 bg-white/10"
                            )}
                          >
                            {opt.code}
                          </span>
                          <span className="font-semibold">{opt.label}</span>
                        </span>
                        {isActive ? (
                          <span className="text-white/90">●</span>
                        ) : (
                          <span className="text-white/25">○</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
