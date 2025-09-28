// src/components/Nav.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const { pathname } = useLocation();
  const path = pathname.toLowerCase();
  const [openIdx, setOpenIdx] = useState(null); // mobile/touch toggle

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
        { label: "Solitaire Diamonds", to: "/collections/solitaire" },
        { label: "Loose Diamonds", to: "/collections/loose" },
        { label: "Engagement Rings", to: "/collections/engagement-rings" },
      ],
    },
    {
      label: "Jewellery",
      to: "/collections/jewelry",
      children: [
        { label: "Rings", to: "/collections/rings" },
        { label: "Necklaces", to: "/collections/necklaces" },
        { label: "Earrings", to: "/collections/earrings" },
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
    <>
      {items.map((item, idx) => {
        const hasDropdown = Array.isArray(item.children) && item.children.length > 0;
        const open = openIdx === idx;

        return (
          <li
            key={idx}
            className={`menu-item ${hasDropdown ? "has-dropdown" : ""} ${isActive(item.to) ? "active" : ""} ${open ? "open" : ""}`}
            onMouseEnter={() => setOpenIdx(idx)}
            onMouseLeave={() => setOpenIdx(null)}
          >
            {/* Label link (always navigates) */}
            <Link to={item.to} className="item-link">
              {item.label}
            </Link>

            {/* Caret button only when there is a dropdown (for touch devices) */}
            {hasDropdown && (
              <button
                type="button"
                className="caret-btn"
                aria-label={open ? "Collapse menu" : "Expand menu"}
                aria-haspopup="menu"
                aria-expanded={open ? "true" : "false"}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenIdx((cur) => (cur === idx ? null : idx));
                }}
              >
                ▼
              </button>
            )}

            {hasDropdown && (
              <ul className="dropdown-menu" role="menu">
                {item.children.map((c, ci) => (
                  <li key={ci} role="none">
                    <Link to={c.to} role="menuitem">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}

      <style jsx>{`
        :global(nav ul), :global(.main-menu) {
          overflow: visible !important;
          position: relative !important;
          z-index: 10 !important;
        }

        .menu-item {
          position: relative !important;
          list-style: none !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 1px !important;
          vertical-align: top !important;
        }

        .item-link {
          display: block !important;
          // padding: 10px 16px !important;
          text-decoration: none !important;
          color: #222 !important;
          font-weight: 600 !important;
          transition: color 0.2s ease !important;
        }

        .menu-item.active > .item-link,
        .item-link:hover {
          color: #c29863 !important;
        }

        .caret-btn {
          background: transparent !important;
          border: 0 !important;
          cursor: pointer !important;
          padding: 0 6px !important;
          line-height: 1 !important;
          color: inherit !important;
          font-size: 12px !important;
          user-select: none !important;
        }

        .menu-item.has-dropdown .dropdown-menu {
          display: none !important;
          position: absolute !important;
          top: 100% !important;
          left: 0 !important;
          background: #fff !important;
          border: 1px solid #ddd !important;
          border-radius: 4px !important;
          min-width: 200px !important;
          z-index: 9999 !important;
          padding: 8px 0 !important;
          box-shadow: 0 10px 24px rgba(0,0,0,0.10) !important;
        }

        /* Desktop hover OR mobile/touch open state */
        .menu-item.has-dropdown:hover > .dropdown-menu,
        .menu-item.open > .dropdown-menu {
          display: block !important;
        }

        .dropdown-menu li { margin: 0 !important; padding: 0 !important; }
        .dropdown-menu li a {
          display: block !important;
          padding: 8px 14px !important;
          text-decoration: none !important;
          color: #333 !important;
          font-size: 14px !important;
          transition: background 0.2s ease, color 0.2s ease !important;
          white-space: nowrap !important;
        }
        .dropdown-menu li a:hover {
          background: #f5f5f5 !important;
          color: #c29863 !important;
        }

        :global(header), :global(.header), :global(.site-header) {
          overflow: visible !important;
          z-index: 20 !important;
        }
      `}</style>
    </>
  );
}
