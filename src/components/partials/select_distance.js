import PropTypes from "prop-types";
import React from "react";

export const SelectDistance = ({ onChangeDistance, distance_selected }) => (
  <select
    name="select_distance"
    value={distance_selected}
    onChange={onChangeDistance}
    className="link black ba pa2 mr2 br2"
  >
    {[1, 5, 10].map(function(n) {
      return (
        <option value={n} key={"distance-" + n}>
          {n} km
        </option>
      );
    })}
  </select>
);

SelectDistance.propTypes = {
  onChangeDistance: PropTypes.func.isRequired,
  distance_selected: PropTypes.number.isRequired
};
