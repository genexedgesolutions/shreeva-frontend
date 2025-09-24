import { useContextElement } from "@/context/Context";
import { useState } from "react";

const OrderNote = ({ currentOpenPopup, setCurrentOpenPopup }) => {
  const { orderNote, setOrderNote } = useContextElement();
  const [note, setNote] = useState(orderNote || "");

  const handleClose = () => {
    setCurrentOpenPopup("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.trim()) {
      setOrderNote(note);
    }
    handleClose();
  };

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  return (
    <div
      className={`tf-mini-cart-tool-openable ${
        currentOpenPopup === "add-note" ? "open" : ""
      }`}
    >
      <div className="tf-mini-cart-tool-content">
        <label htmlFor="Cart-note" className="tf-mini-cart-tool-text">
          <span className="icon">
            <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_6766_32777)">
                <path
                  d="M9.16699 3.33325H3.33366C2.89163 3.33325 2.46771 3.50885 2.15515 3.82141C1.84259 4.13397 1.66699 4.55789 1.66699 4.99992V16.6666C1.66699 17.1086 1.84259 17.5325 2.15515 17.8451C2.46771 18.1577 2.89163 18.3333 3.33366 18.3333H15.0003C15.4424 18.3333 15.8663 18.1577 16.1788 17.8451C16.4914 17.5325 16.667 17.1086 16.667 16.6666V10.8333"
                  stroke="#181818"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.417 2.0832C15.7485 1.75168 16.1981 1.56543 16.667 1.56543C17.1358 1.56543 17.5855 1.75168 17.917 2.0832C18.2485 2.41472 18.4348 2.86436 18.4348 3.3332C18.4348 3.80204 18.2485 4.25168 17.917 4.5832L10.0003 12.4999L6.66699 13.3332L7.50033 9.99986L15.417 2.0832Z"
                  stroke="#181818"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_6766_32777">
                  <rect width={20} height={20} fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
          <span className="text-title">Note</span>
        </label>
        <form
          className="form-add-note tf-mini-cart-tool-wrap"
          onSubmit={handleSubmit}
        >
          <fieldset className="d-flex">
            <textarea
              name="note"
              id="Cart-note"
              placeholder="Add special instructions for your order..."
              value={note}
              onChange={handleChange}
            />
          </fieldset>
          <div className="tf-cart-tool-btns">
            <button type="submit" className="btn-style-2 w-100">
              <span className="text text-btn-uppercase">Save</span>
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

export default OrderNote;
