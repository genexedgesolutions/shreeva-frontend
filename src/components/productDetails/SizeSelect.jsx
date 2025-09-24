import { useContextElement } from "@/context/Context";
import { useEffect } from "react";

export default function SizeSelect({
  activeSize,
  setActiveSize,
  filterSizes = [],
  productId = "",
}) {
  const { cartProducts } = useContextElement();
  const handleChange = (variantId) => {
    setActiveSize(variantId);
  };

  const getSelectedSize = () => {
    const selectedVariant = filterSizes.find(
      (item) => item.variantId === activeSize
    );
    return selectedVariant ? selectedVariant.size : "None";
  };
  // ✅ Check if already selected size exists in cart
  useEffect(() => {
    const cartItem = cartProducts.find((item) => item._id === productId);
    if (cartItem && cartItem.activeSize) {
      setTimeout(() => {
        setActiveSize(cartItem.activeSize);
      }, 0); // Microtask delay to prevent conflict
    }else if (filterSizes.length > 0) {
      // Set default to first size in list
      setTimeout(() => {
        setActiveSize(filterSizes[0].variantId);
      }, 0);
    }
  }, [cartProducts, productId]);
  return (
    <div className="variant-picker-item">
      {/* <div className="d-flex justify-content-between mb_12">
        <div className="variant-picker-label">
          Selected Size:
          <span className="text-title variant-picker-label-value">
            {getSelectedSize()}
          </span>
        </div>
      </div> */}

      {/* <div className="variant-picker-values gap12">
        {filterSizes.map((item) => (
          <div
            key={`${item.variantId}-${item.size}`} // Unique key
            onClick={() => handleChange(item.variantId)}
          >
            <input
              type="radio"
              id={`size-${item.variantId}`}
              checked={activeSize === item.variantId}
              readOnly
            />
            <label
              className="style-text size-btn "
              htmlFor={`size-${item.variantId}`}
            >
              <span className="text">{item.size}</span>
            </label>
          </div>
        ))}
      </div> */}
    </div>
  );
}
