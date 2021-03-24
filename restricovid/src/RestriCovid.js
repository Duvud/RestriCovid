import logo from './res/img/RestriCovid.png';
import styles from './RestriCovid.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Button } from 'antd';


//Componente que prepara el logo centrado en la parte superior de la página
function Logo(props){
  return(
    <div className={styles.dImagen}>
      <img src={logo} alt='Logo RestriCovid'/>
    </div>
  );
}


//Componenete que muestra el formulario donde los clientes introduciran su código postal
function FormularioPostal(props){
  return (
  <>
  <div className={`${styles.dPostal}`}>
    <div className={`mb-4`}>
      <label>Introduce tu código postal</label>
    </div>

    <div className={`mt-6 m-auto col-xl-5 col-lg-6 col-md-7 col-sm-8 col-11`}>
      <Input type="text"/>
    </div>

    <div className={`mt-5`}>
      <Button onClick={}>Mostrar Restricciones</Button>
    </div>
  </div>
  </>
  );
}


//Función principal que recoge todos los componentes del frontend
function RestriCovid() {
  return (
    <>
    <Logo></Logo>
    <FormularioPostal></FormularioPostal>
    </>
  );
}

export default RestriCovid;
