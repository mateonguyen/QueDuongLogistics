namespace Backend.Data.Repositories;

public class GroupRepository : BaseRepository<AppGroup>, IGroupRepository
{
    private readonly WakDbContext _context;
    private readonly IMapper _mapper;
    private readonly RoleManager<AppRole> _roleManager;

    public GroupRepository(WakDbContext context, IMapper mapper, RoleManager<AppRole> roleManager) : base(context)
    {
        _roleManager = roleManager;
        _mapper = mapper;
        _context = context;
    }

    public async Task<AppGroup> GetGroupByIdAsync(int groupId)
    {
        return await _context.AppGroups.Where(x => x.Id == groupId).SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<GroupListDto>> GetGroupsAsync()
    {
        return await _context.AppGroups.ProjectTo<GroupListDto>(_mapper.ConfigurationProvider).AsNoTracking().ToListAsync();
    }

    public async Task<bool> GroupExists(string name)
    {
        return await _context.AppGroups.AnyAsync(x => x.GroupName.ToLower() == name.ToLower());
    }

    public async Task<bool> GroupExists(int id, string name)
    {
        return await _context.AppGroups.AnyAsync(x => x.Id != id && x.GroupName.ToLower() == name.ToLower());
    }

    public async Task<IEnumerable<GroupListDto>> GetGroupsWithRoles()
    {
        return await _context.AppGroups
            .Include(x => x.GroupRoles)
            .ThenInclude(x => x.Role)
            .OrderBy(x => x.GroupName)
            .Select(x => new GroupListDto
            {
                Id = x.Id,
                Description = x.Description,
                GroupName = x.GroupName,
                Created = x.Created,
                Roles = x.GroupRoles.Select(r => r.Role.Name).ToList()
            }).ToListAsync();
    }

    public async Task<IList<string>> GetRolesAsync(AppGroup group)
    {
        var groupId = group.Id;
        return await _context.AppGroupRoles.Where(x => x.GroupId == groupId).Select(x => x.Role.Name).ToListAsync();
    }

    /// <summary>
    ///     Add a group to a role
    /// </summary>
    /// <param name="group"></param>
    /// <param name="roleName"></param>
    /// <returns></returns>
    public async Task AddToRoleAsync(AppGroup group, string roleName)
    {
        // var roleEntity = await _context.AppRoles.SingleOrDefaultAsync(r => r.Name.ToUpper() == roleName.ToUpper());

        var roleEntity = await _roleManager.FindByNameAsync(roleName);

        var gr = new AppGroupRole { GroupId = group.Id, RoleId = roleEntity.Id };

        await _context.AppGroupRoles.AddAsync(gr);

    }

    /// <summary>
    /// Method to add group to multiple roles
    /// </summary>
    /// <param name="groupId">user id</param>
    /// <param name="roles">list of role names</param>
    /// <returns></returns>
    public async Task AddToRolesAsync(int groupId, IEnumerable<string> roles)
    {
        var group = await GetGroupByIdAsync(groupId);

        var groupRoles = await GetRolesAsync(group);

        foreach (var r in roles)
        {
            if (groupRoles.Contains(r))
            {
                return;
            }

            await AddToRoleAsync(group, r);
        }
    }

    /// <summary>
    /// Remove user from multiple roles
    /// </summary>
    /// <param name="userId">user id</param>
    /// <param name="roles">list of role names</param>
    /// <returns></returns>
    public async Task RemoveFromRolesAsync(int groupId, IEnumerable<string> roles)
    {
        var group = await GetGroupByIdAsync(groupId);

        // Remove user to each role using UserRoleStore
        var groupRoles = await GetRolesAsync(group);

        foreach (var role in roles)
        {
            if (!groupRoles.Contains(role))
            {
                return;
            }

            await RemoveFromRoleAsync(group, role);
        }
    }

    /// <summary>
    ///     Remove a user from a role
    /// </summary>
    /// <param name="user"></param>
    /// <param name="roleName"></param>
    /// <returns></returns>
    public async Task RemoveFromRoleAsync(AppGroup group, string roleName)
    {
        var roleEntity = await _roleManager.FindByNameAsync(roleName);

        if (roleEntity != null)
        {
            var roleId = roleEntity.Id;

            var groupId = group.Id;

            var groupRole = await _context.AppGroupRoles.FirstOrDefaultAsync(r => roleId.Equals(r.RoleId) && r.GroupId.Equals(groupId));

            if (groupRole != null)
            {
                _context.AppGroupRoles.Remove(groupRole);
            }
        }
    }

    public async Task<bool> AnyAsync()
    {
        return await _context.AppGroups.AnyAsync();
    }
}