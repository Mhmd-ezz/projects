import { PatientsDocument } from './../blocks/graphql/generated/gqlServices';
import { contactsQ } from './../blocks/graphql/gqlQueries';
import { Observable, BehaviorSubject, of, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Logger } from "@nsalaun/ng-logger";
import {
    Patient,
    PatientGQL,
    PatientsGQL,
    PatientsTotalGQL,
    Contact,
    CardiologyOperation,
    CardiologyCondition,
    CardiologyFollowup
} from "../blocks/graphql/generated/gqlServices";
import {
    GeneralCondition,
    GeneralFollowup,
    GeneralOperation
} from "../blocks/graphql/generated/gqlServices";
import { map } from "rxjs/operators";
import { Apollo } from "apollo-angular";
import { lightPatientsQ } from "app/blocks/graphql/gqlQueries";
import findIndex from 'lodash/findIndex';


@Injectable()
export class PatientService {
    private patient: Patient;

    onPatientsChanged: BehaviorSubject<any>;
    onCurrentPatientChanged: BehaviorSubject<any>;
    onpatientMediaPoolChange: Subject<any> = new Subject();

    /**
     * Creates an instance of PatientService.
     * @param {PatientsGQL} _patientsGql
     *
     * @memberOf PatientService
     */
    constructor(
        private _patientsGql: PatientsGQL,
        private _patientGql: PatientGQL,
        private _apollo: Apollo,
        private _logger: Logger,
        private _patientsTotalGQL: PatientsTotalGQL,

    ) {
        // @ Set Defaults
        this.onPatientsChanged = new BehaviorSubject([]);
        this.onCurrentPatientChanged = new BehaviorSubject({});
    }

    /**
     * 
     * 
     * @param {string} [filter=""] 
     * @param {number} [page=1] 
     * @param {number} [size=10] 
     * @param {*} [options={}] 
     * @returns 
     * 
     * @memberOf PatientService
     */
    getPatients(filter = "", page = 1, size = 10, sortBy: string, descending: string | boolean, options: any = {}) {

        if (typeof descending == 'string') descending = descending == "desc" ? true : false;

        return this._patientsGql.watch({ filter, page, size, sortBy, descending }, options)
            .valueChanges
    }

    /**
     * 
     * 
     * @param {string} [filter=""] 
     * @param {number} [page=1] 
     * @param {number} [size=10] 
     * @param {string} sortBy 
     * @param {(string | boolean)} descending 
     * @param {*} [options={}] 
     * @returns 
     * 
     * @memberOf PatientService
     */
    getLightPatients(filter = "", page = 1, size = 10, sortBy: string, descending: string | boolean, options: any = {}) {

        if (typeof descending == 'string') descending = descending == "desc" ? true : false;

        return this._apollo.watchQuery<{ patients: Patient[] }>({
            query: lightPatientsQ,
            variables: { filter: filter, page: page, size: size, sortBy: sortBy, descending: descending },
            fetchPolicy: options.fetchPolicy || 'cache-and-network'
        }).valueChanges
    }

    getPatientsTotal(filter = "", page = 1, size = 10, sortBy: string, descending: string | boolean) {

        if (typeof descending == 'string') descending = descending == "desc" ? true : false;

        return this._patientsTotalGQL.watch(
            { filter: filter, page: page, size: size, sortBy: sortBy, descending: descending }
        ).valueChanges
    }

    getContacts(filter = "", page = 1, size = 10, sortBy: string, descending: string | boolean, options: any = {}) {

        if (typeof descending == 'string') descending = descending == "desc" ? true : false;

        return this._apollo.watchQuery<{ contacts: Contact[] }>({
            query: contactsQ,
            variables: { filter: filter, page: page, size: size, sortBy: sortBy, descending: descending },
            fetchPolicy: options.fetchPolicy || 'cache-and-network'
        }).valueChanges
    }


    /**
     * Get Patient by id
     *
     * @returns {void}
     */
    getPatientById(id): void {
        this.clearCurrentPatient();

        this._patientGql.watch({ id: id }).valueChanges.subscribe(response => {
            if (response.data && response.data.patient)
                this.patient = Object.assign({}, response.data.patient);

            this.onCurrentPatientChanged.next(response);
        });
    }

