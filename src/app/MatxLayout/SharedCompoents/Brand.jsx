import React from "react";
import logo from "../../../assets/cubeVest.png"

const Brand = ({ children }) => {
  return (
    <div className="flex items-center justify-between brand-area">
      <div className="flex items-center brand">
        <img src={logo} alt="company-logo" />
      </div>
      {children}
    </div>
  );
};

export default Brand;
