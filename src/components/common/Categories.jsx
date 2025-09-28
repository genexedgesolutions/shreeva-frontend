// src/components/HeroCategoriesGrid.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "@/lib/api";

// Optional: normalize image url (agar aap CDN proxy use karte ho to yahan tweak kar lo)
const getImageUrl = (raw) => (typeof raw === "string" ? raw : "");

export default function HeroCategoriesGrid() {
const [items, setItems] = useState([]);
const [loading, setLoading] = useState(true);

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
c.thumbnail ??
(Array.isArray(c.images) && c.images.length ? c.images[0] : null);
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
count: itemsCount,
slug: c.slug ?? title.toLowerCase().replace(/\s+/g, "-"),
};
})
// show only categories that have an image
.filter((it) => it.imgSrc && it.imgSrc.length > 0)
// sort alphabetically
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

const cardsToShow = items; // all categories; CTA will be appended as last card.

return (
<section className="hero-grid-wrap">
  <div className="heading-section text-center wow fadeInUp">
    <h3 className="heading">Shreeva Collections</h3>
    <p className="subheading text-dark">
      Explore our newly launched collections of Gold, Diamonds, Silver, Bridal & more
    </p>
  </div>
  <div className="hero-grid">
    {loading
    ? Array.from({ length: 8 }).map((_, i) => (
    <div key={`sk-${i}`} className="card skeleton" />
    ))
    : (
    <>
      {cardsToShow.map((cat) => (
      <Link key={cat.id} to={`/collections/${cat.slug}`} className="card img-card" aria-label={cat.title}>
      <img src={cat.imgSrc} alt={cat.alt} loading="lazy" />
      <div className="overlay">
        <div className="title">{cat.title}</div>
        {typeof cat.count === "number" && cat.count > 0 && (
        <div className="meta">{cat.count} items</div>
        )}
      </div>
      </Link>
      ))}

      {/* Final CTA card */}
      <div className="card cta-card">
        <div className="cta-inner">
          <h3>Explore More<br />Collections</h3>
          <p>Gold • Diamonds • Silver • Bridal & more</p>
          <Link to="/collections" className="cta-btn">Explore Now</Link>
        </div>
      </div>
    </>
    )
    }
  </div>

  <style jsx>
    {
      ` .hero-grid-wrap {
        padding: 3px 3px 3px;
        margin-top: 12px;
        margin-bottom: 24px;

      }

      .hero-grid {
        max-width: 1400px;
        margin: 0 auto;
        display: grid;
        gap: 16px;

        grid-template-columns: repeat(3, 1fr);
      }


      /* responsive columns */
      @media (max-width: 576px) {
        .hero-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        .hero-grid card {
          width: 100px;
          height: 100px;
        }

        .cta-inner {
          text-align: center;
          padding: 8px;
        }
          .cta-inner p{
          font-size: 10px !important;
          }
           .cta-inner h3 {
           font-size: 15px !important;
           }
      }

      @media (min-width: 992px) {
        .hero-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 1280px) {
        .hero-grid {
          grid-template-columns: repeat(4, 1fr);
        }
      }

      .card {
        position: relative;
        border-radius: 16px;
        overflow: hidden;
        background: #fff;
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);

        aspect-ratio: 1 / 1;
      }

      /* Image card */
      .img-card img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        transition: transform .35s ease;
      }

      .img-card:hover img {
        transform: scale(1.04);
      }

      .overlay {
        position: absolute;
        inset: auto 0 0 0;
        padding: 12px 14px;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .55) 100%);
        color: #fff;
        display: flex;
        align-items: flex-end;
        gap: 6px;
        flex-wrap: wrap;
        min-height: 38%;
      }

      .overlay .title {
        font-weight: 700;
        font-size: 16px;
        letter-spacing: .2px;
      }

      .overlay .meta {
        margin-left: auto;
        font-size: 12px;
        opacity: .9;
        background: rgba(255, 255, 255, .16);
        padding: 4px 8px;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, .2);
      }

      /* CTA card */
      .cta-card {
        background:
          radial-gradient(80% 60% at 80% 20%, rgba(255, 214, 153, .35), transparent 55%),
          linear-gradient(135deg, #3b2b1b 0%, #6b4a28 100%);
        color: #fff;
        display: grid;
        place-items: center;
      }

      .cta-inner {
        text-align: center;
        padding: 18px;
      }

      .cta-inner h3 {
        margin: 0 0 8px;
        font-weight: 800;
        letter-spacing: .2px;
        line-height: 1.15;
        font-size: clamp(20px, 2.4vw, 28px);
        color: #ffdf9e;
      }

      .cta-inner p {
        margin: 0 0 14px;
        opacity: .9;
        font-size: 14px;
      }

      .cta-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 42px;
        padding: 0 18px;
        border-radius: 10px;
        background: linear-gradient(90deg, #c29863, #e8cda5);
        color: #2b1f12;
        font-weight: 700;
        text-decoration: none;
        border: 1px solid #e3be86;
        box-shadow: 0 10px 20px rgba(226, 187, 129, .35);
        transition: transform .15s ease, box-shadow .15s ease;
      }

      .cta-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 14px 28px rgba(226, 187, 129, .45);
      }

      /* Skeletons */
      .skeleton {
        background: linear-gradient(90deg, #f2f2f2 25%, #ededed 37%, #f2f2f2 63%);
        background-size: 400% 100%;
        animation: shimmer 1.2s infinite;
      }

      @keyframes shimmer {
        0% {
          background-position: 100% 0;
        }

        100% {
          background-position: 0 0;
        }
      }

      `
    }
  </style>
</section>
);
}