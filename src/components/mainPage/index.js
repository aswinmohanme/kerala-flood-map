import React from "react";
import PropTypes from "prop-types";

import MainPageMap from "./mainPageMap";
import { isValidCoords, returnCoord, returnPosition } from "./utils";
import { getDistance } from "geolib";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: null,
      markers: []
    };

    this.render = this.render.bind(this);
    this.locateMe = this.locateMe.bind(this);
    this.onLocateMe = this.onLocateMe.bind(this);
  }

  async componentDidMount() {
    const resp = await fetch("/data");
    const markers = await resp.json();

    this.setState({ all_markers: markers });
  }

  onLocateMe(navigator_position) {
    if (this.state.all_markers instanceof Array) {
      if (
        navigator_position instanceof Array &&
        navigator_position.length == 2
      ) {
        const position = returnPosition(navigator_position);
        const filtered_markers = this.state.all_markers.filter(marker => {
          if (isValidCoords(marker.latlng)) {
            const distance = getDistance(
              position,
              returnPosition(returnCoord(marker.latlng))
            );

            return distance <= 10000;
          }
        });

        this.setState({
          position: navigator_position,
          markers: filtered_markers
        });
      } else {
        console.log("Give your location first");
      }
    } else {
      console.log("Data is still being loaded, try again");
    }
  }

  locateMe() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const navigator_position = [
          position.coords.latitude,
          position.coords.longitude
        ];
        this.onLocateMe(navigator_position);
      });
    } else {
      alert("Error Getting Your Location");
    }
  }

  render() {
    return (
      <div>
        <div className="flex items-center justify-between pl3 pr3">
          <h3 className="">Kerala Flood Map</h3>
          <div>
            <a
              href="#"
              onClick={this.locateMe}
              className="link black ba pa2 mr2 br2"
            >
              Near Me
            </a>
            <a
              href="https://keralarescue.in/request/"
              target="blank"
              className="link bg-black white pa2 br2"
            >
              Request
            </a>
          </div>
        </div>
        <div className="flex items-center pl3">
          <p className="f6 mr2">Red: Needs Rescue</p>
          <p className="f6 mh2">Green: Request Made For Other</p>
          <p className="f6 mh2">Blue: Generic Request</p>
        </div>
        <MainPageMap
          position={this.state.position || [10, 76]}
          zoomLevel={this.state.position === null ? 7 : 13}
          markers={this.state.markers}
        />
      </div>
    );
  }
}

MainPage.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number.isRequired),
  zoomLevel: PropTypes.number,
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      map: PropTypes.shape({
        latlng: PropTypes.string.isRequired,
        requestee: PropTypes.string.isRequired,
        needrescue: PropTypes.bool,
        detailrescue: PropTypes.string,
        is_request_for_others: PropTypes.bool,
        location: PropTypes.string,
        requestee_phone: PropTypes.string,
        needfood: PropTypes.bool,
        detailfood: PropTypes.string,
        needcloth: PropTypes.bool,
        detailcloth: PropTypes.string,
        needwater: PropTypes.string,
        detailwater: PropTypes.string,
        needkit_util: PropTypes.string,
        detailkit_util: PropTypes.string,
        needtoilet: PropTypes.string,
        detailtoilet: PropTypes.string,
        needmed: PropTypes.string,
        detailmed: PropTypes.string,
        needothers: PropTypes.string
      })
    })
  )
};

export default MainPage;
