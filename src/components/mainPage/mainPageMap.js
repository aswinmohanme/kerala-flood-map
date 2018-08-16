import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import PropTypes from "prop-types";

import RedMarker from "../../assets/red-dot.png";
import BlueMarker from "../../assets/blue-dot.png";
import GreenMarker from "../../assets/green-dot.png";
import MarkerShadow from "../../assets/marker-shadow.png";

import { isValidCoords, returnCoord, isAccurate } from "./utils";

const redMarkerIcon = new L.Icon({
  iconUrl: RedMarker,
  shadowUrl: MarkerShadow
});

const blueMarkerIcon = new L.Icon({
  iconUrl: BlueMarker,
  shadowUrl: MarkerShadow
});

const greenMarkerIcon = new L.Icon({
  iconUrl: GreenMarker,
  shadowUrl: MarkerShadow
});

const MainPageMap = props => (
  <Map center={props.position} zoom={props.zoomLevel}>
    <TileLayer
      attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {props.markers.map(
      (marker, index) =>
        isValidCoords(marker.latlng) && isAccurate(marker.latlng_accuracy) ? (
          <Marker
            icon={
              marker.is_request_for_others
                ? greenMarkerIcon
                : marker.needrescue
                  ? redMarkerIcon
                  : blueMarkerIcon
            }
            position={returnCoord(marker.latlng)}
            key={"marker-item-" + index}
          >
            <Popup>
              <div className="">
                <h3 className="f3">{marker.requestee}</h3>
                {marker.needrescue && (
                  <p className="f6">Need Rescue : {marker.detailrescue}</p>
                )}
                {marker.is_request_for_others ? (
                  <p className="f6">Request for Others at {marker.location}</p>
                ) : (
                  <p className="f6">Location : {marker.location}</p>
                )}
                <p className="f6">Phone Number : {marker.requestee_phone}</p>
                {marker.needfood && (
                  <p className="f6">Need Food {marker.detailfood}</p>
                )}
                {marker.needcloth && (
                  <p className="f6">Need Cloth {marker.detailcloth}</p>
                )}
                {marker.needwater && (
                  <p className="f6">Need Water {marker.detailwater}</p>
                )}
                {marker.needkit_util && (
                  <p className="f6">
                    Need Kitchen Utils {marker.detailkit_util}
                  </p>
                )}
                {marker.needtoilet && (
                  <p className="f6">Need Toilet {marker.detailtoilet}</p>
                )}
                {marker.needmed && (
                  <p className="f6">Need Medical {marker.detailmed}</p>
                )}
                <p className="f6">{marker.needothers}</p>
                <a href={"http://maps.google.com/maps?q=loc:" + marker.latlng}>
                  Navigate to the location
                </a>
                <p className="f6">
                  Location accuracy: {marker.latlng_accuracy}
                </p>
              </div>
            </Popup>
          </Marker>
        ) : null
    )}
  </Map>
);

MainPageMap.propTypes = {
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

export default MainPageMap;
