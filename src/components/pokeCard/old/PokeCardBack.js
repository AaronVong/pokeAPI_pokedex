import React from "react";
import StatDisplay from "../../ultites/StatDisplay";
import PokeCardCmd from "./PokeCardCmd";
import PokeCardHead from "../PokeCardHead";
import PokeCardBody from "../PokeCardBody";
import CardFaceWrap from "./CardFaceWrap";
export default function PokeCardBack(props) {
  const statList = props.data.stats.map((stat, index) => (
    <StatDisplay data={stat} key={index} />
  ));
  return (
    <CardFaceWrap tailwindClasses="gap-1 [transform:rotateY(180deg)] bg-sky-400">
      <PokeCardHead>
        <h5 className=" text-center text-xl font-bold capitalize">
          {props.data.name}
        </h5>
        <p className="text-xl text-center font-extrabold py-1 flex justify-center items-center">
          <img src={props.data.image} className="w-2/6 h-2/6"></img>#
          {props.data.id}
        </p>
        <p className="">
          <strong className="px-1">Base Experience:</strong>
          <span className="px-1 text-lg">{props.data["base_exp"]}</span>
        </p>
      </PokeCardHead>
      <PokeCardBody>
        <div className="flex flex-col gap-2 w-full min-h-6 p-2">{statList}</div>
        <div className="">
          <PokeCardCmd isFlipped={props.isFlipped} flipCard={props.flipCard} />
        </div>
      </PokeCardBody>
    </CardFaceWrap>
  );
}
