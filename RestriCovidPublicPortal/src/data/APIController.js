
//Este metodo devuelve todas las restricciones de la api en un array de objetos
export const Restricciones = async () => {
    //Url para conseguir datos y hook dónde guardaremos los datos
    const url = 'http://51.137.96.183:5001/RestriCovid/restriccionesPoblaciones';
    let datos = [];

    await fetch(url).then(response => response.json()).then(data => datos = data);
    return datos;
}

//Este metodo devuelve todas las restricciones de la poblacion que le pases por parametro en forma de código postal
export const RestriccionesCodigoPostal = async (codigoPostal) => {
    const url = `http://51.137.96.183:5001/RestriCovid/restricciones/${codigoPostal}`;
    let datosCodigoPostal = [];

    await fetch(url).then(response => response.json()).then(data => datosCodigoPostal = data);
    return datosCodigoPostal;
}


//Este metodo te devuelve todos los datos de las distintas poblaciones haciendo una llamada a la api
export const Poblaciones = async () => {
    const url = 'http://51.137.96.183:5001/RestriCovid/poblaciones';
    let datosPoblaciones = [];

    await fetch(url).then(response => response.json()).then(data => datosPoblaciones = data);
    return datosPoblaciones;
}

export default Restricciones;