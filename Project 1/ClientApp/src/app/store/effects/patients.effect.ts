import { PatientBase, PatientMedicationsInputBase } from './../../blocks/graphql/generated/bases';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';

import {
    PatientGQL, CreatePatientGQL, UpdatePatientGQL, DeletePatientGQL, RemarkDuplicatePatientGQL,
    PatientsGQL,
    CreateMedicationGQL,
    UpdateMedicationsGQL,
    PatientMedicationGQL,
    CreateDrugGQL,
    DrugsGQL,
    DrugGQL,
    PatientMedicationByConditionGQL,
    PatientMedicationByFollowupGQL,
    GeneralConditionInput,
    GeneralOperationInput,
    GeneralFollowupInput,
    CardiologyConditionInput,
    CardiologyOperationInput,
    CardiologyFollowupInput,
    CardiologyMedicalHistoryInput,
    DrugInput,
    GeneralMedicalHistoryInput,
    AddMessageGQL,
    Patient,
} from 'app/blocks/graphql/generated/gqlServices';

import {
    PatientInput, PatientMediaPoolFilesGQL,
    PatientsTotalGQL,
    DeleteMediaFilesGQL, UpdateMediaFilesGQL,
    ActivityMediaFilesGQL,
    TagsGQL,
    GrantorsGQL,
    LocationsGQL,
} from './../../blocks/graphql/generated/gqlServices';

import {
    CreateGeneralConditionGQL, UpdateGeneralConditionGQL,
    CreateGeneralOperationGQL, UpdateGeneralOperationGQL,
    CreateGeneralFollowupGQL, UpdateGeneralFollowupGQL,
    UpdateGeneralMedicalHistoryGQL,
} from './../../blocks/graphql/generated/gqlServices';

import {
    updatePatientGqlCallback
} from 'app/blocks/graphql/callback/updatepatientGqlCallback';

import {
    CreateCardiologyConditionGQL, UpdateCardiologyConditionGQL,
    CreateCardiologyOperationGQL, UpdateCardiologyOperationGQL,
    CreateCardiologyFollowupGQL, UpdateCardiologyFollowupGQL,
    UpdateCardiologyMedicalHistoryGQL,
} from 'app/blocks/graphql/generated/gqlServices';

import { remarkDuplicatePatientGqlCallback } from 'app/blocks/graphql/callback/remarkDuplicatePatientGqlCallback';

import { map, filter, switchMap, catchError, concatMapTo } from 'rxjs/operators';

import * as fromPatientsActions from '../actions/patients.action';

import { updateGeneralMedicalHistoryGqlCallback } from 'app/blocks/graphql/callback/updateGeneralMedicalHistoryGqlCallback';
import { deleteMediaFilesGqlCallback } from 'app/blocks/graphql/callback/deleteMediaFilesGqlCallback';
import { updateMediaFilesGqlCallback } from 'app/blocks/graphql/callback/updateMediaFilesGqlCallback';
import { createGeneralOperationGqlCallback } from 'app/blocks/graphql/callback/createGeneralOperationGqlCallback';
import { createGeneralFollowupGqlCallback } from 'app/blocks/graphql/callback/createGeneralFollowupCallback';
import { updateGeneralFollowupGqlCallback } from 'app/blocks/graphql/callback/updateGeneralFollowupGqlCallback';
import { createPatientGqlCallback } from 'app/blocks/graphql/callback/createPatientGqlCallback';
import { createCardiologyConditionGqlCallback } from 'app/blocks/graphql/callback/createCardiologyConditionGqlCallback';
import { updateCardiologyConditionGqlCallback } from 'app/blocks/graphql/callback/updateCardiologyConditionGqlCallback';
import { createCardiologyOperationGqlCallback } from 'app/blocks/graphql/callback/createCardiologyOperationGqlCallback';
import { updateCardiologyOperationGqlCallback } from 'app/blocks/graphql/callback/updateCardiologyOperationGqlCallback';
import { createCardiologyFollowupGqlCallback } from 'app/blocks/graphql/callback/createCardiologyFollowupCallback';
import { updateCardiologyFollowupGqlCallback } from 'app/blocks/graphql/callback/updateCardiologyFollowupGqlCallback';
import { updateCardiologyMedicalHistoryGqlCallback } from 'app/blocks/graphql/callback/updateCardiologyMedicalHistoryGqlCallback';
import { updateGeneralOperationGqlCallback } from 'app/blocks/graphql/callback/updateGeneralOperationGqlCallback';
import { createGeneralConditionGqlCallback } from 'app/blocks/graphql/callback/createGeneralConditionGqlCallback';
import { updateGeneralConditionGqlCallback } from 'app/blocks/graphql/callback/updateGeneralConditionGqlCallback';
import { HttpClient } from '@angular/common/http';
// import { GeneralConditionBase } from 'app/blocks/graphql/generated/bases';
import { of } from 'rxjs';

import { LightPatient } from 'app/blocks/models/LightPatient';
import { createDrugGqlCallback } from 'app/blocks/graphql/callback/createDrugGqlCallback';
import { createMedicationGqlCallback } from 'app/blocks/graphql/callback/createMedicationGqlCallback';
import { updateMedicationGqlCallback } from 'app/blocks/graphql/callback/updateMedicationGqlCallback';
import { Apollo } from 'apollo-angular';
import { PatientService } from 'app/patients/patient.service';
import { FuzzySearchService } from 'app/blocks/pipes/fuzzy-search.service';
import { PaginatorService } from 'app/blocks/utils/paginator.service';
import { lightPatientsQ } from 'app/blocks/graphql/gqlQueries';
@Injectable()
export class PatientsEffects {

