using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Helper
{
    public class DocumentRef
    {
        public DocumentRef(string collectionName, string id)
        {
            this.CollectionName = collectionName;
            if (string.IsNullOrEmpty(id))
                throw new ArgumentOutOfRangeException(nameof(id), "id cannot be null or empty string");
            this.DocumentId = id;
        }

        public string CollectionName { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string DocumentId { get; set; }
    }
}
