import { slides0, slides0Mobile, slides7, slides7Mobile } from "@/data/heroSlides";
import { Swiper, SwiperSlide } from "swiper/react";

import { Link } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
export default function Hero2() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides = isMobile ? slides7Mobile : slides7;
  return (
    <div className="tf-slideshow slider-style2 slider-effect-fade">
      <Swiper
        dir="ltr"
        centeredSlides={false}
        spaceBetween={0}
        loop={true}
        autoplay={false}
        breakpoints={{
          1024: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          0: { slidesPerView: 1 },
        }}
        modules={[Pagination]}
        pagination={{ clickable: true, el: ".spd18" }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="wrap-slider">
              <a href="/products">
              <img
              alt={`fashion-slideshow-${index}`}
              src={slide.imgSrc}
              className="img-fluid w-100 d-block"
            />

              </a>
              <div className="box-content">
                <div className="container">
                  <div className="content-slider">
                    <div className="box-title-slider">
                      <div
                        className="fade-item fade-item-1 heading title-display text-primary"
                        dangerouslySetInnerHTML={{ __html: slide.title }}
                      />
                      <p className="fade-item fade-item-2 body-text-1 text-dark">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="wrap-pagination">
        <div className="container">
          <div className="sw-dots sw-pagination-slider type-circle white-circle-line justify-content-center spd18" />
        </div>
      </div>
    </div>
  );
}