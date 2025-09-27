"use client";
import { useEffect, useState } from "react";

const sections = [
  { id: 1, text: "Privacy Policy", scroll: "introduction" },
  { id: 2, text: "Information We Collect", scroll: "data-collection" },
  { id: 3, text: "How We Use Your Information", scroll: "data-usage" },
  { id: 4, text: "Sharing of Information", scroll: "data-sharing" },
  { id: 5, text: "Security Measures", scroll: "security-measures" },
  { id: 6, text: "Contact Us", scroll: "contact-information" },
];

const sectionIds = sections.map((s) => s.scroll);

export default function Privacy() {
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
  }, []); // no deps needed since sectionIds is static

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
                className={`btn-scroll-target ${activeSection === scroll ? "active" : ""}`}
              >
                {id}. {text}
              </h6>
            ))}
          </div>

          {/* Right content */}
          <div className="right">
            <h4 className="heading">Privacy Policy</h4>

            <div className="privacy-policy-item item-scroll-target" id="introduction">
              <h5 className="privacy-policy-title">Privacy Policy</h5>
              <p>
                At <strong>Shreeva Jewels</strong>, we respect and protect your privacy.
                This policy explains how we collect, use, and secure your personal information.
              </p>
            </div>

            <div className="privacy-policy-item item-scroll-target" id="data-collection">
              <h5 className="privacy-policy-title">1. Information We Collect</h5>
              <p>
                We may collect your name, phone number, email, delivery address, and payment details
                when you place an order.
              </p>
            </div>

            <div className="privacy-policy-item item-scroll-target" id="data-usage">
              <h5 className="privacy-policy-title">2. How We Use Your Information</h5>
              <ul className="list-disc list-inside">
                <li>To process and deliver your orders</li>
                <li>To communicate order status and customer support</li>
                <li>To improve our services</li>
              </ul>
              <p className="mt-2">
                We will never sell or rent your personal data to third parties.
              </p>
            </div>

            <div className="privacy-policy-item item-scroll-target" id="data-sharing">
              <h5 className="privacy-policy-title">3. Sharing of Information</h5>
              <p>
                We only share necessary information with partners directly involved in processing your order,
                such as shipping and payment service providers.
              </p>
            </div>

            <div className="privacy-policy-item item-scroll-target" id="security-measures">
              <h5 className="privacy-policy-title">4. Security Measures</h5>
              <p>
                We use secure systems and processes to keep your data protected.
              </p>
            </div>

            <div className="privacy-policy-item item-scroll-target" id="contact-information">
              <h5 className="privacy-policy-title">5. Contact Us</h5>
              <div className="contact-info">
                <p>For any privacy-related inquiries, please contact us:</p>
                <ul>
                  <li>
                    🏬 <strong>Store Name:</strong> Shreeva Jewels
                  </li>
                  <li>
                    📍 <strong>Location:</strong> Mumbai
                  </li>
                  <li>
                    📞 <strong>Phone:</strong>{" "}
                    <a href="tel:+919104235510">+91 91042 35510</a>
                  </li>
                  <li>
                    📧 <strong>Email:</strong>{" "}
                    <a href="mailto:info@shreevajewels.com">info@shreevajewels.com</a>
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
