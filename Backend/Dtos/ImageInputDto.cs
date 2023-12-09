using System.IO;

namespace Backend.Dtos;

public class ImageInputDto
{
    public string Name { get; set; }

    public string Type { get; set; }

    public Stream Content { get; set; }
}
