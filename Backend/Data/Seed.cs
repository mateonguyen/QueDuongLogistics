using System.Text.Json;

namespace Backend.Data;

public class Seed
{
    public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager, IUnitOfWork unitOfWork)
    {
        // if (await roleManager.Roles.AnyAsync()) return;

        // var roles = new List<AppRole>
        // {
        //     new AppRole { Name = "ADM_GROUP", Description = "Quản trị Nhóm người dùng" },
        //     new AppRole { Name = "ADM_USER", Description = "Quản trị Người dùng"},
        //     new AppRole { Name = "ADM_CODE", Description = "Quản trị Bảng mã" },
        //     new AppRole { Name = "ADM_ROLE", Description = "Quản trị Quyền" },
        // };
        // foreach (var role in roles)
        // {
        //     await roleManager.CreateAsync(role);
        // }
        

        if (await unitOfWork.GroupRepository.AnyAsync()) return;

        var groups = new List<AppGroup>
        {
            new AppGroup { GroupName = "Developers", Created = DateTime.Now, Creator = "system" },
            new AppGroup { GroupName = "Administrators", Created = DateTime.Now, Creator = "system" },
        };

        foreach (var group in groups)
        {
            await unitOfWork.GroupRepository.CreateAsync(group);            
        }

        await unitOfWork.Complete();       


        if (await userManager.Users.AnyAsync()) return;

        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

        var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

        if (users == null) return;

        foreach (var user in users)
        {
            user.UserName = user.UserName.ToLower();            
            user.IsActived = true;
            await userManager.CreateAsync(user, "admin@123");

            if (user.UserName == "toannv")
            {
                await userManager.AddToRoleAsync(user, "ADM_GROUP");
                await userManager.AddToRoleAsync(user, "ADM_USER");
                await userManager.AddToRoleAsync(user, "ADM_CODE");
                await userManager.AddToRoleAsync(user, "ADM_ROLE");
            }

        }
    }
}
