import { patientQ, patientsQ } from 'app/blocks/graphql/gqlQueries';
import cloneDeep from 'lodash/cloneDeep';
import { Patient, GeneralCondition, CreateGeneralConditionMutation } from '../generated/gqlServices';

export class createGeneralConditionGqlCallback {
    public static optimisticResponse(variables): CreateGeneralConditionMutation  {

        const response = {
            __typename: "Mutation",
            createGeneralCondition: variables
        };
        return response as CreateGeneralConditionMutation ;
    }
    public static update(proxy, ev, patientId) {
        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.createGeneralCondition === null)
            return;

        let condition: GeneralCondition = Object.assign({}, ev.data.createGeneralCondition)

        // @ update general condition in patient query
        const { patient } = proxy.readQuery({ query: patientQ, variables: { id: patientId } });
        let loadedpatient: Patient = patient
        loadedpatient = cloneDeep(patient)
        
        let index = loadedpatient.patientInfo.specialities?.general.conditions.findIndex(obj => obj.id == condition.id)

        if (index == -1) {
            loadedpatient.patientInfo.specialities.general.conditions.push(condition)
            loadedpatient.patientInfo.lastSeen = condition.opened ? condition.opened : new Date();
            proxy.writeQuery({ query: patientQ, variables: { id: patientId }, data: { patient: loadedpatient } });
        }


    }
}
