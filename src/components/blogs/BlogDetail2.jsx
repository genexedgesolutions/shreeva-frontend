import React from "react";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import Sidebar2 from "./Sidebar2";

export default function BlogDetail2({ blog }) {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mb-lg-30">
            <div className="blog-detail-wrap page-single-2">
              <div className="inner">
                <div className="heading">
                  <ul className="list-tags has-bg">
                    <li>
                      <a href="#" className="link">
                        {blog.category}
                      </a>
                    </li>
                  </ul>
                  <h3 className="fw-5 text-primary">{blog.title}</h3>
                  <div className="meta">
                    <div className="meta-item gap-8">
                      <div className="icon">
                        <i className="icon-calendar" />
                      </div>
                      <p className="body-text-1">{blog.date}</p>
                    </div>
                    <div className="meta-item gap-8">
                      <div className="icon">
                        <i className="icon-user" />
                      </div>
                      <p className="body-text-1">
                        by{" "}
                        <a className="link" href="#">
                          {blog.author}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="image">
                  <img
                    className="lazyload"
                    data-src={blog.image[0]}
                    alt=""
                    src={blog.image[0]}
                    width={1275}
                    height={717}
                  />
                </div>
                <div className="content">
                  <p className="body-text-1 mb_12">{blog.description}</p>
                  <p className="body-text-1">{blog.description2}</p>
                </div>
                {/* <div className="group-image d-flex gap-20">
                  <div>
                    <img alt="" src={blog.imgSrc} width={623} height={468} />
                  </div>
                  <div>
                    <img alt="" src={blog.imgSrc} width={623} height={468} />
                  </div>
                </div> */}
                <div className="content">
                  <p className="fw-5 mb_16">{blog.description3}</p>
                </div>
                <div className="bot d-flex justify-content-between gap-10 flex-wrap">
                  <ul className="list-tags has-bg">
                    <li>Tag:</li>
                    <li className="tags">
                      {blog.tags && blog.tags.length > 0 ? (
                        blog.tags.map((tag, index) => (
                          <a href="#" key={index} className="link">
                            {tag}
                          </a>
                        ))
                      ) : (
                        <p>No tags available</p>
                      )}
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
                <Comments comments={blog.comments} />
                <CommentForm />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <Sidebar2 blog={blog} />
          </div>
        </div>
      </div>
    </section>
  );
}
