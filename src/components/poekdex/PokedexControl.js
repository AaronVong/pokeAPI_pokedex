import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPokemonList,
  fetchPokemon,
} from "../../redux/actions/PokemonAction";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/outline";
export default function PokedexControl(props) {
  const [allowNext, setAllowNext] = useState(true);
  const [allowPrev, setAllowPrev] = useState(false);
  const resource = useSelector((state) => state.pokemons.resource);
  const dispatch = useDispatch();
  const nextButton = useRef(null);
  const prevButton = useRef(null);
  let delayTime = 300;
  const disableButton = () => {
    // disable next and prev button when click
    nextButton.current.disabled = true;
    prevButton.current.disabled = true;
  };
  const enableButton = () => {
    // eneable next and prev button after 300ms
    setTimeout(() => {
      nextButton.current.disabled = false;
      prevButton.current.disabled = false;
    }, delayTime);
  };
  const handleNextClick = () => {
    disableButton();
    if (resource.next == null) {
      setAllowNext(false);
      return;
    }
    dispatch(fetchPokemonList(resource.next));
    setAllowPrev(true);
    enableButton();
  };
  const handlePrevClick = () => {
    disableButton();
    if (resource.previous == null) {
      setAllowPrev(false);
      return;
    }
    dispatch(fetchPokemonList(resource.previous));
    setAllowNext(true);
    enableButton();
  };
  return (
    <div className="p-2 w-full flex justify-center items-center gap-3">
      <button
        ref={prevButton}
        disabled={!allowPrev}
        onClick={handlePrevClick}
        className="rounded-full w-auto h-auto bg-sky-400 px-2 py-1 hover:bg-sky-500 disabled:bg-sky-300"
      >
        <ChevronLeftIcon className="w-5 h-5 text-sky-100" />
      </button>
      <button
        ref={nextButton}
        disabled={!allowNext}
        onClick={handleNextClick}
        className="rounded-full w-auto h-auto bg-sky-400 px-2 py-1 hover:bg-sky-500 disabled:bg-sky-300"
      >
        <ChevronRightIcon className="w-5 h-5 text-sky-100" />
      </button>
    </div>
  );
}
