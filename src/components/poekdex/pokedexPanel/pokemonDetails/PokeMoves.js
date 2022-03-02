import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Paginator from "../../../ultites/Paginator";
import MoveTable from "./moveTable/MoveTable";
export default function PokeMoves(props) {
  const PER_PAGE = 4;
  const [curPage, setCurPage] = useState(1);
  const moves = useSelector((state) => state.pokemons.pokemonDetail_moves);
  const pages = Math.ceil(moves.length / PER_PAGE);
  const endIndex = PER_PAGE * curPage;
  const startIndex = endIndex - PER_PAGE;
  useEffect(() => {
    if (props.page) {
      setCurPage(props.page);
    }
  }, []);
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

  return (
    <div>
      <MoveTable start={startIndex} end={endIndex} />
      <Paginator
        curPage={curPage}
        handleNextClick={handleNextClick}
        handlePrevClick={handlePrevClick}
      />
    </div>
  );
}
