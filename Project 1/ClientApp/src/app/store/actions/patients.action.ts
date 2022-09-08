import { LocationBase } from './../../blocks/graphql/generated/bases';
import { PatientsParams } from '@appStore/model/patients-params';
import { createAction, props } from '@ngrx/store';
import { Patient,Grantor,MediaFile,MediaFileInput, PatientMedications, DrugInput, Tag, MessageInputType } from 'app/blocks/graphql/generated/gqlServices';
import { DrugInputBase, MediaFileBase,PatientBase, PatientMedicationsInputBase } from 'app/blocks/graphql/generated/bases';

import { GeneralMedicalHistoryInput, GeneralConditionInput} from 'app/blocks/graphql/generated/gqlServices';
import { CardiologyMedicalHistoryInput, CardiologyConditionInput} from 'app/blocks/graphql/generated/gqlServices';

import { GeneralConditionBase,GeneralOperationBase,GeneralFollowupBase } from 'app/blocks/graphql/generated/bases';
import { CardiologyConditionBase,CardiologyOperationBase,CardiologyFollowupBase,PatientMedicationsBase} from 'app/blocks/graphql/generated/bases';
import {Medication} from 'app/fake-db/medication.model';
import { PatientsSearchParams } from '@appStore/model/patients-search-params';
import { DrugsSearchParams } from '@appStore/model/drugs-search-params';
import { LightPatient } from 'app/blocks/models/LightPatient';

export const loadPatients = createAction('[Patients] Load Patients', props<{ variables: PatientsParams }>());
export const loadPatientsSuccess = createAction('[Patients] Load Patients Success', props<{ patients: LightPatient[], fromServer: boolean }>());
export const loadPatientsFailure = createAction('[Patients] Load Patients Failure', props<{ error: readonly any[] }>());


export const loadPatientsTotal = createAction('[Patients] Load Patients Total', props<{ variables: PatientsParams }>());
export const loadPatientsTotalSuccess = createAction('[Patients] Load Patients Total Success', props<{ total: number, fromServer: boolean }>());
export const loadPatientsTotalFailure = createAction('[Patients] Load Patients Total Failure', props<{ error: readonly any[] }>());

// export const loadPatientsSearch = createAction('[Patients] Load Patients Search', props<{ variables: PatientsSearchParams }>());
// export const loadPatientsSearchSuccess = createAction('[Patients] Load Patients Search Success', props<{ patientsSearch: Patient[] ,fromServer:boolean }>());
// export const loadPatientsSearchFailure = createAction('[Patients] Load Patients Search Failure', props<{ error:any}>());

export const loadPatientsMdcBarSearch = createAction('[Patients] Load Patients Mdc Bar Search', props<{ variables: PatientsSearchParams }>());
export const loadPatientsMdcBarSearchSuccess = createAction('[Patients] Load Patients Mdc Bar Search Success', props<{ patientsSearch: LightPatient[] , totalSearch: number,fromServer:boolean }>());
export const loadPatientsMdcBarSearchFailure = createAction('[Patients] Load Patients Mdc Bar Search Failure', props<{ error:any}>());


export const patientSavedLocally = createAction('[Patients] Patient Saved Locally');


export const loadPatient = createAction('[Patients] Load Patient', props<{ id: string }>());
export const loadPatientSuccess = createAction('[Patients] Load Patient Success', props<{ patient: Patient, fromServer: boolean }>());
export const loadPatientFailure = createAction('[Patients] Load Patient Failure', props<{ error: readonly any[] }>());




export const loadPatientBase = createAction('[Patients] Load Patient Base', props<{ id: string }>());
export const loadPatientBaseSuccess = createAction('[Patients] Load Patient Base Success', props<{ patient: PatientBase, fromServer: boolean }>());
export const loadPatientBaseFailure = createAction('[Patients] Load Patient Base Failure', props<{ error: readonly any[] }>());


export const createPatient = createAction('[Patients] Create Patient', props<{ patient: Patient }>());
export const createPatientSuccess = createAction('[Patients] Create Patient Success', props<{ patient: Patient }>());
export const createPatientFailure = createAction('[Patients] Create Patient Failure', props<{ error: readonly any[] }>());
//export const createPatientSavedLocally = createAction('[Patients] Update Patient Saved Locally');


export const updatePatient = createAction('[Patients] Update Patient', props<{ patient: Patient }>());
export const updatePatientSuccess = createAction('[Patients] Update Patient Success', props<{ patient: Patient }>());
export const updatePatientFailure = createAction('[Patients] Update Patient Failure', props<{ error: readonly any[] }>());
//export const updatePatientSavedLocally = createAction('[Patients] Update Patient Saved Locally');


