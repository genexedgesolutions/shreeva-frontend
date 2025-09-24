import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import AccountSidebar from "@/components/my-account/AccountSidebar";
import { Link } from "react-router-dom";
import OrderDetails from "@/components/my-account/OrderDetails";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import Topbar from "@/components/headers/Topbar";
import AccountSidebarMobile from "@/components/modals/AccountSidebarMobile";
const metadata = {
  title:
    "My Account Order Details || Modave - Multipurpose Reactjs eCommerce Template",
  description: "Beaubless - Hair Care and Skin Care Solution",
};

export default function MyAccountOrdersDetailsPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <>
        {/* page-title */}
        <div
          className="page-title"
          style={{ backgroundImage: "url(/images/section/bg-2.png )" }}
        >
          <div className="container-full">
            <div className="row">
              <div className="col-12">
                <h3 className="heading text-center">My Account</h3>
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
                    <a className="link" href="#">
                      Pages
                    </a>
                  </li>
                  <li>
                    <i className="icon-arrRight" />
                  </li>
                  <li>My Account</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* /page-title */}
        <div className="btn-sidebar-account">
          <button data-bs-toggle="offcanvas" data-bs-target="#mbAccount">
            <i className="icon icon-squares-four" />
          </button>
        </div>
      </>
       <AccountSidebarMobile />

      <section className="flat-spacing">
        <div className="container">
          <div className="my-account-wrap">
            <AccountSidebar />
            <OrderDetails />
          </div>
        </div>
      </section>
      <Footer1 />
    </>
  );
}