    constructor(
        private actions$: Actions,

        private _patientGQL: PatientGQL,
        private _updatePatientGQL: UpdatePatientGQL,
        private _createPatientGQL: CreatePatientGQL,
        private _deletePatientGQL: DeletePatientGQL,
        private _patientMediaPoolFilesGQL: PatientMediaPoolFilesGQL,
        private _remarkDuplicatePatientGQL: RemarkDuplicatePatientGQL,
        private _patientsGQL: PatientsGQL,
        private _patientsTotalGQL: PatientsTotalGQL,

        private _grantorsGQL: GrantorsGQL,
        private _tagsGQL: TagsGQL,
        private _locationsGQL: LocationsGQL,
        private _activityMediaFilesGQL: ActivityMediaFilesGQL,
        private _deleteMediaFilesGQL: DeleteMediaFilesGQL,
        private _updateMediaFilesGQL: UpdateMediaFilesGQL,

        private _createGeneralConditionGQL: CreateGeneralConditionGQL,
        private _addMessageMutation: AddMessageGQL,
        private _updateGeneralConditionGQL: UpdateGeneralConditionGQL,
        private _createGeneralOperationGQL: CreateGeneralOperationGQL,
        private _updateGeneralOperationGQL: UpdateGeneralOperationGQL,
        private _createGeneralFollowupGQL: CreateGeneralFollowupGQL,
        private _updateGeneralFollowupGQL: UpdateGeneralFollowupGQL,
        private _updateGeneralMedicalHistoryGQL: UpdateGeneralMedicalHistoryGQL,

        private _createCardiologyConditionGQL: CreateCardiologyConditionGQL,
        private _updateCardiologyConditionGQL: UpdateCardiologyConditionGQL,
        private _createCardiologyOperationGQL: CreateCardiologyOperationGQL,
        private _updateCardiologyOperationGQL: UpdateCardiologyOperationGQL,
        private _createCardiologyFollowupGQL: CreateCardiologyFollowupGQL,
        private _updateCardiologyFollowupGQL: UpdateCardiologyFollowupGQL,
        private _updateCardiologyMedicalHistoryGQL: UpdateCardiologyMedicalHistoryGQL,
        private _httpClient: HttpClient,
        private _patientService: PatientService,

        private _createMedicationGQL: CreateMedicationGQL,
        private _updateMedicationGQL: UpdateMedicationsGQL,
        private _patientMedicationGQL: PatientMedicationGQL,
        private _patientMedicationByConditionGQL: PatientMedicationByConditionGQL,
        private _patientMedicationByFollowupGQL: PatientMedicationByFollowupGQL,


        private _createDrugGQL: CreateDrugGQL,
        private _drugsGQL: DrugsGQL,
        private _drugGQL: DrugGQL,
        private _apollo: Apollo,
        private _fuzzySearch: FuzzySearchService,
        private _paginator: PaginatorService,

    ) { }

    @Effect()
    loadPatients$ = this.actions$.pipe(
        ofType(fromPatientsActions.loadPatients),
        switchMap((data) =>
            // this._patientService.getLightPatients(data.variables.filter,
            //     data.variables.page,
            //     data.variables.size,
            //     data.variables.sortBy,
            //     false,
            //     {})
            //     .pipe(               
            //         tap((res: any) => { }),
            //         catchError((error, source) => {

            //             return of([]);
            //             return source;
            //         }),
            //     )
           // this._patientsGQL.watch({ ...data.variables }).valueChanges
           this._apollo.watchQuery<{ patients: Patient[] }>({
            query: lightPatientsQ,
            variables: data.variables
        }).valueChanges
            ),
        map(({ data, errors, loading }) => {

            const patients = data && data.patients ? data.patients : [];
            //console.log('effect',patients)
            if (errors) {
                return fromPatientsActions.loadPatientsFailure({ error: errors });
            }

            if (loading) {
                return fromPatientsActions.loadPatientsSuccess({ patients, fromServer: false });
            }
            else {
                return fromPatientsActions.loadPatientsSuccess({ patients, fromServer: true });
            }
        })
    );


    // @Effect()
    // loadPatientsSearch$ = this.actions$.pipe(
    //     ofType(fromPatientsActions.loadPatientsSearch),
    //     switchMap((data) => this._patientsGQL.watch({ ...data.variables }).valueChanges),
    //     map(({ data, errors, loading }) => {
            
    //         const patients = data && data.patients ? data.patients : []; 

    //             if (errors) {
    //                 return fromPatientsActions.loadPatientsSearchFailure({ error: errors });
    //             }
    
    //             if (loading) {
    //                 return fromPatientsActions.loadPatientsSearchSuccess({patientsSearch: patients, fromServer: false  });
    //             }
    //             else {
    //                 return fromPatientsActions.loadPatientsSearchSuccess({ patientsSearch: patients, fromServer: true });
    //             }
           
    //      } )
        
    // );



    @Effect()
    loadPatientsMdcBarSearch$ = this.actions$.pipe(
        ofType(fromPatientsActions.loadPatientsMdcBarSearch),
        switchMap((data) => 
        
        //this._patientsGQL.watch({ ...data.variables }).valueChanges
        this._apollo.watchQuery<{ patients: Patient[] }>({
            query: lightPatientsQ,
            variables: data.variables
        }).valueChanges
        ),
        map(({ data, errors, loading }) => {

            const patients = data && data.patients ? data.patients : [];

            if (errors) {
                return fromPatientsActions.loadPatientsMdcBarSearchFailure({ error: errors });
            }

            if (loading) {
                return fromPatientsActions.loadPatientsMdcBarSearchSuccess({ patientsSearch: patients, totalSearch: patients.length, fromServer: false });
            }
            else {
                return fromPatientsActions.loadPatientsMdcBarSearchSuccess({ patientsSearch: patients, totalSearch: patients.length, fromServer: true });
            }

        })

    );

    // switchMap((data) =>          
    // this._patientsGQL.watch({ ...data.variables }).valueChanges),

    // map(({ data, errors, loading }) => {

    //     const patients = data && data.patients ? data.patients : [];

    //     console.log('Effect-patients',patients)
    //        const patientFilter = this._fuzzySearch.search(
    //         patients,
    //         this.filter,
    //         ["name","telephone"],
    //         this.options);
    //         console.log('Effect-patientFilter',patientFilter)
    //     if (errors) {
    //         return fromPatientsActions.loadPatientsSearchFailure({ error: errors });
    //     }

