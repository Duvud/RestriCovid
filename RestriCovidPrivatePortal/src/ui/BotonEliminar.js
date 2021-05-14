import {EliminarRestriccionPoblacion} from '../data/APIController';

//Este componente se usa en cada panel de restricción para eliminar la propia restricción
export const BotonElimnar = (props) => {
    return (
        <button 
        className={'btn btn-info ml-2'}
        onClick={() => {
            if(props.datosPoblacion !== undefined){
                EliminarRestriccionPoblacion(props.datosRestriccion.id,props.datosPoblacion.value.id);
                props.funcionRecargar()
            }
        }}>{props.texto}</button>
    )
}

export default BotonElimnar;