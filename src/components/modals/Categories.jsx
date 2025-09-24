
import { getAllCategories } from "@/api/category";
import { useProductFilters } from "@/hooks/useProductFilters";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Categories() {
 const {categories} = useProductFilters()

  return (
    <div
      className="offcanvas offcanvas-start canvas-filter canvas-categories"
      id="shopCategories"
    >
      <div className="canvas-wrapper">
        <div className="canvas-header">
          <span className="icon-left icon-filter" />
          <h5>Categories</h5>
          <span
            className="icon-close icon-close-popup"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="canvas-body">
          {!categories ? (
            <p>Loading...</p>
          ) : (
            categories.map((category) => (
              <div key={category._id} className="wd-facet-categories">
                <div
                  role="dialog"
                  className="facet-title collapsed"
                  data-bs-target={`${category.slug}`}
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls={category.slug}
                >
                  <img
                    className="avt"
                    alt="avt"
                    src={category.image}
                    width={48}
                    height={48}
                  />
                  <Link to = {`/collections/${category.slug}`} className="title">{category.name}</Link>
                  <span className="icon icon-arrow-down" />
                </div>
                <div id={category.slug} className="collapse">
                  <ul className="facet-body">
                    <li>
                      <Link
                        to={`/collections/${category.slug}`}
                        className="item link"
                      >
                        {category.name} ({category.count} products)
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
