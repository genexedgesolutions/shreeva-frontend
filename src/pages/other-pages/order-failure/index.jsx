import React from "react";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import Topbar from "@/components/headers/Topbar";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";

const metadata = {
  title: "Order Failed || Beaubless",
  description: "Unfortunately, your order could not be processed at Beaubless.",
};

export default function OrderFailurePage() {
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
                data-src="/images/payment/failed.png"
                alt="Order Failed"
                src="/images/payment/failed.png"
                width={100}
                height={100}
              />
            </div>
            <div className="content">
              <h1 className="title mb_4 text-danger">Oops!</h1>
              <h4 className="title mb_4 text-danger pt-2">Payment Failed</h4>
              <div className="text body-text-1 pt-3">
                Something went wrong during the payment process. Please try again or contact support if the issue persists.
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
