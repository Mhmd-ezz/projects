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
    public class PatientMedicationsDrugToRefDbResolver : IValueResolver<PatientMedicationsModel, PatientMedications, MongoDBRef>
    {
        private IUnitOfWork _uow;

        public PatientMedicationsDrugToRefDbResolver(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public MongoDBRef Resolve(PatientMedicationsModel source, PatientMedications destination, MongoDBRef destMember, ResolutionContext context)
        {
            if (source.Drug == null)
                return null;

            var drug = _uow.DrugRepository.GetById(source.Drug.Id);
            var dbRef = new MongoDBRef(_uow.DrugCollectionName, drug.Id);

            return dbRef;
        }
    }
}
