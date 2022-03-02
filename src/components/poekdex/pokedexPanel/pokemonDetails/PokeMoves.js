import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Paginator from "../../../ultites/Paginator";
import MoveTable from "./moveTable/MoveTable";
import ErrorMessage from "../../../ultites/ErrorMessage";
import axios from "axios";
export default function PokeMoves(props) {
  const PER_PAGE = 4;
  const [curPage, setCurPage] = useState(1);
  const [movesFound, setMovesFound] = useState(null);
  const [searchBy, setSearchBy] = useState("name");
  const [typeList, setTypeList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const moves = useSelector((state) => state.pokemons.pokemonDetail_moves);
  const [errorMessage, setErrorMessage] = useState(null);
  const [pages, setPages] = useState(0);
  const endIndex = PER_PAGE * curPage;
  const startIndex = endIndex - PER_PAGE;
  useEffect(() => {
    if (props.page) {
      setCurPage(props.page);
    }

    setPages(Math.ceil(moves.length / PER_PAGE));

    const getTypeList = async () => {
      const rs = await axios.get("https://pokeapi.co/api/v2/type");
      const { data } = rs;
      setTypeList(data.results);
    };
    getTypeList();
  }, [moves]);

  const handleOnChangeSearchBy = (e) => {
    const value = e.target.value;
    setSearchBy(value);
    setSearchKey("");
  };

  const handleSearchKeyChange = (e) => {
    setErrorMessage(null);
    setSearchKey(e.target.value);
  };
  const handleNextClick = () => {
    if (curPage >= pages) return;
    setCurPage(curPage + 1);
    props.setPage(curPage + 1);
  };
  const handlePrevClick = () => {
    if (curPage <= 1) return;
    setCurPage(curPage - 1);
    props.setPage(curPage - 1);
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
      setCurPage(1);
    } else {
      setErrorMessage("Not found!");
    }
    setPages(Math.ceil(found.length / PER_PAGE));
  };

  const renderTypeList = typeList.map((type, index) => {
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
      <Paginator
        curPage={curPage}
        handleNextClick={handleNextClick}
        handlePrevClick={handlePrevClick}
        pages={pages}
      />
    </div>
  );
}
