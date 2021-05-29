import React from "react";

function AmountInput({ amount, setAmount }) {
  return (
    <input
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      placeholder="0"
      type="number"
      dir="rtl"
      min="0"
      step="0.001"
      style={{
        padding: "1em",
        background: "#303030",
        color: "#ccc",
        flex: 1,
        border: "none"
      }}
    />
  );
}

export default AmountInput;
