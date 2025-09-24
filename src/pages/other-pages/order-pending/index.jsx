import React from "react";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import Topbar from "@/components/headers/Topbar";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";

const metadata = {
  title: "Order Pending || Beaubless",
  description: "Your order at Beaubless is currently pending confirmation.",
};

export default function OrderPendingPage() {
  return (
    <>
      <Topbar />
      <Header1 />
      <section className="flat-spacing page-success">
        <div className="container">
          <div className="page-success-inner justify-content-center text-center">
            <div className="image justify-content-center">
              <img
                className="lazyload"
                data-src="/images/payment/pending.png"
                alt="Order Pending"
                src="/images/payment/pending.png"
                width={100}
                height={100}
              />
            </div>
            <div className="content">
              <h1 className="title mb_4 text-warning">Order Pending</h1>
              <h4 className="title mb_4 text-warning pt-2">
                Awaiting Confirmation
              </h4>
              <div className="text body-text-1 pt-3">
                Your payment is being processed. You will receive a confirmation email shortly. For urgent queries, please contact our support.
              </div>
            </div>
          </div>

          {/* Related Products */}
          <RelatedProducts />
        </div>
      </section>
      <Footer1 />
    </>
  );
}
