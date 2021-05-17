import {useState, React} from 'react';
import Select from 'react-select';
import styles from '../css/RestriCovid.module.css';
import {AsignarRestriccion} from '../data/APIController.js'


export const FormRestricciones =  (props) => {
    const [arAsignarRestriccion,guardarAsignarRestriccion] = useState([]);    

    const adaptarDatos = () => {
        let arAux = []
        props.datos.forEach( restriccion => {
            arAux.push(
                {
                    label:`${restriccion.abreviacion}`,
                    value:restriccion.id
                }
            );
        })
        return arAux;
    }

    const asignarRestricciones = (poblacion,restricciones) => {
            if(restricciones.length !== 0 && poblacion !== undefined){
                restricciones.forEach( 
                    restriccion => {
                        AsignarRestriccion(poblacion,restriccion.value)
                    }
                )
                props.funcionRecargar();
            }         
    }

    let datosAdaptados = adaptarDatos();

    return (
        <>
            <Select 
                isMulti
                options={datosAdaptados}
                defaultValue={arAsignarRestriccion}
                onChange={(e) => guardarAsignarRestriccion(e)}
                className={'m-auto col-xl-5 col-lg-6 col-md-7 col-sm-8 col-11'}
                placeholder={'Elige las restricciones que quieras asignar'}
            />
            <button onClick={() => props.poblacion.value !== undefined ? asignarRestricciones(props.poblacion.value.id,arAsignarRestriccion):null} className={`${styles.btnAsignarRestriccion} btn btn-info`}>Asignar restriccion</button> 
        </>
    )
}
export default FormRestricciones;