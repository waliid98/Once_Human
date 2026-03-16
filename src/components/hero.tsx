import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import { FaWindows } from "react-icons/fa";

import { VIDEO_LINKS } from "@/constants";
import { useI18n } from "@/lib/i18n";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const miniVideoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);

  const totalVideos = 4;
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  const VIDEO_KEYS = ["hero1", "hero2", "hero3", "hero4"] as const;
  const getVideoSrc = (i: number) => {
    const key = VIDEO_KEYS[i - 1];
    return VIDEO_LINKS[key];
  };

  const handleVideoLoad = () => {
    setLoadedVideos((prevVideos) => prevVideos + 1);
  };

  useEffect(() => {
    if (loadedVideos >= 1) setIsLoading(false);
  }, [loadedVideos]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            void nextVideoRef.current?.play();
          },
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <section id="hero" className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-100 h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="bg-blue-75 relative z-10 h-dvh w-screen overflow-hidden rounded-lg"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={miniVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                playsInline
                preload="metadata"
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            playsInline
            preload="metadata"
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />

          <video
            src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute top-0 left-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        {/* --- ADDED HOOK TEXT SECTION --- */}
        <div className="pointer-events-none absolute top-0 left-0 z-40 flex size-full flex-col items-center justify-center">
          <div className="flex flex-col items-center text-center">
            {/* Main Title: Aberrant Progeny */}
            <h1
              className="relative special-font text-6xl font-black leading-none drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] bg-gradient-to-b from-white via-blue-100 to-slate-400 bg-clip-text text-transparent uppercase italic md:text-9xl"
            >
              {t("hero.title")}

              {/* Outer Glow Layer */}
              <span className="absolute inset-0 -z-10 select-none text-purple-500 opacity-30 blur-xl">
                {t("hero.title")}
              </span>
            </h1>

            <div className="pointer-events-auto relative z-[60] mt-7">
              <a
                href="https://to.wendiro.com/u?k=24c3cf9a5dde4dd896352d1314e9aacd&via=22995"
                target="_blank"
                rel="noreferrer noopener"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/25 bg-gradient-to-r from-violet-500/35 via-fuchsia-500/25 to-violet-500/35 px-14 py-5 text-xl font-semibold tracking-wide text-white shadow-[0_0_40px_rgba(168,85,247,0.18)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:shadow-[0_0_60px_rgba(168,85,247,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70 active:translate-y-0"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/18 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100"
                />
                <span className="relative z-10 inline-flex items-center gap-3">
                  <FaWindows className="text-3xl" />
                  {t("hero.cta")}
                </span>
              </a>
            </div>

            {/* Tagline with decorative lines */}
            <div className="mt-4 flex items-center gap-4">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-purple-500 sm:w-16" />
              <p className="text-[10px] font-light tracking-[0.6em] text-white uppercase sm:text-xs">
                {t("hero.tagline")}
              </p>
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-purple-500 sm:w-16" />
            </div>
          </div>
        </div>
      </div>

      <h1
        className="special-font hero-heading absolute right-5 bottom-5 text-black"
        dangerouslySetInnerHTML={{ __html: t("hero.bottomTitle") }}
      />
    </section>
  );
};
