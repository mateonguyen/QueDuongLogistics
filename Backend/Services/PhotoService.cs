using SixLabors.ImageSharp;

namespace Backend.Services;

public interface IPhotoService
{
    Task Process(ImageInputDto image);
}

public class PhotoService : IPhotoService
{
    private const int AvatarSize = 96;
    public async Task Process(ImageInputDto image)
    {
        using var imageResult = await Image.LoadAsync(image.Content);

        var width = imageResult.Width;
        var height = imageResult.Height;        
    }
}
