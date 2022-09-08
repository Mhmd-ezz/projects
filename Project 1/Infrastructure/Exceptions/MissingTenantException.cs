using System;
using System.Collections.Generic;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Exceptions
{
    public class MissingTenantException : Exception
    {
        public MissingTenantException() : base() { }
        public MissingTenantException(string message) : base(message) { }
        public MissingTenantException(string message, Exception exception) : base(message, exception) { }
    }
}
