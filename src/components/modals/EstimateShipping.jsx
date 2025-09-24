import { useState } from "react";

const EstimateShipping = ({ currentOpenPopup, setCurrentOpenPopup }) => {
  const [zipCode, setZipCode] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(null);

  const handleOpen = () => {
    setCurrentOpenPopup("estimate-shipping");
  };

  const handleClose = () => {
    setCurrentOpenPopup("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const delhiZipCodes = ["110001", "110002", "110003", "110004", "110005"]; // Add more Delhi ZIP codes as needed
    const isDelhi = delhiZipCodes.includes(zipCode);

    const daysToAdd = isDelhi ? 3 : 7;

    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + daysToAdd);

    setDeliveryDate(estimatedDate.toLocaleDateString());
  };

  return (
    <div
      className={`tf-mini-cart-tool-openable ${
        currentOpenPopup === "estimate-shipping" ? "open" : ""
      }`}
    >
      <div className="tf-mini-cart-tool-content">
        <label className="tf-mini-cart-tool-text" onClick={handleOpen}>
          <span className="text-title">Estimate Shipping</span>
        </label>
        <form
          className="form-add-coupon tf-mini-cart-tool-wrap"
          onSubmit={handleSubmit}
        >
          <fieldset>
            <div className="text-caption-1 text-secondary mb_8">
              Enter ZIP Code
            </div>
            <input
              type="text"
              placeholder="ZIP Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </fieldset>
          <div className="tf-cart-tool-btns">
            <button type="submit" className="btn-style-2 w-100">
              Save
            </button>
            <div
              className="text-center w-100 text-btn-uppercase tf-mini-cart-tool-close"
              onClick={handleClose}
            >
              Cancel
            </div>
          </div>
        </form>
        {deliveryDate && (
          <p className="tf-mini-cart-tool">
            🚚 Your order will be delivered on <strong>{deliveryDate}</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default EstimateShipping;
