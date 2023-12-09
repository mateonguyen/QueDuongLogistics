using System.Net;
using Backend.Enums;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.Processing;

namespace Backend.Controllers;

public class AccountController : BaseApiController
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;    
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IUnitOfWork _unitOfWork;

    public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
        ITokenService tokenService, IMapper mapper, IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _tokenService = tokenService;
        _signInManager = signInManager;
        _userManager = userManager;
        _httpContextAccessor = httpContextAccessor;
        _unitOfWork = unitOfWork;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.Users
            .SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

        if (user == null) return Unauthorized("Tên đăng nhập hoặc mật khẩu không đúng.");

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (!result.Succeeded) return Unauthorized("Tên đăng nhập hoặc mật khẩu không đúng.");

        // var userDto = _mapper.Map<UserDto>(user);

        // userDto.PhotoFile = this.File(user.Photo, "image/png");

        var authDto = new AuthDto
        {
            User = _mapper.Map<UserDto>(user),
            Token = await _tokenService.CreateToken(user)
        };

        AuditLogin(user.UserName);

        return authDto;
    }

    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        AuditLogout();

        await _signInManager.SignOutAsync();

        return Ok();
    }

    // [HttpPost("refresh")]
    // public async Task<ActionResult<AuthDto>> Refesh(LoginDto loginDto)
    // {
    //     var result = await _signInManager.
    // }

    [Authorize]
    [HttpGet("change-password")]
    public async Task<ActionResult> ChangePassword(ChangePasswordDto changePasswordDto)
    {
        var user = await _userManager.GetUserAsync(User);

        var checkPassword = await _userManager.CheckPasswordAsync(user, changePasswordDto.CurrentPassword);

        if (!checkPassword) return BadRequest("Mật khẩu hiện tại không chính xác");

        var result = await _userManager.ChangePasswordAsync(user, changePasswordDto.CurrentPassword, changePasswordDto.Password);

        if (!result.Succeeded) return BadRequest("Đổi mật khẩu thất bại");

        return Ok();
    }

    private void AuditLogin(string username)
    {
        IPHostEntry ipHostInfo = Dns.GetHostEntry(Dns.GetHostName());
        string ipAddress = Convert.ToString(ipHostInfo.AddressList.FirstOrDefault(address => address.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork));

        var audit = new AuditLog()
        {
            AuditType = AuditType.Login.ToString(),
            UserName = username,
            IpAddress = ipAddress,
            AuditTime = DateTime.Now
        };

        _unitOfWork.AuditRepository.CreateAsync(audit);
        _unitOfWork.Complete();
    }

    private void AuditLogout()
    {
        IPHostEntry ipHostInfo = Dns.GetHostEntry(Dns.GetHostName());
        string ipAddress = Convert.ToString(ipHostInfo.AddressList.FirstOrDefault(address => address.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork));
        var audit = new AuditLog()
        {
            AuditType = AuditType.Logout.ToString(),
            UserName = this._httpContextAccessor.HttpContext?.User?.GetUsername(),
            // IpAddress = this._httpContextAccessor.HttpContext?.Connection.RemoteIpAddress.ToString(),
            IpAddress = ipAddress,
            AuditTime = DateTime.Now
        };

        _unitOfWork.AuditRepository.CreateAsync(audit);
        _unitOfWork.Complete();
    }

    [Authorize]
    [HttpPost("edit-profile")]
    public async Task<ActionResult> EditProfile([FromForm] ProfileDto profile)
    {
        var file = profile.PhotoFile;

        var image = new ImageInputDto
        {
            Name = file.FileName,
            Type = file.ContentType,
            Content = file.OpenReadStream()
        };

        using var imageResult = await Image.LoadAsync(image.Content);

        var photo = await SaveImage(imageResult, 300);

        var user = await _userManager.FindByIdAsync(profile.Id.ToString());

        _mapper.Map(profile, user);

        user.Photo = photo;

        var result = await _userManager.UpdateAsync(user);

        if (!result.Succeeded) return BadRequest();

        return Ok(_mapper.Map<UserDto>(user));
    }

    private async Task<byte[]> SaveImage(Image image, int resizeWidth)
    {
        var width = image.Width;
        var height = image.Height;

        if (width > resizeWidth)
        {
            height = (int)((double)resizeWidth / width * height);
            width = resizeWidth;
        }

        image.Mutate(i => i.Resize(new Size(width, height)));

        image.Metadata.ExifProfile = null;

        var memoryStream = new MemoryStream();

        await image.SaveAsPngAsync(memoryStream, new PngEncoder()
        {
            BitDepth = PngBitDepth.Bit8,
            ColorType = PngColorType.RgbWithAlpha,
            CompressionLevel = PngCompressionLevel.BestCompression
        });

        return memoryStream.ToArray();
    }

    // [Authorize]
    // [HttpPost]
    // public async Task<ActionResult> Upload(IFormFile image)
    // {

    //     this._photoService.Process(new ImageInputDto
    //     {
    //         Name = image.FileName,
    //         Type = image.ContentType,
    //         Content = image.OpenReadStream()
    //     });

    //     return Ok();
    // }
}
