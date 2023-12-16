namespace Backend.Dtos;

public class CustomerDto
{
    public int Id { get; set; }
    public string CustomerCode { get; set; }
    public string CustomerName { get; set; }
    public byte[] Photo { get; set; }
}

public class CustomerForUpdateDto 
{ 
    public int Id { get; set; }
    public string CustomerCode { get; set; }
    public string CustomerName { get; set; }
    public IFormFile PhotoFile { get; set; }
}