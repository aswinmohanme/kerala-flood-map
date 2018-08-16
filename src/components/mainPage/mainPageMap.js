import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const MainPageMap = props => (
  <Map center={props.position} zoom={props.zoomLevel}>
    <TileLayer
      attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {props.markers.map((marker, index) => (
      <Marker
        position={[
          parseFloat(marker.latlng.split(",")[0]),
          parseFloat(marker.latlng.split(",")[1])
        ]}
      >
        <Popup>
          <h1>Why</h1>
        </Popup>
      </Marker>
    ))}
  </Map>
);

export default MainPageMap;
