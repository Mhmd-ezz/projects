import { patientQ, patientsQ } from 'app/blocks/graphql/gqlQueries';
import cloneDeep from 'lodash/cloneDeep';
import { Patient, CardiologyCondition, CreateCardiologyConditionMutation } from '../generated/gqlServices';

export class createCardiologyConditionGqlCallback {
    public static optimisticResponse(variables):CreateCardiologyConditionMutation {

        const response = {
            __typename: "Mutation",
            createCardiologyCondition: variables
        };
        return response as CreateCardiologyConditionMutation ;
    }
    public static update(proxy, ev, patientId) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.createCardiologyCondition === null)
            return;

        let condition: CardiologyCondition = Object.assign({}, ev.data.createCardiologyCondition)

        // @ update Cardiology condition in patient query
        const { patient } = proxy.readQuery({ query: patientQ, variables: { id: patientId } });
        let loadedpatient: Patient = patient
        loadedpatient = cloneDeep(patient)
        
        let index = loadedpatient.patientInfo.specialities.cardiology.conditions.findIndex(obj => obj.id == condition.id)

        if (index == -1) {
            loadedpatient.patientInfo.specialities.cardiology.conditions.push(condition)
            loadedpatient.patientInfo.lastSeen = condition.opened ? condition.opened : new Date();
            proxy.writeQuery({ query: patientQ, variables: { id: patientId }, data: { patient: loadedpatient } });
        }
    }
}
