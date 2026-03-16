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

  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const [isIndicatorActive, setIsIndicatorActive] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const { y: currentScrollY } = useWindowScroll();

  /* ---------------- AUDIO SYSTEM ---------------- */

  useEffect(() => {
    const el = audioElementRef.current;
    if (!el) return;

    const startAudio = async () => {
      try {
        el.muted = false;
        el.volume = 1;
        el.loop = true;
        await el.play();

        setIsAudioPlaying(true);
        setIsIndicatorActive(true);
      } catch {
        /* fallback if autoplay blocked */
        const startOnUserInteraction = () => {
          el.play().catch(() => {});
          setIsAudioPlaying(true);
          setIsIndicatorActive(true);

          window.removeEventListener("click", startOnUserInteraction);
        };

        window.addEventListener("click", startOnUserInteraction);
      }
    };

    startAudio();
  }, []);

  const toggleAudioIndicator = () => {
    const el = audioElementRef.current;
    if (!el) return;

    if (isAudioPlaying) {
      el.pause();
      setIsAudioPlaying(false);
      setIsIndicatorActive(false);
    } else {
      el.play().catch(() => {});
      setIsAudioPlaying(true);
      setIsIndicatorActive(true);
    }
  };

  /* ---------------- LANGUAGE MENU ---------------- */

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

  /* ---------------- SCROLL NAVBAR ---------------- */

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

  /* ---------------- UI ---------------- */

  return (
    <header
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <div className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">

          {/* LOGO */}
          <div className="flex items-center gap-7">
            <a href="#hero">
              <img src="/img/Logo.webp" alt={t("alt.logo")} className="w-40" />
            </a>
          </div>

          {/* NAVIGATION */}
          <div className="flex h-full items-center gap-4">

            <div className="hidden md:flex items-center gap-2">
              {NAV_ITEMS.map(({ labelKey, href }) => (
                <a key={href} href={href} className="nav-hover-btn">
                  {t(labelKey)}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">

              {/* AUDIO */}
              <div className="flex items-center gap-2">

                <audio
                  ref={audioElementRef}
                  src="/audio/loop.mp3"
                  className="hidden"
                  autoPlay
                  loop
                  preload="auto"
                />

                <div className="flex items-center space-x-1">
                  {Array(4).fill("").map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "indicator-line",
                        isIndicatorActive && "active"
                      )}
                      style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                    />
                  ))}
                </div>

                <button
                  onClick={toggleAudioIndicator}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white/90 backdrop-blur-md transition hover:bg-white/12"
                >
                  {isAudioPlaying ? "AUDIO ON" : "AUDIO OFF"}
                </button>

              </div>

              {/* LANGUAGE */}
              <div ref={languageMenuRef} className="relative">

                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold text-white"
                >
                  {locale.toUpperCase()}
                </button>

                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-black/80 p-2 backdrop-blur-xl">

                    {[
                      { value: "en", label: "English" },
                      { value: "fr", label: "Français" },
                      { value: "de", label: "Deutsch" },
                      { value: "nl", label: "Nederlands" },
                      { value: "no", label: "Norsk" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setLocale(opt.value as Locale);
                          setIsLanguageOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-white/10 rounded"
                      >
                        {opt.label}
                      </button>
                    ))}

                  </div>
                )}
              </div>

            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
