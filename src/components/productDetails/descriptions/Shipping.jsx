import { useEffect, useState } from "react";

const sectionIds = [
  "shipping-policy",
  "shipping-time",
  "shipping-charges",
  "order-tracking",
  "contact-info",
];

const sections = [
  { id: 1, text: "Shipping Policy", scroll: "shipping-policy" },
  { id: 2, text: "Shipping Time", scroll: "shipping-time" },
  { id: 3, text: "Shipping Charges", scroll: "shipping-charges" },
  { id: 4, text: "Order Tracking", scroll: "order-tracking" },
  { id: 5, text: "Contact Information", scroll: "contact-info" },
];

export default function Shipping() {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px" }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = (id) => {
    document
      .getElementById(id)
      .scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="terms-of-use-wrap">
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

          <div className="right">
            <h4 className="heading">Shipping Policy</h4>

            <div
              className="terms-of-use-item item-scroll-target"
              id="shipping-policy"
            >
              <h5 className="terms-of-use-title">1. Shipping Policy</h5>
              <p>
                At <strong>Beaubless</strong>, we aim to deliver your orders in
                a timely and secure manner. Our shipping policy ensures a smooth
                experience for our customers.
              </p>
              <p>
                Orders are processed within 24-48 hours, except on weekends and
                public holidays.
              </p>
            </div>

            <div
              className="terms-of-use-item item-scroll-target"
              id="shipping-time"
            >
              <h5 className="terms-of-use-title">2. Shipping Time</h5>
              <p>The estimated delivery time depends on your location:</p>
              <ul className="list-disc list-inside">
                <li>
                  📍 <strong>Metropolitan Cities:</strong> 3-5 business days
                </li>
                <li>
                  📍 <strong>Other Cities:</strong> 5-7 business days
                </li>
                <li>
                  📍 <strong>Remote Areas:</strong> 7-10 business days
                </li>
              </ul>
              <p>
                Unforeseen delays due to weather, customs, or courier issues may
                occur.
              </p>
            </div>

            <div
              className="terms-of-use-item item-scroll-target"
              id="shipping-charges"
            >
              <h5 className="terms-of-use-title">3. Shipping Charges</h5>
              <p>Shipping charges vary based on order value and location:</p>
              <ul className="list-disc list-inside">
                <li>
                  🚚 <strong>Free Shipping:</strong> Orders above ₹999
                </li>
                <li>
                  🚚 <strong>Standard Shipping Fee:</strong> ₹50 for orders
                  below ₹999
                </li>
                <li>
                  🚚 <strong>International Shipping:</strong> Charges depend on
                  destination and weight
                </li>
              </ul>
            </div>

            <div
              className="terms-of-use-item item-scroll-target"
              id="order-tracking"
            >
              <h5 className="terms-of-use-title">4. Order Tracking</h5>
              <p>
                Once your order is shipped, you will receive a tracking link via
                email/SMS. You can track your order in real-time on our website.
              </p>
              <p>
                If you experience any delays or issues, please reach out to our
                support team.
              </p>
            </div>

            <div
              className="terms-of-use-item item-scroll-target"
              id="contact-info"
            >
              <h5 className="terms-of-use-title">5. Contact Information</h5>
              <p>For any shipping-related queries, reach out to us:</p>
              <ul className="mt-2">
                <li>
                  📞 <strong>Phone:</strong> +91 85870 85402
                </li>
                <li>
                  📧 <strong>Email:</strong>{" "}
                  <a
                    href="mailto:support@beaubless.com"
                    className="text-blue-600 hover:underline"
                  >
                    support@beaubless.com
                  </a>
                </li>
                <li>
                  🏢 <strong>Address:</strong>  Raj Nagar
                  Extension Road, Gaur Cascades, Ghaziabad, Uttar Pradesh,
                  India, 201017
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
