using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Exceptions
{
    public class DuplicateEntryException : Exception
    {
        public DuplicateEntryException() : base() { }
        public DuplicateEntryException(string message) : base(message) { }
        public DuplicateEntryException(string message, Exception exc) : base(message, exc) { }
    }
}
