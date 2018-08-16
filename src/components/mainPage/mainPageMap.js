import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import blueDotMarker from "../../assets/blue-dot.png";
import greenDotMarker from "../../assets/green-dot.png";
import redDotMarker from "../../assets/red-dot.png";

const MainPageMap = withGoogleMap(props => (
  <GoogleMap center={props.position} zoom={props.zoomLevel}>
    {props.markers.map((marker, index) => (
      <Marker
        icon={marker.isMedicalEmergency ? null : blueDotMarker}
        onClick={props.onMarkerClick(index)}
        key={marker.lat + marker.lng}
        position={marker}
      />
    ))}
  </GoogleMap>
));

export default MainPageMap;
