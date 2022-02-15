import React from "react";

export default function PokeCardBody(props) {
  return (
    <div className="w-full row-span-3 flex flex-col justify-between bg-sky-400 divide-y rounded-b-xl">
      {props.children}
    </div>
  );
}
