using Medcilia.Clinic.Common.Enumerations;

namespace Medcilia.Clinic.Infrastructure.Enums
{
     [System.Serializable]
    public class LanguageEnum : LocalizedKeyedEnumeration
    {
        public static LanguageEnum NotSet = new LanguageEnum(-1, "", "", "");
        public static LanguageEnum Arabic = new LanguageEnum(1, "ar", "Arabic", "عربي");
        public static LanguageEnum English = new LanguageEnum(2, "en", "English", "إنجليزي");

        public LanguageEnum()
        {
        }

        public LanguageEnum(int value, string displayName)
            : base(value, displayName)
        {
        }

        public LanguageEnum(int value, string key, params string[] displayNames)
            : base(value, key, displayNames)
        {
        }

        protected override void SetCultures()
        {
            _supportedCultures = new[] { "en", "ar" };
        }
    
    }
}