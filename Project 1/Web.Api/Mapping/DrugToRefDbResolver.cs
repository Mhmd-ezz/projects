using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Medcilia.Clinic.Common;
using Medcilia.Clinic.Infrastructure;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Exceptions;
using Medcilia.Clinic.Infrastructure.Helper;
using Medcilia.Clinic.Infrastructure.Services.Lookups;
using Medcilia.Clinic.Infrastructure.Services.Security;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using Medcilia.Clinic.WebApi.Helpers;
using MongoDB.Driver;

namespace Medcilia.Clinic.WebApi.Mapping
{

    public class DrugToRefDbResolver : IValueResolver<MedicationModel, Medication, MongoDBRef>
    {
        private IUnitOfWork _uow;
        private CacheController cacheController;
        private readonly IUserService userService;

        public DrugToRefDbResolver(IUnitOfWork uow, IUserService userService, CacheController cacheController)
        {
            _uow = uow;
            this.userService = userService;
            this.cacheController = cacheController;
        }

        public MongoDBRef Resolve(MedicationModel source, Medication destination, MongoDBRef destMember, ResolutionContext context)
        {
            var tenantId = userService.CurrentTenantId;

            Drug drug = source.Drug.Id != null ? _uow.DrugRepository.GetById(source.Drug.Id) : null;

            if (drug == null)
            {
                drug = source.Drug.Name != null ? _uow.DrugRepository.GetByName(source.Drug.Name, tenantId) : null;
            }

            if (drug == null)
            {
                var newDrug = new Drug()
                {
                    TenantId = new DocumentRef(_uow.TenantCollectionName, tenantId),
                    Name = source.Drug.Name,
                };

                if (source.Drug.Id != null)
                    newDrug.Id = source.Drug.Id;

                var created = _uow.DrugRepository.Add(newDrug);

                cacheController.UpsertDrug(created);

                drug = newDrug;
            }

            var dbRef = new MongoDBRef(_uow.DrugCollectionName, drug.Id);

            return dbRef;
        }
    }
}
