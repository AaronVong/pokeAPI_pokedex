import { Fragment, useRef, useState } from "react";
import PokeType from "../../../../ultites/PokeType";

export default function TableRow({ move }) {
  const [showDescribe, setShowDescrie] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const contentBox = useRef(null);
  const toggleShowDescribe = (e) => {
    setShowDescrie(!showDescribe);
    if (!showDescribe == false) {
      setShowDetail(false);
    }
    if (!showDescribe) {
      e.currentTarget.classList.add("bg-gray-200");
    } else {
      e.currentTarget.classList.remove("bg-gray-200");
    }
  };
  const toggleShowDetail = () => {
    setShowDetail(!showDetail);
  };
  return (
    <Fragment>
      <tr className="border capitalize">
        <td className="border text-center">
          <button
            onClick={toggleShowDescribe}
            type="button"
            className="text-blue-500 underline hover:text-blue-600 cursor-pointer capitalize"
          >
            {move.name.replace("-", " ")}
          </button>
        </td>
        <td className="border">
          <ul className="list-none flex flex-wrap divide-x-2">
            <li className="basis-1/3 px-2 py-1 flex gap-2">
              <span className="font-bold">accuracy:</span>
              <span>{move.accuracy || "??"}</span>
            </li>
            <li className="basis-1/3 px-2 py-1 flex gap-2">
              <span className="font-bold">power:</span>
              <span>{move.power || "??"}</span>
            </li>
            <li className="basis-1/3 px-2 py-1 flex gap-2">
              <span className="font-bold">pp:</span>
              <span>{move.pp || "??"}</span>
            </li>
          </ul>
        </td>
        <td className="flex flex-col items-center justify-center gap-2 px-2 py-1  lg:flex-row">
          <PokeType type={move.type.name} />
        </td>
      </tr>
      {showDescribe && (
        <tr className="bg-gray-200">
          <td colSpan={3} className="p-2">
            <div ref={contentBox}>
              {move.effect_entries.length <= 0 ? (
                <div>
                  <p>No describe</p>
                </div>
              ) : (
                move.effect_entries.map((entry, index) => (
                  <div>
                    {showDetail ? (
                      <Fragment>
                        <p key={index}>
                          {entry.effect.replace(
                            "$effect_chance",
                            move.effect_chance
                          )}
                        </p>
                        <button
                          onClick={toggleShowDetail}
                          className="underline text-sky-500 hover:text-sky-600 text-sm"
                        >
                          Short
                        </button>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <p>
                          {entry.short_effect.replace(
                            "$effect_chance",
                            move.effect_chance
                          )}
                        </p>
                        <button
                          onClick={toggleShowDetail}
                          className="underline text-sky-500 hover:text-sky-600 text-sm"
                        >
                          Detail
                        </button>
                      </Fragment>
                    )}
                  </div>
                ))
              )}
            </div>
          </td>
        </tr>
      )}
    </Fragment>
  );
}
