using System;
using System.Collections.Generic;
using System.Text;
using Medcilia.Clinic.Common.Enumerations;

namespace Medcilia.Clinic.Infrastructure.Enums
{
    public class ContactTypeEnum : LocalizedKeyedEnumeration
    {
        public static ContactTypeEnum Contact = new ContactTypeEnum(10, "contact", "Contact", "جهة اتصال");
        public static ContactTypeEnum Patient = new ContactTypeEnum(20, "patient", "Patient", "مريض");
        public static ContactTypeEnum Agent = new ContactTypeEnum(30, "agent", "Agent", "وسيط");

        public ContactTypeEnum()
        {
        }

        public ContactTypeEnum(int value, string displayName)
            : base(value, displayName)
        {
        }

        public ContactTypeEnum(int value, string key, params string[] displayNames)
            : base(value, key, displayNames)
        {
        }

        protected override void SetCultures()
        {
            _supportedCultures = new[] { "en", "ar" };
        }
    }
}
