import React from "react";
export default function PokeCardCmd(props) {
  function handleClick() {
    props.flipCard();
  }
  return (
    <div className="py-1">
      <ul className="h-full flex flex-col text-md gap-2 justify-center items-center sm:flex-row">
        <li className="h-full flex justify-center items-center">
          <button className="bg-green-400 hover:bg-green-500 focus:ring-2 ring-green-400 justify-around rounded-full px-2 py-1">
            Detail
          </button>
        </li>
        <li className="h-full flex justify-center items-center">
          <button
            onClick={handleClick}
            className="bg-blue-400 hover:bg-blue-500 focus:ring-2 ring-blue-400 justify-around rounded-full px-2 py-1"
          >
            {props.isFlipped ? "Short" : "Stats"}
          </button>
        </li>
        <li className="h-full flex justify-center items-center">
          <button className="bg-gray-400 hover:bg-gray-500 focus:ring-2 ring-gray-400 justify-around rounded-full px-2 py-1">
            Compare
          </button>
        </li>
      </ul>
    </div>
  );
}
