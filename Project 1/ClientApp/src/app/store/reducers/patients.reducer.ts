import { createReducer, on, Action } from '@ngrx/store';
import * as patientsActions from '../actions/patients.action';
import { DrugInput, Grantor, Tag, PatientMedications } from 'app/blocks/graphql/generated/gqlServices';
import { LightPatient } from '../../blocks/models/LightPatient';
import { Patient, MediaFile } from 'app/blocks/graphql/generated/gqlServices';
import { GeneralMedicalHistoryInput } from 'app/blocks/graphql/generated/gqlServices';

import { CardiologyMedicalHistoryInput } from 'app/blocks/graphql/generated/gqlServices';
import * as localforage from 'localforage';

import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from '@angular/platform-browser-dynamic';
import { DrugInputBase, LocationBase, MediaFileBase, PatientBase, PatientMedicationsBase, PatientMedicationsInputBase } from 'app/blocks/graphql/generated/bases';
import { GeneralConditionBase, GeneralOperationBase, GeneralFollowupBase } from 'app/blocks/graphql/generated/bases';
import { CardiologyConditionBase, CardiologyOperationBase, CardiologyFollowupBase } from 'app/blocks/graphql/generated/bases';
import { Medication } from 'app/fake-db/medication.model';
import { ISearchOptions } from 'app/blocks/interface/search-options';

export class PatientsState {

    patients: { data: LightPatient[], fromServer: boolean };
    patientsTotal: { total: number, fromServer: boolean };
    patientLoaded : boolean;
    filter: string;
    // fromServer: boolean;
    patientsSearch: Patient[];
    patientsMdcBarSearch: Patient[];
    // selected: any;
    selectedPatient: { data: Patient, fromServer: boolean };

    createPatient: Patient;
    // createPatientLocally: boolean;
    // createPatientFailure: any;

    updatePatient: Patient;
    // updatePatientLocally: boolean;
    // updatePatientFailure: any;

    updateGeneralMedicalHistory: GeneralMedicalHistoryInput;


    createGeneralCondition: GeneralConditionBase;
    updateGeneralCondition: GeneralConditionBase;

    createGeneralOperation: GeneralOperationBase;
    updateGeneralOperation: GeneralOperationBase;

    createGeneralFollowup: GeneralFollowupBase;
    updateGeneralFollowup: GeneralFollowupBase;


    updateCardiologyMedicalHistory: CardiologyMedicalHistoryInput;


    createCardiologyCondition: CardiologyConditionBase;
    updateCardiologyCondition: CardiologyConditionBase;

    createCardiologyOperation: CardiologyOperationBase;
    updateCardiologyOperation: CardiologyOperationBase;

    createCardiologyFollowup: CardiologyFollowupBase;
    updateCardiologyFollowup: CardiologyFollowupBase;

    deletePatient: any;
    // deletePatientLocally:boolean;
    // deletePatientFailure: any;    

    duplicatePatient: Patient;
    duplicatePatientLocally: boolean;
    // duplicatePatientFailure: any;

    patientSavedLocally: boolean;

    error: any;

    grantors: Grantor[];
    tags: Tag[];
    locations: LocationBase[];

    mediaFile: MediaFileBase[];
    deleteMediaFile: string[];
    updatemediaFile: MediaFile[];

    mediaPoolFiles: any[];

    medications: PatientMedicationsInputBase[];
    medicationsBycondition: PatientMedicationsInputBase[];
    medicationsByFollowup: PatientMedicationsInputBase[];
    newMedication: Medication;
    medicationSavedLocally: boolean;
    drugs: DrugInput[];
    drugSavedLocally: boolean;


}

