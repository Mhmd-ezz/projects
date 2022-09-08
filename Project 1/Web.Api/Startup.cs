using AutoMapper;
using GraphiQl;
using GraphQL;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure;
using Medcilia.Clinic.Infrastructure.Repository.Drug;
using Medcilia.Clinic.Infrastructure.Repository.Location;
using Medcilia.Clinic.Infrastructure.Repository.Lookup;
using Medcilia.Clinic.Infrastructure.Repository.Patient;
using Medcilia.Clinic.Infrastructure.Repository.Settings;
using Medcilia.Clinic.Infrastructure.Repository.Subscription;
using Medcilia.Clinic.WebApi.GraphQL;
using Medcilia.Clinic.WebApi.GraphQL.Mutations;
using Medcilia.Clinic.WebApi.GraphQL.Types;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Medcilia.Clinic.WebApi.Helpers;
using Medcilia.Clinic.Infrastructure.Repository.Grantor;
using Medcilia.Clinic.Infrastructure.Repository.Tag;
using Serilog;
using Medcilia.Clinic.Infrastructure.Repository.Tenant;
using Medcilia.Clinic.Infrastructure.Repository.MediaFile;
using Medcilia.Clinic.Infrastructure.Services.Security;
using GraphQL.Server;
using Medcilia.Clinic.Infrastructure.Services.Audit;
using Medcilia.Clinic.Common;
using Microsoft.AspNetCore.ResponseCompression;
using System.IO.Compression;
using System.Collections.Generic;
using Medcilia.Clinic.Infrastructure.Repository.Appointment;
using Medcilia.Clinic.Infrastructure.Repository.Rota;
using Medcilia.Clinic.Infrastructure.Repository.Schedule;
using Medcilia.Clinic.Infrastructure.Repository.PatientMedications;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using GraphQL.Instrumentation;
using GraphQL.SystemTextJson;
using static Medcilia.Clinic.WebApi.GraphQL.TenantMutation;
using GraphQL.Server.Ui.Voyager;
using GraphQL.Server.Ui.Playground;
using GraphQL.Server.Ui.GraphiQL;
using GraphQL.Server.Ui.Altair;
using Microsoft.Extensions.Logging;
using System;
using Medcilia.Clinic.WebApi.GraphQL.sub;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using IdentityModel.AspNetCore.OAuth2Introspection;
using Microsoft.Extensions.Primitives;
using Medcilia.Clinic.WebApi.GraphQL.Subscriptions;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using Medcilia.Clinic.Infrastructure.Repository.Todo;
using Medcilia.Clinic.Infrastructure.Repository.Tickets;

namespace Medcilia.Clinic.WebApi
{
    public class Startup
    {

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Log.Logger.Information($"env.EnvironmentName: {env.EnvironmentName}");
            Configuration = builder.Build();
            Env = env;
        }

