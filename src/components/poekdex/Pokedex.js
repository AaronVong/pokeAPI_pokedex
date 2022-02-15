import React from "react";
import PokeCard from "../pokeCard/PokeCard";
import { connect } from "react-redux";
import PokedexControl from "./PokedexControl";
import HrTag from "../ultites/HrTag";

class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeid: null,
    };
  }
  render() {
    const oldStyle =
      "w-full h-full p-2 gap-2 flex flex-wrap justify-center items-center sm:grid sm:grid-rows-3 sm:grid-cols-2 sm:justify-items-center md:grid-rows-2 md:grid-cols-3 lg:flex lg:flex-wrap";
    const items = this.props.pokemons.map((val, index) => {
      const frontData = {
        image: val.sprites.other["official-artwork"]["front_default"],
        types: [...val.types],
        id: val.id,
        name: val.name,
      };
      const backData = {
        description: "",
        image: val.sprites.other["official-artwork"]["front_default"],
        stats: [...val.stats],
        id: val.id,
        name: val.name,
        base_exp: val["base_experience"],
      };
      return <PokeCard data={val} key={val.id} />;
    });
    return (
      <div className="w-full h-auto">
        <div className="w-full h-full p-2 gap-2 grid grid-cols-2 grid-rows-1 justify-items-center md:grid-rows-2 md:grid-cols-3 lg:!flex lg:flex-wrap justify-center">
          {items}
        </div>
        <HrTag />
        <div>
          <PokedexControl />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pokemons: state.pokemons.pokemonList,
});
export default connect(mapStateToProps, null)(Pokedex);
