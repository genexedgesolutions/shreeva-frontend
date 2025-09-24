import { Link } from "react-router-dom";
import React from "react";
import { useBlogs } from "@/hooks/useBlogs";

export default function Sidebar2({ blog }) {
  const { blogPosts, loading } = useBlogs();
  return (
    <div className="sidebar maxw-360">
      <div className="sidebar-item sidebar-writer">
        <div className="writer-avatar">
          <div className="image">
            <img
              alt=""
              src="/images/avatar/user-3.jpg"
              width={91}
              height={113}
            />
          </div>
          <div>
            <div className="name">
              <h6>
                <a className="link" href="#">
                  {blog.author}
                </a>
              </h6>
              {/* <p className="text-caption-1"></p> */}
            </div>
            <a href="#" className="button-follow text-btn-uppercase link">
              Follow
            </a>
          </div>
        </div>
        <div className="writer-content">
          <p>
            Beaubless Skincare is a brand born from the fusion of ancient beauty
            traditions and modern innovation. Inspired by centuries-old skincare
            practices from Japan and Korea, where beauty rituals were deeply
            rooted in nature and passed down through generations, we bring these
            time-tested secrets to India—a country that values holistic beauty
            and self-care.
          </p>
          <ul className="tf-social-icon">
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
              <a href="#" className="social-instagram">
                <i className="icon icon-instagram" />
              </a>
            </li>
            <li>
              <a href="#" className="social-tiktok">
                <i className="icon icon-tiktok" />
              </a>
            </li>
            <li>
              <a href="#" className="social-amazon">
                <i className="icon icon-amazon" />
              </a>
            </li>
            <li>
              <a href="#" className="social-pinterest">
                <i className="icon icon-pinterest" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="sidebar-item sidebar-relatest-post">
        <h5 className="sidebar-heading">Relatest Post</h5>
        <div>
          {blogPosts.slice(3, 8).map((post, i) => (
            <div
              key={i}
              className={`relatest-post-item ${
                i != 0 ? "style-row" : ""
              } hover-image `}
            >
              <div className="image">
                <img
                  className="lazyload"
                  alt=""
                  src={post.image[0]}
                  width={540}
                  height={360}
                />
              </div>
              <div className="content">
                <div className="meta">
                  <div className="meta-item gap-8">
                    <div className="icon">
                      <i className="icon-calendar" />
                    </div>
                    <p className="text-caption-1">{post.date}</p>
                  </div>
                  <div className="meta-item gap-8">
                    <div className="icon">
                      <i className="icon-user" />
                    </div>
                    <p className="text-caption-1">
                      by{" "}
                      <a className="link" href="#">
                        {post.author}
                      </a>
                    </p>
                  </div>
                </div>
                <h6 className="title fw-5">
                  <Link className="link" to={`/blog-detail/${post.id}`}>
                    {post.description.split(" ").slice(0, 8).join(" ")}
                  </Link>
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
