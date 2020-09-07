import React from "react";
import "./App.css";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";

import Flat from "./components/Flat";
import PriceMarker from "./components/PriceMarker";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiY2xhaXJlZnJvZnJvZnJvIiwiYSI6ImNrZTlhZXFhajAxd3IzMW1qdWxmNmJsbXIifQ.lbPzivrmR4KpokhRw3_10A",
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allFlats: [],
      flats: [],
      selectedFlat: null,
      center: [-73.6103642, 45.4972159], // Montreal lng, lat
      search: "",
    };
  }

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/clairefro/flats-boilerplate/master/flats.json"
    )
      .then((res) => res.json())
      .then((data) => this.setState({ allFlats: data, flats: data }));
  }

  selectFlat = (flat) => {
    this.setState({ selectedFlat: flat, center: [flat.lng, flat.lat] });
  };

  handleSearch = (event) => {
    const input = event.target.value;
    this.setState({
      search: input,
      flats: this.state.allFlats.filter((flat) =>
        new RegExp(input, "i").exec(flat.name)
      ),
    });
  };
  render() {
    return (
      <div className="app">
        <div className="main">
          <input
            type="text"
            value={this.state.search}
            onChange={this.handleSearch}
          />
          <div className="flats">
            {this.state.flats.map((flat) => {
              return (
                <Flat key={flat.id} flat={flat} selectFlat={this.selectFlat} />
              );
            })}
          </div>
        </div>
        <div className="map">
          <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "100%",
              width: "100%",
            }}
            center={this.state.center}
            zoom={[12]}
          >
            {this.state.flats.map((flat) => (
              <Marker key={flat.id} coordinates={[flat.lng, flat.lat]}>
                <PriceMarker
                  price={flat.price}
                  selected={this.state.selectedFlat === flat}
                />
              </Marker>
            ))}
          </Map>
        </div>
      </div>
    );
  }
}

export default App;
