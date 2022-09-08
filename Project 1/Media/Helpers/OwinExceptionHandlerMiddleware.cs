using Microsoft.Owin;
using Newtonsoft.Json;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;

namespace Media.Helpers
{
    using AppFunc = Func<IDictionary<string, object>, Task>;

    public class OwinExceptionHandlerMiddleware
    {
        private readonly AppFunc _next;

        public OwinExceptionHandlerMiddleware(AppFunc next)
        {
            if (next == null)
            {
                throw new ArgumentNullException("next");
            }

            _next = next;
        }

        public async Task Invoke(IDictionary<string, object> environment)
        {
            try
            {
                await _next(environment);
            }
            catch (System.OperationCanceledException ocexc)
            {
                Startup.Log.Error("Archive.Api... OperationCanceledException was thrown !", ocexc);
            }
            catch (Exception ex)
            {
                try
                {
                    var owinContext = new OwinContext(environment);
                    Startup.Log.Error("Archive.Api. This error occured : " + owinContext, ex);
                    HandleException(ex, owinContext);

                    return;
                }
                catch (Exception)
                {
                    // If there's a Exception while generating the error page, re-throw the original exception.
                }
                throw;
            }
        }
        private void HandleException(Exception ex, IOwinContext context)
        {
            var request = context.Request;

            //Build a model to represet the error for the client
            var errorDataModel = ex; // NLogLogger.BuildErrorDataModel(ex);

            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            context.Response.ReasonPhrase = "Internal Server Error";
            context.Response.ContentType = "application/json";
            context.Response.Write(JsonConvert.SerializeObject(errorDataModel));

        }
    }

    public static class OwinExceptionHandlerMiddlewareAppBuilderExtensions
    {
        public static void UseOwinExceptionHandler(this IAppBuilder app)
        {
            app.Use<OwinExceptionHandlerMiddleware>();
        }
    }
}