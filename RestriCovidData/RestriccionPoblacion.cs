using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RestriCovidData
{
    [Table("restriccionPoblacion")]
    public class RestriccionPoblacion
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [ForeignKey("Restriccion")]
        public Restriccion RESTRICCION { get; set; }

        [ForeignKey("Poblacion")]
        public Poblacion POBLACION { get; set; }
    }
}
