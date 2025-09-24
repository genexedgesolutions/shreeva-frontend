import { useEffect, useState } from "react";

const sectionIds = [
  "return-policy",
  "refund-eligibility",
  "refund-process",
  "exceptions",
  "contact-info",
];
const sections = [
  { id: 1, text: "Return Policy", scroll: "return-policy" },
  { id: 2, text: "Refund Eligibility", scroll: "refund-eligibility" },
  { id: 3, text: "Refund Process", scroll: "refund-process" },
  { id: 4, text: "Return & Replacement", scroll: "returns" },
  { id: 5, text: "Non-Refundable Items", scroll: "non-refundables" },
  { id: 6, text: "Contact Information", scroll: "contact-info" },
];

export default function Return() {
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
  }, [sectionIds]);

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
            <h4 className="heading">Return and Refund Policy</h4>

            <div
              className="terms-of-use-item item-scroll-target"
              id="return-policy"
            >
              <h5 className="terms-of-use-title">Return Policy</h5>
              <p className="text-gray-700">
                we prioritize customer satisfaction. If you are not completely
                satisfied with your purchase, please read our refund and return
                policy carefully.
              </p>
            </div>

            <div
              className="terms-of-use-item item-scroll-target"
              id="refund-eligibility"
            >
              <h5 className="terms-of-use-title">1. Refund Eligibility</h5>

              <p className="text-gray-700">
                To be eligible for a return, the following conditions must be
                met:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>
                  1. The product must be in its{" "}
                  <strong>original packaging</strong> and unused.
                </li>
                <li>
                  2. You must provide a <strong>video of the unboxing</strong>{" "}
                  as proof of condition.
                </li>
                <li>
                  3. Return requests must be made within <strong>7 days</strong>{" "}
                  of receiving the product.
                </li>
              </ul>
            </div>

            <div
              className="terms-of-use-item item-scroll-target"
              id="refund-process"
            >
              <h5 className="refund-process">
                3. Refund Time Frame and Process
              </h5>
              <p className="text-gray-700">
                Refunds will only be processed under the following conditions:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>
                  1. The product is found to be{" "}
                  <strong>defective upon arrival</strong>.
                </li>
                <li>
                  2. Verification is completed based on the provided unboxing
                  video.
                </li>
                <li>3. Once approved, the refund will be initiated.</li>
                <li>
                  4. Refund requests must be made within <strong>7 days</strong>{" "}
                  of delivery.
                </li>
                <li>
                  5. Post all the necessary checks, the refund will be credited
                  to the source account within{" "}
                  <strong>7-10 working days</strong>.
                </li>
              </ul>
            </div>

            <div className="terms-of-use-item item-scroll-target" id="returns">
              <h5 className="terms-of-use-title">4. Return & Replacement</h5>
              <p className="text-gray-700">
                If your return is approved, you will receive instructions to
                ship the product back.
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>
                  The replacement product will be delivered within{" "}
                  <strong>7 working days</strong> after verification.
                </li>
              </ul>
            </div>

            <div
              className="terms-of-use-item item-scroll-target"
              id="non-refundables"
            >
              <h5 className="terms-of-use-title">5. Non-Refundable Items </h5>
              <p className="text-gray-700">
                The following items are not eligible for refunds or returns:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>
                  1. Products <strong>damaged due to mishandling</strong> by the
                  customer.
                </li>
                <li>
                  2. Items returned <strong>without original packaging</strong>{" "}
                  or missing components.
                </li>
              </ul>
            </div>

            <div
              className="terms-of-use-item item-scroll-target"
              id="contact-info"
            >
              <h5 className="terms-of-use-title">6. Contact Information</h5>
              <p className="text-gray-700">
                If you have any questions about our refund and return policy,
                please contact us:
              </p>
              <ul className="mt-2">
                <li>
                  📞 <strong>Phone:</strong> +91 85870 85402
                </li>
                <li>
                  📧 <strong>Email:</strong>{" "}
                  <a
                    href="mailto:sales@beaubless.com"
                    className="text-blue-600 hover:underline"
                  >
                    sales@beaubless.com
                  </a>
                </li>
                <li>
                  🏢 <strong>Address:</strong> Raj Nagar
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
