import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import useGeolocation from "../../hooks/useGeoLocation";
import { useNavigate } from "react-router-dom";
import { useHotels } from "../../context/HotelsProvider";
import useUrlPositioin from "../../hooks/useUrlPosition";
import { MdLocationOn } from "react-icons/md";

function Map() {
  const { hotels } = useHotels();
  const [lat, lng] = useUrlPositioin();
  const [mapPosition, setMapPosition] = useState([50, 10]);
  const {
    isLoading: iLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(() => {
    if (lng && lat) setMapPosition([lat, lng]);
  }, [lng, lat]);

  useEffect(() => {
    if (geoLocationPosition?.lat)
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className="mapContainer">
      <button className="getLocation" onClick={getPosition}>
        {iLoadingPosition ? "Loading..." : "Use Your Location"}
      </button>
      <MapContainer
        zoom={6}
        scrollWheelZoom={true}
        center={mapPosition}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {hotels.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`bookmark?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
