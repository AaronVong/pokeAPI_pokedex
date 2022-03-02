import React from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
export default class PokedexPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 divide-x-2 py-2">
        <LeftSide />
        <RightSide />
      </div>
    );
  }
}
