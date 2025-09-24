import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserOrders } from "@/api/order";

// Function to decode JWT
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;

      try {
        const decodedToken = parseJwt(token);
        if (decodedToken && decodedToken._id) {
          const res = await getUserOrders(decodedToken._id);
          if (res?.userOrders) {
            setOrders(res.userOrders);
          }
        }
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="my-account-content">
      <div className="account-orders">
        <div className="wrap-account-order">
          <table>
            <thead>
              <tr>
                <th className="fw-6">Order</th>
                <th className="fw-6">Date</th>
                <th className="fw-6">Status</th>
                <th className="fw-6">Total</th>
                <th className="fw-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => {
                  const createdAt = new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });

                  const itemCount = order.cartProducts?.length || 0;

                  return (
                    <tr className="tf-order-item" key={order._id}>
                      <td>{order._id}</td>
                      <td>{createdAt}</td>
                      <td>{order.orderStatus}</td>
                      <td>₹{order.totalPrice} for {itemCount} item{itemCount > 1 ? "s" : ""}</td>
                      <td>
                        <Link
                          to={`/order-details/${order._id}`}
                          className="tf-btn btn-fill radius-4"
                        >
                          <span className="text">View</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
