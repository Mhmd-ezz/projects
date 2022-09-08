using AutoMapper;
using Medcilia.Clinic.Infrastructure;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.Mapping
{

    //public class TenantFromRefDbResolver : IValueResolver<MediaFile, MediaFileModel, string>
    //{
    //    private IUnitOfWork _uow;

    //    public TenantFromRefDbResolver(IUnitOfWork uow)
    //    {
    //        _uow = uow;
    //    }

    //    public TenantFromRefDbResolver Resolve(MediaFile source, MediaFileModel destination, string destMember, ResolutionContext context)
    //    {
    //        if (source.Tenant.Id == null) return null;

            

    //        //return "asd";
    //    }
    //}
}
