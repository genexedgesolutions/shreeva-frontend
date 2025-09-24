import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { products37 } from "@/data/products";
import { useContextElement } from "@/context/Context";
export default function BannerTab({ parentClass = "flat-spacing pt-0" }) {
  const { setQuickViewItem } = useContextElement();
  useEffect(() => {
    const offsetX = 20;
    const offsetY = 20;

    const handleMouseMove = (e) => {
      const hoverImage = e.currentTarget.querySelector(".hover-image");
      if (hoverImage) {
        hoverImage.style.top = `${e.clientY + offsetY}px`;
        hoverImage.style.left = `${e.clientX + offsetX}px`;
      }
    };

    const handleMouseEnter = (e) => {
      const hoverImage = e.currentTarget.querySelector(".hover-image");
      if (hoverImage) {
        hoverImage.style.transform = "scale(1)";
        hoverImage.style.opacity = "1";
      }
    };

    const handleMouseLeave = (e) => {
      const hoverImage = e.currentTarget.querySelector(".hover-image");
      if (hoverImage) {
        hoverImage.style.transform = "scale(0)";
        hoverImage.style.opacity = "0";
      }
    };

    const elements = document.querySelectorAll(".hover-cursor-img");
    elements.forEach((el) => {
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);
  return (
    <section className={parentClass}>
      <div className="container mt-5">
        <div className="row flat-img-with-text-v2">
          <div className="col-lg-12 col-md-12">
            <div className="banner-left">
              <div className="box-title wow fadeInUp">
                <h3>Why Beaubless?</h3>
                <p className="text-primary">
                  Beaubless Skincare blends centuries-old Asian skincare rituals
                  with advanced scientific formulations to cater to modern
                  skincare needs. Our products are sustainably sourced,
                  cruelty-free, and ethically crafted, ensuring both quality and
                  care for the environment. Designed to suit all skin types, we
                  prioritize inclusivity and effectiveness, making premium
                  skincare accessible to everyone. Experience the perfect
                  balance of luxury and affordability with Beaubless—where
                  nature meets innovation.
                </p>
              </div>
              <ul className="tab-banner" role="tablist">
                {products37.map((item) => (
                  <li
                    key={item.id}
                    className={`nav-tab-item wow fadeInUp`}
                    data-wow-delay={item.delay}
                    role="presentation"
                  >
                    <a
                      href={`#tabBannerCls${item.id}`}
                      className={`nav-tab-link hover-cursor-img ${
                        item.active ? "active" : ""
                      }`}
                      data-bs-toggle="tab"
                    >
                      <h5 className="title text-line-clamp-1">{item.title}</h5>
                      {/* <div className="arr-link">
                        {/* <span className="text-btn-uppercase text-more">
                          More
                        </span> */}
                      {/* <i className="icon icon-arrowUpRight" /> */}
                      {/* </div> */}
                      <div className="hover-image">
                        <img
                          alt="Hover Image"
                          src={item.imgSrc}
                          width={710}
                          height={945}
                        />
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="wow fadeInUp">
                <Link to={`/about-us`} className="btn-line">
                  Discover Our Philosophy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
