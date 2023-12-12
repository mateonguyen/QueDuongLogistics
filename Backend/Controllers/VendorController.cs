namespace Backend.Controllers;

    [Authorize]
    public class VendorController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public VendorController(IUnitOfWork unitOfWork, IMapper mapper)
        {
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
        public async Task<ActionResult<IEnumerable<VendorDto>>> Create(VendorDto vendorDto)
        {
            if (await _unitOfWork.VehicleRepository.Exists(vendorDto.VendorCode))
                return BadRequest("Nhà cung cấp đã tồn tại");

            var vendor = _mapper.Map<Vendor>(vendorDto);

            vendor.Creator = User.GetUsername();
            vendor.Created = DateTime.Now;

            await _unitOfWork.VendorRepository.CreateAsync(vendor);

            var result = await _unitOfWork.Complete();

            if (!result) return BadRequest("Thêm mới Nhà cung cấp thất bại.");

            return Ok(await _unitOfWork.VendorRepository.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<IEnumerable<VendorDto>>> Update(VendorDto vendorDto)
        {
            if (await _unitOfWork.VendorRepository.Exists(vendorDto.Id, vendorDto.VendorCode))
                return BadRequest("Nhà cung cấp đã tồn tại");

            var vendor = await _unitOfWork.VendorRepository.SingleAsync(vendorDto.Id);

            _mapper.Map(vendorDto, vendor);

            vendor.Modified = DateTime.Now;
            vendor.Modifier = User.GetUsername();

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
    }
