"use client";
import React from "react";

export default function Faqs() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="page-faqs-wrap">
          <div className="list-faqs">
            <div>
              <h5 className="faqs-title">Need help ?</h5>
              <ul className="accordion-product-wrap style-faqs" id="accordion-faq-1">
                {/* 1 */}
                <li className="accordion-product-item">
                  <a
                    href="#faq-1"
                    className="accordion-title current"
                    data-bs-toggle="collapse"
                    aria-expanded="true"
                    aria-controls="faq-1"
                  >
                    <h6>What is your return / refund policy?</h6>
                    <span className="btn-open-sub" />
                  </a>
                  <div id="faq-1" className="collapse show" data-bs-parent="#accordion-faq-1">
                    <div className="accordion-faqs-content">
                      <p className="text-primary">
                        <strong>No Return &amp; No Refund.</strong> We do not accept returns or issue refunds once the product is delivered. However, we offer a{" "}
                        <strong>14-day replacement</strong> for damaged, defective, or wrong items received. The item must be unused, in original packaging, and supported by clear unboxing photos/videos.
                      </p>
                    </div>
                  </div>
                </li>

                {/* 2 */}
                <li className="accordion-product-item">
                  <a
                    href="#faq-2"
                    className="accordion-title collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="faq-2"
                  >
                    <h6>How long does shipping take?</h6>
                    <span className="btn-open-sub" />
                  </a>
                  <div id="faq-2" className="collapse" data-bs-parent="#accordion-faq-1">
                    <div className="accordion-faqs-content">
                      <p className="text-primary">
                        <strong>Ready-to-ship:</strong> dispatch in 3–5 business days. <br />
                        <strong>Made-to-order / customized:</strong> 7–14 business days for crafting &amp; QC before dispatch. <br />
                        <strong>Transit:</strong> Metro 2–5 days, other cities 5–8 days after dispatch. Delays may occur due to weather/holidays/courier issues.
                      </p>
                    </div>
                  </div>
                </li>

                {/* 3 */}
                <li className="accordion-product-item">
                  <a
                    href="#faq-3"
                    className="accordion-title collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="faq-3"
                  >
                    <h6>Do you ship internationally?</h6>
                    <span className="btn-open-sub" />
                  </a>
                  <div id="faq-3" className="collapse" data-bs-parent="#accordion-faq-1">
                    <div className="accordion-faqs-content">
                      <p className="text-primary">
                        We currently ship across India. For international orders, please contact us on WhatsApp at <strong>+91 91042 35510</strong> or email{" "}
                        <a href="mailto:info@shreevajewels.com">info@shreevajewels.com</a> for shipping options and charges.
                      </p>
                    </div>
                  </div>
                </li>

                {/* 4 */}
                <li className="accordion-product-item">
                  <a
                    href="#faq-4"
                    className="accordion-title collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="faq-4"
                  >
                    <h6>Are your products authentic and hallmarked?</h6>
                    <span className="btn-open-sub" />
                  </a>
                  <div id="faq-4" className="collapse" data-bs-parent="#accordion-faq-1">
                    <div className="accordion-faqs-content">
                      <p className="text-primary">
                        Yes. Our precious metal jewelry is crafted to stated purity and is BIS hallmarked wherever applicable. Gemstones (where mentioned) are sourced from trusted partners; select products include authenticity details/certificates.
                      </p>
                    </div>
                  </div>
                </li>

                {/* 5 */}
                <li className="accordion-product-item">
                  <a
                    href="#faq-5"
                    className="accordion-title collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="faq-5"
                  >
                    <h6>Can I customize or personalize my jewelry?</h6>
                    <span className="btn-open-sub" />
                  </a>
                  <div id="faq-5" className="collapse" data-bs-parent="#accordion-faq-1">
                    <div className="accordion-faqs-content">
                      <p className="text-primary">
                        Absolutely! We offer size adjustments, metal finish choices, stone options, and engraving on eligible designs. Custom pieces may require 7–14 business days extra. Customized items are <strong>not eligible</strong> for return/refund.
                      </p>
                    </div>
                  </div>
                </li>

                {/* 6 */}
                <li className="accordion-product-item">
                  <a
                    href="#faq-6"
                    className="accordion-title collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="faq-6"
                  >
                    <h6>How do I find my ring/bangle size?</h6>
                    <span className="btn-open-sub" />
                  </a>
                  <div id="faq-6" className="collapse" data-bs-parent="#accordion-faq-1">
                    <div className="accordion-faqs-content">
                      <p className="text-primary">
                        Use our size guide (or contact us) with your inner-diameter/ circumference in mm. For gifts, share a reference ring’s inner diameter and we’ll assist. Minor resizing is possible on select designs—reach out for feasibility.
                      </p>
                    </div>
                  </div>
                </li>

                {/* 7 */}
                <li className="accordion-product-item">
                  <a
                    href="#faq-7"
                    className="accordion-title collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="faq-7"
                  >
                    <h6>How should I care for my jewelry?</h6>
                    <span className="btn-open-sub" />
                  </a>
                  <div id="faq-7" className="collapse" data-bs-parent="#accordion-faq-1">
                    <div className="accordion-faqs-content">
                      <p className="text-primary">
                        Store pieces separately in soft pouches, keep away from perfumes/chemicals, remove before bathing, swimming, or workouts, and wipe gently with a soft cloth after use. This preserves shine and longevity.
                      </p>
                    </div>
                  </div>
                </li>

                {/* 8 */}
                <li className="accordion-product-item">
                  <a
                    href="#faq-8"
                    className="accordion-title collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="faq-8"
                  >
                    <h6>What payment methods do you accept?</h6>
                    <span className="btn-open-sub" />
                  </a>
                  <div id="faq-8" className="collapse" data-bs-parent="#accordion-faq-1">
                    <div className="accordion-faqs-content">
                      <p className="text-primary">
                        We accept major cards, UPI, and net-banking via secure payment gateways. Cash-on-Delivery may not be available on all orders or pin codes.
                      </p>
                    </div>
                  </div>
                </li>

                {/* 9 */}
                <li className="accordion-product-item">
                  <a
                    href="#faq-9"
                    className="accordion-title collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="faq-9"
                  >
                    <h6>How do I track my order?</h6>
                    <span className="btn-open-sub" />
                  </a>
                  <div id="faq-9" className="collapse" data-bs-parent="#accordion-faq-1">
                    <div className="accordion-faqs-content">
                      <p className="text-primary">
                        Once dispatched, we’ll share a tracking link via WhatsApp/email. You can follow real-time updates until delivery. For help, contact us with your order ID.
                      </p>
                    </div>
                  </div>
                </li>

                {/* 10 */}
                <li className="accordion-product-item">
                  <a
                    href="#faq-10"
                    className="accordion-title collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="faq-10"
                  >
                    <h6>How do I request a replacement?</h6>
                    <span className="btn-open-sub" />
                  </a>
                  <div id="faq-10" className="collapse" data-bs-parent="#accordion-faq-1">
                    <div className="accordion-faqs-content">
                      <p className="text-primary">
                        Inform us within <strong>14 days</strong> of delivery with unboxing photos/videos and order details. If approved, we’ll arrange instructions for return pickup or re-dispatch. Replacements are subject to inspection and policy.
                      </p>
                    </div>
                  </div>
                </li>

                {/* 11 */}
                <li className="accordion-product-item">
                  <a
                    href="#faq-11"
                    className="accordion-title collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="faq-11"
                  >
                    <h6>Do you offer gift wrap and special packaging?</h6>
                    <span className="btn-open-sub" />
                  </a>
                  <div id="faq-11" className="collapse" data-bs-parent="#accordion-faq-1">
                    <div className="accordion-faqs-content">
                      <p className="text-primary">
                        Yes! All orders are shipped in premium, tamper-proof packaging. Gift notes and special wrapping can be arranged—just mention it at checkout or contact us.
                      </p>
                    </div>
                  </div>
                </li>

                {/* 12 */}
                <li className="accordion-product-item">
                  <a
                    href="#faq-12"
                    className="accordion-title collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="faq-12"
                  >
                    <h6>How can I contact Shreeva Jewels?</h6>
                    <span className="btn-open-sub" />
                  </a>
                  <div id="faq-12" className="collapse" data-bs-parent="#accordion-faq-1">
                    <div className="accordion-faqs-content">
                      <p className="text-primary">
                        📞 <strong>Phone/WhatsApp:</strong> +91 91042 35510 <br />
                        ✉️ <strong>Email:</strong>{" "}
                        <a href="mailto:info@shreevajewels.com">info@shreevajewels.com</a> <br />
                        📍 <strong>Location:</strong> Mumbai, India
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Optional ask-question block removed on purpose; tell me if you want it back with Shreeva styling */}
        </div>
      </div>
    </section>
  );
}
