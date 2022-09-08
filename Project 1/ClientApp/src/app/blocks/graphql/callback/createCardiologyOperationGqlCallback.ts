import { CardiologyOperation, CreateCardiologyOperationMutation } from './../generated/gqlServices';
import { patientQ } from 'app/blocks/graphql/gqlQueries';
import { Patient, CardiologyCondition } from '../generated/gqlServices';
import cloneDeep from 'lodash/cloneDeep';

export class createCardiologyOperationGqlCallback {
    public static optimisticResponse(variables): CreateCardiologyOperationMutation  {

        const response = {
            __typename: "Mutation",
            createCardiologyOperation: variables
        };
        return response as CreateCardiologyOperationMutation ;
    }
    public static update(proxy, ev, patientId, conditionId) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.createCardiologyOperation === null)
            return;

        let operation: CardiologyOperation = Object.assign({}, ev.data.createCardiologyOperation)

        // @ patient by id
        const { patient } = proxy.readQuery({ query: patientQ, variables: { id: patientId } });
        let loadedpatient: Patient = patient
        loadedpatient = cloneDeep(patient)

        let _condition: CardiologyCondition = loadedpatient.patientInfo.specialities.cardiology.conditions.find((obj) => obj.id === conditionId)
        if (_condition) {
            _condition.activities.operations.push(operation)
            loadedpatient.patientInfo.lastSeen = operation.opened ? operation.opened : new Date();
            proxy.writeQuery({ query: patientQ, variables: { id: patientId }, data: { patient: loadedpatient } });
        }


    }
}
