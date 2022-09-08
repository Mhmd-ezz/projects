using Medcilia.Clinic.Common.Enumerations;

namespace Medcilia.Clinic.Infrastructure.Enums
{
    [System.Serializable]
    public class UserRolesEnum : LocalizedKeyedEnumeration
    {
        public static UserRolesEnum NotSet = new UserRolesEnum(0, "", "NotSet", "غير محدد");
        public static UserRolesEnum Admin = new UserRolesEnum(10, "Admin", "Admin", "مدير الموقع");
        public static UserRolesEnum TenantAdmin = new UserRolesEnum(100, "TenantAdmin", "Tenant Admin", "مدير");
        public static UserRolesEnum Doctor = new UserRolesEnum(110, "Doctor", "Doctor", "طبيب");
        public static UserRolesEnum Secretary = new UserRolesEnum(120, "Secretary", "Secretary", "سكرتيرة");
        public static UserRolesEnum Assistant = new UserRolesEnum(130, "Assistant", "Assistant", "مساعد");
        public static UserRolesEnum Accountant = new UserRolesEnum(140, "Accountant", "Accountant", "محاسب");

        public UserRolesEnum()
        {
        }

        public UserRolesEnum(int value, string displayName)
            : base(value, displayName)
        {
        }
        public UserRolesEnum(int value, string key, params string[] displayNames)
            : base(value, key, displayNames)
        {
        }

        protected override void SetCultures()
        {
            _supportedCultures = new[] { "en", "ar" };
        }
    }
}
