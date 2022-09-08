using Medcilia.Clinic.Common.Enumerations;

namespace Medcilia.Clinic.Infrastructure.Services.Lookups
{
    [System.Serializable]
    public class LookupGroupEnum : LocalizedKeyedEnumeration
    {
        public static LookupGroupEnum Allergies = new LookupGroupEnum(10, "allergies", "Allergies", "حساسية");
        public static LookupGroupEnum Linked = new LookupGroupEnum(20, "prescription", "Prescription", "وصفة طبية");
        public static LookupGroupEnum PhysicalExam = new LookupGroupEnum(30, "physical_exam", "physical_exam", "متواجد");

        // TODO: add more groups


        public LookupGroupEnum()
        {
        }

        public LookupGroupEnum(int value, string displayName)
            : base(value, displayName)
        {
        }
        public LookupGroupEnum(int value, string key, params string[] displayNames)
            : base(value, key, displayNames)
        {
        }

        protected override void SetCultures()
        {
            this._supportedCultures = new[] { "en", "ar" };
        }
    }
}
