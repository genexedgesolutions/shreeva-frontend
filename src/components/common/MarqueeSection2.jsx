import React from "react";

export default function MarqueeSection2({ parentClass = "tf-marquee" }) {
  return (
    <section className={parentClass}>
      <div className="marquee-wrapper">
        <div className="initial-child-container text-primary">
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">Shreeva Jewels is LIVE! 💎</p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              Flat 50% OFF on Selected Jewelry ✨
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          {/* 2 */}
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              Discover Lab-Grown Diamond Collection 💍
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">Free Shipping on All Orders 🚚</p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
          <div className="marquee-child-item">
            <p className="text-btn-uppercase">
              Timeless Jewelry, Crafted for You ❤️
            </p>
          </div>
          <div className="marquee-child-item">
            <span className="icon icon-lightning-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
