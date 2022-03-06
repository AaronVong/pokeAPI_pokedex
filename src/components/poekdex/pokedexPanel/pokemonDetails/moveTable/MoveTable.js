import { useSelector } from "react-redux";
import TableRow from "./TableRow";
import LoadingCircle from "../../../../ultites/LoadingCircle";
export default function MoveTable(props) {
  const loading = useSelector((state) => state.pokemons.moveLoading);
  const { curPage, start, end } = props;
  const pokemonMoves = useSelector((state) => {
    if (props.initData) {
      return props.initData;
    }
    return state.pokemons.pokemonDetail_moves;
  });
  const moves = pokemonMoves.slice(start, end).map((move) => {
    return <TableRow move={move} key={move.id} />;
  });
  return (
    <table className="table-auto w-full border border-collapse">
      <thead className="border bg-gray-300">
        <tr className="border">
          <th className="border">Name</th>
          <th className="border">Stats</th>
          <th className="border">Type</th>
        </tr>
      </thead>
      <tbody className="border">
        {loading ? (
          <LoadingCircle />
        ) : pokemonMoves.length == 0 ? (
          <tr className="border">
            <td
              className="border text-center font-semibold text-lg"
              colSpan={3}
            >
              Empty
            </td>
          </tr>
        ) : (
          moves
        )}
      </tbody>
    </table>
  );
}
