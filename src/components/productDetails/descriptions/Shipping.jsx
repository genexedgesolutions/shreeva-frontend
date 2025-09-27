"use client";
import { useEffect, useState } from "react";

const sections = [
  { id: 1, text: "Shipping Policy", scroll: "shipping-policy" },
  { id: 2, text: "Shipping Coverage & Charges", scroll: "shipping-charges" },
  { id: 3, text: "Order Processing Time", scroll: "shipping-time" },
  { id: 4, text: "Delivery Timeline", scroll: "delivery-timeline" },
  { id: 5, text: "Order Tracking & Packaging", scroll: "order-tracking" },
  { id: 6, text: "Contact Information", scroll: "contact-info" },
];

const sectionIds = sections.map((s) => s.scroll);

export default function Shipping() {
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
                {id}. {text}
              </h6>
            ))}
          </div>

          {/* Right content */}
          <div className="right">
            <h4 className="heading">Shipping Policy – Shreeva Jewels</h4>

            <div
              className="terms-of-use-item item-scroll-target"
              id="shipping-policy"
            >
              <h5 className="terms-of-use-title">1. Shipping Policy</h5>
              <p>
                At <strong>Shreeva Jewels</strong>, we understand that every piece of
                jewelry is not just a purchase but an emotion. We ensure your order
                reaches you safely and in a timely manner, with premium packaging and
                tracking support.
              </p>
            </div>

            <div
              className="terms-of-use-item item-scroll-target"
              id="shipping-charges"
            >
              <h5 className="terms-of-use-title">2. Shipping Coverage & Charges</h5>
              <ul className="list-disc list-inside mt-2">
                <li>
                  📦 <strong>India:</strong> Free shipping on all prepaid orders.
                </li>
                <li>
                  🌍 <strong>International:</strong> Please contact us directly via WhatsApp
                  or email before placing the order. Shipping charges will be
                  communicated after confirmation.
                </li>
              </ul>
            </div>

            <div
              className="terms-of-use-item item-scroll-target"
              id="shipping-time"
            >
              <h5 className="terms-of-use-title">3. Order Processing Time</h5>
              <ul className="list-disc list-inside mt-2">
                <li>
                  ⏱️ <strong>Ready-to-ship items:</strong> Dispatched within 3–5 business days.
                </li>
                <li>
                  ✨ <strong>Made-to-order/customized pieces:</strong> Please allow 7–14
                  business days for production and quality checks before dispatch.
                </li>
              </ul>
            </div>

            <div
              className="terms-of-use-item item-scroll-target"
              id="delivery-timeline"
            >
              <h5 className="terms-of-use-title">4. Delivery Timeline</h5>
              <ul className="list-disc list-inside mt-2">
                <li>🏙️ <strong>Metro cities:</strong> 2–5 business days after dispatch</li>
                <li>🌆 <strong>Other cities/towns:</strong> 5–8 business days after dispatch</li>
              </ul>
              <p className="mt-2">
                Please note, delays due to weather, public holidays, or courier service
                issues may occasionally occur.
              </p>
            </div>

            <div
              className="terms-of-use-item item-scroll-target"
              id="order-tracking"
            >
              <h5 className="terms-of-use-title">5. Order Tracking & Packaging</h5>
              <p>
                Once your order is shipped, a tracking number will be shared via email or
                WhatsApp for real-time updates.
              </p>
              <p className="mt-2">
                All orders are securely packed in tamper-proof boxes with{" "}
                <strong>Shreeva Jewels’ premium packaging</strong> to ensure your jewelry
                reaches you in pristine condition.
              </p>
              <p className="mt-2">
                Our delivery partner will make up to 3 attempts. If undelivered, the
                package will be returned to us. Re-delivery will be chargeable.
              </p>
            </div>

            <div
              className="terms-of-use-item item-scroll-target"
              id="contact-info"
            >
              <h5 className="terms-of-use-title">6. Contact Information</h5>
              <p>For any shipping-related assistance, feel free to reach us:</p>
              <ul className="mt-2">
                <li>📞 <strong>Call/WhatsApp:</strong> +91 91042 35510</li>
                <li>
                  📧 <strong>Email:</strong>{" "}
                  <a
                    href="mailto:info@shreevajewels.com"
                    className="text-blue-600 hover:underline"
                  >
                    info@shreevajewels.com
                  </a>
                </li>
                <li>🏬 <strong>Store Name:</strong> Shreeva Jewels</li>
                <li>📍 <strong>Location:</strong> Mumbai, India</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
