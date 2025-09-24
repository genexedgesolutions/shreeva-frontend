import React from "react";

export default function Faqs() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="page-faqs-wrap">
          <div className="list-faqs">
            <div>
              <h5 className="faqs-title">Need help ?</h5>
              <ul
                className="accordion-product-wrap style-faqs"
                id="accordion-faq-1"
              >
                <li className="accordion-product-item">
                  <a
                    href="#accordion-1"
                    className="accordion-title collapsed current"
                    data-bs-toggle="collapse"
                    aria-expanded="true"
                    aria-controls="accordion-1"
                  >
                    <h6>Are your products safe for sensitive skin?</h6>
                    <span className="btn-open-sub" />
                  </a>
                  <div
                    id="accordion-1"
                    className="collapse"
                    data-bs-parent="#accordion-faq-1"
                  >
                    <div className="accordion-faqs-content">
                      <p className="text-primary">
                        Absolutely! Our products are dermatologically tested and
                        crafted with gentle, skin-loving ingredients. However,
                        we always recommend a patch test before full
                        application.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="accordion-product-item">
                  <a
                    href="#accordion-2"
                    className="accordion-title current"
                    data-bs-toggle="collapse"
                    aria-expanded="true"
                    aria-controls="accordion-2"
                  >
                    <h6>Are your products suitable for all skin types?</h6>
                    <span className="btn-open-sub" />
                  </a>
                  <div
                    id="accordion-2"
                    className="collapse show"
                    data-bs-parent="#accordion-faq-1"
                  >
                    <div className="accordion-faqs-content">
                      <p className="text-primary">
                        Yes, our products are carefully formulated to cater to
                        different skin types, including oily, dry, combination,
                        and sensitive skin. Each product comes with a detailed
                        description highlighting which skin type it’s best
                        suited for. If you're unsure, our team is always happy
                        to help you choose the right products based on your skin
                        concerns.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="accordion-product-item">
                  <a
                    href="#accordion-3"
                    className="accordion-title collapsed current"
                    data-bs-toggle="collapse"
                    aria-expanded="true"
                    aria-controls="accordion-3"
                  >
                    <h6>
                      Do your products contain any harmful chemicals like
                      parabens or sulfates?
                    </h6>
                    <span className="btn-open-sub" />
                  </a>
                  <div
                    id="accordion-3"
                    className="collapse"
                    data-bs-parent="#accordion-faq-1"
                  >
                    <div className="accordion-faqs-content">
                      <p className="text-primary">
                        Absolutely not! We are committed to creating clean,
                        safe, and effective skincare products. All our
                        formulations are free from parabens, sulfates, mineral
                        oils, phthalates, and other harmful chemicals that can
                        damage your skin or health in the long run. We carefully
                        select natural, non-toxic ingredients backed by science
                        to ensure each product is not only gentle but also
                        delivers visible results. Your skin deserves only the
                        best, and we prioritize safety, transparency, and
                        quality in every product we create
                      </p>
                    </div>
                  </div>
                </li>
                <li className="accordion-product-item">
                  <a
                    href="#accordion-4"
                    className="accordion-title collapsed current"
                    data-bs-toggle="collapse"
                    aria-expanded="true"
                    aria-controls="accordion-4"
                  >
                    <h6>
                      Do your products have artificial fragrances or colors?
                    </h6>
                    <span className="btn-open-sub" />
                  </a>
                  <div
                    id="accordion-4"
                    className="collapse"
                    data-bs-parent="#accordion-faq-1"
                  >
                    <div className="accordion-faqs-content">
                      <p className="text-primary">
                        No, we avoid using artificial fragrances and colors in
                        our formulations. Any scent you experience comes from
                        natural essential oils or the ingredients themselves.
                        This helps us create products that are both gentle on
                        your skin and environmentally friendly.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="accordion-product-item">
                  <a
                    href="#accordion-5"
                    className="accordion-title collapsed current"
                    data-bs-toggle="collapse"
                    aria-expanded="true"
                    aria-controls="accordion-5"
                  >
                    <h6>Can I use your products if I have acne-prone skin?</h6>
                    <span className="btn-open-sub" />
                  </a>
                  <div
                    id="accordion-5"
                    className="collapse"
                    data-bs-parent="#accordion-faq-1"
                  >
                    <div className="accordion-faqs-content">
                      <p className="text-primary">
                        Absolutely! We offer a range of products specifically
                        designed for acne-prone and sensitive skin. Our formulas
                        are non-comedogenic, meaning they won't clog pores, and
                        they include soothing ingredients like niacinamide, tea
                        tree, and aloe vera to calm breakouts without drying out
                        your skin.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="accordion-product-item">
                  <a
                    href="#accordion-5"
                    className="accordion-title collapsed current"
                    data-bs-toggle="collapse"
                    aria-expanded="true"
                    aria-controls="accordion-5"
                  >
                    <h6>Are your products suitable for daily use?</h6>
                    <span className="btn-open-sub" />
                  </a>
                  <div
                    id="accordion-5"
                    className="collapse"
                    data-bs-parent="#accordion-faq-1"
                  >
                    <div className="accordion-faqs-content">
                      <p className="text-primary">
                        Yes, our products are designed to be gentle enough for
                        daily use while delivering effective results. Each
                        product comes with detailed usage instructions to help
                        you incorporate it into your daily skincare routine. If
                        you're unsure about how often to use a specific product,
                        feel free to reach out to our skincare experts for
                        personalized advice.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* <div className="ask-question sticky-top">
            <div className="ask-question-wrap">
              <h5 className="mb_4">Ask Your Question</h5>
              <p className="mb_20 text-primary">
                Ask Anything, We're Here to Help
              </p>
              <form
                className="form-leave-comment"
                onSubmit={(e) => e.preventDefault()}
              >
                <fieldset className="mb_20">
                  <div className="text-caption-1 mb_8">Name</div>
                  <input
                    className=""
                    type="text"
                    placeholder="Your Name*"
                    name="text"
                    tabIndex={2}
                    defaultValue=""
                    aria-required="true"
                    required
                  />
                </fieldset>
                <fieldset className="mb_20">
                  <div className="text-caption-1 mb_8">
                    How can we help you?
                  </div>
                  <div className="tf-select">
                    <select className="">
                      <option>Exchanges &amp; Returns</option>
                      <option>Other</option>
                    </select>
                  </div>
                </fieldset>
                <fieldset className="mb_20">
                  <div className="text-caption-1 mb_8">Name</div>
                  <textarea
                    className=""
                    rows={4}
                    placeholder="Your Message*"
                    tabIndex={2}
                    aria-required="true"
                    required
                    defaultValue={""}
                  />
                </fieldset>
                <div className="button-submit">
                  <button
                    className="btn-style-2 w-100"
                    type="submit"
                    style={{
                      background:
                        "linear-gradient(81deg, #5e0d8b 1% 37.5%, #9268aa 91.5%)",
                    }}
                  >
                    <span className="text text-button">Send Request</span>
                  </button>
                </div>
              </form>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
