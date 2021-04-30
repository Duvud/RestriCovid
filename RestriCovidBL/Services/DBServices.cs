using RestriCovidBL.DTO;
using RestriCovidData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RestriCovidBL.Services
{
    public class DBServices
    {
        private static DBServices instance;

        private DBServices() { }

        public static DBServices Instance
        {
            get
            {
                if (instance == null) instance = new DBServices();
                return instance;
            }
        }

        public List<RestriccionDTO> GetRestricciones()
        {
            using var dbContext = new RestriCovidDBContext();

            return dbContext.RestriccionPoblaciones.Select(dbResul => new RestriccionDTO
            {
                Id = dbResul.ID,
                Cp = dbResul.POBLACION.CP,
                Codigo = dbResul.RESTRICCION.CODIGO,
                Poblacion = dbResul.POBLACION.POBLACION,
                Abreviacion = dbResul.RESTRICCION.ABREVIACION,
                Descripcion = dbResul.RESTRICCION.DESCRIPCION
            }).ToList();
        }

        public List<RestriccionDTO> GetRestriccionesCP(int cp)
        {
            using var dbContext = new RestriCovidDBContext();

            return dbContext.RestriccionPoblaciones.Where(dbResul => dbResul.POBLACION.CP == cp).Select(dbResul => new RestriccionDTO
            {
                Id = dbResul.ID,
                Cp = dbResul.POBLACION.CP,
                Poblacion = dbResul.POBLACION.POBLACION,
                Abreviacion = dbResul.RESTRICCION.ABREVIACION,
                Descripcion = dbResul.RESTRICCION.DESCRIPCION
            }).ToList();
        }

        public List<PoblacionDTO> GetPoblaciones()
        {
            using var dbContext = new RestriCovidDBContext();

            return dbContext.Poblaciones.Select(dbResul => new PoblacionDTO
            {
                Id = dbResul.ID,
                Poblacion = dbResul.POBLACION,
                Provincia = dbResul.PROVINCIA,
                PosX = dbResul.POSX,
                PosY = dbResul.POSY,
                Cp = dbResul.CP
            }).ToList();
        }

        public RestriccionDTO UpdateRestriccion(RestriccionDTO restriccion)
        {
            using var dbContext = new RestriCovidDBContext();

            var resul = dbContext.Restricciones.Where(restri => restri.ID == restriccion.Id).FirstOrDefault();

            resul.CODIGO = restriccion.Codigo;
            resul.DESCRIPCION = restriccion.Descripcion;
            resul.ABREVIACION = restriccion.Abreviacion;

            dbContext.SaveChanges();
            return restriccion;
        }

        public PoblacionDTO UpdatePoblacion(PoblacionDTO poblacion)
        {
            using var dbContext = new RestriCovidDBContext();

            var resul = dbContext.Poblaciones.Where(restri => restri.ID == poblacion.Id).FirstOrDefault();

            resul.CP = poblacion.Cp;
            resul.POBLACION = poblacion.Poblacion;
            resul.POSX = poblacion.PosX;
            resul.POSY = poblacion.PosY;
            resul.PROVINCIA = poblacion.Provincia;

            dbContext.SaveChanges();
            return poblacion;
        }

        public Boolean DeleteRestriccion(int id)
        {

            using var dbContext = new RestriCovidDBContext();

            var resul = dbContext.Restricciones.Where(restriccion => restriccion.ID == id).FirstOrDefault();
            dbContext.Restricciones.Remove(resul);

            dbContext.SaveChanges();

            return true;
        }

        public Boolean DeletePoblacion(int id)
        {
            using var dbContext = new RestriCovidDBContext();

            var resul = dbContext.Restricciones.Where(restriccion => restriccion.ID == id).FirstOrDefault();
            dbContext.Restricciones.Remove(resul);

            dbContext.SaveChanges();

            return true;
        }

    }
}
