using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class MediaRootInputType : InputObjectGraphType
    {
        public MediaRootInputType()
        {
            Name = "MediaRootInput";

            Field<ListGraphType<MediaFileInputType>>("files");
        }
    }
}
