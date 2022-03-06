import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import MoveTable from "./moveTable/MoveTable";
import ErrorMessage from "../../../ultites/ErrorMessage";
import Pagination from "../../../ultites/pagination/Pagination";
import Image from "../../../ultites/Image";
export default function PokeMoves(props) {
  const PER_PAGE = 4;
  // if curPage = 0  => reset pagination
  const [curPage, setCurPage] = useState(1);
  const [movesFound, setMovesFound] = useState(null);
  const [searchBy, setSearchBy] = useState("name");
  const [searchKey, setSearchKey] = useState("");
  const pokemonDetail = useSelector((state) => state.pokemons.pokemonDetail);
  const moves = useSelector((state) => state.pokemons.pokemonDetail_moves);
  const types = useSelector((state) => state.pokemons.types);
  const [errorMessage, setErrorMessage] = useState(null);
  const [pages, setPages] = useState(0);
  const prevPokemonId = useRef(pokemonDetail.id);

  const endIndex = PER_PAGE * curPage;
  const startIndex = endIndex - PER_PAGE;
  useEffect(() => {
    if (pokemonDetail.id !== prevPokemonId.current) {
      setCurPage(0);
      prevPokemonId.current = pokemonDetail.id;
    }
    setPages(Math.ceil(moves.length / PER_PAGE));
  }, [pokemonDetail]);

  const handleOnChangeSearchBy = (e) => {
    const value = e.target.value;
    setSearchBy(value);
    setSearchKey("");
  };

  const handleSearchKeyChange = (e) => {
    setErrorMessage(null);
    setSearchKey(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!searchKey) {
      setErrorMessage("Field can't be empty");
      return;
    }
    setMovesFound([]);
    const found = moves.filter((move, index) => {
      return searchBy == "name"
        ? move.name.includes(searchKey)
        : move.type.name == searchKey;
    });
    if (found.length > 0) {
      setMovesFound(found);
      setCurPage(0);
    } else {
      setErrorMessage("Not found!");
    }
    setPages(Math.ceil(found.length / PER_PAGE));
  };

  const renderTypeList = types.map((type, index) => {
    return (
      <option key={type.name} value={type.name} className="capitalize">
        {type.name}
      </option>
    );
  });

  const clearFilter = () => {
    setMovesFound(null);
    setErrorMessage(null);
    setSearchBy("name");
    setSearchKey("");
    setCurPage(1);
    setPages(Math.ceil(moves.length / PER_PAGE));
  };
  return (
    <div>
      <div className="w-36 mx-auto">
        <Image url={props.imageSrc} />
      </div>
      <form
        className="w-full px-1 py-2 flex flex-wrap gap-1"
        onSubmit={handleSearch}
      >
        <div className="flex items-center gap-2">
          <span>Search by:</span>
          <select
            onChange={handleOnChangeSearchBy}
            name="search_target"
            className="border px-2 py-1 rounded-md focus:outline-none"
            value={searchBy}
          >
            <option value="name" className="hover:bg-red-500">
              Name
            </option>
            <option value="type">Type</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          {searchBy == "name" ? (
            <input
              onChange={handleSearchKeyChange}
              name="move_name"
              type="text"
              placeholder="Move name..."
              className="border px-2 py-1 rounded-md focus:outline-none"
              value={searchKey}
            ></input>
          ) : (
            <select
              value={searchKey}
              onChange={handleSearchKeyChange}
              className="border px-2 py-1 rounded-md focus:outline-none"
            >
              <option value={null}>Choose type</option>
              {renderTypeList}
            </select>
          )}
          <button
            type="submit"
            className="px-2 py-1 rounded-md cursor-pointer border bg-gray-100 hover:bg-gray-200"
          >
            Search
          </button>
        </div>
        {
          // if not found or use search display clean filter
          movesFound != null && (
            <button
              onClick={clearFilter}
              className="px-2 py-1 rounded-md cursor-pointer border bg-red-300 hover:bg-red-400"
              type="button"
            >
              Clean filter
            </button>
          )
        }
        {
          // if have error message
          errorMessage != null && <ErrorMessage message={errorMessage} />
        }
      </form>
      <MoveTable start={startIndex} end={endIndex} initData={movesFound} />
      <Pagination totalPage={pages} setCurPage={setCurPage} curPage={curPage} />
    </div>
  );
}
