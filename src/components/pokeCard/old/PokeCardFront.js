import { useState, React, Fragment, useEffect } from "react";
import PokeCardHead from "../PokeCardHead";
import PokeCardBody from "../PokeCardBody";
import PokeCardCmd from "./PokeCardCmd";
import CardFaceWrap from "./CardFaceWrap";
export default function PokeCardFront(props) {
  const [mainType, setMainType] = useState("");
  const [typeList, setTypeList] = useState([]);
  const capitalize = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };
  useEffect(() => {
    const types = props.data.types.map((type, index) => {
      const typeName = type.type.name;
      if ((typeName !== "normal" || mainType.length === 0) && type.slot === 1) {
        setMainType(typeName);
      } else if (props.data.types.length < 2) {
        setMainType(typeName);
      }
      return (
        <span
          className={`px-2 py-1 mr-1 rounded-full bg-${typeName} capitalize`}
          key={type.slot}
        >
          {capitalize(typeName)}
        </span>
      );
    });
    setTypeList(types);
  }, [props.data.types]);
  return (
    <CardFaceWrap>
      <PokeCardHead color={`${mainType}`}>
        <img
          alt="pikachu"
          className="max-w-full h-auto hover:scale-110 transition-transform"
          src={props.data.image}
        />
      </PokeCardHead>
      <PokeCardBody>
        <div className="text-center py-1 md:py-0" name="short-detail">
          <p className="py-1">
            <strong className="mr-1">Name:</strong>
            <span className="px-1 capitalize font-semibold">
              {props.data.name}
            </span>
          </p>
          <p className="py-1">
            <strong className="mr-1">Type:</strong>
            <Fragment>{typeList}</Fragment>
          </p>
        </div>
        <PokeCardCmd flipCard={props.toggleFlip} />
      </PokeCardBody>
    </CardFaceWrap>
  );
}
