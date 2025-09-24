import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Wishlist from "@/components/otherPages/Wishlist";
import { Link, Navigate } from "react-router-dom";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
import useAuthorization from "@/hooks/userAuthorization";
import Topbar from "@/components/headers/Topbar";
const metadata = {
  title: "Wishlist || Beaubless",
  description: "Beaubless - Hair Care and Skin Care Solution",
};
export default function WishListPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/bg-2.png )" }}
      >
        <div className="container">
          <h3 className="heading text-center">Your Wishlist</h3>
          <ul className="breadcrumbs d-flex align-items-center justify-content-center">
            <li>
              <Link className="link" to={`/`}>
                Homepage
              </Link>
            </li>
            <li>
              <i className="icon-arrRight" />
            </li>
            <li>
              <Link className="link" to={`/shop-default-grid`}>
                Shop
              </Link>
            </li>
            <li>
              <i className="icon-arrRight" />
            </li>
            <li>Wishlist</li>
          </ul>
        </div>
      </div>

      <Wishlist />

      <Footer1 />
    </>
  );
}
