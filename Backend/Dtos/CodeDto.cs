namespace Backend.Dtos;

public class CodeDto
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }
}

public class CodeCreateDto
{
    public string Name { get; set; }

    public string Description { get; set; }
}

public class CodeUpdateDto
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public DateTime Modified { get; set; } = DateTime.Now;
}

public class CodeValueDto
{
    public int Id { get; set; }

    public int CodeId { get; set; }

    public string Value { get; set; }

    public string Description { get; set; }

    public DateTime Created { get; set; }

    public string Creator { get; set; }

    public DateTime? Modified { get; set; }

    public string Modifier { get; set; }
}

public class CodeValueCreateDto
{
    public int CodeId { get; set; }

    public string Value { get; set; }

    public string Description { get; set; }
}

public class CodeValueUpdateDto
{
    public int Id { get; set; }

    public int CodeId { get; set; }

    public string Value { get; set; }

    public string Description { get; set; }

    public DateTime Modified { get; set; } = DateTime.Now;
}