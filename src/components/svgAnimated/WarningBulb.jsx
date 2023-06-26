import React from "react";

const WarningBulb = ({colour}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className=" m-auto bg-transparent block w-12 h-16"
      style={{shapeRendering:"auto"}}
   
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle cx="50" cy="23" r="13" fill={colour}>
        <animate
          attributeName="cy"
          dur="1s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.45 0 0.9 0.55;0 0.45 0.55 0.9"
          keyTimes="0;0.5;1"
          values="23;77;23"
        />
      </circle>
    </svg>
  );
};

export default WarningBulb;
