import { patientQ } from 'app/blocks/graphql/gqlQueries';
import cloneDeep from 'lodash/cloneDeep';
import { CreateGeneralFollowupMutation, GeneralCondition, Patient } from '../generated/gqlServices';
import { GeneralFollowup } from './../generated/gqlServices';

export class createGeneralFollowupGqlCallback {
    public static optimisticResponse(variables): CreateGeneralFollowupMutation  {

        const response = {
            __typename: "Mutation",
            createGeneralFollowup: variables
        };
        return response as CreateGeneralFollowupMutation ;
    }
    public static update(proxy, ev, patientId, conditionId) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.createGeneralFollowup === null)
            return;

        let followup: GeneralFollowup = Object.assign({}, ev.data.createGeneralFollowup)

        // @ patient by id
        const { patient } = proxy.readQuery({ query: patientQ, variables: { id: patientId } });
        let loadedpatient: Patient = patient
        loadedpatient = cloneDeep(patient)

        let _condition: GeneralCondition = loadedpatient.patientInfo.specialities.general.conditions.find((obj) => obj.id === conditionId)
        if (_condition) {           
            _condition.activities.followups.push(followup)
            loadedpatient.patientInfo.lastSeen = followup.opened ? followup.opened : new Date();
            proxy.writeQuery({ query: patientQ, variables: { id: patientId }, data: { patient: loadedpatient } });
        }


    }
}
