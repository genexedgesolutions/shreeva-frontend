import React, { useEffect, useState } from "react";

import SizeSelect from "../productDetails/SizeSelect";
import ColorSelect from "../productDetails/ColorSelect";
import Grid5 from "../productDetails/grids/Grid5";
import { useContextElement } from "@/context/Context";
import QuantitySelect from "../productDetails/QuantitySelect";
import { getAllCategories } from "@/api/category";
export default function QuickView() {
  const [activeColor, setActiveColor] = useState("gray");
  const [quantity, setQuantity] = useState(1); // Initial quantity is 1
  const [categories, setCategories] = useState([]);
const [categoriesLoading, setCategoriesLoading] = useState(true);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await getAllCategories(); // Adjust API path as needed
      setCategories(res.categories); // assuming API returns { categories: [...] }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  fetchCategories();
}, []);
  const {
    quickViewItem,
    addProductToCart,
    isAddedToCartProducts,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    cartProducts,
    updateQuantity,
    wishList,
  } = useContextElement();
  const openModalSizeChoice = () => {
    const bootstrap = require("bootstrap"); // dynamically import bootstrap
    var myModal = new bootstrap.Modal(document.getElementById("size-guide"), {
      keyboard: false,
    });

    myModal.show();
    document
      .getElementById("size-guide")
      .addEventListener("hidden.bs.modal", () => {
        myModal.hide();
      });
    const backdrops = document.querySelectorAll(".modal-backdrop");
    if (backdrops.length > 1) {
      // Apply z-index to the last backdrop
      const lastBackdrop = backdrops[backdrops.length - 1];
      lastBackdrop.style.zIndex = "1057";
    }
  };
  const [activeSize, setActiveSize] = useState(null);
  const filterSizes = quickViewItem?.variants || [];

  const matchedCategory = categories.find((category) => {
    return category._id?.toString() === quickViewItem?.category;
  });
  return (
    <>
      {quickViewItem ? (
        <>
          <div className="modal fullRight fade modal-quick-view" id="quickView">
            <div className="modal-dialog">
              <div className="modal-content">
                <Grid5
                  firstItem={quickViewItem?.imgSrc}
                  activeColor={activeColor}
                  setActiveColor={setActiveColor}
                  slideItems={quickViewItem?.images || []}
                />
                <div className="wrap mw-100p-hidden">
                  <div className="header">
                    <h5 className="title">Quick View</h5>
                    <span
                      className="icon-close icon-close-popup"
                      data-bs-dismiss="modal"
                    />
                  </div>
                  <div className="tf-product-info-list">
                    <div className="tf-product-info-heading">
                      <div className="tf-product-info-name">
                        <div className="text text-btn-uppercase">
                          <span>{matchedCategory?.name || ""}</span>
                        </div>
                        <h3 className="name text-primary">
                          {quickViewItem.name}
                        </h3>
                        <div className="sub">
                          <div className="tf-product-info-rate">
                            <div className="list-star">
                              {Array.from({ length: 5 }, (_, index) => (
                                <i
                                  key={index}
                                  className={`icon icon-star ${
                                    index <
                                    Math.round(
                                      quickViewItem.ratings?.average || 0
                                    )
                                      ? "filled"
                                      : ""
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="text text-caption-1 text-primary">
                              ({quickViewItem.ratings?.reviews?.length || 0}{" "}
                              reviews)
                            </div>
                          </div>

                          {/* <div className="tf-product-info-sold">
                      <i className="icon icon-lightning" />
                      <div className="text text-caption-1 text-primary">
                        {quickViewItem.sold || 0}&nbsp;sold in last&nbsp;
                        {quickViewItem.soldDuration || 32}
                        &nbsp;hours
                      </div>
                    </div> */}
                        </div>
                      </div>
                      <div className="tf-product-info-desc">
                        <div className="tf-product-info-price">
                          <h5 className="price-on-sale font-2">
                            ₹{quickViewItem.offerPrice.toFixed(2)}
                          </h5>
                          {quickViewItem.finalPrice ? (
                            <>
                              <div className="compare-at-price font-2">
                                {" "}
                                ₹{quickViewItem.finalPrice.toFixed(2)}
                              </div>
                              <div className="badges-on-sale text-btn-uppercase">
                                {quickViewItem?.discount.percentage}% Off
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                        <p className="text-black">
                          {quickViewItem.shortDescription}
                        </p>
                        {/* <div className="tf-product-info-liveview">
                    <i className="icon icon-eye" />
                    <p className="text-caption-1">
                      <span className="liveview-count">10</span> people are
                      viewing this right now
                    </p>
                  </div> */}
                      </div>
                    </div>
                    <div className="tf-product-info-choose-option">
                      {/* <ColorSelect
                  activeColor={activeColor}
                  setActiveColor={setActiveColor}
                /> */}

                      <SizeSelect
                        activeSize={activeSize}
                        setActiveSize={setActiveSize}
                        filterSizes={filterSizes}
                        productId={quickViewItem._id}
                      />
                      <div className="tf-product-info-by-btn">
                        <div className="tf-product-info-quantity">
                          <div className="title mb_12">Quantity:</div>
                          <QuantitySelect
                            quantity={
                              isAddedToCartProducts(quickViewItem._id)
                                ? (
                                    cartProducts.find(
                                      (elm) => elm._id === quickViewItem._id
                                    ) || {}
                                  ).quantity || 1
                                : quantity
                            }
                            setQuantity={(qty) => {
                              if (isAddedToCartProducts(quickViewItem._id)) {
                                updateQuantity(quickViewItem._id, qty); // Update cart quantity correctly
                              } else {
                                setQuantity(qty); // Update local quantity before adding
                              }
                            }}
                          />
                        </div>
                        <a
                          href="#compare"
                          onClick={() => addToCompareItem(quickViewItem._id)}
                          data-bs-toggle="offcanvas"
                          aria-controls="compare"
                          className=" mt-4 box-icon hover-tooltip compare btn-icon-action show-compare mt-4"
                        >
                          <span className="icon icon-gitDiff" />
                          <span className="tooltip text-caption-2">
                            {" "}
                            {isAddedtoCompareItem(quickViewItem._id)
                              ? "Already compared"
                              : "Compare"}
                          </span>
                        </a>
                        <a
                          onClick={() => addToWishlist(quickViewItem._id)}
                          className={`mt-4 box-icon hover-tooltip text-caption-2 wishlist btn-icon-action ${
                            wishList && wishList.includes(quickViewItem._id)
                              ? "bg-red text-white"
                              : ""
                          }`}
                        >
                          <span className="icon icon-heart" />
                          <span className="tooltip text-caption-2">
                            {wishList && wishList.includes(quickViewItem._id)
                              ? "Already Wishlisted"
                              : "Wishlist"}
                          </span>
                        </a>
                      </div>

                      <div className="tf-quickViewItem-info-by-btn mb_10">
                        <div className="tf-quickViewItem-info-by-btn mb_10">
                          <a
                            className="btn-style-3 text-btn-uppercase"
                            onClick={() => {
                              if (quickViewItem.productType === "single") {
                                // Directly add to cart for single product
                                addProductToCart(
                                  quickViewItem._id,
                                  quantity,
                                  quickViewItem,
                                  activeSize
                                );
                              } else if (
                                quickViewItem.productType === "variant"
                              ) {
                                if (activeSize) {
                                  // Add to cart if size is selected
                                  addProductToCart(
                                    quickViewItem._id,
                                    quantity,
                                    quickViewItem,
                                    activeSize
                                  );
                                } else {
                                  alert(
                                    "Please select a size before adding to cart."
                                  );
                                }
                              }
                            }}
                          >
                            <span>
                              {isAddedToCartProducts(quickViewItem._id)
                                ? "Already Added"
                                : "Add to cart "}
                            </span>
                            <span className="tf-qty-price total-price">
                              ₹
                              {isAddedToCartProducts(quickViewItem._id)
                                ? (() => {
                                    const cartItem = cartProducts.find(
                                      (elm) => elm._id == quickViewItem._id
                                    );
                                    return cartItem
                                      ? (
                                          cartItem.offerPrice *
                                          cartItem.quantity
                                        ).toFixed(2)
                                      : "0.00";
                                  })()
                                : (() => {
                                    const activeVariant = filterSizes.find(
                                      (item) => item.variantId === activeSize
                                    );

                                    return activeVariant
                                      ? (
                                          activeVariant.offerPrice *
                                          (quantity || 1)
                                        ).toFixed(2)
                                      : (
                                          quickViewItem.offerPrice *
                                          (quantity || 1)
                                        ).toFixed(2);
                                  })()}
                            </span>
                          </a>
                        </div>
                        <a href="/checkout" className="btn-style-3 text-btn-uppercase">
                          Buy it now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}
