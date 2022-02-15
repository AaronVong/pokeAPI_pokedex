import PropTypes from "prop-types";
export default function NotFound(props) {
  return (
    <div className="w-full h-full">
      <p className="text-center text-lg font-semibold capitalize">
        {props.message}
      </p>
    </div>
  );
}

NotFound.propTypes = {
  message: PropTypes.string,
};
NotFound.defaultProps = {
  message: "under development!!",
};
