import { useContextElement } from "@/context/Context";
import { useCouponsAndShipping } from "@/hooks/useCouponsAndShipping";
import { useState } from "react";

const Coupon = ({ currentOpenPopup, setCurrentOpenPopup }) => {
  const { coupons } = useCouponsAndShipping();

  const { applyCoupon, activeCoupon, setActiveCoupon } = useContextElement();

  const [couponCode, setCouponCode] = useState("");

  const handleOpen = () => {
    setCurrentOpenPopup("add-coupon");
  };

  const handleClose = () => {
    setCurrentOpenPopup("");
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();

    if (!couponCode.trim()) {
      alert("Please enter a valid coupon code.");
      return;
    }

    const selectedCoupon = coupons.find(
      (coupon) => coupon.code.toLowerCase() === couponCode.toLowerCase()
    );

    if (!selectedCoupon) {
      alert("Invalid coupon code. Please try again.");
      return;
    }

    if (activeCoupon) {
      setActiveCoupon(selectedCoupon);
      alert(`Coupon "${selectedCoupon.code}" applied successfully!`);
      handleClose();
      return;
    }

    applyCoupon(selectedCoupon);
    setActiveCoupon(selectedCoupon);
    alert(`Coupon "${selectedCoupon.code}" applied successfully!`);
    handleClose();
  };

  return (
    <div
      className={`tf-mini-cart-tool-openable ${
        currentOpenPopup === "add-coupon" ? "open" : ""
      }`}
    >
      <div className="tf-mini-cart-tool-content">
        <label className="tf-mini-cart-tool-text" onClick={handleOpen}>
          <span className="text-title">Add A Coupon Code</span>
        </label>
        <form
          className="form-add-coupon tf-mini-cart-tool-wrap"
          onSubmit={handleApplyCoupon}
        >
          <fieldset>
            <div className="text-caption-1 text-secondary mb_8">Enter Code</div>
            <input
              type="text"
              placeholder="Discount code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              required
            />
          </fieldset>
          <div className="tf-cart-tool-btns">
            <button type="submit" className="btn-style-2 w-100">
              Apply
            </button>
            <div
              className="text-center w-100 text-btn-uppercase tf-mini-cart-tool-close"
              onClick={handleClose}
            >
              Cancel
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Coupon;
