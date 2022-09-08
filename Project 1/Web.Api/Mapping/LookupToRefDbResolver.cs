using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Medcilia.Clinic.Infrastructure;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Helper;
using Medcilia.Clinic.Infrastructure.Services.Lookups;
using Medcilia.Clinic.Infrastructure.Services.Security;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using Medcilia.Clinic.WebApi.Helpers;
using MongoDB.Driver;

namespace Medcilia.Clinic.WebApi.Mapping
{

    public class LookupToRefDbResolver : IValueResolver<MedicalHistoryAlertModel, MedicalHistoryAlert, List<MongoDBRef>>
    {
        private IUnitOfWork _uow;
        private readonly IUserService userService;
        private CacheController cacheController;


        public LookupToRefDbResolver(IUnitOfWork uow, IUserService userService,CacheController cacheController)
        {
            _uow = uow;
            this.userService = userService;
            this.cacheController = cacheController;
        }

        public List<MongoDBRef> Resolve(MedicalHistoryAlertModel source, MedicalHistoryAlert destination, List<MongoDBRef> destMember, ResolutionContext context)
        {
            var tenantId = userService.CurrentTenantId;
            var list = new List<MongoDBRef>();

            foreach (var entry in source.Data)
            {
                LookUp lookup = _uow.LookupRepository.GetByText(tenantId, entry.Group, entry.Text);
                               
                if (lookup == null)
                {
                    // @ if value is not set, give it a value ( group.count + 1 ) 
                    string value = string.IsNullOrEmpty(entry.Value) ? (_uow.LookupRepository.GetByGroup(tenantId, entry.Group).Count + 1).ToString() : entry.Value;
                    
                    var newLookup = new LookUp
                    {
                        TenantId = new DocumentRef(_uow.TenantCollectionName, tenantId),
                        GroupKey = entry.Group,
                        Value = value,
                        Text = entry.Text
                    };

                    var created = _uow.LookupRepository.Add(newLookup);

                    cacheController.UpsertLookup(created);

                    lookup = newLookup;
                }

                var dbRef = new MongoDBRef(_uow.LookupCollectionName, lookup.Id);
                list.Add(dbRef);
            }
            return list;
        }
    }
}
