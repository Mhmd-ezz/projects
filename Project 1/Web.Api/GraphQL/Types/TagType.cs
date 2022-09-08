using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class TagType : ObjectGraphType<TagModel>
    {
        public TagType()
        {
            Name = "Tag";

            Field(h => h.Id, nullable: true).Description("Id of the Tags");
            Field(h => h.Name, nullable: true).Description("Name of the Tags");
            Field(h => h.Group, nullable: true).Description("Group of the Tags");
        }
    }
}
