import React, { useMemo } from "react";
import ProductCard1 from "@/components/productCards/ProductCard1";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// IMPORTANT: ensure these CSS imports exist at app-level (e.g. in _app.js) or uncomment below:
// import "swiper/css";
// import "swiper/css/pagination";

export default function ProductsBestSeller({
  title = "Exclusive Watches Edition 2025",
  parentClass = "",
  products = [], // products passed as prop
  categoryId = "68d919731066d34ec8780f19", // default category filter (you can override via prop)
  limit = 8,
}) {
  // normalize + filter products by categoryId (flexible to handle different shapes)
  const filtered = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) return [];

    return products.filter((p) => {
      if (!p) return false;

      // possible shapes: p.category === "id", p.category._id, p.category.id, p.category as array
      const cat = p.category;
      if (!cat) return false;
      console.log(cat);
      

      if (typeof cat === "string") return cat === categoryId;
      if (typeof cat === "object") {
        // some backends send { _id: "...", name: "..." } or { id: "..." }
        if (cat._id && String(cat._id) === String(categoryId)) return true;
        if (cat.id && String(cat.id) === String(categoryId)) return true;
        if (cat === categoryId) return true;
      }
      // if category is array of ids
      if (Array.isArray(cat) && cat.length) {
        if (cat.includes(categoryId)) return true;
        // maybe array of objects
        if (cat.some((c) => (c && (c._id === categoryId || c.id === categoryId || c === categoryId)))) return true;
      }

      return false;
    });
  }, [products, categoryId]);

  const finalList = filtered.slice(0, limit);

  return (
    <section className={parentClass}>
      <div className="container mt-2 mb-5">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">{title}</h3>
          <p className="subheading text-dark">
            Discover timeless elegance with our exclusive range of premium watches — now available in Lab Grown Diamonds and Moissanite options. Crafted for those who value luxury with a modern twist.
          </p>
        </div>

        <Swiper
          className="swiper tf-sw-latest"
          dir="ltr"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1200: { slidesPerView: 4, spaceBetween: 30 },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd4",
          }}
        >
          {finalList.length > 0 ? (
            finalList.map((product, i) => (
              <SwiperSlide key={product._id ?? product.id ?? product.slug ?? i} className="swiper-slide">
                <ProductCard1 product={{ ...product, images: product.images || [] }} />
              </SwiperSlide>
            ))
          ) : (
            <div className="text-center w-100" style={{ padding: 20 }}>
              <p className="text-center">No products available</p>
            </div>
          )}

          <div className="sw-pagination-latest spd4 sw-dots type-circle justify-content-center" />
        </Swiper>
      </div>
    </section>
  );
}
