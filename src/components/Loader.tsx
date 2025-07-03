import React from "react";
import { ClipLoader } from "react-spinners";

const Loader: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height:"100%",
        alignItems:"center"
        // margin: "50px 0 0",
      }}
    >
      <ClipLoader color="#FF0051" size={60} />
    </div>
  );
};

export default Loader;
