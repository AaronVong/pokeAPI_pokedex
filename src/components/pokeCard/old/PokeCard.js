import React from "react";
import PokeCardFront from "./PokeCardFront";
import PokeCardBack from "./PokeCardBack";
export default class PokeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
    };
  }
  toggleFlip = () => {
    this.setState({ isFlipped: !this.state.isFlipped });
  };
  render() {
    const rotate = this.state.isFlipped
      ? "[transform:rotateY(180deg)] "
      : "[transform:rotateY(0deg)] ";
    return (
      <div
        className={`${rotate} [transform-style:preserve-3d] origin-center transition-transform duration-300 h-96 w-64 relative bg-transparent rounded-xl text-sky-50 cursor-pointer`}
      >
        <PokeCardFront
          toggleFlip={this.toggleFlip}
          data={this.props.data.frontData}
        />
        <PokeCardBack
          isFlipped={this.state.isFlipped}
          flipCard={this.toggleFlip}
          data={this.props.data.backData}
        />
      </div>
    );
  }
}
