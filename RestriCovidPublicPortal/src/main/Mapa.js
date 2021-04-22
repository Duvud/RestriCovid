import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';


export const Mapa = (props) => {
  return(
  <MapContainer center={[43, -2.75]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[43, -2.75]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  </MapContainer>
  );
}


export default Mapa;


