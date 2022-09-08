using AutoMapper;
using Medcilia.Clinic.Infrastructure;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.Mapping
{
    public class MediaRootToRefDbResolver : IValueResolver<MediaRootModel, MediaRoot, List<MongoDBRef>>
    {
        private IUnitOfWork _uow;

        public MediaRootToRefDbResolver(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public List<MongoDBRef> Resolve(MediaRootModel source, MediaRoot destination, List<MongoDBRef> destMember, ResolutionContext context)
        {

            var list = new List<MongoDBRef>();
            foreach (var entry in source.Files)
            {
                MediaFile file = entry.Id != null ? _uow.MediaFileRepository.GetById(entry.Id) : null;

                var dbRef = new MongoDBRef(_uow.MediaFileCollectioName, file.Id);
                list.Add(dbRef);
            }
            return list;
        }
    }
}
