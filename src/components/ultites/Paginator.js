import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
/**
 * phần đầu luôn có 2 node 1,2
 * phần next page luôn có 5 node
 * khi click node cuối của phần giữa luôn render ra 2 node tiếp theo và loại bỏ 2 node đầu cũ của phần giữa
 * ví dụ: Ban  đầu cho 5 là data-last
 * Click 5 -> render 2 node mới 6,7
 * đồng thời remove data-last và cho node 7 là data-last
 * khi click node 7 làm tương tự như với node 5 nhưng thêm phần đầu
 */
function Dots() {
  return (
    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
      ...
    </span>
  );
}

function PaginatorNode(props) {
  useEffect(() => {}, []);
  const activeStyle = "z-10 bg-indigo-50 border-indigo-500 text-indigo-600";
  return (
    <button
      disabled={true}
      type="button"
      className={`bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium `}
    >
      {props.number}
    </button>
  );
}

export default function Paginator(props) {
  return (
    <div className="w-full bg-white px-4 py-3 flex items-center border-t border-gray-200 sm:px-6 gap-2">
      <div>
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button
            onClick={props.handlePrevClick}
            type="button"
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          {<PaginatorNode number={props.curPage} />}
          <button
            onClick={props.handleNextClick}
            type="button"
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  );
}

/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */
