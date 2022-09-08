import { medicationQ, medicationsQ } from '../gqlQueries';
import findIndex from 'lodash/findIndex';
import { UpdateMedicationsMutation } from '../generated/gqlServices';

export class updateMedicationGqlCallback {
    public static optimisticResponse(variables): UpdateMedicationsMutation  {

        const response = {
            __typename: "Mutation",
            updateMedications: variables
        };
        return response as UpdateMedicationsMutation ;
    }
    public static update(proxy, ev) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.updateMedications === null)
            return;

        let medication = Object.assign({}, ev.data.updateMedications)

        // @ update drug query
        proxy.writeQuery({ query: medicationQ, variables: { id: medication.id }, data: { medication: medication } });

    }
}
