namespace Backend.Data.Interfaces;

public interface IGroupRepository : IBaseRepository<AppGroup>
{
    Task<IEnumerable<GroupListDto>> GetGroupsAsync();

    Task<AppGroup> GetGroupByIdAsync(int groupId);

    Task<bool> GroupExists(string name);

    Task<bool> GroupExists(int id, string name);

    Task<IEnumerable<GroupListDto>> GetGroupsWithRoles();

    Task<IList<string>> GetRolesAsync(AppGroup group);

    Task AddToRoleAsync(AppGroup group, string roleName);

    Task AddToRolesAsync(int groupId, IEnumerable<string> roles);

    Task RemoveFromRolesAsync(int groupId, IEnumerable<string> roles);

    Task RemoveFromRoleAsync(AppGroup group, string roleName);

    Task<bool> AnyAsync();
}
