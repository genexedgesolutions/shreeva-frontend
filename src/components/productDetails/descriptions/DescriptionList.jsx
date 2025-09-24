import React from "react";
import Description from "./Description";
import Reviews from "./Reviews";
import Shipping from "./Shipping";
import ReturnPolicies from "./ReturnPolicies";

export default function DescriptionList({ product }) {
  return (
    <section className="">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="product-description-list">
              <div className="product-description-list-item">
                <h6 className="product-description-list-title">Description</h6>
                <div className="product-description-list-content">
                  <div className="tab-description">
                    <Description product={product} />
                  </div>
                </div>
              </div>
              <div className="product-description-list-item">
                <h6 className="product-description-list-title">
                  Customer Reviews
                </h6>
                <div className="product-description-list-content">
                  <div className="tab-reviews write-cancel-review-wrap">
                    <Reviews product={product} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
