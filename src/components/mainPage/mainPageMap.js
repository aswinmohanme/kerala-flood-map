import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import L from "leaflet";

import RedMarker from "../../assets/red-dot.png";
import BlueMarker from "../../assets/blue-dot.png";
import GreenMarker from "../../assets/green-dot.png";
import MarkerShadow from "../../assets/marker-shadow.png";
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
    <MarkerClusterGroup>
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
            >
              <Popup>
                <div className="">
                  <h3 className="f3">{marker.requestee}</h3>
                  {marker.needrescue && (
                    <p className="f6">Need Rescue : {marker.detailrescue}</p>
                  )}
                  {marker.is_request_for_others ? (
                    <p className="f6">
                      Request for Others at {marker.location}
                    </p>
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
                  <a
                    href={"http://maps.google.com/maps?q=loc:" + marker.latlng}
                  >
                    Navigate to the location
                  </a>
                  <p className="f6">
                    Location accuracy: {marker.latlng_accuracy}
                  </p>
                  <p> Updated at: {marker.dateadded.replace("T", " Time: ")}</p>
                </div>
              </Popup>
            </Marker>
          ) : null
      )}
    </MarkerClusterGroup>
  </Map>
);

export default MainPageMap;
