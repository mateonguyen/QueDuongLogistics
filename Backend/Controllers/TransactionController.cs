using Backend.Helpers.Params;

namespace Backend.Controllers;

[Authorize]
public class TransactionController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    public TransactionController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public ActionResult<IEnumerable<TransactionDto>> Get([FromQuery]TransactionParams transactionParams)
    {
        var result = _unitOfWork.TransactionRepository.ToList(transactionParams);

        Response.AddPaginationHeader(result.CurrentPage, result.PageSize, result.TotalCount, result.TotalPages);

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TransactionDto>> Get(int id)
    {
        var transaction = await _unitOfWork.TransactionRepository.SingleAsync(id);

        return Ok(transaction);
    }

    [HttpPost]
    public async Task<ActionResult> Create(TransactionForCreationDto transactionDto)
    {
        var transaction = _mapper.Map<Transaction>(transactionDto);
        transaction.TransactionNo = await _unitOfWork.TransactionRepository.GenerateTransactioNo(transaction.TransactionDate, transactionDto.Customer.CustomerCode);
        transaction.Creator = User.GetUsername();
        transaction.Created = DateTime.Now;

        await _unitOfWork.TransactionRepository.CreateAsync(transaction);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Thêm mới lệnh điều vận thất bại.");

        return Ok(transaction);
    }

    [HttpPut]
    public async Task<ActionResult> Update(TransactionForCreationDto transactionDto)
    {
        var transaction = await _unitOfWork.TransactionRepository.SingleAsync(transactionDto.Id);

        _mapper.Map(transactionDto, transaction);

        transaction.Modified = DateTime.Now;
        transaction.Modifier = User.GetUsername();

        _unitOfWork.TransactionRepository.Update(transaction);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Sửa thông tin lệnh điều vận thất bại.");        

        return Ok(transaction);
    }

    [HttpDelete("{id}")]    
    public async Task<ActionResult> Delete(int id)
    {
        var transaction = await _unitOfWork.TransactionRepository.SingleAsync(id);
        
        _unitOfWork.TransactionRepository.Delete(transaction);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Xóa lệnh thất bại thất bại.");
        
        return Ok();
    }
}
