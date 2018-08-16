import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";

import MainPageMap from "./mainPageMap";
import * as firebase from "firebase";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
        },
        {
          lat: 11,
          lng: 76
        }
      ]
    };

    this.render = this.render.bind(this);
    this.showModal = this.showModal.bind(this);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        alert(position.coords.accuracy);
        this.setState({
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
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

  render() {
    console.log(this.state.position);
    return (
      <div>
        <h3 className="pa3">Kerala Flood Map</h3>
        <MainPageMap
          position={this.state.position || { lat: 10, lng: 76 }}
          zoomLevel={this.state.position === null ? 7 : 13}
          onMarkerClick={this.showModal}
          markers={this.state.markers}
          containerElement={<div style={{ height: "100vh", width: "100vw" }} />}
          mapElement={<div style={{ height: `100%`, width: "100%" }} />}
        />

        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
        />
      </div>
    );
  }
}

export default MainPage;
