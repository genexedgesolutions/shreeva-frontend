import React from "react";

import { Link } from "react-router-dom";
import CountdownTimer from "@/components/common/Countdown";
export default function BannerCountdown() {
  return (
    <section className="bg-secondary flat-spacing flat-countdown-banner">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="banner-left justify-content-center text-center">
              <div className="box-title">
                <h3 className="wow fadeInUp">Exclusive Deals Live!</h3>
                <p className="text-primary wow fadeInUp">
                  Get up to 30% off on selected skincare & haircare essentials.
                </p>
              </div>
              <div className="btn-banner wow fadeInUp ">
                <Link to={`/products`} className="tf-btn btn-fill">
                  <span className="text">Shop Now</span>
                  <i className="icon icon-arrowUpRight" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="banner-img">
              <img
                className="lazyload"
                data-src="/images/banner/count.png"
                alt="banner"
                src="/images/banner/count.png"
                width={607}
                height={655}
              />
            </div>
          </div>
          <div className="col-lg-5">
            <div
              className="banner-right"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="tf-countdown-lg">
                <div
                  className="js-countdown"
                  data-timer={1007}
                  data-labels="Days,Hours,Mins,Secs"
                >
                  <CountdownTimer style={2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}