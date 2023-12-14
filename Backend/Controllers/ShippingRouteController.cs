namespace Backend.Controllers
{
    public class ShippingRouteController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ShippingRouteController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShippingRouteDto>>> Get()
        {
            var routes = await _unitOfWork.ShippingRouteRepository.ToListAsync();

            return Ok(routes);
        }

        [HttpGet("id")]
        public async Task<ActionResult<ShippingRouteDto>> Get(int id)
        {
            var route = await _unitOfWork.ShippingRouteRepository.SingleAsync(id);

            return Ok(route);
        }

        [HttpPost]
        public async Task<ActionResult> Create(ShippingRouteDto shippingRouteDto)
        {
            // if (await _unitOfWork.CustomerRepository.CodeExists(customerDto.CustomerCode))
            //     return StatusCode(StatusCodes.Status302Found);
            if (await _unitOfWork.ShippingRouteRepository.Exists(shippingRouteDto.RouteCode))
                return BadRequest("Mã địa điểm đã tồn tại");

            var route = _mapper.Map<ShippingRoute>(shippingRouteDto);

            route.Creator = User.GetUsername();
            route.Created = DateTime.Now;
            route.RouteCode = shippingRouteDto.RouteCode.ToUpper();

            await _unitOfWork.ShippingRouteRepository.CreateAsync(route);

            var result = await _unitOfWork.Complete();

            if (!result) return BadRequest("Thêm mới tuyến đường thất bại.");

            return Ok(await _unitOfWork.ShippingRouteRepository.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult> Update(ShippingRouteDto shippingRouteDto)
        {
            if (await _unitOfWork.ShippingRouteRepository.Exists(shippingRouteDto.Id, shippingRouteDto.RouteCode))
                return BadRequest("Mã tuyến đường đã tồn tại");

            var route = await _unitOfWork.ShippingRouteRepository.SingleAsync(shippingRouteDto.Id);

            _mapper.Map(shippingRouteDto, route);

            route.RouteCode = shippingRouteDto.RouteCode.ToUpper();
            route.Modified = DateTime.Now;
            route.Modifier = User.GetUsername();

            _unitOfWork.ShippingRouteRepository.Update(route);

            var result = await _unitOfWork.Complete();

            if (!result) return BadRequest("Sửa thông tin tuyến thất bại.");

            return Ok(await _unitOfWork.ShippingRouteRepository.ToListAsync());
        }

        [HttpDelete("{id}")]    
        public async Task<ActionResult> Delete(int id)
        {
            var route = await _unitOfWork.ShippingRouteRepository.SingleAsync(id);
            
            _unitOfWork.ShippingRouteRepository.Delete(route);

            var result = await _unitOfWork.Complete();

            if (!result) return BadRequest("Xóa tuyến đường thất bại.");
            
            return Ok(await _unitOfWork.ShippingRouteRepository.ToListAsync());
        }
    }
}