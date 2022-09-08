using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Services.Audit
{
    public static class AuditTypes
    {
        public const string GrantorCreated = "Grantor:Created";
        public const string GrantorUpdated = "Grantor:Updated";
        public const string GrantorDeleted = "Grantor:Deleted";

        public const string TagCreated = "Tag:Created";
        public const string TagUpdated = "Tag:Updated";
        public const string TagDeleted = "Tag:Deleted";

        public const string ScheduleCreated = "ScheduleCreated:Created";
        public const string ScheduleUpdated = "ScheduleCreated:Updated";
        public const string ScheduleDeleted = "ScheduleCreated:Deleted";

        public const string RotaCreated = "Rota:Created";
        public const string RotaUpdated = "Rota:Updated";
        public const string RotaDeleted = "Rota:Deleted";

        public const string UserDeleted = "User:Deleted";

        public const string TodoCreated = "Todo:Created";
        public const string TodoUpdated = "Todo:Updated";
        public const string TodoDeleted = "Todo:Deleted";
    }
}
