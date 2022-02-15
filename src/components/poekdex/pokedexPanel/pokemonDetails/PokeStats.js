import { useSelector } from "react-redux";
import StatDisplay from "../../../ultites/StatDisplay";
import React from "react";
import PokeCard from "../../../pokeCard/PokeCard";

export const DisableCmdContext = React.createContext(false);
export default function PokeStats(props) {
  const pokemon = useSelector((state) => state.pokemons.pokemonDetail);
  const heighestBaseStat = Math.max(
    ...pokemon.stats.map((stat) => stat["base_stat"])
  );
  const statList = pokemon.stats.map((stat, index) => {
    return <StatDisplay data={stat} key={index} heighest={heighestBaseStat} />;
  });
  return (
    <div className="flex flex-col lg:flex-row gap-2 p-1">
      <DisableCmdContext.Provider value={true}>
        <PokeCard data={pokemon} />
      </DisableCmdContext.Provider>
      <div className="w-full h-auto bg-white p-2">
        <div className="flex flex-col gap-2 w-full min-h-6">{statList}</div>
      </div>
    </div>
  );
}
