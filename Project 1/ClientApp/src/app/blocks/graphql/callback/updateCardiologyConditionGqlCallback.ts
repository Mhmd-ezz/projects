import { Patient, UpdateCardiologyConditionMutation } from '../generated/gqlServices';
import { patientQ } from './../gqlQueries';
import { conditionalExpression } from 'babel-types';
import cloneDeep from 'lodash/fp/cloneDeep';

export class updateCardiologyConditionGqlCallback {
    public static optimisticResponse(variables): UpdateCardiologyConditionMutation  {

        const response = {
            __typename: "Mutation",
            updateCardiologyCondition: variables
        };
        return response as UpdateCardiologyConditionMutation ;
    }
    public static update(proxy, ev, patientId) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.updateCardiologyCondition === null)
            return;

        let condition = Object.assign({}, ev.data.updateCardiologyCondition)

        // @ update Cardiology condition in patient query
        const { patient } = proxy.readQuery({ query: patientQ, variables: { id: patientId } });
        let loadedpatient: Patient = Object.assign({}, patient)
        loadedpatient = cloneDeep(patient)

        let index = loadedpatient.patientInfo.specialities.cardiology.conditions.findIndex(obj => obj.id == condition.id)
        if (index > -1) {
            loadedpatient.patientInfo.specialities.cardiology.conditions[index] = condition
            proxy.writeQuery({ query: patientQ, variables: { id: patientId }, data: { patient: loadedpatient } });
        }
    }
}
