import {React, useState} from "react";
import axios from 'axios';


//Este metodo devuelve todas las restricciones de la api en un array de objetos
export const Restricciones = async () => {
    //Url para conseguir datos y hook dónde guardaremos los datos
    const url = 'https://localhost:5001/RestriCovid/restricciones';
    let datos = [];

    await fetch(url).then(response => response.json()).then(data => datos = data);
    return datos;
}


export const RestriccionesCodigoPostal = async (codigoPostal) => {
    const url = 'https://localhost:5001/RestriCovid/restricciones';
    let datosCodigoPostal = [];

    await fetch(url).then(response => response.json()).then(data => datosCodigoPostal = data);
    return datosCodigoPostal;
}

export default Restricciones;