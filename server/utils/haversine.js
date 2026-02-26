/**
 * Haversine Formula – Calculate distance between two GPS points in km
 * This is the core of the Antigravity nearest-doctor assignment logic.
 *
 * @param {number} lat1 - Patient latitude
 * @param {number} lng1 - Patient longitude
 * @param {number} lat2 - Doctor latitude
 * @param {number} lng2 - Doctor longitude
 * @returns {number} Distance in kilometers (rounded to 1 decimal)
 */
function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth radius in km
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

module.exports = { haversineDistance };
