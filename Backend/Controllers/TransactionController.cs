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
    public async Task<ActionResult<IEnumerable<TransactionDto>>> Get()
    {
        var list = await _unitOfWork.TransactionRepository.ToListAsync();

        return Ok(list);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TransactionDto>> Get(int id)
    {
        var transaction = await _unitOfWork.TransactionRepository.SingleAsync(id);

        return Ok(transaction);
    }

    [HttpPost]
    public async Task<ActionResult> Create(TransactionDto transactionDto)
    {
        var transaction = _mapper.Map<Transaction>(transactionDto);

        transaction.Creator = User.GetUsername();
        transaction.Created = DateTime.Now;

        await _unitOfWork.TransactionRepository.CreateAsync(transaction);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Thêm mới lệnh điều vận thất bại.");

        return Ok(await _unitOfWork.TransactionRepository.ToListAsync());
    }

    [HttpPut]
    public async Task<ActionResult> Update(TransactionDto transactionDto)
    {
        var transaction = await _unitOfWork.TransactionRepository.SingleAsync(transactionDto.Id);

        _mapper.Map(transactionDto, transaction);

        transaction.Modified = DateTime.Now;
        transaction.Modifier = User.GetUsername();

        _unitOfWork.TransactionRepository.Update(transaction);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Sửa thông tin lệnh điều vận thất bại.");        

        return Ok(await _unitOfWork.TransactionRepository.ToListAsync());
    }

    [HttpDelete("{id}")]    
    public async Task<ActionResult> Delete(int id)
    {
        var transaction = await _unitOfWork.TransactionRepository.SingleAsync(id);
        
        _unitOfWork.TransactionRepository.Delete(transaction);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Xóa lệnh thất bại thất bại.");
        
        return Ok(await _unitOfWork.TransactionRepository.ToListAsync());
    }
}
