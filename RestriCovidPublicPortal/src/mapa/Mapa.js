import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';

export const Mapa = () => {
  return (
    <MapContainer center={[43.0000000, -2.7500000]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
    );
}

export default Mapa;

