using Medcilia.Clinic.Common.Enumerations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.Enum
{
    public class SubscriptionEventEnum
    {
        public const string appointment_created = "appointment_created";
        public const string appointment_updated = "appointment_updated";
        public const string appointment_status_changed = "appointment_status_changed";
        public const string ticket_created = "ticket_created";
        public const string ticket_updated = "ticket_updated";
    }


   
}