export const deletePatient = createAction('[Patients] Delete Patient', props<{id: string  }>());
export const deletePatientSuccess = createAction('[Patients] Delete Patient Success', props<{ patient: any }>());
export const deletePatientFailure = createAction('[Patients] Delete Patient Failure', props<{ error: readonly any[] }>());
//export const deletePatientSavedLocally = createAction('[Patients] Delete Patient Saved Locally');


export const duplicatePatient = createAction('[Patients] Duplicate Patient', props<{id: string,isDuplicate: boolean  }>());
export const duplicatePatientSuccess = createAction('[Patients] Duplicate Patient Success', props<{ patient: Patient }>());
export const duplicatePatientFailure = createAction('[Patients] Duplicate Patient Failure', props<{ error: readonly any[] }>());
export const duplicatePatientSavedLocally = createAction('[Patients] Duplicate Patient Saved Locally');


export const loadGrantors = createAction('[Patients] Load Grantors');
export const loadGrantorsSuccess = createAction('[Patients] Load Grantors Success', props<{ Grantors: Grantor[] }>());
export const loadGrantorsFailure = createAction('[Patients] Load Grantors Failure', props<{ error: readonly any[] }>());

export const loadTags = createAction('[Patients] Load Tags', props<{ group: string }>());
export const loadTagsSuccess = createAction('[Patients] Load Tags Success', props<{ Tags: Tag[] }>());
export const loadTagsFailure = createAction('[Patients] Load Tags Failure', props<{ error: readonly any[] }>());

export const loadLocations = createAction('[Patients] Load Locations');
export const loadLocationsSuccess = createAction('[Patients] Load Locations Success', props<{ Locations: LocationBase[] }>());
export const loadLocationsFailure = createAction('[Patients] Load Locations Failure', props<{ error: readonly any[] }>());


export const LoadPatientMediaFiles = createAction('[Patients] Load Media Files', props<{ id: string,speciality:string, conditionId:string,activitType:string,activityId:string }>());
export const LoadPatientMediaFilesSuccess = createAction('[Patients] Load Media Files Success', props<{ MediaFile: any }>());
export const LoadPatientMediaFilesFailed = createAction('[Patients] Load Media Files Failed', props<{  error: readonly any[] }>());


export const LoadPatientMediaPoolFiles = createAction('[Patients] Load Media Pool Files', props<{ patientId: string }>());
export const LoadPatientMediaPoolFilesSuccess = createAction('[Patients] Load Media Pool Files Success', props<{ PatientMediaPoolFiles: any }>());
export const LoadPatientMediaPoolFilesFailed = createAction('[Patients] Load Media Pool Files Failed', props<{  error: readonly any[] }>());


export const DeletePatientMediaFiles = createAction('[Patients] Delete Media Files', props<{ id: string[]}>());
export const DeletePatientMediaFilesSuccess = createAction('[Patients] Delete Media Files Success', props<{ DeletedMediaFiles: string[] }>());
export const DeletePatientMediaFilesFailed = createAction('[Patients] Delete Media Files Failed', props<{  error: any[] }>());


export const UpdatePatientMediaFiles = createAction('[Patients] Update Media Files', props<{ mediaFiles: MediaFileInput[]}>());
export const UpdatePatientMediaFilesSuccess = createAction('[Patients] Update Media Files Success', props<{ UpdateMediaFiles: MediaFile[] }>());
export const UpdatePatientMediaFilesFailed = createAction('[Patients] Update Media Files Failed', props<{  error: readonly any[] }>());


export const createGeneralCondition = createAction('[Patients] Create General Condition ', props<{patientId: string, condition: GeneralConditionBase}>());
export const createGeneralConditionSuccess = createAction('[Patients] Create  General Condition  Success', props<{ condition: GeneralConditionBase }>());
export const createGeneralConditionFailure = createAction('[Patients] Create  General Condition  Failure', props<{ error: readonly any[] }>());


export const updateGeneralCondition = createAction('[Patients] Update General Condition ', props<{patientId: string, condition: GeneralConditionBase}>());
export const updateGeneralConditionSuccess = createAction('[Patients] Update  General Condition  Success', props<{ condition: GeneralConditionBase }>());
export const updateGeneralConditionFailure = createAction('[Patients] Update  General Condition  Failure', props<{ error: readonly any[] }>());


