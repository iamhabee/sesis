import React from "react";
import { Breadcrumb, SimpleCard } from "matx";

const Market = () => {
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Market" }
          ]}
        />
      </div>
    </div>
  );
};

export default Market;
