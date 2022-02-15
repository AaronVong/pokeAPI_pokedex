import { useState, React, Fragment, useEffect, useContext } from "react";
import PokeCardHead from "./PokeCardHead";
import PokeCardBody from "./PokeCardBody";
import PokeCardCmd from "./PokeCardCmd";
import PokeType from "../ultites/PokeType";
import Image from "../ultites/Image";
import { DisableCmdContext } from "../poekdex/pokedexPanel/pokemonDetails/PokeStats";
export default function PokeCardFront(props, context) {
  const [mainType, setMainType] = useState("");
  const [typeList, setTypeList] = useState([]);
  const disableCmd = useContext(DisableCmdContext);
  useEffect(() => {
    // Loading main type and type pill
    const types = props.data.types.map((type) => {
      const typeName = type.type.name;
      if ((typeName !== "normal" || mainType.length === 0) && type.slot === 1) {
        setMainType(typeName);
      } else if (props.data.types.length < 2) {
        setMainType(typeName);
      }
      return <PokeType key={type.slot} type={typeName} />;
    });
    setTypeList(types);
  }, [props.data.types]);
  return (
    <div className="h-full w-full">
      <PokeCardHead color={`${mainType}`}>
        <Image
          url={props.data.sprites.other["official-artwork"]["front_default"]}
          lazy={true}
          hoverScale={true}
          lazyTime={500}
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
          <div className="py-1 flex items-center justify-center flex-wrap gap-2">
            <strong className="mr-1">Type:</strong>
            <div className="flex justify-center items-center md:block">
              {typeList}
            </div>
          </div>
        </div>
        {!disableCmd && <PokeCardCmd pokeid={props.data.id} />}
      </PokeCardBody>
    </div>
  );
}
