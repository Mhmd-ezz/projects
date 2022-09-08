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
    public class RotaLocationToRefDbResolver : IValueResolver<RotaModel, Rota, MongoDBRef>
    {
        private IUnitOfWork _uow;

        public RotaLocationToRefDbResolver(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public MongoDBRef Resolve(RotaModel source, Rota destination, MongoDBRef destMember, ResolutionContext context)
        {
            if (source.Location == null) return null;

            var location = _uow.LocationRepository.GetById(source.Location.Id);
            var dbRef = new MongoDBRef(_uow.LocationCollectionName, location.Id);

            return dbRef;
        }
    }
}
