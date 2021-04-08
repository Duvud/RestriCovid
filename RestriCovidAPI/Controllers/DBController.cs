using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RestriCovidData;
using RestriCovidBL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RestriCovidBL.Services;

namespace RestriCovidAPI.Controllers
{
    [ApiController]
    [Route("RestriCovid")]
    public class DBController : ControllerBase
    {
        private readonly ILogger<DBController> _logger;

        public DBController(ILogger<DBController> logger)
        {
            _logger = logger;
        }

        //Metodo TEST
        //Por la ruta base localhost:44394/RestriCovid devolverá el siguiente mensaje.
        [HttpGet]
        public ActionResult Test()
        {
            return Ok("La API funciona correctamente.");
        }

        [HttpGet("restricciones")]
        public ActionResult GetRestricciones()
        {
            try
            {
                List<RestriccionDTO> restricciones = DBServices.Instance.GetRestricciones();
                return Ok(restricciones);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("restricciones/{cp}")]
        public ActionResult GetRestriccionesCP(int cp)
        {
            try
            {
                List<RestriccionDTO> restricciones = DBServices.Instance.GetRestriccionesCP(cp);
                return Ok(restricciones);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
