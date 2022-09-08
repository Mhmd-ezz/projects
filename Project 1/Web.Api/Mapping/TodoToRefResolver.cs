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
    public class TodoToRefResolver : IValueResolver<PatientModel, Patient, IList<MongoDBRef>>
    {
        private IUnitOfWork _uow;

        public TodoToRefResolver(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public IList<MongoDBRef> Resolve(PatientModel source, Patient destination, IList<MongoDBRef> destMember, ResolutionContext context)
        {

            var list = new List<MongoDBRef>();
            foreach (var entry in source.Todos)
            {
                Todo todo = entry.Id != null ? _uow.TodoRepository.GetById(entry.Id) : null;

                if (todo != null)
                {
                    var dbRef = new MongoDBRef(_uow.TodoCollectionName, todo.Id);
                    list.Add(dbRef);
                }
            }
            return list;

        }
    }
}
