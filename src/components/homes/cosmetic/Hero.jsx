import { slides0, slides0Mobile } from "@/data/heroSlides";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const slides = isMobile ? slides0Mobile : slides0;

  // mobile: no peek  •  desktop: peek
  const swiperProps = isMobile
    ? {
        centeredSlides: false,
        spaceBetween: 0,
        breakpoints: {
          0:   { slidesPerView: 1, spaceBetween: 0 },
          640: { slidesPerView: 1, spaceBetween: 0 },
          768: { slidesPerView: 1, spaceBetween: 0 },
        },
      }
    : {
        centeredSlides: true,
        spaceBetween: 16,
        loopAdditionalSlides: 2,
        breakpoints: {
          1024: { slidesPerView: 1.12, spaceBetween: 16 },
          1280: { slidesPerView: 1.14, spaceBetween: 18 },
          1536: { slidesPerView: 1.16, spaceBetween: 20 },
        },
      };

  return (
    <div className="hero-wrap">
      <div className="hero-frame">
        <Swiper
          key={isMobile ? "m" : "d"}              // resize पर loop reset safe
          dir="ltr"
          className="hero-swiper"
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true, el: ".hero-dots" }}

          // 🔁 true infinite loop + smooth autoplay
          loop={slides.length > 1}
          loopedSlides={Math.min(slides.length, 6)}
          slidesPerGroup={1}
          speed={700}
          autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: false }}

          {...swiperProps}
        >
          {slides.map((s, i) => (
            <SwiperSlide key={i}>
              <div className="slide-card">
                <div className="slide">
                  <a
                    href={s.href || "/products"}
                    className="media"
                    aria-label={
                      s.title?.replace(/<[^>]+>/g, "") || `slide-${i}` // regex fix
                    }
                  >
                    <img src={s.imgSrc} alt="" loading="eager" />
                  </a>
                  <div className="panel" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="hero-dots" />
      </div>

      <style jsx>{`
        .hero-wrap { padding: 12px 12px 4px; }
        .hero-frame { position: relative; max-width: 1400px; margin: 0 auto; overflow: visible; background: transparent; }
        .slide-card { border-radius: 18px; overflow: hidden; box-shadow: 0 10px 32px rgba(0,0,0,0.12); background: #fff; }
        .slide { position: relative; width: 100%; aspect-ratio: 21 / 8; }
        @media (max-width: 768px) { .slide { aspect-ratio: 1   / 1; } }
        .media { position: absolute; inset: 0; display: block; }
        .media img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .panel { position: absolute; inset: 0; }
        .hero-dots { position: absolute; left: 50%; bottom: 14px; transform: translateX(-50%); display: flex; gap: 10px; z-index: 5; }
        :global(.hero-dots .swiper-pagination-bullet){ width:10px; height:10px; background:#fff; opacity:.7; transform:rotate(45deg); border:1px solid rgba(0,0,0,.12); }
        :global(.hero-dots .swiper-pagination-bullet-active){ background:#c29863; opacity:1; border-color:#c29863; }
      `}</style>
    </div>
  );
}
