import { CurrencyList } from "../../currencyList";
import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";

export const CurrencyChangeButton = ({ buttonName, context }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        // id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ fontWeight: "bold" }}
      >
        {buttonName ? buttonName : "brak propsa"}
      </Button>
      <Menu
        // id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <CurrencyList context={context} closeList={handleClose} />
      </Menu>
    </div>
  );
};
