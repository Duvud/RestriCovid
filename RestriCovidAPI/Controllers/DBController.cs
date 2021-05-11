using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RestriCovidData;
using RestriCovidBL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RestriCovidBL.Services;
using Microsoft.AspNetCore.Cors;

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
        [HttpGet("restriccionesPoblaciones")]
        public ActionResult GetRestriccionesPoblaciones()
        {
            try
            {
                return Ok(DBServices.Instance.GetRestriccionesPoblaciones());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpGet("restricciones")]
        public ActionResult GetRestricciones()
        {
            try
            {
                return Ok(DBServices.Instance.GetRestricciones());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        

        [HttpGet("restricciones/{cp}")]
        public ActionResult GetRestriccionesCP(int cp)
        {
            try
            {
                return Ok(DBServices.Instance.GetRestriccionesCP(cp));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("poblaciones")]
        public ActionResult GetPoblaciones()
        {
            try
            {
                return Ok(DBServices.Instance.GetPoblaciones());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("updateRestriccion/{restriccion}")]
        public ActionResult UpdateRestriccion(RestriccionDTO restriccion)
        {
            try
            {
                return Ok(DBServices.Instance.UpdateRestriccion(restriccion));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost("updatePoblacion/{poblacion}")]
        public ActionResult UpdatePoblacion(PoblacionDTO poblacion)
        {
            try
            {
                return Ok(DBServices.Instance.UpdatePoblacion(poblacion));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        
        [HttpDelete("deleteRestriccion/{id}")]
        public ActionResult DeleteRestriccion(int id)
        {
            try
            {
                return Ok(DBServices.Instance.DeleteRestriccion(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deletePoblacion/{id}")]
        public ActionResult DeletePoblacion(int id)
        {
            try
            {
                return Ok(DBServices.Instance.DeletePoblacion(id));

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deleteRestriccionPoblacion/")]
        public ActionResult DeleteRestriccionPoblacion(int idRestriccion, int idPoblacion)
        {
            try
            {
                return Ok(DBServices.Instance.DeleteRestriccionPoblacion(idRestriccion, idPoblacion));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //RestriCovid/insertRestriccionPoblacion/?idRestriccion={idRestriccion}&idPoblacion={idPoblacion}
        [HttpPut("insertRestriccionPoblacion/")]
        public ActionResult InsertRestriccionPoblacion(int idRestriccion, int idPoblacion)
        {
            try
            {
                return Ok(DBServices.Instance.InsertRestriccionPoblacion(idRestriccion,idPoblacion));

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
