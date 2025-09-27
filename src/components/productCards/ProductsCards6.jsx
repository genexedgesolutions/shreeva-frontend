import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import CountdownTimer from "../common/Countdown"; // not used

import { useContextElement } from "@/context/Context";

export default function ProductsCards6({ product }) {
  // Normalize fields coming from backend
  const id = product?.id || product?._id;
  const title = product?.title || product?.name || "Product";
  const slug = product?.slug || id;
  const images = Array.isArray(product?.images) ? product.images : [];
  const hoverImage = images[1] || images[0];
  const thumb =
    product?.images?.[0] ||
    product?.thumbnail ||
    "/images/placeholder.jpg";

  console.log("Thumbnail picked:", thumb);

  const [currentImage, setCurrentImage] = useState(thumb);

  // price handling (INR + “Price on request” when 0/undefined)
  const price = Number(product?.price ?? 0);
  const oldPrice = Number(product?.oldPrice ?? 0);
  const showOld = oldPrice > price && price > 0;
  const isOnSale = showOld; // or product?.isOnSale

  // short description fallback
  const short =
    product?.shortDescription ||
    product?.metaDescription ||
    "";

  const {
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    setQuickViewItem,
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();

  useEffect(() => {
    setCurrentImage(thumb);
  }, [thumb]);

  return (
    <div
      className="card-product style-list"
      data-availability={product?.manageStock ? "In stock" : "Made to order"}
      data-brand={product?.brand || "Shreeva Jewels"}
    >
      <div className="card-product-wrapper">
        <Link to={`/product-detail/${slug}`} className="product-img">
          <img
            className="img-product"
            src={currentImage}
            alt={title}
            width={600}
            height={800}
            loading="lazy"
            onMouseEnter={() => setCurrentImage(hoverImage)}
            onMouseLeave={() => setCurrentImage(thumb)}
          />
          {/* Optional separate hover <img> layer if your CSS expects it */}
          <img
            className="img-hover"
            src={hoverImage}
            alt={title}
            width={600}
            height={800}
            loading="lazy"
          />
        </Link>

        {isOnSale && (
          <div className="on-sale-wrap">
            <span className="on-sale-item">
              {/* simple discount calc */}
              {Math.max(0, Math.round(((oldPrice - price) / oldPrice) * 100))}%
            </span>
          </div>
        )}
      </div>

      <div className="card-product-info">
        <Link to={`/product-detail/${slug}`} className="title link">
          {title}
        </Link>

        <span className="price current-price">
          {showOld && <span className="old-price">₹{oldPrice.toLocaleString("en-IN")}</span>}{" "}
          {price > 0 ? (
            <>₹{price.toLocaleString("en-IN")}</>
          ) : (
            <span className="text-secondary">Price on request</span>
          )}
        </span>

        {short && (
          <p className="description text-secondary text-line-clamp-2">
            {short}
          </p>
        )}

        <div className="variant-wrap-list">
          {/* If you later map color thumbnails, keep this block.
              For now we skip since API doesn’t provide it reliably. */}

          <div className="list-product-btn">
            <button
              type="button"
              onClick={() => addProductToCart(id)}
              className="btn-main-product"
            >
              {isAddedToCartProducts(id) ? "Already Added" : "Add To cart"}
            </button>

            <button
              type="button"
              onClick={() => addToWishlist(id)}
              className="box-icon wishlist btn-icon-action"
              aria-label="Add to wishlist"
            >
              <span className="icon icon-heart" />
              <span className="tooltip">
                {isAddedtoWishlist(id) ? "Already Wishlisted" : "Wishlist"}
              </span>
            </button>

            <button
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#compare"
              onClick={() => addToCompareItem(id)}
              className="box-icon compare btn-icon-action"
              aria-controls="compare"
              aria-label="Add to compare"
            >
              <span className="icon icon-gitDiff" />
              <span className="tooltip">
                {isAddedtoCompareItem(id) ? "Already compared" : "Compare"}
              </span>
            </button>

            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#quickView"
              onClick={() => setQuickViewItem(product)}
              className="box-icon quickview tf-btn-loading"
              aria-label="Quick view"
            >
              <span className="icon icon-eye" />
              <span className="tooltip">Quick View</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
