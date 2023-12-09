namespace Backend.Helpers
{
    public static class Common
    {
        public static string GetCurrentDirectory()
        {
            var result = Directory.GetCurrentDirectory();
            return result;
        }

        public static string GetStaticContentDirectory()
        {
            var restult = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\StaticContent\\");
            if (!Directory.Exists(restult))
            {
                Directory.CreateDirectory(restult);
            }
            return restult;
        }

        public static string GetFilePath(string fileName)
        {
            var staticContentDirectory = GetStaticContentDirectory();
            var result = Path.Combine(staticContentDirectory, fileName);
            return result;
        }
    }
}