const initialState: PatientsState = {
    patients: { data: [], fromServer: false },
    patientsTotal: { total: 0, fromServer: false },
    patientLoaded:false,
    filter: null,
    patientsSearch: [],
    patientsMdcBarSearch: [],
    // fromServer: false,

    // selected: [],
    selectedPatient: { data: null, fromServer: false },
    createPatient: null,
    // createPatientLocally: false,
    // createPatientFailure: false,

    updatePatient: null,
    // updatePatientLocally: false,
    // updatePatientFailure: false,

    updateGeneralMedicalHistory: null,

    createGeneralCondition: null,
    updateGeneralCondition: null,

    createGeneralOperation: null,
    updateGeneralOperation: null,

    createGeneralFollowup: null,
    updateGeneralFollowup: null,


    updateCardiologyMedicalHistory: null,

    createCardiologyCondition: null,
    updateCardiologyCondition: null,

    createCardiologyOperation: null,
    updateCardiologyOperation: null,

    createCardiologyFollowup: null,
    updateCardiologyFollowup: null,

    deletePatient: null,
    // deletePatientLocally:false,
    // deletePatientFailure: false,


    duplicatePatient: null,
    duplicatePatientLocally: false,
    // duplicatePatientFailure: false,

    patientSavedLocally: false,

    error: null,

    grantors: [],
    tags: [],
    locations: [],

    mediaFile: [],
    deleteMediaFile: [],
    updatemediaFile: [],

    mediaPoolFiles: [],
    medications: [],
    medicationsBycondition: [],
    medicationsByFollowup: [],

    medicationSavedLocally: false,
    newMedication: null,
    drugs: [],
    drugSavedLocally: false,
};

