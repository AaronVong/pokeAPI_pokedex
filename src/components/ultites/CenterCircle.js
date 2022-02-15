import React from "react";
import PropTypes from "prop-types";
export default function CenterCircle(props) {
  return (
    <div
      className={`absolute top-[10%] left-[10%] w-[80%] h-[80%] rounded-full z-[0] ${props.tailwindColor}`}
    ></div>
  );
}

CenterCircle.propTypes = {
  tailwindColor: PropTypes.string,
};

CenterCircle.defaultProps = {
  tailwindColor: "bg-white",
};
