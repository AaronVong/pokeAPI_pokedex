import React from "react";
export default function PokeType(props) {
  const capitalize = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };
  return (
    <span
      className={`px-2 py-1 mr-1 rounded-full bg-${props.type} capitalize text-xs lg:text-base`}
    >
      {capitalize(props.type)}
    </span>
  );
}
