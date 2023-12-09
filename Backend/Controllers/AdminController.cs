using System.Text.Json;
using System.IO;

namespace Backend.Controllers;
public class AdminController : BaseApiController
{
    private readonly UserManager<AppUser> _userManager;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IFileService _fileService;

    public AdminController(UserManager<AppUser> userManager, IUnitOfWork unitOfWork, IMapper mapper, IFileService fileService)
    {
        _userManager = userManager;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _fileService = fileService;
    }

    [HttpGet("")]
    public async Task<ActionResult> GetUsersWithRoles()
    {
        var users = await _userManager.Users
            .Include(x => x.UserRoles)
            .ThenInclude(x => x.Role)
            .OrderBy(x => x.UserName)
            .Select(x => new
            {
                x.Id,
                x.UserName,
                Roles = x.UserRoles.Select(r => r.Role.Name).ToList()
            })
            .ToListAsync();

        return Ok(users);
    }

    [HttpGet("audit-home")]
    public async Task<ActionResult<IEnumerable<AuditForHomeDto>>> GetAuditForHome()
    {
        var auditList = await _unitOfWork.AuditRepository.GetAuditsForHomeAsync();

        return Ok(auditList);
    }

    [HttpPost("update-counter")]
    public async Task<ActionResult> UpdateCounter([FromQuery] string type)
    {
        var json = await System.IO.File.ReadAllTextAsync("Data/VisitorCounter.json");

        var obj = JsonSerializer.Deserialize<VisitorCounterDto>(json);

        obj.PageViews++;

        if (type == "visit-pageview")
        {
            obj.Visits++;
        }

        var newJson = JsonSerializer.Serialize(obj);

        await System.IO.File.WriteAllTextAsync("Data/VisitorCounter.json", newJson);

        return Ok(obj);
    }

    // [HttpGet("visitor-counter")]
    // public async Task<ActionResult<VisitorCounterDto>>GetCounter()
    // {
    //     var json = await System.IO.File.ReadAllTextAsync("Data/VisitorCounter.json");

    //     var obj = JsonSerializer.Deserialize<VisitorCounterDto>(json);

    //     return Ok(obj);
    // }

    [HttpPost("upload-file")]
    public async Task<IActionResult> UploadFile(IFormFile iFormFile)
    {
        var result = await _fileService.UploadFile(iFormFile);
        return Ok(result);
    }
    
    [HttpGet("download-file")]
    public async Task<IActionResult> DownloadFile(string fileName)
    {
        var result = await _fileService.DownloadFile(fileName);
        return File(result.Item1, result.Item2, result.Item3);
    }
}
