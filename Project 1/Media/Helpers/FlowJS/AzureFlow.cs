using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace Media.Helpers.FlowJS
{
    public class AzureFlow
    {
        private readonly IFileSystem _fileSystem;
        private readonly FlowRequestReader _requestReader;
        private readonly string _azureConnectionString;
        private static readonly string[] _photosExtensions = { ".jpg", ".jpeg", ".bmp", ".gif", ".png" }; //  etc

        public AzureFlow(IFileSystem fileSystem, string azureConnectionString)
        {
            _fileSystem = fileSystem;
            _azureConnectionString = azureConnectionString;
            _requestReader = new FlowRequestReader();
        }

        public async Task<HttpResponseMessage> HandleRequest(FlowRequestContext context)
        {
            if (context.HttpRequest.Method == HttpMethod.Get)
            {
                return await HandleGetRequest(context);
            }

            if (context.HttpRequest.Method != HttpMethod.Post)
            {
                return context.HttpRequest.CreateErrorResponse(
                    HttpStatusCode.BadRequest,
                    "Only GET and POST requests supported");
            }

            return await HandlePostRequest(context);
        }

        private async Task<HttpResponseMessage> HandleGetRequest(FlowRequestContext context)
        {
            FlowRequest request = await _requestReader.ReadGetAsync(context.HttpRequest);

            if (!IsValidRequest(context, request))
            {
                return context.HttpRequest.CreateErrorResponse(
                    HttpStatusCode.BadRequest,
                    "Invalid flow GET request");
            }

            string filePath = GetChunkFilePath(context, request);

            if (!await _fileSystem.ExistsAsync(filePath))
            {
                return context.HttpRequest.CreateErrorResponse(
                    HttpStatusCode.NoContent,
                    "File not found");
            }

            return context.HttpRequest.CreateResponse(HttpStatusCode.OK);
        }

        private static string GetChunkFilePath(FlowRequestContext context, FlowRequest request)
        {
            return string.Concat(
                context.GetChunkPathFunc(request),
                "/",
                context.GetChunkFileName(request));
        }

        private async Task<HttpResponseMessage> HandlePostRequest(FlowRequestContext context)
        {
            // read request 
            FlowRequest request = await _requestReader.ReadPostAsync(
                context,
                _fileSystem);

            // is valid request?
            if (!IsValidRequest(context, request))
            {
                await _fileSystem.DeleteAsync(request.TemporaryFile.Item1);
                return context.HttpRequest.CreateErrorResponse(
                    HttpStatusCode.BadRequest,
                    "Invalid flow POST request");
            }

            // upload temporary to chunks
            var chunkFilePath = GetChunkFilePath(context, request);
            using (Stream chunkStream = await _fileSystem.OpenWriteAsync(chunkFilePath))
            {
                using (Stream tempStream = await _fileSystem.OpenReadAsync(request.TemporaryFile.Item1))
                {
                    await tempStream.CopyToAsync(chunkStream);
                }
            }

            // delete temporary
            await _fileSystem.DeleteAsync(request.TemporaryFile.Item1);

            // if last chunk combine and move to files
            if (request.IsLastChunk)
            {
                await CombineAsync(context, request);
            }

            return context.HttpRequest.CreateResponse(HttpStatusCode.OK);
        }

        private async Task CombineAsync(FlowRequestContext context, FlowRequest request)
        {
            var tenantId = context.TenantId;
            var fileName = context.GetFileName(request);
            var filePath = string.Concat(
                context.GetFilePathFunc(request),
                "/",
                fileName);

            var chunkPath = context.GetChunkPathFunc(request);
            var chunkFilePaths = await _fileSystem.ListDirectoryAsync(chunkPath);

            //using (var fileStream = await _fileSystem.OpenWriteAsync(filePath))
            //{
            //    foreach (var file in chunkFilePaths)
            //    {
            //        using (var sourceStream = await _fileSystem.OpenReadAsync(file))
            //        {
            //            await sourceStream.CopyToAsync(fileStream);
            //        }
            //    }
            //    await fileStream.FlushAsync();
            //}
            using (var memoryStream = new MemoryStream())
            {
                foreach (var file in chunkFilePaths)
                {
                    using (var sourceStream = await _fileSystem.OpenReadAsync(file))
                    {
                        await sourceStream.CopyToAsync(memoryStream);
                    }
                }
                memoryStream.Seek(0, SeekOrigin.Begin);
                await UploadToBlob(fileName.ToLower(), tenantId, null, memoryStream);
            }

            await _fileSystem.DeleteDirectoryAsync(chunkPath);
            await SaveToDatabase(fileName, filePath, tenantId, request);

        }

        private async Task SaveToDatabase(string fileName, string filePath, string tenantId, FlowRequest request)
        {
            var mediaFile = new Infrastructure.MediaFile();
            mediaFile.Id = request.Id;
            mediaFile.TenantId = new DocumentRef("Tenants", tenantId);
            mediaFile.Name = fileName;
            mediaFile.Path = filePath;
            mediaFile.PatientId = string.IsNullOrEmpty(request.PatientId)? null : request.PatientId;
            mediaFile.PatientName = request.PatientName;
            mediaFile.Speciality = string.IsNullOrEmpty(request.Speciality) ? null : request.Speciality; 
            mediaFile.ConditionId = string.IsNullOrEmpty(request.ConditionId) ? null : request.ConditionId; 
            mediaFile.ActivityType = string.IsNullOrEmpty(request.ActivityType) ? null : request.ActivityType;
            mediaFile.ActivityId = string.IsNullOrEmpty(request.ActivityId) ? null : request.ActivityId;
            mediaFile.SystemTaggingKey = request.SystemTagging;
            mediaFile.Type = string.IsNullOrEmpty(request.Type) ? null : request.Type;
            //mediaFile.SystemTags = request.SystemTags;

            // @ TODO: 
            //mediaFile.Tags = request.Tags;

            var repo = new Infrastructure.MediaFilesRepository();
            await repo.CreateFile(mediaFile);
        }

        private async Task<bool> UploadToBlob(string filename, string tenantId, byte[] imageBuffer = null, Stream stream = null)
        {
            CloudStorageAccount storageAccount = null;
            CloudBlobContainer container = null;
            string storageConnectionString = _azureConnectionString;

            // Check whether the connection string can be parsed.
            if (CloudStorageAccount.TryParse(storageConnectionString, out storageAccount))
            {
                try
                {
                    // Create the CloudBlobClient that represents the Blob storage endpoint for the storage account.
                    CloudBlobClient cloudBlobClient = storageAccount.CreateCloudBlobClient();
                    var containerName = GetContainerName(filename);

                    // Create a container called 'uploadblob' and append a GUID value to it to make the name unique. 
                    //cloudBlobContainer = cloudBlobClient.GetContainerReference("uploadblob" + Guid.NewGuid().ToString());
                    container = cloudBlobClient.GetContainerReference(containerName);
                    await container.CreateIfNotExistsAsync();

                    // Set the permissions so the blobs are public. 
                    BlobContainerPermissions permissions = new BlobContainerPermissions
                    {
                        PublicAccess = BlobContainerPublicAccessType.Blob
                    };
                    await container.SetPermissionsAsync(permissions);

                    // Get a reference to the blob address, then upload the file to the blob.
                    CloudBlockBlob blob = container
                        .GetBlockBlobReference($"{tenantId}/{filename}");

                    if (imageBuffer != null)
                    {
                        // OPTION A: use imageBuffer (converted from memory stream)
                        await blob.UploadFromByteArrayAsync(imageBuffer, 0, imageBuffer.Length);
                    }
                    else if (stream != null)
                    {
                        // OPTION B: pass in memory stream directly
                        await blob.UploadFromStreamAsync(stream);
                    }
                    else
                    {
                        return false;
                    }

                    return true;
                }
                catch (StorageException ex)
                {
                    return false;
                }
                finally
                {
                    // OPTIONAL: Clean up resources, e.g. blob container
                    //if (cloudBlobContainer != null)
                    //{
                    //    await cloudBlobContainer.DeleteIfExistsAsync();
                    //}
                }
            }
            else
            {
                return false;
            }

        }

        private string GetContainerName(string filename)
        {
            if (IsPhoto(filename))
                return "photos";
            if (IsPDF(filename))
                return "pdfs";

            return "files";
        }

        private bool IsPDF(string filename)
        {
            return Path.GetExtension(filename).ToLower() == ".pdf";
        }

        private bool IsPhoto(string filename)
        {
            var extention = Path.GetExtension(filename).ToLower();

            return _photosExtensions.Contains(extention);
        }

        private bool IsValidRequest(FlowRequestContext context, FlowRequest request)
        {
            if (!request.FlowChunkNumber.HasValue ||
                !request.FlowChunkSize.HasValue ||
                !request.FlowTotalSize.HasValue)
            {
                return false;
            }

            ulong chunkNumber = request.FlowChunkNumber.Value;
            ulong chunkSize = request.FlowChunkSize.Value;
            ulong totalSize = request.FlowTotalSize.Value;


            if (chunkNumber == 0 || chunkSize == 0 || totalSize == 0)
            {
                return false;
            }

            double numberOfChunks =
                Math.Max(Math.Floor(request.FlowTotalSize.Value / (request.FlowChunkSize.Value * 1.0)), 1);

            if (chunkNumber > numberOfChunks)
            {
                return false;
            }

            if (totalSize > context.MaxFileSize)
            {
                return false;
            }

            if (chunkSize > context.MaxFileSize)
            {
                return false;
            }

            return true;
        }
    }
}