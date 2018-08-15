import React from "react";
import PropTypes from "prop-types";

import MainPageMap from "./mainPageMap";

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <MainPageMap
          containerElement={<div style={{ height: `500px`, width: "500px" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default MainPage;
