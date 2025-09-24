import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Link } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { use } from "react";
import useProducts from "@/hooks/useProducts";
export default function Tiktok({ parentClass = "flat-spacing pt-0" }) {
  const {products} = useProducts();
  const videoRefs = useRef([]);
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);

  const handleMouseEnter = (index) => {
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === index) {
          video.play();
          setActiveVideoIndex(index); // Set active video index
        } else {
          video.pause();
        }
      }
    });
  };

  const handleMouseLeave = () => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
      }
    });
    setActiveVideoIndex(null); // Reset active video index
  };

  return (
    <section className={parentClass}>
      <div className="container pb-0">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading text-primary text-bold">
            ✨ Discover Beauty with Beaubless ✨
          </h3>
          <p className="subheading">
            From exclusive product launches to in-depth reviews and unboxings,
            dive into the world of Beaubless and elevate your beauty routine.💖
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-sw-collection"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          modules={[Pagination]}
          pagination={{ el: ".spd456", clickable: true }}
        >
          {products.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="collection-social hover-img wow fadeInUp"
                data-wow-delay={slide.wowDelay}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  alt="poster"
                  className={`poster ${
                    activeVideoIndex === index ? "hide" : ""
                  }`}
                  src={slide.images[0]}
                  width={450}
                  height={600}
                />
                {/* <video
                  className="hover-video"
                  ref={(el) => (videoRefs.current[index] = el)}
                  controls
                  width={300}
                  height={400}
                  playsInline
                  muted
                  loop
                >
                  <source src={slide.videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video> */}
                <div className="cls-content">
                  <div className="avatar avt-60 round">
                    <img
                      alt="avatar"
                      src={slide.images[0]}
                      width={90}
                      height={90}
                    />
                  </div>
                  <div className="info">
                    <div>
                      <Link
                        to={`/products/${slide.slug}`}
                        className="title text-title text-white link text-line-clamp-1"
                      >
                        {slide.name}
                      </Link>
                    </div>
                    <span className="price text-button text-white">
                      ₹{slide.offerPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-pagination-collection sw-dots type-circle justify-content-center spd456"></div>
        </Swiper>
      </div>
    </section>
  );
}
