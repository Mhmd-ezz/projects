using AutoMapper;
using Medcilia.Clinic.Infrastructure;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Helper;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.Mapping
{
  
    public class TenantToRefDbResolver : IValueResolver<MediaFileModel, MediaFile, DocumentRef>
    {
        private IUnitOfWork _uow;

        public TenantToRefDbResolver(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public DocumentRef Resolve(MediaFileModel source, MediaFile destination, DocumentRef destMember, ResolutionContext context)
        {
            if (source.TenantId == null) return null;

            var tenant = _uow.TenantRepository.GetById(source.TenantId);
            var dbRef = new DocumentRef(_uow.TenantCollectionName, tenant.Id);
           

            return dbRef;
        }
    }
}
