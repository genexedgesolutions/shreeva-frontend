import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiConfig } from "@/config/apiConfig";

import MetaComponent from "@/components/common/MetaComponent";
import Topbar from "@/components/headers/Topbar";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
const api = axios.create({
  baseURL: apiConfig.baseURL, // update if needed
});
const metadata = {
  title: "Gifting Coming Soon || Beaubless",
  description: "Beaubless - Gifting section launching soon",
};

export default function CCAvenueCheckout() {
  const [loading, setLoading] = useState(false);

  const redirectToCCAvenue = ({ encRequest, access_code }) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction";

    const encInput = document.createElement("input");
    encInput.type = "hidden";
    encInput.name = "encRequest";
    encInput.value = encRequest;
    form.appendChild(encInput);

    const accessInput = document.createElement("input");
    accessInput.type = "hidden";
    accessInput.name = "access_code";
    accessInput.value = access_code;
    form.appendChild(accessInput);

    document.body.appendChild(form);
    form.submit();
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await api.post("/order/test-order", {
        amount: "100.00",
        name: "Test User",
        email: "testuser@example.com",
        phone: "9999999999",
      });

      const { encRequest, access_code } = response.data;

      if (encRequest && access_code) {
        redirectToCCAvenue({ encRequest, access_code });
      } else {
        alert("Missing payment credentials.");
      }
    } catch (error) {
      console.error("Payment initiation failed", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="tf-btn btn-fill inline-block px-6 py-3 rounded bg-black text-white hover:bg-gray-800 transition"
      disabled={loading}
    >
      {loading ? "Processing..." : "Pay ₹100 via CCAvenue"}
    </button>
  );
};

