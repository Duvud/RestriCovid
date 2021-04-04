import logo from './res/img/RestriCovid.png';
import styles from './RestriCovid.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Button, List, Divider, Alert } from 'antd';
import React, { useState, useEffect } from "react";

//Función principal donde almacenaremos toda la lógica y los componentes
function RestriCovid() {
  //Hooks useState
  const [codigoPostal, guardarCodigoPostal] = useState("");
  const [boolCodigoValidado, guardarCodigoValidado] = useState(null);
  const [objRestricciones, guardarObjRestricciones] = useState({});
  const [boolMostrarRestricciones, guardarBoolMostrarRestricciones] = useState(
    false
  );

  /**
   * Esta función valida el código postal asegurandose de que hay
   * 5 numeros del 0-9 y que no haya ningún otro caracter
   * 
   * @param {str} codigoPostal 
   * @returns false | true
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
      let datos = {
        codigo: codigoPostal,
        arRestricciones: [
          {
            id: 1,
            zona: "Lezo",
            restriccion:
              "No se puede salir de casa, solo para comprar alimentos indispensables",
          },
          {
            id: 2,
            zona: "San Sebastian",
            restriccion:
              "No se puede salir de casa, solo para comprar alimentos indispensables",
          },
        ],
      };
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
      <div className={styles.dImagen}>
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
        <div className={"mt-5 m-auto col-6"}>
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
        <div>
          <label>Introduce tu código postal</label>
        </div>
        <div className={`mt-6 m-auto col-xl-5 col-lg-6 col-md-7 col-sm-8 col-11`}>
          <Input
            id="id"
            key={"xd"}
            type="text"
            defaultValue={codigoPostal}
            onChange={(e) => {
              guardarCodigoPostal(e.target.value);
            }}
          />
        </div>

        <div className={"mt-5"}>
          <Button
            className={"mb-5"}
            id="btnMostrarRestricciones"
            onClick={() => MostrarRestricciones(codigoPostal)}
          >
            Mostrar Restricciones
          </Button>
        </div>
      </div>
      {boolMostrarRestricciones === true && boolCodigoValidado === true ? (
        <>
          <div className={`m-auto col-6`}>
            <Alert type="success" message="Restricciones cargadas correctamente" />
          </div>
          <div>
            <Restricciones datos={objRestricciones}></Restricciones>
          </div>
        </>
      ) : boolCodigoValidado === false && codigoPostal !== "" ? (
        <>
          <div className={`m-auto col-6`}>
            <Alert type="error" message="El codigo postal introducido no es correcto" />
          </div>
        </>
      ) : null}
    </>
  );
}

export default RestriCovid;
