namespace Backend.Entities
{
    public interface IAuditable
    {
        DateTime Created { get; set; }

        string Creator { get; set; }

        DateTime? Modified { get; set; }

        string Modifier { get; set; }
    }
}