    //     if (loading) {
    //         return fromPatientsActions.loadPatientsSearchSuccess({patientsSearch: patientFilter, totalSearch: patientFilter.length, fromServer: false  });
    //     }
    //     else {
    //         return fromPatientsActions.loadPatientsSearchSuccess({ patientsSearch: patientFilter, totalSearch: patientFilter.length,  fromServer: true });
    //     }
    //     )





    // map(({ data, errors, loading }) => {

    //     const patients = data && data.patients ? data.patients : [];
    //     console.log('Effect-patients',patients)
    //    const patientFilter = this._fuzzySearch.search(
    //         patients,
    //         "Hussein",
    //         ["name","telephone"],
    //         {
    //             keys: ["name","telephone"],
    //             fuzzySearchOptions: {},
    //             extractOriginalItem: false,
    //             outputLimit: 5000
    //         });
    //         console.log('Effect-patientFilter',patientFilter)



    // this._lightPatientsStoreService
    //     .search<LightPatient>(data.variables.filterStr, data.variables.options)
    //     .pipe(

    //         filter(() => true),
    //         catchError((error, source) => {
    //             return of({ data: null, loading: null });
    //             return source;
    //         }),
    //         map(({ data, loading }) => {
    //     if (!loading) {

    //         return fromPatientsActions.loadPatientsSearchSuccess({ patientsSearch: data, totalSearch: data.length, fromServer: true });
    //     }
    //     else {
    //         if (data != null) {
    //             return fromPatientsActions.loadPatientsSearchSuccess({ patientsSearch: data, totalSearch: data.length, fromServer: false });
    //         }
    //         else {
    //             console.log('error');
    //             return fromPatientsActions.loadPatientsSearchFailure({ error: true });
    //         }
    //     }
    // })
    //)
    // ),







    @Effect()
    loadPatientsTotal$ = this.actions$.pipe(
        ofType(fromPatientsActions.loadPatientsTotal),
        switchMap((data) => this._patientsTotalGQL.watch({ ...data.variables }).valueChanges),
        map(({ data, errors, loading }) => {

            const total = data && data.patientsTotal ? data.patientsTotal : null;

            if (errors) {
                return fromPatientsActions.loadPatientsTotalFailure({ error: errors });
            }

            if (loading) {
                return fromPatientsActions.loadPatientsTotalSuccess({ total, fromServer: false });
            }
            else {
                return fromPatientsActions.loadPatientsTotalSuccess({ total, fromServer: true });
            }
        })
    );

    @Effect()
    loadPatient$ = this.actions$.pipe(
        ofType(fromPatientsActions.loadPatient),
        switchMap((data) => this._patientGQL.watch({ id: data.id }).valueChanges),
        map(({ data, errors, loading }) => {
            const patient = data && data.patient ? data.patient : null;
            if (errors) {
                return fromPatientsActions.loadPatientFailure({ error: errors });
            }

            if (loading) {
                return fromPatientsActions.loadPatientSuccess({ patient, fromServer: false });
            }

            else {
                return fromPatientsActions.loadPatientSuccess({ patient, fromServer: true });
            }

        })
    );

    @Effect()
    updatePatient$ = this.actions$.pipe(
        ofType(fromPatientsActions.updatePatient),
        switchMap((data) => this._updatePatientGQL.mutate({ patient: data.patient as PatientInput },
            {
                optimisticResponse: updatePatientGqlCallback.optimisticResponse(data.patient),
                update: (proxy, ev) => updatePatientGqlCallback.update(proxy, ev)
            }

        )),
        map((data) => {

            const patient = data && data.data && data.data.updatePatient ? data.data.updatePatient : null;
            if (data['dataPresent']) {
                return fromPatientsActions.patientSavedLocally();
            }

            if (data.errors) {
                return fromPatientsActions.updatePatientFailure({ error: data.errors });
            }

            return fromPatientsActions.updatePatientSuccess({ patient });
        })
    );
    @Effect()
    updateGeneralMedicalHistory$ = this.actions$.pipe(
        ofType(fromPatientsActions.updateGeneralMedicalHistory),
        switchMap((data) => this._updateGeneralMedicalHistoryGQL.mutate(
            { patientId: data.patientId, medicalHistory: data.medicalHistory },
            {
                optimisticResponse: updateGeneralMedicalHistoryGqlCallback.optimisticResponse(data.medicalHistory),
                update: (proxy, ev) => updateGeneralMedicalHistoryGqlCallback.update(proxy, ev, data.patientId)
            }
        )),
        map((data) => {

            const medicalHistory = (data && data.data && data.data.updateGeneralMedicalHistory ? data.data.updateGeneralMedicalHistory : null) as GeneralMedicalHistoryInput;

            if (data['dataPresent']) {
                return fromPatientsActions.patientSavedLocally();
            }

            if (data.errors) {
                return fromPatientsActions.updateGeneralMedicalHistoryFailure({ error: data.errors });
            }


            return fromPatientsActions.updateGeneralMedicalHistorySuccess({ medicalHistory });
        })
    );

    @Effect()
    addMessage$ = this.actions$.pipe(
        ofType(fromPatientsActions.addMessage),
        switchMap((data) => this._addMessageMutation.mutate(
            { message: data.message }
        )),

        map((data) => {

            const createGeneralConditon = data
            console.log('data effect', data)
            if (data['dataPresent']) {
                return fromPatientsActions.patientSavedLocally();
            }

            if (data) {
                return fromPatientsActions.createGeneralConditionFailure({ error: null });
            }


            return fromPatientsActions.createGeneralConditionSuccess({ condition: null });
        })
    );


