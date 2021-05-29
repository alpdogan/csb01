import React from "react";
import { Button } from "@material-ui/core";

const TokenButton = ({ tokenName, src, handleClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => handleClick(tokenName)}
      style={{ margin: "0 5px 5px 0", width: "22%", minWidth: "100px" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2px",
          backgroundColor: "#ccc",
          width: "25px",
          height: "25px",
          borderRadius: "100%",
          marginRight: "1em"
        }}
      >
        <img src={src} height="20" width="20" alt={tokenName} />
      </div>
      {tokenName}
    </Button>
  );
};

export default TokenButton;
