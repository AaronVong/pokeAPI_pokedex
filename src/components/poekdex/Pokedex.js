import React from "react";
import PokeCard from "../pokeCard/PokeCard";
import { connect } from "react-redux";
import PokedexControl from "./PokedexControl";
import HrTag from "../ultites/HrTag";
import LoadingCircle from "../ultites/LoadingCircle";
class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  setLoading = () => {
    this.setState((preState) => ({ loading: !preState.loading }));
  };
  render() {
    const oldStyle =
      "w-full h-full p-2 gap-2 flex flex-wrap justify-center items-center sm:grid sm:grid-rows-3 sm:grid-cols-2 sm:justify-items-center md:grid-rows-2 md:grid-cols-3 lg:flex lg:flex-wrap";
    const items = this.props.pokemons.map((val, index) => {
      return <PokeCard data={val} key={val.id} />;
    });
    return (
      // pokedex display down here
      <div className="w-full h-auto relative">
        {this.state.loading && (
          <React.Fragment>
            <div className="absolute top-0 left-0 w-full h-full cursor-wait z-10 bg-gray-50 bg-opacity-10"></div>
            <LoadingCircle
              strokeColor="stroke-black"
              textColor="text-black"
              tailwindClasses="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg"
            />
          </React.Fragment>
        )}
        <div className="w-full h-full p-2 gap-2 grid grid-cols-2 grid-rows-1 justify-items-center md:grid-rows-2 md:grid-cols-3 lg:!flex lg:flex-wrap justify-center">
          {items}
        </div>
        <HrTag />
        <div>
          <PokedexControl
            loading={this.state.loading}
            setLoading={this.setLoading}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pokemons: state.pokemons.pokemonList,
});
export default connect(mapStateToProps, null)(Pokedex);
