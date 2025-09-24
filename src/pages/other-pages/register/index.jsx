import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Register from "@/components/otherPages/Register";
import { Link } from "react-router-dom";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import Topbar from "@/components/headers/Topbar";
const metadata = {
  title: "Register || Beaubless",
  description: "Create an account on Beaubless ",
};

export default function RegisterPage() {
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
              <h3 className="heading text-center">Register</h3>
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
                <li>Register</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Register />
      <Footer1 />
    </>
  );
}
