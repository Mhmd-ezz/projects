using AutoMapper;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure.Repository.Location;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class MediaPartitionType : ObjectGraphType<MediaPartitionModel>
    {
        public MediaPartitionType()
        {
            Name = "MediaPartition";

            Field(h => h.Text, nullable: true).Description("");
            Field(h => h.Tags, nullable: true).Description("");
            Field(h => h.Date, nullable: true).Description("");
            //Field(h => h.CreatedOn, nullable: true).Description("");
        }
    }
}
