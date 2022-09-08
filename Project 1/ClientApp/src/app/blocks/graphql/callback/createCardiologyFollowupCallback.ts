import { patientQ } from 'app/blocks/graphql/gqlQueries';
import cloneDeep from 'lodash/cloneDeep';
import { CardiologyCondition, CreateCardiologyFollowupMutation, Patient } from '../generated/gqlServices';
import { CardiologyFollowup } from './../generated/gqlServices';

export class createCardiologyFollowupGqlCallback {
    public static optimisticResponse(variables): CreateCardiologyFollowupMutation  {

        const response = {
            __typename: "Mutation",
            createCardiologyFollowup: variables
        };
        return response as CreateCardiologyFollowupMutation ;
    }
    public static update(proxy, ev, patientId, conditionId) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.createCardiologyFollowup === null)
            return;

        let followup: CardiologyFollowup = Object.assign({}, ev.data.createCardiologyFollowup)

        // @ patient by id
        const { patient } = proxy.readQuery({ query: patientQ, variables: { id: patientId } });
        let loadedpatient: Patient = patient
        loadedpatient = cloneDeep(patient)

        let _condition: CardiologyCondition = loadedpatient.patientInfo.specialities.cardiology.conditions.find((obj) => obj.id === conditionId)
        if (_condition) {
            _condition.activities.followups.push(followup)
            loadedpatient.patientInfo.lastSeen = followup.opened ? followup.opened : new Date();
            proxy.writeQuery({ query: patientQ, variables: { id: patientId }, data: { patient: loadedpatient } });
        }


    }
}
