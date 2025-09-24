import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar";
import Products11 from "@/components/products/Products11";

import { Link } from "react-router-dom";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
import Topbar from "@/components/headers/Topbar";
import Products15 from "@/components/products/Products15";


const metadata = {
  title: "Product || Beaubless Cosmetics - Your Skincare Choice",
  description: "Beaubless Cosmetics - Your Skincare Choice",
};
export default function ShopLeftSidebarPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/bg-2.png )" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">Products</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" to={`/`}>
                    Homepage
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>Products</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <Products11 /> */}
      <Products15 />
      <Footer1 />
    </>
  );
}
