import React, { useEffect } from "react";
import { BsCheck2Circle } from "react-icons/bs";
function PlaceOrder({ setCartCount }) {
  useEffect(() => {
    setCartCount(0);
    localStorage.clear();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bolder",
        fontSize: "30px",
        color: "green",
        marginTop: "100px",
      }}
    >
      <span>Your order placed succeessfully!</span>
      <span>Thank you For Shopping!</span>
      <BsCheck2Circle style={{ height: "200px", width: "200px" }} />
    </div>
  );
}

export default PlaceOrder;
