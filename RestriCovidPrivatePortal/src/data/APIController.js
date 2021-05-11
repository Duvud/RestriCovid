
//Este metodo devuelve todas las restricciones de la api en un array de objetos
export const DatosRestricciones = async () => {
    //Url para conseguir datos y hook dónde guardaremos los datos
    const url = 'https://localhost:5001/RestriCovid/restricciones';
    let datos = [];

    await fetch(url).then(response => response.json()).then(data => datos = data)
    .catch(error => console.log("error",error));
    console.log("Restricciones", datos);
    return datos;
}


//Este metodo devuelve todas las restricciones de la api en un array de objetos
export const DatosRestriccionesPoblaciones = async () => {
    //Url para conseguir datos y hook dónde guardaremos los datos
    const url = 'https://localhost:5001/RestriCovid/restriccionesPoblaciones';
    let datos = [];

    await fetch(url).then(response => response.json()).then(data => datos = data)
    .catch(error => console.log("error",error));
    console.log("RestriccionesPoblaciones", datos);
    return datos;
}


export const RestriccionesCodigoPostal = async (codigoPostal) => {
    const url = `https://localhost:5001/RestriCovid/restricciones/${codigoPostal}`;
    let datosCodigoPostal = [];

    await fetch(url).then(response => response.json()).then(data => datosCodigoPostal = data);
    console.log("RestriccionesPoblaciones", datosCodigoPostal);
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
 * ejemplo de url:https://localhost:5001/RestriCovid/deleteRestriccionPoblacion?idRestriccion=1&idPoblacion=1
 */
export const EliminarRestriccionPoblacion = async (idRestriccion,idPoblacion) => {
    console.log("idRestriccion => ", idRestriccion, "idPoblacion => ", idPoblacion);
    let url = `https://localhost:5001/RestriCovid/deleteRestriccionPoblacion/?idRestriccion=${idRestriccion}&idPoblacion=${idPoblacion}`;
    await fetch(url, {method : 'DELETE'}).then(response => {
        console.log(response.json());
    })
    .then(data => console.log("Restriccion eliminada => ",data))
    .catch(error => console.log(error)); 
}

//RestriCovid/insertRestriccionPoblacion/?idRestriccion={idRestriccion}&idPoblacion={idPoblacion}
export const AsignarRestriccion = async (idPoblacion,idRestriccion) => {
    let url = `https://localhost:5001/RestriCovid/insertRestriccionPoblacion/?idRestriccion=${idRestriccion}&idPoblacion=${idPoblacion}`;
    await fetch(url,{method: 'PUT'}).then(response => {
        if(response.status === 200){
            console.log(response.json);
            return response.json();
        }else{
            console.log(response);
        }  
    })
    .then(data => console.log("Restriccion insertada => ",data))
    .catch(error => console.log("Error",error)); 
}


export default AsignarRestriccion;