import React from "react";
import PropTypes from "prop-types";

import MainPageMap from "./mainPageMap";
import * as firebase from "firebase";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: {
        lat: 10.85,
        lng: 76.27
      },
      markers: []
    };

    this.markersRef = firebase.database().ref("Markers");
    this.markersRef.on("value", snapshot => {
      const markersRaw = snapshot.val();
      let markers = [];

      Object.keys(markersRaw).map(key => {
        this.setState({
          markers: [...this.state.markers, markersRaw[key]]
        });
      });
    });

    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.render = this.render.bind(this);
  }

  getCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState(prevState => ({
            position: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            markers: [
              ...prevState.markers,
              {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
            ]
          }));
          this.markersRef.push({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        error => {
          alert("An Error Occured Getting Your Location, Error: " + error);
        }
      );
    } else {
      alert("Location is Not Supported");
    }
  }

  render() {
    console.log(this.state.markers);
    return (
      <div>
        <div className="pa3 flex items-center justify-between">
          <h3 className="">Kerala Flood Map</h3>
          <a
            onClick={this.getCurrentLocation}
            href="#"
            className="black bg-red link pa2 br2"
          >
            I'm Stuck
          </a>
        </div>
        <MainPageMap
          position={this.state.position}
          markers={this.state.markers}
          containerElement={<div style={{ height: "100vh", width: "100vw" }} />}
          mapElement={<div style={{ height: `100%`, width: "100%" }} />}
        />
      </div>
    );
  }
}

export default MainPage;
