import cloneDeep from 'lodash/cloneDeep';
import { GeneralCondition, Patient, UpdateGeneralOperationMutation } from './../generated/gqlServices';
import { patientQ } from './../gqlQueries';

export class updateGeneralOperationGqlCallback {

    public static optimisticResponse(variables):UpdateGeneralOperationMutation  {
        const response = {
            __typename: "Mutation",
            updateGeneralOperation: variables
        };
        return response as UpdateGeneralOperationMutation ;
    }

    public static update(proxy, ev, patientId, conditionId, replacedConditionId) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.updateGeneralOperation === null)
            return;

        let operation = Object.assign({}, ev.data.updateGeneralOperation)

        // @ update general operation in patient query
        const { patient } = proxy.readQuery({ query: patientQ, variables: { id: patientId } });
        let loadedpatient: Patient = patient
        loadedpatient = cloneDeep(patient)

        let result: Patient = this.handleOperationUpdates(loadedpatient, operation, conditionId, replacedConditionId)
        if (result)
            proxy.writeQuery({ query: patientQ, variables: { id: patientId }, data: { patient: result } });        
    }

    /**
     * 
     * 
     * @static
     * @param {any} loadedpatient 
     * @param {any} operation 
     * @param {any} patientId 
     * @param {any} conditionId 
     * @param {any} replacedConditionId 
     * @returns {(Patient | null)} 
     * 
     * @memberOf updateGeneralOperationGqlCallback
     */
    public static handleOperationUpdates(loadedpatient:Patient, operation, conditionId, replacedConditionId): Patient | null {
        // @ when operation condition is changed, the operation should be pushed to the new condition
        // @ and removed from the old condition
        if (replacedConditionId && replacedConditionId != conditionId) {

            // @ push operation to the new selected condition
            let _condition: GeneralCondition = loadedpatient.patientInfo.specialities.general.conditions.find((obj) => obj.id === conditionId)
            if (_condition) {
                let idx = _condition.activities.operations.findIndex((obj) => obj.id === operation.id)
                if (idx === -1)
                    _condition.activities.operations.push(operation)

                // @ remove the _operation from the previous selected condition
                let _replacedCondition: GeneralCondition = loadedpatient.patientInfo.specialities.general.conditions.find((obj) => obj.id === replacedConditionId)
                if (_replacedCondition) {
                    _replacedCondition.activities.operations = _replacedCondition.activities.operations.filter((obj) => obj.id != operation.id)
                    return loadedpatient
                    // proxy.writeQuery({ query: patientQ, variables: { id: patientId }, data: { patient: loadedpatient } });
                }
            }
        } else {
            // @ Normal update, condition not changed
            let _condition: GeneralCondition = loadedpatient.patientInfo.specialities.general.conditions.find((obj) => obj.id === conditionId)
            if (_condition) {
                let _operation = _condition.activities.operations.find((obj) => obj.id === operation.id)
                if (_operation) {
                    _operation = operation
                    return loadedpatient
                    // proxy.writeQuery({ query: patientQ, variables: { id: patientId }, data: { patient: loadedpatient } });
                }
            }
        }
        return null
    }
}
