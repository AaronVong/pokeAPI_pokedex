import React from "react";
import NavBar from "./infoPanel/NavBar";
import PokeStats from "./pokemonDetails/PokeStats";
import { connect } from "react-redux";
import PokeEvols from "./pokemonDetails/PokeEvols";
import NotFound from "../../ultites/NotFound";
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
    };
  }

  tabsSwitch = (e) => {
    if (!this.props.pokemonDetail) return;
    this.setState({ tabName: e.currentTarget.name });
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
          return <NotFound />;
        case TabName.WEAK_STRONG:
          return <NotFound />;
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
        <div className="w-full">{this.props.pokemonDetail && tab()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pokemonDetail: state.pokemons.pokemonDetail,
});

export default connect(mapStateToProps, null)(RightSide);
