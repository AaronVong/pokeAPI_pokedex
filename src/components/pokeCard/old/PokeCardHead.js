import React from "react";
import PropTypes from "prop-types";
export default function PokeCardHead(props) {
  return (
    <div className={`row-span-3 px-2 rounded-t-xl bg-${props.color}`}>
      {props.children}
    </div>
  );
}

PokeCardHead.propTypes = {
  color: PropTypes.string,
};

PokeCardHead.defaultProps = {
  color: "sky-400",
};
