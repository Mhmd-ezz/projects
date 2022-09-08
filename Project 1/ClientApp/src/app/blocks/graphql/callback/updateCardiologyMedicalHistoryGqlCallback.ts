import cloneDeep from 'lodash/cloneDeep';
import { Patient, UpdateCardiologyMedicalHistoryMutation } from '../generated/gqlServices';
import { patientQ } from './../gqlQueries';

export class updateCardiologyMedicalHistoryGqlCallback {
    public static optimisticResponse(variables):UpdateCardiologyMedicalHistoryMutation  {

        const response = {
            __typename: "Mutation",
            updateCardiologyMedicalHistory: variables
        };
        return response as UpdateCardiologyMedicalHistoryMutation ;
    }
    public static update(proxy, ev, patientId) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.updateCardiologyMedicalHistory === null)
            return;

        let medicalHistory = Object.assign({}, ev.data.updateCardiologyMedicalHistory)

        // @ update cardiology medical history in patient query
        const { patient } = proxy.readQuery({ query: patientQ, variables: { id: patientId } });
        let loadedpatient: Patient = patient
        loadedpatient = cloneDeep(patient)

        loadedpatient.patientInfo.specialities.cardiology.medicalHistory = medicalHistory

        proxy.writeQuery({ query: patientQ, variables: { id: patientId }, data: { patient: loadedpatient } });

    }
}
