namespace Backend.Entities;

public class Location : Auditable
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column(Order = 1)]
    public int Id { get; set; }

    [MaxLength(20)]
    [Column(Order = 2)]
    public string LocationCode { get; set; }

    [MaxLength(10)]
    [Column(Order = 3)]
    public string LocationName { get; set; }

    public virtual ICollection<ShippingRoute> Origins { get; set; }
    public virtual ICollection<ShippingRoute> Destinations { get; set; }
}
