using System;
using System.Linq;
using System.Threading.Tasks;
using Auth.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Auth.Data
{
    public static class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
            {
                if (context.Users.Any())
                {
                    return;   // DB has been seeded
                }

                var manager = serviceProvider.GetService<UserManager<ApplicationUser>>();
                var roleManager = serviceProvider.GetService<RoleManager<IdentityRole>>();

                var user = new ApplicationUser
                {
                    UserName = "Pu9649",
                    FirstName = "Brian",
                    LastName = "Mandoza",
                    Email = "jalchr@gmail.com",
                    EmailConfirmed = true,
                    JoinDate = new DateTime(2018, 12, 1),
                    IsEnabled = true
                };

                await manager.CreateAsync(user, "P@ssw0rd!");

                if (roleManager.Roles.Count() == 0)
                {
                    await roleManager.CreateAsync(new IdentityRole { Name = "Admin" });
                    await roleManager.CreateAsync(new IdentityRole { Name = "TenantAdmin" });
                    await roleManager.CreateAsync(new IdentityRole { Name = "Doctor" });
                    await roleManager.CreateAsync(new IdentityRole { Name = "Secretary" });
                    await roleManager.CreateAsync(new IdentityRole { Name = "Assistant" });
                    await roleManager.CreateAsync(new IdentityRole { Name = "Accountant" });
                }

                var adminUser = await manager.FindByNameAsync(user.UserName);
                await manager.AddToRolesAsync(adminUser, new string[] { "Admin" });
            }
        }

    }
}