    @Effect()
    createGeneralCondition$ = this.actions$.pipe(
        ofType(fromPatientsActions.createGeneralCondition),
        switchMap((data) => this._createGeneralConditionGQL.mutate(
            { patientId: data.patientId, condition: data.condition as GeneralConditionInput },
            {
                optimisticResponse: createGeneralConditionGqlCallback.optimisticResponse(data.condition),
                update: (proxy, ev) => createGeneralConditionGqlCallback.update(proxy, ev, data.patientId)
            }
        )),

        map((data) => {

            const createGeneralConditon = data && data.data && data.data.createGeneralCondition ? data.data.createGeneralCondition : null;

            if (data['dataPresent']) {
                return fromPatientsActions.patientSavedLocally();
            }

            if (data.errors) {
                return fromPatientsActions.createGeneralConditionFailure({ error: data.errors });
            }


            return fromPatientsActions.createGeneralConditionSuccess({ condition: createGeneralConditon });
        })
    );

    @Effect()
    updateGeneralCondition$ = this.actions$.pipe(
        ofType(fromPatientsActions.updateGeneralCondition),
        switchMap((data) => this._updateGeneralConditionGQL.mutate(
            { patientId: data.patientId, condition: data.condition as GeneralConditionInput },
            {
                optimisticResponse: updateGeneralConditionGqlCallback.optimisticResponse(data.condition),
                update: (proxy, ev) => updateGeneralConditionGqlCallback.update(proxy, ev, data.patientId)
            }
        )),
        map((data) => {

            const updateGeneralConditon = data && data.data && data.data.updateGeneralCondition ? data.data.updateGeneralCondition : null;

            if (data['dataPresent']) {
                return fromPatientsActions.patientSavedLocally();
            }

            if (data.errors) {
                return fromPatientsActions.updateGeneralConditionFailure({ error: data.errors });
            }


            return fromPatientsActions.updateGeneralConditionSuccess({ condition: updateGeneralConditon });
        })
    );

    @Effect()
    createGeneralOperation$ = this.actions$.pipe(
        ofType(fromPatientsActions.createGeneralOperation),
        switchMap((data) => this._createGeneralOperationGQL.mutate(
            { patientId: data.patientId, conditionId: data.conditionId, operation: data.operation as GeneralOperationInput },
            {
                optimisticResponse: createGeneralOperationGqlCallback.optimisticResponse(data.operation),
                update: (proxy, ev) => createGeneralOperationGqlCallback.update(proxy, ev, data.patientId, data.conditionId)
            }
        )),



        map((data) => {

            const createGeneralOperation = data && data.data && data.data.createGeneralOperation ? data.data.createGeneralOperation : null;

            if (data['dataPresent']) {
                return fromPatientsActions.patientSavedLocally();
            }

            if (data.errors) {
                return fromPatientsActions.createGeneralOperationFailure({ error: data.errors });
            }


            return fromPatientsActions.createGeneralOperationSuccess({ operation: createGeneralOperation });
        })
    );

    @Effect()
    updateGeneralOpeartion$ = this.actions$.pipe(
        ofType(fromPatientsActions.updateGeneralOperation),
        switchMap((data) => this._updateGeneralOperationGQL.mutate(
            { patientId: data.patientId, conditionId: data.conditionId, replacedConditionId: data.replacedConditionId, operation: data.operation as GeneralOperationInput },
            {
                optimisticResponse: updateGeneralOperationGqlCallback.optimisticResponse(data.operation),
                update: (proxy, ev) => updateGeneralOperationGqlCallback.update(proxy, ev, data.patientId, data.conditionId, data.replacedConditionId)
            }
        )),
        map((data) => {

            const updateGeneralOperation = data && data.data && data.data.updateGeneralOperation ? data.data.updateGeneralOperation : null;

            if (data['dataPresent']) {
                return fromPatientsActions.patientSavedLocally();
            }

            if (data.errors) {
                return fromPatientsActions.updateGeneralOperationFailure({ error: data.errors });
            }


            return fromPatientsActions.updateGeneralOperationSuccess({ operation: updateGeneralOperation });
        })
    );

    @Effect()
    createGeneralFollowup$ = this.actions$.pipe(
        ofType(fromPatientsActions.createGeneralFollowup),
        switchMap((data) => this._createGeneralFollowupGQL.mutate(
            { patientId: data.patientId, conditionId: data.conditionId, followup: data.followup as GeneralFollowupInput },
            {
                optimisticResponse: createGeneralFollowupGqlCallback.optimisticResponse(data.followup),
                update: (proxy, ev) => createGeneralFollowupGqlCallback.update(proxy, ev, data.patientId, data.conditionId)
            }
        )),



        map((data) => {

            const createGeneralFollowup = data && data.data && data.data.createGeneralFollowup ? data.data.createGeneralFollowup : null;

            if (data['dataPresent']) {
                return fromPatientsActions.patientSavedLocally();
            }

            if (data.errors) {
                return fromPatientsActions.createGeneralFollowupFailure({ error: data.errors });
            }


            return fromPatientsActions.createGeneralFollowupSuccess({ followup: createGeneralFollowup });
        })
    );

    @Effect()
    updateGeneralFollowup$ = this.actions$.pipe(
        ofType(fromPatientsActions.updateGeneralFollowup),
        switchMap((data) => this._updateGeneralFollowupGQL.mutate(
            { patientId: data.patientId, conditionId: data.conditionId, replacedConditionId: data.replacedConditionId, followup: data.followup as GeneralFollowupInput },
            {
                optimisticResponse: updateGeneralFollowupGqlCallback.optimisticResponse(data.followup),
                update: (proxy, ev) => updateGeneralFollowupGqlCallback.update(proxy, ev, data.patientId, data.conditionId, data.replacedConditionId)
            }
        )),
        map((data) => {

            const updateGeneralFollowup = data && data.data && data.data.updateGeneralFollowup ? data.data.updateGeneralFollowup : null;

            if (data['dataPresent']) {
                return fromPatientsActions.patientSavedLocally();
            }

            if (data.errors) {
                return fromPatientsActions.updateGeneralFollowupFailure({ error: data.errors });
            }


            return fromPatientsActions.updateGeneralFollowupSuccess({ followup: updateGeneralFollowup });
        })
    );

