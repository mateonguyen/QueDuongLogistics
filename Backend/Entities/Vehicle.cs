namespace Backend.Entities;

public class Vehicle : Auditable
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column(Order = 1)]
    public int Id { get; set; }

    [Column(Order = 2)]
    [MaxLength(50)]
    public string TypeOfVehicle { get; set; }

    [Column(Order = 3)]
    [MaxLength(20)]
    public string VehicleNumber { get; set; }

    [Column(Order = 4)]
    [MaxLength(50)]
    public string CargoBoxSize { get; set; }

    [Column(Order = 5)]
    public int PayloadCapacity { get; set; }

    [Column(Order = 6)]
    [MaxLength(20)]
    public string PayloadCapacityUnit { get; set; }    
}
