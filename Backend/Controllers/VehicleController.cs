namespace Backend.Controllers;

[Authorize]
public class VehicleController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    public VehicleController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<VehicleDto>>> Get()
    {
        var list = await _unitOfWork.VehicleRepository.ToListAsync();

        return Ok(list);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<VehicleDto>> Get(int id)
    {
        var single = await _unitOfWork.VehicleRepository.SingleAsync(id);

        return Ok(single);
    }

    [HttpPost]
    public async Task<ActionResult> Create(VehicleDto vehicleDto)
    {
        if (await _unitOfWork.VehicleRepository.Exists(vehicleDto.VehicleNumber))
            return BadRequest("Phương tiện đã tồn tại");

        var vehicle = _mapper.Map<Vehicle>(vehicleDto);

        vehicle.Creator = User.GetUsername();
        vehicle.Created = DateTime.Now;

        await _unitOfWork.VehicleRepository.CreateAsync(vehicle);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Thêm mới phương tiện thất bại.");

        return Ok(await _unitOfWork.VehicleRepository.ToListAsync());
    }

    [HttpPut]
    public async Task<ActionResult> Update(VehicleDto vehicleDto)
    {
        if (await _unitOfWork.VehicleRepository.Exists(vehicleDto.Id, vehicleDto.VehicleNumber))
            return BadRequest("Phương tiện đã tồn tại");

        var vehicle = await _unitOfWork.VehicleRepository.SingleAsync(vehicleDto.Id);

        _mapper.Map(vehicleDto, vehicle);

        vehicle.Modified = DateTime.Now;
        vehicle.Modifier = User.GetUsername();

        _unitOfWork.VehicleRepository.Update(vehicle);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Sửa thông tin phương tiện thất bại.");        

        return Ok(await _unitOfWork.VehicleRepository.ToListAsync());
    }

    [HttpDelete("{id}")]    
    public async Task<ActionResult> Delete(int id)
    {
        var vehicle = await _unitOfWork.VehicleRepository.SingleAsync(id);
        
        _unitOfWork.VehicleRepository.Delete(vehicle);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Xóa phương tiện thất bại.");
        
        return Ok(await _unitOfWork.VehicleRepository.ToListAsync());
    }

    [HttpPost("import")]
    public async Task<IActionResult> Import(List<VehicleDto> vehicleDtos)
    {
        var vehicles = _mapper.Map<List<Vehicle>>(vehicleDtos);

        vehicles.ForEach(x => x.Creator = User.GetUsername());

        await _unitOfWork.VehicleRepository.CreateRangeAsync(vehicles);

         var result = await _unitOfWork.Complete();

         if (!result) return BadRequest("Nhập danh sách phương tiện thất bại.");

        return Ok(await _unitOfWork.VehicleRepository.ToListAsync());
    }
}
