using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Media.Helpers
{
    public class DocumentRef
    {
        public DocumentRef(string collectionName, string id)
        {
            this.CollectionName = collectionName;
            this.DocumentId = id;
        }

        public string CollectionName { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string DocumentId { get; set; }
    }
}