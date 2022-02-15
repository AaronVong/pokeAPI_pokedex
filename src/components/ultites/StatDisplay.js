import React from "react";

export default function StatDisplay(props) {
  const number = (props.data["base_stat"] * 100) / props.heighest;
  const width = {
    width: number + "%",
  };
  const replaceStatName = (string) => {
    return string.replace("special-", "Sp ");
  };
  return (
    <div className="flex flex-col gap-x-1 h-full justify-center md:flex-row md:justify-start md:items-center">
      <strong className="md:basis-2/6 lg:basis-24 capitalize text-sm">
        {replaceStatName(props.data.stat.name)}:
      </strong>
      <div className="w-full h-5 rounded-full bg-gray-200 relative md:basis-4/6 lg:basis-3/6 transition-[width]">
        <div
          className="text-center bg-red-500 h-full absolute top-0 left-0 rounded-xl transition-[width]"
          style={width}
        >
          <span className="text-white text-sm">{props.data["base_stat"]}</span>
        </div>
      </div>
    </div>
  );
}
