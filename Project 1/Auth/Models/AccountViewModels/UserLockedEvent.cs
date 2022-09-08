using IdentityServer4.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Models.AccountViewModels
{
    public class UserLockedEvent : Event
    {
        public UserLockedEvent(string category, string name, EventTypes type, int id, string message = null) : base(category, name, type, id, message)
        {
        }
        public UserLockedEvent(string name, int id, string message = null) : this("UserLocked", name, EventTypes.Information, id, message)
        {
        }
        public UserLockedEvent(string message = null) : this("", -1, message)
        {
        }
    }
}
