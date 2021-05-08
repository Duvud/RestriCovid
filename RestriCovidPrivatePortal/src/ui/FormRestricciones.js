import {useState, React} from 'react';
import Select from 'react-select';
import styles from '../css/RestriCovid.module.css';


export const FormRestricciones =  (props) => {
    const [arAsignarRestriccion,guardarAsignarRestriccion] = useState([]);    

    const adaptarDatos = () => {
        let arAux = []
        props.datos.forEach( restriccion => {
            arAux.push(
                {
                    label:`${restriccion.id} : ${restriccion.abreviacion}`,
                    value:`${restriccion.id} : ${restriccion.abreviacion}`
                    
                }
            );
        })
        return arAux;
    }

    const asignarRestricciones = () => {
        arAsignarRestriccion.forEach( restriccion => {
            
        })
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
            <button className={`${styles.btnAsignarRestriccion}`}>Asignar restriccion</button> 
        </div>       
        </>
    )
}
export default FormRestricciones;