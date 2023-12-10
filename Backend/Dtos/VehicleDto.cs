namespace Backend.Dtos;

public class VehicleDto
{
    public int Id { get; set; }
    public string TypeOfVehicle { get; set; }
    public string VehicleNumber { get; set; }
    public string CargoBoxSize { get; set; }
    public int PayloadCapacity { get; set; }
    public string PayloadCapacityUnit { get; set; }
}
