import React from "react";

import "./PriceMarker.css";

class PriceMarker extends React.Component {
  render() {
    return (
      <div
        className={`marker ${this.props.selected ? "selected" : null}`}
      >{`$${this.props.price}`}</div>
    );
  }
}

export default PriceMarker;
