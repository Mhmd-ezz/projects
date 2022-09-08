import cloneDeep from 'lodash/cloneDeep';
import { GeneralCondition, Patient, UpdateGeneralFollowupMutation } from './../generated/gqlServices';
import { patientQ } from './../gqlQueries';

export class updateGeneralFollowupGqlCallback {

    public static optimisticResponse(variables):UpdateGeneralFollowupMutation  {
        const response = {
            __typename: "Mutation",
            updateGeneralFollowup: variables
        };
        return response as UpdateGeneralFollowupMutation ;
    }

    public static update(proxy, ev, patientId, conditionId, replacedConditionId) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.updateGeneralFollowup === null)
            return;

        let followup = Object.assign({}, ev.data.updateGeneralFollowup)

        // @ update general followup in patient query
        const { patient } = proxy.readQuery({ query: patientQ, variables: { id: patientId } });
        let loadedpatient: Patient = patient
        loadedpatient = cloneDeep(patient)

        let result: Patient = this.handleFollowupUpdates(loadedpatient, followup, patientId, conditionId, replacedConditionId)
        if (result)
            proxy.writeQuery({ query: patientQ, variables: { id: patientId }, data: { patient: result } });

    }

    /**
    * 
    * 
    * @param {any} loadedpatient 
    * @param {any} followup 
    * @param {any} patientId 
    * @param {any} conditionId 
    * @param {any} replacedConditionId 
    * @returns {(Patient | null)} 
    * 
    * @memberOf updateGeneralFollowupGqlCallback
    */
    public static handleFollowupUpdates(loadedpatient: Patient, followup, patientId, conditionId, replacedConditionId): Patient | null {
        // @ when follow condition is changed, the followup should be pushed to the new condition
        // @ and removed from the old condition
        if (replacedConditionId && replacedConditionId != conditionId) {

            // @ push followup to the new selected condition
            let _condition: GeneralCondition = loadedpatient.patientInfo.specialities.general.conditions.find((obj) => obj.id === conditionId)
            if (_condition) {
                let idx = _condition.activities.followups.findIndex((obj) => obj.id === followup.id)
                if (idx === -1)
                    _condition.activities.followups.push(followup)

                // @ remove the followup from the previous selected condition
                let _replacedCondition: GeneralCondition = loadedpatient.patientInfo.specialities.general.conditions.find((obj) => obj.id === replacedConditionId)
                if (_replacedCondition) {
                    _replacedCondition.activities.followups = _replacedCondition.activities.followups.filter((obj) => obj.id != followup.id)
                    return loadedpatient
                    // proxy.writeQuery({ query: patientQ, variables: { id: patientId }, data: { patient: loadedpatient } });
                }
            }
        } else {
            // @ Normal update condition not changed
            let _condition: GeneralCondition = loadedpatient.patientInfo.specialities.general.conditions.find((obj) => obj.id === conditionId)
            if (_condition) {
                let _followup = _condition.activities.followups.find((obj) => obj.id === followup.id)
                if (_followup) {
                    _followup = followup
                    return loadedpatient
                    // proxy.writeQuery({ query: patientQ, variables: { id: patientId }, data: { patient: loadedpatient } });
                }
            }
        }
        return null
    }
}
