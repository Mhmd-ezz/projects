using System;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Hosting;
using System.Web.Http;
using Media.Helpers.FileSystem;
using Media.Helpers.FlowJS;
using Media.Infrastructure;

namespace Media.Controllers
{
    [Authorize] //(Roles = "Admin,ArchiveAdmin,ArchiveEditor")]
    [RoutePrefix("files")]
    public class FilesController : ApiController
    {
        private readonly AzureFlow _flow;
        private readonly FileSystem _fileSystem;
        private MediaFilesRepository _mediaFilesRepository;

        public FilesController()
        {
            //var destination = AppSetting.Instance.TempUploadsFolder;
            //var destination = ConfigurationManager.AppSettings["UploadTemp"];
            var storageConnection = ConfigurationManager.AppSettings["MedciliaStorage"];
            var destination = HostingEnvironment.MapPath("~/App_Data").Replace("\\", "/");
            _fileSystem = new FileSystem
            {
                GetFilePathFunc = filePath => $"{destination}/{filePath}"
            };

            _flow = new AzureFlow(_fileSystem, storageConnection);
            _mediaFilesRepository = new MediaFilesRepository();

        }

        [Route("{*filePath}")]
        public async Task<HttpResponseMessage> GetFile(string filePath)
        {
            if (string.IsNullOrWhiteSpace(filePath))
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Invalid path");
            }

            if (!await _fileSystem.ExistsAsync(filePath))
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "File not found");
            }

            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StreamContent(await _fileSystem.OpenReadAsync(filePath));
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = filePath.Substring(filePath.LastIndexOf('/') + 1)
            };

            return response;
        }

        [Route("{folderName}")]
        public async Task<HttpResponseMessage> Get(string folderName)
        {
            var tenantClaim = ((ClaimsPrincipal)User).Claims.FirstOrDefault(x => x.Type == "tenantId");
            var tenantId = tenantClaim == null ? "" : tenantClaim.Value;

            var context = CreateContext(folderName, tenantId);

            return await _flow.HandleRequest(context);
        }

        [Route("{folderName}")]
        public async Task<HttpResponseMessage> Post(string folderName)
        {
            var tenantClaim = ((ClaimsPrincipal)User).Claims.FirstOrDefault(x => x.Type == "tenantId");
            var tenantId = tenantClaim == null ? "" : tenantClaim.Value;

            var context = CreateContext(folderName, tenantId);

            return await _flow.HandleRequest(context);
        }

        private FlowRequestContext CreateContext(string folderName, string tenantId)
        {
            return new FlowRequestContext(Request)
            {
                GetChunkFileNameFunc = parameters => string.Format(
                    "{1}_{0}.chunk",
                    parameters.FlowIdentifier,
                    parameters.FlowChunkNumber.Value.ToString().PadLeft(8, '0')),
                GetChunkPathFunc = parameters => string.Format("{0}/chunks/{1}", folderName, parameters.FlowIdentifier),
                GetFileNameFunc = parameters => parameters.FlowFilename,
                GetFilePathFunc = parameters => folderName,
                GetTempFileNameFunc = filePath => string.Format("file_{0}.tmp", Guid.NewGuid()),
                GetTempPathFunc = () => string.Format("{0}/temp", folderName),
                MaxFileSize = ulong.MaxValue,
                TenantId = tenantId
            };
        }
    }
}