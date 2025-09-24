import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import parseJwt from "@/utlis/jwt";
import { getUserData } from "@/api/auth";
import { addToCart, getCartItems, removeFromCart } from "@/api/cart";
import EstimateShipping from "./EstimateShipping";
import Coupon from "./Coupon";
import OrderNote from "./OrderNote";
import useProducts from "@/hooks/useProducts";
export default function CartModal() {
  const {
    cartProducts,
    setCartProducts,
    totalPrice,
    isAddedToCartProducts,
    minThresholdFreeDelivery,
    discountDetails,
    setDiscountDetails,
  } = useContextElement();
  const {products ,loading} = useProducts();
  const [userId, setUserId] = useState(null);
  const [cartMerged, setCartMerged] = useState(false);
  const token = localStorage.getItem("authToken");

  // ✅ Fetch userId from token
  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        const decodedToken = parseJwt(token);
        if (decodedToken && decodedToken._id) {
          const user = await getUserData(token);
          setUserId(user.user._id);
        }
      }
    };
    fetchUserData();
  }, [token]);
  useEffect(() => {
    const mergeCarts = async () => {
      try {
        const backendCart = userId ? await getCartItems(userId) : [];
        const mergedCart = [...cartProducts];

        // ✅ If Backend cart is empty, push local cart to backend
        if (!backendCart.length && cartProducts.length) {
          for (const item of cartProducts) {
            await addToCart(userId, item._id, item.quantity, item.activeSize);
          }
        }
        // ✅ If Local cart is empty, pull from backend
        else if (backendCart.length && !cartProducts.length) {
          setCartProducts(backendCart);
        }
        // ✅ If both exist, merge both
        // else if (backendCart.length && cartProducts.length) {
        //   cartProducts.forEach((localItem) => {
        //     const existingItem = backendCart.find(
        //       (item) => item._id === localItem._id
        //     );
        //     if (existingItem) {
        //       existingItem.quantity += localItem.quantity;
        //     } else {
        //       mergedCart.push(localItem);
        //     }
        //   });

        //   for (const item of mergedCart) {
        //     await addToCart(userId, item._id, item.quantity, item.activeSize);
        //   }
        // }

        setCartMerged(true);
      } catch (error) {
        console.error("Cart Merge Error:", error);
      }
    };

    if (userId && !cartMerged) {
      mergeCarts();
    }
  }, [userId, cartMerged, cartProducts]);

  const removeItem = async (_id, activeSize) => {
    // ✅ Remove from Local Cart First
    setCartProducts((prev) =>
      prev.filter((item) => item._id !== _id || item.activeSize !== activeSize)
    );

    // ✅ If User is Logged In, Remove from Backend Cart too
    if (userId) {
      try {
        await removeFromCart(userId, _id, activeSize);
      } catch (error) {
        console.error("Remove Error:", error);
      }
    }
  };

  const [progress, setProgress] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);

  useEffect(() => {
    const calculatedProgress = Math.min(
      (totalPrice / minThresholdFreeDelivery) * 100,
      100
    );
    setProgress(calculatedProgress);

    const remaining = Math.max(minThresholdFreeDelivery - totalPrice, 0);
    setRemainingAmount(remaining);
  }, [totalPrice, minThresholdFreeDelivery]);

  const [currentOpenPopup, setCurrentOpenPopup] = useState("");

  return (
    <div className="modal fullRight fade modal-shopping-cart" id="shoppingCart">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="tf-minicart-recommendations">
            <h6 className="title">You May Also Like</h6>
            <div className="wrap-recommendations">
              <div className="list-cart">
                {products.map((product, index) => (
                  <div className="list-cart-item" key={index}>
                    <div className="image">
                      <img
                        className="lazyload"
                        data-src={product.images[0]}
                        alt={product.alt}
                        src={product.imgSrc}
                        width={600}
                        height={800}
                      />
                    </div>
                    <div className="content">
                      <div className="name">
                        <Link
                          className="link text-line-clamp-1"
                          href={`/products/${product.slug}`}
                        >
                          {product.name}
                        </Link>
                      </div>
                      <div className="cart-item-bot">
                        <div className="text-button price">
                          ₹{product.offerPrice.toFixed(2)}
                        </div>
                        {/* <a
                          className="link text-button"
                          onClick={() =>
                            addProductToCart(product._id, 1, false)
                          }
                        >
                          {isAddedToCartProducts(product._id)
                            ? "Already Added"
                            : "Add to cart"}
                        </a> */}
                        <a
                          className="link text-button"
                          href={`products/${product.slug}`}
                        >
                          Visit Now
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="d-flex flex-column flex-grow-1 h-100">
            <div className="header">
              <h5 className="title">Shopping Cart</h5>
              <span
                className="icon-close icon-close-popup"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="wrap">
              <div className="tf-mini-cart-threshold">
                <div className="tf-progress-bar">
                  <div
                    className="value"
                    style={{ width: `${progress}%` }}
                    data-progress={progress}
                  >
                    <i className="icon icon-shipping" />
                  </div>
                </div>
                <div className="text-caption-1">
                  {totalPrice >= minThresholdFreeDelivery ? (
                    <>🎉 Congratulations! You've unlocked free shipping!</>
                  ) : (
                    <>
                      Spend ₹{remainingAmount.toFixed(2)} more to unlock free
                      shipping.
                    </>
                  )}
                </div>
              </div>
              <div className="tf-mini-cart-wrap">
                <div className="tf-mini-cart-main">
                  <div className="tf-mini-cart-sroll">
                    {cartProducts.length ? (
                      <div className="tf-mini-cart-items">
                        {cartProducts.map((product, i) => (
                          <div
                            key={i}
                            className="tf-mini-cart-item file-delete"
                          >
                            <div className="tf-mini-cart-image">
                              <img
                                className="lazyload"
                                alt=""
                                src={product.images[0]}
                                width={600}
                                height={800}
                              />
                            </div>
                            <div className="tf-mini-cart-info flex-grow-1">
                              <div className="mb_12 d-flex align-items-center justify-content-between flex-wrap gap-12">
                                <div className="text-title">
                                  <Link
                                    to={`/products/${product.slug}`}
                                    className="link text-line-clamp-1"
                                  >
                                    {product.name}
                                  </Link>
                                </div>
                                <div
                                  className="text-button tf-btn-remove remove"
                                  onClick={() =>
                                    removeItem(product._id, product.activeSize)
                                  }
                                >
                                  Remove
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between flex-wrap gap-12">
                                {/* <div className="text-secondary-2">
                                  {product.sizes}
                                </div> */}
                                <div className="text-button">
                                  {product.quantity} X ₹
                                  {(Number(product?.offerPrice) || 0).toFixed(
                                    2
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4">
                        Your Cart is empty. Start adding favorite products to
                        cart!{" "}
                        <Link className="btn-line" href="/products">
                          Explore Products
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="tf-mini-cart-bottom">
                  {/* <div className="tf-mini-cart-tool">
                    <div
                      className="tf-mini-cart-tool-btn btn-add-note"
                      onClick={() => setCurrentOpenPopup("add-note")}
                    >
                      <svg
                        width={21}
                        height={20}
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_6133_36620)">
                          <path
                            d="M10 3.33325H4.16667C3.72464 3.33325 3.30072 3.50885 2.98816 3.82141C2.67559 4.13397 2.5 4.55789 2.5 4.99992V16.6666C2.5 17.1086 2.67559 17.5325 2.98816 17.8451C3.30072 18.1577 3.72464 18.3333 4.16667 18.3333H15.8333C16.2754 18.3333 16.6993 18.1577 17.0118 17.8451C17.3244 17.5325 17.5 17.1086 17.5 16.6666V10.8333"
                            stroke="#181818"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.25 2.0832C16.5815 1.75168 17.0312 1.56543 17.5 1.56543C17.9688 1.56543 18.4185 1.75168 18.75 2.0832C19.0815 2.41472 19.2678 2.86436 19.2678 3.3332C19.2678 3.80204 19.0815 4.25168 18.75 4.5832L10.8333 12.4999L7.5 13.3332L8.33333 9.99986L16.25 2.0832Z"
                            stroke="#181818"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_6133_36620">
                            <rect
                              width={20}
                              height={20}
                              fill="white"
                              transform="translate(0.833008)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <div className="text-caption-1">
                        {!OrderNote ? "Note" : "Edit"}
                      </div>
                    </div>
                    <div
                      className="tf-mini-cart-tool-btn btn-estimate-shipping"
                      onClick={() => setCurrentOpenPopup("estimate-shipping")}
                    >
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.333 2.5H0.833008V13.3333H13.333V2.5Z"
                          stroke="#181818"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.333 6.66675H16.6663L19.1663 9.16675V13.3334H13.333V6.66675Z"
                          stroke="#181818"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.58333 17.4999C5.73393 17.4999 6.66667 16.5672 6.66667 15.4166C6.66667 14.266 5.73393 13.3333 4.58333 13.3333C3.43274 13.3333 2.5 14.266 2.5 15.4166C2.5 16.5672 3.43274 17.4999 4.58333 17.4999Z"
                          stroke="#181818"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.4163 17.4999C16.5669 17.4999 17.4997 16.5672 17.4997 15.4166C17.4997 14.266 16.5669 13.3333 15.4163 13.3333C14.2657 13.3333 13.333 14.266 13.333 15.4166C13.333 16.5672 14.2657 17.4999 15.4163 17.4999Z"
                          stroke="#181818"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="text-caption-1">Shipping</div>
                    </div>
                    <div
                      className="tf-mini-cart-tool-btn btn-add-coupon"
                      onClick={() => setCurrentOpenPopup("add-coupon")}
                    >
                      <svg
                        width={21}
                        height={20}
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.3247 11.1751L11.3497 17.1501C11.1949 17.305 11.0111 17.428 10.8087 17.5118C10.6064 17.5957 10.3895 17.6389 10.1705 17.6389C9.95148 17.6389 9.7346 17.5957 9.53227 17.5118C9.32994 17.428 9.14613 17.305 8.99134 17.1501L1.83301 10.0001V1.66675H10.1663L17.3247 8.82508C17.6351 9.13735 17.8093 9.55977 17.8093 10.0001C17.8093 10.4404 17.6351 10.8628 17.3247 11.1751V11.1751Z"
                          stroke="#181818"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5.99902 5.83325H6.00902"
                          stroke="#181818"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="text-caption-1">Coupon</div>
                    </div>
                  </div> */}
                  <div className="tf-mini-cart-bottom-wrap">
                    <div className="tf-cart-totals-discounts">
                      <h5>Subtotal</h5>
                      <h5 className="tf-totals-total-value">
                        ₹{totalPrice.toFixed(2)}
                      </h5>
                    </div>
                    {/* <div className="tf-cart-totals-discounts">
                      <p>Total Discount</p>
                      <p className="tf-totals-total-value">
                        {discountDetails.length > 0
                          ? discountDetails
                              .map((item) =>
                                item.discountType === "percentage"
                                  ? `${item.discount} off`
                                  : `₹${item.discount} off`
                              )
                              .join(", ")
                          : "0 off"}
                      </p>
                    </div> */}

                      {/* <div className="tf-cart-checkbox">
                        <div className="tf-checkbox-wrapp">
                          <input
                            className=""
                            type="checkbox"
                            id="CartDrawer-Form_agree"
                            name="agree_checkbox"
                          />
                          <div>
                            <i className="icon-check" />
                          </div>
                        </div>
                        <label htmlFor="CartDrawer-Form_agree">
                          I agree with
                          <Link to={`/term-of-use`} title="Terms of Service">
                            Terms &amp; Conditions
                          </Link>
                        </label>
                      </div> */}
                    <div className="tf-mini-cart-view-checkout">
                      <Link
                        to={`/cart`}
                        className="tf-btn w-100 btn-fill radius-4"
                      >
                        <span className="text">View cart</span>
                      </Link>
                      <Link
                        to={`/checkout`}
                        className="tf-btn w-100 btn-fill radius-4"
                      >
                        <span className="text">Check Out</span>
                      </Link>
                    </div>
                    <div className="text-center">
                      <Link
                        className="link text-btn-uppercase"
                        to={`/products`}
                      >
                        Or Continue shopping
                      </Link>
                    </div>
                  </div>
                </div>
                <OrderNote
                  currentOpenPopup={currentOpenPopup}
                  setCurrentOpenPopup={setCurrentOpenPopup}
                />
                <EstimateShipping
                  currentOpenPopup={currentOpenPopup}
                  setCurrentOpenPopup={setCurrentOpenPopup}
                />
                <Coupon
                  currentOpenPopup={currentOpenPopup}
                  setCurrentOpenPopup={setCurrentOpenPopup}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