const patientsReducer = createReducer(initialState,

    // -------------------------------------
    // @ READ PATIENT
    // -------------------------------------
    on(patientsActions.loadPatients, (state: PatientsState, payload) => {
        return {
            ...state,
            // patientsSearch:[],
            patientLoaded:false,
            patientSavedLocally: false,
            error: null,
            filter: null
        };
    }),
    on(patientsActions.loadPatientsSuccess, (state: PatientsState, payload) => {
        return {
            ...state,
            patients: { data: payload.patients, fromServer: payload.fromServer },
            patientLoaded:true,
            //patientsSearch:[],
            patientSavedLocally: false,
            error: null
        };
    }),
    on(patientsActions.loadPatientsFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            patientLoaded:false,
            error: { data: payload.error }
        };
    }),
    on(patientsActions.loadPatientsTotalSuccess, (state: PatientsState, payload) => {
        return {
            ...state,
            patientSavedLocally: false,
            patientsTotal: { total: payload.total, fromServer: payload.fromServer }
        };
    }),
    on(patientsActions.loadPatient, (state: PatientsState, payload) => {
        return {
            ...state,
            patientSavedLocally: false,
            updateGeneralMedicalHistory: null,
            updatePatient: null,
            deletePatient: null,
            error: null,
        };
    }),

    on(patientsActions.loadPatientSuccess, (state: PatientsState, payload) => {
        return {
            ...state,
            patientSavedLocally: false,
            selectedPatient: { data: payload.patient, fromServer: payload.fromServer },
            error: null,
        };
    }),
    on(patientsActions.loadPatientFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: { data: payload.error }
        };
    }),
    // on(patientsActions.loadPatientsSearch, (state: PatientsState, payload) => {
    //     return {
    //         ...state,
    //         filter:payload.variables.filter,
    //         //options:payload.variables.options

    //     };
    // }),
    // on(patientsActions.loadPatientsSearchSuccess, (state: PatientsState, payload) => {

    //     return {
    //         ...state,
    //         patientsSearch: payload.patientsSearch,
    //         patients:{data:[],fromServer:false},
    //         patientSavedLocally: false,
    //        // patientsTotal: { total: payload.totalSearch, fromServer: payload.fromServer },
    //         error: null
    //     };
    // }),
    // on(patientsActions.loadPatientsSearchFailure, (state: PatientsState, payload) => {

    //     return {
    //         ...state,
    //         error: payload.error
    //     };
    // }),
    on(patientsActions.loadPatientsMdcBarSearchSuccess, (state: PatientsState, payload) => {

        return {
            ...state,
            patientsMdcBarSearch: payload.patientsSearch,
            patientSavedLocally: false,
            //patientsMdcTotal: { total: payload.totalSearch, fromServer: payload.fromServer },
            error: null
        };
    }),
    on(patientsActions.loadPatientsMdcBarSearchFailure, (state: PatientsState, payload) => {

        return {
            ...state,
            error: payload.error
        };
    }),



    // -------------------------------------
    // @ UPDATE PATIENT
    // -------------------------------------
    on(patientsActions.updatePatient, (state: PatientsState, payload) => {
        return {
            ...state,
            patientSavedLocally: false,
            updatePatient: null,
            error: null,
        };
    }),

    on(patientsActions.updatePatientSuccess, (state: PatientsState, payload) => {
        return {
            ...state,
            updatePatient: payload.patient,
            // updatePatientFailure: false,
            patientSavedLocally: false,
            error: null,

        };
    }),

    on(patientsActions.updatePatientFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            // updatePatientFailure: true,
            error: payload.error,
        };
    }),

    // -------------------------------------
    // @ UPDATE GENERAL MEDICAL HISTORY
    // -------------------------------------

    on(patientsActions.updateGeneralMedicalHistorySuccess, (state: PatientsState, payload) => {
        return {
            ...state,
            updateGeneralMedicalHistory: payload.medicalHistory,
            error: null,
            patientSavedLocally: false,


        };
    }),

    on(patientsActions.updateGeneralMedicalHistoryFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: payload.error,

        };
    }),

    // -------------------------------------
    // @ CREATE GENERAL CONDITION
    // -------------------------------------

    on(patientsActions.createGeneralConditionSuccess, (state: PatientsState, payload) => {
        return {
            ...state,
            createGeneralCondition: payload.condition,
            patientSavedLocally: false,
            error: null,

        };
    }),

    on(patientsActions.createGeneralConditionFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: payload.error,
        };
    }),
    // -------------------------------------
    // @ UPDATE GENERAL CONDITION
    // -------------------------------------

    on(patientsActions.updateGeneralConditionSuccess, (state: PatientsState, payload) => {
        return {
            ...state,
            updateGeneralCondition: payload.condition,
            patientSavedLocally: false,
            error: null,

        };
    }),

    on(patientsActions.updateGeneralConditionFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: payload.error,
        };
    }),

    // -------------------------------------
    // @ CREATE GENERAL OPERATION
    // -------------------------------------

    on(patientsActions.createGeneralOperationSuccess, (state: PatientsState, payload) => {
        return {
            ...state,
            createGeneralOperation: payload.operation,
            patientSavedLocally: false,
            error: null,

        };
    }),

    on(patientsActions.createGeneralOperationFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: payload.error,
        };
    }),
    // -------------------------------------
    // @ UPDATE GENERAL OPERATION
    // -------------------------------------

    on(patientsActions.updateGeneralOperationSuccess, (state: PatientsState, payload) => {
        return {
            ...state,
            updateGeneralOperation: payload.operation,
            patientSavedLocally: false,
            error: null,

        };
    }),

    on(patientsActions.updateGeneralOperationFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: payload.error,
        };
    }),

    // -------------------------------------
    // @ CREATE GENERAL FOLLOWUP
    // -------------------------------------

    on(patientsActions.createGeneralFollowupSuccess, (state: PatientsState, payload) => {
        return {
            ...state,
            createGeneralFollowup: payload.followup,
            patientSavedLocally: false,
            error: null,

        };
    }),

    on(patientsActions.createGeneralFollowupFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: payload.error,
        };
    }),
    // -------------------------------------
    // @ UPDATE GENERAL FOLLOWUP
    // -------------------------------------

    on(patientsActions.updateGeneralFollowupSuccess, (state: PatientsState, payload) => {
        return {
            ...state,
            updateGeneralFollowup: payload.followup,
            patientSavedLocally: false,
            error: null,

        };
    }),

    on(patientsActions.updateGeneralFollowupFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: payload.error,
        };
    }),

    // -------------------------------------
    // @ UPDATE CARDIOLOGY MEDICAL HISTORY
    // -------------------------------------

    on(patientsActions.updateCardiologyMedicalHistorySuccess, (state: PatientsState, payload) => {
        return {
            ...state,
            updateCardiologyMedicalHistory: payload.medicalHistory,
            error: null,
            patientSavedLocally: false,


        };
    }),

    on(patientsActions.updateCardiologyMedicalHistoryFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: payload.error,

        };
    }),

    // -------------------------------------
    // @ CREATE CARDIOLOGY CONDITION

    //-------------------------------------
    on(patientsActions.createCardiologyCondition, (state: PatientsState, payload) => {
        return {
            ...state,
            patientSavedLocally: false,
            error: null,
        }
    }),
    on(patientsActions.createCardiologyConditionSuccess, (state: PatientsState, payload) => {
        return {
            ...state,
            createCardiologyCondition: payload.condition,
            patientSavedLocally: false,
            error: null,

        };
    }),

    on(patientsActions.createCardiologyConditionFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: payload.error,
        };
    }),
    // -------------------------------------
    // @ UPDATE CARDIOLOGY CONDITION

    //-------------------------------------
    on(patientsActions.updateCardiologyCondition, (state: PatientsState, payload) => {
        return {
            ...state,
            patientSavedLocally: false,
            error: null,

        }
    }),

    on(patientsActions.updateCardiologyConditionSuccess, (state: PatientsState, payload) => {
        return {
            ...state,
            updateCardiologyCondition: payload.condition,
            patientSavedLocally: false,
            error: null,

        };
    }),

    on(patientsActions.updateCardiologyConditionFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: payload.error,
        };
    }),

    // -------------------------------------
    // @ CREATE CARDIOLOGY OPERATION
    // -------------------------------------

    on(patientsActions.createCardiologyOperationSuccess, (state: PatientsState, payload) => {
        return {
            ...state,
            createCardiologyOperation: payload.operation,
            patientSavedLocally: false,
            error: null,

        };
    }),

    on(patientsActions.createCardiologyOperationFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: payload.error,
        };
    }),
    // -------------------------------------
    // @ UPDATE CARDIOLOGY OPERATION
    // -------------------------------------

    on(patientsActions.updateCardiologyOperationSuccess, (state: PatientsState, payload) => {
        return {
            ...state,
            updateCardiologyOperation: payload.operation,
            patientSavedLocally: false,
            error: null,

        };
    }),

    on(patientsActions.updateCardiologyOperationFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: payload.error,
        };
    }),

    // -------------------------------------
    // @ CREATE CARDIOLOGY FOLLOWUP

    //-------------------------------------
    on(patientsActions.createCardiologyFollowup, (state: PatientsState, payload) => {
        return {
            ...state,
            patientSavedLocally: false,
            error: null,

        }
    }),
    on(patientsActions.createCardiologyFollowupSuccess, (state: PatientsState, payload) => {
        return {
            ...state,
            createCardiologyFollowup: payload.followup,
            patientSavedLocally: false,
            error: null,

        };
    }),

    on(patientsActions.createCardiologyFollowupFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: payload.error,
        };
    }),
    // -------------------------------------
    // @ UPDATE CARDIOLOGY FOLLOWUP

    //-------------------------------------
    on(patientsActions.updateCardiologyFollowup, (state: PatientsState, payload) => {
        return {
            ...state,
            patientSavedLocally: false,
            error: null,

        }
    }),
    on(patientsActions.updateCardiologyFollowupSuccess, (state: PatientsState, payload) => {
        return {
            ...state,
            updateCardiologyFollowup: payload.followup,
            patientSavedLocally: false,
            error: null,

        };
    }),

    on(patientsActions.updateCardiologyFollowupFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: payload.error,
        };
    }),


    // -------------------------------------
    // @ CREATE PATIENT
    // -------------------------------------
    on(patientsActions.createPatient, (state: PatientsState, payload) => {
        return {
            ...state,
            createPatientFailure: false,
            patientSavedLocally: false,
            error: null,
        };
    }),

    on(patientsActions.createPatientSuccess, (state: PatientsState, payload) => {
        return {
            ...state,
            createPatientFailure: false,
            createPatient: payload.patient,
            patientSavedLocally: false,
            error: null,
        };
    }),

    on(patientsActions.patientSavedLocally, (state: PatientsState) => {
        return {
            ...state,
            patientSavedLocally: true,
            error: null,
        };
    }),

    on(patientsActions.createPatientFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: payload.error,
        };
    }),

    // -------------------------------------
    // @ DELETE PATIENT
    // -------------------------------------
    on(patientsActions.deletePatient, (state: PatientsState, payload) => {
        return {
            ...state,
            patientSavedLocally: false,
            deletePatient: null,
            error: null,
        };
    }),

    on(patientsActions.deletePatientSuccess, (state: PatientsState, payload) => {
        return {
            ...state,
            deletePatient: payload.patient,
            patientSavedLocally: false,
            error: null,
        };
    }),

    on(patientsActions.deletePatientFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: payload.error,
        };
    }),



    // -------------------------------------
    // @ Duplicate PATIENT
    // -------------------------------------

    on(patientsActions.duplicatePatientSuccess, (state: PatientsState, payload) => {
        return {
            ...state,
            duplicatePatient: payload.patient,
            patientSavedLocally: false,
            duplicatePatientLocally: false,
            error: null,
        };
    }),

    on(patientsActions.duplicatePatientFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: payload.error,
        };
    }),
    on(patientsActions.duplicatePatientSavedLocally, (state: PatientsState, payload) => {
        return {
            ...state,
            duplicatePatientLocally: true,
        };
    }),



    on(patientsActions.loadGrantorsSuccess, (state: PatientsState, payload) => {


        return {
            ...state,
            grantors: payload.Grantors,
            patientSavedLocally: false,
            error: null
        };
    }),

    on(patientsActions.loadGrantorsFailure, (state: PatientsState, payload) => {


        return {
            ...state,
            error: payload.error
        };
    }),
    on(patientsActions.loadTagsSuccess, (state: PatientsState, payload) => {


        return {
            ...state,
            tags: payload.Tags,
            patientSavedLocally: false,
            error: null
        };
    }),

    on(patientsActions.loadTagsFailure, (state: PatientsState, payload) => {


        return {
            ...state,
            error: payload.error
        };
    }),
    on(patientsActions.loadLocationsSuccess, (state: PatientsState, payload) => {


        return {
            ...state,
            locations: payload.Locations,
            patientSavedLocally: false,
            error: null
        };
    }),
    on(patientsActions.loadLocationsFailure, (state: PatientsState, payload) => {


        return {
            ...state,
            error: payload.error
        };
    }),


    on(patientsActions.LoadPatientMediaFilesSuccess, (state: PatientsState, payload) => {


        return {
            ...state,
            mediaFile: payload.MediaFile,
            patientSavedLocally: false,
            error: null
        };
    }),
    on(patientsActions.LoadPatientMediaFilesFailed, (state: PatientsState, payload) => {


        return {
            ...state,
            error: payload.error
        };
    }),

    on(patientsActions.DeletePatientMediaFilesSuccess, (state: PatientsState, payload) => {


        return {
            ...state,
            deleteMediaFile: payload.DeletedMediaFiles,
            patientSavedLocally: false,
            error: null
        };
    }),
    on(patientsActions.DeletePatientMediaFilesFailed, (state: PatientsState, payload) => {


        return {
            ...state,
            error: payload.error
        };
    }),

    on(patientsActions.UpdatePatientMediaFilesSuccess, (state: PatientsState, payload) => {


        return {
            ...state,
            updatemediaFile: payload.UpdateMediaFiles,
            patientSavedLocally: false,
            error: null
        };
    }),
    on(patientsActions.UpdatePatientMediaFilesFailed, (state: PatientsState, payload) => {


        return {
            ...state,
            error: payload.error
        };
    }),

    on(patientsActions.LoadPatientMediaPoolFilesSuccess, (state: PatientsState, payload) => {


        return {
            ...state,
            mediaPoolFiles: payload.PatientMediaPoolFiles,
            patientSavedLocally: false,
            error: null
        };
    }),
    on(patientsActions.LoadPatientMediaPoolFilesFailed, (state: PatientsState, payload) => {


        return {
            ...state,
            error: payload.error
        };
    }),

    // -------------------------------------
    // @ READ PATIENT Medications
    // -------------------------------------

    on(patientsActions.loadMedications, (state: PatientsState) => {
        return {
            ...state,
            medications: null,
            medicationsBycondition: [],
            medicationsByFollowup: [],
            patientSavedLocally: false,
            error: null
        };
    }),
    on(patientsActions.loadMedicationsSuccess, (state: PatientsState, payload) => {
        return {
            ...state,
            medications: payload.medications,
            patientSavedLocally: false,
            error: null
        };
    }),
    on(patientsActions.loadMedicationsFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: { data: payload.error }
        };
    }),
    // -------------------------------------
    // @ READ PATIENT Medications By Condition
    // -------------------------------------

    on(patientsActions.loadMedicationsByConditionSuccess, (state: PatientsState, payload) => {
        const medicationsBycondition = [...state.medicationsBycondition];
        for (let i = 0; i < payload.medications.length; i++) {
            const index = medicationsBycondition.findIndex(l => l === payload.medications[i]);

            if (index === -1) {
                medicationsBycondition.push(payload.medications[i]);
            }
            // else

            // if (medicationsBycondition[index].drug.id!=payload.medications[i].drug.id)
            // medicationsBycondition.push(payload.medications[i])

        }

        return {
            ...state,
            medicationsBycondition,
            error: null
        };
    }),
    on(patientsActions.loadMedicationsByConditionFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: { data: payload.error }
        };
    }),
    // -------------------------------------
    // @ READ PATIENT Medications By Followup
    // -------------------------------------

    on(patientsActions.loadMedicationsByFollowupSuccess, (state: PatientsState, payload) => {
        const medicationsByFollowup = [...state.medicationsByFollowup];
        for (let i = 0; i < payload.medications.length; i++) {
            const index = medicationsByFollowup.findIndex(l => l === payload.medications[i]);

            if (index === -1) {
                medicationsByFollowup.push(payload.medications[i]);
            }
            // else
            // if(medicationsByFollowup[index]!==payload.medications[i])
            //      medicationsByFollowup[index]=payload.medications[i]
        }

        return {
            ...state,
            medicationsByFollowup,
            error: null
        };
    }),
    on(patientsActions.loadMedicationsByFollowupFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: { data: payload.error }
        };
    }),

    // -------------------------------------
    // @ New Medication
    // -------------------------------------

    on(patientsActions.newMedicationSuccess, (state: PatientsState, payload) => {
        const medications = [...state.medications];
        medications.push(payload.medication);
        return {
            ...state,
            medications,
            // newMedication: payload.medication,
            medicationSavedLocally: false,
            medicationsBycondition: [],
            medicationsByFollowup: [],
            error: null
        };
    }),
    on(patientsActions.newMedicationFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: { data: payload.error }
        };
    }),

    on(patientsActions.newMedicationSavedLocally, (state: PatientsState, payload) => {
        const medications = [...state.medications];
        medications.push(payload.medication);
        return {
            ...state,
            medications,
            // newMedication: payload.medication,
            medicationsBycondition: [],
            medicationsByFollowup: [],
            medicationSavedLocally: true,
            error: null
        };
    }),
    // -------------------------------------
    // @ Renew Medication
    // -------------------------------------

    on(patientsActions.renewMedicationSuccess, (state: PatientsState, payload) => {
        const medications = [...state.medications];
        const renewMedicationIndex = medications.findIndex(arr =>
            (arr.medicationId === payload.medication.medicationId && arr.patientId === payload.medication.patientId));
        medications[renewMedicationIndex] = payload.medication;
        return {
            ...state,
            medications,
            medicationSavedLocally: false,
            medicationsBycondition: [],
            medicationsByFollowup: [],
            error: null
        };
    }),
    on(patientsActions.renewMedicationSavedLocally, (state: PatientsState, payload) => {
        const medications = [...state.medications];
        const renewMedicationIndex = medications.findIndex(arr =>
            (arr.medicationId === payload.medication.medicationId && arr.patientId === payload.medication.patientId));
        medications[renewMedicationIndex] = payload.medication;
        return {
            ...state,
            medications,
            // newMedication: payload.medication,
            medicationsBycondition: [],
            medicationsByFollowup: [],
            medicationSavedLocally: true,
            error: null
        };
    }),
    on(patientsActions.renewMedicationFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: { data: payload.error }
        };
    }),
    // -------------------------------------
    // @ Stop Medication
    // -------------------------------------

    on(patientsActions.stopMedicationSuccess, (state: PatientsState, payload) => {
        const medications = [...state.medications];
        const stopMedicationIndex = medications.findIndex(arr =>
            (arr.medicationId === payload.medication.medicationId && arr.patientId === payload.medication.patientId));
        medications[stopMedicationIndex] = payload.medication;
        return {
            ...state,
            medications,
            medicationSavedLocally: false,
            medicationsBycondition: [],
            medicationsByFollowup: [],
            error: null
        };
    }),
    on(patientsActions.stopMedicationSavedLocally, (state: PatientsState, payload) => {
        const medications = [...state.medications];
        const stopMedicationIndex = medications.findIndex(arr =>
            (arr.medicationId === payload.medication.medicationId && arr.patientId === payload.medication.patientId));
        medications[stopMedicationIndex] = payload.medication;
        return {
            ...state,
            medications,
            // newMedication: payload.medication,
            medicationSavedLocally: true,
            medicationsBycondition: [],
            medicationsByFollowup: [],
            error: null
        };
    }),
    on(patientsActions.stopMedicationFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: { data: payload.error }
        };
    }),

    // -------------------------------------
    // @ New Drug
    // -------------------------------------

    on(patientsActions.newDrugSuccess, (state: PatientsState, payload) => {
        const drugs = [...state.drugs];
        drugs.push(payload.drug);
        return {
            ...state,
            drugs,
            drugSavedLocally: false,
            error: null
        };
    }),
    on(patientsActions.newDrugFailure, (state: PatientsState, payload) => {
        return {
            ...state,
            error: { data: payload.error }
        };
    }),

    on(patientsActions.drugSavedLocally, (state: PatientsState, payload) => {
        const drugs = [...state.drugs];
        drugs.push(payload.drug);
        return {
            ...state,
            drugs,
            drugSavedLocally: true,
            error: null,
        };
    }),

    on(patientsActions.loadDrugsSearchSuccess, (state: PatientsState, payload) => {
        return {
            ...state,
            drugs: payload.drugs,
            drugSavedLocally: false,
            error: null
        };
    }),
    on(patientsActions.loadDrugsSearchFailure, (state: PatientsState, payload) => {

        return {
            ...state,
            error: null
        };
    }),

);



