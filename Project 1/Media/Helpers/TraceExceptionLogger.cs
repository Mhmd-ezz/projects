using System.Diagnostics;
using System.Web.Http.ExceptionHandling;

//using Mayadeen.Archive.Common.Services;

namespace Media.Helpers
{
    public class TraceExceptionLogger : ExceptionLogger
    {
        public override void Log(ExceptionLoggerContext context)
        {
            var exception = context.ExceptionContext.Exception;
            Trace.TraceError(exception.ToString());

            //Logger.Error(this, "An unhandled error has occurred !", exception);
        }
    }
}