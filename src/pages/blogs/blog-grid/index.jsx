import BlogGrid from "@/components/blogs/BlogGrid";

import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import { Link } from "react-router-dom";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
import Topbar from "@/components/headers/Topbar";
const metadata = {
  title: "Blog Beaubless",
  description: "Beauty Tips and More",
};
export default function BlogGridPage() {
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
              <h3 className="heading text-center">Beauty Tips</h3>
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
                    Blogs
                  </a>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>Blogs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <BlogGrid />
      <Footer1 />
    </>
  );
}
