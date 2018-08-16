import React from "react";
import PropTypes from "prop-types";

import MainPageMap from "./mainPageMap";

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Hey</h1>
        <MainPageMap
          containerElement={<div style={{ height: "100vh", width: "100vw" }} />}
          mapElement={<div style={{ height: `100%`, width: "100%" }} />}
        />
      </div>
    );
  }
}

export default MainPage;
