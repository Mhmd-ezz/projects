using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Media.Infrastructure
{
    public class MediaFilesRepository
    {
        protected static IMongoClient _client;
        protected static IMongoDatabase _database;
        protected static IMongoCollection<MediaFile> _collection;

        public MediaFilesRepository()
        {
            var connnection = ConfigurationManager.ConnectionStrings["MongoDbConnection"].ConnectionString;
            var databaseName = ConfigurationManager.AppSettings["DatabaseName"];
            //_database = _client.GetDatabase("MedciliaDb");
            _client = new MongoClient(connnection);
            _database = _client.GetDatabase(databaseName);
            _collection = _database.GetCollection<MediaFile>("MediaFiles");
        }

        public async Task<IEnumerable<MediaFile>> GetAllFiles()
        {
            var filter = new BsonDocument();
            var result = await _collection.Find(filter).ToListAsync();
            return result;
        }


        public async Task<MediaFile> GetFile(Object id)
        {
            var filter = Builders<MediaFile>.Filter.Eq(e => e.Id, id);
            var result = await _collection.Find(filter).FirstOrDefaultAsync();
            return result;
        }

        public async Task CreateFile(MediaFile file)
        {
            //await _collection.InsertOneAsync(new MediaFile
            //{
            //    PatientId = file.PatientId,
            //    PatientName = file.PatientName,
            //    Speciality = file.Speciality,
            //    ConditionId = file.ConditionId,
            //    ActivityType =  file.ActivityType,
            //    ActivityId = file.ActivityId,
            //    Keys = file.Keys,
            //    Tags = file.Tags
            //});
            await _collection.InsertOneAsync(file);
        }

        public async Task UpdateFile(MediaFile file)
        {
            var filter = Builders<MediaFile>.Filter.Eq(e => e.Id, file.Id);
            var update = Builders<MediaFile>.Update
                .Set(x => x.PatientId, file.PatientId)
                .Set(x => x.PatientName, file.PatientName)
                .Set(x => x.Speciality, file.Speciality)
                .Set(x => x.ConditionId, file.ConditionId)
                .Set(x => x.ActivityType, file.ActivityType)
                .Set(x => x.ActivityId, file.ActivityId)
                .Set(x => x.Type, file.Type)

                //.Set(x => x.Tags, file.Tags)
                //.Set(x => x.SystemTags, file.SystemTags)
                .Set(x => x.IsDeleted, file.IsDeleted);

            var result1 = await _collection.UpdateOneAsync(filter, update);
        }

        public async Task DeleteFile(Object id)
        {
            var filter = Builders<MediaFile>.Filter.Eq(e => e.Id, id);
            await _collection.DeleteOneAsync(filter);
        }

    }
}