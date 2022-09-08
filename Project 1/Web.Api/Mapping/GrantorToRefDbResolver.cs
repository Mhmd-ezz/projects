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
    public class GrantorToRefDbResolver : IValueResolver<PatientModel, Patient, IList<MongoDBRef>>
    {
        private IUnitOfWork _uow;

        public GrantorToRefDbResolver(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public IList<MongoDBRef> Resolve(PatientModel source, Patient destination, IList<MongoDBRef> destMember, ResolutionContext context)
        {

            var list = new List<MongoDBRef>();
            foreach (var entry in source.Grantors)
            {
                Grantor grantor = entry.Id != null ? _uow.GrantorRepository.GetById(entry.Id) : null;

                if (grantor != null)
                {
                    var dbRef = new MongoDBRef(_uow.GrantorCollectionName, grantor.Id);
                    list.Add(dbRef);
                }
            }
            return list;

        }
    }
}
