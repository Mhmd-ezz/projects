using System;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Auth.Controllers.Users;
using Auth.Models;
using Auth.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Auth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IEmailSender _emailSender;

        public UsersController(UserManager<ApplicationUser> userManager, IEmailSender emailSender,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _emailSender = emailSender;
            _roleManager = roleManager;
        }

        [Route("")]
        [HttpPost]
        public async Task<IActionResult> GetUsers(SearchModel query)
        {
            var users = await SearchUsers(query);
            return Ok(users);
        }

        private async Task<SearchResult<UserReturnModel>> SearchUsers(SearchModel query)
        {
            SearchResult<UserReturnModel> result = new SearchResult<UserReturnModel>();
            if (query.Page < 1) query.Page = 1;
            var start = (query.Page - 1) * query.Size;

            var users = _userManager.Users;

            //if (!string.IsNullOrEmpty(query.RoleName))
            //{
            //    var role = this.AppRoleManager.Roles.SingleOrDefault(r => r.Name == query.RoleName);
            //    if (role != null)
            //    {
            //        users = users
            //            .Where(x => x.Roles.Any(y => y.RoleId == role.Id));
            //    }
            //}
            //else 
            if (!string.IsNullOrEmpty(query.Text))
            {
                var words = query.Text.Split(' ');

                foreach (var word in words)
                {
                    users = users
                        .Where(x => x.FirstName.Contains(word) || x.LastName.Contains(word) || x.UserName.Contains(word));
                }
            }
            result.TotalCount = users.Count();

            result.Items = users
                .OrderBy(x => x.UserName)
                //.OrderByDescending(x => x.JoinDate)
                .Skip(start)
                .Take(query.Size)
                .ToList()
                .Select(u => Map(u))
                .ToArray();

            return result;
        }

        //[AllowAnonymous]
        [Route("create")]
        public async Task<IActionResult> CreateUser(CreateUserBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new ApplicationUser()
            {
                UserName = model.Username,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                PhoneNumber = model.PhoneNumber,
                JoinDate = DateTime.Now.Date,
                IsEnabled = model.IsEnabled,
                TenantId = model.TenantId,
                //Id = model.Id
            };
            try
            {
                IdentityResult addUserResult = await _userManager.CreateAsync(user, model.Password);

                if (!addUserResult.Succeeded)
                {
                    return GetErrorResult(addUserResult);
                }
            }
            catch (Exception exc)
            {
                ModelState.AddModelError("", exc.Message);
                return BadRequest(ModelState);
            }
            await SendEmail(user);

            // Uri locationHeader = new Uri(Url.Link("GetUserById", new { id = user.Id }));
            return Created("", Map(user));
        }
        private async Task SendEmail (ApplicationUser user)
        {
            string code = await this._userManager.GenerateEmailConfirmationTokenAsync(user);
            var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: Request.Scheme);

            var encodedCallbackUrl = HtmlEncoder.Default.Encode(callbackUrl);

            await this._emailSender.SendEmailAsync(user.Email, "Welcome to Medcilia",
                "<div>" +
                "<div>Dear Friend, </div><br/>" +
                "<div>You have been invited to use \"Medcilia Assistant\" and an account has been created for you. " +
                "Please confirm your account by clicking <a href=\"" + encodedCallbackUrl + "\">here</a>. " +
                @"<br />
                         <br /> " +
                @" <div>or copy and paste this into your browser: 
             <div>" + encodedCallbackUrl + @"</div>
            </div>
            <br />
            <br /> " +
                " </div>" +
                "<div>Onced confirmed, you will get all details about your new account.</div>" +
                "</div><br/>");

        }

        [HttpPost]
        [Route("update")]
        public async Task<IActionResult> UpdateUser(UpdateUserBindingModel model)
        {
            // Only SuperAdmin or Admin can delete users 
            var appUser = await _userManager.FindByIdAsync(model.Id);
            if (appUser != null)
            {
                appUser.FirstName = model.FirstName;
                appUser.LastName = model.LastName;
                appUser.Email = model.Email;
                appUser.PhoneNumber = model.Phone;
                appUser.IsEnabled = model.IsEnabled;

                try
                {
                    IdentityResult result = await this._userManager.UpdateAsync(appUser);

                    if (!result.Succeeded)
                    {
                        return GetErrorResult(result);
                    }
                    return Ok();
                }
                catch (Exception exc)
                {
                    ModelState.AddModelError("", exc.Message);
                    return BadRequest(ModelState);
                }
            }
            return NotFound();
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            await _userManager.DeleteAsync(user);

            return Ok();
        }


        [HttpPost]
        [Route("resetPassword")]
        public async Task<IActionResult> SendPasswordReset(UserPasswordResetBindingModel model)
        {
            var user = await _userManager.FindByIdAsync(model.Id);
            if (user == null)
            {
                return NotFound();
            }

            if (!user.IsEnabled)
            {
                return BadRequest("The user account is disabled");
            }
            if (!user.EmailConfirmed)
            {
                await SendEmail(user);
                return BadRequest("The user email address is not confirmed yet");
            }
            
            //For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=532713
            //Send an email with this link
            var reset_code = await _userManager.GeneratePasswordResetTokenAsync(user);
            var callbackUrl = Url.Action("ResetPassword", "Account", new { userId = user.Id, code = reset_code }, protocol: Request.Scheme);
            await _emailSender.SendEmailAsync(user.Email, "Reset Password",
                $"Please reset your password by clicking here: <a href='{callbackUrl}'>link</a>");

            return Ok();
        }

        [HttpPost]
        [Route("resendEmail")]
        public async Task<IActionResult> ResendEmailConfirmation(ResendEmailModel model)
        {
            var user = await _userManager.FindByIdAsync(model.Id);
            if (user == null)
            {
                return NotFound();
            }

            if (user.EmailConfirmed)
            {
                return BadRequest("The user email address is already confirmed yet");
            }

            await SendEmail(user);

            return Ok();
        }

        /// <summary>
        /// Enable/Disable
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("manage")]
        public async Task<IActionResult> EnableUser(ManageUserBindingModel model)
        {
            var appUser = await _userManager.FindByIdAsync(model.Id);
            if (appUser != null)
            {
                appUser.IsEnabled = model.IsEnabled;

                try
                {
                    IdentityResult result = await this._userManager.UpdateAsync(appUser);

                    if (!result.Succeeded)
                    {
                        return GetErrorResult(result);
                    }
                    return Ok();
                }
                catch (Exception exc)
                {
                    ModelState.AddModelError("", exc.Message);
                    return BadRequest(ModelState);
                }
            }
            return NotFound();
        }

        [Route("{id}/roles")]
        [HttpPut]
        public async Task<IActionResult> AssignRolesToUser(string id, [FromBody]string[] rolesToAssign)
        {
            var appUser = await this._userManager.FindByIdAsync(id);

            if (appUser == null)
            {
                return NotFound();
            }
            var currentRoles = await this._userManager.GetRolesAsync(appUser);

            var rolesNotExists = rolesToAssign.Except(this._roleManager.Roles.Select(x => x.Name)).ToArray();

            if (rolesNotExists.Any())
            {
                ModelState.AddModelError("", string.Format("Roles '{0}' does not exist in the system", string.Join(",", rolesNotExists.ToArray())));
                return BadRequest(ModelState);
            }
            IdentityResult removeResult = await this._userManager.RemoveFromRolesAsync(appUser, currentRoles.ToArray());

            if (!removeResult.Succeeded)
            {
                ModelState.AddModelError("", "Failed to remove user roles");
                return BadRequest(ModelState);
            }

            IdentityResult addResult = await this._userManager.AddToRolesAsync(appUser, rolesToAssign);

            if (!addResult.Succeeded)
            {
                ModelState.AddModelError("", "Failed to add user roles");
                return BadRequest(ModelState);
            }

            return Ok();
        }

        #region Private Methods
        private UserReturnModel Map(ApplicationUser user)
        {
            var model = new UserReturnModel();

            model.Id = user.Id;
            model.UserName = user.UserName;
            model.FullName = string.Format("{0} {1}", user.FirstName, user.LastName);
            model.Email = user.Email;
            model.EmailConfirmed = user.EmailConfirmed;
            model.JoinDate = user.JoinDate;
            model.Roles = _userManager.GetRolesAsync(user).Result;
            model.Claims = _userManager.GetClaimsAsync(user).Result;
            model.IsLocked = user.LockoutEnd > DateTime.UtcNow;
            model.IsEnabled = user.IsEnabled;
            model.TenantId = user.TenantId;

            return model;
        }

        protected IActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return StatusCode(500);
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }
                return BadRequest(ModelState);
            }
            return null;
        }

        #endregion
    }
}