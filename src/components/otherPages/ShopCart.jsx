// import React, { useEffect, useState } from "react";

// import { Link } from "react-router-dom";
// import { useContextElement } from "@/context/Context";
// import { removeFromCart, updateCartItem } from "@/api/cart";
// import { getUserData } from "@/api/auth";
// import parseJwt from "@/utlis/jwt";
// import { useCouponsAndShipping } from "@/hooks/useCouponsAndShipping";

// export default function ShopCart() {
//     const { coupons, shippingInfo } = useCouponsAndShipping();
//   const [activeDiscountIndex, setActiveDiscountIndex] = useState(1);
//   const [selectedOption, setSelectedOption] = useState(null);

  
//   const {
//     cartProducts,
//     setCartProducts,
//     totalPrice,
//     isAddedToCartProducts,
//     minThresholdFreeDelivery,
//     discountDetails,
//     setDiscountDetails,
//     applyCoupon,
//     activeCoupon,
//     setActiveCoupon,
//     selectedShippingOption,
//     setSelectedShippingOption,
//     finalOrderTotal,
//     setFinalOrderTotal,
//   } = useContextElement();
//   const [userId, setUserId] = useState(null);
//   const token = localStorage.getItem("authToken");
//   // -------------Select Shipping Option-------------------
//   useEffect(() => {
//     if (shippingInfo?.length > 0 && !selectedOption) {
//       const defaultOption = shippingInfo[0];
//       setSelectedOption(defaultOption);
//       setSelectedShippingOption(defaultOption);
 
