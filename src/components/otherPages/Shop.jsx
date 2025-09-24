import React, { useState } from "react";

export default function Shop() {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <section className="flat-spacing about-us-main pb_0">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="about-us-features wow fadeInLeft">
              <img
                className="lazyload"
                data-src="/images/banner/about-us.jpg"
                alt="image-team"
                src="/images/banner/about1.jpg"
                width={930}
                height={618}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="about-us-content">
              <h3 className="title wow fadeInUp">
                Beaubless – Offering rare and beautiful items worldwide
              </h3>
              <div className="widget-tabs style-3">
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
                    <span className="inner text-button">
                      Our Mission
                    </span>
                  </li>
                  <li
                    className={`item-title ${activeTab == 4 ? "active" : ""} `}
                    onClick={() => setActiveTab(4)}
                  >
                    <span className="inner text-button">Our Commitment</span>
                  </li>
                </ul>
                <div className="widget-content-tab wow fadeInUp">
                  <div
                    className={`widget-content-inner ${
                      activeTab == 1 ? "active" : ""
                    } `}
                  >
                    <p>
                      Beaubless Skincare is a brand born from the fusion of ancient beauty traditions and modern 
innovation. Inspired by centuries-old skincare practices from Japan and Korea, where beauty 
rituals were deeply rooted in nature and passed down through generations, we bring these 
time-tested secrets to India—a country that values holistic beauty and self-care.
                    </p>
                  </div>
                  <div
                    className={`widget-content-inner ${
                      activeTab == 2 ? "active" : ""
                    } `}
                  >
                    <p>
                    At Beaubless Skincare, our vision is to redefine beauty by offering products that combine 
nature’s time-honored secrets with cutting-edge science. We aim to create skincare solutions 
that are as gentle as they are effective, helping individuals embrace their natural beauty with 
confidence. 
We aspire to be more than just a skincare brand—we want to empower individuals by providing 
high-quality, ethically sourced products that nourish, protect, and enhance the skin. Our focus is 
on delivering luxurious, sustainable skincare that caters to a diverse range of skin types, 
concerns, and needs. We believe that beauty is about feeling radiant inside and out, and we are 
committed to making every customer’s skincare experience indulgent, transformative, and 
uplifting. 

                    </p>
                  </div>
                  <div
                    className={`widget-content-inner ${
                      activeTab == 3 ? "active" : ""
                    } `}
                  >
                    <p>
                    At Beaubless Skincare, our mission is to provide high-performance, ethically crafted skincare 
products that nurture and enhance the natural beauty of every individual. 
We believe that true beauty comes from within, and our goal is to create products that not only 
transform skin but also promote confidence, well-being, and self-care. Our formulations are 
crafted with scientifically-backed ingredients, ensuring that each product delivers visible results 
while maintaining skin health. 
Our commitment extends beyond skincare—we champion sustainability, ethical sourcing, and 
cruelty-free formulations. We strive to make self-care an essential and enjoyable ritual, where 
luxury meets responsibility, and skincare becomes a moment of self-love in every individual’s 
daily routine.
                    </p>
                  </div>
                  <div
                    className={`widget-content-inner ${
                      activeTab == 4 ? "active" : ""
                    } `}
                  >
                    <p>
                      Welcome to Modave Store, your premier destination for
                      fashion-forward clothing and accessories. We pride
                      ourselves on offering a curated selection of rare and
                      beautiful items sourced both locally and globally. Our
                      mission is to bring you the latest trends and timeless
                      styles, ensuring every piece reflects quality and
                      elegance. Discover the perfect addition to your wardrobe
                      at Modave Store.
                    </p>
                  </div>
                </div>
              </div>
              <a href="#" className="tf-btn btn-fill wow fadeInUp">
                <span className="text text-button">Read More</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
