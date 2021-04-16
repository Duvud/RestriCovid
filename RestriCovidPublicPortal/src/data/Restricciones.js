import React,{useState} from "react";
import axios from 'axios';

export const ListaRestricciones = () => {
    //Url para conseguir datos y hook dónde guardaremos los datos
    const url = 'https://localhost:44394/RestriCovid/restricciones';
    let datos = [];

    const config = {
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        }

    //Hacemos un fetch de los datos y los almacenamos con guardarDatos() y los devolvemos
    axios.get(url,config).then((response) => response.json()).then((response) => datos = response);
    alert("Daaatos");
    console.log(datos);
    return datos;
}

export default ListaRestricciones;