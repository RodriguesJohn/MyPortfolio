import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import componentGalleryVideo from "@/assets/case-studies-hero.mp4";

const STACK_LAYERS = [
  { layerClass: "v2-gallery-stack-card--back" },
  { layerClass: "v2-gallery-stack-card--mid" },
  { layerClass: "v2-gallery-stack-card--front" },
] as const;

type TiltedGalleryStackProps = {
  className?: string;
};

const TiltedGalleryStack = ({ className = "" }: TiltedGalleryStackProps) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    void video.play().catch(() => {});
  }, []);

  return (
    <button
      type="button"
      onClick={() => navigate("/component-gallery")}
      className={`v2-gallery-stack group mt-6 block w-full text-left ${className}`}
      aria-label="Explore component gallery"
    >
      <div className="relative mx-auto h-[168px] w-full max-w-[248px]">
        {STACK_LAYERS.map((layer, index) => {
          const isFront = index === STACK_LAYERS.length - 1;
          return (
            <div
              key={index}
              className={`v2-gallery-stack-card ${layer.layerClass} absolute inset-x-0 top-3 mx-auto aspect-[4/3] w-[88%] overflow-hidden rounded-[14px] ring-1 ring-zinc-800/80 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-[0_18px_40px_-22px_rgba(0,0,0,0.45)]`}
              style={{ zIndex: index + 1 }}
            >
              {isFront ? (
                <>
                  <video
                    ref={videoRef}
                    src={componentGalleryVideo}
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/[0.04]" />
                </>
              ) : (
                <div
                  className={`absolute inset-0 ${
                    index === 0
                      ? "bg-gradient-to-br from-zinc-700 to-zinc-900"
                      : "bg-gradient-to-br from-zinc-600 to-zinc-800"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 px-1">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-500">
            Explore
          </p>
          <p className="v2-gallery-stack-title mt-0.5 text-[14px] font-semibold tracking-[-0.01em] text-zinc-200 transition-colors group-hover:text-white">
            Component gallery
          </p>
        </div>
        <span className="v2-gallery-stack-arrow flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-800/80 bg-zinc-900/40 text-zinc-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-zinc-700 group-hover:text-zinc-100">
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </button>
  );
};

export default TiltedGalleryStack;
