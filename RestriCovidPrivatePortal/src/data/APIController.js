
//Este metodo devuelve todas las restricciones de la api en un array de objetos
export const DatosRestricciones = async () => {
    const url = 'https://localhost:5001/RestriCovid/restricciones';
    let datos = [];

    await fetch(url).then(response => response.json()).then(data => datos = data)
    .catch(error => console.log("error",error));
    return datos;
}


//Este metodo devuelve todas las restricciones de la api en un array de objetos
export const DatosRestriccionesPoblaciones = async () => {
    const url = 'https://localhost:5001/RestriCovid/restriccionesPoblaciones';
    let datos = [];

    await fetch(url).then(response => response.json()).then(data => datos = data)
    .catch(error => console.log("error",error));
    return datos;
}

//Devuelve las restricciones dependiendo del código postal que le pasemos por parámetro
export const RestriccionesCodigoPostal = async (codigoPostal) => {
    const url = `https://localhost:5001/RestriCovid/restricciones/${codigoPostal}`;
    let datosCodigoPostal = [];

    await fetch(url).then(response => response.json()).then(data => datosCodigoPostal = data);
    return datosCodigoPostal;
}

/**Devuelve todos los registros de la tabla poblaciones */
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
 * ejemplo de url:https://localhost:5001/RestriCovid/deleteRestriccionPoblacion?idRestriccion=1&idPoblacion=1
 */
export const EliminarRestriccionPoblacion = async (idRestriccion,idPoblacion) => {
    let url = `https://localhost:5001/RestriCovid/deleteRestriccionPoblacion/?idRestriccion=${idRestriccion}&idPoblacion=${idPoblacion}`;
    await fetch(url, {method : 'DELETE'}).then(response => {
        console.log(response.json());
    })
    .catch(error => console.log(error)); 
}

/**
 * 
 * @param {*} idPoblacion 
 * @param {*} idRestriccion
 * envía a la api peticion de insert hacia la tabla RestriccionPoblacion 
 */
export const AsignarRestriccion = async (idPoblacion,idRestriccion) => {
    let url = `https://localhost:5001/RestriCovid/insertRestriccionPoblacion/?idRestriccion=${idRestriccion}&idPoblacion=${idPoblacion}`;
    await fetch(url,{method: 'PUT'}).then(response => {
        if(response.status === 200){
            return response.json();
        }else{
            console.log(response);
        }  
    })
    .catch(error => console.log("Error",error)); 
}


export default AsignarRestriccion;