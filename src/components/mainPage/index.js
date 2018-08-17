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
      markersReqByOthers: [],
      needsRescue: true,
      others: false,
      genericReq: false,
      allReq: false
    };

    this.render = this.render.bind(this);
    this.locateMe = this.locateMe.bind(this);
    this.filterRescue = this.filterRescue.bind(this);
    this.othersGroup = this.othersGroup.bind(this);
    this.allReqGroup = this.allReqGroup.bind(this);
  }

  async componentDidMount() {
    const resp = await fetch("/data");
    const markers = await resp.json();
    const needRescueGroup = markers.filter(
      marker => !marker.is_request_for_others
    );
    console.log(needRescueGroup);

    const reqByOthers = markers.filter(marker => marker.is_request_for_others);

    this.setState({
      markers: markers,
      markersNeedRescue: needRescueGroup,
      markersReqByOthers: reqByOthers
    });
  }

  filterRescue() {
    this.setState(prevState => ({
      needsRescue: !prevState.needsRescue,
      others: false,
      allReq: false
    }));
  }

  othersGroup() {
    this.setState(prevState => ({
      others: !prevState.others,
      needsRescue: false,
      allReq: false
    }));
  }

  allReqGroup() {
    this.setState(prevState => ({
      allReq: !prevState.allReq,
      needsRescue: false,
      others: false
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
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#myNavbar"
              >
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <h3 className="navbar-brand">Kerala Flood Map</h3>
            </div>
            <div className="container collapse navbar-collapse" id="myNavbar">
              <ul className="flex items-center justify-between row nav navbar-nav navbar-right">
                <li>
                  <button
                    href={
                      this.state.position
                        ? `https://www.microid.in/keralaflood/#12/${
                            this.state.position[0]
                          }/${this.state.position[1]}`
                        : "https://www.microid.in/keralaflood/"
                    }
                    target="blank"
                    className="link bg-white black ba pa3 mr2 br2"
                  >
                    Check Roads
                  </button>
                </li>
                <li>
                  <button
                    href="#"
                    onClick={this.locateMe}
                    className="link bg-white black ba pa3 mr2 br2"
                  >
                    Locate Me
                  </button>
                </li>
                <li>
                  <button
                    href="https://keralarescue.in/request/"
                    target="blank"
                    className="link bg-black white pa3 br2"
                  >
                    Request
                  </button>
                </li>
              </ul>
              <ul className="flex items-center justify-between row nav navbar-nav">
                <li>
                  <button
                    href="#"
                    onClick={this.filterRescue}
                    className={
                      !this.state.needsRescue
                        ? "link bg-white red ba pa3 mr2 br2"
                        : "link bg-red white pa3 mr2 br2"
                    }
                  >
                    Show: Rescue needed
                  </button>
                </li>
                <li>
                  <button
                    href="#"
                    onClick={this.othersGroup}
                    className={
                      !this.state.others
                        ? "link bg-white green ba pa3 mr2 br2"
                        : "link bg-green white pa3 mr2 br2"
                    }
                  >
                    Show: Request Made For Other
                  </button>
                </li>
                <li>
                  <button
                    href="#"
                    onClick={this.allReqGroup}
                    className={
                      !this.state.allReq
                        ? "link bg-white black ba pa3 mr2 br2"
                        : "link bg-black white pa3 mr2 br2"
                    }
                  >
                    Show: All Request
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <MainPageMap
          position={this.state.position || [10, 76]}
          zoomLevel={this.state.position ? 13 : 7}
          markers={
            this.state.needsRescue
              ? this.state.markersNeedRescue
              : this.state.others
                ? this.state.markersReqByOthers
                : this.state.markers
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
        dateadded: PropTypes.string,
        needothers: PropTypes.string
      })
    })
  )
};

export default MainPage;
