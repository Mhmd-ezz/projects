using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Media.Helpers.FlowJS
{
    public class FlowRequestReader
    {
        public FlowRequest Create(NameValueCollection nameValueCollection)
        {
            Dictionary<string, string> dictionary = nameValueCollection.Cast<string>()
                .Select(s => new {Key = s, Value = nameValueCollection[s]})
                .ToDictionary(p => p.Key, p => p.Value);

            return Create(dictionary);
        }

        public async Task<FlowRequest> ReadGetAsync(HttpRequestMessage request)
        {
            Dictionary<string, string> dictionary = request.GetQueryNameValuePairs()
                .ToDictionary(x => x.Key, x => x.Value);

            return await Task.Run(() => Create(dictionary));
        }

        public async Task<FlowRequest> ReadPostAsync(FlowRequestContext context, IFileSystem fileSystem)
        {
            var provider = new FlowTemporaryFileProvider(context, fileSystem);
            await context.HttpRequest.Content.ReadAsMultipartAsync(provider);

            var flowRequest = Create(provider.FormData);
            flowRequest.TemporaryFile = provider.TemporaryFiles.Single();

            return flowRequest;
        }

        private FlowRequest Create(IDictionary<string, string> query)
        {
            return new FlowRequest
            {
                FlowChunkNumber = Ulong(query, "flowChunkNumber"),
                FlowChunkSize = Ulong(query, "flowChunkSize"),
                FlowFilename = String(query, "flowFilename"),
                FlowIdentifier = String(query, "flowIdentifier"),
                FlowRelativePath = String(query, "flowRelativePath"),
                FlowTotalChunks = Ulong(query, "flowTotalChunks"),
                FlowTotalSize = Ulong(query, "flowTotalSize"),
                Id = String(query, "id"),
                //TenantId = String(query, "tenantId"),
                PatientId = String(query, "patientId"),
                PatientName = String(query, "patientName"),
                Speciality = String(query, "speciality"),
                ConditionId = String(query, "conditionId"),
                ActivityType = String(query, "activityType"),
                ActivityId = String(query, "activityId"),
                SystemTags = String(query, "systemTags"),
                SystemTagging = ArrayOfString(query, "systemTagging"),
                Tags = String(query, "tags"),
                Type = String(query, "type")
            };
        }

        private string String(IDictionary<string, string> values, string key, string defaultValue = null)
        {
            string stringValue;

            if (values.TryGetValue(key, out stringValue))
            {
                return stringValue;
            }

            return defaultValue;
        }

        private string[] ArrayOfString(IDictionary<string, string> values, string key  )
        {
            string stringValue;

            if (values.TryGetValue(key, out stringValue))
            {
                return stringValue.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            }

            return new List<string>().ToArray();
        }

        private ulong? Ulong(IDictionary<string, string> values, string key, ulong? defaultValue = null)
        {
            string stringValue;

            if (values.TryGetValue(key, out stringValue))
            {
                ulong tempValue;
                if (ulong.TryParse(stringValue, out tempValue))
                {
                    return tempValue;
                }
            }

            return defaultValue;
        }
    }
}