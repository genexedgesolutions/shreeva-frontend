import { trackOrderById } from "@/api/order";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function OrderTrac() {
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState(1); // Optional: for tab switching if you have tabs

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOrderData(null);
    try {
      const result = await trackOrderById(email, orderId);
      if (result.success) {
        setOrderData(result);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="login-wrap tracking-wrap">
          <div className="left">
            <div className="heading">
              <h4 className="mb_8">Order Tracking</h4>
              <p>
                To track your order please enter your Order ID and billing email
                below.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="form-login">
              <div className="wrap">
                <fieldset>
                  <input
                    type="text"
                    placeholder="Order ID*"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                  />
                </fieldset>
                <fieldset>
                  <input
                    type="email"
                    placeholder="Billing Email*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </fieldset>
              </div>
              <div className="button-submit">
                <button className="tf-btn btn-fill" type="submit">
                  <span className="text">Track Order</span>
                </button>
              </div>
              {error && <p className="text-danger mt_10">{error}</p>}
            </form>
          </div>

          {/* Show Tracking Info if Available */}
          <div className="right">
            {orderData ? (
              <div className="widget-content-tab ">
                <h6 className="line-under">Order Status</h6>
                <div
                  className={`widget-content-inner mt_20${
                    activeTab === 4 ? "active" : ""
                  }`}
                >
                  <p
                    className={`text-2 ${
                      orderData.orderStatus === "Cancelled"
                        ? "text-danger"
                        : orderData.orderStatus === "Delivered"
                        ? "text-success"
                        : orderData.orderStatus === "Shipped"
                        ? "text-info"
                        : "text-primary"
                    }`}
                  >
                    {orderData.orderStatus === "Pending" &&
                      "Your order is pending confirmation."}
                    {orderData.orderStatus === "Processing" &&
                      "Your order is being prepared."}
                    {orderData.orderStatus === "Shipped" &&
                      "Your order has been shipped!"}
                    {orderData.orderStatus === "Delivered" &&
                      "Your order has been delivered."}
                    {orderData.orderStatus === "Completed" &&
                      "Your order is completed. Thank you!"}
                    {orderData.orderStatus === "Cancelled" &&
                      "Sorry, your order has been cancelled."}
                  </p>
                  <ul className="">
                    <li>
                      Order Number : <span className="fw-7">#{orderId}</span>
                    </li>
                    <li>
                      Status :{" "}
                      <span className="fw-7">{orderData.orderStatus}</span>
                    </li>
                    <li>
                      Email : <span className="fw-7">{email}</span>
                    </li>
                  </ul>
                </div>
                <div
                  className={`widget-content-inner ${
                    activeTab === 1 ? "active" : ""
                  }`}
                >
                  <div className="widget-timeline">
                    <ul className="timeline">
                      {orderData.statusHistory.map((item, index) => (
                        <li key={index}>
                          <div className="timeline-badge success" />
                          <div className="timeline-box">
                            <a className="timeline-panel" href="#">
                              <div className="text-2 fw-6">
                                {item.status || "Updated"}
                              </div>
                              <span>
                                {new Date(item.updatedAt).toLocaleString()}
                              </span>
                            </a>
                            {item.details && <p>{item.details}</p>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="mb_8">Already have an account?</h4>
                <p className="text-primary">
                  Welcome back. Sign in to access your personalized experience,
                  saved preferences, and more.
                </p>
                <Link to={`/login`} className="tf-btn btn-fill">
                  <span className="text">Login</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
