import React from "react";
import "./App.css";
import MapGL, { Marker } from "react-map-gl";

import Flat from "./components/Flat";
import PriceMarker from "./components/PriceMarker";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiY2xhaXJlZnJvZnJvZnJvIiwiYSI6ImNrZTlhZXFhajAxd3IzMW1qdWxmNmJsbXIifQ.lbPzivrmR4KpokhRw3_10A";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allFlats: [],
      flats: [],
      selectedFlat: null,
      search: "",
      viewport: {
        latitude: 45.4972159, // Montreal
        longitude: -73.6103642, // Montreal
        zoom: 12,
        pitch: 0,
        bearing: 0,
      },
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
    this.setState((old) => ({
      selectedFlat: flat,
      viewport: { ...old.viewport, latitude: flat.lat, longitude: flat.lng },
    }));
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
          <MapGL
            {...this.state.viewport}
            width="100%"
            height="100%"
            mapStyle="mapbox://styles/mapbox/streets-v11?optimize=true"
            onViewportChange={(viewport) => this.setState({ viewport })}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            transitionDuration={200}
          >
            {this.state.flats.map((flat) => (
              <Marker key={flat.id} latitude={flat.lat} longitude={flat.lng}>
                <PriceMarker
                  price={flat.price}
                  selected={this.state.selectedFlat === flat}
                />
              </Marker>
            ))}
          </MapGL>
        </div>
      </div>
    );
  }
}

export default App;
