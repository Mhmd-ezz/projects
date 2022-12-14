using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace Medcilia.Clinic.WebApi.Helpers
{
    public class GraphQLSettings
    {
        public PathString GraphQLPath { get; set; }
        public PathString GraphQLWsPath { get; set; }
        public Func<HttpContext, IDictionary<string, object>> BuildUserContext { get; set; }
        public bool EnableMetrics { get; set; }
        public bool ExposeExceptions { get; set; }
    }
}
