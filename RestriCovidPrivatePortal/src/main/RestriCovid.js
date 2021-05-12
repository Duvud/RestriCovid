import React, { useState, useEffect } from "react";
import logo from '../res/img/RestriCovid.png';
import styles from '../css/RestriCovid.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Poblaciones, RestriccionesCodigoPostal, DatosRestricciones} from '../data/APIController.js';
//import { Input, Button, Alert } from 'antd';
import { Alert } from 'antd';
import BotonEliminar from '../ui/BotonEliminar'
import FormRestricciones from '../ui/FormRestricciones';
import Select from 'react-select';




//Función principal donde almacenaremos todas las funciones y los componentes
const RestriCovid = () => {
  //Hooks useState
  const [poblacion, guardarPoblacion] = useState({});
  const [poblacionesSelect, guardarPoblacionesSelect] = useState([]);
  const [boolCodigoValidado, guardarCodigoValidado] = useState(null);
  const [arRestricciones, guardarArRestricciones] = useState([]);
  const [boolMostrarRestricciones, guardarBoolMostrarRestricciones] = useState(false);
  const [arPoblaciones, guardarArPoblaciones] = useState([]);
  const [arDatosSelect, guardarArSelect] = useState([]);
  const [boolRecargarRestricciones, guardarRecargarRestricciones] = useState(false)
  
  
  //Está función cargará los datos haciendo una petición a la API y llama al validador de código postal
  const MostrarRestricciones = async poblacion => {
    let datosRestricciones = await RestriccionesCodigoPostal(poblacion);
    guardarArRestricciones(await RestriccionesCodigoPostal(poblacion));
    if(datosRestricciones.length === 0){
        guardarBoolMostrarRestricciones(false);
    }else{
        guardarBoolMostrarRestricciones(true);
    }
  }
  
  const funcionRecargar = () => {
    guardarRecargarRestricciones(!boolRecargarRestricciones);
  }


  const PrepararRestriccionesSelect = async () =>{
    let datosRestricciones = await DatosRestricciones();
    if(datosRestricciones !== undefined){
      guardarArSelect(datosRestricciones);
    }
  }

  
  
  /**
   * Esta función es llamada
   * por un hook para cargar las poblaciones
   * lo único que hace es llamar a el metodo importado
   * poblaciones que consigue los datos
   * y después guardarlos en el hook arPoblaciones
   */
  const CargarPoblaciones = async () => {
    let datosPoblaciones = await Poblaciones();
    if(datosPoblaciones !== undefined){
      guardarArPoblaciones(datosPoblaciones);
    }
  }


  const PrepararPoblacionesSelect = () => {
    let datosPoblacionesSelect = [];
    arPoblaciones.forEach(poblacion => {
        datosPoblacionesSelect.push({label : "" + poblacion.poblacion  + " (" + poblacion.cp + ")", value: {id:poblacion.id, codigo: poblacion.cp}});
    }); 
    return datosPoblacionesSelect;
  }




  /**
   * Este useEffect llama a la funcion que carga las poblaciones
   * una vez se inicia la página para poder generar los marcadores del mapa
   */
  useEffect(() => {
    if(poblacion.value !== undefined)
      MostrarRestricciones(poblacion.value.codigo);
  },[boolRecargarRestricciones,poblacion,arDatosSelect,boolMostrarRestricciones]);



  useEffect(() => {
    CargarPoblaciones();
    PrepararRestriccionesSelect();
    PrepararPoblacionesSelect();
  },[]);

  /**
   * Este useEffect activa la generación de tabla de restricciones
   * si los datos de la API han llegado
   */
  useEffect(() => {
    if (arRestricciones !== [] && arRestricciones.length !== 0) {
      guardarBoolMostrarRestricciones(true);
    }
  }, [arRestricciones]);


  //Componente que prepara el logo centrado en la parte superior de la página
  function Logo(props) {
    return (
      <>
      <div className={`${styles.dImagen} col-xl-3 col-lg-4 col-md-5 col-sm-6 col-8`}>
        <img src={logo} alt="Logo RestriCovid" />  
      </div>
      <div className={`${styles.dSubtitulo} col-xl-3 col-lg-4 col-md-5 col-sm-6 col-8`}>
        <h3>Portal privado</h3>
      </div>
      </>
    );
  }

  function SelectPoblacion(props){
    let datosSelectPoblacion = PrepararPoblacionesSelect();

    return (
      <div className={`m-auto text-center col-xl-3 col-lg-4 col-md-5 col-sm-6 col-12`}>
        <Select
        defaultValue={poblacion}
        onChange={(e) => {guardarPoblacion(e);funcionRecargar();console.log("e => ",e)}}
        options={datosSelectPoblacion}
        placeholder={'Elige las restricciones que quieras asignar'}
      />
      </div>
    )
  }


  /**
   * Este componente recorrerá los datos de
   * las restricciones proporcionados por la API
   * y las mostrará en un panel en la parte inferior de
   * la ventana
   */
  function Restricciones(props) {
    return (
      <>
        <div className={`m-auto text-center col-xl-4 col-lg-5 col-md-6 col-sm-7 col-11`}>
          <ul className={'list-group'}>
              {props.datosRestricciones.map( (restriccion,i) => {
                return(
                  <>
                    <li key={`liRestriccion${i}`} className={'list-group-item list-group-item-action list-group-item-light mt-2'}>{` ${restriccion.id} :  ${restriccion.abreviacion} `} <BotonEliminar key={`BotonEliminarRestriccion${i}`} funcionRecargar={funcionRecargar} datosRestriccion={restriccion} datosPoblacion={poblacion} texto={'Eliminar restricción'}></BotonEliminar></li>
                  </>
                )
              } )}
          </ul>
        </div>
      </>
    );
  }

  return (
    <>
    <div className={'mb-5'}>
      <Logo></Logo>
    </div>       

    <div className={'mb-3'}>
      <SelectPoblacion/>
    </div>
    

      {boolMostrarRestricciones === true   ? (
        <>
          <div className={`mt-8 m-auto col-6 text-center col-xl-5 col-lg-6 col-md-7 col-sm-9 col-12`}>
            <Alert type="success" message="Restricciones cargadas correctamente" />
          </div>
          <div className={`mb-5 mt-3`}>
            <Restricciones datosRestricciones={arRestricciones}></Restricciones>
          </div>
        </>
      )  : boolMostrarRestricciones === false && poblacion.label !== undefined ? (
        <>
          <div className={`mt-8  m-auto col-6 text-center col-xl-5 col-lg-6 col-md-7 col-sm-9 col-12`}>
            <Alert type="error" message={`No hay restricciones en ${poblacion.label}`} />
          </div>
        </>
      ) : null}
      <div className={`mt-4`}>
        <FormRestricciones funcionRecargar={funcionRecargar} datos={arDatosSelect} poblacion={poblacion}></FormRestricciones>
      </div>
    </>
    
    

  );
}

export default RestriCovid;