export function reducer(
    state: PatientsState,
    action: Action
): PatientsState {
    return patientsReducer(state, action);
}


export const getPatients = (state: PatientsState) => state.patients;
// {

//     const res = !!state.patients  && state.filter===null ? state.patients : {data:[],fromServer:false};

//     return res;
// };
export const getPatientsTotal = (state: PatientsState) => state.patientsTotal;
export const getPatientLoaded = (state: PatientsState) => state.patientLoaded;
// export const getPatientsSearch = (state: PatientsState) =>{

//     const res = !!state.patientsSearch  && state.filter!==null ? state.patientsSearch : [];

//     return res;
// };
export const getPatientsMdcBarSearch = (state: PatientsState) => state.patientsMdcBarSearch;

export const getSelectedPatient = (state: PatientsState) => state.selectedPatient;


export const getUpdatedPatient = (state: PatientsState) => state.updatePatient;
// export const getUpdatedPatientLocally = (state: PatientsState) => state.updatePatientLocally;


export const getCreatedPatient = (state: PatientsState) => state.createPatient;
// export const getCreatedPatientLocally = (state: PatientsState) => state.createPatientLocally;

export const getpatientSavedLocally = (state: PatientsState) => state.patientSavedLocally;

// export const getDeletedPatientLocally = (state: PatientsState) => state.deletePatientLocally;
export const getDeletedPatient = (state: PatientsState) => state.deletePatient;

