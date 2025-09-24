import React, { useState } from "react";
import Features from "../common/Features";
import Features2 from "../common/Features2";

export default function About() {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <section className="flat-spacing about-us-main pb_0">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="about-us-features wow fadeInLeft">
              <img
                className="lazyload"
                data-src="/images/banner/Lookbook.png"
                alt="image-team"
                src="/images/banner/Lookbook.png"
                width={930}
                height={618}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="about-us-content">
              <h3 className="title wow fadeInUp text-primary">
                About Beaubless
              </h3>
              <div className="widget-tabs style-3 justify-content-center">
                <ul className="widget-menu-tab wow fadeInUp">
                  <li
                    className={`item-title ${activeTab == 1 ? "active" : ""} `}
                    onClick={() => setActiveTab(1)}
                  >
                    <span className="inner text-button">Introduction</span>
                  </li>
                  <li
                    className={`item-title ${activeTab == 2 ? "active" : ""} `}
                    onClick={() => setActiveTab(2)}
                  >
                    <span className="inner text-button">Our Vision</span>
                  </li>
                  <li
                    className={`item-title ${activeTab == 3 ? "active" : ""} `}
                    onClick={() => setActiveTab(3)}
                  >
                    <span className="inner text-button">Our Mission</span>
                  </li>
                </ul>
                <div className="widget-content-tab wow fadeInUp">
                  <div
                    className={`widget-content-inner ${
                      activeTab == 1 ? "active" : ""
                    } `}
                  >
                    <p>
                      Beaubless Skincare is a brand born from the fusion of
                      ancient beauty traditions and modern innovation. Inspired
                      by centuries-old skincare practices from Japan and Korea,
                      where beauty rituals were deeply rooted in nature and
                      passed down through generations, we bring these
                      time-tested secrets to India—a country that values
                      holistic beauty and self-care. Skincare in these advanced
                      beauty cultures has always been more than just a routine;
                      it’s a philosophy of nurturing and respecting the skin. At
                      Beaubless, we take this rich heritage and blend it with
                      the latest advancements in skincare science, creating
                      products that are both gentle and powerful. We believe in
                      pure, effective, and results-driven formulations that
                      deliver visible improvements while maintaining skin health
                      and harmony. By bridging the gap between ancient wisdom
                      and cutting-edge skincare technology, Beaubless Skincare
                      is set to redefine beauty standards in India, making
                      premium, high-performance skincare accessible to all.
                    </p>
                  </div>
                  <div
                    className={`widget-content-inner ${
                      activeTab == 2 ? "active" : ""
                    } `}
                  >
                    <p>
                      At Beaubless Skincare, our vision is to redefine beauty by
                      offering products that combine nature’s time-honored
                      secrets with cutting-edge science. We aim to create
                      skincare solutions that are as gentle as they are
                      effective, helping individuals embrace their natural
                      beauty with confidence. We aspire to be more than just a
                      skincare brand—we want to empower individuals by providing
                      high-quality, ethically sourced products that nourish,
                      protect, and enhance the skin. Our focus is on delivering
                      luxurious, sustainable skincare that caters to a diverse
                      range of skin types, concerns, and needs. We believe that
                      beauty is about feeling radiant inside and out, and we are
                      committed to making every customer’s skincare experience
                      indulgent, transformative, and uplifting.
                    </p>
                  </div>
                  <div
                    className={`widget-content-inner ${
                      activeTab == 3 ? "active" : ""
                    } `}
                  >
                    <p>
                      At Beaubless Skincare, our mission is to provide
                      high-performance, ethically crafted skincare products that
                      nurture and enhance the natural beauty of every
                      individual. We believe that true beauty comes from within,
                      and our goal is to create products that not only transform
                      skin but also promote confidence, well-being, and
                      self-care. Our formulations are crafted with
                      scientifically-backed ingredients, ensuring that each
                      product delivers visible results while maintaining skin
                      health. Our commitment extends beyond skincare—we champion
                      sustainability, ethical sourcing, and cruelty-free
                      formulations. We strive to make self-care an essential and
                      enjoyable ritual, where luxury meets responsibility, and
                      skincare becomes a moment of self-love in every
                      individual’s daily routine.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
