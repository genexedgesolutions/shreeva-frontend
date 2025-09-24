import { useEffect, useState } from "react";

const sectionIds = [
  "terms",
  "acceptance",
  "liability",
  "accuracy",
  "modifications",
  "security",
  "contact",
];

const sections = [
  { id: 1, text: "Terms & Conditions", scroll: "terms" },
  { id: 2, text: "1. Acceptance of Terms", scroll: "acceptance" },
  { id: 3, text: "2. Limitations of Liability", scroll: "liability" },
  { id: 4, text: "3. Accuracy of Information", scroll: "accuracy" },
  { id: 5, text: "4. Modifications to Terms", scroll: "modifications" },
  { id: 6, text: "5. Security & Risks", scroll: "security" },
  { id: 7, text: "6. Contact Us", scroll: "contact" },
];

export default function Terms() {
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
                {text}
              </h6>
            ))}
          </div>
          <div className="right">
            <h4 className="heading">Terms & Conditions</h4>
            <p>
              Welcome to Beaubless! This website is owned and managed by{" "}
              <strong>BELLEZA LUXE</strong>. By accessing our website, you agree
              to abide by the following terms and conditions. If you do not
              agree, please refrain from using our site.
            </p>

            <div
              className="terms-of-use-item item-scroll-target"
              id="acceptance"
            >
              <h5 className="terms-of-use-title">1. Acceptance of Terms</h5>
              <p>
                By visiting and using Beaubless, you acknowledge and agree to
                these terms. The content and materials on this site are
                protected under copyright and trademark laws.
              </p>
            </div>

            <div
              className="terms-of-use-item item-scroll-target"
              id="liability"
            >
              <h5 className="terms-of-use-title">
                2. Limitations of Liability
              </h5>
              <p>
                Beaubless and its affiliates shall not be liable for any direct,
                indirect, incidental, or consequential damages arising from the
                use or inability to use our website, including but not limited
                to data loss, business interruptions, or any other financial
                damages.
              </p>
            </div>

            <div className="terms-of-use-item item-scroll-target" id="accuracy">
              <h5 className="terms-of-use-title">3. Accuracy of Information</h5>
              <p>
                We strive to keep our website’s content accurate and updated.
                However, Beaubless does not guarantee that all information,
                including product descriptions and pricing, is error-free. We
                reserve the right to correct any inaccuracies without prior
                notice.
              </p>
            </div>

            <div
              className="terms-of-use-item item-scroll-target"
              id="modifications"
            >
              <h5 className="terms-of-use-title">4. Modifications to Terms</h5>
              <p>
                Beaubless may update these terms at any time without prior
                notification. Your continued use of the website after any
                changes indicates your acceptance of the revised terms.
              </p>
            </div>

            <div className="terms-of-use-item item-scroll-target" id="security">
              <h5 className="terms-of-use-title">5. Security & Risks</h5>
              <p>
                While we implement advanced security measures to protect user
                data, Beaubless cannot guarantee complete security against cyber
                threats or data breaches. Users should take necessary
                precautions when sharing personal information.
              </p>
            </div>

            <div className="terms-of-use-item item-scroll-target" id="contact">
              <h5 className="terms-of-use-title">6. Contact Us</h5>
              <div className="contact-info">
                <p>
                  For any questions or concerns regarding these terms, you can
                  reach us at:
                </p>
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
                    🏢 <strong>Address:</strong> - H-1059, Raj Nagar
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
