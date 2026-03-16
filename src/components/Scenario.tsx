import { VIDEO_LINKS } from "@/constants";
import { PropsWithChildren, useEffect, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useI18n } from "@/lib/i18n";
import { AnimatedTitle } from "./animated-title";
import { InViewVideo } from "./in-view-video";

interface BentoTiltProps {
  className?: string;
}

const BentoTilt = ({
  children,
  className = "",
}: PropsWithChildren<BentoTiltProps>) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const readBounds = () => {
    const el = itemRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    boundsRef.current = { left, top, width, height };
  };

  useEffect(() => {
    const onResize = () => readBounds();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const applyTransform = () => {
    rafRef.current = null;
    const el = itemRef.current;
    const bounds = boundsRef.current;
    const point = lastPointRef.current;
    if (!el || !bounds || !point) return;

    const relativeX = (point.x - bounds.left) / bounds.width;
    const relativeY = (point.y - bounds.top) / bounds.height;
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    el.style.transform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onPointerEnter={readBounds}
      onPointerMove={(e) => {
        lastPointRef.current = { x: e.clientX, y: e.clientY };
        if (rafRef.current != null) return;
        rafRef.current = window.requestAnimationFrame(applyTransform);
      }}
      onPointerLeave={() => {
        if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        lastPointRef.current = null;
        boundsRef.current = null;
        if (itemRef.current) itemRef.current.style.transform = "";
      }}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  src: string;
  title: React.ReactNode;
  description?: string;
}

const BentoCard = ({ src, title, description }: BentoCardProps) => {
  return (
    <article className="relative size-full overflow-hidden rounded-2xl">
      <InViewVideo
        src={src}
        className="absolute top-0 left-0 size-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

      <div className="relative z-10 flex size-full flex-col justify-between p-6 text-blue-50">
        <div>
          <h3 className="bento-title special-font">{title}</h3>
          {description && (
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
              {description}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

export const Features = () => {
  const { t } = useI18n();
  const featuresSubtitle = t("features.subtitle");

  return (
    <section
      aria-labelledby="scenario"
      className="relative w-screen overflow-hidden bg-black pb-52 text-white"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url(/img/p1_086_en_横_滑翔场景展示02_0s_陈晓尧_AIGC绘画_1200x628.webp)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90" />

        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(circle at 50% 50%, black, transparent 80%)",
          }}
        />
        </div>

      <div className="relative z-10 container mx-auto px-3 md:px-10">
        <div className="px-5 pt-28 pb-16 text-center">
          <a
            id="scenario"
            href="#scenario"
            className="group inline-block scroll-mt-24 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
          >
            <AnimatedTitle containerClass="pointer-events-none !text-white drop-shadow-[0_0_18px_rgba(168,85,247,0.45)]">
              {t("features.kicker")}
            </AnimatedTitle>
          </a>

          {featuresSubtitle ? (
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/70 md:text-lg">
              {featuresSubtitle}
            </p>
          ) : null}

          <div className="mx-auto mt-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-violet-500/70 to-transparent" />
        </div>

        <BentoTilt className="relative mb-7 h-96 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm md:h-[65vh]">
          <BentoCard
            src={VIDEO_LINKS.feature1}
            title={
              <span
                dangerouslySetInnerHTML={{
                  __html: t("features.Endless Dream.title"),
                }}
              />
            }
            description={t("features.Endless Dream.desc")}
          />
        </BentoTilt>

        <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src={VIDEO_LINKS.feature2}
              title={
                <span
                  dangerouslySetInnerHTML={{
                    __html: t("features.prismversesClash.title"),
                  }}
                />
              }
              description={t("features.prismversesClash.desc")}
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src={VIDEO_LINKS.feature3}
              title={
                <span
                  dangerouslySetInnerHTML={{
                    __html: t("features.deviation.title"),
                  }}
                />
              }
              description={t("features.deviation.desc")}
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src={VIDEO_LINKS.feature4}
              title={
                <span
                  dangerouslySetInnerHTML={{
                    __html: t("features.theWayOfWinter.title"),
                  }}
                />
              }
              description={t("features.theWayOfWinter.desc")}
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
              <h1 className="bento-title special-font max-w-64 text-black">
                <span dangerouslySetInnerHTML={{ __html: t("features.more.title") }} />
              </h1>

              <TiLocationArrow className="m-5 scale-[5] self-end" />
            </div>
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <InViewVideo src={VIDEO_LINKS.feature5} className="size-full object-cover object-center" />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};
