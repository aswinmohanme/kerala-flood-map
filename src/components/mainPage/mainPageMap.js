import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MainPageMap = withGoogleMap(props => (
  <GoogleMap defaultCenter={{ lat: 10, lng: 76 }} defaultZoom={7}>
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
