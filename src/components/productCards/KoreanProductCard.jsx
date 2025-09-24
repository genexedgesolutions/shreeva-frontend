import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import CountdownTimer from "../common/Countdown";
import { useContextElement } from "@/context/Context";
export default function KoreanProductCard({ product, gridClass = "" }) {
  const [currentImage, setCurrentImage] = useState(product.imgSrc);

  const {
  } = useContextElement();

  useEffect(() => {
    setCurrentImage(product.imgSrc);
  }, [product]);
  return (
    // <div
    //   className={`card-product wow fadeInUp ${gridClass} ${
    //     product.isOnSale ? "on-sale" : ""
    //   } ${product.sizes ? "card-product-size" : ""}`}
    // >
    <div
      className={`card-product wow fadeInUp ${gridClass} ${
        product.isOnSale ? "on-sale" : ""
      } `}
    >
      <div className="card-product-wrapper ">
        <Link to={`/products/${product.slug}`} className="product-img korean-section-shadow ">
        {/* <Link to={`/products/${product.slug}`} className="product-img korean-section-shadow "> */}
          

          <img
            className="lazyload rounded image-korean"
            src={product.imgSrc}
            alt={product.title}
          />
       <h3 className="text-title mt-5 pt-10">{product.title}</h3>

        </Link>
       
      </div>
    </div>
  );
}
