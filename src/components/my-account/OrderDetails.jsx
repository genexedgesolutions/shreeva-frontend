import { getOrderDetails } from "@/api/order";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderDetails() {
  const [activeTab, setActiveTab] = useState(1);
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderDetails(orderId);
        setOrderData(data);
      } catch (err) {
        setError("Failed to load order details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!orderData) return <p>No order found.</p>;

  return (
    <div className="my-account-content">
      <div className="account-order-details">
        <div className="wd-form-order">
          <div className="order-head">
            <figure className="img-product">
              <img
                alt="product"
                src={orderData.cartProducts?.[0]?.images?.[0]}
                width={600}
                height={800}
              />
            </figure>
            <div className="content">
              <div className="badge">{orderData.orderStatus}</div>
              <h6 className="mt-8 fw-5">Order ID: #{orderData._id}</h6>
            </div>
          </div>
        
          <div className="tf-grid-layout md-col-2 gap-15">
            <div className="item">
              <div className="text-2 text_black-2">Item</div>
              <div className="text-2 mt_4 fw-6">
                {orderData.cartProducts?.[0]?.name}
              </div>
            </div>
            <div className="item">
              <div className="text-2 text_black-2">Courier</div>
              <div className="text-2 mt_4 fw-6">
                {orderData.selectedShippingOption?.name}
              </div>
            </div>
            <div className="item">
              <div className="text-2 text_black-2">Order Time</div>
              <div className="text-2 mt_4 fw-6">
                {new Date(orderData.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="item">
              <div className="text-2 text_black-2">Address</div>
              <div className="text-2 mt_4 fw-6">
                {orderData.address?.street}, {orderData.address?.city},{" "}
                {orderData.address?.state}, {orderData.address?.country} -{" "}
                {orderData.address?.pincode}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="widget-tabs style-3 widget-order-tab">
            <ul className="widget-menu-tab">
              <li
                className={`item-title ${activeTab === 1 ? "active" : ""}`}
                onClick={() => setActiveTab(1)}
              >
                <span className="inner">Order History</span>
              </li>
              <li
                className={`item-title ${activeTab === 2 ? "active" : ""}`}
                onClick={() => setActiveTab(2)}
              >
                <span className="inner">Item Details</span>
              </li>
              <li
                className={`item-title ${activeTab === 3 ? "active" : ""}`}
                onClick={() => setActiveTab(3)}
              >
                <span className="inner">Courier</span>
              </li>
              <li
                className={`item-title ${activeTab === 4 ? "active" : ""}`}
                onClick={() => setActiveTab(4)}
              >
                <span className="inner">Receiver</span>
              </li>
            </ul>

            {/* Tab Content */}
            <div className="widget-content-tab">
              {/* Order History Tab */}
              <div
                className={`widget-content-inner ${
                  activeTab === 1 ? "active" : ""
                }`}
              >
                <div className="widget-timeline">
                  <ul className="timeline">
                    {orderData.statusHistory?.map((item, idx) => (
                      <li key={item._id}>
                        <div className="timeline-badge success" />
                        <div className="timeline-box">
                          <a className="timeline-panel" href="#">
                            <div className="text-2 fw-6">{item.status}</div>
                            <span>
                              {new Date(item.updatedAt).toLocaleString()}
                            </span>
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Item Details Tab */}
              <div
                className={`widget-content-inner ${
                  activeTab === 2 ? "active" : ""
                }`}
              >
                {orderData.cartProducts.map((item) => (
                  <div key={item._id} className="order-head">
                    <figure className="img-product">
                      <img
                        alt={item.name}
                        src={item.images[0]}
                        width={600}
                        height={800}
                      />
                    </figure>
                    <div className="content">
                      <div className="text-2 fw-6">{item.name}</div>
                      <div className="mt_4">
                        <span className="fw-6">Price: </span> ₹{item.price}
                      </div>
                      <div className="mt_4">
                        <span className="fw-6">Quantity: </span>{" "}
                        {item.quantity}
                      </div>
                      <div className="mt_4">
                        <span className="fw-6">Discount: </span>{" "}
                        {item.discount?.percentage
                          ? `${item.discount.percentage}%`
                          : "No discount"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Courier Tab */}
              <div
                className={`widget-content-inner ${
                  activeTab === 3 ? "active" : ""
                }`}
              >
                <p>
                  <strong>Courier Type: </strong>
                  {orderData.selectedShippingOption?.type}
                </p>
                <p>
                  <strong>Charges: </strong>₹
                  {orderData.selectedShippingOption?.charges}
                </p>
              </div>

              {/* Receiver Tab */}
              <div
                className={`widget-content-inner ${
                  activeTab === 4 ? "active" : ""
                }`}
              >
                <p>
                  <strong>Name: </strong>
                  {orderData.firstName} {orderData.lastName}
                </p>
                <p>
                  <strong>Email: </strong>
                  {orderData.email}
                </p>
                <p>
                  <strong>Phone: </strong>
                  {orderData.phone}
                </p>
                <p>
                  <strong>Address: </strong>
                  {orderData.address?.street}, {orderData.address?.city},{" "}
                  {orderData.address?.state}, {orderData.address?.country} -{" "}
                  {orderData.address?.pincode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
