import React from "react";
import { withGoogleMap, GoogleMap } from "react-google-maps";

const MainPageMap = withGoogleMap(props => (
  <GoogleMap
    defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
    defaultZoom={13}
  />
));

export default MainPageMap;
