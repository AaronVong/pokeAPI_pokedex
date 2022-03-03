import React from "react";
import PropTypes from "prop-types";
export default function LoadingCircle(props) {
  return (
    <div
      className={`max-w-full h-full flex justify-center items-center ${props.tailwindClasses}`}
    >
      <svg className="w-10 h-10 animate-spin">
        <circle
          cx={15}
          cy={15}
          r={15}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={260}
          strokeDashoffset={190}
          className={`stroke-2 translate-x-[5px] translate-y-[5px] ${props.strokeColor}`}
        ></circle>
      </svg>
      <span className={`${props.textColor} relative`}>{props.text}</span>
    </div>
  );
}

LoadingCircle.prototype = {
  text: PropTypes.string,
  tailwindClasses: PropTypes.string,
  textColor: PropTypes.string,
  strokeColor: PropTypes.string,
};

LoadingCircle.defaultProps = {
  text: "Loading...",
  strokeColor: "stroke-gray-200",
  textColor: "text-red-500",
  tailwindClasses: "",
};
