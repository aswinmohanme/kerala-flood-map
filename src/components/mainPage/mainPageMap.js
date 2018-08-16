import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MainPageMap = withGoogleMap(props => (
  <GoogleMap center={props.position} defaultZoom={13}>
    {props.markers.map(marker => (
      <Marker key={marker.lat + marker.lng} position={marker} />
    ))}
  </GoogleMap>
));

export default MainPageMap;