    getGeneralFollowup(
        followupId: string,
        conditionId: string
    ): GeneralFollowup | null {
        if (!this.patient) return null;

        if (
            this.patient &&
            this.patient.patientInfo.specialities &&
            this.patient.patientInfo.specialities.general &&
            this.patient.patientInfo.specialities.general.conditions.length
        ) {
            if (!this.patient) {
                this._logger.error("[Warning]: couldn't find patient");
                return null;
            }

            let conditionIndex = findIndex(
                this.patient.patientInfo.specialities.general.conditions,
                ["id", conditionId]
            );
            if (conditionIndex === -1) {
                this._logger.error("[Warning]: couldn't find condition");
                return null;
            }

            let condition: GeneralCondition = this.patient.patientInfo.specialities.general
                .conditions[conditionIndex];

            let followupIndex = findIndex(condition.activities.followups, [
                "id",
                followupId
            ]);
            if (followupIndex === -1) {
                this._logger.error("[Warning]: couldn't find followup");
                return null;
            }

            let followup: GeneralFollowup =
                condition.activities.followups[followupIndex];

            return followup;
        }
    }

    getCardiologyFollowup(
        followupId: string,
        conditionId: string
    ): CardiologyFollowup | null {
        if (!this.patient) return null;

        if (
            this.patient &&
            this.patient.patientInfo.specialities &&
            this.patient.patientInfo.specialities.cardiology &&
            this.patient.patientInfo.specialities.cardiology.conditions.length
        ) {
            if (!this.patient) {
                this._logger.error("[Warning]: couldn't find patient");
                return null;
            }

            let conditionIndex = findIndex(
                this.patient.patientInfo.specialities.cardiology.conditions,
                ["id", conditionId]
            );
            if (conditionIndex === -1) {
                this._logger.error("[Warning]: couldn't find condition");
                return null;
            }

            let condition: CardiologyCondition = this.patient.patientInfo.specialities.cardiology
                .conditions[conditionIndex];

            let followupIndex = findIndex(condition.activities.followups, [
                "id",
                followupId
            ]);
            if (followupIndex === -1) {
                this._logger.error("[Warning]: couldn't find followup");
                return null;
            }

            let followup: CardiologyFollowup =
                condition.activities.followups[followupIndex];

            return followup;
        }
    }

    getGeneralOperation(
        operationId: string,
        conditionId: string
    ): GeneralOperation | null {
        console.log('we are herea')
        if (!this.patient) return null;

        if (
            this.patient &&
            this.patient.patientInfo.specialities &&
            this.patient.patientInfo.specialities.general &&
            this.patient.patientInfo.specialities.general.conditions.length
        ) {
            console.log('we are here')
            if (!this.patient) {
                this._logger.error("[Warning]: couldn't find patient");
                return null;
            }

            let conditionIndex = findIndex(
                this.patient.patientInfo.specialities.general.conditions,
                ["id", conditionId]
            );
            console.log(conditionIndex)
            if (conditionIndex === -1) {
                this._logger.error("[Warning]: couldn't find operation");
                return null;
            }

            let condition: GeneralCondition = this.patient.patientInfo.specialities.general
                .conditions[conditionIndex];
            console.log(condition)
            let operationIndex = findIndex(condition.activities.operations, [
                "id",
                operationId
            ]);
            console.log(operationIndex)
            if (operationIndex === -1) {
                this._logger.error("[Warning]: couldn't find operation");
                return null;
            }

            let operation: GeneralOperation =
                condition.activities.operations[operationIndex];
            console.log(operation)
            return operation;
        }
    }

    getCardiologyOperation(
        operationId: string,
        conditionId: string
    ): CardiologyOperation | null {
        if (!this.patient) return null;

        if (
            this.patient &&
            this.patient.patientInfo.specialities &&
            this.patient.patientInfo.specialities.cardiology &&
            this.patient.patientInfo.specialities.cardiology.conditions.length
        ) {
            if (!this.patient) {
                this._logger.error("[Warning]: couldn't find patient");
                return null;
            }

            let conditionIndex = findIndex(
                this.patient.patientInfo.specialities.cardiology.conditions,
                ["id", conditionId]
            );
            if (conditionIndex === -1) {
                this._logger.error("[Warning]: couldn't find operation");
                return null;
            }

            let condition: CardiologyCondition = this.patient.patientInfo.specialities.cardiology
                .conditions[conditionIndex];

            let operationIndex = findIndex(condition.activities.operations, [
                "id",
                operationId
            ]);
            if (operationIndex === -1) {
                this._logger.error("[Warning]: couldn't find operation");
                return null;
            }

            let operation: CardiologyOperation =
                condition.activities.operations[operationIndex];

            return operation;
        }
    }

    /**
     * Clear current patient
     *
     * @returns {void}
     */
    clearCurrentPatient(): void {
        this.onCurrentPatientChanged.next({});
    }
}
