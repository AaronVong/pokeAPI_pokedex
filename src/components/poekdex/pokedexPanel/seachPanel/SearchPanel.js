import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchPokemon } from "../../../../redux/actions/PokemonAction";
import PokeCard from "../../../pokeCard/PokeCard";
import LoadingCircle from "../../../ultites/LoadingCircle";
import ErrorMessage from "../../../ultites/ErrorMessage";
import ActionTypes from "../../../../redux/ActionTypes";
export default function SearchPanel(props) {
  const [text, setText] = useState("");
  const searching = useSelector((state) => state.pokemons.searching);
  const error = useSelector((state) => state.pokemons.error);
  const searchError = useSelector((state) => state.pokemons.searchError);
  const pokemon = useSelector((state) => state.pokemons.pokemon);
  const dispatch = useDispatch();
  // handle submit event
  const handleSearch = (e) => {
    e.preventDefault();
    setText("");
    if (!text) {
      dispatch({
        type: ActionTypes.POKEMON_NOT_FOUND,
        payload: { error: true, searchError: "Field can't be empty!" },
      });
      return;
    }
    dispatch(searchPokemon(text.toLocaleLowerCase()));
  };
  // handle change event
  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <div className="h-full flex flex-col gap-2">
      <div className="w-full h-auto">
        <form onSubmit={handleSearch} className="">
          <input
            type="text"
            placeholder="Name or Id ..."
            className="p-1 w-1/2"
            name="text"
            value={text}
            onChange={handleChange}
          ></input>
          <button
            type="submit"
            className="bg-gray-100 px-2 py-1 hover:bg-gray-200"
          >
            Search
          </button>
        </form>
      </div>
      {
        // Searching loading message
        searching && (
          <div className="w-32 h-24">
            <LoadingCircle text="Searching..." strokeColor="stroke-red-400" />
          </div>
        )
      }
      {
        // Display Erorr
        error && <ErrorMessage message={searchError} />
      }
      {/* Display Result */}
      <div className="w-auto h-auto">
        {!pokemon || searching ? "" : <PokeCard data={pokemon} />}
      </div>
    </div>
  );
}
