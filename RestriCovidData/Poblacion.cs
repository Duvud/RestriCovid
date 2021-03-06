using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RestriCovidData
{
    [Table("poblaciones")]
    public class Poblacion
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [MaxLength(100)]
        public String POBLACION { get; set; }

        public int CP { get; set; }

        public string PROVINCIA { get; set; }

        public float POSX { get; set; }

        public float POSY { get; set; }
    }
}
