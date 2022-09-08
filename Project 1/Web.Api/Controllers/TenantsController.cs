using System;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Medcilia.Clinic.Common;
using Medcilia.Clinic.Common.Enumerations;
using Medcilia.Clinic.Common.Extensions;
using Medcilia.Clinic.Infrastructure;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Enums;
using Medcilia.Clinic.Infrastructure.Helper;
using Medcilia.Clinic.Infrastructure.Services.Security;
using Medcilia.Clinic.WebApi.Helpers;
using Medcilia.Clinic.WebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Medcilia.Clinic.WebApi.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class TenantsController : Controller
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IUserService _service;
        const string INIT_PASSWORD = "P@ssw0rd!2020";

        public TenantsController(IUnitOfWork uow, IMapper mapper, IUserService service)
        {
            _uow = uow;
            this._mapper = mapper;
            this._service = service;
        }

        [NoCache]
        [HttpGet]
        public async Task<ReturnedResult<TenantModel>> Get(string q, string sort, string order, int page, int limit)
        {
            var list = await _uow.TenantRepository.Search(q, sort, order, page, limit);
            var items = _mapper.Map<TenantModel[]>(list.Items);

            var randoms = new Random(5);
            foreach (var item in items)
            {
                item.UsersCount = randoms.Next(1, 10);
            }
            var result = new ReturnedResult<TenantModel>
            {
                Items = items,
                Total = list.Total
            };

            return result;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TenantModel>> Get(string id)
        {
            // Thread.Sleep(6000);
            var tenant = await _uow.TenantRepository.GetByIdAsync(id);
            if (tenant == null)
                return NotFound();
            var model = _mapper.Map<TenantModel>(tenant);
            return model;
        }

        [HttpGet("tenant")]
        public async Task<ActionResult<TenantModel>> GetTenant()
        {
            
            var claim = User.Claims.ToList().Where(c => c.Type == "tenantId").First();
            // @ Get Identity Id
            var userIdclaim = User.Claims.ToList().Where(c => c.Type == "sub").First();
            var tenantId = claim.Value;
            var userId = userIdclaim.Value;

            var tenant = await _uow.TenantRepository.GetByIdAsync(tenantId);
            
            // @ Inject current authenticated user
            var currentUser = await _uow.TenantRepository.GetByIdAsync(tenantId);
            var user = _uow.UserRepository.GetUserByAltUserId(tenantId, userId);
            var userModel = _mapper.Map<UserModel>(user);

            if (tenant == null)
                return NotFound();
            var model = _mapper.Map<TenantModel>(tenant);
            model.CurrentUser = userModel;

            return model;
        }

        // POST api/values
        [HttpPost]
        public TenantModel Post([FromBody]TenantModel model)
        {
            var tenant = _mapper.Map<Tenant>(model);
            _uow.TenantRepository.Add(tenant);

            var schedule = new Schedule();
            schedule.TenantId = string.IsNullOrEmpty(tenant.Id) ? null : new DocumentRef(_uow.TenantCollectionName, tenant.Id);
            _uow.ScheduleRepository.Add(schedule);
            model.Id = tenant.Id;
            return model;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<ActionResult<TenantModel>> Put(string id, [FromBody]TenantModel model)
        {
           var tenant =  _uow.TenantRepository.GetById(id);
            if (tenant == null)
                return NotFound();

            var updated = _mapper.Map<Tenant>(model);
            tenant.Name = updated.Name;
            tenant.Speciality = updated.Speciality;

            _uow.TenantRepository.Update(tenant);
            return model;
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
             _uow.TenantRepository.Delete(id);
            
           
            return Ok();
            
        }

        [NoCache]
        [HttpGet("{id}/users")]
        public async Task<ReturnedResult<UserModel>> GetUsersByTenantId(string id, string text, int page, int limit)
        {
            var list = await _uow.UserRepository.Search(text, id, page, limit);
            var items = _mapper.Map<UserModel[]>(list.Items);

            var result = new ReturnedResult<UserModel>
            {
                Items = items,
                Total = list.Total
            };

            return result;
        }

        [HttpPost("{id}/users")]
        public async Task<IActionResult> CreateUser(string id, [FromBody]UserModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var tenantClaim = ((ClaimsPrincipal)User).Claims.FirstOrDefault(r => r.Type == "tenantId");
            var tenantId = tenantClaim?.Value;
            model.TenantId = model.TenantId ?? tenantId;
            try
            {
                var user = _mapper.Map<User>(model);
                user.IsEnabled = true;
                user.UserName = user.Email;
                user.TenantId = string.IsNullOrEmpty(id) ? null : new DocumentRef(_uow.TenantCollectionName, id);
                //_uow.UserRepository.Add(user);
                //return Ok();

                user.RolesEnums = model.Roles.Select(KeyedEnumeration.FromKey<UserRolesEnum>).ToArray();
                var addUserResult = await _service.CreateAsync(user, INIT_PASSWORD);

                if (!addUserResult.Succeeded)
                {
                    return GetErrorResult(addUserResult);
                }
                await _service.AssignRolesToUserAsync(addUserResult.UserId, model.Roles);                

                return Created("", _mapper.Map<UserModel>(user));
            }
            catch (Exception exc)
            {
                Logger.Error("Failed to create the user", exc);
                return BadRequest(exc.FullMessage());
            }
        }

        [NoCache]
        [HttpGet("{id}/users/{userId}")]
        public UserModel GetUserById(string id, string userId)
        {
            var user = _uow.UserRepository.GetUserByTenantId(id, userId);
            var model = _mapper.Map<UserModel>(user);
            return model;
        }
       
        // PUT 
        [HttpPut("{id}/users/{userId}")]
        public async Task<IActionResult> UpdateUser(string userId, [FromBody]UserModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var tenantClaim = ((ClaimsPrincipal)User).Claims.FirstOrDefault(r => r.Type == "tenantId");
            var tenantId = tenantClaim?.Value;

            try
            {
                var user = await _uow.UserRepository.GetByIdAsync(userId);
                if (user == null)
                {
                    return NotFound("User does not exist !");
                }
                if (user.TenantId.DocumentId != tenantId)
                {
                    ModelState.AddModelError("", "Invalid or missing tenant");
                    return BadRequest(ModelState);
                }

                user.IsEnabled = model.IsEnabled;
                user.FirstName = model.FirstName;
                user.LastName = model.LastName;
                user.Phone = model.Phone;
                //user.Email = model.Email;

                user.RolesEnums = model.Roles.Select(KeyedEnumeration.FromKey<UserRolesEnum>).ToArray();
                var updateUserResult = await _service.UpdateAsync(user);

                if (!updateUserResult.Succeeded)
                {
                    return GetErrorResult(updateUserResult);
                }
                await _service.AssignRolesToUserAsync(updateUserResult.UserId, model.Roles);

                return Ok();
            }
            catch (Exception exc)
            {
                Logger.Error("Failed to update the user", exc);
                return BadRequest(exc.FullMessage());
            }
        }

        [NoCache]
        [HttpPost("{id}/users/{userId}/resendEmail")]
        public async Task<IActionResult> ResendEmailToUser(string id, string userId)
        {
            var user = _uow.UserRepository.GetUserByTenantId(id, userId);
            if (user == null)
                return NotFound();

            var resendEmailResult = await _service.ResendEmailAsync(user);

            if (!resendEmailResult.Succeeded)
            {
                return GetErrorResult(resendEmailResult);
            }
            return Ok();
        }

        [NoCache]
        [HttpPost("{id}/users/{userId}/reset")]
        public async Task<IActionResult> ResetUserPassword(string id, string userId)
        {
            var user = _uow.UserRepository.GetUserByTenantId(id, userId);
            if (user == null)
                return NotFound();

            var updateUserResult = await _service.ResetPasswordAsync(user);

            if (!updateUserResult.Succeeded)
            {
                return GetErrorResult(updateUserResult);
            }
            return Ok();
        }

        [NoCache]
        [HttpDelete("{id}/users/{userId}")]
        public async Task<IActionResult> RemoveUser(string id, string userId)
        {
            var user = _uow.UserRepository.GetUserByTenantId(id, userId);
            if (user == null)
                return NotFound();

            var removeResult = await _service.RemoveUserAsync(user);

            if (!removeResult.Succeeded)
            {
                return GetErrorResult(removeResult);
            }
            return Ok();
        }



        private IActionResult GetErrorResult(UserResult result)
        {
            if (result == null)
            {
                return StatusCode(500);
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
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


    }
}
