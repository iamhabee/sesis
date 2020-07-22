import React from "react";

const Brand = ({ children }) => {
  return (
    <div className="flex items-center justify-between brand-area">
      <div className="flex items-center brand">
        <img src="/assets/images/cubevest.png" alt="company-logo" />
      </div>
      {children}
    </div>
  );
};

export default Brand;
