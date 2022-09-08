import { medicationQ } from './../gqlQueries';
import { medicationsQ } from "app/blocks/graphql/gqlQueries";
import { AppUtils } from 'app/blocks/utils';
import { CreateMedicationMutation } from '../generated/gqlServices';
import cloneDeep from 'lodash/cloneDeep';

export class createMedicationGqlCallback {

    public static optimisticResponse(variables):CreateMedicationMutation  {
console.log(variables)
        // @ Random ID
        //variables.id = !variables.id ? AppUtils.GenerateObjectId() : variables.id

        const response = {
            __typename: "Mutation",
            createMedication: variables
        };
        return response as CreateMedicationMutation;
    }

    public static update(proxy, ev) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.createMedication === null)
            return;

        let medication = Object.assign({}, ev.data.createMedication)
        medication = cloneDeep(medication)

        proxy.writeQuery({ query: medicationQ, variables: { id: medication.id }, data: { medication: medication } });

    }

}
