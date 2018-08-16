import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MainPageMap = withGoogleMap(props => (
  <GoogleMap center={props.position} zoom={props.zoomLevel}>
    {props.markers.map((marker, index) => (
      <Marker
        onClick={props.onMarkerClick(index)}
        position={{
          lat: parseFloat(marker.latlng.split(",")[0]),
          lng: parseFloat(marker.latlng.split(",")[1])
        }}
      />
    ))}
  </GoogleMap>
));

export default MainPageMap;
