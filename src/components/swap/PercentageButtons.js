import React from "react";
import { Button } from "@material-ui/core";

function PercentageButtons({ setPercentage }) {
  return (
    <div>
      <Button onClick={() => setPercentage(0.25)} variant="outlined">
        25%
      </Button>
      <Button onClick={() => setPercentage(0.5)} variant="outlined">
        50%
      </Button>
      <Button onClick={() => setPercentage(0.75)} variant="outlined">
        75%
      </Button>
      <Button onClick={() => setPercentage(1)} variant="outlined">
        100%
      </Button>
    </div>
  );
}

export default PercentageButtons;
