using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RestriCovidData
{
    [Table("restricciones")]
    public class Restriccion
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [MaxLength(20)]
        public String CODIGO { get; set; }

        [MaxLength(300)]
        public string DESCRIPCION{ get; set; }

        [MaxLength(50)]
        public float ABREVIACION { get; set; }

    }
}
