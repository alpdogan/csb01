import React, { useState } from "react";
import { Button } from "@material-ui/core";

import AmountInput from "./AmountInput";

export default function WbtcField() {
  const [amount, setAmount] = useState("0.0");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        border: "1px solid #000",
        padding: "5px",
        borderRadius: "5px"
      }}
    >
      <Button style={{ minWidth: "100px" }} variant="outlined">
        <img
          style={{ borderRadius: "100%" }}
          src="https://ethplorer.io/images/wbtc.png"
          height="20px"
          alt="WBTC"
        />
        WBTC
      </Button>
      <AmountInput setAmount={setAmount} />
    </div>
  );
}
