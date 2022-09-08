using System;
using System.Threading.Tasks;
using GraphQL;
using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Medcilia.Clinic.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("graphql")]
    public class GraphQLController : Controller
    {
        private IDocumentExecuter _documentExecuter { get; set; }
        private ISchema _schema { get; set; }
        private readonly ILogger _logger;

        public GraphQLController(IDocumentExecuter documentExecuter, ISchema schema, ILogger<GraphQLController> logger)
        {
            _documentExecuter = documentExecuter;
            _schema = schema;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Index()
        {
            _logger.LogInformation("Got request for GraphiQL. Sending GUI back");
            return View();
        }

        [HttpOptions]
        public IActionResult Options()
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] GraphQLQuery query)
        {
            if (query == null) { throw new ArgumentNullException(nameof(query)); }
            var inputs = query.Variables.ToInputs();
            var executionOptions = new ExecutionOptions
            {
                Schema = _schema,
                Query = query.Query,
                Inputs = inputs
            };

            try
            {
                // Test
                var result = await _documentExecuter.ExecuteAsync(executionOptions).ConfigureAwait(false);

                // @ check result for custom errors
                var data = result.Data;
                if (result.Errors?.Count > 0 && data == null)
                {
                    _logger.LogError("GraphQL errors: {0}", result.Errors);
                    return BadRequest(result);
                }

                _logger.LogDebug("GraphQL execution result: {result}", JsonConvert.SerializeObject(result.Data));

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError("Document executer exception", ex);
                return BadRequest(ex);
            }
        }

    }
}