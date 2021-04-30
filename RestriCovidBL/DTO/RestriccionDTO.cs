using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RestriCovidBL.DTO
{
    public class RestriccionDTO
    {
        public int Id { get; set; }

        public int Cp { get; set; }

        public String Codigo { get; set; }
        public String Poblacion { get; set; }

        public String Abreviacion { get; set; }

        public String Descripcion { get; set; }
    }
}
