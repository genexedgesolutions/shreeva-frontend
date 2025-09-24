import { products42 } from "@/data/products";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import KoreanProductCard from "../productCards/KoreanProductCard";

export default function KoreanInspired() {
  return (
    <section className="flat-spacing">
      {/* Heading Outside the Image */}
      <div className="container">
        <div className="heading-section wow fadeInUp text-center">
          <h3 className="heading text-primary">Korean-Inspired Skincare</h3>
          <p className="subheading">
            No Harsh Chemicals | Dermatologist Approved | Suitable for All Skin
            Types Join the Beaubless Glow Community Today!
          </p>
        </div>
      </div>

      {/* Image + Slider */}
      <div className="position-relative" style={{ height: "1000px" }}>
        {/* Background Image */}
        <img
          src="/images/banner/Korean.jpg"
          alt="Korean Skincare Banner"
          className="w-100 h-100 position-absolute top-0 start-0 rounded"
          style={{ objectFit: "cover", zIndex: 0 }}
        />

        {/* Slider Section overlayed at the bottom */}
        <div className=" position-absolute bottom-0 w-100 px-md-10 px-3 pb-5">
          <div
            className="p-3"
            style={{
              maxHeight: "500px",
              overflow: "hidden",
            }}
          >
            <Swiper
              className="swiper tf-sw-latest"
              dir="ltr"
              spaceBetween={5}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 5 },
                768: { slidesPerView: 3, spaceBetween: 10 },
                1200: { slidesPerView: 3, spaceBetween: 20 },
              }}
              modules={[Pagination]}
              pagination={{
                clickable: true,
                el: ".spd6",
              }}
            >
              {products42.map((product, i) => {
                const middleIndex = Math.floor(products42.length / 2);
                const slideClass =
                  i === 0
                    ? "first-slide"
                    : i === products42.length - 1
                    ? "last-slide"
                    : i === middleIndex
                    ? "middle-slide"
                    : "regular-slide";

                return (
                  <SwiperSlide
                    key={i}
                    className={`swiper-slide p-2 ${slideClass}`}
                  >
                    <div className="position-relative">
                      <KoreanProductCard key={i} product={product} />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="sw-pagination-latest spd6 sw-dots type-circle justify-content-center mt-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
