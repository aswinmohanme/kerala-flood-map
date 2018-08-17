import React from "react";
import { Popup } from "react-leaflet";

const MarkerPopupOther = props => {
  const { marker } = props;
  return (
    <Popup>
      <div className="">
        <h3 className="f3">{marker.Name}</h3>

        <p className="f6">Contact Name: {marker.Contact_Name}</p>

        <p className="f6">Contact Number : {marker.Contact_Number}</p>

        <p className="f6">Type of Service : {marker.Type_of_Service}</p>

        <p className="f6">Details: {marker.Details}</p>

        <p className="f6">{marker.needothers}</p>
        <a href={"http://maps.google.com/maps?q=loc:" + marker.geometry}>
          Navigate to the location
        </a>
      </div>
    </Popup>
  );
};

export default MarkerPopupOther;