export const getDuplicatPatient = (state: PatientsState) => state.duplicatePatient;
export const getDuplicatePatientLocally = (state: PatientsState) => state.duplicatePatientLocally;

export const getError = (state: PatientsState) => state.error;

export const getGrantors = (state: PatientsState) => state.grantors;
export const getTags = (state: PatientsState) => state.tags;
export const getLocations = (state: PatientsState) => state.locations;

// -------------------------
//       GENERAL
// -------------------------

export const getCreatedGeneralCondtion = (state: PatientsState) => state.createGeneralCondition;
export const getUpdatedGeneralCondtion = (state: PatientsState, props?) => {
    const res = !!state.updateGeneralCondition && !!props && !!props.id && state.updateGeneralCondition.id === props.id ? state.updateGeneralCondition : null;

    return res;
};


export const getCreatedGeneralOperation = (state: PatientsState) => state.createGeneralOperation;
export const getUpdatedGeneralOperation = (state: PatientsState, props?) => {
    const res = !!state.updateGeneralOperation && !!props && !!props.id && state.updateGeneralOperation.id === props.id ? state.updateGeneralOperation : null;
    // console.log(res, state.updateGeneralOperation, props);

    return res;
};



export const getCreatedGeneralFollowup = (state: PatientsState) => state.createGeneralFollowup;
export const getUpdatedGeneralFollowup = (state: PatientsState, props?) => {

    const res = !!state.updateGeneralFollowup && !!props && !!props.id && state.updateGeneralFollowup.id === props.id ? state.updateGeneralFollowup : null;
    // console.log(res, state.updateGeneralFollowup, props);

    return res;
};



