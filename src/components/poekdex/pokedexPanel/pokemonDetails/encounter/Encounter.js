import axios from "axios";
import { Fragment, useEffect, useRef, useState, version } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../ultites/pagination/Pagination";
import { getEncounterDetails } from "../../../../../redux/actions/PokemonAction";
import LoadingCircle from "../../../../ultites/LoadingCircle";
import ErrorMessage from "../../../../ultites/ErrorMessage";
import Image from "../../../../ultites/Image";

export default function Encounter(props) {
  const PER_PAGE = 5;
  const [curPage, setCurPage] = useState(1);
  const [filteredArr, setFilteredArr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [versionName, setVersionName] = useState("");

  const encounterArr = useSelector((state) => state.pokemons.encounters);
  const pokemonDetail = useSelector((state) => state.pokemons.pokemonDetail);
  const prevPokemon = useRef(pokemonDetail.name);
  const dispatch = useDispatch();
  const setOfVersion = new Set();
  const arrUseToRender = filteredArr ? filteredArr : encounterArr;
  let totalPage = Math.ceil(arrUseToRender.length / PER_PAGE);
  const end = PER_PAGE * curPage;
  const start = end - PER_PAGE;
  useEffect(() => {
    setLoading(true);
    if (prevPokemon.current != pokemonDetail.name) {
      setCurPage(0);
      prevPokemon.current = pokemonDetail.name;
    }
    dispatch(getEncounterDetails());
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [pokemonDetail]);

  const bodyItems =
    arrUseToRender.length > 0 ? (
      arrUseToRender.slice(start, end).map((item, index) => {
        const versionDetails = item["version_details"].map((version, index) => {
          setOfVersion.add(version.version.name);
          return (
            <li
              key={index}
              className={`px-2 py-1 capitalize flex flex-wrap ${
                version.version.name == versionName ? "bg-blue-200" : ""
              } ${index != 0 ? "border-l" : ""}`}
            >
              {version.version.name.replace(/-/g, " ")}
            </li>
          );
        });
        return (
          <tr key={index} className="border border-collapse">
            <td className="border border-collapse">
              <ul className="list-none flex flex-wrap justify-center py-1">
                {versionDetails}
              </ul>
            </td>
            <td className="border border-collapse capitalize px-3 text-center">
              {item["location_area"].name.replace(/-/g, " ")}
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan={2} className="text-center text-lg font-semibold">
          Not Found
        </td>
      </tr>
    );
  const versions = () => {
    let options = [];
    setOfVersion.forEach((version) => {
      options.push(
        <option value={version} className="capitalize">
          {version}
        </option>
      );
    });
    return options;
  };

  const versionFilter = (e) => {
    e.preventDefault();
    if (!versionName) return;
    const replaceWithSlash = versionName.replace(" ", "-");
    const filteredArr = encounterArr.filter((item) => {
      return (
        item["version_details"].filter(
          (version) => version.version.name == replaceWithSlash
        ).length > 0
      );
    });
    setFilteredArr(filteredArr);
    setCurPage(0);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-36 mx-auto">
        <Image
          url={pokemonDetail.sprites.other["official-artwork"]["front_default"]}
        />
      </div>
      <form onSubmit={versionFilter} className="w-full p-2 flex gap-2">
        <input
          onChange={(e) => {
            setVersionName(e.target.value.toLocaleLowerCase());
          }}
          placeholder="Version name..."
          name="version_name"
          className="border rounded-md px-2 py-1"
          value={versionName}
        ></input>
        {filteredArr == null ? (
          ""
        ) : filteredArr.length > 0 ? (
          ""
        ) : (
          <ErrorMessage message="Not Found" />
        )}
        <button
          onClick={() => {
            // reset filter
            setVersionName("");
            setFilteredArr(null);
          }}
          className="px-2 py-1 rounded-md cursor-pointer border bg-red-300 hover:bg-red-400"
          type="button"
        >
          Refresh
        </button>
      </form>
      <table className="border border-collapse w-full">
        <thead className="border border-collapse bg-gray-300 text-lg">
          <tr className="border border-collapse">
            <th className="border border-collapse">Versions</th>
            <th className="border border-collapse">Area</th>
          </tr>
        </thead>
        <tbody className="border border-collapse">
          {loading ? <LoadingCircle /> : bodyItems}
        </tbody>
      </table>
      <Pagination
        totalPage={totalPage}
        curPage={curPage}
        setCurPage={setCurPage}
      />
    </div>
  );
}
