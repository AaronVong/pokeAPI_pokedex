import PropTypes from "prop-types";
import { ArrowRightIcon, ArrowDownIcon } from "@heroicons/react/solid";
export default function EvolvesArrow(props) {
  return (
    <div className="flex justify-center items-center md:flex-col shrink">
      <ArrowDownIcon className="w-5 h-5 lg:hidden order-2" />
      <ArrowRightIcon className="w-5 h-5 hidden lg:block order-2" />
      <span className="text-lg md:text-sm lg:text-base text-center order-1">
        {props.condition}
      </span>
      <span className="text-lg md:text-sm lg:text-base text-center order-3">
        {props.extraCondition}
      </span>
    </div>
  );
}

EvolvesArrow.propTypes = {
  condition: PropTypes.string.isRequired,
  extraCondition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
