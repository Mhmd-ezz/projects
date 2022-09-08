using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Models
{
    public class AccountOptions
    {
        public static bool AllowLocalLogin = true;
        public static bool AllowRememberLogin = true;
        public static TimeSpan RememberMeLoginDuration = TimeSpan.FromDays(30);

        public static bool ShowLogoutPrompt = true;
        public static bool AutomaticRedirectAfterSignOut = false;

        public static bool WindowsAuthenticationEnabled = true;
        public static bool IncludeWindowsGroups = false;
        // specify the Windows authentication schemes you want to use for authentication
        //public static readonly string[] WindowsAuthenticationSchemes = new string[] { "Negotiate", "NTLM" };
        // specify the Windows authentication scheme and display name
        public static readonly string WindowsAuthenticationSchemeName = "Windows";

        public static string InvalidCredentialsErrorMessage = "Invalid username or password";
        public static string NotEnabledErrorMessage = "User account is not enabled";
    }

}
