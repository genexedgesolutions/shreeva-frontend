import { useContextElement } from "@/context/Context";

import React, { useState } from "react";
import QuantitySelect from "./QuantitySelect";
import SizeSelect2 from "./SideSelect2";
import SizeSelect from "./SizeSelect";

export default function ProductStikyBottom({
  product,
  activeSize,
  setActiveSize,
  filterSizes,
}) {
  const {
    addProductToCart,
    isAddedToCartProducts,

    cartProducts,
    updateQuantity,
  } = useContextElement();
  const [quantity, setQuantity] = useState(1); // Initial quantity is 1

  const selectedSize =
    filterSizes.find((size) => size.variantId === activeSize)?.size || "";

  return (
    <div className="tf-sticky-btn-atc">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form
              className="form-sticky-atc"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="tf-sticky-atc-product">
                <div className="image">
                  <img
                    className="lazyload"
                    alt=""
                    src={product.images[0]}
                    width={600}
                    height={800}
                  />
                </div>
                <div className="content">
                  <div className="text-title">{product.name}</div>
                  {/* <div className="text-caption-1 text-secondary-2">
                    {selectedSize || ""}
                  </div> */}
                  <div className="text-title">
                    ₹{product.offerPrice.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="tf-sticky-atc-infos">
                <SizeSelect
                  activeSize={activeSize}
                  setActiveSize={setActiveSize}
                  filterSizes={filterSizes}
                />
                <div className="tf-sticky-atc-quantity d-flex gap-12 align-items-center">
                  <div className="tf-sticky-atc-infos-title text-title">
                    Quantity:
                  </div>
                  <QuantitySelect
                    styleClass="style-1"
                    quantity={
                      isAddedToCartProducts(product._id)
                        ? (
                            cartProducts.find(
                              (elm) => elm._id === product._id
                            ) || {}
                          ).quantity || 1
                        : quantity
                    }
                    setQuantity={(qty) => {
                      if (isAddedToCartProducts(product._id)) {
                        updateQuantity(product._id, qty); // Update cart quantity correctly
                      } else {
                        setQuantity(qty); // Update local quantity before adding
                      }
                    }}
                  />
                </div>
                <div className="tf-sticky-atc-btns">
                  <a
                    onClick={() => {
                      if (product.productType === "single"||product.productType === "combo") {
                        // Directly add to cart for single product
                        addProductToCart(
                          product._id,
                          quantity,
                          product,
                          activeSize
                        );
                      } else if (product.productType === "variant") {
                        if (activeSize) {
                          // Add to cart if size is selected
                          addProductToCart(
                            product._id,
                            quantity,
                            product,
                            activeSize
                          );
                        } else {
                          alert("Please select a size before adding to cart.");
                        }
                      }
                    }}
                    className="tf-btn w-100 btn-reset radius-4 btn-add-to-cart"
                  >
                    <span className="text text-btn-uppercase">
                      {" "}
                      {isAddedToCartProducts(product._id)
                        ? "Already Added"
                        : "Add to cart -"}
                    </span>
                    <span className="tf-qty-price total-price">
                      ₹
                      {isAddedToCartProducts(product._id)
                        ? (() => {
                            const cartItem = cartProducts.find(
                              (elm) => elm._id == product._id
                            );
                            return cartItem
                              ? (
                                  cartItem.offerPrice * cartItem.quantity
                                ).toFixed(2)
                              : "0.00";
                          })()
                        : (() => {
                            const activeVariant = filterSizes.find(
                              (item) => item.variantId === activeSize
                            );

                            return activeVariant
                              ? (
                                  activeVariant.offerPrice * (quantity || 1)
                                ).toFixed(2)
                              : (product.offerPrice * (quantity || 1)).toFixed(
                                  2
                                );
                          })()}
                    </span>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
