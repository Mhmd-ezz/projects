using Etl.Processes.Common;
using Medcilia.Clinic.Infrastructure.Domain;
using MongoDB.Bson;
using Rhino.Etl.Core;

namespace Etl.Processes.PatientOperations
{
    public class ReadTargetImages : InputMongoDbOperation<MediaFile>
    {
        public ReadTargetImages() : base("DestinationDb")
        {
            _collection = _database.GetCollection<MediaFile>("MediaFiles");
        }

        protected override Row CreateRowFromDocument(MediaFile document)
        {
            var row = new Row();
            row["Id"] = document.Id;
            row["TenantId"] = document.TenantId;
            row["Name"] = document.Name;
            row["Path"] = document.Path;
            row["PatientName"] = document.PatientName;
            row["CreatedOn"] = document.CreatedOn;
            row["Modified"] = document.Modified;
            row["Type"] = document.Type;
            row["PatientId"] = document.PatientId;
            row["Size"] = document.Size;
            row["Speciality"] = document.Speciality;
            row["SystemTagging"] = document.SystemTagging;
            row["SystemTags"] = document.SystemTags;
            row["ConditionId"] = document.ConditionId;
            row["ActivityId"] = document.ActivityId;
            row["IsDeleted"] = document.IsDeleted;
            row["DeletedOn"] = document.DeletedOn;
            row["ActivityType"] = document.ActivityType;
            row["IsDeleted"] = document.IsDeleted;


            return row;
        }

        protected override void PrepareFilter(BsonDocument doc)
        {
            // Get all 
        }
    }

}
