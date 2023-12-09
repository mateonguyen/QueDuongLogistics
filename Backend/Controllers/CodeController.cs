namespace Backend.Controllers;

[Authorize]
public class CodeController : BaseApiController
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public CodeController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CodeDto>>> GetCodes()
    {
        var codes = await _unitOfWork.CodeRepository.GetCodesAsync();

        return Ok(codes);
    }

    [HttpPost("create")]
    public async Task<ActionResult> CreateCode(CodeCreateDto codeCreateDto)
    {
        if (await _unitOfWork.CodeRepository.CodeExists(codeCreateDto.Name))
            return BadRequest("Tên bảng mã đã tồn tại.");

        var code = _mapper.Map<AdmCode>(codeCreateDto);

        code.Creator = User.GetUsername();

        await _unitOfWork.CodeRepository.CreateAsync(code);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Thêm mới bảng mã thất bại.");

        return Ok(code);
    }

    [HttpPut("update")]
    public async Task<ActionResult> UpdateCode(CodeUpdateDto codeUpdateDto)
    {
        if (await _unitOfWork.CodeRepository.CodeExists(codeUpdateDto.Id, codeUpdateDto.Name))
            return BadRequest("Tên bảng mã đã tồn tại.");

        var code = await _unitOfWork.CodeRepository.GetCodeByIdAsync(codeUpdateDto.Id);

        _mapper.Map(codeUpdateDto, code);

        _unitOfWork.CodeRepository.Update(code);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Sửa thông tin bảng mã thất bại.");

        // var groupToReturn = _mapper.Map<GroupListDto>(group);

        return Ok(code);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteCode(int id)
    {
        var code = await _unitOfWork.CodeRepository.GetCodeByIdAsync(id);

        _unitOfWork.CodeRepository.Delete(code);

        if (await _unitOfWork.Complete()) return NoContent();

        return BadRequest("Xóa bảng mã thất bại.");
    }

    [HttpGet("list-values-by-code/{code}")]
    public async Task<ActionResult<IEnumerable<CodeValueDto>>> GetCodeValues(string code)
    {
        var values = await _unitOfWork.CodeValueRepository.GetCodeValuesByCode(code);

        return Ok(values);
    }

    [HttpPost("create-value")]
    public async Task<ActionResult> CreateValue(CodeValueCreateDto codeValueCreateDto)
    {
        if (await _unitOfWork.CodeValueRepository.CodeValueExists(codeValueCreateDto.CodeId, codeValueCreateDto.Value))
            return BadRequest("Tên bảng mã đã tồn tại.");

        var codeValue = _mapper.Map<AdmCodeValue>(codeValueCreateDto);

        codeValue.Creator = User.GetUsername();

        await _unitOfWork.CodeValueRepository.CreateAsync(codeValue);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Thêm mới giá trị danh mục thất bại.");

        return Ok(codeValue);
    }

    [HttpPut("update-value")]
    public async Task<ActionResult> UpdateValue(CodeValueUpdateDto codeValueUpdateDto)
    {
        if (await _unitOfWork.CodeValueRepository.CodeValueExists(codeValueUpdateDto.Id, codeValueUpdateDto.CodeId, codeValueUpdateDto.Value))
            return BadRequest("Giá trị đã tồn tại.");

        var codeValue = await _unitOfWork.CodeValueRepository.GetById(codeValueUpdateDto.Id);

        _mapper.Map(codeValueUpdateDto, codeValue);

        _unitOfWork.CodeValueRepository.Update(codeValue);

        var result = await _unitOfWork.Complete();

        if (!result) return BadRequest("Sửa thông tin giá trị thất bại.");

        return Ok(codeValue);
    }

    [HttpDelete("delete-value/{id}")]
    public async Task<ActionResult> DeleteValue(int id)
    {
        var value = await _unitOfWork.CodeValueRepository.GetById(id);

        _unitOfWork.CodeValueRepository.Delete(value);

        if (await _unitOfWork.Complete()) return NoContent();

        return BadRequest("Xóa giá trị bảng mã thất bại.");
    }

}
