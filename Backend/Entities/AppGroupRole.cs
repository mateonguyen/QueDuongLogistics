namespace Backend.Entities;

public class AppGroupRole
{
    public int GroupId { get; set; }

    public int RoleId { get; set; }

    public AppGroup Group { get; set; }

    public AppRole Role { get; set; }
}