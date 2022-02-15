import { useSelector } from "react-redux";
import { Fragment } from "react";
import EvolvesArrow from "../../../ultites/EvolvesArrow";
import PokeCard from "../../../pokeCard/PokeCard";
export default function PokeEvols(props) {
  const evolvesChain = useSelector((state) => state.pokemons.evolChains);
  const customStyle =
    "w-4/5 min-h-content max-h-content p-1 sm:w-3/5 md:w-2/4 lg:basis-3/5 xl:basis-1/4";
  const evolvesList = evolvesChain.map((pokemon, index) => {
    if (pokemon.evolution_details.length <= 0) {
      return (
        <Fragment key={index}>
          <PokeCard data={pokemon.pokemon} customStyle={customStyle} />
        </Fragment>
      );
    } else {
      return (
        <Fragment key={index}>
          <EvolvesArrow
            condition={pokemon.evolution_details[0].trigger.name.replace(
              "-",
              " "
            )}
            extraCondition={
              pokemon.evolution_details[0].min_level ||
              pokemon.evolution_details[0].item
                ? pokemon.evolution_details[0].item.name
                : ""
            }
          />
          <PokeCard data={pokemon.pokemon} customStyle={customStyle} />
        </Fragment>
      );
    }
  });
  return (
    <div className="w-full py-3 flex flex-col items-center justify-around lg:flex-row lg:justify-evenly lg:items-center">
      {evolvesList}
    </div>
  );
}
