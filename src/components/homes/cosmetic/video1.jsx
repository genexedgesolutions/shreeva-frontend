import React, { useEffect, useRef, useState } from "react";

export default function Video1() {
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);

  const VIDEO_SRC =
    "https://res.cloudinary.com/dyjvpgmsp/video/upload/v1759072576/Premium-Quality_ozutg1.mp4";
  const POSTER_DESKTOP = "images/banner/web-banner5.png";
  const POSTER_MOBILE = "images/banner/mobile-banner5.png";

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Respect "prefers-reduced-motion": pause autoplay if user prefers less motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handle = () => {
      const v = videoRef.current;
      if (!v) return;
      if (mq.matches) {
        v.pause();
      } else {
        // try autoplay (iOS/Safari requires muted + playsInline)
        v.play().catch(() => {});
      }
    };
    handle();
    mq.addEventListener?.("change", handle);
    return () => mq.removeEventListener?.("change", handle);
  }, []);

  // Optional: start/pause when in viewport (uncomment if you want)
  // useEffect(() => {
  //   const v = videoRef.current;
  //   if (!v) return;
  //   const io = new IntersectionObserver(([entry]) => {
  //     if (entry.isIntersecting) v.play().catch(() => {});
  //     else v.pause();
  //   }, { threshold: 0.25 });
  //   io.observe(v);
  //   return () => io.disconnect();
  // }, []);

  return (
    <section>
      <div className="hero-video-wrap">
        <video
          ref={videoRef}
          className="hero-video"
          src={VIDEO_SRC}
          poster={isMobile ? POSTER_MOBILE : POSTER_DESKTOP}
          // important for mobile autoplay:
          muted
          playsInline
          loop
          autoPlay
          // better performance:
          preload="none"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
          {/* Fallback text for very old browsers */}
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Scoped styles */}
      <style jsx>{`
        .hero-video-wrap {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #000; /* subtle frame for letterboxing */
        }
        .hero-video {
          display: block;
          width: 100%;
          height: auto;
          /* keep a nice, banner-like height */
          aspect-ratio: ${/* mobile vs desktop aspect targets */ ""} ${
        isMobile ? "384/200" : "1600/600"
      };
          object-fit: cover;
          object-position: center;
        }

        @supports not (aspect-ratio: 1 / 1) {
          .hero-video-wrap {
            /* fallback min-height if aspect-ratio unsupported */
            min-height: ${isMobile ? "400px" : "500px"};
          }
          .hero-video {
            height: 100%;
          }
        }
      `}</style>
    </section>
  );
}
