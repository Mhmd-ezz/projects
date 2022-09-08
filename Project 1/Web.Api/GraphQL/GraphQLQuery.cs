using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;
using GraphQL.SystemTextJson;
using Newtonsoft.Json.Linq;

namespace Medcilia.Clinic.WebApi.GraphQL
{
    public class GraphQLQuery
    {
        public string OperationName { get; set; }
        public string NamedQuery { get; set; }
        public string Query { get; set; }
        //public JObject Variables { get; set; }
        [JsonConverter(typeof(ObjectDictionaryConverter))]
        public Dictionary<string, object> Variables { get; set; }
        public override string ToString()
        {
            var builder = new StringBuilder();
            builder.AppendLine();
            if (!string.IsNullOrWhiteSpace(OperationName))
            {
                builder.AppendLine($"OperationName = {OperationName}");
            }
            if (!string.IsNullOrWhiteSpace(NamedQuery))
            {
                builder.AppendLine($"NamedQuery = {NamedQuery}");
            }
            if (!string.IsNullOrWhiteSpace(Query))
            {
                builder.AppendLine($"Query = {Query}");
            }
            //if (!string.IsNullOrWhiteSpace(Variables))
            //{
            //    builder.AppendLine($"Variables = {Variables}");
            //}

            return builder.ToString();
        }
    }
}
