export function returnCoord(latlng) {
  const lat = parseFloat(latlng.split(",")[0]);
  const lng = parseFloat(latlng.split(",")[1]);
  return [lat, lng];
}

export function returnPosition(lat_lng_array) {
  return {
    latitude: lat_lng_array[0],
    longitude: lat_lng_array[1]
  };
}

export function isValidCoords(latlng) {
  const lat = parseFloat(latlng.split(",")[0]);
  const lng = parseFloat(latlng.split(",")[1]);

  if (isNaN(lat) || isNaN(lng)) return false;
  else return true;
}

export function isAccurate(accuracy) {
  const meters = parseInt(accuracy.match(/\d+/g));

  return meters <= 3000;
}
