import React, { useState } from "react";

export default function ProductSearch() {
  const [selectedOption, setSelectedOption] = useState("All");

  const handleSelect = (value) => {
    setSelectedOption(value);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="form-search-select">
        <input type="text" placeholder="What are you looking for today?" />
        <button className="tf-btn">
          <span className="text">Search</span>
        </button>
      </div>
    </form>
  );
}
