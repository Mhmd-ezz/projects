using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class GrantorType : ObjectGraphType<GrantorModel>
    {
        public GrantorType()
        {
            Name = "Grantor";

            Field(h => h.Id, nullable: true).Description("Id of the Grantors");
            Field(h => h.Name, nullable: true).Description("Name of the Grantors");
        }
    }
}
