// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

using System.Collections.Generic;
using IdentityServer4;
using IdentityServer4.Models;
using Microsoft.Extensions.Configuration;

namespace Auth
{
    public class Config
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email(),
                new IdentityResource()
                {
                    Name = "tenant",
                    DisplayName = "Tenant Info",
                    Description = "Basic info about the tenant",
                    UserClaims = new List<string>()
                    {
                        "tenantId",
                        "tenantName"
                    }
                },
                new IdentityResource("medciliaScope", new []{ "role", "Admin", "TenantAdmin", "Secretary", "Doctor", "Assistant", "Accountant"})
                //new IdentityResource("dataeventrecordsscope",new []{ "role", "admin", "user", "dataEventRecords", "dataEventRecords.admin" , "dataEventRecords.user" } ),
                //new IdentityResource("securedfilesscope",new []{ "role", "admin", "user", "securedFiles", "securedFiles.admin", "securedFiles.user"} )
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("idsrv", "Identity Server API"),
                new ApiResource("media", "Medcilia Media Server"),
                new ApiResource()
                {
                    Name = "api1",
                    DisplayName = "Api 1",
                    Description = "The main api for Medcilia, let's you do pretty much everything",
                    ApiSecrets =
                    {
                        //new Secret(@"uav2y7WQ`H`.S7Kj:/=LA3:qm-}Tg/6SssA2rskg3s&GvKTGgZAf?uV#H`9!p9rV".Sha256()) // Length = 64, Url: https://passwordsgenerator.net/
                        new Secret(@"superweaksecret".Sha256()) // Length = 64, Url: https://passwordsgenerator.net/
                    },
                    UserClaims = new List<string>()
                    {
                        "tenantId",
                        "tenantName"
                    },
                    Scopes = new List<string>()
                    {
                        "roles",
                        "api1"
                    }
                },
                new ApiResource()
                {
                    Name = "mediaApi",
                    DisplayName = "Media Api",
                    Description = "The media api for Medcilia, let's you manage media files",
                    ApiSecrets =
                    {
                        //new Secret(@"uav2y7WQ`H`.S7Kj:/=LA3:qm-}Tg/6SssA2rskg3s&GvKTGgZAf?uV#H`9!p9rV".Sha256()) // Length = 64, Url: https://passwordsgenerator.net/
                        new Secret(@"secret".Sha256()) // Length = 64, Url: https://passwordsgenerator.net/
                    },
                    UserClaims = new List<string>()
                    {
                        "tenantId",
                        "tenantName"
                    },
                    Scopes = new List<string>()
                    {
                        "roles",
                        "mediaApi"
                    }
                },
                //new ApiResource("dataEventRecords")
                //{
                //    ApiSecrets =
                //    {
                //        new Secret("dataEventRecordsSecret".Sha256())
                //    },
                //    Scopes =
                //    {
                //        new Scope
                //        {
                //            Name = "dataeventrecords",
                //            DisplayName = "Scope for the dataEventRecords ApiResource"
                //        }
                //    },
                //    UserClaims = { "role", "admin", "user", "dataEventRecords", "dataEventRecords.admin", "dataEventRecords.user" }
                //},
                //new ApiResource("securedFiles")
                //{
                //    ApiSecrets =
                //    {
                //        new Secret("securedFilesSecret".Sha256())
                //    },
                //    Scopes =
                //    {
                //        new Scope
                //        {
                //            Name = "securedfiles",
                //            DisplayName = "Scope for the securedFiles ApiResource"
                //        }
                //    },
                //    UserClaims = { "role", "admin", "user", "securedFiles", "securedFiles.admin", "securedFiles.user" }
                //}
            };
        }

        public static IEnumerable<ApiScope> ApiScopes =>
            new List<ApiScope>
            {
                new ApiScope("api1", "My API scope"),
                new ApiScope("media", "My media scope"),
                new ApiScope("mediaApi", "My mediaApi scope")
            };

        // clients want to access resources (aka scopes)
        public static IEnumerable<Client> GetClients(IConfigurationSection stsConfig)
        {
            var medciliaAngularClinicUrl = stsConfig["MedciliaAngularClinicUrl"];
            var medciliaAngularAdminUrl = stsConfig["MedciliaAngularAdminUrl"];
            var MedciliaAngularStagingClinicUrl = stsConfig["MedciliaAngularStagingClinicUrl"];
            // TODO use configs in app

            // client credentials client
            return new List<Client>
            {
                new Client
                {
                    ClientId = "webApi",
                    AllowedGrantTypes = GrantTypes.ClientCredentials,

                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },
                    AllowedScopes = { "idsrv", "medciliaScope", "api1" }
                },
                //new Client
                //{
                //    ClientId = "mediaApi",
                //    AllowedGrantTypes = GrantTypes.ClientCredentials,

                //    ClientSecrets =
                //    {
                //        new Secret("secret".Sha256())
                //    },
                //    AllowedScopes =
                //    {
                //        "idsrv",
                //        "media",
                //        "mediaApi",
                //        "role"
                //    }
                //},

                // JavaScript Client
                new Client
                {
                    ClientId = "medcilia-assistant",
                    ClientName = "Medcilia Assistant",
                    Description = "Medcilia Assistant for doctors by doctors",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,
                    RequireConsent = false,

                    RequireClientSecret = false,
                    AccessTokenType = AccessTokenType.Jwt,
#if DEBUG
                    AccessTokenLifetime = 3600,// 330 seconds, default 60 minutes
                    IdentityTokenLifetime = 300,
#else
                    AccessTokenLifetime = 1209600,// 2 weeks, default 60 minutes
                    IdentityTokenLifetime = 1209600,
#endif
                    ////RefreshTokenUsage = TokenUsage.ReUse,
                    ////RefreshTokenExpiration = TokenExpiration.Absolute,
                    ////AbsoluteRefreshTokenLifetime = 157700000, // 5 years
                    ClientSecrets = new List<Secret>()
                    {
                        new Secret(@"#h~RSR/%et>R]mC=&jSW?}z(Xc87-Q&g3z&\)7Rs:qwu*=XesS%bV'@xjr2*3\BN".Sha256())  // Length = 64, Url: https://passwordsgenerator.net/
                    },
                    RedirectUris =
                    {
                        $"{medciliaAngularClinicUrl}/",
                        $"{medciliaAngularClinicUrl}/silent-refresh.html",
                        $"{MedciliaAngularStagingClinicUrl}/",
                        $"{MedciliaAngularStagingClinicUrl}/silent-refresh.html",
                    },
                    PostLogoutRedirectUris =
                    {
                        $"{medciliaAngularClinicUrl}/",
                        $"{MedciliaAngularStagingClinicUrl}/",
                    },
                    //AllowedCorsOrigins =
                    //{
                    //    medciliaAngularClinicUrl,
                    //},

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "api1",
                        "tenant",
                        "medciliaScope",
                        "media",
                        "mediaApi"
                    },
                },
                // JavaScript Client
                new Client
                {
                    ClientId = "medcilia-admin",
                    ClientName = "Medcilia Admin",
                    Description = "Medcilia Admin Angular App",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,
                    RequireConsent = false,

                    RequireClientSecret = false,
                    AccessTokenType = AccessTokenType.Jwt,

                    RedirectUris =
                    {
                        $"{medciliaAngularAdminUrl}/",
                        $"{medciliaAngularAdminUrl}/silent-refresh.html",
                    },
                    PostLogoutRedirectUris =
                    {
                        $"{medciliaAngularAdminUrl}/",
                    },
                    //AllowedCorsOrigins =
                    //{
                    //    medciliaAngularAdminUrl,
                    //},

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "api1",
                        "medciliaScope",
                        "media",
                        "mediaApi"                        
                    },
                },
            };
        }
    }
}