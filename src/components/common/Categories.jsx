// frontend/src/components/Categories.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import api from "../../lib/api";
import "swiper/css";
import "swiper/css/navigation";

export default function Categories({ parentClass = "flat-spacing pt-0" }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (raw) => {
    if (!raw) return "";
    const s = Array.isArray(raw) ? String(raw[0]) : String(raw);
    const url = s.split(" !")[0].trim();
    return url || "";
  };

  useEffect(() => {
    let mounted = true;
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories", { params: { limit: 100 } });
        const raw = res?.data?.categories ?? res?.data ?? res?.categories ?? [];
        const arr = Array.isArray(raw) ? raw : [];

        const mapped = arr
          .map((c) => {
            const title = c.name ?? c.title ?? "Untitled";
            const imageRaw =
              c.thumbnail ?? (Array.isArray(c.images) && c.images.length ? c.images[0] : null);
            const imgSrc = getImageUrl(imageRaw) || "";
            const itemsCount =
              typeof c.childrenCount === "number"
                ? c.childrenCount
                : Array.isArray(c.children)
                ? c.children.length
                : 0;

            return {
              id: c._id ?? c.id ?? title,
              title,
              imgSrc,
              alt: title,
              itemsCount,
              slug: c.slug ?? c.name?.toLowerCase().replace(/\s+/g, "-"),
              raw: c,
            };
          })
          .filter((it) => it.imgSrc && it.imgSrc.length > 0)
          .sort((a, b) => a.title.localeCompare(b.title, "en", { sensitivity: "base" }));

        if (mounted) setItems(mapped);
      } catch (err) {
        console.error("Categories fetch error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCategories();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading || !items.length) {
    return null;
  }

  return (
    <section className={parentClass}>
      <div className="container mt-3">
        <div className="flat-collection-circle position-relative">
          <Swiper
            className="tf-sw-categories"
            modules={[Navigation]}
            navigation={{ prevEl: ".snbp1", nextEl: ".snbn1" }}
            spaceBetween={16}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 12 },        // 📱 phones → 2 cards
              480: { slidesPerView: 2, spaceBetween: 14 },      // small phones / phablets
              768: { slidesPerView: 3, spaceBetween: 16 },      // tablets
              1200: { slidesPerView: 4, spaceBetween: 18 },     // desktops
            }}
          >
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="collection-card hover-img text-center">
                  <Link
                    to={`/collections/${item.slug ?? item.id}`}
                    className="tile img-style"
                    aria-label={item.title}
                  >
                    <img
                      src={item.imgSrc}
                      alt={item.alt}
                      loading="lazy"
                    />
                  </Link>

                  <div className="collection-content mt-2">
                    <Link
                      to={`/shop-collection/${item.slug ?? item.id}`}
                      className="cls-title d-inline-flex align-items-center gap-1"
                    >
                      <h6 className="text m-0">{item.title}</h6>
                      <i className="icon icon-arrowUpRight" />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Nav arrows (hidden on mobile via CSS) */}
          <button
            className="nav-prev-categories nav-sw style-line nav-sw-left snbp1"
            aria-label="Previous"
          >
            <i className="icon icon-arrLeft" />
          </button>
          <button
            className="nav-next-categories nav-sw style-line nav-sw-right snbn1"
            aria-label="Next"
          >
            <i className="icon icon-arrRight" />
          </button>
        </div>
      </div>

      {/* Scoped styles for the slider tiles */}
      <style jsx>{`
        .collection-card {
          width: 100%;
        }
        .tile {
          display: block;
          width: 100%;
          /* Square tiles that scale fluidly */
          aspect-ratio: 1 / 1;
          border-radius: 12px;
          overflow: hidden;
          background: #f7f7f7;
        }
        /* Fallback if aspect-ratio isn't supported */
        @supports not (aspect-ratio: 1 / 1) {
          .tile {
            position: relative;
            height: 0;
            padding-top: 100%;
          }
          .tile > img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
          }
        }
        .tile > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.3s ease;
        }
        .tile:hover > img {
          transform: scale(1.03);
        }

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

        @media (min-width: 992px) {
          .nav-sw { display: inline-flex; }
        }
      `}</style>
    </section>
  );
}
