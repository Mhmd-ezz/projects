using Microsoft.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Media.Helpers
{
    public class RedirectMiddleware : OwinMiddleware
    {
        public RedirectMiddleware(OwinMiddleware next) : base(next)
        {
        }

        public override async Task Invoke(IOwinContext context)
        {
            try
            {
                await Next.Invoke(context);
            }
            catch (RedirectException e)
            {
                context.Response.ContentLength = 0;
                context.Response.Body.Close();
                context.Response.Redirect(e.RedirectUri.AbsoluteUri);
            }
        }
    } 
}