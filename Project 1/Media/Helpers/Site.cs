using System.Configuration;

namespace Media.Helpers
{
    public static class Site
    {
        public static string MediaServerUrl
        {
            get { return ConfigurationManager.AppSettings["MediaServerUrl"]; }
        }

        public static string OriginalVideo = "/media/original";
        public static string OriginalXml = "/media/xml";
        public static string Thumbnails = "/media/thumbnails";
        public static string LowRes = "/media/low";
        public static string VideoStripes = "/media/stripes";
        public static string LowResStreaming = "/api/video";

        public static string BuildUrl(string path, string file)
        {
            if (string.IsNullOrEmpty(file))
                return string.Empty;
            var corrected = file.Replace(@"\", "/");
            var host = MediaServerUrl;
            if (host.EndsWith("/"))
                host = host.TrimEnd('/');
            if (!corrected.StartsWith("/"))
                corrected = "/" + corrected;
            return host + path + corrected;
        }
    }
}