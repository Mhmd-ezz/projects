using System;
using System.Collections.Generic;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class ContactModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public string Telephone { get; set; }
        public string[] ContactNumbers { get; set; }
        public DateTime BirthDate { get; set; }
        public string Occupation { get; set; }
        public string Partner { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string IdentityNumber { get; set; }
        public string Email { get; set; }
        public string ContactType { get; set; }
        public bool IsDuplicate { get; set; }

        public DateTime? CreatedOn { get; set; }
        public DateTime? Modified { get; set; }


        public PatientModel PatientInfo { get; set; }
    }
}
