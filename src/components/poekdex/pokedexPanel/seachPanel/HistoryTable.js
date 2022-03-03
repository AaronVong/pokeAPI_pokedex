import { React } from "react";
import { useSelector, useDispatch } from "react-redux";
import ActionTypes from "../../../../redux/ActionTypes";

export default function HistoryTable(props) {
  const searchHistory = useSelector((state) => state.pokemons.searchHistory);
  const pokemon = useSelector((state) => state.pokemons.pokemon);
  const dispatch = useDispatch();
  const items = [];
  const handleSelectFoundedPokemon = (e) => {
    const pokemonName = e.currentTarget.value;
    const selected = searchHistory[pokemonName];
    if (pokemonName == pokemon.name) return;
    dispatch({
      type: ActionTypes.START_SEARCH_ACTION,
      payload: { searching: true },
    });
    dispatch({
      type: ActionTypes.FOUND_POKEMON,
      payload: { pokemon: selected },
    });
    setTimeout(() => {
      dispatch({
        type: ActionTypes.END_SEARCH_ACTION,
        payload: { searching: false },
      });
    }, 300);
  };
  for (const key in searchHistory) {
    items.push(
      <button
        type="button"
        className="underline text-blue-700 hover:text-blue-800 cursor-pointer py-1"
        key={key}
        value={key}
        onClick={handleSelectFoundedPokemon}
      >
        <span className="capitalize">
          {key},{searchHistory[key].id}
        </span>
      </button>
    );
  }

  return (
    <div className="w-full h-[300px] flex flex-col">
      <div className="h-auto">
        <h5 className="py-2 text-center font-semibold">Searching History</h5>
      </div>
      <div className="bg-white flex flex-col rounded-xl items-center gap-2 overflow-y-scroll h-full py-2">
        {items}
      </div>
    </div>
  );
}
