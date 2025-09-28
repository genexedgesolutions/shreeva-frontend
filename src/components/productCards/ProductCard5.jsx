import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import CountdownTimer from "../common/Countdown";

export default function ProductCard5({ product }) {
  if (!product) return null; // safety guard
console.log('product in product card 5', product);

  const {
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    setQuickViewItem,
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();

  const id = product?._id || product?.id;
  const title = product?.title || product?.name || "Untitled";
  const slug = product?.slug || id;
  const imgSrc = product?.images?.[0] || product?.thumbnail || "/images/placeholder.jpg";
  const imgHover = product?.images?.[1] || imgSrc;

  const [currentImage, setCurrentImage] = useState(imgSrc);

  useEffect(() => {
    setCurrentImage(imgSrc);
  }, [imgSrc]);

  const price = Number(product?.price || 0);
  const oldPrice = Number(product?.salePrice || product?.oldPrice || 0);
  const showOld = oldPrice > price && price > 0;
  const salePercentage =
    showOld && oldPrice > 0
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  return (
    <div
      className={`card-product style-swatch-img wow fadeInUp ${
        showOld ? "on-sale" : ""
      } ${product?.sizes ? "card-product-size" : ""}`}
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
          />
          <img
            className="img-hover"
            src={imgHover}
            alt={title}
            width={600}
            height={800}
            loading="lazy"
          />
        </Link>

        {salePercentage > 0 && (
          <div className="on-sale-wrap">
            <span className="on-sale-item">-{salePercentage}%</span>
          </div>
        )}

        {product?.countdown && (
          <div className="variant-wrap countdown-wrap">
            <div className="variant-box">
              <div
                className="js-countdown"
                data-timer={product.countdown}
                data-labels="D :,H :,M :,S"
              >
                <CountdownTimer />
              </div>
            </div>
          </div>
        )}

        <div className="list-product-btn">
          <button
            onClick={() => addToWishlist(id)}
            className="box-icon wishlist btn-icon-action"
          >
            <span className="icon icon-heart" />
            <span className="tooltip">
              {isAddedtoWishlist(id) ? "Already Wishlisted" : "Wishlist"}
            </span>
          </button>

          <button
            data-bs-toggle="offcanvas"
            data-bs-target="#compare"
            onClick={() => addToCompareItem(id)}
            className="box-icon compare btn-icon-action"
          >
            <span className="icon icon-gitDiff" />
            <span className="tooltip">
              {isAddedtoCompareItem(id) ? "Already Compared" : "Compare"}
            </span>
          </button>

          <button
            data-bs-toggle="modal"
            data-bs-target="#quickView"
            onClick={() => setQuickViewItem(product)}
            className="box-icon quickview tf-btn-loading"
          >
            <span className="icon icon-eye" />
            <span className="tooltip">Quick View</span>
          </button>
        </div>

        <div className="list-btn-main">
          <button
            onClick={() => addProductToCart(id)}
            className="btn-main-product"
          >
            {isAddedToCartProducts(id) ? "Already Added" : "ADD TO CART"}
          </button>
        </div>
      </div>

      <div className="card-product-info">
        <Link to={`/product-detail/${slug}`} className="title link">
          {title}
        </Link>
        <span className="price">
          {showOld && (
            <span className="old-price">₹{oldPrice.toFixed(2)}</span>
          )}
          ₹{price.toFixed(2)}
        </span>

        {product?.colors && (
          <ul className="list-color-product">
            {product.colors.map((color, index) => (
              <li
                key={index}
                className={`list-color-item color-swatch ${
                  currentImage === color.imgSrc ? "active line" : ""
                } ${color.bgColor === "bg-white" ? "line" : ""}`}
                onMouseOver={() => setCurrentImage(color.imgSrc)}
              >
                <img
                  src={color.imgSrc}
                  alt="color variant"
                  width={600}
                  height={800}
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
