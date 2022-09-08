using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Media.Helpers
{
    public class RedirectException : Exception
    {
        public Uri RedirectUri { get; private set; }

        public RedirectException(Uri redirectUri)
        {
            RedirectUri = redirectUri;
        }
    }
}