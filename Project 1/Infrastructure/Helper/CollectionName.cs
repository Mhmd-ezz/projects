using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Helper
{
    [AttributeUsage(AttributeTargets.Class)]
    public class CollectionName : Attribute
    {
        public CollectionName(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("Empty collectionname not allowed", nameof(value));
            Name = value;
        }

        public virtual string Name { get; private set; }
    }
}
