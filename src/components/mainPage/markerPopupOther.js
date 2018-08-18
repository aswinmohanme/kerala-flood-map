import React from "react";
import { Popup } from "react-leaflet";
import dateFormat from "dateformat";

const MarkerPopupOther = props => {
  const { marker } = props;
  return (
    <Popup>
      <div className="">
        <h3 className="f3">{marker.title}</h3>
        <p className="f6">Details: {marker.desc}</p>
        <p className="f6">Contact Name: {marker.person_name}</p>
        <p className="f6">
          Phone Number :
          <a className="f6" href={"tel:" + marker.requestee_phone}>
            {" "}
            {marker.requestee_phone}
          </a>
        </p>{" "}
        <p className="f6">Address : {marker.address}</p>
        <p className="f6">{marker.needothers}</p>
        <a
          href={
            "http://maps.google.com/maps?q=loc:" + marker.lat + "," + marker.lng
          }
        >
          Navigate to the location
        </a>
        <p className="f6">
          Created at {dateFormat(marker.created_at, "default")}
        </p>
      </div>
    </Popup>
  );
};

export default MarkerPopupOther;
