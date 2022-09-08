using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Medcilia.Clinic.Infrastructure;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Services.Lookups;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using MongoDB.Driver;

namespace Medcilia.Clinic.WebApi.Mapping
{

    public class LocationToRefDbResolver : IValueResolver<ConditionModel,Condition, MongoDBRef>
    {
        private IUnitOfWork _uow;

        public LocationToRefDbResolver(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public MongoDBRef Resolve(ConditionModel source, Condition destination, MongoDBRef destMember, ResolutionContext context)
        {
            if (source.Location == null) return null;

            var location = _uow.LocationRepository.GetById(source.Location.Id);
            var dbRef = new MongoDBRef(_uow.LocationCollectionName, location.Id);
            
            return dbRef;
        }
    }
}
