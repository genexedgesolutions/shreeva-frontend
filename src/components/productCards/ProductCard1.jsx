import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import CountdownTimer from "../common/Countdown";
import { useContextElement } from "@/context/Context";
export default function ProductCard1({ product, gridClass = "" }) {
  const [currentImage, setCurrentImage] = useState(product.imgSrc);

  const {
    setQuickAddItem,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    setQuickViewItem,
    addProductToCart,
    isAddedToCartProducts,
    wishList,
  } = useContextElement();

  useEffect(() => {
    setCurrentImage(product.imgSrc);
  }, [product]);
  return (
    <div
      className={`card-product wow fadeInUp ${gridClass} ${
        product.isOnSale ? "on-sale" : ""
      } ${product.sizes ? "card-product-size" : ""}`}
    >
      <div className="card-product-wrapper">
        <Link to={`/products/${product.slug}`} className="product-img">
          <img
            className="lazyload img-product"
            src={currentImage}
            alt={product.name}
            width={600}
            height={800}
          />

          <img
            className="lazyload img-hover"
            src={product.imgHover}
            alt={product.title}
            width={600}
            height={800}
          />
        </Link>
        {product.isOnSale && (
          <div className="marquee-product bg-main">
            <div className="marquee-wrapper">
              <div className="initial-child-container">
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    {product.discount?.validUntil ? (
                      <>Hot Sale {product.discount.percentage}% OFF</>
                    ) : null}
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    {product.discount?.validUntil ? (
                      <>Hot Sale {product.discount.percentage}% OFF</>
                    ) : null}
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    {product.discount?.validUntil ? (
                      <>Hot Sale {product.discount.percentage}% OFF</>
                    ) : null}
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    {product.discount?.validUntil ? (
                      <>Hot Sale {product.discount.percentage}% OFF</>
                    ) : null}
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    {product.discount?.validUntil ? (
                      <>Hot Sale {product.discount.percentage}% OFF</>
                    ) : null}
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
              </div>
            </div>
          </div>
        )}
        {product.isOnSale && (
          <div className="on-sale-wrap">
            {product.discount && (
              <span className="on-sale-item">
                {product.discount.percentage}%
              </span>
            )}
          </div>
        )}
        {/* {product.sizes && (
          <div className="variant-wrap size-list">
            <ul className="variant-box">
              {product.sizes.map((size) => (
                <li key={size} className="size-item">
                  {size}
                </li>
              ))}
            </ul>
          </div>
        )} */}
        {/* Countdown */}
        {/* {product.discount.validUntil && (
          <div className="variant-wrap countdown-wrap">
            <div className="variant-box">
              <div
                className="js-countdown"
                data-timer={product.discount.validUntil}
                data-labels="D :,H :,M :,S"
              >
                <CountdownTimer />
              </div>
            </div>
          </div>
        )} */}
        {product.offerPrice ? (
          <div className="on-sale-wrap">
            <span className="on-sale-item">
              <p className="font-2 text-btn-uppercase fw-6 text-white">
                {product.discount?.validUntil ? (
                  <span>{product.discount.percentage}% OFF</span>
                ) : null}
              </p>
            </span>
          </div>
        ) : (
          ""
        )}
        <div className="list-product-btn">
          <a
            onClick={() => addToWishlist(product.id)}
            className={`box-icon hover-tooltip text-caption-2 wishlist btn-icon-action ${
              wishList && wishList.includes(product._id)
                ? "bg-red text-white"
                : ""
            }`}
          >
            <span className="icon icon-heart" />
            <span className="tooltip">
              {wishList && wishList.includes(product._id)
                ? "Already Wishlisted"
                : "Wishlist"}
            </span>
          </a>
          <a
            href="#compare"
            data-bs-toggle="offcanvas"
            aria-controls="compare"
            onClick={() => addToCompareItem(product.id)}
            className="box-icon compare btn-icon-action"
          >
            <span className="icon icon-gitDiff" />
            <span className="tooltip">
              {isAddedtoCompareItem(product.id)
                ? "Already compared"
                : "Compare"}
            </span>
          </a>
          <a
            href="#quickView"
            onClick={() => setQuickViewItem(product)}
            data-bs-toggle="modal"
            className="box-icon quickview tf-btn-loading"
          >
            <span className="icon icon-eye" />
            <span className="tooltip">Quick View</span>
          </a>
        </div>
        <div className="list-btn-main">
          {product.addToCart == "Quick Add" ? (
            <a
              className="btn-main-product"
              // href="#quickAdd"
              href="#quickView"
              onClick={() => setQuickAddItem(product.id)}
              data-bs-toggle="modal"
            >
              Quick Add
            </a>
          ) : (
            // <a
            //   className="btn-main-product"
            //   onClick={() => {
            //     if (product?.id) {
            //       addProductToCart(product.id, 1, product, true); // Pass all required parameters
            //     } else {
            //       console.error("Product ID is missing or undefined:", product);
            //     }
            //   }}
            // >
            //   {isAddedToCartProducts(product._id)
            //     ? "Already Added"
            //     : "ADD TO CART"}
            // </a>
            <a
              className="btn-main-product"
              href="#quickView"
              onClick={() => setQuickViewItem(product)}
              data-bs-toggle="modal"
            >
              Quick Add
            </a>
          )}
        </div>
      </div>
      <div className="card-product-info">
        <Link to={`/products/${product.slug}`} className="title link">
          {product?.title?.length > 100
            ? product.title.slice(0, 100) + "..."
            : product.title}
        </Link>
        {/* <p className="text-secondary-2">{product?.shortDescription?.length > 100
            ? product.shortDescription.slice(0, 50) + "..."
            : product.shortDescription}</p> */}
        {/* Product Price */}
        <span className="price">
          {product.finalPrice && (
            <span className="old-price">₹{product.finalPrice.toFixed(2)}</span>
          )}{" "}
          ₹{product.offerPrice?.toFixed(2)}
        </span>
        {/* Product Ratings */}
        {/* <div className="sub d-md-flex">
          <div className="tf-product-info-rate d-flex">
            <div className="list-star d-flex">
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={`icon icon-star ${
                    i < Math.round(product?.ratings?.average || 0)
                      ? "filled"
                      : ""
                  }`}
                />
              ))}
            </div>
            {product?.ratings?.totalReviews > 0 && (
              <div className="text text-caption-1 text-primary ms-2">
                ({product.ratings.totalReviews})
              </div>
            )}
          </div>
        </div> */}

        
        {product.colors && (
          <ul className="list-color-product">
            {product.colors.map((color, index) => (
              <li
                key={index}
                className={`list-color-item color-swatch ${
                  currentImage == color.imgSrc ? "active" : ""
                } ${color.bgColor == "bg-white" ? "line" : ""}`}
                onMouseOver={() => setCurrentImage(color.imgSrc)}
              >
                <span className={`swatch-value ${color.bgColor}`} />
                <img
                  className="lazyload"
                  src={color.imgSrc}
                  alt="color variant"
                  width={600}
                  height={800}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
