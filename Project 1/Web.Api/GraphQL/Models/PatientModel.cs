using System;
using System.Collections.Generic;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class PatientModel
    {
        public DateTime? EntryDate { get; set; }
        public DateTime? LastSeen { get; set; }
        public string MaritalStatus { get; set; }
        public List<string> Referral { get; set; }
        public string EmergancyContact { get; set; }
        public string FileNumber { get; set; }
        public string BloodType { get; set; }
        public int TotalDigitizedData { get; set; }
        public GrantorModel[] Grantors { get; set; }
        public TodoModel[] Todos { get; set; }
        public TagModel[] Tags { get; set; }
        public MediaRootModel MediaFiles { get; set; }
        public string[] Flags { get; set; }
        public SpecialityModel Specialities { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? Modified { get; set; }
    }
}
