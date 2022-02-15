import { combineReducers } from "redux";
import pokemonReducer from "./PokemonReducer";
const rootReducer = combineReducers({ pokemons: pokemonReducer });
export default rootReducer;
