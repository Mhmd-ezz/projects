using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medcilia.Clinic.WebApi.Models
{
    public class TenantModel
    {
        public string Id { get; set; }
        public string Name { get; set; }

        public string Status { get; set; }
        public int UsersCount { get; set; }
        public string CreatedDate { get; set; }

        public string ContactName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public UserModel CurrentUser { get; set; }
        public TupleModel Speciality { get; set; }

    }
}
