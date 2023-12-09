using Microsoft.AspNetCore.StaticFiles;

namespace Backend.Services;
public interface IFileService
{
    Task<string> UploadFile(IFormFile formFile);
    Task<(byte[], string, string)> DownloadFile(string fileName);
}

public class FileService : IFileService
{
    public async Task<(byte[], string, string)> DownloadFile(string fileName)
    {
        var filePath = Common.GetFilePath(fileName);

        var provider = new FileExtensionContentTypeProvider();

        if (!provider.TryGetContentType(filePath, out var contentType))
        {
            contentType = "application/octet-stream";
        }
        
        var file = await File.ReadAllBytesAsync(filePath);
        
        return (file, contentType, Path.GetFileName(filePath));
    }

    public async Task<string> UploadFile(IFormFile formFile)
    {
        FileInfo fileInfo = new FileInfo(formFile.FileName);

        string fileName = formFile.FileName + "_" + DateTime.Now.Ticks.ToString() + fileInfo.Extension;

        var filePath = Common.GetFilePath(fileName);

        using (var fileStream = new FileStream(filePath, FileMode.Create))
        {
            await formFile.CopyToAsync(fileStream);
        }

        return fileName;
    }
}
