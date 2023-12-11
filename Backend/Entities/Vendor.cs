namespace Backend.Entities;

public class Vendor : Auditable
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column(Order = 1)]
    public int Id { get; set; }

    [Column(Order = 2)]
    [MaxLength(10)]
    public string VendorCode { get; set; }

    [Column(Order = 3)]
    [MaxLength(150)]
    public string VendorName { get; set; }
}
