import { useEffect, useState } from "react";

const sectionIds = [
  "introduction",
  "data-collection",
  "data-usage",
  "data-sharing",
  "security-measures",
  "contact-information",
];
const sections = [
  { id: 1, text: "Privacy Policy", scroll: "introduction" },
  { id: 2, text: "Information We Collect", scroll: "data-collection" },
  { id: 3, text: "How We Use Your Information", scroll: "data-usage" },
  { id: 4, text: "Sharing of Information", scroll: "data-sharing" },
  { id: 5, text: "Security Measures", scroll: "security-measures" },
  { id: 6, text: "Contact Us", scroll: "contact-information" },
];

export default function Privacy() {
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
            <h4 className="heading">Privacy Policy</h4>

            <div
              className="privacy-policy-item item-scroll-target"
              id="introduction"
            >
              <h5 className="privacy-policy-title">Privacy Policy</h5>
              <p>
                Welcome to Beaubless! We value your privacy and are committed to
                protecting your personal information. This Privacy Policy
                outlines how we collect, use, and safeguard your data when you
                visit our website.
              </p>
            </div>

            <div
              className="privacy-policy-item item-scroll-target"
              id="data-collection"
            >
              <h5 className="privacy-policy-title">
                1. Information We Collect
              </h5>
              <p>
                We may collect personal information such as your name, email,
                contact number, and payment details when you interact with our
                website. This information is collected to enhance your
                experience and facilitate transactions.
              </p>
            </div>

            <div
              className="privacy-policy-item item-scroll-target"
              id="data-usage"
            >
              <h5 className="privacy-policy-title">
                2. How We Use Your Information
              </h5>
              <p>
                Your personal data is used to process orders, communicate
                updates, improve services, and ensure website security. We do
                not sell your information to third parties.
              </p>
            </div>

            <div
              className="privacy-policy-item item-scroll-target"
              id="data-sharing"
            >
              <h5 className="privacy-policy-title">
                3. Sharing of Information
              </h5>
              <p>
                We may share your information with trusted service providers for
                payment processing, delivery, and customer support. These third
                parties are bound by strict confidentiality agreements.
              </p>
            </div>

            <div
              className="privacy-policy-item item-scroll-target"
              id="security-measures"
            >
              <h5 className="privacy-policy-title">4. Security Measures</h5>
              <p>
                Beaubless employs robust security measures to protect user data.
                However, we cannot guarantee complete protection against cyber
                threats, and users are advised to take precautions.
              </p>
            </div>

            <div
              className="privacy-policy-item item-scroll-target"
              id="contact-information"
            >
              <h5 className="privacy-policy-title">5. Contact Us</h5>
              <div className="contact-info">
                <p>For any privacy-related inquiries, please contact us at:</p>
                <ul>
                  <li>
                    📞 <strong>Phone:</strong>{" "}
                    <a href="tel:+918587085402">+91 85870 85402</a>
                  </li>
                  <li>
                    📧 <strong>Email:</strong>{" "}
                    <a href="mailto:sales@beaubless.com">sales@beaubless.com</a>
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
      </div>
    </section>
  );
}
