import React from "react";
import { Link } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
import Topbar from "@/components/headers/Topbar";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
const metadata = {
  title: "Page Not Found || Modave - Multipurpose Reactjs eCommerce Template",
  description: "Modave - Multipurpose Reactjs eCommerce Template",
};

export default function PageNotFoundPage() {
  return (
    <>
      <Topbar />
      <Header1 />
      <section className="flat-spacing page-404 pt-0 pb-0">
        <div className="container">
          <div className="page-404-inner">
            <div className="image">
              <img
                className="lazyload rounded"
                data-src="/images/section/404.jpg"
                alt="image"
                src="/images/section/404.jpg"
                width={679}
                height={701}
              />
            </div>
            <div className="content">
              <div className="heading">Oops!</div>
              <div>
                <h2 className="title mb_4">Something is Missing.</h2>
                <div className="text body-text-1 text-primary">
                  The page you are looking for cannot be found. take a break
                  before trying again
                </div>
              </div>
              <Link to={`/`} className="tf-btn btn-fill">
                <span className="text text-button">Back To Homepage</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer1 />
    </>
  );
}
