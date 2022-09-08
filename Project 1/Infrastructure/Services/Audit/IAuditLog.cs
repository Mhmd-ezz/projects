using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Services.Audit
{
    public interface IAuditLog
    {
        void Setup(string connectionString);
        void Log(string eventType, object extraFields);

        //List<AuditEvent> GetByTenantId(string tenantId)
    }
}
