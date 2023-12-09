namespace Backend.Controllers;

[Authorize]
public class GroupsController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly UserManager<AppUser> _userManager;
    private readonly RoleManager<AppRole> _roleManager;

    public GroupsController(IUnitOfWork unitOfWork, IMapper mapper, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
    {
        _roleManager = roleManager;
        _mapper = mapper;
        _userManager = userManager;
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GroupListDto>>> GetGroups()
    {
        var groups = await _unitOfWork.GroupRepository.GetGroupsAsync();

        return Ok(groups);
    }

    [HttpPost("create")]
    public async Task<ActionResult> CreateGroup(GroupCreateDto groupCreateDto)
    {
        if (await _unitOfWork.GroupRepository.GroupExists(groupCreateDto.GroupName))
            return BadRequest("Tên nhóm đã tồn tại.");

        var group = _mapper.Map<AppGroup>(groupCreateDto);

        group.Creator = User.GetUsername();

        await _unitOfWork.GroupRepository.CreateAsync(group);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Thêm mới nhóm thất bại.");

        // var groupToReturn = _mapper.Map<GroupListDto>(group);

        return Ok(group);
    }

    [HttpPut("update")]
    public async Task<ActionResult> UpdateGroup(GroupUpdateDto groupUpdateDto)
    {
        if (await _unitOfWork.GroupRepository.GroupExists(groupUpdateDto.Id, groupUpdateDto.GroupName))
            return BadRequest("Tên nhóm đã tồn tại.");

        var group = await _unitOfWork.GroupRepository.GetGroupByIdAsync(groupUpdateDto.Id);

        _mapper.Map(groupUpdateDto, group);

        _unitOfWork.GroupRepository.Update(group);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Sửa thông tin nhóm thất bại.");

        // var groupToReturn = _mapper.Map<GroupListDto>(group);

        return Ok(group);
    }

    [HttpDelete("{id}")]    
    public async Task<ActionResult> DeleteGroup(int id)
    {
        var group = await _unitOfWork.GroupRepository.GetGroupByIdAsync(id);
        try 
        {
            _unitOfWork.GroupRepository.Delete(group);
            if (await _unitOfWork.Complete()) return NoContent();
        } 
        catch(DbUpdateException ex) 
        {
            if (ex.InnerException.Message.Contains("ORA-02292"))
                return Ok("ORA-02292");
                
            return BadRequest (ex.Message);
        }

        return BadRequest("Xóa nhóm người dùng thất bại.");
    }

    // [HttpPost("edit-roles/{groupId}")]
    // public async Task<ActionResult> EditRoles(int groupId, [FromQuery] string roles)
    // {
    //     var selectedRoles = roles.Split(",").ToArray();

    //     // Update Roles for Group

    //     var group = await _unitOfWork.GroupRepository.GetGroupByIdAsync(groupId);

    //     if (group == null) return NotFound("Không thể tìm thấy Nhóm người dùng");

    //     var groupRoles = await _unitOfWork.GroupRepository.GetRolesAsync(group);

    //     await _unitOfWork.GroupRepository.AddToRolesAsync(groupId, selectedRoles.Except(groupRoles));

    //     await _unitOfWork.GroupRepository.RemoveFromRolesAsync(groupId, groupRoles.Except(selectedRoles));

    //     // var result = await _unitOfWork.Complete();

    //     // Update Roles for Users

    //     var usersInGroup = await _unitOfWork.UserRepository.GetUsersByGroupAsync(groupId);

    //     if (usersInGroup == null) return NotFound("Could not find users");

    //     foreach (var user in usersInGroup)
    //     {
    //         var userRoles = await _userManager.GetRolesAsync(user);

    //         var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

    //         if (!result.Succeeded) return BadRequest("Failed to add to roles");

    //         result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

    //         if (!result.Succeeded) return BadRequest("Failed to remove from roles");
    //     }

    //     return Ok(_unitOfWork.GroupRepository.GetRolesAsync(group));
    // }

    [HttpPost("edit-roles/{id}")]
    public async Task<ActionResult> EditRoles(int id, [FromQuery] string roles)
    {
        var selectedRoles = roles.Split(",").ToArray();

        // Update Roles for Group

        var group = await _unitOfWork.GroupRepository.GetGroupByIdAsync(id);

        if (group == null) return NotFound("Không thể tìm thấy Nhóm người dùng");

        var groupRoles = await _unitOfWork.GroupRepository.GetRolesAsync(group);

        await _unitOfWork.GroupRepository.AddToRolesAsync(id, selectedRoles.Except(groupRoles));

        await _unitOfWork.GroupRepository.RemoveFromRolesAsync(id, groupRoles.Except(selectedRoles));

        // var result = await _unitOfWork.Complete();

        // Update Roles for Users

        var usersInGroup = await _unitOfWork.UserRepository.GetUsersByGroupAsync(id);

        if (usersInGroup == null) return NotFound("Could not find users");

        foreach (var user in usersInGroup)
        {
            var userRoles = await _userManager.GetRolesAsync(user);

            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded) return BadRequest("Failed to add to roles");

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded) return BadRequest("Failed to remove from roles");
        }

        return Ok(await _unitOfWork.GroupRepository.GetRolesAsync(group));
        // return Ok();
    }

    [HttpGet("groups-with-roles")]
    public async Task<ActionResult> GetGroupsWithRoles()
    {
        var groups = await _unitOfWork.GroupRepository.GetGroupsWithRoles();

        return Ok(groups);
    }

}
