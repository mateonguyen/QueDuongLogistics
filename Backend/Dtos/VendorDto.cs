namespace Backend.Dtos;

public class VendorDto
{
    public int Id { get; set; }
    public string VendorCode { get; set; }
    public string VendorName { get; set; }
    public byte[] Photo { get; set; }
}

public class VendorForUpdateDto 
{ 
    public int Id { get; set; }
    public string VendorCode { get; set; }
    public string VendorName { get; set; }
    public IFormFile PhotoFile { get; set; }
}
