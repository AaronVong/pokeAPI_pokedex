import { useSelector } from "react-redux";
import { Fragment } from "react";
import EvolvesArrow from "../../../ultites/EvolvesArrow";
import PokeCard from "../../../pokeCard/PokeCard";
export default function PokeEvols(props) {
  const evolvesChain = useSelector((state) => state.pokemons.evolChains);
  const customStyle =
    "w-2/5 min-h-content max-h-content p-1 md:w-1/5 lg:basis-2/5 xl:basis-1/4";
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
          />
          <PokeCard data={pokemon.pokemon} customStyle={customStyle} />
        </Fragment>
      );
    }
  });
  return (
    <div className="w-full py-3 flex flex-col items-center justify-around md:flex-row lg:justify-evenly lg:items-center xl:flex-wrap">
      {evolvesList}
    </div>
  );
}
