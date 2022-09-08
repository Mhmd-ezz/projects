using System;
using System.Collections.Generic;
using System.Text;


namespace Cmd.Extenstions
{
    public static class Extenstions
    {

        public static string Sanitize(this object str1)
        {
            if (str1 == null) return null;

            var result  = str1.ToString().ToLower().Trim();
            return result;
        }
 
    }
}
