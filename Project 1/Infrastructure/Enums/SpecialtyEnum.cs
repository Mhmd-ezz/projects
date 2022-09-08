using System;
using System.Collections.Generic;
using System.Text;
using Medcilia.Clinic.Common.Enumerations;

namespace Medcilia.Clinic.Infrastructure.Enums
{
    public class SpecialityEnum : LocalizedKeyedEnumeration
    {
        public static SpecialityEnum NotSet = new SpecialityEnum(-1, "", "Not Set", "غير محدد");
        public static SpecialityEnum General = new SpecialityEnum(10, "general", "General", "طب عام");
        public static SpecialityEnum Obstetrics = new SpecialityEnum(20, "obstetrics", "Obstetrics", "نسائي");
        public static SpecialityEnum Cardiology = new SpecialityEnum(30, "cardiology", "Cardiology", "طب قلب");
        public static SpecialityEnum Orthology = new SpecialityEnum(40, "orthology", "Orthology", "طب عظم");

        public SpecialityEnum()
        {
        }

        public SpecialityEnum(int value, string displayName)
            : base(value, displayName)
        {
        }

        public SpecialityEnum(int value, string key, params string[] displayNames)
            : base(value, key, displayNames)
        {
        }

        protected override void SetCultures()
        {
            _supportedCultures = new[] { "en", "ar" };
        }
    }
}
