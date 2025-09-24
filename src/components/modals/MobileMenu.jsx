import React from "react";
import { Link, useLocation } from "react-router-dom";
import LanguageSelect from "../common/LanguageSelect";
import CurrencySelect from "../common/CurrencySelect";
import {
  shopByUse,
  HomeMenu,
  shopMenu,
  AccountMenus,
  blogMenu,
  shop_by_price,
  shopByMaterial,
  PolicyPages,
  ContactMenu,
} from "@/data/menu";
import useAuthorization from "@/hooks/userAuthorization";

export default function MobileMenu() {
  const { pathname } = useLocation();
  const isAuthorized = useAuthorization();
  return (
    <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
      <span
        className="icon-close icon-close-popup"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      />
      <div className="mb-canvas-content">
        <div className="mb-body">
          <div className="mb-content-top">
            <form className="form-search" onSubmit={(e) => e.preventDefault()}>
              <fieldset className="text">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className=""
                  name="text"
                  tabIndex={0}
                  defaultValue=""
                  aria-required="true"
                  required
                />
              </fieldset>
              <button className="" type="submit">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                    stroke="#181818"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.9984 20.9999L16.6484 16.6499"
                    stroke="#181818"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
            <ul className="nav-ul-mb" id="wrapper-menu-navigation">
              {/* <li className="nav-mb-item active">
                <Link
                  to="/"
                  className={`collapsed mb-menu-link ${
                    [...HomeMenu].some(
                      (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                    )
                      ? "active"
                      : ""
                  } `}
                  aria-expanded="true"
                  aria-controls="dropdown-menu-one"
                >
                  <span>Home</span>
                  <span className="btn-open-sub" />
                </Link>
              </li>
              <li className="nav-mb-item">
                <Link
                  to="/products"
                  className={`collapsed mb-menu-link ${
                    [...shopMenu].some(
                      (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                    )
                      ? "active"
                      : ""
                  } `}
                  // data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-two"
                >
                  <span>Shop</span>
                  <span className="btn-open-sub" />
                </Link>
                <div id="dropdown-menu-two" className="collapse">
                  <ul className="sub-nav-menu">
                    {shopMenu.map((link, i) => (
                      <li key={i}>
                        <Link
                          to={link.href}
                          className={`sub-nav-link ${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active"
                              : ""
                          } `}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="nav-mb-item">
                <Link
                  to="/collections"
                  className={`collapsed mb-menu-link ${
                    [...shop_by_price, ...shopByUse, ...shopByMaterial].some(
                      (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                    )
                      ? "active"
                      : ""
                  } `}
                  // data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-three"
                >
                  <span>Categories</span>
                  <span className="btn-open-sub" />
                </Link>
                <div id="dropdown-menu-three" className="collapse">
                  <ul className="sub-nav-menu">
                    <li>
                      <Link
                        to="#sub-product-one"
                        className={`sub-nav-link collapsed ${
                          [...shop_by_price].some(
                            (elm) =>
                              elm.href.split("/")[1] == pathname.split("/")[1]
                          )
                            ? "active"
                            : ""
                        } `}
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="sub-product-one"
                      >
                        <span>By Price</span>
                        <span className="btn-open-sub" />
                      </Link>
                      <div id="sub-product-one" className="collapse">
                        <ul className="sub-nav-menu sub-menu-level-2">
                          {shop_by_price.map((link, i) => (
                            <li key={i}>
                              <Link
                                to={link.href}
                                className={`sub-nav-link ${
                                  pathname.split("/")[1] ==
                                  link.href.split("/")[1]
                                    ? "active"
                                    : ""
                                } `}
                              >
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                    <li>
                      <Link
                        to="#sub-product-two"
                        className={`sub-nav-link collapsed ${
                          [...shopByUse].some(
                            (elm) =>
                              elm.href.split("/")[1] == pathname.split("/")[1]
                          )
                            ? "active"
                            : ""
                        } `}
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="sub-product-two"
                      >
                        <span>By Use</span>
                        <span className="btn-open-sub" />
                      </Link>
                      <div id="sub-product-two" className="collapse">
                        <ul className="sub-nav-menu sub-menu-level-2">
                          {shopByUse.map((link, i) => (
                            <li key={i}>
                              <Link
                                to={link.href}
                                className={`sub-nav-link ${
                                  pathname.split("/")[1] ==
                                  link.href.split("/")[1]
                                    ? "active"
                                    : ""
                                } `}
                              >
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                    <li>
                      <Link
                        to="#sub-product-three"
                        className={`sub-nav-link collapsed ${
                          [...shopByMaterial].some(
                            (elm) =>
                              elm.href.split("/")[1] == pathname.split("/")[1]
                          )
                            ? "active"
                            : ""
                        } `}
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="sub-product-three"
                      >
                        <span>By Materials</span>
                        <span className="btn-open-sub" />
                      </Link>
                      <div id="sub-product-three" className="collapse">
                        <ul className="sub-nav-menu sub-menu-level-2">
                          {shopByMaterial.map((link, i) => (
                            <li key={i}>
                              <Link
                                to={link.href}
                                className={`sub-nav-link ${
                                  pathname.split("/")[1] ==
                                  link.href.split("/")[1]
                                    ? "active"
                                    : ""
                                } `}
                              >
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-mb-item">
                <Link
                to="/blogs"
                  className={`collapsed mb-menu-link ${
                    [...blogMenu].some(
                      (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                    )
                      ? "active"
                      : ""
                  } `}
                  // data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-four"
                >
                  <span>Blogs</span>
                  <span className="btn-open-sub" />
                </Link>
                <div id="dropdown-menu-four" className="collapse">
                  <ul className="sub-nav-menu">
                    {blogMenu.map((link, i) => (
                      <li key={i}>
                        <Link
                          to={link.href}
                          className={`sub-nav-link ${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active"
                              : ""
                          } `}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="nav-mb-item">
                <Link
                  to="#dropdown-menu-five"
                  className={`collapsed mb-menu-link ${
                    [...PolicyPages].some(
                      (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                    )
                      ? "active"
                      : ""
                  } `}
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-five"
                >
                  <span>Privacy Policy</span>
                  <span className="btn-open-sub" />
                </Link>
                <div id="dropdown-menu-five" className="collapse">
                  <ul className="sub-nav-menu">
                    {PolicyPages.map((link, i) => (
                      <li key={i}>
                        <Link
                          to={link.href}
                          className={`sub-nav-link text-primary${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active text-black"
                              : ""
                          } `}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="nav-mb-item">
                <Link to={`/order-tracking`} className="site-nav-icon">
                  Track Order
                </Link>
              </li> */}
              <li
                className={`nav-mb-item ${
                  pathname === "skin-care" ? "active" : ""
                }`}
              >
                <Link to="/collections/skin-care" className="mb-menu-link">
                  <span>Skin Care</span>
                </Link>
              </li>

              <li
                className={`nav-mb-item ${
                  pathname === "hair-care" ? "active" : ""
                }`}
              >
                <Link to="/collections/hair-care" className="mb-menu-link">
                  <span>Hair Care</span>
                </Link>
              </li>

              <li
                className={`nav-mb-item ${
                  pathname === "combos" ? "active" : ""
                }`}
              >
                <Link to="/collections/combos" className="mb-menu-link">
                  <span>Kits & Combos</span>
                </Link>
              </li>

              <li
                className={`nav-mb-item ${
                  pathname === "gifting" ? "active" : ""
                }`}
              >
                <Link to="/gifting" className="mb-menu-link">
                  <span>Gifting</span>
                </Link>
              </li>

              <li
                className={`nav-mb-item ${
                  ContactMenu.some((elm) => elm.href === pathname)
                    ? "active"
                    : ""
                }`}
              >
                <Link to="/contact-us" className="mb-menu-link">
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-other-content">
            <div className="group-icon">
              <Link to={`/my-account`} className="site-nav-icon">
              <svg
                    className="icon"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                      stroke="#181818"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                      stroke="#181818"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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
                  <svg
                    className="icon"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                      stroke="#181818"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                      stroke="#181818"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Logout
                </button>
                  
              ) : (
                <Link to={`/login`} className="site-nav-icon">
                  <svg
                    className="icon"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                      stroke="#181818"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                      stroke="#181818"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Login
                </Link>
              )}
            </div>
            <div className="mb-notice">
              <Link to={`/contact-us`} className="text-need">
                Need Help?
              </Link>
            </div>
            <div className="mb-contact">
              <p className="text-caption-1">
                Raj Nagar Extension Road, Ghaziabad, Uttar Pradesh, India,
                201017
              </p>
              {/* <Link
                to={`/contact-us`}
                className="tf-btn-default text-btn-uppercase"
              >
                GET DIRECTION
                <i className="icon-arrowUpRight" />
              </Link> */}
            </div>
            <ul className="mb-info">
              <li>
                <i className="icon icon-mail" />
                <p>sales@beaubless.com</p>
              </li>
              <li>
                <i className="icon icon-phone" />
                <p>+91 85870 85402</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="mb-bottom">
          <div className="bottom-bar-language">
            <div className="tf-currencies">
              <CurrencySelect />
            </div>
            <div className="tf-languages">
              <LanguageSelect parentClassName="image-select center style-default type-languages" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
