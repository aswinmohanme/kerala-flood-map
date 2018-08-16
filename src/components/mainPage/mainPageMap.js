import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MainPageMap = withGoogleMap(props => (
  <GoogleMap center={props.position} zoom={props.zoomLevel}>
    {props.markers.map((marker, index) => (
      <Marker
        onClick={props.onMarkerClick(index)}
        key={marker.lat + marker.lng}
        position={marker}
      />
    ))}
  </GoogleMap>
));

export default MainPageMap;
