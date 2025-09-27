"use client";
import { useEffect, useState } from "react";

const sections = [
  { id: 1, text: "Return & Refund Policy", scroll: "return-policy" },
  { id: 2, text: "Replacement Policy", scroll: "replacement-policy" },
  { id: 3, text: "Contact Information", scroll: "contact-info" },
];

export default function Return() {
  const [activeSection, setActiveSection] = useState(sections[0].scroll);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px" }
    );

    sections.forEach(({ scroll }) => {
      const el = document.getElementById(scroll);
      if (el) observer.observe(el);
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
                className={`btn-scroll-target ${activeSection === scroll ? "active" : ""}`}
              >
                {id}. {text}
              </h6>
            ))}
          </div>

          {/* Right content */}
          <div className="right">
            <h4 className="heading">Shreeva Jewels — Return, Refund & Replacement Policy</h4>

            <div className="terms-of-use-item item-scroll-target" id="return-policy">
              <h5 className="terms-of-use-title">❌ No Return & No Refund Policy</h5>
              <p className="text-gray-700">
                At <strong>Shreeva Jewels</strong>, we strive to offer only the highest quality handcrafted
                and luxury jewelry. As our products are made with great precision and care, we maintain the
                following policy regarding returns and refunds:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>We do not accept returns once the product has been delivered.</li>
                <li>We do not offer refunds for any product under any circumstance.</li>
              </ul>
              <p className="text-gray-700 mt-2">
                Please make your purchase carefully and feel free to reach out to us with any questions
                before ordering.
              </p>
            </div>

            <div className="terms-of-use-item item-scroll-target" id="replacement-policy">
              <h5 className="terms-of-use-title">🔄 Replacement Policy (14 Days)</h5>
              <p className="text-gray-700">
                We only offer replacement for the following cases, and the request must be made within{" "}
                <strong>14 days</strong> of delivery:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>The product is damaged during shipping.</li>
                <li>The item is defective or has a manufacturing issue.</li>
                <li>You received the wrong product.</li>
              </ul>
              <p className="text-gray-700 mt-2">To be eligible for a replacement:</p>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>The item must be unused, unworn, and in its original packaging.</li>
                <li>You must share clear unboxing videos or photos showing the issue at the time of delivery.</li>
                <li>Contact us via WhatsApp or email within 14 days of receiving the order.</li>
              </ul>
            </div>

            <div className="terms-of-use-item item-scroll-target" id="contact-info">
              <h5 className="terms-of-use-title">📩 Contact Us</h5>
              <p className="text-gray-700">If you have any issues with your order, please reach out:</p>
              <ul className="mt-2">
                <li>🏬 <strong>Store Name:</strong> Shreeva Jewels</li>
                <li>📍 <strong>Location:</strong> Mumbai</li>
                <li>📞 <strong>Phone:</strong> +91 91042 35510</li>
                <li>
                  📧 <strong>Email:</strong>{" "}
                  <a href="mailto:info@shreevajewels.com" className="text-blue-600 hover:underline">
                    info@shreevajewels.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
