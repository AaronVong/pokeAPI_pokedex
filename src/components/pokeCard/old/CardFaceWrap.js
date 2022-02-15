import React from "react";
import PropTypes from "prop-types";
export default function CardFaceWrap(props) {
  return (
    <div
      className={`w-full h-full grid grid-flow-row divide-y rounded-xl absolute top-0 left-0 [backface-visibility:hidden] ${props.tailwindClasses}`}
    >
      {props.children}
    </div>
  );
}

CardFaceWrap.propTypes = {
  tailwindClasses: PropTypes.string,
};

CardFaceWrap.defaultProp = {
  tailwindClasses: "",
};
