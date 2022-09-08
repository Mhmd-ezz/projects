using System;
using System.Configuration;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.ExceptionHandling;
using IdentityServer3.AccessTokenValidation;
using Media;
using Media.Helpers;
using Media.Infrastructure.Azure;
using Microsoft.Owin;
using Microsoft.Owin.BuilderProperties;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.StaticFiles;
using Microsoft.WindowsAzure.Storage;
using Newtonsoft.Json.Serialization;
using Owin;

[assembly: OwinStartup(typeof(Startup))]

namespace Media
{
    public class Startup
    {
        //public static OAuthBearerAuthenticationOptions OAuthBearerOptions { get; private set; }
        public static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType.FullName);

        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();
            config.Services.Add(typeof(IExceptionLogger), new TraceExceptionLogger());
            // config.Services.Add(typeof(IAuditLog), new AuditLog());
            Log.Info("ASP.NET application starting ...");

            //Should be the first handler to handle any exception happening in OWIN middlewares
            app.UseOwinExceptionHandler();

            app.Use<RedirectMiddleware>();

            //var auditConnectionString = ConfigurationManager.AppSettings["AuditConnection"];
            //IoC.Resolve<IAuditLog>().Setup(auditConnectionString);


            var storageConnection = ConfigurationManager.AppSettings["MedciliaStorage"];

            var cloudStorageAccount = CloudStorageAccount.Parse(storageConnection);
            var pdfsFileSystem = new AzureBlobFileSystem(cloudStorageAccount, "pdfs");

            var pdfsOptions = new FileServerOptions
            {
                RequestPath = new PathString("/media/pdfs"),
                //EnableDefaultFiles = false,
                FileSystem = pdfsFileSystem,
                StaticFileOptions =
                {
                    ServeUnknownFileTypes = false,
                    ContentTypeProvider = new PdfContentTypeProvider()
                }
            };

            app.UseFileServer(pdfsOptions);


            var properties = new AppProperties(app.Properties);
            var token = properties.OnAppDisposing;

            if (token != CancellationToken.None)
            {
                token.Register(() =>
                {
                    // do stuff here for ending / disposing                   
                    Log.Info("ASP.NET application stopped !");
                });
            }

            RegisterWebAPi(config);
            ConfigureOAuth(app);
            app.UseCors(CorsOptions.AllowAll);
            app.UseWebApi(config);

            Log.Info("ASP.NET application started !");
        }

        private void ConfigureOAuth(IAppBuilder app)
        {
            app.UseCookieAuthentication(new CookieAuthenticationOptions());
            // token validation
            app.UseIdentityServerBearerTokenAuthentication(
                new IdentityServerBearerTokenAuthenticationOptions
                {
                    //TokenProvider = new CustomAuthenticationTokenProvider(),
                    //DelayLoadMetadata = true,
                    AuthenticationType = "Bearer",
                    Authority = ConfigurationManager.AppSettings["SecurityServerUrl"],
                    ClientId = ConfigurationManager.AppSettings["SecurityClientId"],
                    ClientSecret = ConfigurationManager.AppSettings["SecurityClientSecret"],
                    RequiredScopes = new[] { "media" },
                    //RoleClaimType = ClaimTypes.Role,                    
                    ValidationMode = ValidationMode.Local,
                    RequireHttps = false
                });

            // add app local claims per request
            app.UseClaimsTransformation(incoming =>
            {
                // either add claims to incoming, or create new principal
                var appPrincipal = new ClaimsPrincipal(incoming);
                if (appPrincipal.HasClaim(x => x.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"))
                {
                    var roles = appPrincipal.Claims.Where(x =>
                        x.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role").ToList();

                    foreach (var role in roles)
                    {
                        incoming.Identities.First().AddClaim(new Claim("role", role.Value));
                    }
                }
                //incoming.Identities.First().AddClaim(new Claim("appSpecific", "some_value"));

                return Task.FromResult(appPrincipal);
            });
        }

        private void RegisterWebAPi(HttpConfiguration config)
        {
            // Web API configuration and services
            var cors = new EnableCorsAttribute("*", "*", "*");
            cors.SupportsCredentials = true;
            config.EnableCors(cors);
            //config.Routes.IgnoreRoute("handlers", "UploadHandler.ashx");
            // Web API routes
            //config.Routes.MapHttpRoute("MediaRoute", "media/{*pathInfo}", null,
            //    null, new StopRoutingHandler());
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
        }
    }
}