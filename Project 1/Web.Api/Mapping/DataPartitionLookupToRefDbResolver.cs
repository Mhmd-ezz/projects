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
using MongoDB.Driver;
using Medcilia.Clinic.Common.Extensions;
using Medcilia.Clinic.WebApi.Helpers;

namespace Medcilia.Clinic.WebApi.Mapping
{

    public class DataPartitionLookupToRefDbResolver : IValueResolver<DataPartitionModel, DataPartition, List<MongoDBRef>>
    {
        private IUnitOfWork _uow;
        private CacheController cacheController;
        private readonly IUserService userService;


        public DataPartitionLookupToRefDbResolver(IUnitOfWork uow, IUserService userService, CacheController cacheController)
        {
            _uow = uow;
            this.userService = userService;
            this.cacheController = cacheController;
        }

        public List<MongoDBRef> Resolve(DataPartitionModel source, DataPartition destination, List<MongoDBRef> destMember, ResolutionContext context)
        {
            var tenantId = userService.CurrentTenantId;
            var list = new List<MongoDBRef>();



            foreach (var entry in source.Text)
            {
                var sourceText = entry.Text;

                LookUp lookup = _uow.LookupRepository.GetByText(tenantId, entry.Group, sourceText);

                if (lookup == null)
                {

                    // @ if value is not set, give it a value ( group.count + 1 ) 
                    string value = string.IsNullOrEmpty(entry.Value) ? (_uow.LookupRepository.GetByGroup(tenantId, entry.Group).Count + 1).ToString() : entry.Value;

                    var newLookup = new LookUp
                    {
                        TenantId = new DocumentRef(_uow.TenantCollectionName, tenantId),
                        GroupKey = entry.Group,
                        Value = value,
                        Text = sourceText
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
