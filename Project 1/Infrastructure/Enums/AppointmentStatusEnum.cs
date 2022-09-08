using System;
using System.Collections.Generic;
using System.Text;
using Medcilia.Clinic.Common.Enumerations;

namespace Medcilia.Clinic.Infrastructure.Enums
{
    public class AppointmentStatusEnum : LocalizedKeyedEnumeration
    {
        public static AppointmentStatusEnum NotSet = new AppointmentStatusEnum(-1, "", "Not Set", "غير محدد");
        // @ Puts the patient on the medic's wait list
        public static AppointmentStatusEnum CheckedIn = new AppointmentStatusEnum(10, "checked in", "checked in", "متواجد");
        // @ Means that the patient is consulted by the medic
        public static AppointmentStatusEnum Admitted = new AppointmentStatusEnum(20, "admitted", "admitted", "ابتداء");
        // @ Means that a checked in or admitted patient leaves the clinic 
        public static AppointmentStatusEnum CheckedOut = new AppointmentStatusEnum(30, "checked out", "checked out", "انتهاء");
        // @ The patient canceled the appointment
        public static AppointmentStatusEnum Canceled = new AppointmentStatusEnum(40, "canceled", "canceled", "الغي");
        // @ Doctor canceled the appointment for some reason
        public static AppointmentStatusEnum Interrupted = new AppointmentStatusEnum(50, "interrupted", "interrupted", "وسيط");
        public static AppointmentStatusEnum Paused = new AppointmentStatusEnum(60, "paused", "paused", "انتظار");
        public static AppointmentStatusEnum Delayed = new AppointmentStatusEnum(70, "delayed", "delayed", "تأجل");
        // @ The patient did not show, without notifying the clinic
        public static AppointmentStatusEnum noShow = new AppointmentStatusEnum(80, "no show", "no show", "تأجل");

        public AppointmentStatusEnum()
        {
        }

        public AppointmentStatusEnum(int value, string displayName)
            : base(value, displayName)
        {
        }

        public AppointmentStatusEnum(int value, string key, params string[] displayNames)
            : base(value, key, displayNames)
        {
        }

        protected override void SetCultures()
        {
            _supportedCultures = new[] { "en", "ar" };
        }
    }
}
