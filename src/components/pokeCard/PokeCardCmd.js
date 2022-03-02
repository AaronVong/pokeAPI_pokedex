import React from "react";
import { InformationCircleIcon } from "@heroicons/react/outline";
import { getPokemonDetail } from "../../redux/actions/PokemonAction";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
export default function PokeCardCmd(props) {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.pokemons.pokemonDetail);
  const handleClick = (e) => {
    const id = e.currentTarget.value;
    dispatch(getPokemonDetail(id));
    const pokemonDetailBlock = document.getElementById("pokemon_details");
    pokemonDetailBlock.scrollIntoView(false);
  };
  return (
    <div className="py-1">
      <ul className="h-full flex flex-col text-md gap-2 justify-center items-center sm:flex-row">
        <li className="h-full flex justify-center items-center">
          <button
            className="bg-green-400 hover:bg-green-500 focus:ring-2 ring-green-400 justify-around rounded-full px-2 py-1"
            value={props.pokeid}
            onClick={handleClick}
          >
            <InformationCircleIcon className="h-5 w-5" />
          </button>
        </li>
      </ul>
    </div>
  );
}

PokeCardCmd.propTypes = {
  pokeid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
