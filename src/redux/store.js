import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./reducers/PokemonReducer";
const store = configureStore({
  reducer: { pokemons: pokemonReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export default store;