    @Effect()
    createPatient$ = this.actions$.pipe(
        ofType(fromPatientsActions.createPatient),
        switchMap((data) => this._createPatientGQL.mutate({ patient: data.patient as PatientInput },
            {
                optimisticResponse: createPatientGqlCallback.optimisticResponse(data.patient),
                update: (proxy, ev) => createPatientGqlCallback.update(proxy, ev)
            }
        )),
        map((data) => {

            const patient = data && data.data && data.data.createPatient ? data.data.createPatient : null;

            if (data['dataPresent']) {
                return fromPatientsActions.patientSavedLocally();
            }

            if (data.errors) {
                return fromPatientsActions.createPatientFailure({ error: data.errors });
            }

            return fromPatientsActions.createPatientSuccess({ patient });
        })
    );


    @Effect()
    deletePatient$ = this.actions$.pipe(
        ofType(fromPatientsActions.deletePatient),
        switchMap((data) => this._deletePatientGQL.mutate({ patientId: data.id })),
        map((data) => {

            const patient = data && data.data && data.data.deletePatient ? data.data.deletePatient : null;

            if (data['dataPresent']) {
                return fromPatientsActions.patientSavedLocally();
            }

            if (data.errors) {
                return fromPatientsActions.deletePatientFailure({ error: data.errors });
            }

            return fromPatientsActions.deletePatientSuccess({ patient });
        })
    );

    @Effect()
    duplicatePatient$ = this.actions$.pipe(
        ofType(fromPatientsActions.duplicatePatient),
        switchMap((data) => this._remarkDuplicatePatientGQL.mutate({ patientId: data.id, isDuplicate: data.isDuplicate },
            {
                optimisticResponse: remarkDuplicatePatientGqlCallback.optimisticResponse(data),
                update: (proxy, ev) => remarkDuplicatePatientGqlCallback.update(proxy, ev, data)
            })),
        map((data) => {

            const patient: any = data && data.data && data.data.remarkDuplicatePatient ? data.data.remarkDuplicatePatient : null;
            if (data['dataPresent']) {
                return fromPatientsActions.duplicatePatientSavedLocally();
            }

            if (data.errors) {
                return fromPatientsActions.duplicatePatientFailure({ error: data.errors });
            }

            return fromPatientsActions.duplicatePatientSuccess({ patient });
        })
    );

    @Effect()
    loadGrantors$ = this.actions$.pipe(
        ofType(fromPatientsActions.loadGrantors),
        switchMap(() => this._grantorsGQL
            .watch({ filter: '', page: 1, size: 300 })
            .valueChanges),
        map(({ data, errors, loading }) => {

            const grantors = data && data.grantors ? data.grantors : [];
            if (errors) {
                return fromPatientsActions.loadGrantorsFailure({ error: errors });
            }

            else {
                return fromPatientsActions.loadGrantorsSuccess({ Grantors: grantors });
            }
        })
    );
    @Effect()
    loadTags$ = this.actions$.pipe(
        ofType(fromPatientsActions.loadTags),
        switchMap((data) => this._tagsGQL
            .watch({ filter: data.group, page: 1, size: 300 })
            .valueChanges),
        map(({ data, errors, loading }) => {

            const tags = data && data.tags ? data.tags : [];
            if (errors) {
                return fromPatientsActions.loadTagsFailure({ error: errors });
            }

            else {
                return fromPatientsActions.loadTagsSuccess({ Tags: tags });
            }
        })
    );

    @Effect()
    loadLocations$ = this.actions$.pipe(
        ofType(fromPatientsActions.loadLocations),
        switchMap(() => this._locationsGQL
            .watch()
            .valueChanges),
        map(({ data, errors }) => {

            const locations = data && data.locations ? data.locations : [];
            if (errors) {
                return fromPatientsActions.loadLocationsFailure({ error: errors });
            }


            else {
                return fromPatientsActions.loadLocationsSuccess({ Locations: locations });
            }
        })
    );

    @Effect()
    loadPatientMediaFiles$ = this.actions$.pipe(
        ofType(fromPatientsActions.LoadPatientMediaFiles),
        switchMap((data) => this._activityMediaFilesGQL.
            watch({
                patientId: data.id,
                speciality: data.speciality,
                conditionId: data.conditionId,
                activitType: data.activitType,
                activityId: data.activityId
            })
            .valueChanges),
        map(({ data, errors }) => {

            const mediaFiles = data && data.activityMediaFiles ? data.activityMediaFiles : [];
            if (errors) {
                return fromPatientsActions.LoadPatientMediaFilesFailed({ error: errors });
            }


            else {
                return fromPatientsActions.LoadPatientMediaFilesSuccess({ MediaFile: mediaFiles });
            }
        })
    );


    @Effect()
    deletePatientMediaFiles$ = this.actions$.pipe(
        ofType(fromPatientsActions.DeletePatientMediaFiles),
        switchMap((data) => this._deleteMediaFilesGQL.mutate({ id: data.id },
            {
                optimisticResponse: deleteMediaFilesGqlCallback.optimisticResponse(
                    data.id
                ),
                update: (proxy, ev) =>
                    deleteMediaFilesGqlCallback.update(proxy, ev)
            }

        )),
        map((data) => {

            const deletedMediaFiles = data && data.data && data.data.deleteMediaFiles ? data.data.deleteMediaFiles : null;

            if (data.errors) {
                return fromPatientsActions.DeletePatientMediaFilesFailed({ error: data.errors[0].extensions.data.message });
            }

            return fromPatientsActions.DeletePatientMediaFilesSuccess({ DeletedMediaFiles: deletedMediaFiles });
        })
    );

