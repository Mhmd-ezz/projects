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
    public class TagToRefDbResolver : IValueResolver<PatientModel, Patient, IList<MongoDBRef>>
    {
        private IUnitOfWork _uow;

        public TagToRefDbResolver(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public IList<MongoDBRef> Resolve(PatientModel source, Patient destination, IList<MongoDBRef> destMember, ResolutionContext context)
        {

            var list = new List<MongoDBRef>();
            foreach (var entry in source.Tags)
            {
                Infrastructure.Domain.Tag tag = entry.Id != null ? _uow.TagRepository.GetById(entry.Id) : null;

                if (tag != null)
                {
                    var dbRef = new MongoDBRef(_uow.TagCollectionName, tag.Id);
                    list.Add(dbRef);
                }
            }
            return list;

        }
    }
}