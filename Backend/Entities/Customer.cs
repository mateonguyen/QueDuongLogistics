namespace Backend.Entities;

public class Customer : Auditable
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column(Order = 1)]
    public int Id { get; set; }

    [Column(Order = 2)]
    [MaxLength(10)]
    public string CustomerCode { get; set; }

    [Column(Order = 3)]
    [MaxLength(150)]
    public string CustomerName { get; set; }

    public byte[] Photo { get; set; }
}
