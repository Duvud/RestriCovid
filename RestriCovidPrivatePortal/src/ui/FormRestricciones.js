import {useState, React} from 'react';
import Select from 'react-select';
import styles from '../css/RestriCovid.module.css';
import AsignarRestriccion from '../data/APIController'


export const FormRestricciones =  (props) => {
    const [arAsignarRestriccion,guardarAsignarRestriccion] = useState([]);    

    const adaptarDatos = () => {
        let arAux = []
        props.datos.forEach( restriccion => {
            arAux.push(
                {
                    label:`${restriccion.id} : ${restriccion.abreviacion}`,
                    value:restriccion.id
                }
            );
        })
        return arAux;
    }

    const asignarRestricciones = (poblacion,restricciones) => {
            console.log(poblacion,restricciones);         
    }

    let datosAdaptados = adaptarDatos();

    return (
        <>
        <div className={'col-12 text-center'}>
            <Select 
                isMulti
                options={datosAdaptados}
                defaultValue={arAsignarRestriccion}
                onChange={(e) => guardarAsignarRestriccion(e)}
                className={'m-auto col-4'}
                placeholder={'Elige las restricciones que quieras asignar'}
            />
            <button onClick={() => asignarRestricciones(arAsignarRestriccion,props.poblacion.id)} className={`${styles.btnAsignarRestriccion}`}>Asignar restriccion</button> 
        </div>       
        </>
    )
}
export default FormRestricciones;