import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Menu, MenuItem, Button } from "@material-ui/core";
import TokenButton from "./TokenButton";
import Coin from "./assets/coin.png";

const tokenData = {
  BNB: {
    name: "BNB",
    image: "https://cryptologos.cc/logos/binance-coin-bnb-logo.svg"
  },
  BUSD: {
    name: "BUSD",
    image: "https://cryptologos.cc/logos/binance-usd-busd-logo.svg"
  }
};

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: "#eee",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

export default function CustomizedMenus({ token, setToken }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tokenInput, setTokenInput] = React.useState("");
  const [tokenInfo, setTokenInfo] = React.useState(null);
  const [selectedToken, setSelectedToken] = React.useState(null);

  const fetchTokenData = () => {
    const apiKey = "EK-g5dgo-JLrTfuh-oodJw";
    console.log(tokenInput);
    const address = tokenInput;
    fetch(
      "https://api.ethplorer.io/getTokenInfo/" + address + "?apiKey=" + apiKey
    )
      .then((response) => response.json())
      .then((data) => setTokenInfo(data));
  };

  const handleClick = (event) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTokenSelect = (tokenName) => {
    setToken(tokenData[tokenName]);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <div
          style={{
            backgroundColor: "#ccc",
            borderRadius: "100%",
            marginRight: "1em",
            width: "25px",
            height: "25px",
            objectFit: "contain"
          }}
        >
          <img
            src={"https://ethplorer.io" + token.image}
            alt={token.name}
            height="20px"
            style={{
              borderRadius: "100%"
            }}
          />
        </div>
        {token.symbol}
      </Button>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <div>
            <div>Select a Token</div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center"
              }}
            >
              {Object.keys(tokenData).map((token) => (
                <TokenButton
                  handleClick={handleTokenSelect}
                  src={tokenData[token].image}
                  tokenName={tokenData[token].name}
                />
              ))}
            </div>
          </div>
        </StyledMenuItem>
        <StyledMenuItem>
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <TextField
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              onBlur={() => fetchTokenData(tokenInput)}
              fullWidth
              variant="outlined"
              label="Search Token Ticker"
            />
            {tokenInfo && (
              <Button
                fullWidth
                variant="outlined"
                onClick={() => console.log("hello")}
              >
                <img
                  src={"https://ethplorer.io/" + tokenInfo.image}
                  alt={tokenInfo.name}
                  width="25px"
                />
                {tokenInfo.name}
              </Button>
            )}
          </div>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
