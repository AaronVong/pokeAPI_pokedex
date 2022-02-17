import axios from "axios";

export function getChainData(chain) {
  if (chain["evolves_to"].length <= 0) {
    let { species, evolution_details } = chain;
    return [{ species, evolution_details }];
  }
  let { species, evolves_to, evolution_details } = chain;
  let chainArray = [
    {
      species,
      evolution_details,
    },
  ];
  for (let i = 0; i < evolves_to.length; i++) {
    chainArray.unshift(...getChainData(evolves_to[i]));
  }
  return chainArray;
}

export async function getPokemon(string) {
  try {
    const res = await axios(`${process.env.REACT_APP_API}pokemon/${string}`);
    const { data } = res;
    return data;
  } catch (error) {
    return error;
  }
}
