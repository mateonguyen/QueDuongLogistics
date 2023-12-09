namespace Backend.Controllers;

[Authorize]
public class RolesController : BaseApiController
{
    private readonly RoleManager<AppRole> _roleManager;
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public RolesController(IUnitOfWork unitOfWork, RoleManager<AppRole> roleManager, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _roleManager = roleManager;
    }

    [HttpGet]
    public async Task<ActionResult> Get()
    {
        var roles = await _roleManager.Roles.ToListAsync();

        return Ok(roles);
    }

    [HttpPost("create")]
    public async Task<ActionResult> CreateRole(RoleCreateDto roleCreateDto)
    {
        if (await RoleExists(roleCreateDto.Name)) return BadRequest("Chức năng đã tồn tại");

        var role = _mapper.Map<AppRole>(roleCreateDto);

        var result = await _roleManager.CreateAsync(role);

        if (!result.Succeeded) return BadRequest();

        return Ok(role);
    }

    [HttpPut("update")]
    public async Task<ActionResult> UpdateRole(RoleUpdateDto roleUpdateDto)
    {
        var role = await _roleManager.FindByIdAsync(roleUpdateDto.Id.ToString());

        if (roleUpdateDto.Name != role.Name)
        {
            if (await RoleExists(roleUpdateDto.Name)) return BadRequest("Chức năng đã tồn tại");
        }

        _mapper.Map(roleUpdateDto, role);

        // _unitOfWork.RoleRepository.Update(role);

        var result = await _roleManager.UpdateAsync(role);

        if (result.Succeeded) return Ok(role);

        return BadRequest("Failed to update role");
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteRole(int id)
    {
        var role = await _roleManager.FindByIdAsync(id.ToString());

        var result = await _roleManager.DeleteAsync(role);

        if (result.Succeeded) return Ok(role);

        return BadRequest("Xóa quyền thất bại.");
    }

    private async Task<bool> RoleExists(string roleName)
    {
        return await _roleManager.Roles.AnyAsync(x => x.Name == roleName);
    }
}