import React, { lazy } from "react";
import NavBar from "./infoPanel/NavBar";
import PokeStats from "./pokemonDetails/PokeStats";
import { connect } from "react-redux";
import PokeEvols from "./pokemonDetails/PokeEvols";
import NotFound from "../../ultites/NotFound";
import Image from "../../ultites/Image";
import PokeMoves from "./pokemonDetails/PokeMoves";
const TabName = {
  STATS: "STATUS",
  MOVES: "MOVES",
  EVOLS: "EVOLUTIONS",
  WEAK_STRONG: "WEAK_STRONG",
  LOCATION: "LOCATION",
};
export const TabNameContext = React.createContext(TabName);
class RightSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabName: TabName.STATS,
      rememberPage: null,
    };
  }

  componentDidUpdate(preProps, preState) {
    if (this.props.pokemonDetail == null || preProps.pokemonDetail == null)
      return;
    // if choose pokemon detail change tab to STATS and set rememberPage = null
    if (preProps.pokemonDetail.id != this.props.pokemonDetail.id) {
      this.setState({ tabName: TabName.STATS, rememberPage: null });
    }
  }
  setPage = (page) => {
    this.setState({ rememberPage: page });
  };
  tabsSwitch = (e) => {
    const tabName = e.currentTarget.name;
    if (!this.props.pokemonDetail && tabName != TabName.WEAK_STRONG) return;
    this.setState({ tabName });
  };
  render() {
    const tab = () => {
      switch (this.state.tabName) {
        case TabName.STATS:
          return <PokeStats />;
        case TabName.EVOLS:
          return <PokeEvols />;
        case TabName.LOCATION:
          return <NotFound />;
        case TabName.MOVES:
          return (
            <PokeMoves page={this.state.rememberPage} setPage={this.setPage} />
          );
        case TabName.WEAK_STRONG:
          return (
            <div className="w-full flex flex-col justify-center items-center gap-2 py-1">
              <div className="text-center">
                <a
                  className="px-2 py-1 bg-sky-400 text-white hover:bg-sky-500 rounded-xl"
                  target="_blank"
                  href="images/typechart.png"
                >
                  Big size
                </a>
              </div>
              <div className="w-4/6">
                <Image url={"images/typechart.png"} lazy={false} />
              </div>
            </div>
          );
        default:
          return <PokeStats />;
      }
    };
    return (
      <div className="w-full bg-white">
        <TabNameContext.Provider value={TabName}>
          <NavBar
            handleTabSwitch={this.tabsSwitch}
            activeTab={this.state.tabName}
          />
        </TabNameContext.Provider>
        <div className="w-full" id="pokemon_details">
          {this.props.pokemonDetail || this.state.tabName == TabName.WEAK_STRONG
            ? tab()
            : ""}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pokemonDetail: state.pokemons.pokemonDetail,
});

export default connect(mapStateToProps, null)(RightSide);
