using System;
using System.Collections.Generic;
using System.Text;
using Medcilia.Clinic.Common.Enumerations;

namespace Medcilia.Clinic.Infrastructure.Enums
{
    public class BloodTypeEnum : LocalizedKeyedEnumeration
    {
        public static BloodTypeEnum NotSet = new BloodTypeEnum(-1, "", "Not Set", "غير محدد");
        public static BloodTypeEnum APositive = new BloodTypeEnum(10, "a+", "a+", "أ+");
        public static BloodTypeEnum ANegative = new BloodTypeEnum(20, "a-", "a-", "أ-");
        public static BloodTypeEnum BPositive = new BloodTypeEnum(30, "b+", "b+", "ب+");
        public static BloodTypeEnum BNegative = new BloodTypeEnum(40, "b-", "b-", "ب-");
        public static BloodTypeEnum AbPositive = new BloodTypeEnum(50, "ab+", "aB+", "أب+");
        public static BloodTypeEnum AbNegative = new BloodTypeEnum(60, "ab-", "aB-", "اب-");
        public static BloodTypeEnum OPositive = new BloodTypeEnum(70, "o+", "o+", "و+");
        public static BloodTypeEnum ONegative = new BloodTypeEnum(80, "o-", "o-", "و-");

        public BloodTypeEnum()
        {
        }

        public BloodTypeEnum(int value, string displayName)
            : base(value, displayName)
        {
        }

        public BloodTypeEnum(int value, string key, params string[] displayNames)
            : base(value, key, displayNames)
        {
        }

        protected override void SetCultures()
        {
            _supportedCultures = new[] { "en", "ar" };
        }
    }
}
