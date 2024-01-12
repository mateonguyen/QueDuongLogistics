namespace Backend.Controllers;


public class UsersController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly UserManager<AppUser> _userManager;
    private readonly IMapper _mapper;

    public UsersController(IUnitOfWork unitOfWork, UserManager<AppUser> userManager, IMapper mapper)
    {
        _mapper = mapper;
        _userManager = userManager;
        _unitOfWork = unitOfWork;
    }

    // [HttpGet]
    // public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers([FromQuery] PaginationParams userParams)
    // {
    //     var users = await _unitOfWork.UserRepository.GetUsersAsync(userParams);

    //     Response.AddPaginationHeader(userParams.PageNumber, userParams.PageSize, users.TotalCount, users.TotalPages);

    //     return Ok(users);
    // }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
    {
        var users = await _unitOfWork.UserRepository.GetUsersAsync();

        return Ok(users);
    }

    [HttpGet("{username}")]
    public async Task<ActionResult<UserDto>> GetUserByUsername(string username)
    {
        var user = await _unitOfWork.UserRepository.GetUserByUsername(username);

        var userToReturn = _mapper.Map<UserDto>(user);

        return userToReturn;
    }

    [HttpPost("create")]
    public async Task<ActionResult> CreateUser(UserCreateDto userCreateDto)
    {
        if (await UserExists(userCreateDto.UserName)) return BadRequest("Tên đăng nhập đã tồn tại.");

        var user = _mapper.Map<AppUser>(userCreateDto);

        user.UserName = userCreateDto.UserName.ToLower();

        var result = await _userManager.CreateAsync(user, "admin@123");
        
        var group = await _unitOfWork.GroupRepository.GetGroupByIdAsync(userCreateDto.GroupId);
        
        if (group != null)
        {
            var groupRoles = await _unitOfWork.GroupRepository.GetRolesAsync(user.Group);
            await _userManager.AddToRolesAsync(user, groupRoles);
        }

        if (!result.Succeeded) return BadRequest(result.Errors);

        // user = await _unitOfWork.UserRepository.GetUserByUsername(userCreateDto.UserName);

        var userToReturn = _mapper.Map<UserDto>(user);

        return Ok(userToReturn);
    }

    [HttpPut("update")]
    public async Task<ActionResult> UpdateUser(UserCreateDto userCreateDto)
    {
        var user = await _unitOfWork.UserRepository.GetUserByUsername(userCreateDto.UserName);

        _mapper.Map(userCreateDto, user);

        var result = await _userManager.UpdateAsync(user);

        if (!result.Succeeded) return BadRequest(result.Errors);

        // user = await _unitOfWork.UserRepository.GetUserByUsername(userCreateDto.UserName);

        var userToReturn = _mapper.Map<UserDto>(user);

        return Ok(userToReturn);
    }

    [HttpPost("reset-password/{username}")]
    public async Task<ActionResult> ResetPassword(string username)
    {
        var user = await _userManager.FindByNameAsync(username);

        var token = await _userManager.GeneratePasswordResetTokenAsync(user);

        var result = await _userManager.ResetPasswordAsync(user, token, "admin@123");

        if (!result.Succeeded) return BadRequest();

        return Ok();
    }

    [HttpPost("edit-roles/{username}")]
    public async Task<ActionResult> EditRoles(string username, [FromQuery] string roles)
    {
        var selectedRole = roles.Split(",").ToArray();

        var user = await _userManager.FindByNameAsync(username);

        if (user == null) return NotFound("Could not find user");

        var userRoles = await _userManager.GetRolesAsync(user);

        var result = await _userManager.AddToRolesAsync(user, selectedRole.Except(userRoles));

        if (!result.Succeeded) return BadRequest("Failed to add to roles");

        result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRole));

        if (!result.Succeeded) return BadRequest("Failed to remove from roles");

        return Ok(await _userManager.GetRolesAsync(user));
    }

    private async Task<bool> UserExists(string username)
    {
        return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
    }
}