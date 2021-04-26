using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RestriCovidBL.DTO
{
    public class PoblacionDTO
    {
        public int Id { get; set; }
        public String Poblacion { get; set; }
        public String Provincia { get; set; }
        public float PosX { get; set; }
        public float PosY { get; set; }
        public int Cp { get; set; }

    }
}