
//Este metodo devuelve todas las restricciones de la api en un array de objetos
export const DatosRestricciones = async () => {
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
    return datosCodigoPostal;
}

export const Poblaciones = async () => {
    const url = 'https://localhost:5001/RestriCovid/poblaciones';
    let datosPoblaciones = [];

    await fetch(url).then(response => response.json()).then(data => datosPoblaciones = data);
    return datosPoblaciones;
}


/**
 * 
 * @param {*} idRestriccion 
 * envia a la api una peticion delete para eliminar 
 * la restricción según el id que le pases por parámetro
 */
export const EliminarRestriccion = async (idRestriccion) => {
    let url = `https://localhost:5001/deleteRestriccion/${idRestriccion}`;
    await fetch(url, {method : 'DELETE'}).then(response => {
        if(response.status === 200)
            return response.json();
        throw new Error('Ha ocurrido un error al eliminar la restricción');

    })
    .then(data => console.log("Restriccion eliminada => ",data))
    .catch(error => console.log(error)); 
}


export default DatosRestricciones;