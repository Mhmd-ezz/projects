import { InMemoryDbService } from 'angular-in-memory-web-api';

import { MedicationFakeDb } from 'app/fake-db/medication';

export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {
          // Medication
            'medication': MedicationFakeDb.medication,           
        };
    }
}
