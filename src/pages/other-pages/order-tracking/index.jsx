import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Login from "@/components/otherPages/Login";
import OrderTrac from "@/components/otherPages/OrderTrac";
import { Link } from "react-router-dom";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import Topbar from "@/components/headers/Topbar";
const metadata = {
  title: "Order Tracking || Beaubless",
  description: "Beaubless - Hair Care and Skin Care Solution",
};

export default function OrderTrackingPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <div className="page-title">
        <div className="container-full">
          <div className="row">
            <div
              classstyle={{ backgroundImage: "url(/images/section/bg-2.png )" }}
              Name="col-12"
            >
              <h3 className="heading text-center">Order Tracking</h3>
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
                <li>Order Tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <OrderTrac />
      <Footer1 />
    </>
  );
}
