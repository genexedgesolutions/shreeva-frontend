// src/components/MobileMenu.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LanguageSelect from "../common/LanguageSelect";
import CurrencySelect from "../common/CurrencySelect";
import useAuthorization from "@/hooks/userAuthorization";

export default function MobileMenu() {
  const { pathname } = useLocation();
  const path = pathname.toLowerCase();
  const isAuthorized = useAuthorization();
  const [openIdx, setOpenIdx] = useState(null);

  const isActive = (to) => {
    const t = to.toLowerCase();
    if (t === "/") return path === "/";
    return path === t || path.startsWith(t + "/");
  };

  const items = [
    { label: "Home", to: "/" },
    { label: "Collections", to: "/collections" },
    {
      label: "Rings",
      to: "/collections/rings",
      children: [
        { label: "Solitaire Diamonds", to: "/diamond/solitaire" },
        { label: "Loose Diamonds", to: "/diamond/loose" },
        { label: "Engagement Rings", to: "/diamond/engagement-rings" },
      ],
    },
    {
      label: "Jewellery",
      to: "/collections/jewelry",
      children: [
        { label: "Rings", to: "/jewellery/rings" },
        { label: "Necklaces", to: "/jewellery/necklaces" },
        { label: "Earrings", to: "/jewellery/earrings" },
        { label: "Braceletes", to: "/collections/braceletes" },
        { label: "Bridal Sets", to: "/collections/bridal-sets" },
        { label: "Pendent", to: "/collections/pendent" },
      ],
    },
    {
      label: "Diamonds",
      to: "/collections/natural-diamond",
      children: [
        { label: "Natural Diamond", to: "/collections/natural-diamond" },
        { label: "Lab Grown Diamond", to: "/collections/lab-grown-diamond" },
        { label: "Certified Diamond", to: "/collections/certified-diamond" },
        { label: "Non-certified Diamond", to: "/collections/non-certified-diamond" },
      ],
    },
    {
      label: "Materials",
      to: "/collections/gold",
      children: [
        { label: "Gold", to: "/collections/gold" },
        { label: "Platinum", to: "/collections/platinum" },
        { label: "Sterling Silver 925", to: "/collections/sterling-silver-925" },
      ],
    },
    {
      label: "Karat",
      to: "/collections/22-karat",
      children: [
        { label: "22 Karat", to: "/collections/22-karat" },
        { label: "18 Karat", to: "/collections/18-karat" },
        { label: "14 Karat", to: "/collections/14-karat" },
        { label: "10 Karat", to: "/collections/10-karat" },
        { label: "9 Karat", to: "/collections/9-karat" },
      ],
    },
    {
      label: "Styles",
      to: "/collections/daily-wear",
      children: [
        { label: "Daily Wear", to: "/collections/daily-wear" },
        { label: "Party Wear", to: "/collections/party-wear" },
      ],
    },
    { label: "Watches", to: "/collections/watches" },
    { label: "Custom Jewelery Enquiry", to: "/custom-jewelery-enquiry" },
    { label: "Contact Us", to: "/contact-us" },
  ];

  return (
    <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
      <span className="icon-close icon-close-popup" data-bs-dismiss="offcanvas" aria-label="Close" />
      <div className="mb-canvas-content">
        <div className="mb-body">
          <div className="mb-content-top">
            <form className="form-search" onSubmit={(e) => e.preventDefault()}>
              <fieldset className="text">
                <input type="text" placeholder="What are you looking for?" name="text" tabIndex={0} />
              </fieldset>
              <button type="submit" aria-label="Search">
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <path d="M11 19A8 8 0 1 0 11 3a8 8 0 0 0 0 16Z" stroke="#181818" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="m21 21-4.35-4.35" stroke="#181818" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>

            <ul className="nav-ul-mb" id="wrapper-menu-navigation">
              {items.map((item, idx) => {
                const hasDropdown = Array.isArray(item.children) && item.children.length > 0;
                const open = openIdx === idx;
                const submenuId = `sub-${idx}`;

                return (
                  <li
                    key={idx}
                    className={`nav-mb-item ${hasDropdown ? "has-dropdown" : ""} ${isActive(item.to) ? "active" : ""} ${open ? "open" : ""}`}
                  >
                    {/* row with left toggle then label */}
                    <div className="row-line">
                      {hasDropdown ? (
                        <button
                          type="button"
                          className="btn-open-sub-left"
                          aria-label={open ? "Collapse submenu" : "Expand submenu"}
                          aria-haspopup="menu"
                          aria-controls={submenuId}
                          aria-expanded={open ? "true" : "false"}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOpenIdx((cur) => (cur === idx ? null : idx));
                          }}
                        >
                          {/* + / − icons */}
                          <span className="pm-icon" aria-hidden="true">{open ? "−" : "+"}</span>
                          {/* If you prefer arrows instead of plus/minus, comment the span above and uncomment below:
                          <span className={`chev ${open ? "down" : "right"}`} aria-hidden="true">▸</span>
                          */}
                        </button>
                      ) : (
                        <span className="btn-placeholder" aria-hidden="true" />
                      )}

                      <Link to={item.to} className="mb-menu-link">
                        <span>{item.label}</span>
                      </Link>
                    </div>

                    {hasDropdown && (
                      <ul id={submenuId} className="sub-nav-menu" role="menu" style={{ display: open ? "block" : "none" }}>
                        {item.children.map((c, ci) => (
                          <li key={ci} role="none">
                            <Link to={c.to} className={`sub-nav-link ${isActive(c.to) ? "active" : ""}`} role="menuitem">
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mb-other-content">
            <div className="group-icon">
              <Link to={`/my-account`} className="site-nav-icon">
                <svg className="icon" width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <path d="M20 21V19c0-1.06-.42-2.08-1.17-2.83A4.01 4.01 0 0 0 16 15H8a4 4 0 0 0-4 4v2" stroke="#181818" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="#181818" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                My Account
              </Link>

              {isAuthorized ? (
                <button
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    window.location.href = "/login";
                  }}
                  className="site-nav-icon"
                >
                  <svg className="icon" width={18} height={18} viewBox="0 0 24 24" fill="none">
                    <path d="M20 21V19c0-1.06-.42-2.08-1.17-2.83A4.01 4.01 0 0 0 16 15H8a4 4 0 0 0-4 4v2" stroke="#181818" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="#181818" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Logout
                </button>
              ) : (
                <Link to={`/login`} className="site-nav-icon">
                  <svg className="icon" width={18} height={18} viewBox="0 0 24 24" fill="none">
                    <path d="M20 21V19c0-1.06-.42-2.08-1.17-2.83A4.01 4.01 0 0 0 16 15H8a4 4 0 0 0-4 4v2" stroke="#181818" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="#181818" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Login
                </Link>
              )}
            </div>

            <div className="mb-notice">
              <Link to={`/contact-us`} className="text-need">Need Help?</Link>
            </div>

            <div className="mb-contact">
              <p className="text-caption-1">Mumbai, India</p>
            </div>

            <ul className="mb-info">
              <li><i className="icon icon-mail" /><p>info@shreevajewels.com</p></li>
              <li><i className="icon icon-phone" /><p>+91 91042 35510</p></li>
            </ul>
          </div>
        </div>

        <div className="mb-bottom">
          <div className="bottom-bar-language">
            <div className="tf-currencies"><CurrencySelect /></div>
            <div className="tf-languages">
              <LanguageSelect parentClassName="image-select center style-default type-languages" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .nav-ul-mb { list-style: none; margin: 0; padding: 0; }
        .nav-mb-item { position: relative; border-bottom: 1px solid #eee; }
        .nav-mb-item:last-child { border-bottom: 0; }
        .nav-ul-mb .sub-nav-link{
        color: #222 !important;
        }

        .row-line {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 8px;
        }
          .row-line button{
              background-color: black;
          }

        .btn-open-sub-left,
        .btn-placeholder {
          width: 36px;
          height: 36px;
          min-width: 36px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: #fff;
          margin-left: 6px;
        }
        .btn-placeholder { border-color: transparent; background: transparent; }

        .pm-icon {
          font-size: 18px;
          line-height: 1;
          transform: translateY(-1px);
          user-select: none;
        }

        /* If you want arrow instead of +/−, use .chev and rotate on open */
        .chev { display: inline-block; transition: transform .2s ease; }
        .nav-mb-item.open .chev.right { transform: rotate(90deg); }
        .chev.down { transform: rotate(90deg); } /* default down */

        .mb-menu-link {
          flex: 1;
          display: block;
          padding: 12px 8px;
          color: #222;
          text-decoration: none;
          font-weight: 600;
        }
        .nav-mb-item.active > .row-line > .mb-menu-link { color: #c29863; }

        .sub-nav-menu {
          list-style: none;
          margin: 0;
          padding: 6px 0 10px 52px; /* indent under toggle */
          background: #fafafa;
          border-top: 1px solid #eee;
        }
        .sub-nav-link {
          display: block;
          padding: 10px 14px;
          color: #333;
          text-decoration: none;
          font-size: 14px;
          border-radius: 6px;
        }
        .sub-nav-link.active,
        .sub-nav-link:hover {
          color: #c29863;
          background: #f5f5f5;
        }
      `}</style>
    </div>
  );
}
