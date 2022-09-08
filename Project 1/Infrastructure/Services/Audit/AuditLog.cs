using Audit.Core;
using Audit.MongoDB.Providers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Medcilia.Clinic.Infrastructure.Services.Audit
{
    public class AuditLog : IAuditLog
    {
        private  MongoDataProvider provider;

        public void Setup(string connectionString)
        {
            provider = new MongoDataProvider()
            {
                ConnectionString = connectionString,
                Database = "Audit",
                Collection = "Event"
            };
            Configuration.DataProvider = provider;
        }

        public void Log(string eventType, object extraFields)
        {
            AuditScope.CreateAndSave(eventType, extraFields);
        }

        public AuditEvent Get(string eventId)
        {
            var auditEvent = provider.GetEvent(eventId);

            return auditEvent;
        }
        public List<AuditEvent> GetByTenantId(string tenantId)
        {
            IQueryable<AuditEvent> query = provider.QueryEvents()
                .Where(ev => ev.Environment.MachineName == "HP")
                .OrderByDescending(ev => ev.Duration)
                .Take(10);

            return query.ToList();
        }
    }

}
