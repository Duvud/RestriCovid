using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using RestriCovidData;
using System;
using System.Collections.Generic;
using System.Text;

namespace RestriCovidBL
{
    public class RestriCovidDBContext : DbContext
    {

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var conString = new MySqlConnectionStringBuilder();
            conString.Server = "127.0.0.1";
            conString.Port = 3306;
            conString.Database = "restricovid";
            conString.UserID = "root";
            //string connectionString = @"server=localhost;port=3306;database=restricovid;uid=root;";

            optionsBuilder.UseMySQL(conString.ToString());
        }

        public DbSet<Poblacion> Poblaciones { get; set; }
        public DbSet<Restriccion> Restricciones { get; set; }
        public DbSet<RestriccionPoblacion> RestriccionPoblaciones { get; set; }

    }
}
