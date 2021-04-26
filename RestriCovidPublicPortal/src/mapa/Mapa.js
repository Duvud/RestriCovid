import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';



/**
 * 
 * @param {*} props 
 * @returns Mapa de la api de react-leaflet
 * 
 * esta función devuelve el mapa completo de react leaflet con los marcadores
 * ya puestos 
 */
export const Mapa = (props) => {
  return (
    <>
    <MapContainer center={[43.0000000, -2.7500000]} zoom={8} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
          <Marcadores datos={props.datos} funcion={props.funcionMarcadores} />
    </MapContainer>
    </>
    );
}


/**
 * 
 * @param {*} props 
 * @returns React leaflet markers
 * 
 * Esta función recorre las diferentes posiciones que nos llegan desde la base de datos
 * pasandola por props 
 */
const Marcadores = (props) => {
  return(
    <>
      {props.datos !== undefined && props.datos.length !== 0 ? (
      props.datos.map ((marcador,i) => {
          return (
              <>
                <Marker key={marcador.cp} eventHandlers={ { click : () => props.funcion(marcador.cp) } } position={[marcador.posX,marcador.posY]}>
                    <Popup>
                    {`Nombre : ${marcador.poblacion} | Código : ${marcador.cp}`}
                    </Popup>
                </Marker>
              </>
          );
      })
    ) : null}
    </>
  );
}


export default Mapa;