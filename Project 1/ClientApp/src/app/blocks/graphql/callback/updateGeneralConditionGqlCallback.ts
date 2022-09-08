import { getApolloClient } from './../graphql.service';
import { Patient, UpdateGeneralConditionMutation } from '../generated/gqlServices';
import { patientQ } from './../gqlQueries';
import { conditionalExpression } from 'babel-types';
import cloneDeep from 'lodash/fp/cloneDeep';
export class updateGeneralConditionGqlCallback {
    public static optimisticResponse(variables): UpdateGeneralConditionMutation {

        const response = {
            __typename: "Mutation",
            updateGeneralCondition: variables
        };
        return response as UpdateGeneralConditionMutation;
    }
    public static update(proxy, ev, patientId) {

        const client = getApolloClient()

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.updateGeneralCondition === null)
            return;

        let condition = Object.assign({}, ev.data.updateGeneralCondition)
        condition.__typename = 'GeneralCondition'

        // @ update general condition in patient query
        const p = proxy.readQuery({ query: patientQ, variables: { id: patientId } });
        const { patient } = proxy.readQuery({ query: patientQ, variables: { id: patientId } });
        let loadedpatient: Patient = Object.assign({}, patient)
        loadedpatient = cloneDeep(patient)

        let index = loadedpatient.patientInfo.specialities?.general.conditions.findIndex(obj => obj.id == condition.id)
        if (index > -1) {
            loadedpatient.patientInfo.specialities.general.conditions[index] = condition
            proxy.writeQuery({ query: patientQ, variables: { id: patientId }, data: { patient: loadedpatient } });
        }
    }
}
