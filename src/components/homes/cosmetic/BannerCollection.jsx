import React, { useEffect, useState } from "react";

export default function BannerCollection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section>
      <div>
        <img
          className="lazyload d-block w-100"
          data-src={
            isMobile
              ? "/images/banner/Offer-mobile.png"
              : "/images/banner/Offer.png"
          }
          alt="banner-cls"
          src={
            isMobile
              ? "/images/banner/Offer-mobile.png"
              : "/images/banner/Offer.png"
          }
          width={isMobile ? 768 : 1600}
          height={isMobile ? 400 : 500}
        />
      </div>
    </section>
  );
}