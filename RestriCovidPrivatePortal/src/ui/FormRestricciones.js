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
            }         
    }

    let datosAdaptados = adaptarDatos();

    return (
        <>
        <div className={'m-auto text-center col-xl-8 col-lg-9 col-md-10 col-sm-11 col-11'}>
            <Select 
                isMulti
                options={datosAdaptados}
                defaultValue={arAsignarRestriccion}
                onChange={(e) => guardarAsignarRestriccion(e)}
                className={'m-auto text-center col-xl-8 col-lg-9 col-md-10 col-sm-11 col-11'}
                placeholder={'Elige las restricciones que quieras asignar'}
            />
            <button onClick={() => {asignarRestricciones(props.poblacion.value.id,arAsignarRestriccion); props.funcionRecargar()}} className={`${styles.btnAsignarRestriccion} btn btn-info`}>Asignar restriccion</button> 
        </div>       
        </>
    )
}
export default FormRestricciones;