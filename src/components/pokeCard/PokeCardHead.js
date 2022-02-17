import React, { useEffect, useState } from "react";
export default function PokeCardHead(props) {
  const [style, setStyle] = useState("");
  useEffect(() => {
    const { types } = props;
    const len = types.length;
    if (len < 2) {
      setStyle(`bg-${types.at(0).type.name}`);
    } else {
      console.log();
      setStyle(
        `bg-gradient-to-r from-${types.at(0).type.name} to-${
          types.at(len - 1).type.name
        }`
      );
    }
  }, props.types);
  return <div className={`px-2 rounded-t-xl ${style}`}>{props.children}</div>;
}
