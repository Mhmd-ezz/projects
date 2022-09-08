using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Media.Helpers
{
    public class CustomAuthenticationTokenProvider : OAuthBearerAuthenticationProvider
    {
        public override Task RequestToken(OAuthRequestTokenContext context)
        {
            if (context == null) throw new ArgumentNullException("context");

            var value = context.Request.Query.Get("BearerToken");

            if (!string.IsNullOrEmpty(value))
            {
                context.Token = value;
            }
            else
            {
                // try to find bearer token in a cookie 
                // (by default OAuthBearerAuthenticationHandler 
                // only checks Authorization header)
                var tokenCookie = context.OwinContext.Request.Cookies["BearerToken"];
                if (!string.IsNullOrEmpty(tokenCookie))
                    context.Token = tokenCookie;
            }
            return Task.FromResult<object>(null);
        }

        public override Task ValidateIdentity(OAuthValidateIdentityContext context)
        {
            //if (context.Ticket.Identity.IsAuthenticated)
            //{
            //    IoC.Resolve<IUserSession>().SetCurrentUser(context.Ticket.Identity);
            //}
            return base.ValidateIdentity(context);
        }
    }

}