export const updateGeneralMedicalHistory = createAction('[Patients] Update General Medical History', props<{patientId: string, medicalHistory: GeneralMedicalHistoryInput}>());
export const updateGeneralMedicalHistorySuccess = createAction('[Patients] Update  General Medical History Success', props<{ medicalHistory: GeneralMedicalHistoryInput }>());
export const updateGeneralMedicalHistoryFailure = createAction('[Patients] Update  General Medical History Failure', props<{ error: readonly any[] }>());

export const addMessage = createAction('[Patients] Add Message', props<{message:MessageInputType}>());

export const createGeneralOperation = createAction('[Patients] Create General Operation ', props<{patientId: string, conditionId: string,operation:GeneralOperationBase}>());
export const createGeneralOperationSuccess = createAction('[Patients] Create  General Operation  Success', props<{ operation: GeneralOperationBase }>());
export const createGeneralOperationFailure = createAction('[Patients] Create  General Operation  Failure', props<{ error: readonly any[] }>());


export const updateGeneralOperation = createAction('[Patients] Update General Operation ', props<{patientId: string, conditionId: string,replacedConditionId:string,operation:GeneralOperationBase}>());
export const updateGeneralOperationSuccess = createAction('[Patients] Update  General Operation  Success', props<{ operation: GeneralOperationBase }>());
export const updateGeneralOperationFailure = createAction('[Patients] Update  General Operation  Failure', props<{ error: readonly any[] }>());


export const createGeneralFollowup = createAction('[Patients] Create General Followup ', props<{patientId: string, conditionId: string,followup:GeneralFollowupBase}>());
export const createGeneralFollowupSuccess = createAction('[Patients] Create  General Followup  Success', props<{ followup: GeneralFollowupBase }>());
export const createGeneralFollowupFailure = createAction('[Patients] Create  General Followup  Failure', props<{ error: readonly any[] }>());


export const updateGeneralFollowup = createAction('[Patients] Update General Followup ', props<{patientId: string, conditionId: string,replacedConditionId:string,followup:GeneralFollowupBase}>());
export const updateGeneralFollowupSuccess = createAction('[Patients] Update  General Followup  Success', props<{ followup: GeneralFollowupBase }>());
export const updateGeneralFollowupFailure = createAction('[Patients] Update  General Followup  Failure', props<{ error: readonly any[] }>());

export const createCardiologyCondition = createAction('[Patients] Create Cardiology Condition ', props<{patientId: string, condition: CardiologyConditionBase}>());
export const createCardiologyConditionSuccess = createAction('[Patients] Create  Cardiology Condition  Success', props<{ condition: CardiologyConditionBase }>());
export const createCardiologyConditionFailure = createAction('[Patients] Create  Cardiology Condition  Failure', props<{ error: readonly any[] }>());


export const updateCardiologyCondition = createAction('[Patients] Update Cardiology Condition ', props<{patientId: string, condition: CardiologyConditionBase}>());
export const updateCardiologyConditionSuccess = createAction('[Patients] Update  Cardiology Condition  Success', props<{ condition: CardiologyConditionBase }>());
export const updateCardiologyConditionFailure = createAction('[Patients] Update  Cardiology Condition  Failure', props<{ error: readonly any[] }>());


export const updateCardiologyMedicalHistory = createAction('[Patients] Update Cardiology Medical History', props<{patientId: string, medicalHistory: CardiologyMedicalHistoryInput}>());
export const updateCardiologyMedicalHistorySuccess = createAction('[Patients] Update  Cardiology Medical History Success', props<{ medicalHistory: CardiologyMedicalHistoryInput }>());
export const updateCardiologyMedicalHistoryFailure = createAction('[Patients] Update  Cardiology Medical History Failure', props<{ error: readonly any[] }>());


export const createCardiologyOperation = createAction('[Patients] Create Cardiology Operation ', props<{patientId: string, conditionId: string,operation:CardiologyOperationBase}>());
export const createCardiologyOperationSuccess = createAction('[Patients] Create  Cardiology Operation  Success', props<{ operation: CardiologyOperationBase }>());
export const createCardiologyOperationFailure = createAction('[Patients] Create  Cardiology Operation  Failure', props<{ error: readonly any[] }>());


export const updateCardiologyOperation = createAction('[Patients] Update Cardiology Operation ', props<{patientId: string, conditionId: string,replacedConditionId:string,operation:CardiologyOperationBase}>());
export const updateCardiologyOperationSuccess = createAction('[Patients] Update  Cardiology Operation  Success', props<{ operation: CardiologyOperationBase }>());
export const updateCardiologyOperationFailure = createAction('[Patients] Update  Cardiology Operation  Failure', props<{ error: readonly any[] }>());


