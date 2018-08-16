import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

function isValidCoords(latlng) {
  const lat = parseFloat(latlng.split(",")[0]);
  const lng = parseFloat(latlng.split(",")[1]);

  if (isNaN(lat) || isNaN(lng)) return false;
  else return true;
}
function returnCoord(latlng) {
  const lat = parseFloat(latlng.split(",")[0]);
  const lng = parseFloat(latlng.split(",")[1]);
  return [lat, lng];
}
const MainPageMap = props => (
  <Map center={props.position} zoom={props.zoomLevel}>
    <TileLayer
      attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {props.markers.map(
      (marker, index) =>
        isValidCoords(marker.latlng) && !marker.is_request_for_others ? (
          <Marker position={returnCoord(marker.latlng)}>
            <Popup>
              <div className="">
                <h3 className="f3">{marker.requestee}</h3>
                <p className="f6">Location : {marker.location}</p>
                <p className="f6">Phone Number : {marker.requestee_phone}</p>
                {marker.needfood && (
                  <p className="f6">Need Food : {marker.detailfood}</p>
                )}
                {marker.needcloth && (
                  <p className="f6">Need Cloth : {marker.detailcloth}</p>
                )}
                {marker.needwater && (
                  <p className="f6">Need Water : {marker.detailwater}</p>
                )}
                {marker.needkit_util && (
                  <p className="f6">
                    Need Kitchen Utils : {marker.detailkit_util}
                  </p>
                )}
                {marker.needtoilet && (
                  <p className="f6">Need Toilet : {marker.detailtoilet}</p>
                )}
                {marker.needmed && (
                  <p className="f6">Need Medical : {marker.detailmed}</p>
                )}
                <p className="f6">{marker.needothers}</p>
              </div>
            </Popup>
          </Marker>
        ) : null
    )}
  </Map>
);

export default MainPageMap;
