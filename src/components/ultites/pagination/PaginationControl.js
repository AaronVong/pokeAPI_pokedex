import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";
export default function PaginationControl(props) {
  const { isNextCtrl = true, handler, text = "Next" } = props;
  return (
    <button
      onClick={handler}
      type="button"
      className={`relative inline-flex items-center px-2 py-2 ${
        isNextCtrl ? "rounded-r-md" : "rounded-l-md"
      } border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
    >
      <span className="sr-only">{text}</span>
      {isNextCtrl ? (
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      ) : (
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}

PaginationControl.propTypes = {
  isNextCtrl: PropTypes.bool,
  handler: PropTypes.func,
  text: PropTypes.string,
};
