// import { useContextElement } from "@/context/Context";

// import { Link, Navigate, useNavigate } from "react-router-dom";
// import { useCallback, useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import useAuthorization from "@/hooks/userAuthorization";
// import { getUserData, loginUser } from "@/api/auth";
// import parseJwt from "@/utlis/jwt";
// import { createOrder } from "@/api/order";
// import ToastNotification from "../modals/ToastNotification";
// import { useToast } from "@/context/ToastContext";
// import { useCouponsAndShipping } from "@/hooks/useCouponsAndShipping";

// export default function Checkout() {
//   const [paymentMethods] = useState(["PhonePe", "COD"]);
//   const [paymentMethod, setPaymentMethod] = useState("COD");
//   const [activeDiscountIndex, setActiveDiscountIndex] = useState(1);
//   const navigate = useNavigate();
//   const {
//     cartProducts,
//     finalOrderTotal,
//     discountDetails,
//     setDiscountDetails,
//     applyCoupon,
//     activeCoupon,
//     setActiveCoupon,
//     selectedShippingOption,
//     setSelectedShippingOption,
//     setFinalOrderTotal,
//     totalPrice,
//     setCartProducts,
//   } = useContextElement();
//   const isAuthorized = useAuthorization();
//   const { coupons, shippingInfo } = useCouponsAndShipping();
//   const [userData, setUserData] = useState(null);
//   const [loginData, setLoginData] = useState({ email: "", password: "" });
//   const [isLoading, setIsLoading] = useState(true);
//   const token = localStorage.getItem("authToken");
//   const [loginError, setLoginError] = useState("");
//   const [error, setError] = useState("");
//   const [passwordType, setPasswordType] = useState("password");

//   const { showToast } = useToast();
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (token) {
//         const decodedToken = parseJwt(token);
//         if (decodedToken && decodedToken._id) {
//           const user = await getUserData(token);
//           setUserData(user.user);
//         }
//       }
//       setIsLoading(false);
//     };

//     fetchUserData();
//   }, [token]);
//   const [selectedOption, setSelectedOption] = useState(null);

//   // -------------Select Shipping Option-------------------
//   useEffect(() => {
//     if (shippingInfo?.length > 0 && !selectedOption) {
//       const defaultOption = shippingInfo[0];
//       setSelectedOption(defaultOption);
//       setSelectedShippingOption(defaultOption);
      
//     }
//   }, [shippingInfo, selectedOption, discountDetails, totalPrice]);
//   // -------------Select Shipping Option End-------------------  
//   // ---------------Handle Login-------------------
//   const togglePassword = () => {
//     setPasswordType(passwordType === "password" ? "text" : "password");
//   };

//   // Handle Input Change
//   const handleLoginChange = (e) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//   };
//   // Handle Login Submission
//   const handleLogin = async (e) => {
//     e.preventDefault(); // Ensure form doesn't reload
//     setLoginError(""); // Clear previous errors

//     if (!loginData.email || !loginData.password) {
//       setLoginError("Please enter both email and password.");
//       return;
//     }
//     try {
//       const response = await loginUser(loginData); // Call API
//       if (response && response.token) {
//         localStorage.setItem("authToken", response.token); // Store token
//         window.location.reload();
//       } else {
//         throw new Error("Invalid response from server.");
//       }
//     } catch (error) {
//       setLoginError("Invalid email or password. Please try again.");
//     }
//   };

//   // ---------------Handle Login End -------------------

//   // Pre-fill form data once userData is available
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     country: "",
//     city: "",
//     state: "",
//     street: "",
//     pincode: "",
//     note: "",
//   });
//   useEffect(() => {
//     if (isAuthorized && userData) {
//       const defaultAddress =
//         userData.addresses?.length > 0 ? userData.addresses[0] : {}; // Select first address or empty object
//       setFormData((prevData) => ({
//         ...prevData, // Preserve any existing manual inputs
//         firstName: userData.firstName || prevData.firstName || "",
//         lastName: userData.lastName || prevData.lastName || "",
//         email: userData.email || prevData.email || "",
//         phone: userData.phone || prevData.phone || "",
//         country: defaultAddress?.country || prevData.country || "",
//         city: defaultAddress?.city || prevData.city || "",
//         state: defaultAddress?.state || prevData.state || "",
//         houseNo: defaultAddress?.houseNo || prevData.houseNo || "",
//         street: defaultAddress?.street || prevData.street || "",
//         pincode: defaultAddress?.pincode || prevData.pincode || "",
//         note: prevData.note || "", // Allow user to enter note manually
//       }));
//     }
//   }, [isAuthorized, userData]);

//   // Handle Input Changes
//   const handleInputChange = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handlePaymentChange = (event) => {
//     setPaymentMethod(event.target.value);
//   };

//   const handleCheckout = async (formData) => {
//     try {
//       let userId = isAuthorized
//         ? localStorage.getItem("userId")
//         : `guest_${Date.now()}`;
//       let email =
//         formData.email ||
//         (isAuthorized ? localStorage.getItem("userEmail") : null);

//       if (!email) {
//         alert("Please provide a valid email address to proceed.");
//         return;
//       }

//       // Create order data with email as the unique order key
//       const orderPayload = {
//         email, // Email as the key identifier
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         phone: formData.phone,
//         address: {
//           country: formData.country,
//           city: formData.city,
//           state: formData.state,
//           houseNo: formData.houseNo,
//           street: formData.street,
//           pincode: formData.pincode,
//         },
//         cartProducts,
//         finalOrderTotal: finalOrderTotal ? finalOrderTotal.toFixed(2) : "0",
//         note: formData.note || "",
//         paymentMethod,
//         activeCoupon,
//         discountDetails,
//         selectedShippingOption,
//       };

//       const orderData = await createOrder(orderPayload);
//       if (!orderData.success) {
//         showToast("error", "Order Failed");
//         navigate("/order-failed");
//         return;
//       }
  
//       // Handle CCAvenue flow
//       if (paymentMethod === "CCAvenue") {
//         const ccRes = await api.post("/order/test-order", {
//           amount: finalOrderTotal.toFixed(2),
//           name: `${formData.firstName} ${formData.lastName}`,
//           email,
//           phone: formData.phone,
//         });
  
//         const { encRequest, access_code, order_id } = ccRes.data;
  
//         if (encRequest && access_code) {
//           // Create & submit form dynamically to CCAvenue
//           const form = document.createElement("form");
//           form.method = "POST";
//           form.action = "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction";
  
//           const inputEnc = document.createElement("input");
//           inputEnc.type = "hidden";
//           inputEnc.name = "encRequest";
//           inputEnc.value = encRequest;
  
//           const inputAccess = document.createElement("input");
//           inputAccess.type = "hidden";
//           inputAccess.name = "access_code";
//           inputAccess.value = access_code;
  
//           form.appendChild(inputEnc);
//           form.appendChild(inputAccess);
//           document.body.appendChild(form);
//           form.submit();
  
//           return;
//         } else {
//           showToast("error", "CCAvenue credentials missing.");
//           return;
//         }
//       }
//       if (orderData.success) {
//         if (orderData.paymentUrl) {
//           window.location.href = orderData.paymentUrl;
//         } else {
//           setCartProducts([]);
//           showToast("success", "Order placed successfully! Pay on delivery.");

//           // Wait for 5 seconds (5000ms) before redirecting
//           setTimeout(() => {
//             navigate("/order-success");
//           }, 5000);
//           // Optional: Cleanup timeout if component unmounts (for reliability)
//           return () => clearTimeout(timeoutId);
//         }
//       } else {
//         showToast("error", "Order Failed");
//         navigate("/order-failed");
//       }
//     } catch (error) {
//       showToast(
//         "error",
//         error.response?.data?.message || "Something went wrong."
//       );
//     }
//   };

//   const [couponCode, setCouponCode] = useState("");

//   return (
//     <section>
//       <div className="container">
//         <div className="row">
//           <div className="col-xl-6">
//             <div className="flat-spacing tf-page-checkout">
//               {/* If User Not Logged in */}
//               {!isAuthorized ? (
//                 <div className="wrap">
//                   <div className="title-login">
//                     <p>Already have an account?</p>{" "}
//                     <Link to={`/login`} className="text-button">
//                       Login here
//                     </Link>
//                   </div>
//                   {loginError && (
//                     <p className="error-message text-danger">{loginError}</p>
//                   )}{" "}
//                   {/* Show error message */}
//                   <form className="login-box" onSubmit={handleLogin}>
//                     <div className="grid-2">
//                       <input
//                         type="email"
//                         placeholder="Username or email address*"
//                         name="email"
//                         autoComplete="email"
//                         value={loginData.email}
//                         onChange={handleLoginChange}
//                         required
//                       />
//                       <input
//                         className="input-password"
//                         type={passwordType}
//                         placeholder="Password*"
//                         name="password"
//                         value={loginData.password}
//                         onChange={handleLoginChange}
//                         required
//                         autoComplete="current-password"
//                       />
//                       <span
//                         className="toggle-password"
//                         onClick={togglePassword}
//                       >
//                         <i
//                           className={`icon-eye-${
//                             passwordType === "password" ? "hide" : "show"
//                           }-line`}
//                         />
//                       </span>
//                     </div>
//                     <button className="tf-btn" type="submit">
//                       <span className="text">Login</span>
//                     </button>
//                   </form>
//                 </div>
//               ) : (
//                 <div className="wrap">
//                   {userData && (
//                     <h3 className="heading mb-3">
//                       Hello, {userData.firstName}
//                     </h3>
//                   )}
//                   <h5 className="title">Please Select Your Address</h5>
//                   {userData && (
//                     <div className="tf-select">
//                       <select
//                         className="text-title"
//                         name="selectedAddress"
//                         onChange={(e) => {
//                           const selectedIndex = e.target.value;
//                           const selectedAddress =
//                             (userData && userData.addresses[selectedIndex]) ||
//                             {};
//                           setFormData((prevData) => ({
//                             ...prevData,
//                             country: selectedAddress.country || "",
//                             city: selectedAddress.city || "",
//                             state: selectedAddress.state || "",
//                             street: selectedAddress.street || "",
//                             pincode: selectedAddress.pincode || "",
//                           }));
//                         }}
//                       >
//                         {userData.addresses?.map((address, index) => (
//                           <option key={address._id} value={index}>
//                             {address.street}, {address.city}, {address.state}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   )}
//                 </div>
//               )}
//               {/* Bootstrap Toast for Error Message */}
//               Toast
//               <div className="wrap">
//                 <h5 className="title">Information</h5>
//                 <form className="info-box" onSubmit={(e) => e.preventDefault()}>
//                   <div className="grid-2">
//                     <input
//                       type="text"
//                       name="firstName"
//                       placeholder="First Name*"
//                       value={formData.firstName}
//                       onChange={handleInputChange}
//                     />
//                     <input
//                       type="text"
//                       name="lastName"
//                       placeholder="Last Name*"
//                       value={formData.lastName}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="grid-2">
//                     <input
//                       type="email"
//                       name="email"
//                       placeholder="Email Address*"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                     />
//                     <input
//                       type="text"
//                       name="phone"
//                       placeholder="Phone Number*"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="tf-select">
//                     <select
//                       className="text-title"
//                       name="country"
//                       value={formData.country}
//                       onChange={handleInputChange}
//                     >
//                       <option value="">Choose Country/Region</option>
//                       <option value="India">India</option>
//                       {/* <option value="USA">USA</option>
//                       <option value="UK">UK</option> */}
//                     </select>
//                   </div>
//                   <div className="grid-2">
//                     <input
//                       type="text"
//                       name="city"
//                       placeholder="Town/City*"
//                       value={formData.city}
//                       onChange={handleInputChange}
//                     />
//                     <input
//                       type="text"
//                       name="street"
//                       placeholder="Street, House No..."
//                       value={formData.street}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="grid-2">
//                     <div className="tf-select">
//                       <select
//   className="text-title"
//   name="state"
//   value={formData.state}
//   onChange={handleInputChange}
// >
//   <option value="">Choose State/Union Territory</option>
//   <option value="Andhra Pradesh">Andhra Pradesh</option>
//   <option value="Arunachal Pradesh">Arunachal Pradesh</option>
//   <option value="Assam">Assam</option>
//   <option value="Bihar">Bihar</option>
//   <option value="Chhattisgarh">Chhattisgarh</option>
//   <option value="Goa">Goa</option>
//   <option value="Gujarat">Gujarat</option>
//   <option value="Haryana">Haryana</option>
//   <option value="Himachal Pradesh">Himachal Pradesh</option>
//   <option value="Jharkhand">Jharkhand</option>
//   <option value="Karnataka">Karnataka</option>
//   <option value="Kerala">Kerala</option>
//   <option value="Madhya Pradesh">Madhya Pradesh</option>
//   <option value="Maharashtra">Maharashtra</option>
//   <option value="Manipur">Manipur</option>
//   <option value="Meghalaya">Meghalaya</option>
//   <option value="Mizoram">Mizoram</option>
//   <option value="Nagaland">Nagaland</option>
//   <option value="Odisha">Odisha</option>
//   <option value="Punjab">Punjab</option>
//   <option value="Rajasthan">Rajasthan</option>
//   <option value="Sikkim">Sikkim</option>
//   <option value="Tamil Nadu">Tamil Nadu</option>
//   <option value="Telangana">Telangana</option>
//   <option value="Tripura">Tripura</option>
//   <option value="Uttar Pradesh">Uttar Pradesh</option>
//   <option value="Uttarakhand">Uttarakhand</option>
//   <option value="West Bengal">West Bengal</option>
  
//   {/* Union Territories */}
//   <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
//   <option value="Chandigarh">Chandigarh</option>
//   <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
//   <option value="Lakshadweep">Lakshadweep</option>
//   <option value="Delhi">Delhi</option>
//   <option value="Puducherry">Puducherry</option>
//   <option value="Ladakh">Ladakh</option>
//   <option value="Lakhimpur">Lakhimpur</option>
//   <option value="Nagaland">Nagaland</option>
//   <option value="Sikkim">Sikkim</option>
// </select>
                      
                      
//                     </div>
//                     <input
//                       type="text"
//                       name="pincode"
//                       placeholder="Postal Code*"
//                       value={formData.pincode}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   {/* <textarea
//                     name="note"
//                     placeholder="Write note..."
//                     value={formData.note}
//                     onChange={handleInputChange}
//                   /> */}
//                 </form>
//               </div>
//               <div className="wrap">
//                 <h5 className="title">Choose Payment Option:</h5>
//                 <form
//                   className="form-payment"
//                   onSubmit={(e) => e.preventDefault()}
//                 >
//                   <div className="payment-box" id="payment-box">
//                     {/* Cash on Delivery */}
//                     <div className="payment-item">
//                       <label
//                         htmlFor="cod-method"
//                         className="payment-header collapsed"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#cod-payment"
//                         aria-controls="cod-payment"
//                       >
//                         <input
//                           type="radio"
//                           name="payment-method"
//                           className="tf-check-rounded"
//                           id="cod-method"
//                           value="COD"
//                           checked={paymentMethod === "COD"}
//                           onChange={handlePaymentChange}
//                         />
//                         <span className="text-title">Cash on Delivery</span>
//                       </label>
//                       <div
//                         id="cod-payment"
//                         className="collapse"
//                         data-bs-parent="#payment-box"
//                       />
//                     </div>

//                     {/* PhonePe */}
//                     <div className="payment-item">
//                       <label
//                         htmlFor="phonepe-method"
//                         className="payment-header collapsed"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#phonepe-payment"
//                         aria-controls="phonepe-payment"
//                       >
//                         <input
//                           type="radio"
//                           name="payment-method"
//                           className="tf-check-rounded"
//                           id="phonepe-method"
//                           value="PhonePe"
//                           checked={paymentMethod === "PhonePe"}
//                           onChange={handlePaymentChange}
//                         />
//                         <span className="text-title">
//                           <img
//                             alt="PhonePe"
//                             src="/images/payment/phonepe.png"
//                             width={30}
//                             height={18}
//                           />
//                           PhonePe
//                         </span>
//                       </label>
//                       <div
//                         id="phonepe-payment"
//                         className="collapse"
//                         data-bs-parent="#payment-box"
//                       />
//                     </div>

//                     {/* PayPal */}
//                                       <div className="payment-item">
//                       <label
//                         htmlFor="ccavenue-method"
//                         className="payment-header collapsed"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#ccavenue-payment"
//                         aria-controls="ccavenue-payment"
//                       >
//                         <input
//                           type="radio"
//                           name="payment-method"
//                           className="tf-check-rounded"
//                           id="ccavenue-method"
//                           value="CCAvenue"
//                           checked={paymentMethod === "CCAvenue"}
//                           onChange={handlePaymentChange}
//                         />
//                         <span className="text-title">
//                           <img
//                             alt="CCAvenue"
//                             src="/images/payment/cc-avenue.png"
//                             width={40}
//                             height={18}
//                           />
//                           CCAvenue
//                         </span>
//                       </label>
//                       <div
//                         id="ccavenue-payment"
//                         className="collapse"
//                         data-bs-parent="#payment-box"
//                       />
//                     </div>

//                   </div>

//                   {/* Checkout Button */}
//                   <button
//                     onClick={() =>
//                       handleCheckout({ ...formData, paymentMethod })
//                     }
//                     className="tf-btn btn-reset"
//                   >
//                     Payment
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//           <div className="col-xl-1">
//             <div className="line-separation" />
//           </div>
//           <div className="col-xl-5">
//             <div className="flat-spacing flat-sidebar-checkout">
//               <div className="sidebar-checkout-content">
//                 <h5 className="title">Shopping Cart</h5>
//                 <div className="list-product">
//                   {cartProducts.map((product, i) => (
//                     <div key={i} className="item-product">
//                       <Link
//                         to={`/products/${product.slug}`}
//                         className="img-product"
//                       >
//                         <img
//                           alt="img-product"
//                           src={product.images[0]}
//                           width={600}
//                           height={800}
//                         />
//                       </Link>
//                       <div className="content-box">
//                         <div className="info">
//                           <Link
//                             to={`/products/${product.slug}`}
//                             className="name-product link text-title"
//                           >
//                             {product.name}
//                           </Link>
//                           {/* <div className="variant text-caption-1 text-secondary">
//                             <span className="size">XL</span>/
//                             <span className="color">Blue</span>
//                           </div> */}
//                         </div>
//                         <div className="total-price text-button">
//                           <span className="count">{product.quantity}</span>X
//                           <span className="price">
//                             ₹{product.offerPrice.toFixed(2)}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="sec-discount">
//                   <Swiper
//                     dir="ltr"
//                     className="swiper tf-sw-categories"
//                     slidesPerView={2.25} // data-preview="2.25"
//                     breakpoints={{
//                       1024: {
//                         slidesPerView: 2.25, // data-tablet={3}
//                       },
//                       768: {
//                         slidesPerView: 3, // data-tablet={3}
//                       },
//                       640: {
//                         slidesPerView: 2.5, // data-mobile-sm="2.5"
//                       },
//                       0: {
//                         slidesPerView: 1.2, // data-mobile="1.2"
//                       },
//                     }}
//                     spaceBetween={20}
//                   >
//                     {coupons.map((item, index) => (
//                       <SwiperSlide key={index}>
//                         <div
//                           className={`box-discount ${
//                             activeDiscountIndex === index ? "active" : ""
//                           }`}
//                           onClick={() => setActiveDiscountIndex(index)}
//                         >
//                           <div className="discount-top">
//                             <div className="discount-off">
//                               <div className="text-caption-1">{item.title}</div>
//                               <span className="sale-off text-btn-uppercase">
//                                 {item.discount}
//                                 {item.type === "percentage" ? "%" : "₹"}
//                               </span>
//                             </div>
//                             <div className="discount-from">
//                               <p className="text-caption-1">{item.details}</p>
//                             </div>
//                           </div>
//                           <div className="discount-bot">
//                             <span className="text-btn-uppercase">
//                               {item.code}
//                             </span>
//                             <button
//                               className="tf-btn"
//                               onClick={() => setActiveCoupon(item)}
//                             >
//                               <span className="text">Apply Code</span>
//                             </button>
//                           </div>
//                         </div>{" "}
//                       </SwiperSlide>
//                     ))}
//                   </Swiper>
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
//                       <span className="text">Apply Code</span>
//                     </button>
//                   </div>
//                   {/* <p>
//                     Discount code is only used for orders with a total value of
//                     products over ₹500.00
//                   </p> */}
//                 </div>
//                 <div className="wrap">
//                   <div className="ship">
//                     <h5 className="title">Shipping:</h5>
//                     <div className="flex-grow-1">
//                       {shippingInfo.map((option) => (
//                         <fieldset
//                           key={option.id}
//                           className="ship-item d-flex justify-content-left  align-items-center"
//                         >
//                           <input
//                             type="radio"
//                             name="ship-check"
//                             className="tf-check-rounded"
//                             id={option.id}
//                             checked={selectedOption?.id === option.id}
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
//                           <label htmlFor={option.id} className="mx-2">
//                             <span>{option.name}</span> <span> - </span>
//                             <span className="price">
//                               ₹{option.charges.toFixed(2)}
//                             </span>
//                           </label>
//                         </fieldset>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="sec-total-price">
//                   <div className="top">
//                     <div className="item d-flex align-items-center justify-content-between text-button">
//                       <span>Discounts</span>
//                       <p className="tf-totals-total-value">
//                         {discountDetails.length > 0
//                           ? discountDetails
//                               .map((item) =>
//                                 item.discountType === "percentage"
//                                   ? `${item.discount}`
//                                   : `₹${item.discount} `
//                               )
//                               .join(", ")
//                           : "₹ 0"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="bottom">
//                     <h5 className="d-flex justify-content-between">
//                       <span>Total</span>
//                       <span className="total-price-checkout">
//                         ₹{finalOrderTotal ? finalOrderTotal.toFixed(2) : 0}
//                       </span>
//                     </h5>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }











import { useContextElement } from "@/context/Context";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useAuthorization from "@/hooks/userAuthorization";
import { getUserData, loginUser } from "@/api/auth";
import parseJwt from "@/utlis/jwt";
import { createOrder } from "@/api/order";
import ToastNotification from "../modals/ToastNotification";
import { useToast } from "@/context/ToastContext";
import { useCouponsAndShipping } from "@/hooks/useCouponsAndShipping";
import axios from "axios";

export default function Checkout() {
  const [paymentMethods] = useState(["PhonePe", "COD"]);
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");
  const [activeDiscountIndex, setActiveDiscountIndex] = useState(1);
  const navigate = useNavigate();
  const {
    cartProducts,
    finalOrderTotal,
    discountDetails,
    setDiscountDetails,
    applyCoupon,
    activeCoupon,
    setActiveCoupon,
    selectedShippingOption,
    setSelectedShippingOption,
    setFinalOrderTotal,
    totalPrice,
    setCartProducts,
  } = useContextElement();
  const isAuthorized = useAuthorization();
  const { coupons, shippingInfo } = useCouponsAndShipping();
  const [userData, setUserData] = useState(null);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  const [loginError, setLoginError] = useState("");
  const [error, setError] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardHolderName, setCardHolderName] = useState('');
  const { showToast } = useToast();
  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        const decodedToken = parseJwt(token);
        if (decodedToken && decodedToken._id) {
          const user = await getUserData(token);
          setUserData(user.user);
        }
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, [token]);
  const [selectedOption, setSelectedOption] = useState(null);

  // -------------Select Shipping Option-------------------
  useEffect(() => {
    if (shippingInfo?.length > 0 && !selectedOption) {
      const defaultOption = shippingInfo[0];
      setSelectedOption(defaultOption);
      setSelectedShippingOption(defaultOption);
      
    }
  }, [shippingInfo, selectedOption, discountDetails, totalPrice]);
  // -------------Select Shipping Option End-------------------  
  // ---------------Handle Login-------------------
  const togglePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  // Handle Input Change
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  // Handle Login Submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Ensure form doesn't reload
    setLoginError(""); // Clear previous errors

    if (!loginData.email || !loginData.password) {
      setLoginError("Please enter both email and password.");
      return;
    }
    try {
      const response = await loginUser(loginData); // Call API
      if (response && response.token) {
        localStorage.setItem("authToken", response.token); // Store token
        window.location.reload();
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (error) {
      setLoginError("Invalid email or password. Please try again.");
    }
  };

  // ---------------Handle Login End -------------------

  // Pre-fill form data once userData is available
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    state: "",
    street: "",
    pincode: "",
    note: "",
  });
  useEffect(() => {
    if (isAuthorized && userData) {
      const defaultAddress =
        userData.addresses?.length > 0 ? userData.addresses[0] : {}; // Select first address or empty object
      setFormData((prevData) => ({
        ...prevData, // Preserve any existing manual inputs
        firstName: userData.firstName || prevData.firstName || "",
        lastName: userData.lastName || prevData.lastName || "",
        email: userData.email || prevData.email || "",
        phone: userData.phone || prevData.phone || "",
        country: defaultAddress?.country || prevData.country || "",
        city: defaultAddress?.city || prevData.city || "",
        state: defaultAddress?.state || prevData.state || "",
        houseNo: defaultAddress?.houseNo || prevData.houseNo || "",
        street: defaultAddress?.street || prevData.street || "",
        pincode: defaultAddress?.pincode || prevData.pincode || "",
        note: prevData.note || "", // Allow user to enter note manually
      }));
    }
  }, [isAuthorized, userData]);

  // Handle Input Changes
  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePaymentChange = (event) => {
  const selectedMethod = event.target.value;
  setPaymentMethod(selectedMethod);

  // Calculate updated total
  // const baseTotal = totalPrice - (discountDetails[0]?.value || 0);
  // const shippingCharge = selectedMethod === "COD" ? 149 : 0;
  // const updatedTotal = baseTotal + shippingCharge;

  // setFinalOrderTotal(updatedTotal); // Update final total
};
useEffect(() => {
  const baseTotal = totalPrice - (discountDetails[0]?.value || 0);
  const shippingCharge = paymentMethod === "COD" ? 149 : 0;
  const updatedTotal = baseTotal + shippingCharge;
  setFinalOrderTotal(updatedTotal);
}, [paymentMethod, totalPrice, discountDetails]);


  const [isRazorpayLoading, setIsRazorpayIsLoading] = useState(false);


  const handleCheckout = async (formData) => {
    try {
    setIsRazorpayIsLoading(true);

    let userId = isAuthorized
      ? localStorage.getItem("userId")
      : `guest_${Date.now()}`;
    let email =
      formData.email || (isAuthorized ? localStorage.getItem("userEmail") : null);

    if (!email) {
      alert("Please provide a valid email address to proceed.");
      setIsRazorpayIsLoading(false);
      return;
    }

    // ✅ Adjust total price based on payment method
    let calculatedTotal = totalPrice - (discountDetails[0]?.value || 0);
    if (paymentMethod === "COD" && selectedShippingOption?.charges) {
      calculatedTotal += selectedShippingOption.charges;
    }
    console.log("calculatedTotal",calculatedTotal);
    

    const orderPayload = {
      email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      address: {
        country: formData.country,
        city: formData.city,
        state: formData.state,
        houseNo: formData.houseNo,
        street: formData.street,
        pincode: formData.pincode,
      },
      cartProducts,
      finalOrderTotal: calculatedTotal.toFixed(2), // ✅ use conditionally calculated total
      note: formData.note || "",
      paymentMethod,
      activeCoupon,
      discountDetails,
      selectedShippingOption: {
    ...selectedShippingOption,
    charges: paymentMethod === "COD" ? 149 : 0, // ✅ set charges based on payment method
  },
    };
  
      const orderData = await createOrder(orderPayload);
  
      if (!orderData.success) {
        showToast("error", "Order Failed");
        navigate("/order-failed");
        return;
      }
  
      // ✅ COD Flow
      if (paymentMethod.toLowerCase() === "cod") {
        setIsRazorpayIsLoading(true);
        setCartProducts([]);
        localStorage.removeItem("cartList");
        showToast("success", "Order placed successfully! Pay on delivery.");
        setIsRazorpayIsLoading(false);
        setTimeout(() => navigate("/order-success"), 3000);
        return;
      }
  
      // ✅ Razorpay Flow
      if (paymentMethod.toLowerCase() === "razorpay") {
        const { id: order_id, amount, currency, key } = orderData.razorpayOrderDetails;
        const fullOrderDetailsFromBackend = orderData.OrderDetails;
  
        const options = {
          key,
          amount,
          currency,
          name: "Beaubless Cosmetics",
          description: "Order Payment",
          order_id,
          handler: async function (response) {
            try {
              // Save order temporarily
              sessionStorage.setItem("orderDetails", JSON.stringify(fullOrderDetailsFromBackend));
              localStorage.removeItem("cartList");
  
              // Verify payment
              const verifyRes = await fetch(`https://www.api.beaubless.com/api/v1/order/verify-payment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order_id }),
              });
  
              const verifyData = await verifyRes.json();
  
              if (verifyData?.orderStatus === "Confirmed") {
                navigate(`/order-success?payment_id=${response.razorpay_payment_id}`);
              } else if (verifyData?.orderStatus === "Pending") {
                navigate(`/order-pending?payment_id=${response.razorpay_payment_id}`);
              } else {
                navigate(`/order-failed`);
              }
            } catch (err) {
              console.error("Verification failed", err);
              navigate("/order-failed");
            }
          },
          prefill: {
            name: `${formData.firstName} ${formData.lastName}`,
            email,
            contact: formData.phone,
          },
          theme: {
            color: "#3399cc",
          },
        };
  
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error("Checkout error:", error);
      showToast("error", error.response?.data?.message || "Something went wrong.");
    } finally {
      setIsRazorpayIsLoading(false);
    }
  };
  
  
  
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  

  const [couponCode, setCouponCode] = useState("");

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="flat-spacing tf-page-checkout">
              {/* If User Not Logged in */}
              {!isAuthorized ? (
                <div className="wrap">
                  {/* <div className="title-login">
                    <p>Already have an account?</p>{" "}
                    <Link to={`/login`} className="text-button">
                      Login here
                    </Link>
                  </div>
                  {loginError && (
                    <p className="error-message text-danger">{loginError}</p>
                  )}{" "} */}
                  {/* Show error message */}
                  {/* <form className="login-box" onSubmit={handleLogin}>
                    <div className="grid-2">
                      <input
                        type="email"
                        placeholder="Username or email address*"
                        name="email"
                        autoComplete="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        required
                      />
                      <input
                        className="input-password"
                        type={passwordType}
                        placeholder="Password*"
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        required
                        autoComplete="current-password"
                      />
                      <span
                        className="toggle-password"
                        onClick={togglePassword}
                      >
                        <i
                          className={`icon-eye-${
                            passwordType === "password" ? "hide" : "show"
                          }-line`}
                        />
                      </span>
                    </div>
                    <button className="tf-btn" type="submit">
                      <span className="text">Login</span>
                    </button>
                  </form> */}
                </div>
              ) : (
                <div className="wrap">
                  {/* {userData && (
                    <h3 className="heading mb-3">
                      Hello, {userData.firstName}
                    </h3>
                  )}
                  <h5 className="title">Please Select Your Address</h5>
                  {userData && (
                    <div className="tf-select">
                      <select
                        className="text-title"
                        name="selectedAddress"
                        onChange={(e) => {
                          const selectedIndex = e.target.value;
                          const selectedAddress =
                            (userData && userData.addresses[selectedIndex]) ||
                            {};
                          setFormData((prevData) => ({
                            ...prevData,
                            country: selectedAddress.country || "",
                            city: selectedAddress.city || "",
                            state: selectedAddress.state || "",
                            street: selectedAddress.street || "",
                            pincode: selectedAddress.pincode || "",
                          }));
                        }}
                      >
                        {userData.addresses?.map((address, index) => (
                          <option key={address._id} value={index}>
                            {address.street}, {address.city}, {address.state}
                          </option>
                        ))}
                      </select>
                    </div>
                  )} */}
                </div>
              )}
              {/* Bootstrap Toast for Error Message */}
          
              <div className="wrap">
                <h5 className="title">Information</h5>
                <form className="info-box" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid-2">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name*"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name*"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid-2">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address*"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number*"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="tf-select">
                    <select
                      className="text-title"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    >
                      <option value="">Choose Country/Region</option>
                      <option value="India">India</option>
                      {/* <option value="USA">USA</option>
                      <option value="UK">UK</option> */}
                    </select>
                  </div>
                  <div className="grid-2">
                    <input
                      type="text"
                      name="city"
                      placeholder="Town/City*"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="street"
                      placeholder="Street, House No..."
                      value={formData.street}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid-2">
                    <div className="tf-select">
                      <select
  className="text-title"
  name="state"
  value={formData.state}
  onChange={handleInputChange}
>
  <option value="">Choose State/Union Territory</option>
  <option value="Andhra Pradesh">Andhra Pradesh</option>
  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
  <option value="Assam">Assam</option>
  <option value="Bihar">Bihar</option>
  <option value="Chhattisgarh">Chhattisgarh</option>
  <option value="Goa">Goa</option>
  <option value="Gujarat">Gujarat</option>
  <option value="Haryana">Haryana</option>
  <option value="Himachal Pradesh">Himachal Pradesh</option>
  <option value="Jharkhand">Jharkhand</option>
  <option value="Karnataka">Karnataka</option>
  <option value="Kerala">Kerala</option>
  <option value="Madhya Pradesh">Madhya Pradesh</option>
  <option value="Maharashtra">Maharashtra</option>
  <option value="Manipur">Manipur</option>
  <option value="Meghalaya">Meghalaya</option>
  <option value="Mizoram">Mizoram</option>
  <option value="Nagaland">Nagaland</option>
  <option value="Odisha">Odisha</option>
  <option value="Punjab">Punjab</option>
  <option value="Rajasthan">Rajasthan</option>
  <option value="Sikkim">Sikkim</option>
  <option value="Tamil Nadu">Tamil Nadu</option>
  <option value="Telangana">Telangana</option>
  <option value="Tripura">Tripura</option>
  <option value="Uttar Pradesh">Uttar Pradesh</option>
  <option value="Uttarakhand">Uttarakhand</option>
  <option value="West Bengal">West Bengal</option>
  
  {/* Union Territories */}
  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
  <option value="Chandigarh">Chandigarh</option>
  <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
  <option value="Lakshadweep">Lakshadweep</option>
  <option value="Delhi">Delhi</option>
  <option value="Puducherry">Puducherry</option>
  <option value="Ladakh">Ladakh</option>
  <option value="Lakhimpur">Lakhimpur</option>
  <option value="Nagaland">Nagaland</option>
  <option value="Sikkim">Sikkim</option>
</select>
                      
                      
                    </div>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Postal Code*"
                      value={formData.pincode}
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* <textarea
                    name="note"
                    placeholder="Write note..."
                    value={formData.note}
                    onChange={handleInputChange}
                  /> */}
                </form>
              </div>
              <div className="wrap">
  {/* <h5 className="title">Proceed to Checkout:</h5> */}
  <form className="form-payment" onSubmit={(e) => e.preventDefault()}>
  <div className="payment-box" id="payment-box">

      {/* Razorpay */}
    <div className="payment-item">
      <label
        htmlFor="razorpay-method"
        className="payment-header collapsed"
        data-bs-toggle="collapse"
        data-bs-target="#razorpay-payment"
        aria-controls="razorpay-payment"
      >
        <input
          type="radio"
          name="payment-method"
          className="tf-check-rounded"
          id="razorpay-method"
          value="Razorpay"
          checked={paymentMethod === "Razorpay"}
          onChange={handlePaymentChange}
        />
        <span className="text-title">
          More way to pay<br></br>
          <small className="text-dark fs-6">(Credit/Debit Card, UPI, Net Banking)</small>             
        </span>
      </label>
      <div id="razorpay-payment" className="collapse" data-bs-parent="#payment-box" />
    </div>

    
    {/* Cash on Delivery */}
    <div className="payment-item">
      <label
        htmlFor="cod-method"
        className="payment-header collapsed"
        data-bs-toggle="collapse"
        data-bs-target="#cod-payment"
        aria-controls="cod-payment"
      >
        <input
          type="radio"
          name="payment-method"
          className="tf-check-rounded"
          id="cod-method"
          value="COD"
          checked={paymentMethod === "COD"}
          onChange={handlePaymentChange}
        />
        <span className="text-title">Cash on Delivery</span>
      </label>
      <div id="cod-payment" className="collapse" data-bs-parent="#payment-box" />
    </div>

  
  </div>

  {/* Submit Button */}
  <button
    onClick={() => handleCheckout({ ...formData, paymentMethod })}
    className="tf-btn btn-reset"
    disabled={paymentMethod === "Razorpay" && isRazorpayLoading}
  >
    {paymentMethod === "Razorpay" && isRazorpayLoading ? (
      <>
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Please wait...
      </>
    ) : (
      "Proceed to Payment"
    )}
  </button>
</form>

</div>

            </div>
          </div>
          <div className="col-xl-1">
            <div className="line-separation" />
          </div>
          <div className="col-xl-5">
            <div className="flat-spacing flat-sidebar-checkout">
              <div className="sidebar-checkout-content">
                <h5 className="title">Shopping Cart</h5>
                <div className="list-product">
                  {cartProducts.map((product, i) => (
                    <div key={i} className="item-product">
                      <Link
                        to={`/products/${product.slug}`}
                        className="img-product"
                      >
                        <img
                          alt="img-product"
                          src={product.images[0]}
                          width={600}
                          height={800}
                        />
                      </Link>
                      <div className="content-box">
                        <div className="info">
                          <Link
                            to={`/products/${product.slug}`}
                            className="name-product link text-title"
                          >
                            {product.name}
                          </Link>
                          {/* <div className="variant text-caption-1 text-secondary">
                            <span className="size">XL</span>/
                            <span className="color">Blue</span>
                          </div> */}
                        </div>
                        <div className="total-price text-button">
                          <span className="count">{product.quantity}</span>X
                          <span className="price">
                            ₹{product.offerPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="sec-discount">
                  <Swiper
                    dir="ltr"
                    className="swiper tf-sw-categories"
                    slidesPerView={2.25} // data-preview="2.25"
                    breakpoints={{
                      1024: {
                        slidesPerView: 2.25, // data-tablet={3}
                      },
                      768: {
                        slidesPerView: 3, // data-tablet={3}
                      },
                      640: {
                        slidesPerView: 2.5, // data-mobile-sm="2.5"
                      },
                      0: {
                        slidesPerView: 1.2, // data-mobile="1.2"
                      },
                    }}
                    spaceBetween={20}
                  >
                    {coupons.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div
                          className={`box-discount ${
                            activeDiscountIndex === index ? "active" : ""
                          }`}
                          onClick={() => setActiveDiscountIndex(index)}
                        >
                          <div className="discount-top">
                            <div className="discount-off">
                              <div className="text-caption-1">{item.title}</div>
                              <span className="sale-off text-btn-uppercase">
                                {item.discount}
                                {item.type === "percentage" ? "%" : "₹"}
                              </span>
                            </div>
                            <div className="discount-from">
                              <p className="text-caption-1">{item.details}</p>
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
                        </div>{" "}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="ip-discount-code">
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
                      <span className="text">Apply Code</span>
                    </button>
                  </div>
                  {/* <p>
                    Discount code is only used for orders with a total value of
                    products over ₹500.00
                  </p> */}
                </div>
                {paymentMethod === "COD" && (
                <div className="wrap">
                  <div className="ship">
                    <h5 className="title">Shipping:</h5>
                    <div className="flex-grow-1">
                      {shippingInfo.map((option) => (
                        <fieldset
                          key={option.id}
                          className="ship-item d-flex justify-content-left  align-items-center"
                        >
                          <input
                            type="radio"
                            name="ship-check"
                            className="tf-check-rounded"
                            id={option.id}
                            checked={selectedOption?.id === option.id}
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
                          <label htmlFor={option.id} className="mx-2">
                            <span>{option.name}</span> <span> - </span>
                            <span className="price">
                              ₹{option.charges.toFixed(2)}
                            </span>
                          </label>
                        </fieldset>
                      ))}
                    </div>
                     <p className="text-danger">*Free Shipping is only available on online payment*</p>
                  </div>
                </div>
                )}
                <div className="sec-total-price">
                  <div className="top">
                    <div className="item d-flex align-items-center justify-content-between text-button">
                      <span>Discounts</span>
                      <p className="tf-totals-total-value">
                        {discountDetails.length > 0
                          ? discountDetails
                              .map((item) =>
                                item.discountType === "percentage"
                                  ? `${item.discount}`
                                  : `₹${item.discount} `
                              )
                              .join(", ")
                          : "₹ 0"}
                      </p>
                    </div>
                  </div>
                  <div className="bottom">
                    <h5 className="d-flex justify-content-between">
                      <span>Total</span>
                      <span className="total-price-checkout">
                        ₹{finalOrderTotal ? finalOrderTotal.toFixed(2) : 0}
                      </span>
                    </h5>
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
