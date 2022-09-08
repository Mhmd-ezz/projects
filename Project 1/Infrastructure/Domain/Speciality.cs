using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Medcilia.Clinic.Infrastructure.Domain
{
    public class Speciality
    {
        // @ REMARK ADDED FOR ETL PURPOSE
        public Speciality()
        {
            General = new General();
            Cardiology = new Cardiology();
        }        

        public General General { get; set; }
        public Cardiology Cardiology { get; set; }
        //public Obstetric Obstetric { get; set; }

    }

}
