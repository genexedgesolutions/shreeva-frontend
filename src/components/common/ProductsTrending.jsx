import ProductCard1 from "@/components/productCards/ProductCard1";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function ProductsTrending({
  parentClass = "flat-spacing-3",
  products = [],
  loading = false,
}) {
  // ✅ only trending products
  const trendingProducts = Array.isArray(products)
    ? products.filter((p) => p?.is_trending === true)
    : [];

  const canSlide = trendingProducts.length > 1;

  return (
    <section className={parentClass}>
      <div className="container">
        <div className="heading-section wow fadeInUp text-center">
          <h3 className="heading text-primary">Shreeva Jewellery — Trending Collections</h3>
          <p className="subheading">
            Discover timeless pieces crafted with precision and passion. Shreeva blends traditional
            Indian artistry with contemporary design — gold, diamonds, and precious gemstones.
          </p>
        </div>

        {loading ? (
          <div className="skeleton-wrapper pt-5 px-5">
            <div className="skeleton-item" />
            <div className="skeleton-item" />
            <div className="skeleton-item" />
            <div className="skeleton-item" />
          </div>
        ) : trendingProducts.length === 0 ? (
          <div className="py-5 text-center">
            <p className="text-secondary">No trending products to show.</p>
          </div>
        ) : (
          <div className="position-relative">
            <Swiper
              className="tf-sw-trending"
              modules={[Navigation, Autoplay]}
              navigation={{ prevEl: ".snbp-trending", nextEl: ".snbn-trending" }}
              autoplay={
                canSlide
                  ? { delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }
                  : false
              }
              loop={canSlide}
              spaceBetween={16}
              breakpoints={{
                0: { slidesPerView: 1.2, spaceBetween: 12 },
                480: { slidesPerView: 2, spaceBetween: 14 },
                768: { slidesPerView: 3, spaceBetween: 16 },
                1200: { slidesPerView: 4, spaceBetween: 18 },
              }}
            >
              {trendingProducts.map((product, i) => (
                <SwiperSlide key={product._id ?? product.id ?? i}>
                  <ProductCard1 product={product} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Arrows only if more than 1 slide */}
            {canSlide && (
              <>
                <button
                  className="nav-prev-trending nav-sw style-line nav-sw-left snbp-trending"
                  aria-label="Previous"
                >
                  <i className="icon icon-arrLeft" />
                </button>
                <button
                  className="nav-next-trending nav-sw style-line nav-sw-right snbn-trending"
                  aria-label="Next"
                >
                  <i className="icon icon-arrRight" />
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .nav-sw {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
          display: none; /* hidden on mobile; shown >= 992px */
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 999px;
          background: #fff;
          border: 1px solid #eaeaea;
          box-shadow: 0 6px 18px rgba(0,0,0,0.06);
        }
        .nav-sw-left { left: -8px; }
        .nav-sw-right { right: -8px; }
        @media (min-width: 992px) { .nav-sw { display: inline-flex; } }

        .skeleton-wrapper {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .skeleton-item {
          height: 320px;
          border-radius: 12px;
          background: linear-gradient(90deg, #f2f2f2 25%, #eeeeee 37%, #f2f2f2 63%);
          background-size: 400% 100%;
          animation: shimmer 1.2s infinite;
        }
        @keyframes shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: 0 0; }
        }
      `}</style>
    </section>
  );
}
