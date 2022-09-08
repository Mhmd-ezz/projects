using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Medcilia.Clinic.Infrastructure;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Enums;
using Medcilia.Clinic.Infrastructure.Repository.Patient;
using Medcilia.Clinic.WebApi.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace Medcilia.Clinic.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class PatientsController : Controller
    {
        private readonly IUnitOfWork _uow;
        private readonly IContactRepository _contactRepository;

        public PatientsController(IUnitOfWork uow, IContactRepository patientRepository)
        {
            _uow = uow;
            _contactRepository = patientRepository;
        }
        [NoCache]
        [HttpGet]
        public async Task<IEnumerable<string>> Get()
        {
            var products = _contactRepository.AsQueryable().ToArray();
            return products.Select(x => x.Name).ToArray(); // new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
            var patient = new Contact
            {
                Name = value,
            };
            patient = _contactRepository.Add(patient);

        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
