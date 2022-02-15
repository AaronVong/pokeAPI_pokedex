import React from "react";
import PropTypes from "prop-types";
export default function PokeImg(props) {
  return (
    <div className="w-full h-auto box-border">
      <img
        alt="pikachu"
        className="max-w-full h-auto"
        src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
      />
    </div>
  );
}

PokeImg.propTypes = {
  pokemonPhoto: PropTypes.object,
};
