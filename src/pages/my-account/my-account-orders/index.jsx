import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import AccountSidebar from "@/components/my-account/AccountSidebar";

import Orders from "@/components/my-account/Orders";
import { Link, Navigate } from "react-router-dom";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import useAuthorization from "@/hooks/userAuthorization";
import Topbar from "@/components/headers/Topbar";
import AccountSidebarMobile from "@/components/modals/AccountSidebarMobile";
const metadata = {
  title: "My Orders || Beaubless - Exclusive Beauty & Cosmetics Store",
  description:
    "View and manage your past orders at Beaubless. Track your purchases, check order status, and reorder your favorite beauty products easily.",
};

export default function MyAccountOrdersPage() {
  const isAuthorized = useAuthorization();

  if (isAuthorized === null) {
    return (
      <div id="preloader" className="preload-container">
        <div className="loader-wrapper">
          <div className="spinner"></div>
        </div>
      </div>
    ); // Avoids redirection before auth check completes
  }
  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }
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
            <Orders />
          </div>
        </div>
      </section>
      <Footer1 />
    </>
  );
}
