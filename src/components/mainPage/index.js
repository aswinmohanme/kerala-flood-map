import React from "react";
import PropTypes from "prop-types";
import MainPageMap from "./mainPageMap";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: null,
      markers: [],
      markersNeedRescue: [],
      needsRescue: false
    };

    this.render = this.render.bind(this);
    this.locateMe = this.locateMe.bind(this);
    this.filterRescue = this.filterRescue.bind(this);
  }

  async componentDidMount() {
    const resp = await fetch("/data");
    const markers = await resp.json();
    this.setState({ markers: markers });
  }

  filterRescue() {
    const needRescueGroup = this.state.markers.filter(
      marker => marker.needrescue === true
    );
    this.setState(prevState => ({
      needsRescue: !prevState.needsRescue,
      markersNeedRescue: needRescueGroup
    }));
  }

  locateMe() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          position: [position.coords.latitude, position.coords.longitude]
        });
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
          <a
            href="#"
            onClick={this.filterRescue}
            className={
              !this.state.needsRescue
                ? "link red ba pa2 mr2 br2"
                : "link bg-red white pa2 mr2 br2"
            }
          >
            Red: Needs Rescue
          </a>
          <p className="f6 mh2">Green: Request Made For Other</p>
          <p className="f6 mh2">Blue: Generic Request</p>
        </div>
        <MainPageMap
          position={this.state.position || [10, 76]}
          zoomLevel={this.state.position === null ? 7 : 13}
          markers={
            !this.state.needsRescue
              ? this.state.markers
              : this.state.markersNeedRescue
          }
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
        needothers: PropTypes.string,
        dateadded: PropTypes.string
      })
    })
  )
};

export default MainPage;
