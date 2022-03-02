import ActionTypes from "../ActionTypes";
const initState = {
  resource: {},
  pokemonList: [],
  pokemon: null,
  searchHistory: {},
  error: false,
  searchError: null,
  fetchError: null,
  searching: false,
  pokemonDetail: null,
  evolChains: [],
  pokemonDetail_moves: [],
};

/**
 * searchHistory: Map
 * ["pokemon_name, pokemon_id", pokemon_data: {}Object ]
 */
export default function pokemonReducer(state = initState, action) {
  switch (action.type) {
    case ActionTypes.GET_POKEMONS:
      return {
        ...state,
        resource: { ...action.payload.resource },
        pokemonList: [...action.payload.pokemonList],
      };
    case ActionTypes.FOUND_POKEMON:
      return {
        ...state,
        pokemon: { ...action.payload.pokemon },
      };
    case ActionTypes.START_SEARCH_ACTION:
      return {
        ...state,
        error: false,
        searchError: "",
        fetchError: "",
        searching: action.payload.searching,
      };
    case ActionTypes.POKEMON_NOT_FOUND:
      return {
        ...state,
        error: action.payload.error,
        searchError: action.payload.searchError,
        searching: action.payload.searching,
      };
    case ActionTypes.END_SEARCH_ACTION:
      return {
        ...state,
        searching: action.payload.searching,
      };
    case ActionTypes.ADD_TO_SEARCH_HISTORY: {
      const key = action.payload.pokemon.name;
      return {
        ...state,
        searchHistory: {
          [key]: {
            ...action.payload.pokemon,
          },
          ...state.searchHistory,
        },
      };
    }
    case ActionTypes.GET_POKEMON_DETAILS: {
      return {
        ...state,
        pokemonDetail: { ...action.payload.pokemon },
      };
    }
    case ActionTypes.GET_EVOLS_CHAIN:
      return {
        ...state,
        evolChains: [...action.payload.chainData],
      };
    case ActionTypes.GET_MOVES_INFO: {
      return {
        ...state,
        pokemonDetail_moves: [...action.payload],
      };
    }
    default:
      return {
        ...state,
      };
  }
}
