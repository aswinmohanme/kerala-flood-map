import React from "react";
import PropTypes from "prop-types";
import MainPageMap from "./mainPageMap";
const getMarker = ({
  needsRescue,
  markersNeedRescue,
  others,
  markersReqByOthers,
  markers
}) => {
  if (needsRescue) {
    return markersNeedRescue;
  }

  if (others) {
    return markersReqByOthers;
  }

  return markers;
};

const districts = [
  "alp",
  "ekm",
  "idk",
  "knr",
  "ksr",
  "kol",
  "ktm",
  "koz",
  "mpm",
  "pkd",
  "ptm",
  "tvm",
  "tcr",
  "wnd"
];

const getShelters = ({ shelters, gMarkers }) => {
  if (shelters) {
    return gMarkers;
  }
  return gMarkers.filter(marker => marker.id === 0);
};


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
      shelters: true,
      allReq: false,
      gMarkers: []
    };
    this.render = this.render.bind(this);
    this.filterRescue = this.filterRescue.bind(this);
    this.othersGroup = this.othersGroup.bind(this);
    this.allReqGroup = this.allReqGroup.bind(this);
    this.shelterGroup = this.shelterGroup.bind(this);
    this.locateMe = this.locateMe.bind(this);
  }

  async componentDidMount() {
    const markers = [];
    for (const district of districts) {
      const resp = await fetch(`/data?district=${district}`);
      markers.push(resp.json());
    }

    const newData = await Promise.all([
      fetch(
        "https://app.reliefers.org/api/v2/venues/near?src=76.952549,8.487477&subaction=near&venue_type=2"
      ).then(response => response.json()),
      fetch(
        "https://app.reliefers.org/api/v2/venues/near?src=76.306811,10.026987&subaction=near&venue_type=2"
      ).then(response => response.json()),
      fetch(
        "https://app.reliefers.org/api/v2/venues/near?src=75.795319,11.254269&subaction=near&venue_type=2"
      ).then(response => response.json())
    ]);

    const needRescueGroup = markers.filter(
      marker => !marker.is_request_for_others
    );
    const tvmEkmClt = newData[0].concat(newData[1], newData[2]);
    const reqByOthers = markers.filter(marker => marker.is_request_for_others);
    this.setState({
      markers: markers,
      gMarkers: tvmEkmClt,
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

  // Hide Rescue Needed to Reduce Clutter
  shelterGroup() {
    this.setState(prevState => ({
      shelters: !prevState.shelters
    }));
  }

  locateMe() {
    if (this.state.zoom >= 12) {
      this.setState({ zoom: 7 });
      return;
    }

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
          <div className="main-nav">
            <a
              href={
                this.state.position
                  ? `https://www.microid.in/keralaflood/#12/${
                      this.state.position[0]
                    }/${this.state.position[1]}`
                  : "https://www.microid.in/keralaflood/"
              }
              target="blank"
              className="link black ba pa2 mr2 br2"
            >
              Check Roads
            </a>
            <a
              href="#locateMe"
              onClick={this.locateMe}
              className="link black ba pa2 mr2 br2"
            >
              Locate Me
            </a>
            <a
              href="/request/"
              target="blank"
              className="link bg-black white pa2 br2"
            >
              Request
            </a>
          </div>
        </div>
        <div className="flex items-center pl3 pb2">
          <a
            href="#rescueNeeded"
            onClick={this.filterRescue}
            className={
              !this.state.needsRescue
                ? "link red ba pa2 mr2 br2"
                : "link bg-red white pa2 mr2 br2"
            }
          >
            Rescue needed
          </a>
          <a
            href="#showShelters"
            onClick={this.shelterGroup}
            className={
              !this.state.shelters
                ? "link blue ba pa2 mr2 br2"
                : "link bg-blue white pa2 mr2 br2"
            }
          >
            Shelters
          </a>
          <a
            href="#showOthers"
            onClick={this.othersGroup}
            className={
              !this.state.others
                ? "link green ba pa2 mr2 br2"
                : "link bg-green white pa2 mr2 br2"
            }
          >
            Request Made For Other
          </a>
          <a
            href="#showAll"
            onClick={this.allReqGroup}
            className={
              !this.state.allReq
                ? "link black ba pa2 mr2 br2"
                : "link bg-black white pa2 mr2 br2"
            }
          >
            All Request
          </a>
        </div>
        <MainPageMap
          position={this.state.position || [10, 76]}
          zoomLevel={this.state.position ? 13 : 7}
          markers={getMarker(this.state)}
          gMarkers={getShelters(this.state)}
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
        Name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        Contact_Name: PropTypes.bool,
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
  ),
  gMarkers: PropTypes.arrayOf(
    PropTypes.shape({
      map: PropTypes.shape({
        title: PropTypes.string,
        person_name: PropTypes.string,
        phone: PropTypes.string,
        address: PropTypes.string,
        desc: PropTypes.string,
        created_at: PropTypes.string,
        lng: PropTypes.number,
        lat: PropTypes.number
      })
    })
  )
};

export default MainPage;
