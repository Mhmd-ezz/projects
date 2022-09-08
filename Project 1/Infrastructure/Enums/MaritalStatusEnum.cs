using System;
using System.Collections.Generic;
using System.Text;
using Medcilia.Clinic.Common.Enumerations;

namespace Medcilia.Clinic.Infrastructure.Enums
{
    public class MaritalStatusEnum : LocalizedKeyedEnumeration
    {
        public static MaritalStatusEnum NotSet = new MaritalStatusEnum(-1, "", "Not Set", "غير محدد");
        public static MaritalStatusEnum Single = new MaritalStatusEnum(10, "single", "single", "أعزب");
        public static MaritalStatusEnum Married = new MaritalStatusEnum(20, "married", "married", "متزوج");
        public static MaritalStatusEnum Widowed = new MaritalStatusEnum(30, "widowed", "widowed", "أرمل");
        public static MaritalStatusEnum Divorced = new MaritalStatusEnum(40, "divorced", "divorced", "مطلق");

        public MaritalStatusEnum()
        {
        }

        public MaritalStatusEnum(int value, string displayName)
            : base(value, displayName)
        {
        }

        public MaritalStatusEnum(int value, string key, params string[] displayNames)
            : base(value, key, displayNames)
        {
        }

        protected override void SetCultures()
        {
            _supportedCultures = new[] { "en", "ar" };
        }
    }

}
