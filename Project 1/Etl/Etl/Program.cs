using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Etl.Processes;

namespace Etl
{
    class Program
    {
        static void Main(string[] args)
        {
            Run();
        }

        public static void Run()
        {
            Console.WriteLine("Running ETL ...");

            try
            {
                //@ Create patients before SpecialityProcess
                using (var process = new PatientsProcess())
                {
                    Console.WriteLine("Patients Process Started ...");
                    process.Execute();
                }

                // @ JoinPatient (Insert/Update) will be triggered on each Followup/Operation (Read Form Source)
                // @ While each process will read target and source once per execute
                // @ Then this process depends on PatientsProcess to create patients and avoid duplication
                using (var process = new SpecialityProcess())
                {
                    Console.WriteLine("Speciality Process Started ...");
                    process.Execute();
                }

                using (var process = new ImagesProcess())
                {
                    Console.WriteLine("Images Process Started ...");
                    process.Execute();
                }

            }
            catch (Exception ex)
            {
                //your error handler here
                Console.WriteLine(ex.Demystify().ToString());
            }

            Console.WriteLine("Complete");
        }


    }
}
