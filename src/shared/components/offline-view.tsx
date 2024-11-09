import React from "react";
import FallBackLayout from "../layouts/fall-back-layout";

const Offline = () => {
  return (
    <FallBackLayout customContent>
      <div className="d-flex flex-column gap-3 justify-content-center align-items-center h-full w-full">
        <div className="position-relative">
          <div className="wifi-symbol">
            <div className="wifi-circle top-to-bottom-animate first"></div>
            <div className="wifi-circle top-to-bottom-animate second"></div>
            <div className="wifi-circle top-to-bottom-animate third"></div>
            <div className="wifi-circle top-to-bottom-animate fourth"></div>
          </div>
        </div>
        <h3
          style={{
            marginTop: "5rem",
            maxWidth:"50vw",
            wordBreak:"break-all",
            whiteSpace:"pre-wrap",
            textAlign:"center"
          }}
        >
          It seems you lost your connection, Check your internet connection and try again
        </h3>
      </div>
    </FallBackLayout>
  );
};

export default Offline;
