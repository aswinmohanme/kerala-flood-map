import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";

import RedMarker from "../../assets/red-dot.png";
import BlueMarker from "../../assets/blue-dot.png";
import GreenMarker from "../../assets/green-dot.png";
import BlackMarker from "../../assets/black-dot.png";
import MarkerShadow from "../../assets/marker-shadow.png";

import MarkerPopup from "./markerPopup";
import MarkerPopupOther from "./markerPopupOther";
require("react-leaflet-markercluster/dist/styles.min.css");

function isValidCoords(latlng) {
  const lat = parseFloat(latlng.split(",")[0]);
  const lng = parseFloat(latlng.split(",")[1]);

  if (isNaN(lat) || isNaN(lng)) return false;
  else return true;
}

function isAccurate(accuracy) {
  const meters = parseInt(accuracy.match(/\d+/g));

  return meters <= 3000;
}

function returnCoord(latlng) {
  const lat = parseFloat(latlng.split(",")[0]);
  const lng = parseFloat(latlng.split(",")[1]);
  return [lat, lng];
}

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

const BlackMarkerIcon = new L.Icon({
  iconUrl: BlackMarker,
  shadowUrl: MarkerShadow
});

const getMarker = ({ is_request_for_others, needrescue }) => {
  if (is_request_for_others) {
    return greenMarkerIcon;
  }

  if (needrescue) {
    return redMarkerIcon;
  }

  return blueMarkerIcon;
};

const MainPageMap = props => (
  <Map
    className="markercluster-map"
    center={props.position}
    zoom={props.zoomLevel}
  >
    <TileLayer
      attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {props.gMarkers.map(
      (gMarkers, index) =>
        isValidCoords(gMarkers.geometry) ? (
          <Marker
            icon={BlackMarkerIcon}
            position={returnCoord(gMarkers.geometry)}
          >
            <MarkerPopupOther marker={gMarkers} />
          </Marker>
        ) : null
    )}
    <MarkerClusterGroup spiderfyOnMaxZoom={false} disableClusteringAtZoom={12}>
      {props.markers.map(
        (marker, index) =>
          isValidCoords(marker.latlng) && isAccurate(marker.latlng_accuracy) ? (
            <Marker
              icon={getMarker(marker)}
              position={returnCoord(marker.latlng)}
            >
              <MarkerPopup marker={marker} />
            </Marker>
          ) : null
      )}
    </MarkerClusterGroup>
  </Map>
);

export default MainPageMap;
