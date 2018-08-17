import React from "react";
import { Map, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";

import RedMarker from "../../assets/red-dot.png";
import BlueMarker from "../../assets/blue-dot.png";
import GreenMarker from "../../assets/green-dot.png";
import MarkerShadow from "../../assets/marker-shadow.png";

import MarkerPopup from "./markerPopup";
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
    <MarkerClusterGroup spiderfyOnMaxZoom={false} disableClusteringAtZoom={12}>
      {props.markers.map(
        (marker, index) =>
          isValidCoords(marker.latlng) && isAccurate(marker.latlng_accuracy) ? (
            <CircleMarker
              radius={25}
              fill="true"
              color="red"
              position={returnCoord(marker.latlng)}
            >
              <MarkerPopup marker={marker} />
            </CircleMarker>
          ) : null
      )}
    </MarkerClusterGroup>
  </Map>
);

export default MainPageMap;
