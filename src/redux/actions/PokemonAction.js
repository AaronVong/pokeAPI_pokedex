import ActionTypes from "../ActionTypes";
import axios from "axios";
import { getChainData, getPokemon } from "../../helpers/helperFunctions";
const searchAction = {
  type: ActionTypes.START_SEARCH_ACTION,
  payload: {
    error: false,
    searchError: null,
    fetchError: null,
    searching: true,
  },
};
export function fetchPokemonList(
  resource = null,
  config = { offset: null, limit: null }
) {
  const pokemonApi = process.env.REACT_APP_API;
  let resourceApi = resource;
  if (config.offset || config.limit) {
    resourceApi = `${pokemonApi}pokemon/${
      config.offset != null
        ? config.limit != null
          ? "?offset=" + config.offset + "&limit=" + config.limit
          : "?offset=" + config.offset
        : config.limit != null
        ? "?limit=" + config.limit
        : ""
    }`;
  }
  return async function (dispatch) {
    try {
      const resourceResponse = await fetch(resourceApi);
      const resource = await resourceResponse.json();
      let pokemonList = await Promise.all(
        resource.results.map(async (value) => {
          const pokemonResponse = await fetch(value.url);
          const pokemon = await pokemonResponse.json();
          return pokemon;
        })
      );
      dispatch({
        type: ActionTypes.GET_POKEMONS,
        payload: { resource, pokemonList },
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.GET_POKEMONS_FAIL,
        payload: error.meesage(),
      });
    }
  };
}

export function searchPokemon(string) {
  return async function (dispatch, getState) {
    dispatch(searchAction);
    if (getState().pokemons.searchHistory[string]) {
      dispatch({
        type: ActionTypes.FOUND_POKEMON,
        payload: {
          pokemon: getState().pokemons.searchHistory[string],
        },
      });
    } else {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}pokemon/${string}`
        );
        const { data: pokemon } = res;
        dispatch({
          type: ActionTypes.FOUND_POKEMON,
          payload: {
            pokemon,
          },
        });
        dispatch({
          type: ActionTypes.ADD_TO_SEARCH_HISTORY,
          payload: { pokemon },
        });
      } catch (error) {
        const { data: message } = error.response;
        dispatch({
          type: ActionTypes.POKEMON_NOT_FOUND,
          payload: { searchError: message, error: true },
        });
      }
    }

    dispatch({
      type: ActionTypes.END_SEARCH_ACTION,
      payload: { searching: false },
    });
  };
}

export function getPokemonDetail(id) {
  // this only get detail of pokemon from fetched data in pokedex or searching result
  return async function (dispatch, getState) {
    const state = getState();
    const pokeList = [...state.pokemons.pokemonList];
    const pokemon = { ...state.pokemons.pokemon };
    let foundPokemon = null;
    // get pokemon detail data
    if (pokemon && pokemon["id"] == id) {
      foundPokemon = pokemon;
    } else {
      for (let i = 0; i < pokeList.length; i++) {
        if (pokeList[i].id == id) {
          foundPokemon = pokeList[i];
          break;
        }
      }
    }
    dispatch({
      type: ActionTypes.GET_POKEMON_DETAILS,
      payload: { pokemon: foundPokemon },
    });
    if (foundPokemon) {
      const isPokemonInChain = state.pokemons.evolChains.find(
        (val) => val.pokemon.name == foundPokemon.name
      );
      if (isPokemonInChain) return;
      const chainData = await getEvolsChain(foundPokemon.id);
      const dumpArray = [];
      for (let i = chainData.length - 1; i >= 0; i--) {
        const pokemon = await getPokemon(chainData[i].species.name);
        dumpArray.push({
          pokemon,
          evolution_details: chainData[i].evolution_details,
        });
      }
      dispatch({
        type: ActionTypes.GET_EVOLS_CHAIN,
        payload: { chainData: dumpArray },
      });
    }
  };
}

async function getEvolsChain(id) {
  try {
    const response = await axios(
      `${process.env.REACT_APP_API}pokemon-species/${id}`
    );
    const { data: species } = response;
    const evolChain = await axios(species["evolution_chain"].url);
    const { data: chain } = evolChain;
    const chainData = await getChainData(chain.chain);
    return chainData;
    // dispatch({ type: ActionTypes.GET_EVOLS_CHAIN, payload: { chainData } });
  } catch (error) {
    console.log(error);
  }
  return [];
}
