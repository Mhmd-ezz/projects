import { CreateGeneralOperationMutation, GeneralOperation } from './../generated/gqlServices';
import { patientQ } from 'app/blocks/graphql/gqlQueries';
import { Patient, GeneralCondition } from '../generated/gqlServices';
import cloneDeep from 'lodash/cloneDeep';

export class createGeneralOperationGqlCallback {
    public static optimisticResponse(variables): CreateGeneralOperationMutation {

        const response = {
            __typename: "Mutation",
            createGeneralOperation: variables
        };
        return response as CreateGeneralOperationMutation;
    }
    public static update(proxy, ev, patientId, conditionId) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.createGeneralOperation === null)
            return;

        let operation: GeneralOperation = Object.assign({}, ev.data.createGeneralOperation)

        // @ patient by id
        const { patient } = proxy.readQuery({ query: patientQ, variables: { id: patientId } });
        let loadedpatient: Patient = patient
        loadedpatient = cloneDeep(patient)

        let _condition: GeneralCondition = loadedpatient.patientInfo.specialities.general.conditions.find((obj) => obj.id === conditionId)
        if (_condition) {
            _condition.activities.operations.push(operation)
            loadedpatient.patientInfo.lastSeen = operation.opened ? operation.opened : new Date();
            proxy.writeQuery({ query: patientQ, variables: { id: patientId }, data: { patient: loadedpatient } });
        }


    }
}
