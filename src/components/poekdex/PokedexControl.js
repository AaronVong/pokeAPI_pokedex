import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemonList } from "../../redux/actions/PokemonAction";
import Pagination from "../ultites/pagination/Pagination";
export default function PokedexControl(props) {
  const { loading, setLoading } = props;
  const PER_PAGE = 6;
  const [curPage, setCurPage] = useState(1);
  const resource = useSelector((state) => state.pokemons.resource);
  const dispatch = useDispatch();
  const pages = Math.ceil(resource.count / PER_PAGE);
  useEffect(() => {
    setLoading(true);
    dispatch(
      fetchPokemonList(process.env.REACT_APP_API, {
        offset: PER_PAGE * curPage - PER_PAGE,
        limit: PER_PAGE,
      })
    );
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [curPage]);
  return (
    <div className="p-2 w-full flex justify-center items-center gap-3 relative">
      <Pagination curPage={curPage} totalPage={pages} setCurPage={setCurPage} />
    </div>
  );
}
