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
  console.log("ProductsExclusiveEdition products:", products);

  // ✅ filter exclusive edition products only
  const exclusiveProducts = Array.isArray(products)
    ? products.filter((p) => p.is_exclusiveedition === true)
    : [];

  const canSlide = exclusiveProducts.length > 1;

  return (
    <section className={parentClass}>
      <div className="container mt-2 mb-5">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">{title}</h3>
          <p className="subheading text-dark">
            Browse our Exclusive Editions: hand-picked pieces crafted to perfection.
          </p>
        </div>

        {exclusiveProducts.length === 0 ? (
          <div className="w-100 py-5 text-center">No exclusive edition products available</div>
        ) : (
          <Swiper
            className="swiper tf-sw-latest"
            dir="ltr"
            modules={[Autoplay]}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 12 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1200: { slidesPerView: 4, spaceBetween: 24 },
            }}
            autoplay={
              canSlide
                ? { delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true }
                : false
            }
            loop={canSlide}
          >
            {exclusiveProducts.map((product, i) => (
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
