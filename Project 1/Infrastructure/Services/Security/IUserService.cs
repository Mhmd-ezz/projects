using Medcilia.Clinic.Infrastructure.Domain;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Medcilia.Clinic.Infrastructure.Services.Security
{
    public interface IUserService
    {
        ClaimsPrincipal CurrentUser { get; }
        string CurrentTenantId { get; }
        Task<UserResult> CreateAsync(User user, string password);
        Task<UserResult> UpdateAsync(User user);
        //Task<UserResult> ChangePasswordAsync(string userId, string oldPassword, string newPassword);
        Task<UserResult> AssignRolesToUserAsync(string userId, string[] rolesToAssign);
        //Task<SecurityRole[]> GetRoles();
        Task<UserResult> ResetPasswordAsync(User user);
        Task<UserResult> ResendEmailAsync(User user);
        Task<UserResult> ManageUserAsync(User user);
        Task<UserResult> RemoveUserAsync(User user);
    }
}
