using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using IdentityModel.Client;
using Medcilia.Clinic.Common;
using Medcilia.Clinic.Common.Extensions;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Services.Audit;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Medcilia.Clinic.Infrastructure.Services.Security
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _uow;
        private readonly string _securityServerUrl;
        private readonly string _securityClientId;
        private readonly string _securityClientSecret;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IAuditLog _auditLog;

        public UserService(IUnitOfWork uow,
            IOptions<IdsrvConfigurationOptions> optionsAccessor,
            IHttpContextAccessor httpContextAccessor,
            IAuditLog auditLog)
        {
            _uow = uow;
            var options = optionsAccessor.Value;

            _securityServerUrl = options.SecurityServerUrl;
            _securityClientId = options.ClientId;
            _securityClientSecret = options.ClientSecret;
            this._httpContextAccessor = httpContextAccessor;
            _auditLog = auditLog;
        }

        public ClaimsPrincipal CurrentUser
        {
            get { return _httpContextAccessor.HttpContext.User; }
        }

        public string CurrentTenantId
        {
            get
            {
                var tenantClaim =
                    CurrentUser.Claims.FirstOrDefault(x => x.Type == "tenantId");
                if (tenantClaim == null)
                    throw new Exception("Missing required TenantId claim in CurrentUser ");

                var tenantId = tenantClaim == null ? "" : tenantClaim.Value;

                return tenantId;
            }
        }
        #region Access Token
        private async Task<string> GetAccessToken()
        {
            // discover endpoints from metadata
            //var disco = await DiscoveryClient.GetAsync(_securityServerUrl);

            //// request token
            //var tokenClient = new TokenClient(disco.TokenEndpoint, _securityClientId, _securityClientSecret);
            //var tokenResponse = await tokenClient.RequestClientCredentialsAsync("idsrv");

            //return tokenResponse.AccessToken;
            using (var client = new HttpClient())
            {
                var disco = await client.GetDiscoveryDocumentAsync(_securityServerUrl);
                if (disco.IsError) throw new Exception(disco.Error);
                var apiName = "idsrv";

                var tokenResponse = await client.RequestClientCredentialsTokenAsync(new ClientCredentialsTokenRequest
                {
                    Address = disco.TokenEndpoint,
                    ClientId = _securityClientId,
                    ClientSecret = _securityClientSecret,
                    Scope = apiName
                });

                if (!tokenResponse.IsError) return tokenResponse.AccessToken;
                return null;
            }
        }

        #endregion

        public async Task<UserResult> CreateAsync(User user, string password)
        {
            var result = new UserResult();
            result = await CreateRemoteAsync(user, password);
            if (result.Succeeded)
            {
                user.UserId = result.UserId;
                _uow.UserRepository.Add(user);
            }

            return result;
        }

        private async Task<UserResult> CreateRemoteAsync(User user, string password)
        {
            var token = await GetAccessToken();
            using (var client = new HttpClient())
            {
                //setup serviceClient
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

                //make request
                var query = new
                {
                    //Id = user.Id,
                    Email = user.Email,
                    Username = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Password = password,
                    ConfirmPassword = password,
                    TenantId = user.TenantId?.DocumentId,
                    IsEnabled = user.IsEnabled,
                    PhoneNumber = user.Phone
                };
                var json = JsonConvert.SerializeObject(query);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                var requestPathUrl = _securityServerUrl + "api/users/create";

                Logger.Info($"CreateRemoteAsync: {requestPathUrl}");

                var response = await client.PostAsync(requestPathUrl, content);
                var responseString = await response.Content.ReadAsStringAsync();
                var result = new UserResult();
                result.Succeeded = response.IsSuccessStatusCode;
                var errors = new List<string>();
                if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
                {
                    var badRequest = JsonConvert.DeserializeObject<Dictionary<string, string[]>>(responseString);
                    if (badRequest != null)
                    {
                        // do something with "message.ModelState.Values"
                        foreach (var entry in badRequest)
                        {
                            errors.Add($"{entry.Key}, {string.Join(", ", entry.Value)}");
                        }
                    }
                    //else
                    //{
                    //    var responseObject = JsonConvert.DeserializeObject<Dictionary<string, string[]>>(responseString);
                    //    // do something with "message.ModelState.Values"
                    //    var messages = responseObject[""];
                    //    foreach (var entry in messages)
                    //    {
                    //        errors.Add(entry);
                    //    }
                    //}
                }
                if (response.StatusCode == System.Net.HttpStatusCode.InternalServerError)
                {
                    //if (responseString.StartsWith('<'))
                    //{
                    errors.Add($"InternalServerError: {responseString.ToSafeHtml()}");
                    //}
                    //else
                    //{
                    //    Logger.Info($"UserService, status code: {response.StatusCode}, response: {responseString}");

                    //    var responseObject = JsonConvert.DeserializeObject<Dictionary<string, string[]>>(responseString);
                    //    // do something with "message.ModelState.Values"
                    //    var messages = responseObject[""];
                    //    foreach (var entry in messages)
                    //    {
                    //        errors.Add(entry);
                    //    }
                    //}
                }
                else
                {
                    var model = JsonConvert.DeserializeObject<SecurityUser>(responseString);
                    result.UserId = model.Id;
                }
                result.Errors = errors;

                return result;
            }
        }


        public async Task<UserResult> UpdateAsync(User user)
        {
            var result = new UserResult();
            result = await UpdateRemoteAsync(user);
            if (result.Succeeded)
            {
                _uow.UserRepository.Update(user);
            }

            return result;
        }

        private async Task<UserResult> UpdateRemoteAsync(User user)
        {
            var token = await GetAccessToken();
            using (var client = new HttpClient())
            {
                //setup serviceClient
                //serviceClient.BaseAddress = new Uri(apiBaseUri);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

                //make request
                var query = new
                {
                    Id = user.UserId,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Phone = user.Phone,
                    IsEnabled = user.IsEnabled
                };
                string json = JsonConvert.SerializeObject(query);
                StringContent content = new StringContent(json, Encoding.UTF8, "application/json");
                var requestPathUrl = _securityServerUrl + "api/users/update";
                HttpResponseMessage response = await client.PostAsync(requestPathUrl, content);
                var responseString = await response.Content.ReadAsStringAsync();
                var result = new UserResult();
                result.Succeeded = response.IsSuccessStatusCode;
                //result.UserId = user.Id;

                var errors = new List<string>();
                if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
                {
                    BadRequestResponse message = JsonConvert.DeserializeObject<BadRequestResponse>(responseString);
                    // do something with "message.ModelState.Values"
                    foreach (var entry in message.ModelState)
                    {
                        errors.Add($"{entry.Key}, {string.Join(", ", entry.Value)}");
                    }
                }

                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    errors.Add($"User not found");
                }

                //else
                //{
                //    var model = JsonConvert.DeserializeObject<SecurityUser>(responseString);
                //}
                result.Errors = errors;

                return result;
            }
        }

        //public Task<UserResult> ChangePasswordAsync(string userId, string oldPassword, string newPassword)
        //{
        //    throw new NotImplementedException();
        //}

        public async Task<UserResult> AssignRolesToUserAsync(string userId, string[] rolesToAssign)
        {
            var token = await GetAccessToken();
            using (var client = new HttpClient())
            {
                //setup serviceClient
                //serviceClient.BaseAddress = new Uri(apiBaseUri);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

                //make request
                //var query = new
                //{
                //    rolesToAssign
                //};
                string json = JsonConvert.SerializeObject(rolesToAssign);
                StringContent content = new StringContent(json, Encoding.UTF8, "application/json");
                var requestPathUrl = _securityServerUrl + $"api/users/{userId}/roles";
                HttpResponseMessage response = await client.PutAsync(requestPathUrl, content);
                var responseString = await response.Content.ReadAsStringAsync();

                var result = new UserResult();
                result.Succeeded = response.IsSuccessStatusCode;
                var errors = new List<string>();
                if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
                {
                    BadRequestResponse message = JsonConvert.DeserializeObject<BadRequestResponse>(responseString);
                    // do something with "message.ModelState.Values"
                    foreach (var entry in message.ModelState)
                    {
                        errors.Add($"{entry.Key}, {string.Join(", ", entry.Value)}");
                    }
                }

                result.Errors = errors;

                return result;
            }
        }

        //public async Task<SecurityRole[]> GetRoles()
        //{
        //    var token = GetAccessToken();
        //    using (var client = new HttpClient())
        //    {
        //        //setup serviceClient
        //        //serviceClient.BaseAddress = new Uri(apiBaseUri);
        //        client.DefaultRequestHeaders.Accept.Clear();
        //        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        //        client.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        //        //make request
        //        //var query = new
        //        //{
        //        //    Email = user.Email,
        //        //    Username = user.UserName,
        //        //    FirstName = user.FirstName,
        //        //    LastName = user.LastName,
        //        //    Password = password,
        //        //    ConfirmPassword = password,
        //        //    BranchId = user.BranchId
        //        //};

        //        //string json = JsonConvert.SerializeObject(query);
        //        //StringContent content = new StringContent(json, Encoding.UTF8, "application/json");
        //        var requestPathUrl = _securityServerUrl + "api/roles/getList";
        //        HttpResponseMessage response = await client.GetAsync(requestPathUrl);
        //        var responseString = await response.Content.ReadAsStringAsync();
        //        //var result = new UserResult();
        //        //result.Succeeded = response.IsSuccessStatusCode;
        //        //var errors = new List<string>();
        //        //if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
        //        //{
        //        //    BadRequestResponse message = JsonConvert.DeserializeObject<BadRequestResponse>(responseString);
        //        //    // do something with "message.ModelState.Values"
        //        //    foreach (var entry in message.ModelState)
        //        //    {
        //        //        errors.Add($"{entry.Key}, {string.Join(", ", entry.Value)}");
        //        //    }
        //        //}
        //        //else
        //        //{
        //        var result = JsonConvert.DeserializeObject<SecurityRole[]>(responseString);

        //        foreach (var role in result)
        //        {
        //            role.DisplayName = GetDisplayName(role.Name);

        //        }
        //        //}
        //        //result.Errors = errors;

        //        return result;
        //    }
        //}

        //private string GetDisplayName(string roleName)
        //{
        //    var displayName = "";
        //    switch (roleName)
        //    {
        //        case "Admin":
        //            displayName = "مدير عام";
        //            break;
        //        case "BranchAdmin":
        //            displayName = "مدير فرع";
        //            break;
        //        case "Secretary":
        //            displayName = "سكرتيرا";
        //            break;
        //        case "Teacher":
        //            displayName = "أستاذ";
        //            break;
        //        case "Student":
        //            displayName = "طالب";
        //            break;
        //    }

        //    return displayName;
        //}

        public async Task<UserResult> ResetPasswordAsync(User user)
        {
            var token = await GetAccessToken();
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

                //make request
                var query = new
                {
                    Id = user.UserId,
                    IsEnabled = user.IsEnabled
                };
                string json = JsonConvert.SerializeObject(query);
                StringContent content = new StringContent(json, Encoding.UTF8, "application/json");
                var requestPathUrl = _securityServerUrl + "api/users/resetPassword";
                HttpResponseMessage response = await client.PostAsync(requestPathUrl, content);
                var responseString = await response.Content.ReadAsStringAsync();
                var result = new UserResult();
                result.Succeeded = response.IsSuccessStatusCode;

                var errors = new List<string>();
                if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
                {
                    errors = HandleBadRequests(responseString);
                }

                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    errors.Add($"User not found");
                }
                result.Errors = errors;
                return result;
            }
        }
        public async Task<UserResult> ResendEmailAsync(User user)
        {
            var token = await GetAccessToken();
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

                //make request
                var query = new
                {
                    Id = user.UserId
                };
                string json = JsonConvert.SerializeObject(query);
                StringContent content = new StringContent(json, Encoding.UTF8, "application/json");
                var requestPathUrl = _securityServerUrl + "api/users/resendEmail";
                HttpResponseMessage response = await client.PostAsync(requestPathUrl, content);
                var responseString = await response.Content.ReadAsStringAsync();
                var result = new UserResult();
                result.Succeeded = response.IsSuccessStatusCode;

                var errors = new List<string>();
                if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
                {
                    errors = HandleBadRequests(responseString);
                }

                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    errors.Add($"User not found");
                }
                result.Errors = errors;
                return result;
            }
        }

        private List<string> HandleBadRequests(string responseString)
        {
            var errors = new List<string>();
            try
            {
                BadRequestResponse message = JsonConvert.DeserializeObject<BadRequestResponse>(responseString);

                // do something with "message.ModelState.Values"
                foreach (var entry in message.ModelState)
                {
                    errors.Add($"{entry.Key}, {string.Join(", ", entry.Value)}");
                }

            }
            catch (JsonSerializationException exc)
            {
                var strMessage = JsonConvert.DeserializeObject<string>(responseString);
                errors.Add(strMessage);
            }
            return errors;
        }

        public async Task<UserResult> ManageUserAsync(User user)
        {
            var result = new UserResult();
            result = await ManageUserRemoteAsync(user);
            if (result.Succeeded)
            {
                _uow.UserRepository.Update(user);
            }

            return result;
        }
        private async Task<UserResult> ManageUserRemoteAsync(User user)
        {
            var token = await GetAccessToken();
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

                //make request
                var query = new
                {
                    Id = user.UserId,
                    IsEnabled = user.IsEnabled
                };
                string json = JsonConvert.SerializeObject(query);
                StringContent content = new StringContent(json, Encoding.UTF8, "application/json");
                var requestPathUrl = _securityServerUrl + "api/users/manage";
                HttpResponseMessage response = await client.PostAsync(requestPathUrl, content);
                var responseString = await response.Content.ReadAsStringAsync();
                var result = new UserResult();
                result.Succeeded = response.IsSuccessStatusCode;

                var errors = new List<string>();
                if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
                {
                    BadRequestResponse message = JsonConvert.DeserializeObject<BadRequestResponse>(responseString);
                    foreach (var entry in message.ModelState)
                    {
                        errors.Add($"{entry.Key}, {string.Join(", ", entry.Value)}");
                    }
                }

                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    errors.Add($"User not found");
                }
                result.Errors = errors;
                return result;
            }
        }

        public async Task<UserResult> RemoveUserAsync(User user)
        {
            var result = new UserResult();
            result = await RemoveUserRemoteAsync(user);
            if (result.Succeeded)
            {
                user.IsDeleted = true;
                _uow.UserRepository.Update(user);

                _auditLog.Log(AuditTypes.UserDeleted, new { TenantId = user.TenantId });
            }

            return result;
        }

        private async Task<UserResult> RemoveUserRemoteAsync(User user)
        {
            var token = await GetAccessToken();
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

                //make request
                //var query = new
                //{
                //    Id = user.UserId
                //};
                //string json = JsonConvert.SerializeObject(query);
                //StringContent content = new StringContent(json, Encoding.UTF8, "application/json");
                var requestPathUrl = _securityServerUrl + "api/users/" + user.UserId;
                HttpResponseMessage response = await client.DeleteAsync(requestPathUrl);
                var responseString = await response.Content.ReadAsStringAsync();
                var result = new UserResult();
                result.Succeeded = response.IsSuccessStatusCode;

                var errors = new List<string>();
                if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
                {
                    errors = HandleBadRequests(responseString);
                }

                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    errors.Add($"User not found");
                }
                result.Errors = errors;
                return result;
            }
        }


    }
}
