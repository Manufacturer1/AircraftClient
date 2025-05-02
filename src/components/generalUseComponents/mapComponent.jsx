// components/MapComponent.jsx
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import the marker images directly
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Haversine formula to calculate distance between two coordinates in kilometers
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const MapComponent = ({ routePoints, airports }) => {
  if (!routePoints || routePoints.length < 2) return null;

  const routeAirports = routePoints
    .map((iata) => airports.find((a) => a.iata === iata))
    .filter(Boolean);

  if (routeAirports.length < 2) return null;

  const routeCoords = routeAirports.map((a) => [a.latitude, a.longitude]);

  // Calculate total distance
  let totalDistance = 0;
  for (let i = 0; i < routeCoords.length - 1; i++) {
    const [lat1, lon1] = routeCoords[i];
    const [lat2, lon2] = routeCoords[i + 1];
    totalDistance += calculateDistance(lat1, lon1, lat2, lon2);
  }
  const formattedDistance = `${totalDistance.toFixed(1)} km`;

  // Midpoint to center the map
  const midpointIndex = Math.floor(routeCoords.length / 2);
  const mapCenter = routeCoords[midpointIndex];

  return (
    <div className="h-80 w-full rounded-lg overflow-hidden relative">
      <MapContainer
        center={mapCenter}
        zoom={4}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {routeAirports.map((airport, index) => (
          <Marker
            key={airport.iata}
            position={[airport.latitude, airport.longitude]}
          >
            <Popup>
              <div>
                <strong>{airport.name}</strong>
                <p>({airport.iata})</p>
              </div>
            </Popup>
          </Marker>
        ))}
        <Polyline
          positions={routeCoords}
          color="blue"
          weight={2}
          dashArray="5, 5"
        >
          <Tooltip permanent direction="center" className="distance-tooltip">
            {formattedDistance}
          </Tooltip>
        </Polyline>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
