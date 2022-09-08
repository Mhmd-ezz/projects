using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using Medcilia.Clinic.Common;
using Medcilia.Clinic.Common.Dates;
using Medcilia.Clinic.Common.Enumerations;
using Medcilia.Clinic.Infrastructure.Enums;
using Medcilia.Clinic.Infrastructure.Helper;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace Medcilia.Clinic.Infrastructure.Services
{
    [CollectionName("AppSettings")]
    public class AppSetting : Entity
    {
        //private static readonly TimeZoneInfo TimeZoneInfo =
        //    TimeZoneInfo.FindSystemTimeZoneById("Middle East Standard Time");

        static AppSetting()
        {
            //TimeZone = TimeZoneInfo.GetUtcOffset(DateTime.UtcNow).Hours;
        }

        public AppSetting()
        {
            this.CreatedDate = DomainTime.Now();
            this.ModifiedDate = DomainTime.Now();
        }

        //public Guid Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        [StringLength(2)]
        public string AppLanguage { get; set; }

        [StringLength(5)]
        public string AppCulture { get; set; }

        public string TimeZone { get; set; }

        [NotMapped]
        [JsonIgnore]
        [BsonIgnore]
        public static string CurrentLanguage
        {
            get
            {
                return Instance.AppLanguage ?? System.Threading.Thread.CurrentThread.CurrentCulture.TwoLetterISOLanguageName;
            }
        }

        [NotMapped]
        [JsonIgnore]
        [BsonIgnore]
        public static CultureInfo CurrentCulture
        {
            get
            {
                var culture = string.IsNullOrEmpty(Instance.AppCulture) ?
                    System.Threading.Thread.CurrentThread.CurrentCulture :
                    new CultureInfo(Instance.AppCulture);
                return culture;
            }
        }

        [NotMapped]
        [JsonIgnore]
        [BsonIgnore]
        public static LanguageEnum CurrentLanguageEnum
        {
            get
            {
                //var lang = System.Threading.Thread.CurrentThread.CurrentCulture.TwoLetterISOLanguageName;
                return KeyedEnumeration.FromKey<LanguageEnum>(CurrentLanguage);
            }
        }

        private static AppSetting _appSettings;

        [NotMapped]
        [JsonIgnore]
        public static AppSetting Instance
        {
            get
            {
                _appSettings = IoC.Resolve<IUnitOfWork>().AppSettingsRepository.GetSingle();
                if (_appSettings == null)
                    throw new Exception("Please make sure that one 'appSettings' entry exists in database");

                return _appSettings;
            }
        }

    }
}
