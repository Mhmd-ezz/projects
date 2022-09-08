using System;
using System.Threading.Tasks;
using GraphQL;
using GraphQL.Types;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

using GraphQL.Server.Transports.AspNetCore;
using System.Threading;

namespace Medcilia.Clinic.WebApi.Helpers

{
    public class GraphQLMiddleware<TSchema> : GraphQLHttpMiddleware<TSchema>
        where TSchema : ISchema
    {
        private readonly ILogger _logger;

        public GraphQLMiddleware(
            ILogger<GraphQLHttpMiddleware<TSchema>> logger,
            RequestDelegate next,           
            IGraphQLRequestDeserializer requestDeserializer)
            : base(next, requestDeserializer)
        {
            _logger = logger;

        }
        protected override Task RequestExecutedAsync(in GraphQLRequestExecutionResult requestExecutionResult)
        {
            if (requestExecutionResult.Result.Errors != null)
            {
                if (requestExecutionResult.IndexInBatch.HasValue)
                    _logger.LogError("GraphQL execution completed in {Elapsed} with error(s) in batch [{Index}]: {Errors}", requestExecutionResult.Elapsed, requestExecutionResult.IndexInBatch, requestExecutionResult.Result.Errors);
                else
                    _logger.LogError("GraphQL execution completed in {Elapsed} with error(s): {Errors}", requestExecutionResult.Elapsed, requestExecutionResult.Result.Errors);
            }
            else
                _logger.LogInformation("GraphQL execution successfully completed in {Elapsed}", requestExecutionResult.Elapsed);

            return base.RequestExecutedAsync(requestExecutionResult);
        }
        protected override CancellationToken GetCancellationToken(HttpContext context)
        {
            // custom CancellationToken example 
            var cts = CancellationTokenSource.CreateLinkedTokenSource(base.GetCancellationToken(context), new CancellationTokenSource(TimeSpan.FromSeconds(5)).Token);
            return cts.Token;
        }

    }
}
