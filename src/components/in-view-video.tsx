import { useEffect, useRef, useState, type RefObject } from "react";
import { useIntersection } from "react-use";

interface InViewVideoProps {
  src: string;
  className?: string;
  rootMargin?: string;
}

export const InViewVideo = ({ src, className, rootMargin = "300px" }: InViewVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intersection = useIntersection(containerRef as unknown as RefObject<HTMLElement>, {
    root: null,
    rootMargin,
    threshold: 0.01,
  });

  const [hasLoadedSrc, setHasLoadedSrc] = useState(false);
  const isInView = Boolean(intersection?.isIntersecting);

  useEffect(() => {
    if (isInView) setHasLoadedSrc(true);
  }, [isInView]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (!isInView) {
      el.pause();
      return;
    }

    el.play().catch(() => undefined);
  }, [isInView, hasLoadedSrc]);

  return (
    <div ref={containerRef} className={className}>
      <video
        ref={videoRef}
        src={hasLoadedSrc ? src : undefined}
        muted
        loop
        playsInline
        preload="none"
        className="size-full object-cover object-center"
      />
    </div>
  );
};
