import cloneDeep from 'lodash/cloneDeep';
import { Patient, UpdateGeneralMedicalHistoryMutation } from '../generated/gqlServices';
import { patientQ } from './../gqlQueries';

export class updateGeneralMedicalHistoryGqlCallback {
    public static optimisticResponse(variables):UpdateGeneralMedicalHistoryMutation  {

        const response = {
            __typename: "Mutation",
            updateGeneralMedicalHistory: variables
        };
        return response as  UpdateGeneralMedicalHistoryMutation ;
    }
    public static update(proxy, ev, patientId) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.updateGeneralMedicalHistory === null)
            return;

        let medicalHistory = Object.assign({}, ev.data.updateGeneralMedicalHistory)

        // @ update general medical history in patient query
        const { patient } = proxy.readQuery({ query: patientQ, variables: { id: patientId } });
        let loadedpatient: Patient = patient
        loadedpatient = cloneDeep(patient)

        loadedpatient.patientInfo.specialities.general.medicalHistory = medicalHistory

        proxy.writeQuery({ query: patientQ, variables: { id: patientId }, data: { patient: loadedpatient } });

    }
}
