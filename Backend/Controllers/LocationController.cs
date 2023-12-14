namespace Backend.Controllers;

[Authorize]
public class LocationController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public LocationController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<LocationDto>>> GetLocations()
    {
        var locations = await _unitOfWork.LocationRepository.ToListAsync();

        return Ok(locations);
    }

    [HttpGet("id")]
    public async Task<ActionResult<LocationDto>> GetCustomer(int id)
    {
        var location = await _unitOfWork.LocationRepository.SingleAsync(id);

        return Ok(location);
    }

    [HttpPost]
    public async Task<ActionResult> Create(LocationDto locationDto)
    {
        // if (await _unitOfWork.CustomerRepository.CodeExists(customerDto.CustomerCode))
        //     return StatusCode(StatusCodes.Status302Found);
        if (await _unitOfWork.LocationRepository.Exists(locationDto.LocationCode))
            return BadRequest("Mã địa điểm đã tồn tại");

        var location = _mapper.Map<Location>(locationDto);

        location.Creator = User.GetUsername();
        location.Created = DateTime.Now;
        location.LocationCode = locationDto.LocationCode.ToUpper();

        await _unitOfWork.LocationRepository.CreateAsync(location);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Thêm mới địa điểm thất bại.");

        return Ok(await _unitOfWork.LocationRepository.ToListAsync());
    }

    [HttpPut]
    public async Task<ActionResult> Update(LocationDto locationDto)
    {
        if (await _unitOfWork.LocationRepository.Exists(locationDto.Id, locationDto.LocationCode))
            return BadRequest("Mã địa điểm đã tồn tại");

        var location = await _unitOfWork.LocationRepository.SingleAsync(locationDto.Id);

        _mapper.Map(locationDto, location);

        location.LocationCode = locationDto.LocationCode.ToUpper();
        location.Modified = DateTime.Now;
        location.Modifier = User.GetUsername();

        _unitOfWork.LocationRepository.Update(location);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Sửa thông tin địa điểm thất bại.");

        return Ok(await _unitOfWork.LocationRepository.ToListAsync());
    }

    [HttpDelete("{id}")]    
    public async Task<ActionResult> Delete(int id)
    {
        var location = await _unitOfWork.LocationRepository.SingleAsync(id);
        
        _unitOfWork.LocationRepository.Delete(location);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Xóa địa điểm thất bại.");
        
        return Ok(await _unitOfWork.LocationRepository.ToListAsync());
    }
}
