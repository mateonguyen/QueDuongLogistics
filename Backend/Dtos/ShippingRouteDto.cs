namespace Backend.Dtos;

public class ShippingRouteDto
{
    public int Id { get; set; }
    public string RouteCode { get; set; }
    public int OriginId { get; set; }
    public int DestinationId { get; set; }
    // public LocationDto Origin { get; set; }
    // public LocationDto Destination { get; set; }
}

public class ShippingRouteForCreationDto
{
    public int Id { get; set; }
    public string RouteCode { get; set; }
    public int OriginId { get; set; }
    public int DestinationId { get; set; }
}