using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Processing;

namespace Backend.Services;

public interface IPhotoService
{
    Task<byte[]> Process(ImageInputDto image, int resizeWidth);
}

public class PhotoService : IPhotoService
{
    private const int AvatarSize = 96;
    public async Task<byte[]> Process(ImageInputDto image, int resizeWidth)
    {
        using var imageResult = await Image.LoadAsync(image.Content);

        // var original = await SaveImage(imageResult, imageResult.Width);

        var width = imageResult.Width;
        var height = imageResult.Height;        

        if (width > resizeWidth)
        {
            height = (int)((double)resizeWidth / width * height);
            width = resizeWidth;
        }

        imageResult.Mutate(i => i.Resize(new Size(width, height)));

        imageResult.Metadata.ExifProfile = null;

        var memoryStream = new MemoryStream();

        await imageResult.SaveAsJpegAsync(memoryStream);

        return memoryStream.ToArray();
    }

    public async Task<byte[]> SaveImage(Image image, int resizeWidth)
    {
        var width = image.Width;
        var height = image.Height;

        if (width > resizeWidth)
        {
            height = (int)((double)resizeWidth / width * height);
            width = resizeWidth;
        }

        image.Mutate(i => i.Resize(new Size(width, height)));

        image.Metadata.ExifProfile = null;

        var memoryStream = new MemoryStream();

        await image.SaveAsJpegAsync(memoryStream, new JpegEncoder
        {
            Quality = 75
        });

        return memoryStream.ToArray();
    }
}
