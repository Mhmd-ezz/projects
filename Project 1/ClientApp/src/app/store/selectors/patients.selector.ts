import { createSelector } from '@ngrx/store';
import * as fromPatients from '../reducers/patients.reducer';
import { AppState } from '@appStore/reducers';

export const getPatientsState = (state: AppState) => state.patients;

export const patientsSelector = createSelector(getPatientsState, fromPatients.getPatients);
export const patientsTotalSelector = createSelector(getPatientsState, fromPatients.getPatientsTotal);
export const patientLoaded = createSelector(getPatientsState, fromPatients.getPatientLoaded);
//export const patientsSearchSelector = createSelector(getPatientsState, fromPatients.getPatientsSearch);
export const patientsSearchMdcBarSelector = createSelector(getPatientsState, fromPatients.getPatientsMdcBarSearch);
export const selectedPatientSelector = createSelector(getPatientsState, fromPatients.getSelectedPatient);

export const updatePatientSelector = createSelector(getPatientsState, fromPatients.getUpdatedPatient);
// export const updatePatientLocallySelector = createSelector(getPatientsState, fromPatients.getUpdatedPatientLocally)
// export const updatePatientFailureSelector = createSelector(getPatientsState, fromPatients.getUpdatedPatientFailure)


export const createPatientSelector = createSelector(getPatientsState, fromPatients.getCreatedPatient);
// export const createPatientLocallySelector = createSelector(getPatientsState, fromPatients.getCreatedPatientLocally)
// export const createPatientFailureSelector = createSelector(getPatientsState, fromPatients.getCreatedPatientFailure)


// export const deletePatientLocallySelector = createSelector(getPatientsState, fromPatients.getDeletedPatientLocally)
export const deletePatientSelector = createSelector(getPatientsState, fromPatients.getDeletedPatient);
// export const deletePatientFailureSelector = createSelector(getPatientsState, fromPatients.getDeletedPatientFailure)
// export const deletePatientLocally = createSelector(getPatientsState, fromPatients.getDeletedPatientLocally)


export const duplicatePatientSelector = createSelector(getPatientsState, fromPatients.getDuplicatPatient);
// export const duplicatePatientFailureSelector = createSelector(getPatientsState, fromPatients.getDuplicatePatientFailure)
export const duplicatePatientLocally = createSelector(getPatientsState, fromPatients.getDuplicatePatientLocally);


export const patientSavedLocallySelector = createSelector(getPatientsState, fromPatients.getpatientSavedLocally);

export const error = createSelector(getPatientsState, fromPatients.getError);

export const Grantors = createSelector(getPatientsState, fromPatients.getGrantors);
export const Tags = createSelector(getPatientsState, fromPatients.getTags);
export const Locations = createSelector(getPatientsState, fromPatients.getLocations);


export const mediaFiles = createSelector(getPatientsState, fromPatients.getMediaFiles);
export const deletemediaFiles = createSelector(getPatientsState, fromPatients.getDeletedMediaFiles);
export const updateMediaFiles = createSelector(getPatientsState, fromPatients.getUpdatedMediaFiles);

export const mediaPoolFiles = createSelector(getPatientsState, fromPatients.getMediaPoolFiles);

// -------------------------
//       GENERAL
// -------------------------

export const createGeneralCondition = createSelector(getPatientsState, fromPatients.getCreatedGeneralCondtion);
export const updateGeneralCondition = createSelector(getPatientsState, fromPatients.getUpdatedGeneralCondtion);
// (state, props?) => {
//     return (state.updateGeneralCondition && state.updateGeneralCondition.id == props.id) || !props ? state.updateGeneralCondition : null;
// }

export const UpdateGeneralMedicalHistory = createSelector(getPatientsState, fromPatients.getUpdateGeneralMedicalHistory);
// export const UpdateGeneralMedicalHistoryFailue = createSelector(getPatientsState, fromPatients.getUpdateGeneralMedicalHistoryFailue)

export const createGeneralOperation = createSelector(getPatientsState, fromPatients.getCreatedGeneralOperation);
export const updateGeneralOperation = createSelector(getPatientsState, fromPatients.getUpdatedGeneralOperation);

export const createGeneralFollowup = createSelector(getPatientsState, fromPatients.getCreatedGeneralFollowup);
export const updateGeneralFollowup = createSelector(getPatientsState, fromPatients.getUpdatedGeneralFollowup);

// ----------------------------
//       CARDIOLOGY
// ----------------------------
export const createCardiologyCondition = createSelector(getPatientsState, fromPatients.getCreatedCardiologyCondtion);
export const updateCardiologyCondition = createSelector(getPatientsState, fromPatients.getUpdatedCardiologyCondtion);

export const UpdateCardiologyMedicalHistory = createSelector(getPatientsState, fromPatients.getUpdateCardiologyMedicalHistory);
// export const UpdateCardiologyMedicalHistoryFailue = createSelector(getPatientsState, fromPatients.getUpdateCardiologyMedicalHistoryFailue)

export const createCardiologyOperation = createSelector(getPatientsState, fromPatients.getCreatedCardiologyOperation);
export const updateCardiologyOperation = createSelector(getPatientsState, fromPatients.getUpdatedCardiologyOperation);

export const createCardiologyFollowup = createSelector(getPatientsState, fromPatients.getCreatedCardiologyFollowup);
export const updateCardiologyFollowup = createSelector(getPatientsState, fromPatients.getUpdatedCardiologyFollowup);

// ----------------------------
//       MEDICATIONS
// ----------------------------
export const medications = createSelector(getPatientsState, fromPatients.getMedications);
export const medicationsByCondition = createSelector(getPatientsState, fromPatients.getMedicationsByCondition);
export const medicationsByFollowup = createSelector(getPatientsState, fromPatients.getMedicationsByFollowup);

export const medicationSavedLocallySelector = createSelector(getPatientsState, fromPatients.getMedicationSavedLocally);


// ----------------------------
//       DRUGS
// ----------------------------

export const drugs = createSelector(getPatientsState, fromPatients.getDrugs);

export const drugSavedLocallySelector = createSelector(getPatientsState, fromPatients.getDrugSavedLocally);
