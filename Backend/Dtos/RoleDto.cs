namespace Backend.Dtos
{
    public class RoleDto
    {

    }

    public class RoleCreateDto
    {
        public string Name { get; set; }

        public string Description { get; set; }
    }

    public class RoleUpdateDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}