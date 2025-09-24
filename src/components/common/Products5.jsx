import ProductCard1 from "@/components/productCards/ProductCard1";
import useProducts from "@/hooks/useProducts";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products5() {
  const { products, loading } = useProducts();

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section wow fadeInUp text-center">
          <h3 className="heading text-primary">Glow More, Spend Less!</h3>
          <p className="subheading">
            From frizz-free hair to radiant, protected skin, we bring you gentle
            yet effective formulations crafted with love.
          </p>
        </div>

        {loading ? (
          <>
 

          {/* Skeleton Loader (When loading) */}
          <div className="skeleton-wrapper pt-5 px-5">
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
            {/* Add as many skeletons as needed */}
          </div>
        </>
        ) : (
          <Swiper
            className="swiper tf-sw-latest"
            dir="ltr"
            spaceBetween={15}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 15 },
              768: { slidesPerView: 3, spaceBetween: 30 },
              1200: { slidesPerView: 6, spaceBetween: 30 },
            }}
            modules={[Pagination]}
            pagination={{
              clickable: true,
              el: ".spd6",
            }}
          >
            {products.map((product, i) => (
              <SwiperSlide key={i} className="swiper-slide border rounded p-2">
                <ProductCard1 product={product} />
              </SwiperSlide>
            ))}

            {/* <div className="sw-pagination-latest spd6 sw-dots type-circle justify-content-center" /> */}
          </Swiper>
        )}
      </div>
    </section>
  );
}
