using AutoMapper;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure.Repository.Location;
using Medcilia.Clinic.WebApi.GraphQL.Models;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class DataPartitionType : ObjectGraphType<DataPartitionModel>
    {
        public DataPartitionType()
        {
            Name = "DataPartition";

            //Field(h => h.Text, nullable: true).Description("");
            Field(h => h.Text, nullable: true, type: typeof(ListGraphType<LookupViewModelType>)).Description("Text");
            Field(h => h.Media, nullable: true, type: typeof(ListGraphType<MediaPartitionType>)).Description("Media");
            Field(h => h.Tags, nullable: true).Description("");
        }
    }
}
