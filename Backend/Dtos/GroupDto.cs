using System;

namespace Backend.Dtos
{
    public class GroupListDto
    {
        public int Id { get; set; }

        public string GroupName { get; set; }

        public string Description { get; set; }

        public DateTime Created { get; set; }

        public List<string> Roles { get; set; }
    }

    public class GroupCreateDto
    {
        public string GroupName { get; set; }

        public string Description { get; set; }
    }

    public class GroupUpdateDto
    {
        public int Id { get; set; }

        public string GroupName { get; set; }

        public string Description { get; set; }

        public DateTime Modified { get; set; } = DateTime.Now;
    }
}