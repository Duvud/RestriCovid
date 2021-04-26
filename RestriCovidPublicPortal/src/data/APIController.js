
//Este metodo devuelve todas las restricciones de la api en un array de objetos
export const Restricciones = async () => {
    //Url para conseguir datos y hook dónde guardaremos los datos
    const url = 'https://localhost:5001/RestriCovid/restricciones';
    let datos = [];

    await fetch(url).then(response => response.json()).then(data => datos = data);
    return datos;
}


export const RestriccionesCodigoPostal = async (codigoPostal) => {
    const url = `https://localhost:5001/RestriCovid/restricciones/${codigoPostal}`;
    let datosCodigoPostal = [];

    await fetch(url).then(response => response.json()).then(data => datosCodigoPostal = data);
    console.log( "url =>" , url);
    console.log(datosCodigoPostal);
    return datosCodigoPostal;
}

export const Poblaciones = async () => {
    const url = 'https://localhost:5001/RestriCovid/poblaciones';
    let datosPoblaciones = [];

    await fetch(url).then(response => response.json()).then(data => datosPoblaciones = data);
    console.log( "url =>" , url);
    console.log(datosPoblaciones);
    return datosPoblaciones;
}

export default Restricciones;