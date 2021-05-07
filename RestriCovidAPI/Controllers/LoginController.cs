using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using RestriCovidBL.Services;

namespace RestriCovidAPI.Controllers
{

    //https://enmilocalfunciona.io/construyendo-una-web-api-rest-segura-con-json-web-token-en-net-parte-ii/
    [AllowAnonymous]
    [RoutePrefix("RestriCovid/login")]
    public class LoginController : ApiController
    {
        [HttpGet]
        [Route("test")]
        public IHttpActionResult Test()
        {
            return Ok(true);
        }

        [HttpGet]
        [Route("testuser")]
        public IHttpActionResult TestUser()
        {
            var identity = Thread.CurrentPrincipal.Identity;
            return Ok($" IPrincipal-user: {identity.Name} - isAuthenticated:" +
                $"{identity.IsAuthenticated}");

        }

        [HttpPost]
        [Route("authenticate")]
        public IHttpActionResult Authenticate(LoginRequest login)
        {
            if (login != null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            bool isCredentialValid = (login.Password == "root");
            if (isCredentialValid)
            {
                return Ok("asd");

            }
            else
            {
                return Unauthorized();
            }
        
        }


    }
}
