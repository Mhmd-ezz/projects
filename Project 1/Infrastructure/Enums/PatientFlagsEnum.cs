using System;
using System.Collections.Generic;
using System.Text;
using Medcilia.Clinic.Common.Enumerations;

namespace Medcilia.Clinic.Infrastructure.Enums
{
    class PatientFlagsEnum : LocalizedKeyedEnumeration
    {

        public static PatientFlagsEnum NotSet = new PatientFlagsEnum(-1, "", "Not Set", "غير محدد");
        public static PatientFlagsEnum InComplete = new PatientFlagsEnum(10, "inComplete", "InComplete", "غير مكتمل");
        public static PatientFlagsEnum Review = new PatientFlagsEnum(20, "review", "Review", "مراجعة");
        public static PatientFlagsEnum Media = new PatientFlagsEnum(30, "media", "Media", "بيانات");
        public static PatientFlagsEnum Urgent = new PatientFlagsEnum(40, "urgent", "Urgent", "عاجل");
        public static PatientFlagsEnum Operation = new PatientFlagsEnum(50, "operation", "Operation", "عمليات");
        public static PatientFlagsEnum Appointment = new PatientFlagsEnum(60, "appointment", "Appointment", "موعد");
        public static PatientFlagsEnum BlackListed = new PatientFlagsEnum(70, "blacklisted", "BlackListed", "القائمة السوداء");

        public PatientFlagsEnum()
        {
        }

        public PatientFlagsEnum(int value, string displayName)
            : base(value, displayName)
        {
        }

        public PatientFlagsEnum(int value, string key, params string[] displayNames)
            : base(value, key, displayNames)
        {
        }

        protected override void SetCultures()
        {
            _supportedCultures = new[] { "en", "ar" };
        }
    }
}
