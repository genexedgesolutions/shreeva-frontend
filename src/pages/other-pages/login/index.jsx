import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Login from "@/components/otherPages/Login";
import { Link, Navigate } from "react-router-dom";
import React, { useEffect } from "react";

import MetaComponent from "@/components/common/MetaComponent";
import Topbar from "@/components/headers/Topbar";
import useAuthorization from "@/hooks/userAuthorization";

const metadata = {
  title: "Login - Beaubless Cosmetics",
  description:
    "Access your Beaubless Cosmetics account to manage orders, track purchases, and explore exclusive beauty deals.",
};

export default function LoginPage() {
  const isAuthorized = useAuthorization();
  if (isAuthorized === null) {
    return <div id="preloader" class="preload-container">
    <div class="loader-wrapper">
      <div class="spinner"></div>
    </div>
  </div>; // Avoids redirection before auth check completes
  }

  if (isAuthorized) {
    return <Navigate to="/my-account" replace />;
  }

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
              <h3 className="heading text-center">Login</h3>
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
                <li>Login</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Login />
      <Footer1 />
    </>
  );
}
