import React from "react";
import PropTypes from "prop-types";

export default function ErrorMessage(props) {
  return (
    <span className="text-base text-red-600 p-2 font-bold">
      {props.message}
    </span>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

ErrorMessage.defaultProps = {
  message: "Error!!",
};
