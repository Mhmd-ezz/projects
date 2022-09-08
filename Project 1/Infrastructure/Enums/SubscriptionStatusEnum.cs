using System;
using System.Collections.Generic;
using System.Text;
using Medcilia.Clinic.Common.Enumerations;

namespace Medcilia.Clinic.Infrastructure.Enums
{
    public class SubscriptionStatusEnum : LocalizedKeyedEnumeration
    {
        public static SubscriptionStatusEnum NotSet = new SubscriptionStatusEnum(-1, "", "Not Set", "غير محدد");
        public static SubscriptionStatusEnum New = new SubscriptionStatusEnum(10, "new", "New", "جديد");
        public static SubscriptionStatusEnum Pending = new SubscriptionStatusEnum(20, "pending", "Pending", "قيد التجهيز");
        public static SubscriptionStatusEnum Active = new SubscriptionStatusEnum(30, "active", "Active", "مفعل");
        public static SubscriptionStatusEnum Inactive = new SubscriptionStatusEnum(40, "inactive", "Inactive", "غير مفعل");
        public static SubscriptionStatusEnum Disabled = new SubscriptionStatusEnum(50, "disabled", "Disabled", "متوقف");

        public SubscriptionStatusEnum()
        {
        }

        public SubscriptionStatusEnum(int value, string displayName)
            : base(value, displayName)
        {
        }

        public SubscriptionStatusEnum(int value, string key, params string[] displayNames)
            : base(value, key, displayNames)
        {
        }

        protected override void SetCultures()
        {
            _supportedCultures = new[] { "en", "ar" };
        }
    }
}
