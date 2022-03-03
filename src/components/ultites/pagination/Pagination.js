import { Fragment, useEffect, useState } from "react";
import PaginationNumber from "./PaginationNumber";
import PaginationDot from "./PaginationDot";
import PaginationControl from "./PaginationControl";
import PropTypes from "prop-types";
/**
 * Pagination from https://github.com/OlegSuncrown/react-pagination
 */
export default function Pagination(props) {
  const { totalPage, setCurPage, curPage, classes } = props;
  const DOTS = "...";
  const numberOfPages = [];
  for (let i = 1; i <= totalPage; i++) {
    numberOfPages.push(i);
  }

  // Current active button
  const [activeButton, setActiveButton] = useState(0);
  // Current buttons list visible on pagination
  const [visibleButtonsList, setVisibleButtonsList] = useState([]);

  useEffect(() => {
    // slice() take from start -> end - 1

    // this will be use to set to the visibleButtonsList
    let buttonsWillDisplayed = [...visibleButtonsList];
    // if total nnumber of pages <8 then just display that list:
    if (numberOfPages.length < 8) {
      // with format:  prev 1 2 3 4 5 6 next
      buttonsWillDisplayed = [...numberOfPages];
    } else if (activeButton >= 1 && activeButton < 5) {
      // if click button with number >=1 and <= 4 then display it with format:
      // prev 1 2 3 4 5 ... N next
      buttonsWillDisplayed = [
        ...numberOfPages.slice(0, 5),
        DOTS,
        numberOfPages.length,
      ];
    } else if (activeButton === 5) {
      // if click button with number = 5 then add 2 more button (6 7)
      // 0 1 2 3 4 5 6 7
      // 1 2 3 4 5 6 7 8
      // prev 1 2 3 4 5 6 7 ... N next
      const sliced = numberOfPages.slice(0, 7);
      buttonsWillDisplayed = [...sliced, DOTS, numberOfPages.length];
    } else if (activeButton > 4 && activeButton < numberOfPages.length - 3) {
      // if click button with number >=6 and < (last page number) - 3 then change format
      // prev 1 ... 5 6 7 ... N next

      // take activeButton and a number in front of it, exp: click 6 take [5 6]
      const sliced1 = numberOfPages.slice(activeButton - 3, activeButton);

      // take 2 numbers behind of activeButton, exp: click 6 take [7 8]
      const sliced2 = numberOfPages.slice(activeButton, activeButton + 2);
      buttonsWillDisplayed = [
        1,
        DOTS,
        ...sliced1,
        ...sliced2,
        DOTS,
        numberOfPages.length,
      ];
    } else if (activeButton > numberOfPages.length - 4) {
      // if activeButton >= 7 then change format: prev 1 ... 7 8 9 lastpage next
      const sliced = numberOfPages.slice(numberOfPages.length - 5);
      buttonsWillDisplayed = [1, DOTS, ...sliced];
    }
    setVisibleButtonsList(buttonsWillDisplayed);

    // force render to display visibleButtonsList
    if (activeButton === 0) {
      setActiveButton(1);
    } else if (curPage === 0) {
      setCurPage(1);
      setActiveButton(1);
    } else {
      setCurPage(activeButton);
    }
  }, [activeButton, totalPage, curPage]);

  const handleNextClick = () => {
    setActiveButton((prevState) =>
      prevState >= numberOfPages.length ? prevState : prevState + 1
    );
  };

  const handlePrevClick = () => {
    setActiveButton((prevState) =>
      prevState <= 1 ? prevState : prevState - 1
    );
  };

  const pagesList = visibleButtonsList.map((item, index) => {
    if (item != DOTS) {
      return (
        <PaginationNumber
          key={item}
          number={item}
          handleClick={() => setActiveButton(item)}
          active={item === activeButton}
        />
      );
    } else {
      return <PaginationDot key={item + index} />;
    }
  });
  return (
    <div
      className={`w-auto px-4 py-3 flex items-center sm:px-6 gap-2 ${classes} relative`}
    >
      <div className="sm:hidden flex items-center gap-2">
        <nav
          className=" relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <PaginationControl
            text="Previous"
            handler={handlePrevClick}
            isNextCtrl={false}
          />
          {
            // display pages here
            <PaginationNumber number={activeButton} disabled={true} />
          }
          <PaginationControl handler={handleNextClick} />
        </nav>
        <i>
          Pages {activeButton} of {totalPage}
        </i>
      </div>
      <div className="hidden sm:block">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <PaginationControl
            text="Previous"
            handler={handlePrevClick}
            isNextCtrl={false}
          />

          {pagesList}

          <PaginationControl handler={handleNextClick} />
        </nav>
      </div>
    </div>
  );
}

/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */
Pagination.propTypes = {
  curPage: PropTypes.number.isRequired,
  setCurPage: PropTypes.func.isRequired,
  totalPage: PropTypes.number.isRequired,
  classes: PropTypes.string,
};

Pagination.defaultProps = {};
