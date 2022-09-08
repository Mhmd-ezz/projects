using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Linq;
using Medcilia.Clinic.Common.Dates;
using Medcilia.Clinic.Common.Extensions;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Helper;

namespace Medcilia.Clinic.Infrastructure.Services.Lookups
{
    [CollectionName("Lookups")]
    public class LookUp : TenantedEntity, IEquatable<LookUp>
    {
        public string GroupKey { get; set; }

        public string Value { get; set; }

        public string Symbol { get; set; }
        public bool Visible { get; set; }

        public bool Predefined { get; set; }

        [StringLength(500)]
        public string Text { get; set; }

        [StringLength(255)]
        public string Description { get; set; }

        [StringLength(10)]
        public string CultureName { get; set; }

        public string ParentValue { get; set; }
        public Guid? ParentId { get; set; }

        [DefaultValue(-1)]
        public int? Order { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        private IList<LookUp> _children;

        public LookUp()
        {
            _children = new List<LookUp>();
            CreatedDate = DomainTime.Now();
            ModifiedDate = DomainTime.Now();
            Text = string.Empty;
            Value = string.Empty;
            Symbol = string.Empty;
            Description = string.Empty;
            Order = -1;
        }


        public LookUp(string value, string text, string symbol, string description, int order, CultureInfo culture)
            : this()
        {
            Value = value;
            Text = text;
            Symbol = symbol;
            Description = description;
            Order = order;
            Culture = culture ?? System.Threading.Thread.CurrentThread.CurrentCulture;
        }
        public LookUp(string value, string text)
            : this(value, text, value, "", 0, null)
        {
        }

        #region Implementation of IEquatable<LookUp>
        public override bool Equals(Object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != typeof(LookUp)) return false;
            return Equals((LookUp)obj);
        }

        public bool Equals(LookUp other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;

            return this.Id.Equals(other.Id);
        }

        public override Int32 GetHashCode()
        {
            return 2016120610 ^ this.Id.GetHashCode();
        }

        #endregion


        [NotMapped]
        public virtual CultureInfo Culture
        {
            get
            {
                return string.IsNullOrEmpty(CultureName) ? null : new CultureInfo(CultureName);
            }
            set { CultureName = value?.Name; }
        }
        public virtual LookUp Parent { get; set; }

        public virtual IList<LookUp> Children
        {
            get { return _children; }
            set { _children = value; }
        }

        [NotMapped]
        public LookUp[] Ancestors
        {
            get; set;
        }

        [NotMapped]
        public string AncestorsPath
        {
            get
            {
                return Ancestors == null ? "" : string.Join("، ", Ancestors.Select(x => x.Text).ToArray());
            }
        }

        [NotMapped]
        public string AncestorsReversePath
        {
            get
            {
                return Ancestors == null ? "" : string.Join("، ", Ancestors.Reverse().Select(x => x.Text).ToArray());
            }
        }

        //public virtual LookUpValue ToLookupValue()
        //{
        //    return new LookUpValue(Value, Symbol, Text, Visible);
        //}

        public override string ToString()
        {
            return $"Group:{GroupKey}, Text:{Text}";
        }


        public string[] GetAllChildValues()
        {
            var ids = new List<string>();
            ids.Add(this.Value);
            ids.AddRange(this.Children.Select(x => x.Value).ToList());
            ids.AddRange(this.Children
                .SelectManyRecursive(y => y.Children)
                .Select(x => x.Value).ToList());

            return ids.ToArray();
        }
    }
}
