import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect, useState } from "react";

function Room() {
  const { id } = useParams();
  const { data, isLoading } = useFetch(`http://localhost:5000/hotels/${id}`);
  const { longitude, latitude } = data || {};
  const [mapPosition, setMapPosition] = useState([35, 0]);

  useEffect(() => {
    if (longitude || latitude) setMapPosition([latitude, longitude]);
  }, [longitude, latitude]);
  console.log(mapPosition);

  if (isLoading) return <Loader />;

  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{data.name}</h2>
        <div>
          {data.number_of_reviews} reviews &bull; {data.smart_location}
        </div>
        <img src={data.xl_picture_url} alt={data.name} />
      </div>
      <div className="mapContainer">
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
          <Marker position={mapPosition}>
            <Popup>
            {data.host_location}
            </Popup>
          </Marker>
          <ChangeCenter position={mapPosition} />
        </MapContainer>
      </div>
    </div>
  );
}

export default Room;

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
