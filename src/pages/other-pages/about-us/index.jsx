import Brands from "@/components/common/Brands";
import Features2 from "@/components/common/Features2";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import { Link } from "react-router-dom";
import Topbar6 from "@/components/headers/Topbar6";
import About from "@/components/otherPages/About";
import Team from "@/components/otherPages/Team";
import Testimonials from "@/components/common/Testimonials";
import BannerTab from "@/components/common/BannerTab";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import Faqs from "@/components/otherPages/Faqs";
import Features from "@/components/common/Features";
import Testimonials2 from "@/components/common/Testimonials2";
import Topbar from "@/components/headers/Topbar";

const metadata = {
  title: "About Us || Beaubless Cosmetics",
  description: "Beaubless - Hair Care and Skin Care Solution",
};

export default function AboutUsPage() {
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
              <h3 className="heading text-center">About Our Store</h3>
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
                <li className="text-primary">About Our Store</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <About />
      <Features />
      {/* <Team /> */}
      {/* <Brands parentClass="flat-spacing-5 bg-surface" /> */}
      {/* <Testimonials /> */}
      <Faqs />
      <Footer1 />
    </>
  );
}
