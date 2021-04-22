import React, { useState, useEffect } from "react";
import logo from '../res/img/RestriCovid.png';
import styles from '../css/RestriCovid.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Mapa from './Mapa.js';
import ListaRestricciones from '../data/Restricciones.js';
import { Input, Button, List, Divider, Alert } from 'antd';




//Función principal donde almacenaremos todas las funciones y los componentes
const RestriCovid = () => {
  //Hooks useState
  const [codigoPostal, guardarCodigoPostal] = useState("");
  const [boolCodigoValidado, guardarCodigoValidado] = useState(null);
  const [objRestricciones, guardarObjRestricciones] = useState({});
  const [boolMostrarRestricciones, guardarBoolMostrarRestricciones] = useState(false);
  

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
  const MostrarRestricciones = codigoPostal => {
    if(ValidarCodigoPostal(codigoPostal) === false){
      guardarCodigoValidado(false);
    }else{
      guardarCodigoValidado(true);
      console.log("Datos api =>", ListaRestricciones());
      let datos = ListaRestricciones();
      guardarObjRestricciones(datos);
      console.log("objeto restricciones => ", objRestricciones);
    }
  }

  /**
   * Este useEffect activa la generación de tabla de restricciones
   * si los datos de la API han llegado
   */
  useEffect(() => {
    if (objRestricciones.arRestricciones !== undefined) {
      guardarBoolMostrarRestricciones(true);
    }
  }, [objRestricciones]);

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
      <>
        <div className={`m-auto col-6 text-center col-xl-5 col-lg-6 col-md-7 col-sm-9 col-12`}>
          <Divider orientation="center">Restricciones</Divider>
          <List
            bordered
            dataSource={props.datos.arRestricciones}
            renderItem={item => (
            <List.Item>
                {` ${item.zona} : ${item.restriccion} `}
            </List.Item>
            )}
           />
        </div>
      </>
    );
  }

  return (
    <>
      <Logo></Logo>
      <div className={`${styles.dPostal}`}>
        <div className={'mb-1'}>
          <label>Introduce tu código postal</label>
        </div>
        <div className={`mt-6 m-auto col-xl-4 col-lg-6 col-md-7 col-sm-9 col-12`}>
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
        <Mapa></Mapa>
      </div>

      {boolMostrarRestricciones === true && boolCodigoValidado === true ? (
        <>
          <div className={`m-auto col-6 text-center col-xl-5 col-lg-6 col-md-7 col-sm-9 col-12`}>
            <Alert type="success" message="Restricciones cargadas correctamente" />
          </div>
          <div >
            <Restricciones datos={objRestricciones}></Restricciones>
          </div>
        </>
      ) : boolCodigoValidado === false ? (
        <>
          <div className={`m-auto col-6 text-center col-xl-5 col-lg-6 col-md-7 col-sm-9 col-12`}>
            <Alert type="error" message="Por favor, introduce el formato de codigo postal correcto ('12345' por ejemplo)" />
          </div>
        </>
      ) : null}
    </>
  );
}

export default RestriCovid;