export const getUpdateGeneralMedicalHistory = (state: PatientsState) => state.updateGeneralMedicalHistory;

// ----------------------------
//       CARDIOLOGY
// ----------------------------

export const getCreatedCardiologyCondtion = (state: PatientsState) => state.createCardiologyCondition;

export const getUpdatedCardiologyCondtion = (state: PatientsState, props?) => {
    const res = !!state.updateCardiologyCondition && !!props && !!props.id && state.updateCardiologyCondition.id == props.id ? state.updateCardiologyCondition : null;
    return res;
}

export const getCreatedCardiologyOperation = (state: PatientsState) => state.createCardiologyOperation;
export const getUpdatedCardiologyOperation = (state: PatientsState, props?) => {
    const res = !!state.updateCardiologyOperation && !!props && !!props.id && state.updateCardiologyOperation.id === props.id ? state.updateCardiologyOperation : null;
    // console.log(res, state.updateGeneralOperation, props);

    return res;
};


export const getCreatedCardiologyFollowup = (state: PatientsState) => state.createCardiologyFollowup;
export const getUpdatedCardiologyFollowup = (state: PatientsState, props?) => {

    const res = !!state.updateCardiologyFollowup && !!props && !!props.id && state.updateCardiologyFollowup.id === props.id ? state.updateCardiologyFollowup : null;
    // console.log(res, state.updateGeneralFollowup, props);

    return res;
};

export const getUpdateCardiologyMedicalHistory = (state: PatientsState) => state.updateCardiologyMedicalHistory;
// ----------------------------

export const getMediaFiles = (state: PatientsState) => state.mediaFile;
export const getDeletedMediaFiles = (state: PatientsState) => state.deleteMediaFile;
export const getUpdatedMediaFiles = (state: PatientsState) => state.updatemediaFile;

export const getMediaPoolFiles = (state: PatientsState) => state.mediaPoolFiles;

export const getMedications = (state: PatientsState) => state.medications;
export const getMedicationsByCondition = (state: PatientsState) => state.medicationsBycondition;
export const getMedicationsByFollowup = (state: PatientsState) => state.medicationsByFollowup;

export const getMedicationSavedLocally = (state: PatientsState) => state.medicationSavedLocally;

export const getDrugs = (state: PatientsState) => state.drugs;
export const getDrugSavedLocally = (state: PatientsState) => state.drugSavedLocally;