    @Effect()
    updatePatientMediaFiles$ = this.actions$.pipe(
        ofType(fromPatientsActions.UpdatePatientMediaFiles),
        switchMap((mediaFiles) => this._updateMediaFilesGQL
            .mutate(
                {
                    mediaFiles: mediaFiles.mediaFiles
                },
                {
                    optimisticResponse: updateMediaFilesGqlCallback.optimisticResponse(
                        mediaFiles.mediaFiles
                    ),
                    update: (proxy, ev) =>
                        updateMediaFilesGqlCallback.update(proxy, ev)
                }
            )),
        map((data) => {

            const updateMediaFiles = data && data.data && data.data.updateMediaFiles ? data.data.updateMediaFiles : null;

            if (data.errors) {
                return fromPatientsActions.UpdatePatientMediaFilesFailed({ error: data.errors });
            }

            return fromPatientsActions.UpdatePatientMediaFilesSuccess({ UpdateMediaFiles: updateMediaFiles });
        })
    );

    @Effect()
    loadPatientMediaPoolFiles$ = this.actions$.pipe(
        ofType(fromPatientsActions.LoadPatientMediaPoolFiles),
        switchMap((data) => this._patientMediaPoolFilesGQL.
            watch({
                patientId: data.patientId
            })
            .valueChanges),
        map(({ data, errors }) => {

            const mediaPoolFiles = data && data.patientMediaPoolFiles ? data.patientMediaPoolFiles : [];
            if (errors) {
                return fromPatientsActions.LoadPatientMediaPoolFilesFailed({ error: errors });
            }


            else {
                return fromPatientsActions.LoadPatientMediaPoolFilesSuccess({ PatientMediaPoolFiles: mediaPoolFiles });
            }
        })
    );


    // ---------------------------------------------
    //                 CARDIOLOGY
    // ---------------------------------------------


    // createCardiologyCondition
    @Effect()
    createCardiologyCondition$ = this.actions$.pipe(
        ofType(fromPatientsActions.createCardiologyCondition),
        switchMap((data) => this._createCardiologyConditionGQL.mutate(
            { patientId: data.patientId, condition: data.condition as CardiologyConditionInput },
            {
                optimisticResponse: createCardiologyConditionGqlCallback.optimisticResponse(data.condition),
                update: (proxy, ev) =>
                    createCardiologyConditionGqlCallback.update(proxy, ev, data.patientId)
            }
        )),

        map((data) => {

            const createCardiologyConditon = data && data.data && data.data.createCardiologyCondition ? data.data.createCardiologyCondition : null;

            if (data['dataPresent']) {
                return fromPatientsActions.patientSavedLocally();
            }

            if (data.errors) {
                return fromPatientsActions.createCardiologyConditionFailure({ error: data.errors });
            }


            return fromPatientsActions.createCardiologyConditionSuccess({ condition: createCardiologyConditon });
        })
    );

    // updateCardiologyCondition
    @Effect()
    updateCardiologyCondition$ = this.actions$.pipe(
        ofType(fromPatientsActions.updateCardiologyCondition),
        switchMap((data) => this._updateCardiologyConditionGQL.mutate(
            { patientId: data.patientId, condition: data.condition as CardiologyConditionInput },

            {
                optimisticResponse: updateCardiologyConditionGqlCallback.optimisticResponse(data.condition),
                update: (proxy, ev) => updateCardiologyConditionGqlCallback.update(proxy, ev, data.patientId)
            }
        )),
        map((data) => {
            const updateCardiologyConditon = data && data.data && data.data.updateCardiologyCondition ? data.data.updateCardiologyCondition : null;

            if (data['dataPresent']) {
                return fromPatientsActions.patientSavedLocally();
            }

            if (data.errors) {
                return fromPatientsActions.updateCardiologyConditionFailure({ error: data.errors });
            }


            return fromPatientsActions.updateCardiologyConditionSuccess({ condition: updateCardiologyConditon });
        })
    );

    // createCardiologyOperation
    @Effect()
    createCardiologyOperation$ = this.actions$.pipe(
        ofType(fromPatientsActions.createCardiologyOperation),
        switchMap((data) => this._createCardiologyOperationGQL.mutate(
            { patientId: data.patientId, conditionId: data.conditionId, operation: data.operation as CardiologyOperationInput },

            {
                optimisticResponse: createCardiologyOperationGqlCallback.optimisticResponse(data.operation),
                update: (proxy, ev) => createCardiologyOperationGqlCallback.update(proxy, ev, data.patientId, data.conditionId)
            }
        )),



        map((data) => {

            const createCardiologyOperation = data && data.data && data.data.createCardiologyOperation ? data.data.createCardiologyOperation : null;

            if (data['dataPresent']) {
                return fromPatientsActions.patientSavedLocally();
            }

            if (data.errors) {
                return fromPatientsActions.createCardiologyOperationFailure({ error: data.errors });
            }


            return fromPatientsActions.createCardiologyOperationSuccess({ operation: createCardiologyOperation });
        })
    );

    // updateCardiologyOpeartion
    @Effect()
    updateCardiologyOpeartion$ = this.actions$.pipe(
        ofType(fromPatientsActions.updateCardiologyOperation),
        switchMap((data) => this._updateCardiologyOperationGQL.mutate(
            { patientId: data.patientId, conditionId: data.conditionId, replacedConditionId: data.replacedConditionId, operation: data.operation as CardiologyOperationInput },
            {
                optimisticResponse: updateCardiologyOperationGqlCallback.optimisticResponse(data.operation),
                update: (proxy, ev) => updateCardiologyOperationGqlCallback.update(proxy, ev, data.patientId, data.conditionId, data.replacedConditionId)
            }
        )),



        map((data) => {

            const updateCardiologyOperation = data && data.data && data.data.updateCardiologyOperation ? data.data.updateCardiologyOperation : null;

            if (data['dataPresent']) {
                return fromPatientsActions.patientSavedLocally();
            }

            if (data.errors) {
                return fromPatientsActions.updateCardiologyOperationFailure({ error: data.errors });
            }


            return fromPatientsActions.updateCardiologyOperationSuccess({ operation: updateCardiologyOperation });
        })
    );

