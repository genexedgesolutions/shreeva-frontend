import React from "react";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import Topbar from "@/components/headers/Topbar";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import { useSearchParams } from "react-router-dom";
const metadata = {
  title: "Order Successful || Beaubless",
  description:
    "Thank you for your order at Beaubless - Hair Care and Skin Care Solution.",
};

export default function OrderSuccessPage() {
  const [searchParams] = useSearchParams();
const paymentId = searchParams.get("payment_id");

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
                data-src="/images/payment/done.png"
                alt="Order Success"
                src="/images/payment/done.png"
                width={100}
                height={100}
              />
            </div>
            <div className="content">
              <h1 className="title mb_4 text-primary">Thank You!</h1>
              <div>
                <h4 className="title mb_4 text-primary pt-2">
                  Your Order is Confirmed
                </h4>
                <div className="text body-text-1 pt-3">
  Thank you for your purchase! Your order details have been sent to your email. 
  You’ll receive a notification once your order is shipped. 
  If you have any questions, feel free to message us through our website.
</div>

              </div>
            </div>
          </div>

          {/* Upsell Section */}
          <RelatedProducts />
        </div>
      </section>
      <Footer1 />
    </>
  );
}
