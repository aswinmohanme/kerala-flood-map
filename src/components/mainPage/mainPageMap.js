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
          <div className="">
            <h3 className="f3">{marker.requestee}</h3>
            <p className="f6">Location : {marker.location}</p>
            <p className="f6">Phone Number : {marker.requestee_phone}</p>
            {marker.needfood && (
              <p className="f6">Food : {marker.detailfood}</p>
            )}
            {marker.needcloth && (
              <p className="f6">Cloth : {marker.detailcloth}</p>
            )}
            {marker.needwater && (
              <p className="f6">Water : {marker.detailwater}</p>
            )}
            {marker.needtoilet && (
              <p className="f6">Toilet : {marker.detailtoilet}</p>
            )}
            {marker.needmed && (
              <p className="f6">Medical : {marker.detailmed}</p>
            )}
            <p className="f6">{marker.needothers}</p>
          </div>
        </Popup>
      </Marker>
    ))}
  </Map>
);

export default MainPageMap;
