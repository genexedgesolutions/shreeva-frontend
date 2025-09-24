import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Contact3 from "@/components/otherPages/Contact3";
import Faqs from "@/components/otherPages/Faqs";
import StoreLocations3 from "@/components/otherPages/StoreLocations3";
import React from "react";
import { Link } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
import Topbar from "@/components/headers/Topbar";
const metadata = {
  title: "Countact Us || Beaubless",
  description: "Beaubless - Hair Care and Skin Care Solution",
};

export default function ContactPage() {
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
              <h3 className="heading text-center">Contact Us</h3>
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
                <li className="text-primary">Contact Us</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Contact3 />
      <StoreLocations3 />
      <Faqs />
      <Footer1 />
    </>
  );
}
