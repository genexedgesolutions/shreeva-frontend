import ProductCard1 from "@/components/productCards/ProductCard1";
import useProducts from "@/hooks/useProducts";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function ProductsNewArrivals({
  title = "New Arrivals",
  parentClass = "",
}) {
  const { products = [], loading } = useProducts();

  // flexible flag checks
  const isNewArrival = (p) =>
    p?.isNewArrival === true ||
    p?.is_newarrival === true ||
    p?.is_newArrival === true ||
    p?.is_new === true ||
    p?.is_newlaunched === true;

  const newArrivals = Array.isArray(products) ? products.filter(isNewArrival) : [];
  const canSlide = newArrivals.length > 1;

  return (
    <section className={parentClass}>
      <div className="container mt-2 mb-5">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">{title}</h3>
          <p className="subheading text-dark">
            Browse our Top Trending: the hottest picks loved by all.
          </p>
        </div>

        {loading ? (
          <div className="skeleton-wrapper pt-5 px-5">
            <div className="skeleton-item" />
            <div className="skeleton-item" />
            <div className="skeleton-item" />
            <div className="skeleton-item" />
          </div>
        ) : newArrivals.length === 0 ? (
          <div className="py-5 text-center">
            <p className="text-secondary">No new arrivals to show.</p>
          </div>
        ) : (
          <div className="position-relative">
            <Swiper
              className="swiper tf-sw-latest"
              dir="ltr"
              modules={[Navigation, Autoplay]}
              navigation={{ prevEl: ".snbp-new", nextEl: ".snbn-new" }}
              autoplay={
                canSlide
                  ? { delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }
                  : false
              }
              loop={canSlide}
              spaceBetween={15}
              breakpoints={{
                0: { slidesPerView: 2, spaceBetween: 15 },
                768: { slidesPerView: 3, spaceBetween: 30 },
                1200: { slidesPerView: 4, spaceBetween: 30 },
              }}
            >
              {newArrivals.map((product, i) => (
                <SwiperSlide key={product._id ?? product.id ?? i} className="swiper-slide">
                  <ProductCard1 product={product} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* side arrows only (no dots) */}
            {canSlide && (
              <>
                <button
                  className="nav-prev-new nav-sw style-line nav-sw-left snbp-new"
                  aria-label="Previous"
                >
                  <i className="icon icon-arrLeft" />
                </button>
                <button
                  className="nav-next-new nav-sw style-line nav-sw-right snbn-new"
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
      `}</style>
    </section>
  );
}
