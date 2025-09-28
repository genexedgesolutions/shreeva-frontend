import ProductCard1 from "@/components/productCards/ProductCard1";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function ProductsBestSeller({
  title = "Exclusive Editions",
  parentClass = "",
  products = [],
}) {
  // ✅ only bestsellers
  const bestsellers = Array.isArray(products)
    ? products.filter((p) => p?.is_bestseller === true)
    : [];

  const canSlide = bestsellers.length > 1;
  console.log(bestsellers.length);
  

  return (
    <section className={parentClass}>
      <div className="container mt-2 mb-5">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">{title}</h3>
          <p className="subheading text-dark">
            Browse our Top Trending: the hottest picks loved by all.
          </p>
        </div>

        {bestsellers.length === 0 ? (
          <div className="w-100 py-5 text-center">No products available</div>
        ) : (
          <Swiper
            className="swiper tf-sw-latest"
            dir="ltr"
            modules={[Autoplay]}
            spaceBetween={15}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 15 },
              768: { slidesPerView: 3, spaceBetween: 30 },
              1200: { slidesPerView: 4, spaceBetween: 30 },
            }}
            autoplay={
              canSlide
                ? { delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }
                : false
            }
            loop={canSlide}
          >
            {bestsellers.slice(0, 8).map((product, i) => (
              <SwiperSlide key={product._id ?? product.id ?? i}>
                <ProductCard1 product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
