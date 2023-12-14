namespace Backend.Entities;

public class ShippingRoute : Auditable
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column(Order = 1)]
    public int Id { get; set; }

    [MaxLength(20)]
    [Column(Order = 2)]
    public string RouteCode { get; set; }

    [MaxLength(100)]
    [Column(Order = 3)]
    public string Origin { get; set; }

    [MaxLength(100)]
    [Column(Order = 4)]
    public string Destination { get; set; }
}
