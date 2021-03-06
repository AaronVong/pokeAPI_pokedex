import React from "react";
import PropTypes from "prop-types";
export default function HrTag(props) {
  return <div className={`${props.width} h-[1px] bg-gray-400 m-auto`}></div>;
}

HrTag.propTypes = {
  width: PropTypes.string,
};
HrTag.defaultProps = {
  width: "w-5/6",
};