//     }
//   }, [shippingInfo, selectedOption, discountDetails, totalPrice]);
//   // -------------Select Shipping Option End-------------------  
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (token) {
//         const decodedToken = parseJwt(token);
//         if (decodedToken && decodedToken._id) {
//           const user = await getUserData(token);
//           setUserId(user.user._id);
//         }
//       }
//     };

//     fetchUserData();
//   }, [token]);

//   const setQuantity = (id, quantity) => {
//     if (quantity >= 1) {
//       const item = cartProducts.filter((product) => product.id == id)[0];
//       const items = [...cartProducts];
//       const itemIndex = items.indexOf(item);
//       item.quantity = quantity;
//       items[itemIndex] = item;
//       console.log(item);
//       setCartProducts(items);
//       // If user is logged in, update in the backend as well
//       if (userId) {
//         updateQuantityInBackend(item._id, quantity, item.activeSize);
//       }
//     }
//   };
//   const updateQuantityInBackend = async (id, quantity, activeSize) => {
//     try {
//       console.log(await updateCartItem(userId, id, quantity, activeSize));
//     } catch (error) {
//       console.error("Error updating cart in backend:", error);
//     }
//   };

//   const [progress, setProgress] = useState(0);
//   const [remainingAmount, setRemainingAmount] = useState(0);
//   useEffect(() => {
//     const calculatedProgress = Math.min(
//       (totalPrice / minThresholdFreeDelivery) * 100,
//       100
//     );
//     setProgress(calculatedProgress);

//     const remaining = Math.max(minThresholdFreeDelivery - totalPrice, 0);
//     setRemainingAmount(remaining);
//   }, [totalPrice, minThresholdFreeDelivery]);

//   const removeItem = async (_id, activeSize) => {
//     // ✅ Remove from Local Cart First
//     setCartProducts((prev) =>
//       prev.filter((item) => item._id !== _id || item.activeSize !== activeSize)
//     );

//     // ✅ If User is Logged In, Remove from Backend Cart too
//     if (userId) {
//       try {
//         await removeFromCart(userId, _id, activeSize);
//       } catch (error) {
//         console.error("Remove Error:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     document.querySelector(".progress-cart .value").style.width = "0%";
//   }, []);

//   // Timer
//   const [timeLeft, setTimeLeft] = useState(600); // 600 seconds = 10 minutes

//   useEffect(() => {
//     const storedTime = localStorage.getItem("countdownEndTime");
//     const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

//     if (storedTime && currentTime < storedTime) {
//       setTimeLeft(storedTime - currentTime);
//     } else {
//       const newEndTime = currentTime + 600; // 10 minutes from now
//       localStorage.setItem("countdownEndTime", newEndTime);
//       setTimeLeft(600);
//     }

//     const interval = setInterval(() => {
//       const updatedTime =
//         localStorage.getItem("countdownEndTime") -
//         Math.floor(Date.now() / 1000);
//       if (updatedTime <= 0) {
//         clearInterval(interval);
//         localStorage.removeItem("countdownEndTime");
//         setTimeLeft(0);
//       } else {
//         setTimeLeft(updatedTime);
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
//   };
//   const [couponCode, setCouponCode] = useState("");

//   return (
//     <>
//       <section className="flat-spacing">
//         <div className="container">
//           <div className="row">
//             <div className="col-xl-8">
//               <div className="tf-cart-sold">
//                 {cartProducts.length > 0 && (
//                   <div className="notification-sold bg-surface">
//                     <div className="count-text">
//                       Your cart will expire in in&nbsp;
//                       <span className="js-countdown time-count">
//                         {formatTime(timeLeft)}
//                       </span>
//                       &nbsp;minutes! Please checkout now before your items sell
//                       out!
//                     </div>
//                   </div>
//                 )}
//                 <div className="notification-progress">
//                   <div className="text">
//                     {totalPrice >= minThresholdFreeDelivery ? (
//                       <>🎉 Congratulations! You've unlocked free shipping!</>
//                     ) : (
//                       <>
//                         Spend ₹{remainingAmount.toFixed(2)} more to unlock free
//                         shipping.
//                       </>
//                     )}
//                   </div>
//                   <div className="progress-cart">
//                     <div
//                       className="value"
//                       style={{ width: `${progress}%` }}
//                       data-progress={progress}
//                     >
//                       <span className="round" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {cartProducts.length ? (
//                 <form onSubmit={(e) => e.preventDefault()}>
//                   <table className="tf-table-page-cart">
//                     <thead>
//                       <tr>
//                         <th>Products</th>
//                         <th>Price</th>
//                         <th>Quantity</th>
//                         <th>Total Price</th>
//                         <th />
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {cartProducts.map((product, i) => (
//                         <tr key={i} className="tf-cart-item file-delete">
//                           <td className="tf-cart-item_product">
//                             <Link
//                               to={`/products/${product.slug}`}
//                               className="img-box"
//                             >
//                               <img
//                                 alt="product"
//                                 src={product.images[0]}
//                                 width={600}
//                                 height={800}
//                               />
//                             </Link>
//                             <div className="cart-info">
//                               <Link
//                                 to={`/products/${product.slug}`}
//                                 className="cart-title link"
//                               >
//                                 {product.name}
//                               </Link>
//                               {/* <div className="variant-box">
//                                 {product.sizes}
//                                 <div className="tf-select">
//                                   {product?.productType === "variant" &&
//                                     product?.variants?.sizes?.length > 0 && (
//                                       <select>
//                                         {product.variants.sizes.map(
//                                           (size, index) => (
//                                             <option key={index}>{size}</option>
//                                           )
//                                         )}
//                                       </select>
//                                     )}
//                                 </div>
//                                 <div className="tf-select">
//                                   <select>
//                                     <option>XL</option>
//                                     <option>XS</option>
//                                     <option>S</option>
//                                     <option>M</option>
//                                     <option>L</option>
//                                     <option>XL</option>
//                                     <option>2XL</option>
//                                   </select>
//                                 </div>
//                               </div> */}
//                             </div>
//                           </td>
//                           <td
//                             data-cart-title="Price"
//                             className="tf-cart-item_price text-center"
//                           >
//                             <div className="cart-price text-button price-on-sale">
//                               ₹{product.offerPrice.toFixed(2)}
//                             </div>
//                           </td>
//                           <td
//                             data-cart-title="Quantity"
//                             className="tf-cart-item_quantity"
//                           >
//                             <div className="wg-quantity mx-md-auto">
//                               <span
//                                 className="btn-quantity btn-decrease"
//                                 onClick={() =>
//                                   setQuantity(product.id, product.quantity - 1)
//                                 }
//                               >
//                                 -
//                               </span>
//                               <input
//                                 type="text"
//                                 className="quantity-product"
//                                 name="number"
//                                 value={product.quantity}
//                                 readOnly
//                               />
//                               <span
//                                 className="btn-quantity btn-increase"
//                                 onClick={() =>
//                                   setQuantity(product.id, product.quantity + 1)
//                                 }
//                               >
//                                 +
//                               </span>
//                             </div>
//                           </td>
//                           <td
//                             data-cart-title="Total"
//                             className="tf-cart-item_total text-center"
//                           >
//                             <div className="cart-total text-button total-price">
//                               ₹
//                               {(product.offerPrice * product.quantity).toFixed(
//                                 2
//                               )}
//                             </div>
//                           </td>
//                           <td
//                             data-cart-title="Remove"
//                             className="remove-cart"
//                             onClick={() =>
//                               removeItem(product._id, product.activeSize)
//                             }
//                           >
//                             <span className="remove icon icon-close" />
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                   <div className="ip-discount-code">
//                     <input
//                       type="text"
//                       placeholder="Add voucher discount"
//                       value={activeCoupon.code || couponCode}
//                       onChange={(e) => setCouponCode(e.target.value)}
//                     />
//                     <button
//                       className="tf-btn"
//                       onClick={() => applyCoupon(activeCoupon)}
//                     >
//                       <span className="text">
//                         {discountDetails ? "Apply" : "Apply Code"}
//                       </span>
//                     </button>
//                   </div>
//                   <div className="group-discount">
//                     {coupons.map((item) => (
//                       <div
//                         key={item.id}
//                         className={`box-discount ${
//                           activeDiscountIndex === item.id ? "active" : ""
//                         }`}
//                         onClick={() => setActiveDiscountIndex(item.id)}
//                       >
//                         <div className="discount-top">
//                           <div className="discount-off">
//                             <div className="text-caption-1">{item.title}</div>
//                             <span className="sale-off text-btn-uppercase">
//                               {item.discount}
//                               {item.type === "percentage" ? "%" : "₹"}
//                             </span>
//                           </div>
//                         </div>
//                         <div className="discount-bot">
//                           <span className="text-btn-uppercase">
//                             {item.code}
//                           </span>
//                           <button
//                             className="tf-btn"
//                             onClick={() => setActiveCoupon(item)}
//                           >
//                             <span className="text">Apply Code</span>
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </form>
//               ) : (
//                 <div>
//                   Your wishlist is empty. Start adding your favorite products to
//                   save them for later!{" "}
//                   <Link className="btn-line" href="/products">
//                     Explore Products
//                   </Link>
//                 </div>
//               )}
//             </div>
//             <div className="col-xl-4">
//               <div className="fl-sidebar-cart">
//                 <div className="box-order bg-surface">
//                   <h5 className="title">Order Summary</h5>
//                   <div className="subtotal text-button d-flex justify-content-between align-items-center">
//                     <span>Subtotal</span>
//                     <span className="total">₹{totalPrice.toFixed(2)}</span>
//                   </div>
//                   <div className="discount text-button d-flex justify-content-between align-items-center">
//                     <span>Discounts</span>
//                     <p className="tf-totals-total-value">
//                       {discountDetails.length > 0
//                         ? discountDetails
//                             .map((item) =>
//                               item.discountType === "percentage"
//                                 ? `${item.discount} off`
//                                 : `₹${item.discount} off`
//                             )
//                             .join(", ")
//                         : "₹ 0 off"}
//                     </p>
//                   </div>
//                   <div className="ship">
//                     <span className="text-button">Shipping</span>
//                     <div className="flex-grow-1">
//                       {shippingInfo.map((option) => (
//                         <fieldset key={option.id} className="ship-item">
//                           <input
//                             type="radio"
//                             name="ship-check"
//                             className="tf-check-rounded"
//                             id={option.id}
//                             checked={selectedOption === option}
//                             onChange={() => {
//                               setSelectedOption(option);
//                               setSelectedShippingOption(option);
//                               // Start from the already discounted price, then add the new shipping charge
//                               setFinalOrderTotal(
//                                 Math.max(
//                                   totalPrice -
//                                     (discountDetails[0]?.value || 0) +
//                                     option.charges,
//                                   0
//                                 )
//                               );
//                             }}
//                           />
//                           <label htmlFor={option.id}>
//                             <span className="text-black">{option.name}</span>
//                             <span className="price text-primary">
//                               ₹{option.charges.toFixed(2)}
//                             </span>
//                           </label>
//                         </fieldset>
//                       ))}
//                     </div>
//                   </div>
//                   <h5 className="total-order d-flex justify-content-between align-items-center">
//                     <span>Total</span>
//                     <span className="total">
//                       ₹{finalOrderTotal ? finalOrderTotal.toFixed(2) : 0}
//                     </span>
//                   </h5>
//                   <div className="box-progress-checkout">
//                     {/* <fieldset className="check-agree">
//                       <input
//                         type="checkbox"
//                         id="check-agree"
//                         className="tf-check-rounded"
//                       />
//                       <label htmlFor="check-agree">
//                         I agree with the
//                         <Link to={`/term-of-use`}>terms and conditions</Link>
//                       </label>
//                     </fieldset> */}
//                     <Link to={`/checkout`} className="tf-btn btn-reset">
//                       Process To Checkout
//                     </Link>
//                     <p className="text-button text-center">
//                       Or <a href="/products">Continue Shopping</a>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }



import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import { removeFromCart, updateCartItem } from "@/api/cart";
import { getUserData } from "@/api/auth";
import parseJwt from "@/utlis/jwt";
import { useCouponsAndShipping } from "@/hooks/useCouponsAndShipping";

export default function ShopCart() {
    const { coupons, shippingInfo } = useCouponsAndShipping();
  const [activeDiscountIndex, setActiveDiscountIndex] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);

  
  const {
    cartProducts,
    setCartProducts,
    totalPrice,
    isAddedToCartProducts,
    minThresholdFreeDelivery,
    discountDetails,
    setDiscountDetails,
    applyCoupon,
    activeCoupon,
    setActiveCoupon,
    selectedShippingOption,
    setSelectedShippingOption,
    finalOrderTotal,
    setFinalOrderTotal,
  } = useContextElement();
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("authToken");
  // -------------Select Shipping Option-------------------
  useEffect(() => {
    if (shippingInfo?.length > 0 && !selectedOption) {
      const defaultOption = shippingInfo[0];
      setSelectedOption(defaultOption);
      setSelectedShippingOption(defaultOption);
 
    }
  }, [shippingInfo, selectedOption, discountDetails, totalPrice]);
  // -------------Select Shipping Option End-------------------  
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

  const setQuantity = (id, quantity) => {
    if (quantity >= 1) {
      const item = cartProducts.filter((product) => product.id == id)[0];
      const items = [...cartProducts];
      const itemIndex = items.indexOf(item);
      item.quantity = quantity;
      items[itemIndex] = item;
      console.log(item);
      setCartProducts(items);
      // If user is logged in, update in the backend as well
      if (userId) {
        updateQuantityInBackend(item._id, quantity, item.activeSize);
      }
    }
  };
  const updateQuantityInBackend = async (id, quantity, activeSize) => {
    try {
      console.log(await updateCartItem(userId, id, quantity, activeSize));
    } catch (error) {
      console.error("Error updating cart in backend:", error);
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

  useEffect(() => {
    document.querySelector(".progress-cart .value").style.width = "0%";
  }, []);

  // Timer
  const [timeLeft, setTimeLeft] = useState(600); // 600 seconds = 10 minutes

  useEffect(() => {
    const storedTime = localStorage.getItem("countdownEndTime");
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    if (storedTime && currentTime < storedTime) {
      setTimeLeft(storedTime - currentTime);
    } else {
      const newEndTime = currentTime + 600; // 10 minutes from now
      localStorage.setItem("countdownEndTime", newEndTime);
      setTimeLeft(600);
    }

    const interval = setInterval(() => {
      const updatedTime =
        localStorage.getItem("countdownEndTime") -
        Math.floor(Date.now() / 1000);
      if (updatedTime <= 0) {
        clearInterval(interval);
        localStorage.removeItem("countdownEndTime");
        setTimeLeft(0);
      } else {
        setTimeLeft(updatedTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };
  const [couponCode, setCouponCode] = useState("");

  return (
    <>
      <section className="flat-spacing">
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              <div className="tf-cart-sold">
                {/* {cartProducts.length > 0 && (
                  <div className="notification-sold bg-surface">
                    <div className="count-text">
                      Your cart will expire in in&nbsp;
                      <span className="js-countdown time-count">
                        {formatTime(timeLeft)}
                      </span>
                      &nbsp;minutes! Please checkout now before your items sell
                      out!
                    </div>
                  </div>
                )} */}
                <div className="notification-progress">
                  <div className="text">
                    {totalPrice >= minThresholdFreeDelivery ? (
                      <>🎉 Congratulations! You've unlocked free shipping!</>
                    ) : (
                      <>
                        Spend ₹{remainingAmount.toFixed(2)} more to unlock free
                        shipping.
                      </>
                    )}
                  </div>
                  <div className="progress-cart">
                    <div
                      className="value"
                      style={{ width: `${progress}%` }}
                      data-progress={progress}
                    >
                      <span className="round" />
                    </div>
                  </div>
                </div>
              </div>
              {cartProducts.length ? (
                <form onSubmit={(e) => e.preventDefault()}>
                  <table className="tf-table-page-cart">
                    <thead>
                      <tr>
                        <th>Products</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {cartProducts.map((product, i) => (
                        <tr key={i} className="tf-cart-item file-delete">
                          <td className="tf-cart-item_product">
                            <Link
                              to={`/products/${product.slug}`}
                              className="img-box"
                            >
                              <img
                                alt="product"
                                src={product.images[0]}
                                width={600}
                                height={800}
                              />
                            </Link>
                            <div className="cart-info">
                              <Link
                                to={`/products/${product.slug}`}
                                className="cart-title link"
                              >
                                {product.name}
                              </Link>
                              {/* <div className="variant-box">
                                {product.sizes}
                                <div className="tf-select">
                                  {product?.productType === "variant" &&
                                    product?.variants?.sizes?.length > 0 && (
                                      <select>
                                        {product.variants.sizes.map(
                                          (size, index) => (
                                            <option key={index}>{size}</option>
                                          )
                                        )}
                                      </select>
                                    )}
                                </div>
                                <div className="tf-select">
                                  <select>
                                    <option>XL</option>
                                    <option>XS</option>
                                    <option>S</option>
                                    <option>M</option>
                                    <option>L</option>
                                    <option>XL</option>
                                    <option>2XL</option>
                                  </select>
                                </div>
                              </div> */}
                            </div>
                          </td>
                          <td
                            data-cart-title="Price"
                            className="tf-cart-item_price text-center"
                          >
                            <div className="cart-price text-button price-on-sale">
                              ₹{product.offerPrice.toFixed(2)}
                            </div>
                          </td>
                          <td
                            data-cart-title="Quantity"
                            className="tf-cart-item_quantity"
                          >
                            <div className="wg-quantity mx-md-auto">
                              <span
                                className="btn-quantity btn-decrease"
                                onClick={() =>
                                  setQuantity(product.id, product.quantity - 1)
                                }
                              >
                                -
                              </span>
                              <input
                                type="text"
                                className="quantity-product"
                                name="number"
                                value={product.quantity}
                                readOnly
                              />
                              <span
                                className="btn-quantity btn-increase"
                                onClick={() =>
                                  setQuantity(product.id, product.quantity + 1)
                                }
                              >
                                +
                              </span>
                            </div>
                          </td>
                          <td
                            data-cart-title="Total"
                            className="tf-cart-item_total text-center"
                          >
                            <div className="cart-total text-button total-price">
                              ₹
                              {(product.offerPrice * product.quantity).toFixed(
                                2
                              )}
                            </div>
                          </td>
                          <td
                            data-cart-title="Remove"
                            className="remove-cart"
                            onClick={() =>
                              removeItem(product._id, product.activeSize)
                            }
                          >
                            <span className="remove icon icon-close" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* <div className="ip-discount-code">
                    <input
                      type="text"
                      placeholder="Add voucher discount"
                      value={activeCoupon.code || couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button
                      className="tf-btn"
                      onClick={() => applyCoupon(activeCoupon)}
                    >
                      <span className="text">
                        {discountDetails ? "Apply" : "Apply Code"}
                      </span>
                    </button>
                  </div> */}
                  {/* <div className="group-discount">
                    {coupons.map((item) => (
                      <div
                        key={item.id}
                        className={`box-discount ${
                          activeDiscountIndex === item.id ? "active" : ""
                        }`}
                        onClick={() => setActiveDiscountIndex(item.id)}
                      >
                        <div className="discount-top">
                          <div className="discount-off">
                            <div className="text-caption-1">{item.title}</div>
                            <span className="sale-off text-btn-uppercase">
                              {item.discount}
                              {item.type === "percentage" ? "%" : "₹"}
                            </span>
                          </div>
                        </div>
                        <div className="discount-bot">
                          <span className="text-btn-uppercase">
                            {item.code}
                          </span>
                          <button
                            className="tf-btn"
                            onClick={() => setActiveCoupon(item)}
                          >
                            <span className="text">Apply Code</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div> */}
                </form>
              ) : (
                <div>
                  Your wishlist is empty. Start adding your favorite products to
                  save them for later!{" "}
                  <Link className="btn-line" href="/products">
                    Explore Products
                  </Link>
                </div>
              )}
            </div>
            <div className="col-xl-4">
              <div className="fl-sidebar-cart">
                <div className="box-order bg-surface">
                  <h5 className="title">Order Summary</h5>
                  <div className="subtotal text-button d-flex justify-content-between align-items-center">
                    <span>Subtotal</span>
                    <span className="total">₹{totalPrice.toFixed(2)}</span>
                  </div>
                  {/* <div className="discount text-button d-flex justify-content-between align-items-center">
                    <span>Discounts</span>
                    <p className="tf-totals-total-value">
                      {discountDetails.length > 0
                        ? discountDetails
                            .map((item) =>
                              item.discountType === "percentage"
                                ? `${item.discount} off`
                                : `₹${item.discount} off`
                            )
                            .join(", ")
                        : "₹ 0 off"}
                    </p>
                  </div>
                  <div className="ship">
                    <span className="text-button">Shipping</span>
                    <div className="flex-grow-1">
                      {shippingInfo.map((option) => (
                        <fieldset key={option.id} className="ship-item">
                          <input
                            type="radio"
                            name="ship-check"
                            className="tf-check-rounded"
                            id={option.id}
                            checked={selectedOption === option}
                            onChange={() => {
                              setSelectedOption(option);
                              setSelectedShippingOption(option);
                              // Start from the already discounted price, then add the new shipping charge
                              setFinalOrderTotal(
                                Math.max(
                                  totalPrice -
                                    (discountDetails[0]?.value || 0) +
                                    option.charges,
                                  0
                                )
                              );
                            }}
                          />
                          <label htmlFor={option.id}>
                            <span className="text-black">{option.name}</span>
                            <span className="price text-primary">
                              ₹{option.charges.toFixed(2)}
                            </span>
                          </label>
                        </fieldset>
                      ))}
                    </div>
                  </div>
                  <h5 className="total-order d-flex justify-content-between align-items-center">
                    <span>Total</span>
                    <span className="total">
                      ₹{finalOrderTotal ? finalOrderTotal.toFixed(2) : 0}
                    </span>
                  </h5> */}
                  <div className="box-progress-checkout">
                    {/* <fieldset className="check-agree">
                      <input
                        type="checkbox"
                        id="check-agree"
                        className="tf-check-rounded"
                      />
                      <label htmlFor="check-agree">
                        I agree with the
                        <Link to={`/term-of-use`}>terms and conditions</Link>
                      </label>
                    </fieldset> */}
                    <Link to={`/checkout`} className="tf-btn btn-reset">
                      Process To Checkout
                    </Link>
                    <p className="text-button text-center">
                      Or <a href="/products">Continue Shopping</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
