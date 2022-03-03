import PropTypes from "prop-types";
export default function PaginationNumber(props) {
  const { number, handleClick, active = false, disabled = false } = props;
  const activeStyle = "z-10 bg-indigo-50 border-indigo-500 text-indigo-600";
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      type="button"
      className={`bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
        active ? activeStyle : ""
      }`}
    >
      {number}
    </button>
  );
}

PaginationNumber.propTypes = {
  disabled: PropTypes.bool,
  number: PropTypes.number,
  handleClick: PropTypes.func,
};
