namespace Backend.Controllers;

[Authorize]
public class VendorController : BaseApiController
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IPhotoService _photoService;

    public VendorController(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
    {
        _photoService = photoService;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<VendorDto>>> Get()
    {
        var list = await _unitOfWork.VendorRepository.ToListAsync();

        return Ok(list);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<VendorDto>> Get(int id)
    {
        var single = await _unitOfWork.VendorRepository.SingleAsync(id);

        return Ok(single);
    }

    [HttpPost]
    public async Task<ActionResult<IEnumerable<VendorDto>>> Create([FromForm]VendorForUpdateDto vendorDto)
    {
        if (await _unitOfWork.VehicleRepository.Exists(vendorDto.VendorCode))
            return BadRequest("Nhà cung cấp đã tồn tại");

        var vendor = _mapper.Map<Vendor>(vendorDto);

        vendor.Creator = User.GetUsername();
        vendor.Created = DateTime.Now;

        if (vendorDto.PhotoFile != null)
        {
            var file = vendorDto.PhotoFile;
            var image = new ImageInputDto()
            {            
                Name = file.FileName,
                Type = file.ContentType,
                Content = file.OpenReadStream()            
            };

            vendor.Photo = image.Content != null ? await _photoService.Process(image, 128) : null;
        }
        
        await _unitOfWork.VendorRepository.CreateAsync(vendor);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Thêm mới Nhà cung cấp thất bại.");

        return Ok(await _unitOfWork.VendorRepository.ToListAsync());
    }

    [HttpPut]
    public async Task<ActionResult<IEnumerable<VendorDto>>> Update([FromForm]VendorForUpdateDto vendorDto)
    {
        if (await _unitOfWork.VendorRepository.Exists(vendorDto.Id, vendorDto.VendorCode))
            return BadRequest("Nhà cung cấp đã tồn tại");

        var vendor = await _unitOfWork.VendorRepository.SingleAsync(vendorDto.Id);

        _mapper.Map(vendorDto, vendor);

        vendor.Modified = DateTime.Now;
        vendor.Modifier = User.GetUsername();

        if (vendorDto.PhotoFile != null)
        {
            var file = vendorDto.PhotoFile;

            var image = new ImageInputDto
            {
                Name = file.FileName,
                Type = file.ContentType,
                Content = file.OpenReadStream()
            };

            var photo = await _photoService.Process(image, 128);

            vendor.Photo = photo;
        }
        
        _unitOfWork.VendorRepository.Update(vendor);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Sửa thông tin Nhà cung cấp thất bại.");        

        return Ok(await _unitOfWork.VendorRepository.ToListAsync());
    }

    [HttpDelete("{id}")]    
    public async Task<ActionResult<IEnumerable<VendorDto>>> Delete(int id)
    {
        var vendor = await _unitOfWork.VendorRepository.SingleAsync(id);
        
        _unitOfWork.VendorRepository.Delete(vendor);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Xóa Nhà cung cấp thất bại.");
        
        return Ok(await _unitOfWork.VendorRepository.ToListAsync());
    }

    [HttpPost("import")]
    public async Task<IActionResult> Import(List<VendorDto> vendorDtos)
    {
        var vendors = _mapper.Map<List<Vendor>>(vendorDtos);

        vendors.ForEach(x => x.Creator = User.GetUsername());

        await _unitOfWork.VendorRepository.CreateRangeAsync(vendors);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Nhập danh sách đơn vị vẩn tải thất bại.");

        return Ok(await _unitOfWork.VendorRepository.ToListAsync());
    }
}
