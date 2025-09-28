import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import api from "../../lib/api";
import "swiper/css";
import "swiper/css/pagination";

export default function Tiktok({ parentClass = "flat-spacing pt-0" }) {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    let mounted = true;

    const fetchReviews = async () => {
      try {
        setLoading(true);
        setErr(null);

        const res = await api.get("/products/reviews/all", { params: { limit: 100 } });
        const data = res?.data ?? {};
        const products = Array.isArray(data.products) ? data.products : [];

        // Flatten: 1 slide per review. If no reviews, 1 slide from product fallback.
        const mapped = products.flatMap((p) => {
          const title = p.title || "Untitled";
          const slug = p.slug || title.toLowerCase().replace(/\s+/g, "-");
          const productImg = p.image || "";
          // Optional: if someday product has videos array
          const productVideo = Array.isArray(p.video) && p.video.length ? p.video[0] : "";

          const reviews = Array.isArray(p.reviews) ? p.reviews : [];

          const reviewSlides = reviews.map((r, idx) => {
            const revVideo = Array.isArray(r?.video) && r.video.length ? r.video[0] : "";
            const revImage = Array.isArray(r?.images) && r.images.length ? r.images[0] : "";

            const videoSrc = revVideo || productVideo || ""; // prefer review video, else product video if exists
            const poster = revImage || productImg || "";

            const rating =
              typeof r?.rating === "number" && r.rating >= 0
                ? Math.min(5, Math.max(0, r.rating))
                : null;

            return {
              key: `${p.product_id || slug}-${r?._id || idx}`,
              productId: p.product_id,
              name: title,
              slug,
              poster,
              videoSrc,
              avatar: productImg || poster,
              rating,
              reviewCount: reviews.length || 0,
              reviewIndex: idx + 1,
              reviewer: r?.name || "Anonymous",
              verified: !!r?.verifiedPurchase,
              comment: (r?.comment || "").trim(),
              hasAnyMedia: !!(revVideo || revImage || productVideo || productImg),
            };
          });

          // If product has no reviews, still show 1 fallback card
          if (!reviewSlides.length) {
            reviewSlides.push({
              key: `${p.product_id || slug}-fallback`,
              productId: p.product_id,
              name: title,
              slug,
              poster: productImg,
              videoSrc: productVideo,
              avatar: productImg,
              rating: null,
              reviewCount: 0,
              reviewIndex: 0,
              reviewer: "",
              verified: false,
              comment: "",
              hasAnyMedia: !!(productVideo || productImg),
            });
          }

          // Filter out if absolutely no media available
          return reviewSlides.filter((s) => s.hasAnyMedia);
        });

        if (mounted) setSlides(mapped);
      } catch (e) {
        console.error("Reviews fetch error:", e);
        if (mounted) setErr("Couldn't load reviews right now.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchReviews();
    return () => {
      mounted = false;
    };
  }, []);

  const handleMouseEnter = (index) => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        try {
          video.play();
        } catch {}
        setActiveVideoIndex(index);
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  };

  const handleMouseLeave = () => {
    videoRefs.current.forEach((video) => {
      if (!video) return;
      video.pause();
    });
    setActiveVideoIndex(null);
  };

  if (loading) {
    return (
      <section className={parentClass}>
        <div className="container py-5 text-center">Loading reviews…</div>
      </section>
    );
  }

  if (err) {
    return (
      <section className={parentClass}>
        <div className="container py-5 text-center">{err}</div>
      </section>
    );
  }

  if (!slides.length) {
    return (
      <section className={parentClass}>
        <div className="container py-5 text-center">No reviews to show yet.</div>
      </section>
    );
  }

  return (
    <section className={parentClass}>
      <div className="container pb-0 mt-4 mb-4">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading text-primary text-bold">✨ Discover Elegance with Shreeva Jewels ✨</h3>
          <p className="subheading">
            From timeless diamond collections to modern designs, explore craftsmanship and add a touch of luxury to every occasion. 💎
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
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.key ?? index}>
              <div
                className="collection-social hover-img wow fadeInUp"
                data-wow-delay="0s"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                style={{ position: "relative" }}
              >
                {/* Poster (hidden when video is active) */}
                {slide.poster ? (
                  <img
                    alt="poster"
                    className={`poster ${activeVideoIndex === index ? "hide" : ""}`}
                    src={slide.poster}
                    width={450}
                    height={600}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: activeVideoIndex === index && slide.videoSrc ? "none" : "block",
                      borderRadius: 12,
                      objectFit: "cover",
                    }}
                  />
                ) : null}

                {/* Video (if available) */}
                {slide.videoSrc ? (
                  <video
                    className="hover-video"
                    ref={(el) => (videoRefs.current[index] = el)}
                    controls
                    playsInline
                    muted
                    loop
                    style={{
                      width: "100%",
                      height: "auto",
                      display: activeVideoIndex === index ? "block" : "none",
                      borderRadius: 12,
                    }}
                  >
                    <source src={slide.videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : null}

                {/* overlay content */}
                <div
                  className="cls-content"
                  style={{
                    position: "absolute",
                    left: 12,
                    right: 12,
                    bottom: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: "rgba(0,0,0,0.45)",
                    backdropFilter: "blur(3px)",
                    borderRadius: 12,
                    padding: "10px 12px",
                  }}
                >
                  <div
                    className="avatar avt-60 round"
                    style={{ width: 48, height: 48, overflow: "hidden", borderRadius: "50%" }}
                  >
                    <img
                      alt="avatar"
                      src={slide.avatar || slide.poster}
                      width={90}
                      height={90}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>

                  <div className="info" style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <Link
                        to={`/products/${slide.slug}`}
                        className="title text-title text-white link text-line-clamp-1"
                        style={{
                          color: "#fff",
                          textDecoration: "none",
                          fontWeight: 600,
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: "100%",
                        }}
                        title={slide.name}
                      >
                        {slide.name}
                      </Link>
                      {slide.reviewCount > 1 && (
                        <span
                          style={{
                            fontSize: 11,
                            color: "#fff",
                            opacity: 0.9,
                            padding: "2px 6px",
                            border: "1px solid rgba(255,255,255,0.3)",
                            borderRadius: 999,
                          }}
                          title={`Review ${slide.reviewIndex} of ${slide.reviewCount}`}
                        >
                          #{slide.reviewIndex}/{slide.reviewCount}
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: 12, color: "#fff", opacity: 0.95 }}>
                      {slide.rating != null ? `★ ${slide.rating}` : "No rating"}
                      {slide.verified ? " · Verified Purchase" : ""}
                      {slide.reviewer ? ` · ${slide.reviewer}` : ""}
                    </div>

                    {slide.comment ? (
                      <div
                        style={{
                          fontSize: 12,
                          color: "#fff",
                          opacity: 0.9,
                          marginTop: 2,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                        title={slide.comment}
                      >
                        “{slide.comment}”
                      </div>
                    ) : null}
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
