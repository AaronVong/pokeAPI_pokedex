import React from "react";
import Pokedex from "./components/poekdex/Pokedex";
import PokedexPanel from "./components/poekdex/pokedexPanel/PokedexPanel";
import { getPokemonTypes } from "./redux/actions/PokemonAction";
import { connect } from "react-redux";
import HrTag from "./components/ultites/HrTag";
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getPokemonTypes();
  }

  render() {
    return (
      <div className="w-full h-full p-1">
        <h1 className="text-5xl text-center py-2 font-light">
          Pokedex with PokeAPI
        </h1>
        <HrTag />
        <div className="w-full min-h-max">
          <PokedexPanel />
        </div>
        <div className="w-full">
          <h3 className="text-center font-medium text-3xl py-2">Pokedex</h3>
          <HrTag />
          <Pokedex />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pokemons: state.pokemons.pokemonList,
  pokemonResources: state.pokemons.resource,
});
export default connect(mapStateToProps, { getPokemonTypes })(App);
