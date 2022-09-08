using System.Security.Claims;
using System.Web.Http;

namespace Media.Controllers
{
    [RoutePrefix("api/test")]
    public class TestController : ApiController
    {
        [AllowAnonymous]
        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok("This is working !!!!!");
        }

        [Authorize]
        [Route("identity")]
        public IHttpActionResult GetIdentity()
        {           
            ClaimsPrincipal user = User as ClaimsPrincipal;
            return Ok(user.Claims);
        }
    }
}