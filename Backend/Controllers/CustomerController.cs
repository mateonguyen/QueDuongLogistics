namespace Backend.Controllers;

[Authorize]
public class CustomerController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IPhotoService _photoService;

    public CustomerController(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
    {
        _photoService = photoService;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CustomerDto>>> GetCustomers()
    {
        var customers = await _unitOfWork.CustomerRepository.ToListAsync();

        return Ok(customers);
    }

    [HttpGet("id")]
    public async Task<ActionResult<CustomerDto>> GetCustomer(int id)
    {
        var customer = await _unitOfWork.CustomerRepository.SingleAsync(id);

        return Ok(customer);
    }

    [HttpPost]
    public async Task<ActionResult> Create([FromForm]CustomerForUpdateDto customerDto)
    {
        // if (await _unitOfWork.CustomerRepository.CodeExists(customerDto.CustomerCode))
        //     return StatusCode(StatusCodes.Status302Found);
        if (await _unitOfWork.CustomerRepository.Exists(customerDto.CustomerCode))
            return BadRequest("Mã khách hàng đã tồn tại");

        var customer = _mapper.Map<Customer>(customerDto);

        customer.Creator = User.GetUsername();
        customer.Created = DateTime.Now;
        customer.CustomerCode = customerDto.CustomerCode.ToUpper();

        if (customerDto.PhotoFile != null) {
            var file = customerDto.PhotoFile;          

            var image = new ImageInputDto()
            {
                Name = file.FileName,
                Type = file.ContentType,
                Content = file.OpenReadStream()
            };     

            customer.Photo = image.Content != null ? await _photoService.Process(image, 128) : null;            
        }        

        await _unitOfWork.CustomerRepository.CreateAsync(customer);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Thêm mới khách hàng thất bại.");

        return Ok(await _unitOfWork.CustomerRepository.ToListAsync());
    }

    [HttpPut]
    public async Task<ActionResult> Update([FromForm]CustomerForUpdateDto customerDto)
    {
        if (await _unitOfWork.CustomerRepository.Exists(customerDto.Id, customerDto.CustomerCode))
            return BadRequest("Mã khách hàng đã tồn tại");

        var customer = await _unitOfWork.CustomerRepository.SingleAsync(customerDto.Id);

        _mapper.Map(customerDto, customer);

        customer.CustomerCode = customerDto.CustomerCode.ToUpper();
        customer.Modified = DateTime.Now;
        customer.Modifier = User.GetUsername();

        if (customerDto.PhotoFile != null)
        {
            var file = customerDto.PhotoFile;

            var image = new ImageInputDto
            {
                Name = file.FileName,
                Type = file.ContentType,
                Content = file.OpenReadStream()
            };

            customer.Photo = await _photoService.Process(image, 128);
        }
        
        _unitOfWork.CustomerRepository.Update(customer);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Sửa thông tin khách hàng thất bại.");        

        return Ok(await _unitOfWork.CustomerRepository.ToListAsync());
    }

    [HttpDelete("{id}")]    
    public async Task<ActionResult> Delete(int id)
    {
        var customer = await _unitOfWork.CustomerRepository.SingleAsync(id);
        
        _unitOfWork.CustomerRepository.Delete(customer);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Xóa khách hàng thất bại.");
        
        return Ok(await _unitOfWork.CustomerRepository.ToListAsync());
    }

    [HttpPost("import")]
    public async Task<IActionResult> Import(List<CustomerDto> customersDto)
    {
        var customers = _mapper.Map<List<Customer>>(customersDto);

        customers.ForEach(x => x.Creator = User.GetUsername());

        await _unitOfWork.CustomerRepository.CreateRangeAsync(customers);

         var result = await _unitOfWork.Complete();

         if (!result) return BadRequest("Nhập danh sách khách hàng thất bại.");

        return Ok(await _unitOfWork.CustomerRepository.ToListAsync());
    }
}
