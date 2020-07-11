import React from "react";
import { Breadcrumb, SimpleCard } from "matx";

const Finance = () => {
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Finance" }
          ]}
        />
      </div>
    </div>
  );
};

export default Finance;
