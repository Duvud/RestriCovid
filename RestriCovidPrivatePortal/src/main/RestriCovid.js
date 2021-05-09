import React, { useState, useEffect } from "react";
import logo from '../res/img/RestriCovid.png';
import styles from '../css/RestriCovid.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Poblaciones, RestriccionesCodigoPostal, DatosRestricciones} from '../data/APIController.js';
//import { Input, Button, Alert } from 'antd';
import { Alert } from 'antd';
import BotonEliminar from '../ui/BotonEliminar'
import FormRestricciones from '../ui/FormRestricciones';




//Función principal donde almacenaremos todas las funciones y los componentes
const RestriCovid = () => {
  //Hooks useState
  const [codigoPostal, guardarCodigoPostal] = useState({value:"20100",id:1});
  const [boolCodigoValidado, guardarCodigoValidado] = useState(null);
  const [arRestricciones, guardarArRestricciones] = useState([]);
  const [boolMostrarRestricciones, guardarBoolMostrarRestricciones] = useState(false);
  const [arPoblaciones, guardarArPoblaciones] = useState([]);
  const [arDatosSelect, guardarArSelect] = useState([]);
  
  /**
   * Esta función valida el código postal asegurandose de que hay
   * 5 numeros del 0-9 y que no haya ningún otro caracter
   * 
   * @param {str} codigoPostal 
   * @returns false || true
   */
  const ValidarCodigoPostal = codigoPostal => {
    return /[0-9]{5}/.test(codigoPostal) && /[^0-9]/.test(codigoPostal) === false ?  true : false
  }

  

  //Está función cargará los datos haciendo una petición a la API y llama al validador de código postal
  const MostrarRestricciones = async codigoPostal => {
    if(ValidarCodigoPostal(codigoPostal) === false){
      guardarCodigoValidado(false);
    }else{
      if(await (await RestriccionesCodigoPostal(codigoPostal)).length !== 0){
        guardarCodigoValidado(true);
        guardarArRestricciones(await RestriccionesCodigoPostal(codigoPostal));
      }else{
        guardarCodigoValidado(undefined);
      }
      
    }
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


  /**
   * Este useEffect llama a la funcion que carga las poblaciones
   * una vez se inicia la página para poder generar los marcadores del mapa
   */
  useEffect(() => {
    MostrarRestricciones("20100");
    PrepararRestriccionesSelect();
    if(arPoblaciones.length === 0){
      CargarPoblaciones();
    }
  },);

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

  /**
   * Este componente recorrerá los datos de
   * las restricciones proporcionados por la API
   * y las mostrará en un panel en la parte inferior de
   * la ventana
   */
  function Restricciones(props) {
    return (
      <>
        <div className={`m-auto col-6 text-center col-xl-5 col-lg-6 col-md-7 col-sm-9 col-12`}>
          <ul className={'list-group'}>
              {props.datosRestricciones.map( restriccion => {
                return(
                  <>
                    <li className={'list-group-item list-group-item-action list-group-item-light mt-2'}>{` ${restriccion.id} :  ${restriccion.abreviacion} `} <BotonEliminar datosRestriccion={restriccion} texto={'Eliminar restricción'}></BotonEliminar></li>
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

      {boolMostrarRestricciones === true && boolCodigoValidado === true ? (
        <>
          <div className={`mt-8 m-auto col-6 text-center col-xl-5 col-lg-6 col-md-7 col-sm-9 col-12`}>
            <Alert type="success" message="Restricciones cargadas correctamente" />
          </div>
          <div className={`mb-5 mt-3`}>
            <Restricciones datosRestricciones={arRestricciones}></Restricciones>
          </div>
        </>
      ) : boolCodigoValidado === false ? (
        <>
          <div className={`mt-2mt-2 m-auto col-6 text-center col-xl-5 col-lg-6 col-md-7 col-sm-9 col-12`}>
            <Alert type="error" message="Por favor, introduce el formato de codigo postal correcto ('12345' por ejemplo)" />
          </div>
        </>
      ) : boolCodigoValidado === undefined ? (
        <>
          <div className={`mt-2 m-auto col-6 text-center col-xl-5 col-lg-6 col-md-7 col-sm-9 col-12`}>
            <Alert type="error" message="Lo siento, ha ocurrido un error al intentar obtener los datos, por favor, asegurese de que está
            introduciendo un código postal de la región del País Vasco" />
          </div>
        </>
      ) : null}
      <div>
        <FormRestricciones datos={arDatosSelect} poblacion={codigoPostal}></FormRestricciones>
      </div>
    </>
    
    

  );
}

export default RestriCovid;