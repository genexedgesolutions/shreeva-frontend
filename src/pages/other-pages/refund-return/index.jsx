import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Return from "@/components/otherPages/Return";
import React from "react";
import { Link } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
import Topbar from "@/components/headers/Topbar";
const metadata = {
  title: "Terms of Use || Beaubless - Get Your Cosmetics Here",
  description: "Beaubless - Get Your Cosmetics Here",
};

export default function ReturnPage() {
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
              <h3 className="heading text-center">Return & Refund Policy</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" to={`/`}>
                    Homepage
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                {/* <li>
                  <a className="link" href="#">
                    Pages
                  </a>
                </li> */}
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>Return & Refund Policy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Return />
      <Footer1 />
    </>
  );
}
