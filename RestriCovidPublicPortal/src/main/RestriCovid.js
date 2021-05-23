import React, { useState, useEffect } from "react";
import logo from '../res/img/RestriCovid.png';
import styles from '../css/RestriCovid.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Poblaciones, RestriccionesCodigoPostal } from '../data/APIController.js';
import { Input, Button, Alert } from 'antd';
import { Mapa } from '../mapa/Mapa.js';




//Función principal donde almacenaremos todas las funciones y los componentes
const RestriCovid = () => {
  //Hooks useState
  const [codigoPostal, guardarCodigoPostal] = useState("");
  const [boolCodigoValidado, guardarCodigoValidado] = useState(null);
  const [arRestricciones, guardarArRestricciones] = useState([]);
  const [boolMostrarRestricciones, guardarBoolMostrarRestricciones] = useState(false);
  const [arPoblaciones, guardarArPoblaciones] = useState([]);
  
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

  /**
   * Esta función es llamada
   * por un hook para cargar las poblaciones
   * lo único que hace es llamar a el metodo importado
   * poblaciones que consigue los datos
   * y después guardarlos en el hook arPoblaciones
   */
  const cargarPoblaciones = async () => {
    let datosPoblaciones = await Poblaciones();
    guardarArPoblaciones(datosPoblaciones);
  }


  /**
   * Este useEffect llama a la funcion que carga las poblaciones
   * una vez se inicia la página para poder generar los marcadores del mapa
   */
  useEffect(() => {
    if(arPoblaciones.length === 0){
      cargarPoblaciones();
    }
  },);

  /**
   * Este useEffect activa la generación de tabla de restricciones
   * si los datos de la API han llegado
   */
  useEffect(() => {
    if (arRestricciones !== [] || arRestricciones.length !== 0) {
      guardarBoolMostrarRestricciones(true);
    }
  }, [arRestricciones]);


  //Componente que prepara el logo centrado en la parte superior de la página
  function Logo(props) {
    return (
      <div className={`${styles.dImagen} col-xl-3 col-lg-4 col-md-5 col-sm-6 col-8`}>
        <img src={logo} alt="Logo RestriCovid" />
      </div>
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
        <div className={`${styles.dRestricciones}  text-center col-xl-8 col-lg-9 col-md-10 col-sm-11 col-12`}>
          <ul  className={'list-group'}>
              {props.datos.map( (restriccion) => {
                return(
                    <li key={"liRestriccion :"+restriccion.id } className={'col-12 list-group-item list-group-item-action list-group-item-info mt-1 mb-3'}>{`${restriccion.abreviacion}`}</li>
                )
              } )}
          </ul>
        </div>
    );
  }

  return (
    <>
      <Logo></Logo>
      <div className={`${styles.dPostal}`}>
        <div className={'mb-1'}>
          <label>Introduce tu código postal</label>
        </div>
        <div className={`mt-6 m-auto col-xl-6 col-lg-7 col-md-8 col-sm-10 col-11`}>
          <Input
            id="id"
            key={"inputPostal"}
            type="text"
            defaultValue={codigoPostal}
            onChange={(e) => {
              guardarCodigoPostal(e.target.value);
            }}
          />
        </div>

        <div className={"mt-3"}>
          <Button
            className={"mb-5 "}
            id="btnMostrarRestricciones"
            onClick={() => MostrarRestricciones(codigoPostal)}
          >
            Mostrar Restricciones
          </Button>
        </div>
      </div>
      
      <div id="container">
        <Mapa datos={arPoblaciones} funcionMarcadores={MostrarRestricciones}></Mapa>
      </div>
       

      {boolMostrarRestricciones === true && boolCodigoValidado === true ? (
        <>
          <div className={`m-auto col-6 text-center col-xl-5 col-lg-6 col-md-7 col-sm-9 col-12`}>
            <Alert type="success" message="Restricciones cargadas correctamente" />
          </div>
          <div key={"dPrincipalRestricciones"} className={` ${styles.dRestricciones} `}>
            <Restricciones datos={arRestricciones}></Restricciones>
          </div>
        </>
      ) : boolCodigoValidado === false ? (
        <>
          <div className={`m-auto col-6 text-center col-xl-5 col-lg-6 col-md-7 col-sm-9 col-12`}>
            <Alert type="error" message="Por favor, introduce el formato de codigo postal correcto ('12345' por ejemplo)" />
          </div>
        </>
      ) : boolCodigoValidado === undefined ? (
        <>
          <div className={`m-auto col-6 text-center col-xl-5 col-lg-6 col-md-7 col-sm-9 col-12`}>
            <Alert type="error" message="Lo siento, ha ocurrido un error al intentar obtener los datos, por favor, asegurese de que está
            introduciendo un código postal de la región del País Vasco" />
          </div>
        </>
      ) : null}
    </>
  );
}

export default RestriCovid;