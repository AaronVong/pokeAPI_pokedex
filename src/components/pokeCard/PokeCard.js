import React from "react";
import PokeCardFront from "./PokeCardFront";
import PropTypes from "prop-types";
export default class PokeCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={`${this.props.customStyle} bg-transparent rounded-xl text-sky-50`}
      >
        <PokeCardFront data={this.props.data} />
      </div>
    );
  }
}

PokeCard.propTypes = {
  data: PropTypes.object.isRequired,
  customStyle: PropTypes.string,
};

PokeCard.defaultProps = {
  customStyle: "max-w-[230px] min-w-[220px] h-auto",
};
