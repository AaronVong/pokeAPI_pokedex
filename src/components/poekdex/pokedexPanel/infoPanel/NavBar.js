import { React, useState, useEffect, useContext } from "react";
import { MenuIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { TabNameContext } from "../RightSide";
export default function NavBar(props) {
  const [showMenu, setShowMenu] = useState(false);
  const pokemonDetail = useSelector((state) => state.pokemons.pokemonDetail);
  const TabName = useContext(TabNameContext);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const showMenuStyle = {
    height: "200px",
  };
  const hiddenMenuStyle = {
    height: "0px",
  };

  const onTabSwitch = (e) => {
    props.handleTabSwitch(e);
    setShowMenu(false);
  };
  const activeTabStyle = "text-black";
  return (
    <div className="w-full">
      <nav className="w-full h-full flex justify-around items-center gap-3 relative bg-sky-600 text-lg">
        <button
          type="button"
          className="py-1 px-2 hover:bg-gray-500 md:hidden"
          onClick={toggleMenu}
        >
          <MenuIcon className="text-[white] w-5 h-5" />
        </button>
        <ul
          className="bg-inherit z-10 list-none text-[white] w-full gap-2 px-2 flex flex-col items-start justify-center absolute top-full left-0 md:!flex-row md:justify-around md:items-center md:static md:!h-full transition-[height] overflow-hidden"
          style={showMenu ? showMenuStyle : hiddenMenuStyle}
        >
          <li>
            <button
              type="button"
              className={`hover:text-gray-300 transition-color ${
                TabName.STATS == props.activeTab ? activeTabStyle : ""
              }`}
              name={TabName.STATS}
              onClick={onTabSwitch}
            >
              Stats
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`hover:text-gray-300 transition-color ${
                TabName.MOVES == props.activeTab ? activeTabStyle : ""
              }`}
              name={TabName.MOVES}
              onClick={onTabSwitch}
            >
              Moves
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`hover:text-gray-300 transition-color ${
                TabName.EVOLS == props.activeTab ? activeTabStyle : ""
              }`}
              name={TabName.EVOLS}
              onClick={onTabSwitch}
            >
              Evols
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`hover:text-gray-300 transition-color ${
                TabName.WEAK_STRONG == props.activeTab ? activeTabStyle : ""
              }`}
              name={TabName.WEAK_STRONG}
              onClick={onTabSwitch}
            >
              Weak/Strong
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`hover:text-gray-300 transition-color ${
                TabName.LOCATION == props.activeTab ? activeTabStyle : ""
              }`}
              name={TabName.LOCATION}
              onClick={onTabSwitch}
            >
              Location
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
