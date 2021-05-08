import EliminarRestriccion from '../data/APIController';

//Este componente se usa en cada panel de restricción para eliminar la propia restricción
export const BotonElimnar = (props) => {
    const restriccion = props.datosRestriccion;
    return (
        <button onClick={() => EliminarRestriccion(restriccion.id)}>{props.texto}</button>
    )
}

export default BotonElimnar;