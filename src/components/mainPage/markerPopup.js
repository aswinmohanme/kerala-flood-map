import React from "react";
import { Popup } from "react-leaflet";
import dateFormat from "dateformat";

const MarkerPopup = props => {
  const { marker } = props;
  return (
    <Popup>
      <div className="">
        <h3 className="f3">{marker.requestee}</h3>
        {marker.needrescue && (
          <p className="f6">Need Rescue : {marker.detailrescue}</p>
        )}
        {marker.is_request_for_others ? (
          <p className="f6">Request for Others at {marker.location}</p>
        ) : (
          <p className="f6">Location : {marker.location}</p>
        )}
        <p className="f6">Phone Number : {marker.requestee_phone}</p>{" "}
        {marker.needfood && <p className="f6">Need Food {marker.detailfood}</p>}{" "}
        {marker.needcloth && (
          <p className="f6">Need Cloth {marker.detailcloth}</p>
        )}
        {marker.needwater && (
          <p className="f6">Need Water {marker.detailwater}</p>
        )}
        {marker.needkit_util && (
          <p className="f6">Need Kitchen Utils {marker.detailkit_util}</p>
        )}
        {marker.needtoilet && (
          <p className="f6">Need Toilet {marker.detailtoilet}</p>
        )}
        {marker.needmed && (
          <p className="f6">Need Medical {marker.detailmed}</p>
        )}
        <p className="f6">{marker.needothers}</p>
        <a href={"http://maps.google.com/maps?q=loc:" + marker.latlng}>
          Navigate to the location
        </a>
        <p className="f6">Location accuracy: {marker.latlng_accuracy}</p>
        <p className="f6">
          Created at {dateFormat(marker.dateadded, "default")}
        </p>
      </div>
    </Popup>
  );
};

export default MarkerPopup;
