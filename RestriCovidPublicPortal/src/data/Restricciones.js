import {React, useState} from "react";
import axios from 'axios';

export const ListaRestricciones = async (props) => {
    //Url para conseguir datos y hook dónde guardaremos los datos
    const url = 'https://localhost:44394/RestriCovid/restricciones';
    const [datosRestricciones, guardarDatosRestricciones] = useState([]);

    //Hacemos un fetch de los datos y los almacenamos con guardarDatos() y los devolvemos
    await fetch(url).then(async (response) => {await alert(response);response.json()}).then( (data) => {alert(data)});
    return (datosRestricciones);
}

export default ListaRestricciones;