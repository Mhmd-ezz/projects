using System;
using System.Collections.Generic;
using System.Text;
using Medcilia.Clinic.Common.Enumerations;

namespace Medcilia.Clinic.Infrastructure.Enums
{
    public class ConditionTypeEnum : LocalizedKeyedEnumeration
    {
        public static ConditionTypeEnum NotSet =     new ConditionTypeEnum(-1, "", "Not Set", "غير محدد");
        public static ConditionTypeEnum NewCondition =  new ConditionTypeEnum(10, "Condition", "Condition", "حالة");
        public static ConditionTypeEnum Followup =  new ConditionTypeEnum(20, "followup", "Followup", "مراجعة");
        public static ConditionTypeEnum Operation =  new ConditionTypeEnum(30, "operation", "Operation", "عملية");

        public ConditionTypeEnum()
        {
        }

        public ConditionTypeEnum(int value, string displayName)
            : base(value, displayName)
        {
        }

        public ConditionTypeEnum(int value, string key, params string[] displayNames)
            : base(value, key, displayNames)
        {
        }

        protected override void SetCultures()
        {
            _supportedCultures = new[] { "en", "ar" };
        }
    }
}
