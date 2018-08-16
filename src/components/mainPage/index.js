import React from "react";
import PropTypes from "prop-types";

import MainPageMap from "./mainPageMap";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayForm: false,
      position: null,
      markers: [
        {
          lat: 10,
          lng: 76,
          name: "Aswin Mohan",
          address:
            "Elayasseril Thundil, Para JN, Muthukatturkara, Nooranad P.O",
          landmark: "Para JN",
          isMedicalEmergency: true,
          medicalReason: "Nothing Yet",
          contactNo: 8589931950
        }
      ]
    };

    this.render = this.render.bind(this);
    this.showModal = this.showModal.bind(this);
    this.stuckHelp = this.stuckHelp.bind(this);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            acc: position.coords.accuracy
          }
        });
      });
    }
  }

  showModal(id) {
    const marker = this.state.markers[id];

    return () => {
      alert(
        `Name: ${marker.name}\nLandMark: ${marker.landmark}\nAddress: ${
          marker.address
        }\nPhone No: ${marker.contactNo}\nMedical Reason: ${
          marker.medicalReason
        }`
      );
    };
  }

  stuckHelp() {
    this.setState({ displayForm: true });
  }

  render() {
    return (
      <div>
        <div className="flex items-center justify-between pa3">
          <h3 className="">Kerala Flood Map</h3>
          <a
            href="https://keralarescue.in/request/"
            target="blank"
            className="link bg-dark-red black pa2 br2"
          >
            Request Help
          </a>
        </div>
        <MainPageMap
          position={this.state.position || { lat: 10, lng: 76 }}
          zoomLevel={this.state.position === null ? 7 : 13}
          onMarkerClick={this.showModal}
          markers={this.state.markers}
          containerElement={<div style={{ height: "100vh", width: "100vw" }} />}
          mapElement={<div style={{ height: `100%`, width: "100%" }} />}
        />
      </div>
    );
  }
}

export default MainPage;
