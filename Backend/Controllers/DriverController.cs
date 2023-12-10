namespace Backend.Controllers;

[Authorize]
public class DriverController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    public DriverController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<DriverDto>>> GetDrivers()
    {
        var drivers = await _unitOfWork.DriverRepository.ToListAsync();

        return Ok(drivers);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DriverDto>> GetDriver(int id)
    {
        var driver = await _unitOfWork.DriverRepository.SingleAsync(id);

        return Ok(driver);
    }

    [HttpPost]
    public async Task<ActionResult> Create(DriverDto driverDto)
    {
        var driver = _mapper.Map<Driver>(driverDto);

        driver.Creator = User.GetUsername();
        driver.Created = DateTime.Now;

        await _unitOfWork.DriverRepository.CreateAsync(driver);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Thêm mới lái xe thất bại.");

        return Ok(driver);
    }

    [HttpPut]
    public async Task<ActionResult> Update(DriverDto driverDto)
    {
        var driver = await _unitOfWork.DriverRepository.SingleAsync(driverDto.Id);

        _mapper.Map(driverDto, driver);

        driver.Modified = DateTime.Now;
        driver.Modifier = User.GetUsername();

        _unitOfWork.DriverRepository.Update(driver);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Sửa thông tin lái xe thất bại.");        

        return Ok(driver);
    }

    [HttpDelete("{id}")]    
    public async Task<ActionResult> Delete(int id)
    {
        var driver = await _unitOfWork.DriverRepository.SingleAsync(id);
        
        _unitOfWork.DriverRepository.Delete(driver);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Xóa lái xe thất bại.");
        
        return NoContent();
    }
}
