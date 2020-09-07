import React, { Component } from "react";

import "./Flat.css";

class Flat extends Component {
  selectFlat = () => {
    this.props.selectFlat(this.props.flat);
  };

  render() {
    const { name, price, priceCurrency, imageUrl } = this.props.flat;
    return (
      <div className="flat" onClick={this.selectFlat}>
        <div
          className="flat-picture"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <div className="flat-title">
          {name} - {price}
          {priceCurrency}
        </div>
      </div>
    );
  }
}

export default Flat;
