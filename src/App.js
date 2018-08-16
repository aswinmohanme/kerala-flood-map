import React from "react";
import PropTypes from "prop-types";

import MainPage from "./components/mainPage";

import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyBdwwIAjheOKPbjEOkjCqui2Qj9VDwjKiI",
  authDomain: "kerala-flood-map.firebaseapp.com",
  databaseURL: "https://kerala-flood-map.firebaseio.com",
  projectId: "kerala-flood-map",
  storageBucket: "kerala-flood-map.appspot.com",
  messagingSenderId: "323879462165"
};
firebase.initializeApp(config);

const App = props => {
  return <MainPage />;
};

export default App;
