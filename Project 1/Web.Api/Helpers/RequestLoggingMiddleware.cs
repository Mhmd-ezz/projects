using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.Helpers
{
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate next;
        private readonly ILogger logger;

        public RequestLoggingMiddleware(RequestDelegate next, ILoggerFactory loggerFactory)
        {
            this.next = next;
            logger = loggerFactory.CreateLogger<RequestLoggingMiddleware>();
        }

        public async Task Invoke(HttpContext context)
        {
            var message = await FormatRequest(context.Request);
            logger.LogInformation(message);

            await next(context);
        }

        private async Task<string> FormatRequest2(HttpRequest request)
        {
            request.EnableBuffering();

            var buffer = new byte[Convert.ToInt32(request.ContentLength)];
            await request.Body.ReadAsync(buffer, 0, buffer.Length);
            var requestBody = Encoding.UTF8.GetString(buffer);
            request.Body.Seek(0, SeekOrigin.Begin);

            var builder = new StringBuilder(Environment.NewLine);
            foreach (var header in request.Headers)
            {
                builder.AppendLine($"{header.Key}:{header.Value}");
            }

            builder.AppendLine($"Request body:{requestBody}");
            return builder.ToString();
        }

        private async Task<string> FormatRequest(HttpRequest request)
        {
            var body = request.Body;

            //This line allows us to set the reader for the request back at the beginning of its stream.
            request.EnableBuffering();
            // Enable seeking
            //request.EnableBuffering();

            //We now need to read the request stream.  First, we create a new byte[] with the same length as the request stream...
            var buffer = new byte[Convert.ToInt32(request.ContentLength)];

            //...Then we copy the entire request stream into the new buffer.
            await request.Body.ReadAsync(buffer, 0, buffer.Length);

            //We convert the byte[] into a string using UTF8 encoding...
            var bodyAsText = Encoding.UTF8.GetString(buffer);

            // Set the position of the stream to 0 to enable rereading
            request.Body.Position = 0;
            //..and finally, assign the read body back to the request body, which is allowed because of EnableRewind()
            //request.Body = body;

            var message = string.IsNullOrWhiteSpace(bodyAsText) ?
                $"Request: {request.Scheme}://{request.Host}{request.Path}{request.QueryString}"
                :
                $"Request: {request.Scheme}://{request.Host}{request.Path}{request.QueryString} #body => {bodyAsText}";

            return message;
        }

    }
}
