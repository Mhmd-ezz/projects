using System;

namespace Medcilia.Clinic.WebApi.GraphQL.Models
{
    public class LookupModel
    {
        public string Id { get; set; }
        public string TenantId { get; set; }
        public string GroupKey { get; set; }
        public string Value { get; set; }
        public string Symbol { get; set; }
        public bool? Predefined { get; set; }
        public string Text { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string Description { get; set; }
        public string CultureName{ get; set; }
        public string ParentValue { get; set; }
        public string ParentId { get; set; }
        public int Order { get; set; }
        //public LookUp[] Children { get; set; }
    }
}
