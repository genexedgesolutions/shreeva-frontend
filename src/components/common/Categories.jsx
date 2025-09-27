// frontend/src/components/Categories.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import api from "../../lib/api"; // adjust relative path if needed
import "swiper/css";
import "swiper/css/navigation";

export default function Categories({ parentClass = "flat-spacing pt-0" }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            const imageRaw = c.thumbnail ?? (Array.isArray(c.images) && c.images.length ? c.images[0] : null);
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
          .filter((it) => it.imgSrc && it.imgSrc.length > 0);

        mapped.sort((a, b) => a.title.localeCompare(b.title, "en", { sensitivity: "base" }));

        if (!mounted) return;
        setItems(mapped);
      } catch (err) {
        console.error("Categories fetch error:", err);
        if (!mounted) return;
        setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCategories();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className={parentClass}>
        <div className="pe-5 ps-5">
          <div className="heading-section text-center">
            <h3 className="heading">Loading categories…</h3>
          </div>
        </div>
      </section>
    );
  }

  if (error || !items.length) {
    return null;
  }

  return (
    <section className={parentClass}>
      <div className="pe-5 ps-5">
        <div className="heading-section text-center">{/* optional heading */}</div>
        <div className="flat-collection-circle">
          <Swiper
            className="tf-sw-categories pe-5 ps-5"
            slidesPerView={3}
            breakpoints={{
              1424: { slidesPerView: 3 },
              1024: { slidesPerView: 3 },
              668: { slidesPerView: 3 },
              0: { slidesPerView: 3 },
            }}
            spaceBetween={20}
            modules={[Navigation]}
            navigation={{ prevEl: ".snbp1", nextEl: ".snbn1" }}
          >
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="collection-circle hover-img" style={{ textAlign: "center" }}>
                  <Link
                    to={`/shop-collection/${item.slug ?? item.id}`}
                    className="img-style"
                    style={{
                      display: "block",
                      width: "400px",
                      height: "400px",
                      margin: "0 auto",
                      overflow: "hidden",
                      borderRadius: "8px",
                      background: "#f7f7f7",
                    }}
                  >
                    <img
                      src={item.imgSrc}
                      alt={item.alt}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        display: "block",
                      }}
                    />
                  </Link>
                  <div className="collection-content text-center" style={{ marginTop: "8px" }}>
                    <div>
                      <Link to={`/shop-collection/${item.slug ?? item.id}`} className="cls-title">
                        <h6 className="text">{item.title}</h6>
                        <i className="icon icon-arrowUpRight" />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="nav-prev-categories d-none d-lg-flex nav-sw style-line nav-sw-left snbp1">
            <i className="icon icon-arrLeft" />
          </div>
          <div className="nav-next-categories d-none d-lg-flex nav-sw style-line nav-sw-right snbn1">
            <i className="icon icon-arrRight" />
          </div>
        </div>
      </div>
    </section>
  );
}
