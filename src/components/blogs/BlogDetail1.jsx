import React from "react";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

export default function BlogDetail1({ blog }) {
  return (
    <div className="blog-detail-wrap">
      <div className="image" />
      <div className="inner">
        <div className="heading">
          <ul className="list-tags has-bg justify-content-center">
            <li>
              <a href="#" className="link">
                Makeup Trends
              </a>
            </li>
          </ul>
          <h3 className="fw-5">{blog.title}</h3>
          <div className="meta justify-content-center">
            <div className="meta-item gap-8">
              <div className="icon">
                <i className="icon-calendar" />
              </div>
              <p className="body-text-1">February 20, 2025</p>
            </div>
            <div className="meta-item gap-8">
              <div className="icon">
                <i className="icon-user" />
              </div>
              <p className="body-text-1">
                by{" "}
                <a className="link" href="#">
                  Themesflat
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="content">
          <p className="body-text-1 mb_12">
            {blog.description2}
          </p>
          <p className="body-text-1">
            {blog.description3}
          </p>
        </div>
        <div className="group-image d-flex gap-20">
          <div>
            <img
              alt=""
              src="/images/blog/women-3.jpg"
              width={623}
              height={468}
            />
          </div>
          <div>
            <img
              alt=""
              src="/images/blog/women-4.jpg"
              width={623}
              height={468}
            />
          </div>
        </div>
        <div className="content">
          <h3 className="fw-5 mb_16"></h3>
          <p className="body-text-1 mb_16">
            
          </p>
          <p className="body-text-1 mb_16">
           
          </p>
          {/* <ul className="list-text type-disc mb_16">
            <li className="body-text-1">
             
            </li>
            <li className="body-text-1">
             
            </li>
            <li className="body-text-1">
              
            </li>
            <li className="body-text-1">
              
            </li>
            <li className="body-text-1">
             
            </li>
            <li className="body-text-1">
             
            </li>
            <li className="body-text-1">
              
            </li>
            <li className="body-text-1">
            
            </li>
          </ul> */}
          <p className="body-text-1 mb_16">
            
          </p>
        </div>
        <div className="bot d-flex justify-content-between gap-10 flex-wrap">
          <ul className="list-tags has-bg">
            <li>Tag:</li>
            <li>
              <a href="#" className="link">
                Fashion
              </a>
            </li>
            <li>
              <a href="#" className="link">
                Trending
              </a>
            </li>
          </ul>
          <div className="d-flex align-items-center justify-content-between gap-16">
            <p>Share this post:</p>
            <ul className="tf-social-icon style-1">
              <li>
                <a href="#" className="social-facebook">
                  <i className="icon icon-fb" />
                </a>
              </li>
              <li>
                <a href="#" className="social-twiter">
                  <i className="icon icon-x" />
                </a>
              </li>
              <li>
                <a href="#" className="social-pinterest">
                  <i className="icon icon-pinterest" />
                </a>
              </li>
              <li>
                <a href="#" className="social-instagram">
                  <i className="icon icon-instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className="related-post">
          <div className="pre w-50">
            <div className="text-btn-uppercase">
              <a href="#">Previous</a>
            </div>
            <h6 className="fw-5">
              <a className="link" href="#">
                How to choose the right customer
              </a>
            </h6>
          </div>
          <div className="next w-50">
            <div className="text-btn-uppercase text-end">
              <a href="#">Next</a>
            </div>
            <h6 className="fw-5 text-end">
              <a className="link" href="#">
                Starting your traveling blog with Vasco
              </a>
            </h6>
          </div>
        </div> */}
        <Comments />
        <CommentForm />
      </div>
    </div>
  );
}