        public IConfiguration Configuration { get; }
        private IWebHostEnvironment Env { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            Logger.Initialize(Configuration);
            // Kestrel
            services.Configure<KestrelServerOptions>(options =>
            {
                options.AllowSynchronousIO = true;
            });

            // IIS
            services.Configure<IISServerOptions>(options =>
            {
                options.AllowSynchronousIO = true;
            });

            // extension method defined in this project
            services.AddGraphQLAuth(_ =>
            {
                _.AddPolicy("AdminPolicy", p => p.RequireClaim("role", "Admin"));
            });

           
            //.AddGraphTypes(typeof(ChatSchema));
            //services.AddMvcCore()
            //       .AddAuthorization()
            //       .AddJsonFormatters();
            services.AddMvc(options =>
            {
                options.EnableEndpointRouting = false;
                //options.Filters.Add(new SecurityHeadersAttribute());
            });
            //.AddJsonOptions(x =>
            //{
            //    x.SerializerSettings.ContractResolver = new DefaultContractResolver
            //    {
            //        NamingStrategy = new CamelCaseNamingStrategy
            //        {
            //            ProcessDictionaryKeys = true
            //        }
            //    };
            //});
            services.AddAuthorization();

            services.AddMemoryCache();

            services.AddHttpContextAccessor();

            var idsrvSection = Configuration.GetSection($"IdentityServer");
            services.Configure<IdsrvConfigurationOptions>(idsrvSection);
            var serverUrl = idsrvSection.GetValue<string>("SecurityServerUrl");
            Log.Logger.Information($"IdentityServerUrl: {serverUrl}");
            //Log.Logger.Information($"MongoDbConnection: {Configuration.GetConnectionString("MongoDbConnection")}");

            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddIdentityServerAuthentication(JwtBearerDefaults.AuthenticationScheme,options =>
                {
                    options.Authority = serverUrl;
                    options.RequireHttpsMetadata = false;

                    options.ApiName = "api1";
                    //options.ApiSecret = @"superweaksecret"; //@"uav2y7WQ`H`.S7Kj:/=LA3:qm-}Tg/6SssA2rskg3s&GvKTGgZAf?uV#H`9!p9rV";
                    //options.EnableCaching = false;
                    options.TokenRetriever = CustomTokenRetriever.FromHeaderAndQueryString;

                    // options.JwtBearerEvents.OnAuthenticationFailed = context =>
                    // {
                    //     return Task.CompletedTask;
                    // };
                    // options.JwtBearerEvents.OnChallenge = context =>
                    // {
                    //     return Task.CompletedTask;
                    // };
                    // options.JwtBearerEvents.OnForbidden = context =>
                    // {
                    //     return Task.CompletedTask;
                    // };
                    // options.JwtBearerEvents.OnMessageReceived = context =>
                    // {
                    //     return Task.CompletedTask;
                    // };
                    // options.JwtBearerEvents.OnTokenValidated = context =>
                    // {
                    //     return Task.CompletedTask;
                    // };

                    //options.JwtBearerEvents.OnMessageReceived =
                    //  context =>
                    //     {
                    //         var accessToken = context.Request.Query["access_token"];
                    //         Log.Logger.Information("asdasdasdasdasd");
                    //         // If the request is for our hub...
                    //         //var path = context.HttpContext.Request.Path;
                    //         //if (!string.IsNullOrEmpty(accessToken) &&
                    //         //    (path.StartsWithSegments("/hubs/chat")))
                    //         //{
                    //         //    // Read the token out of the query string
                    //         //context.Token = accessToken;
                    //         //context.Token = "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVEQzgzMjQ3MjgzNkY4NzQ4ODFENEEyMUJGOTdDMjQ4NTJCNEMxMDVSUzI1NiIsInR5cCI6IkpXVCIsIng1dCI6IlhjZ3lSeWcyLUhTSUhVb2h2NWZDU0ZLMHdRVSJ9.eyJuYmYiOjE2MzIxNDQ1NTcsImV4cCI6MTYzMzM1NDE1NywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMDgiLCJhdWQiOlsibWVkaWFBcGkiLCJhcGkxIiwiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMDgvcmVzb3VyY2VzIl0sImNsaWVudF9pZCI6Im1lZGNpbGlhLWFzc2lzdGFudCIsInN1YiI6IjA3MDhiOWU0LTI3YzUtNDEyOS04YTdjLTM1ODAwZTY2MzVhNSIsImF1dGhfdGltZSI6MTYzMjE0NDU1NiwiaWRwIjoibG9jYWwiLCJnaXZlbl9uYW1lIjoiaGFzYW4ucmkyNUBnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJoYXNhbiIsImxhc3RuYW1lIjoicmlmYWlpIiwidGVuYW50SWQiOiI1YzdlNDVjMjhhYzEwOTYwODAwN2YxNjgiLCJlbWFpbCI6Imhhc2FuLnJpMjVAZ21haWwuY29tIiwianRpIjoiNzBEQjYwMzMxODk0OEE4MkFCRTMwMDA4N0Y1RTRBMDEiLCJzaWQiOiJFOEI2QzQxMjhDMDk4MzFBQTZCREVBODBCRkIyNzI0QyIsImlhdCI6MTYzMjE0NDU1Nywic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsIm1lZGlhIiwibWVkaWFBcGkiLCJtZWRjaWxpYVNjb3BlIiwiYXBpMSJdLCJhbXIiOlsicHdkIl19.IBkR3wAeAAMYF_D0KcKiqRy2UgU4AQ5azoMZoW-OVSurTNB8vBxuy_X5jN-sAk3TMGNrq9Igak85oi_5ailMwycQ6otD6pN92S-5MlRZAYmraQye8alqrvDjS1kY2Pwse-pqxeK88NNMENLMTZz9ls9GNO2wrDiqz3G8l56linYwtxup7yf3zBcLrTQ39rUFbWoYpy8h9f1PauMfQ6mSS5NEErZLNpXkPqegD3tgNC2riF3cbhggop_x6piJez2WmLEFxUXxoCrJ3NR_IcHvxfdSnoEKiDAyMOzenswzVY_EUygRqcjKgIzmiiO0lMpXaYgwCXSTCbHYuOY5op93ug";

                    //         //}
                    //         //return Task.Delay(6000);
                    //         return Task.CompletedTask;
                    //     };
                })
                ;

            services.AddAutoMapper();

            services
                .AddScoped<IUnitOfWork>(provider =>
                    new UnitOfWork(Configuration.GetConnectionString("MongoDbConnection")));

            services
                .AddScoped<IAppointmentRepository, AppointmentRepository>()
                .AddScoped<IMedicationsRepository, MedicationsRepository>()
                .AddScoped<IScheduleRepository, ScheduleRepository>()
                .AddScoped<IRotaRepository, RotaRepository>()
                .AddScoped<IContactRepository, ContactRepository>()
                .AddScoped<ISettingsRepository, SettingsRepository>()
                .AddScoped<ISubscriptionRepository, SubscriptionRepository>()
                .AddScoped<ILocationRepository, LocationRepository>()
                .AddScoped<ILookupRepository, LookupRepository>()
                .AddScoped<IDrugRepository, DrugRepository>()
                .AddScoped<IGrantorRepository, GrantorRepository>()
                .AddScoped<ITagRepository, TagRepository>()
                .AddScoped<IMediaFileRepository, MediaFileRepository>()
                .AddScoped<ITenantRepository, TenantRepository>()
                .AddScoped<IUserService, UserService>()
                .AddScoped<IAuditLog, AuditLog>()      
                .AddScoped<ITodoRepository, TodoRepository>()
                .AddScoped<ITicketRepository, TicketRepository>()
                ;

            services.AddSingleton<IDocumentExecuter, DocumentExecuter>();
            services.AddSingleton<IDocumentExecuter, SubscriptionDocumentExecuter>();

            //TYPES

            services.AddScoped<ScheduleType>();
            services.AddScoped<ScheduleInputType>();

            services.AddScoped<RotaType>();
            services.AddScoped<RotaInputType>();

            // @ subscription
            services.AddScoped<EventFromType>();
            services.AddScoped<AppointmentEventType>();
            services.AddScoped<TicketEventType>();

            services.AddScoped<ReceivedMessage>();
            services.AddScoped<MessageType>();
            services.AddScoped<MessageInputType>();
            services.AddScoped<MessageFromType>();

            services.AddScoped<RecurrenceType>();
            services.AddScoped<RecurrenceInputType>();

            services.AddScoped<AppointmentType>();
            services.AddScoped<AppointmentInputType>();

            services.AddScoped<ContactType>();
            services.AddScoped<ContactInputType>();

            services.AddScoped<PatientType>();
            services.AddScoped<PatientInputType>();

            services.AddScoped<PatientInfoType>();
            services.AddScoped<PatientInfoInputType>();

            services.AddScoped<LookupType>();
            services.AddScoped<LookupViewModelType>();
            services.AddScoped<LookupInputType>();
            services.AddScoped<LookupViewModelInputType>();

            services.AddScoped<SettingsType>();
            services.AddScoped<SettingsInputType>();

            //services.AddScoped<SubscriptionType>();
            //services.AddScoped<SubscriptionInputType>();

            services.AddScoped<GrantorType>();
            services.AddScoped<GrantorInputType>();

            services.AddScoped<TodoType>();
            services.AddScoped<TodoInputType>();

            services.AddScoped<TicketType>();
            services.AddScoped<TicketInputType>();
            services.AddScoped<PageResultTicketType>();
            services.AddScoped<PageResultTicketInputType>();

            services.AddScoped<TicketMessagesType>();
            services.AddScoped<TicketMessagesInputType>();

            services.AddScoped<TagType>();
            services.AddScoped<TagInputType>();

            services.AddScoped<LocationType>();
            services.AddScoped<LocationInputType>();
            services.AddScoped<LocationViewType>();
            services.AddScoped<LocationViewInputType>();

            services.AddScoped<ConditionType>();
            services.AddScoped<ConditionInputType>();

            services.AddScoped<CardiologyClinicalExaminationType>();
            services.AddScoped<CardiologyClinicalExaminationInputType>();

            services.AddScoped<SpecialityType>();
            services.AddScoped<SpecialityInputType>();

            services.AddScoped<GeneralType>();
            services.AddScoped<GeneralInputType>();

            services.AddScoped<GeneralConditionType>();
            services.AddScoped<GeneralConditionInputType>();

            services.AddScoped<GeneralActivitiesType>();
            services.AddScoped<GeneralActivitiesInputType>();

            services.AddScoped<GeneralFollowupType>();
            services.AddScoped<GeneralFollowupInputType>();

            services.AddScoped<GeneralOperationType>();
            services.AddScoped<GeneralOperationInputType>();

            services.AddScoped<GeneralMedicalHistoryType>();
            services.AddScoped<GeneralMedicalHistoryInputType>();


            services.AddScoped<CardiologyType>();
            services.AddScoped<CardiologyInputType>();

            services.AddScoped<CardiologyConditionType>();
            services.AddScoped<CardiologyConditionInputType>();

            services.AddScoped<CardiologyActivitiesType>();
            services.AddScoped<CardiologyActivitiesInputType>();

            services.AddScoped<CardiologyFollowupType>();
            services.AddScoped<CardiologyFollowupInputType>();

            services.AddScoped<CardiologyOperationType>();
            services.AddScoped<CardiologyOperationInputType>();

            services.AddScoped<CardiologyMedicalHistoryType>();
            services.AddScoped<CardiologyMedicalHistoryInputType>();




            services.AddScoped<CardiologySurgicalHistoryType>();
            services.AddScoped<CardiologySurgicalHistoryInputType>();

            services.AddScoped<CardiologyMedicalHistorySurgeryType>();
            services.AddScoped<CardiologyMedicalHistorySurgeryInputType>();


            services.AddScoped<DataPartitionType>();
            services.AddScoped<DataPartitionInputType>();

            services.AddScoped<MediaPartitionType>();
            services.AddScoped<MediaPartitionInputType>();

            services.AddScoped<MediaRootType>();
            services.AddScoped<MediaRootInputType>();
            services.AddScoped<PatientMediaFilesType>();

            services.AddScoped<DrugType>();
            services.AddScoped<DrugInputType>();
            services.AddScoped<DrugViewType>();
            services.AddScoped<DrugViewInputType>();

            services.AddScoped<MedicationType>();
            services.AddScoped<MedicationInputType>();

            services.AddScoped<MedicalHistoryAlertType>();
            services.AddScoped<MedicalHistoryAlertInputType>();

            services.AddScoped<MedicalHistoryMedicationType>();
            services.AddScoped<MedicalHistoryMedicationInputType>();

            services.AddScoped<MedicalHistorySurgeryType>();
            services.AddScoped<MedicalHistorySurgeryInputType>();

            services.AddScoped<SurgicalHistoryType>();
            services.AddScoped<SurgicalHistoryInputType>();

            services.AddScoped<MediaFileType>();
            services.AddScoped<MediaFileInputType>();

            services.AddScoped<PatientMedicationsInputType>();
            services.AddScoped<PatientMedicationsType>();

            services.AddScoped<PatientMedicationsHistoryInputType>();
            services.AddScoped<PatientMedicationsHistoryType>();

            services.AddScoped<Subscription>();
            services.AddScoped<TenantQuery>();
            services.AddScoped<TenantMutation>();          

            services.AddSingleton<CacheController>();

            var sp = services.BuildServiceProvider();
            services.AddScoped<TenantSchema>();
            //services.AddScoped<ISchema, TenantSchema>();
            services.AddSingleton<IFieldMiddleware, InstrumentFieldsMiddleware>();


            services.AddHttpContextAccessor();
            services
               .AddSingleton<IChat, Chat>()
               .AddSingleton<IAppointmentsSubscribtions, AppointmentsSubscribtions>()
               .AddSingleton<ITicketsSubscribtions, TicketsSubscribtions>()
               //.AddScoped<TenantSchema>()
               .AddGraphQL((options, provider) =>
          {
              options.EnableMetrics = true;
              var logger = provider.GetRequiredService<ILogger<Startup>>();
              options.UnhandledExceptionDelegate = ctx => logger.LogError("{Error} occurred", ctx.OriginalException.Message);
          })
               .AddSystemTextJson(deserializerSettings => { }, serializerSettings => { })
               .AddNewtonsoftJson()
               .AddWebSockets()
               .AddDataLoader()
               .AddGraphTypes(typeof(TenantSchema))
              .AddUserContextBuilder(context => new GraphQLUserContext { User = context.User });
            //  .AddUserContextBuilder(context =>
            //{
            //    var myContext = new GraphQLUserContext (context.User );
            //    var dictionary = new Dictionary<string, object>();
            //    dictionary["my_context"] = myContext;
            //    return dictionary;
            //});
            //services.AddSingleton<ISchema>(
            //    new TenantSchema(
            //        new FuncDependencyResolver(type => sp.GetService(type))
            //    )
            //);        




            if (Env.EnvironmentName == "Test")
            {
                // Clear Up test database
                var uow = sp.GetService<IUnitOfWork>();
                uow.Client.DropDatabase(uow.Database.DatabaseNamespace.DatabaseName);

                services.AddCors(options =>
                 {
                     options.AddPolicy("CorsPolicy",
                         builder => builder.AllowAnyOrigin()
                             .AllowAnyMethod()
                             .AllowAnyHeader()
                             .AllowCredentials());
                 });
            }
            else
            {
                var section = Configuration.GetSection($"ClientAppUrls");
                var clientUrls = section.Get<string[]>();

                services.AddCors(options =>
                {
                    // this defines a CORS policy called "default"
                    options.AddPolicy("CorsPolicy", policy =>
                        {
                            policy.WithOrigins(clientUrls)
                                .AllowAnyHeader()
                                .AllowAnyMethod()
                                .AllowCredentials();
                        });
                });
            }

            services.Configure<BrotliCompressionProviderOptions>(options =>
            {
                options.Level = CompressionLevel.Optimal;
            });

            services.AddResponseCompression(options =>
            {
                IEnumerable<string> MimeTypes = new[]
                     {
                         // general
                         "text/plain",
                         "text/html",
                         "text/css",
                         "text/xml",
                         "text/json",
                         "font/woff2",
                         "application/javascript",
                         "ap­pli­ca­tion/xml",
                         "ap­pli­ca­tion/json",
                         "application/xhtml+xml",
                         "application/atom+xml",
                         "image/x-icon",
                         "image/png",
                         "image/svg+xml",
                     };

                options.EnableForHttps = true;
                options.MimeTypes = MimeTypes;
                options.Providers.Add<GzipCompressionProvider>();
                // options.Providers.Add<BrotliCompressionProvider>();
            });

            IoC.ServiceProvider = services.BuildServiceProvider();
            var auditConnectionString = Configuration.GetConnectionString("AuditConnection");
            IoC.Resolve<IAuditLog>().Setup(auditConnectionString);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("CorsPolicy");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();
            //if (env.IsDevelopment())
            //{
            //}
            //app.UseGraphQL<ISchema>();
           // app.UseGraphiQl();
            //app.UseMiddleware<GraphQLMiddleware>();

            // this is required for websockets support
           // app.UseMiddleware<GraphQLMiddleware>();
            app.UseWebSockets();
            app.UseGraphQLWebSockets<TenantSchema>();

            app.UseGraphQL<TenantSchema, GraphQLMiddleware<TenantSchema>>()
                .UseDeveloperExceptionPage();

            app.UseGraphQLGraphiQL(new GraphiQLOptions
            {
                Headers = new Dictionary<string, string>
                {
                    ["X-api-token"] = "130fh9823bd023hd892d0j238dh",
                },
              
            });
            //app.UseGraphiQl("/graphql");
           // app.UseGraphQLGraphiQL(); // by default will run on /ui/graphiql
            app.UseResponseCompression();
            app.UseStaticFiles();
            app.UseMvc();
        }
    }

    public class CustomTokenRetriever
    {
        internal const string TokenItemsKey = "idsrv4:tokenvalidation:token";
        // custom token key change it to the one you use for sending the access_token to the server
        // during websocket handshake
        internal const string SignalRTokenKey = "access_token";

        static Func<HttpRequest, string> AuthHeaderTokenRetriever { get; set; }
        static Func<HttpRequest, string> QueryStringTokenRetriever { get; set; }

        static CustomTokenRetriever()
        {
            AuthHeaderTokenRetriever = TokenRetrieval.FromAuthorizationHeader();
            QueryStringTokenRetriever = TokenRetrieval.FromQueryString();
        }

        public static string FromHeaderAndQueryString(HttpRequest request)
        {
            var token = AuthHeaderTokenRetriever(request);
            var a = request.Query.TryGetValue(SignalRTokenKey, out StringValues ee);
            var ww = ee.ToString();

            if (string.IsNullOrEmpty(token))
            {
                token = QueryStringTokenRetriever(request);
            }

            if (string.IsNullOrEmpty(token))
            {
                token = request.HttpContext.Items[TokenItemsKey] as string;
            }

            if (string.IsNullOrEmpty(token) && request.Query.TryGetValue(SignalRTokenKey, out StringValues extract))
            {
                token = extract.ToString();
            }

            request.Headers.TryGetValue("Authorization", out StringValues authHeader);
           
            if(authHeader.Count == 0)
            {
                request.Headers.Add("Authorization", token);
            }

            return token;
        }
    }
}
