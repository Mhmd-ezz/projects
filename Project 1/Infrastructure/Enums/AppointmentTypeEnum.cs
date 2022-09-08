using System;
using System.Collections.Generic;
using System.Text;
using Medcilia.Clinic.Common.Enumerations;

namespace Medcilia.Clinic.Infrastructure.Enums
{
    public class AppointmentTypeEnum : LocalizedKeyedEnumeration
    {
        public static AppointmentTypeEnum NotSet = new AppointmentTypeEnum(-1, "", "Not Set", "غير محدد");
        public static AppointmentTypeEnum Operation = new AppointmentTypeEnum(10, "operation", "Operation", "عملية");
        public static AppointmentTypeEnum Visit = new AppointmentTypeEnum(20, "visit", "Visit", "زيارة");
        public static AppointmentTypeEnum Floor = new AppointmentTypeEnum(10, "floor", "Floor", "طابق");
        public static AppointmentTypeEnum Conference = new AppointmentTypeEnum(10, "conference", "Conference", "مؤتمر");
        public static AppointmentTypeEnum Event = new AppointmentTypeEnum(10, "event", "Event", "موعد");

        
        public AppointmentTypeEnum()
        {
        }

        public AppointmentTypeEnum(int value, string displayName)
            : base(value, displayName)
        {
        }

        public AppointmentTypeEnum(int value, string key, params string[] displayNames)
            : base(value, key, displayNames)
        {
        }

        protected override void SetCultures()
        {
            _supportedCultures = new[] { "en", "ar" };
        }
    }
}
