using System;
using System.Collections.Generic;
using System.Text;
using Medcilia.Clinic.Common.Enumerations;

namespace Medcilia.Clinic.Infrastructure.Enums
{
    public class PatientMedicationsStatusEnum : LocalizedKeyedEnumeration
    {
        public static PatientMedicationsStatusEnum NotSet = new PatientMedicationsStatusEnum(-1, "", "Not Set", "غير محدد");
        public static PatientMedicationsStatusEnum New = new PatientMedicationsStatusEnum(10, "new", "New", "جديد");
        public static PatientMedicationsStatusEnum Renewal = new PatientMedicationsStatusEnum(20, "renewal", "Renewal", "تجديد");
        public static PatientMedicationsStatusEnum Stopped = new PatientMedicationsStatusEnum(30, "stopped", "Stopped", "انتهاء");
        public static PatientMedicationsStatusEnum Replaced = new PatientMedicationsStatusEnum(40, "replaced", "Replaced", "تبديل");
        

        public PatientMedicationsStatusEnum()
        {
        }

        public PatientMedicationsStatusEnum(int value, string displayName)
            : base(value, displayName)
        {
        }

        public PatientMedicationsStatusEnum(int value, string key, params string[] displayNames)
            : base(value, key, displayNames)
        {
        }


        protected override void SetCultures()
        {
            _supportedCultures = new[] { "en", "ar" };
        }
    }
}
