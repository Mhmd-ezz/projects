using GraphQL.Types;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.GraphQL.Types
{
    public class MediaRootType : ObjectGraphType<MediaRootModel>
    {
        public MediaRootType()
        {
            Name = "MediaRoot";

            Field(h => h.Files, nullable: true, type: typeof(ListGraphType<MediaFileType>)).Description("List of media files");
        }
    }
}
