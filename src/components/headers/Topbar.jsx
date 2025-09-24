import React from "react";
import { Link } from "react-router-dom";
import LanguageSelect from "../common/LanguageSelect";
import CurrencySelect from "../common/CurrencySelect";
export default function Topbar() {
  return (
    <>
      <div className="tf-topbar bg-primary">
      <div className="container">
        <div className="tf-topbar_wrap d-flex align-items-center justify-content-center justify-content-xl-between">
          <ul className="topbar-left">
            <li>
              <a className="text-caption-1 text-white" href="tel:+918587085402">
             +91 91042 35510

              </a>
            </li>
            <li>
              <a className="text-caption-1 text-white" href="#">
                jewelsshreeva@gmail.com

              </a>
            </li>
          </ul>
          <div className="topbar-right d-none d-xl-block">
            <div className="tf-cur justify-content-end">
              <div className="tf-currencies">
                <CurrencySelect light topStart />
              </div>
              <div className="tf-languages position-relative">
                <LanguageSelect
                  parentClassName="image-select center style-default type-languages color-white"
                  topStart={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
