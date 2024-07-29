import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

const Map = ({ product, mapStyle, position, address }) => {
  const [mapPosition, setMapPosition] = useState([0, 0]);

  useEffect(() => {
    if (position) setMapPosition([position?.lat, position?.lng]);
  }, [position]);

  return (
    <div className={mapStyle}>
      <MapContainer
        center={mapPosition}
        zoom={3}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition}>
          <Popup>
            {address?.principalSubdivision} <br /> {address?.city}{' '}
            {address?.postcode}
          </Popup>
        </Marker>
        <ChangeCenter position={position} />
      </MapContainer>
    </div>
  );
};

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  position && map.setView([position?.lat, position?.lng]);
  return null;
}