export const createCardiologyFollowup = createAction('[Patients] Create Cardiology Followup ', props<{patientId: string, conditionId: string,followup:CardiologyFollowupBase}>());
export const createCardiologyFollowupSuccess = createAction('[Patients] Create  Cardiology Followup  Success', props<{ followup: CardiologyFollowupBase }>());
export const createCardiologyFollowupFailure = createAction('[Patients] Create  Cardiology Followup  Failure', props<{ error: readonly any[] }>());


export const updateCardiologyFollowup = createAction('[Patients] Update Cardiology Followup ', props<{patientId: string, conditionId: string,replacedConditionId:string,followup:CardiologyFollowupBase}>());
export const updateCardiologyFollowupSuccess = createAction('[Patients] Update  Cardiology Followup  Success', props<{ followup: CardiologyFollowupBase }>());
export const updateCardiologyFollowupFailure = createAction('[Patients] Update  Cardiology Followup  Failure', props<{ error: readonly any[] }>());

export const loadMedications = createAction('[Patients] Load Medications', props<{ patientId: string}>());
export const loadMedicationsSuccess = createAction('[Patients] Load Medications Success', props<{ medications: any }>());
export const loadMedicationsFailure = createAction('[Patients] Load Medications Failure', props<{ error: any }>());

export const loadMedicationsByCondition = createAction('[Patients] Load Medications By Condition', props<{ patientId: string,conditionId:string}>());
export const loadMedicationsByConditionSuccess = createAction('[Patients] Load Medications By Condition Success', props<{ medications: any }>());
export const loadMedicationsByConditionFailure = createAction('[Patients] Load Medications By Condition Failure', props<{ error: any }>());

export const loadMedicationsByFollowup = createAction('[Patients] Load Medications By Followup', props<{ patientId: string,followupId:string}>());
export const loadMedicationsByFollowupSuccess = createAction('[Patients] Load Medications By Followup Success', props<{ medications: any }>());
export const loadMedicationsByFollowupFailure = createAction('[Patients] Load Medications By Followup Failure', props<{ error: any }>());


export const newMedication = createAction('[Patients] New Medication', props<{ medication: PatientMedicationsInputBase}>());
export const newMedicationSuccess = createAction('[Patients] New Medications Success', props<{ medication: PatientMedicationsInputBase }>());
export const newMedicationFailure = createAction('[Patients] New Medications Failure', props<{ error: any }>());
export const newMedicationSavedLocally = createAction('[Patients] New Medications Saved Locally', props<{ medication: PatientMedicationsInputBase }>());



export const stopMedication = createAction('[Patients] Stop Medication', props<{ medication: PatientMedicationsInputBase}>());
export const stopMedicationSuccess = createAction('[Patients] Stop Medications Success', props<{ medication: PatientMedicationsInputBase }>());
export const stopMedicationFailure = createAction('[Patients] Stop Medications Failure', props<{ error: any }>());
export const stopMedicationSavedLocally = createAction('[Patients] Stop Medications Saved Locally', props<{ medication: PatientMedicationsInputBase }>());


export const renewMedication = createAction('[Patients] Renew Medication', props<{ medication: PatientMedicationsInputBase}>());
export const renewMedicationSuccess = createAction('[Patients] Renew Medications Success', props<{ medication: PatientMedicationsInputBase }>());
export const renewMedicationFailure = createAction('[Patients] Renew Medications Failure', props<{ error: any }>());
export const renewMedicationSavedLocally = createAction('[Patients] Renew Medications Saved Locally', props<{ medication: PatientMedicationsInputBase }>());


export const newDrug = createAction('[Patients] New Drug', props<{ drug: DrugInput}>());
export const newDrugSuccess = createAction('[Patients] New Drug Success', props<{ drug: DrugInput }>());
export const newDrugFailure = createAction('[Patients] New Drug Failure', props<{ error: any }>());


export const loadDrugsSearch = createAction('[Patients] Load Drugs Search', props<{ variables: DrugsSearchParams }>());
export const loadDrugsSearchSuccess = createAction('[Patients] Load Drugs Search Success', props<{drugs:any }>());
export const loadDrugsSearchFailure = createAction('[Patients] Load Drugs Search Failure', props<{ error:any}>());

export const drugSavedLocally = createAction('[Patients] Drug Saved Locally', props<{ drug: DrugInput }>());