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

        public List<RestriccionDTO> GetRestriccionesPoblaciones()
        {
            using var dbContext = new RestriCovidDBContext();

            return dbContext.RestriccionPoblaciones.Select(dbResul => new RestriccionDTO
            {
                Id = dbResul.RESTRICCION.ID,
                Cp = dbResul.POBLACION.CP,
                Codigo = dbResul.RESTRICCION.CODIGO,
                Poblacion = dbResul.POBLACION.POBLACION,
                Abreviacion = dbResul.RESTRICCION.ABREVIACION,
                Descripcion = dbResul.RESTRICCION.DESCRIPCION
            }).ToList();
        }
        
        public List<RestriccionDTO> GetRestricciones()
        {
            using var dbContext = new RestriCovidDBContext();

            return dbContext.Restricciones.Select(dbResul => new RestriccionDTO
            {
                Id = dbResul.ID,
                Codigo = dbResul.CODIGO,
                Abreviacion = dbResul.ABREVIACION,
                Descripcion = dbResul.DESCRIPCION
            }).ToList();
        }

        public List<RestriccionDTO> GetRestriccionesCP(int cp)
        {
            using var dbContext = new RestriCovidDBContext();

            return dbContext.RestriccionPoblaciones.Where(dbResul => dbResul.POBLACION.CP == cp).Select(dbResul => new RestriccionDTO
            {
                Id = dbResul.RESTRICCION.ID,
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

            if (dbContext.Restricciones.Where(x => x.ID == id).FirstOrDefault() != null)
            {
                if (dbContext.RestriccionPoblaciones.Where(x => x.RESTRICCION.ID == id).FirstOrDefault() != null)
                {
                    dbContext.RestriccionPoblaciones.RemoveRange(dbContext.RestriccionPoblaciones.Where(x => x.RESTRICCION.ID == id));
                    dbContext.SaveChanges();
                }
                dbContext.Restricciones.RemoveRange(dbContext.Restricciones.Where(restriccion => restriccion.ID == id));
                dbContext.SaveChanges();
                return true;

            }
            else
            {
                return false;
            }



        }

        public Boolean DeletePoblacion(int id)
        {

            using var dbContext = new RestriCovidDBContext();

            if (dbContext.Poblaciones.Where(x => x.ID == id).FirstOrDefault() != null)
            {
                if (dbContext.RestriccionPoblaciones.Where(x => x.POBLACION.ID == id).FirstOrDefault() != null)
                {
                    dbContext.RestriccionPoblaciones.RemoveRange(dbContext.RestriccionPoblaciones.Where(x => x.POBLACION.ID == id));
                    dbContext.SaveChanges();
                }
                dbContext.Poblaciones.RemoveRange(dbContext.Poblaciones.Where(restriccion => restriccion.ID == id));
                dbContext.SaveChanges();
                return true;

            }
            else
            {
                return false;
            }
        }

        public Boolean InsertRestriccionPoblacion(int idRestriccion, int idPoblacion)
        {
            using var dbContext = new RestriCovidDBContext();

            if (dbContext.RestriccionPoblaciones.Where(x => x.POBLACION.ID == idPoblacion && x.RESTRICCION.ID == idRestriccion).FirstOrDefault() == null)
            {
                var poblacion = dbContext.Poblaciones.Where(poblacion => poblacion.ID == idPoblacion).FirstOrDefault();
                var restriccion = dbContext.Restricciones.Where(restriccion => restriccion.ID == idRestriccion).FirstOrDefault();

                RestriccionPoblacion rp = new RestriccionPoblacion();
                rp.POBLACION = poblacion;
                rp.RESTRICCION = restriccion;

                dbContext.RestriccionPoblaciones.Add(rp);
                dbContext.SaveChanges();
                return true;
            }
            return false;


        }

        public Boolean DeleteRestriccionPoblacion(int idRestriccion, int idPoblacion)
        {

            using var dbContext = new RestriCovidDBContext();

            if (dbContext.RestriccionPoblaciones.Where(x => x.POBLACION.ID == idPoblacion && x.RESTRICCION.ID == idRestriccion).FirstOrDefault() != null)
            {
                dbContext.RestriccionPoblaciones.RemoveRange(dbContext.RestriccionPoblaciones.Where(x => x.POBLACION.ID == idPoblacion && x.RESTRICCION.ID == idRestriccion ));
                dbContext.SaveChanges();
                return true;
            }
            return false;

        }


    }
}
