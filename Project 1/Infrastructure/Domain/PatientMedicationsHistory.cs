using Medcilia.Clinic.Common.Enumerations;
using Medcilia.Clinic.Infrastructure.Enums;
using Medcilia.Clinic.Infrastructure.Helper;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class PatientMedicationsHistory
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Duration { get; set; }
        public string Frequency { get; set; }
        public string note { get; set; }

        public string Status { get; set; }

        //[Obsolete("Property Status should be used instead.")]
        //[Browsable(false)]
        //[EditorBrowsable(EditorBrowsableState.Never)]
        //[BsonElement("Status")]
        //public string StatusKey
        //{
        //    get { return Status?.Key; }
        //    set
        //    {
        //        var status = (value == null || value == "Not Set") ? PatientMedicationsStatusEnum.NotSet : KeyedEnumeration.FromKey<PatientMedicationsStatusEnum>(value);
        //        if (status != null)
        //            Status = status;
        //    }
        //}

        //[NotMapped]
        //[JsonIgnore]
        //[BsonIgnore]
        //public PatientMedicationsStatusEnum Status { get; set; }
    }
}
