import React from "react";
import { Link } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
import Topbar from "@/components/headers/Topbar";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";

const metadata = {
  title: "Gifting Coming Soon || Modave",
  description: "Modave - Gifting section launching soon",
};

export default function GiftingPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <section className="flat-spacing py-28 flex items-center justify-center text-center">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Gifting Coming Soon</h1>
          <p className="text-lg text-gray-500 mb-6">
            We're crafting something special for your loved ones.
          </p>
          <Link to={`/`} className="tf-btn btn-fill inline-block">
            <span className="text text-button">Back To Homepage</span>
          </Link>
        </div>
      </section>
      <Footer1 />
    </>
  );
}