    // createCardiologyFollowup
    @Effect()
    createCardiologyFollowup$ = this.actions$.pipe(
        ofType(fromPatientsActions.createCardiologyFollowup),
        switchMap((data) => this._createCardiologyFollowupGQL.mutate(
            { patientId: data.patientId, conditionId: data.conditionId, followup: data.followup as CardiologyFollowupInput },
            {
                optimisticResponse: createCardiologyFollowupGqlCallback.optimisticResponse(data.followup),
                update: (proxy, ev) => createCardiologyFollowupGqlCallback.update(proxy, ev, data.patientId, data.conditionId)
            }
        )),

        map((data) => {

            const createCardiologyFollowup = data && data.data && data.data.createCardiologyFollowup ? data.data.createCardiologyFollowup : null;

            if (data['dataPresent']) {
                return fromPatientsActions.patientSavedLocally();
            }

            if (data.errors) {
                return fromPatientsActions.createCardiologyFollowupFailure({ error: data.errors });
            }


            return fromPatientsActions.createCardiologyFollowupSuccess({ followup: createCardiologyFollowup });
        })
    );
    // updateCardiologyFollowup
    @Effect()
    updateCardiologyFollowup$ = this.actions$.pipe(
        ofType(fromPatientsActions.updateCardiologyFollowup),
        switchMap((data) => this._updateCardiologyFollowupGQL.mutate(
            { patientId: data.patientId, conditionId: data.conditionId, replacedConditionId: data.replacedConditionId, followup: data.followup as CardiologyFollowupInput },
            {
                optimisticResponse: updateCardiologyFollowupGqlCallback.optimisticResponse(data.followup),
                update: (proxy, ev) => updateCardiologyFollowupGqlCallback.update(proxy, ev, data.patientId, data.conditionId, data.replacedConditionId)
            }
        )),


        map((data) => {

            const updateCardiologyFollowup = data && data.data && data.data.updateCardiologyFollowup ? data.data.updateCardiologyFollowup : null;

            if (data['dataPresent']) {
                return fromPatientsActions.patientSavedLocally();
            }

            if (data.errors) {
                return fromPatientsActions.updateCardiologyFollowupFailure({ error: data.errors });
            }


            return fromPatientsActions.updateCardiologyFollowupSuccess({ followup: updateCardiologyFollowup });
        })
    );

    // updateCardiologyMedicalHistory
    @Effect()
    updateCardiologyMedicalHistory$ = this.actions$.pipe(
        ofType(fromPatientsActions.updateCardiologyMedicalHistory),
        switchMap((data) => this._updateCardiologyMedicalHistoryGQL.mutate(
            { patientId: data.patientId, medicalHistory: data.medicalHistory },
            {
                optimisticResponse: updateCardiologyMedicalHistoryGqlCallback.optimisticResponse(data.medicalHistory),
                update: (proxy, ev) => updateCardiologyMedicalHistoryGqlCallback.update(proxy, ev, data.patientId)
            }
        )),
        map((data) => {

            const medicalHistory = (data && data.data && data.data.updateCardiologyMedicalHistory ? data.data.updateCardiologyMedicalHistory : null) as CardiologyMedicalHistoryInput;

            if (data['dataPresent']) {
                return fromPatientsActions.patientSavedLocally();
            }

            if (data.errors) {
                return fromPatientsActions.updateCardiologyMedicalHistoryFailure({ error: data.errors });
            }


            return fromPatientsActions.updateCardiologyMedicalHistorySuccess({ medicalHistory });
        })
    );


    // @Effect()
    // loadMedications$= this.actions$.pipe(
    //     ofType(fromPatientsActions.loadMedications),
    //     switchMap((action) =>  { return this._httpClient.get('api/medication?patientId='+ action.patientId)
    //     .pipe(
    //     map((data:Medication[]) => {
    //    console.log('effect',data)
    //             return fromPatientsActions.loadMedicationsSuccess({ medications:data })

    //     }),

    //     catchError(err => {
    //         console.error(err);
    //         return of( fromPatientsActions.loadMedicationsFailure({error:err}));
    //      })
    //     )
    //  } ) )

    @Effect()
    loadMedications$ = this.actions$.pipe(
        ofType(fromPatientsActions.loadMedications),
        switchMap((data) => this._patientMedicationGQL.watch({ patientId: data.patientId }).valueChanges),
        map(({ data, errors, loading }) => {
            const patientMedication = data && data.patientMedication ? data.patientMedication : [];

            if (errors) {
                return fromPatientsActions.loadMedicationsFailure({ error: errors });
            }
            if (loading) {
                return fromPatientsActions.loadMedicationsSuccess({ medications: patientMedication });
            }

            return fromPatientsActions.loadMedicationsSuccess({ medications: patientMedication });
        })
    );
    @Effect()
    loadMedicationsByCondition$ = this.actions$.pipe(
        ofType(fromPatientsActions.loadMedicationsByCondition),
        switchMap((data) => this._patientMedicationByConditionGQL.watch({ patientId: data.patientId, conditionId: data.conditionId }).valueChanges),
        map(({ data, errors, loading }) => {
            const patientMedication = data && data.patientMedicationByCondition ? data.patientMedicationByCondition : [];
            // console.log('effect',patientMedication)
            if (loading) {
                return fromPatientsActions.loadMedicationsByConditionSuccess({ medications: patientMedication });
            }

            if (errors) {
                return fromPatientsActions.loadMedicationsByConditionFailure({ error: errors });
            }

            return fromPatientsActions.loadMedicationsByConditionSuccess({ medications: patientMedication });
        })
    );
    @Effect()
    loadMedicationsByFollowup$ = this.actions$.pipe(
        ofType(fromPatientsActions.loadMedicationsByFollowup),
        switchMap((data) => this._patientMedicationByFollowupGQL.watch({ patientId: data.patientId, followupId: data.followupId }).valueChanges),
        map(({ data, errors, loading }) => {
            const patientMedication = data && data.patientMedicationByFollowup ? data.patientMedicationByFollowup : [];

            if (loading) {
                return fromPatientsActions.loadMedicationsByFollowupSuccess({ medications: patientMedication });
            }

            if (errors) {
                return fromPatientsActions.loadMedicationsByFollowupFailure({ error: errors });
            }

            return fromPatientsActions.loadMedicationsByFollowupSuccess({ medications: patientMedication });
        })
    );

