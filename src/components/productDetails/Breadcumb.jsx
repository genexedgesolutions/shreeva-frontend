import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Breadcumb({ product }) {
  const { pathname } = useLocation();
  return (
    <div className="tf-breadcrumb">
      <div className="container">
        <div className="tf-breadcrumb-wrap">
          <div className="tf-breadcrumb-list">
            <Link to={`/`} className="text text-caption-1">
              Homepage
            </Link>

            <i className="icon icon-arrRight" />
            <span className="text text-caption-1">{product?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
