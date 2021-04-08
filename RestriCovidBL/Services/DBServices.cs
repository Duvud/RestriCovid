using RestriCovidBL.DTO;
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

    }
}