    @Effect()
    newMedication$ = this.actions$.pipe(
        ofType(fromPatientsActions.newMedication),
        switchMap((data) =>
            this._createMedicationGQL.mutate(
                { patientMedications: data.medication },
                {
                    optimisticResponse: createMedicationGqlCallback.optimisticResponse(data.medication),
                    update: (proxy, ev) => createMedicationGqlCallback.update(proxy, ev)
                }

            )),
        map((data) => {

            const newMedication = (data && data.data && data.data.createMedication ? data.data.createMedication : []) as PatientMedicationsInputBase;

            if (data['dataPresent']) {
                return fromPatientsActions.newMedicationSavedLocally({ medication: newMedication });
            }

            if (data.errors) {
                return fromPatientsActions.newMedicationFailure({ error: data.errors });
            }


            return fromPatientsActions.newMedicationSuccess({ medication: newMedication });
        })
    );

    // RenewMedication
    @Effect()
    renewMedication$ = this.actions$.pipe(
        ofType(fromPatientsActions.renewMedication),
        switchMap((data) =>
            this._updateMedicationGQL.mutate(
                {
                    patientMedications: data.medication
                    , medicationId: data.medication.medicationId,
                    patientId: data.medication.patientId
                },
                {
                    optimisticResponse: updateMedicationGqlCallback.optimisticResponse(data.medication),
                    update: (proxy, ev) => updateMedicationGqlCallback.update(proxy, ev)
                }


            )),
        map((data) => {

            const renewMedication = (data && data.data && data.data.updateMedications ? data.data.updateMedications : []) as PatientMedicationsInputBase;
            if (data['dataPresent']) {
                return fromPatientsActions.renewMedicationSavedLocally({ medication: renewMedication });
            }
            if (data.errors) {
                return fromPatientsActions.renewMedicationFailure({ error: data.errors });
            }


            return fromPatientsActions.renewMedicationSuccess({ medication: renewMedication });
        })
    );


    // //RenewMedication
    // @Effect()
    // renewMedication$= this.actions$.pipe(
    //     ofType(fromPatientsActions.renewMedication),
    //     switchMap((action) =>  { 
    //         return this._httpClient.put('api/medication/'+action.medication.id+'/'+action.medication.patientId , {...action.medication})
    //     .pipe(
    //     map(() => {
    //             return fromPatientsActions.renewMedicationSuccess({ medication:action.medication })          
    //     }),

    //     catchError(err => {
    //         console.error(err);
    //         return of( fromPatientsActions.renewMedicationFailure({error:err}));
    //      })
    //     )
    //  } )

    // )

    // StopMedication
    @Effect()
    stopMedication$ = this.actions$.pipe(
        ofType(fromPatientsActions.stopMedication),
        switchMap((data) =>
            this._updateMedicationGQL.mutate(
                {
                    patientMedications: data.medication
                    , medicationId: data.medication.medicationId,
                    patientId: data.medication.patientId
                },
                {
                    optimisticResponse: updateMedicationGqlCallback.optimisticResponse(
                        data.medication
                    ),
                    update: (proxy, ev) =>
                        updateMedicationGqlCallback.update(proxy, ev)
                }


            )),
        map((data) => {

            const stopMedication = (data && data.data && data.data.updateMedications ? data.data.updateMedications : []) as PatientMedicationsInputBase;

            if (data['dataPresent']) {
                return fromPatientsActions.stopMedicationSavedLocally({ medication: stopMedication });
            }
            if (data.errors) {
                return fromPatientsActions.stopMedicationFailure({ error: data.errors });
            }


            return fromPatientsActions.stopMedicationSuccess({ medication: stopMedication });
        })
    );

    // StopMedication
    // @Effect()
    // stopMedication$= this.actions$.pipe(
    //     ofType(fromPatientsActions.stopMedication),
    //     switchMap((action) =>  { return this._httpClient.put('api/medication/'+action.medication.id+'/'+action.medication.patientId , {...action.medication})
    //     .pipe(
    //     map(() => {
    //             return fromPatientsActions.stopMedicationSuccess({ medication:action.medication })          
    //     }),

    //     catchError(err => {
    //         console.error(err);
    //         return of( fromPatientsActions.stopMedicationFailure({error:err}));
    //      })
    //     )
    //  } )

    // )



    @Effect()
    loadDrugsSearch$ = this.actions$.pipe(
        ofType(fromPatientsActions.loadDrugsSearch),
        switchMap((data) => this._drugsGQL.watch({ ...data.variables }).valueChanges),
        map(({ data, errors, loading }) => {

            const drugs = data && data.drugs ? data.drugs : [];

            if (errors) {
                return fromPatientsActions.loadDrugsSearchFailure({ error: errors });
            }
            if (loading) {
                return fromPatientsActions.loadDrugsSearchSuccess({ drugs: drugs });
            }

            return fromPatientsActions.loadDrugsSearchSuccess({ drugs: drugs });
        })
    );



    @Effect()
    newDrug$ = this.actions$.pipe(
        ofType(fromPatientsActions.newDrug),
        switchMap((data) =>
            this._createDrugGQL.mutate(
                { drug: data.drug },
                {
                    optimisticResponse: createDrugGqlCallback.optimisticResponse(
                        data.drug
                    ),
                    update: (proxy, ev) =>
                        createDrugGqlCallback.update(proxy, ev)
                }

            )),
        map((data) => {

            const newDrug = (data && data.data && data.data.createDrug ? data.data.createDrug : []) as DrugInput;

            if (data['dataPresent']) {
                return fromPatientsActions.drugSavedLocally({ drug: newDrug });
            }

            if (data.errors) {
                return fromPatientsActions.newDrugFailure({ error: data.errors });
            }


            return fromPatientsActions.newDrugSuccess({ drug: newDrug });
        })
    );


}
