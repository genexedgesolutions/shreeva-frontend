"use client";
import { useEffect, useState } from "react";

const sections = [
  { id: 1, text: "Terms & Conditions", scroll: "terms" },
  { id: 2, text: "1. Orders", scroll: "orders" },
  { id: 3, text: "2. Shipping", scroll: "shipping" },
  { id: 4, text: "3. Replacement Policy", scroll: "replacement" },
  { id: 5, text: "4. Product Care", scroll: "care" },
  { id: 6, text: "5. Contact Us", scroll: "contact" },
];

const sectionIds = sections.map((s) => s.scroll);

export default function Terms() {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px" }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="terms-of-use-wrap">
          {/* Left navigation */}
          <div className="left sticky-top">
            {sections.map(({ id, text, scroll }) => (
              <h6
                key={id}
                onClick={() => handleClick(scroll)}
                className={`btn-scroll-target ${
                  activeSection === scroll ? "active" : ""
                }`}
              >
                {text}
              </h6>
            ))}
          </div>

          {/* Right content */}
          <div className="right">
            <h4 className="heading">Terms & Conditions</h4>
            <div className="terms-of-use-item item-scroll-target" id="terms">
              <p>
                Welcome to <strong>Shreeva Jewels</strong>. By accessing and using our website,
                you agree to the following terms:
              </p>
            </div>

            <div className="terms-of-use-item item-scroll-target" id="orders">
              <h5 className="terms-of-use-title">1. Orders</h5>
              <p>
                Orders are confirmed once payment is received. Product details
                and images are provided with the highest accuracy, but slight
                variations may occur due to lighting or handcrafted design.
              </p>
            </div>

            <div className="terms-of-use-item item-scroll-target" id="shipping">
              <h5 className="terms-of-use-title">2. Shipping</h5>
              <p>
                Orders are usually dispatched within <strong>3–7 business days</strong>.
                Tracking details are provided via WhatsApp or email after dispatch.
              </p>
            </div>

            <div
              className="terms-of-use-item item-scroll-target"
              id="replacement"
            >
              <h5 className="terms-of-use-title">3. Replacement Policy</h5>
              <p>
                We offer replacement only within <strong>14 days</strong> of delivery
                in case of damage, defect, or incorrect item received.
              </p>
              <p>
                To be eligible, items must be unused, in their original packaging,
                and accompanied by proof of purchase. No returns or refunds are provided.
              </p>
            </div>

            <div className="terms-of-use-item item-scroll-target" id="care">
              <h5 className="terms-of-use-title">4. Product Care</h5>
              <p>
                Jewelry should be handled with care and stored properly to
                maintain its shine and durability.
              </p>
            </div>

            <div className="terms-of-use-item item-scroll-target" id="contact">
              <h5 className="terms-of-use-title">5. Contact Us</h5>
              <div className="contact-info">
                <p>If you have any questions about your order, please contact us:</p>
                <ul>
                  <li>🏬 <strong>Store Name:</strong> Shreeva Jewels</li>
                  <li>📍 <strong>Location:</strong> Mumbai</li>
                  <li>
                    📞 <strong>Phone:</strong>{" "}
                    <a href="tel:+919104235510">+91 91042 35510</a>
                  </li>
                  <li>
                    📧 <strong>Email:</strong>{" "}
                    <a href="mailto:info@shreevajewels.com">
                      info@shreevajewels.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
