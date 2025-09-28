import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import CurrencySelect from "../common/CurrencySelect";
import LanguageSelect from "../common/LanguageSelect";
import ToolbarBottom from "../headers/ToolbarBottom";
import ScrollTop from "../common/ScrollTop";
import { footerLinks, socialLinks } from "@/data/footerLinks";

export default function Footer1({
  border = true,
  dark = true,
  hasPaddingBottom = false,
}) {
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2200);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    const email = e.target.email.value?.trim();

    if (!email) {
      setSuccess(false);
      setMsg("Please enter a valid email.");
      return handleShowMessage();
    }

    const NEWSLETTER_URL =
      import.meta?.env?.VITE_NEWSLETTER_URL ||
      ""; // e.g. https://backend.shreevajewels.com/api/v1/newsletter/subscribe

    if (!NEWSLETTER_URL) {
      setSuccess(false);
      setMsg(
        "Newsletter service is not configured yet. Please try again later."
      );
      e.target.reset();
      return handleShowMessage();
    }

    try {
      const res = await axios.post(
        NEWSLETTER_URL,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if ([200, 201].includes(res.status)) {
        setSuccess(true);
        setMsg("You have successfully subscribed.");
        e.target.reset();
      } else {
        setSuccess(false);
        setMsg(res.data?.message || "Subscription failed. Please try again.");
      }
    } catch (error) {
      setSuccess(false);
      setMsg(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      handleShowMessage();
    }
  };

  useEffect(() => {
    const headings = document.querySelectorAll(".footer-heading-mobile");

    const toggleOpen = (event) => {
      const parent = event.target.closest(".footer-col-block");
      const content = parent?.querySelector(".tf-collapse-content");
      if (!parent || !content) return;

      const isOpen = parent.classList.contains("open");
      parent.classList.toggle("open", !isOpen);
      content.style.height = !isOpen ? content.scrollHeight + 10 + "px" : "0px";
    };

    headings.forEach((heading) => {
      heading.addEventListener("click", toggleOpen);
    });

    return () => {
      headings.forEach((heading) => {
        heading.removeEventListener("click", toggleOpen);
      });
    };
  }, []);

  return (
    <>
      <div className="footer-section">
        <footer
        id="footer"
        className={`footer ${dark ? "bg-gradient" : ""} ${
          hasPaddingBottom ? "has-pb" : ""
        } `}
      >
        <div className={`footer-wrap ${!border ? "border-0" : ""}`}>
          <div className="footer-body">
            <div className="container">
              <div className="row">
                {/* Left: Brand & Social */}
                <div className="col-lg-4">
                  <div className="footer-infor">
                    <div className="">
                      <Link to={`/`}>
                        <img
                          className="logo"
                          alt="Shreeva Jewels"
                          src={
                            dark
                              ? "/images/logo/logo-rec.png"
                              : "/images/logo/logo-rec.png"
                          }
                          width={280}
                        />
                      </Link>
                    </div>

                    <ul
                      className={`ms-3 tf-social-icon mt-3 ${
                        dark ? "style-white" : ""
                      }`}
                    >
                      {socialLinks.map((link, index) => (
                        <li key={index}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className={link.className}
                            aria-label={link.label || "social"}
                          >
                            <i className={`icon ${link.iconClass}`} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Middle: Links */}
                <div className="col-lg-4">
                  <div className="footer-menu">
                    {footerLinks.map((section, sectionIndex) => (
                      <div className="footer-col-block" key={sectionIndex}>
                        <div
                          className={`text-main ${
                            dark ? "text-white" : ""
                          } footer-heading text-button footer-heading-mobile`}
                        >
                          {section.heading}
                        </div>
                        <div className="tf-collapse-content">
                          <ul className="footer-menu-list">
                            {section.items.map((item, itemIndex) => (
                              <li className="text-caption-1" key={itemIndex}>
                                {item.isLink ? (
                                  <Link
                                    to={item.href}
                                    className={`text-main ${
                                      dark ? "text-white" : ""
                                    } footer-menu_item`}
                                  >
                                    {item.label}
                                  </Link>
                                ) : (
                                  <a
                                    href={item.href}
                                    className="footer-menu_item"
                                  >
                                    {item.label}
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Contact + Newsletter */}
                <div className="col-lg-4">
                  <div className="footer-col-block">
                    <div
                      className={`text-main ${
                        dark ? "text-white" : ""
                      } footer-heading text-button footer-heading-mobile`}
                    >
                      Contact Us
                    </div>

                    <ul className="footer-info">
                      <li className={dark ? "text-white" : ""}>
                        <i className={`icon-mail ${dark ? "text-white" : ""}`} />
                        <p className={`text-main ${dark ? "text-white" : ""}`}>
                          info@shreevajewels.com
                        </p>
                      </li>
                      <li className={dark ? "text-white" : ""}>
                        <i className={`icon-phone ${dark ? "text-white" : ""}`} />
                        <p className={`text-main ${dark ? "text-white" : ""}`}>
                          +91 91042 35510
                        </p>
                      </li>
                      <li className={dark ? "text-white" : ""}>
                        <i className={`icon-mapPin ${dark ? "text-white" : ""}`} />
                        <p className={`text-main ${dark ? "text-white" : ""}`}>
                          Mumbai, India
                        </p>
                      </li>
                    </ul>

                    <div className="tf-collapse-content mt-3">
                      <div className="footer-newsletter">
                        <form
                          onSubmit={sendEmail}
                          className={`form-newsletter subscribe-form ${
                            dark ? "style-black" : ""
                          }`}
                        >
                          <div className="subscribe-content">
                            <fieldset className="email">
                              <input
                                type="email"
                                name="email"
                                className="subscribe-email"
                                placeholder="Enter your e-mail"
                                tabIndex={0}
                                aria-required="true"
                                required
                              />
                            </fieldset>
                            <div className="button-submit">
                              <button className="subscribe-button" type="submit">
                                <i className="icon icon-arrowUpRight" />
                              </button>
                            </div>
                          </div>
                          {/* toast */}
                          <div
                            className={`tfSubscribeMsg footer-sub-element ${
                              showMessage ? "active" : ""
                            }`}
                          >
                            <p
                              style={{
                                color: success ? "rgb(52, 168, 83)" : "red",
                                margin: 0,
                              }}
                            >
                              {msg || (success
                                ? "You have successfully subscribed."
                                : "Something went wrong")}
                            </p>
                          </div>
                        </form>
                        <p
                          className={`text-caption-1 text-main ${
                            dark ? "text-white" : ""
                          } mt-2`}
                        >
                          Sign up for our newsletter and get 10% off your first
                          purchase
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Right */}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className={`footer-bottom ${dark ? "text-white" : ""}`}>
  <div className="container">
    <div className="row align-items-center py-3 text-white">
      {/* Left Section */}
      <div className="col-md-6 text-start text-white">
        <p className={`mb-1 ${dark ? "text-white" : ""}`}>
          ©{new Date().getFullYear()} Shreeva Jewels. All Rights Reserved.
        </p>
        <button
          className="btn p-0 text-decoration-underline"
          onClick={() => navigate("/blazync-technologies")}
          style={{ fontSize: 13,color:"white" }}
          aria-label="Developed & Managed by Blazync Technologies"
        >
          Developed &amp; Managed by Blazync Technologies
        </button>
      </div>

      {/* Right Section */}
      <div className="col-md-6 text-end d-flex justify-content-end align-items-center gap-2">
        <img src="/images/payment/img-2.png" alt="Visa" width={50} />
        <img src="/images/payment/img-1.png" alt="Mastercard" width={50} />
        <img src="/images/payment/img-3.png" alt="Amex" width={50} />
        <img src="/images/payment/img-4.png" alt="PayPal" width={50} />
        <img src="/images/payment/img-5.png" alt="Rupay" width={50} />
        <img src="/images/payment/img-6.png" alt="UPI" width={50} />
        <img src="/images/payment/cc-avenue.png" alt="CC Avenue" width={50} />
      </div>
    </div>
  </div>
</div>

          {/* /Bottom bar */}
          <style jsx>{`
         .footer-section { background: #fff;padding: 20px; }
          .footer { border-top: 1px solid rgba(0,0,0,0.1); border-radius: 12px; overflow: hidden; }
          @media (max-width: 575px) {
           .footer-section { background: #fff;padding: 0px; }
            .footer { border-top: 1px solid rgba(0,0,0,0.1); border-radius: 0px; overflow: hidden; }
          }
          `}</style>
        </div>
      </footer>
      </div>

      <ScrollTop hasPaddingBottom={hasPaddingBottom} />
      <ToolbarBottom />
    </>
  );
}
