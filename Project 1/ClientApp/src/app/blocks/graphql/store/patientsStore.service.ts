import { Injectable } from "@angular/core";
import { ApolloCache, ApolloClient } from "@apollo/client/core";
import { Apollo } from "apollo-angular";
// import { ApolloCache } from "apollo-cache";
// import ApolloClient from "apollo-client";
import { AppUtils } from "app/blocks/utils";
import gql from "graphql-tag";
import { BehaviorSubject, Observable } from "rxjs";
import { Patient } from "../generated/gqlServices";
import { patientFragment } from "../gqlFragments";
import { patientsQ } from "../gqlQueries";

@Injectable({
    providedIn: "root"
})
export class PatientsStoreService {
    // @ key which lives in root_query that holds all patients and args is empty
    private ObjectKey: string = "patients({})"

    private client: ApolloClient<any>
    private cache: ApolloCache<any>
    private patients: Patient[] = []

    private patientsSubject: BehaviorSubject<Patient[]> = new BehaviorSubject<Patient[]>([])

    constructor(private _apollo: Apollo) {
        this.client = this._apollo.client
        this.cache = this.client.cache
    }

    getPatients(): Observable<Patient[]> {

        // @ patients found in store
        let StoredPatients = this.getStoredPatients()

        // @ patients found in RootQuery
        let RootQueryPatients = this.getRootQueryPatients()

        // @ if RootQueryPatients doesn't contain all patients found in store
        if (StoredPatients.length != RootQueryPatients.length) {
            // @ update root query -> patients
            this.cache["data"]["data"]["ROOT_QUERY"][this.ObjectKey] = StoredPatients

            // @ then update rootQuery
            this.updateRootQuery()

            let patients: Patient[] = this.readPatients()

            if (patients && patients.length) {
                this.patientsSubject.next(patients)
                return this.patientsSubject.asObservable()
            }
        } else {
            let patients: Patient[] = this.readPatients()

            if (patients && patients.length) {
                this.patientsSubject.next(patients)
                return this.patientsSubject.asObservable()
            }
        }
    }

    /**
     *
     * Returns all patients found in store as array of object reference
     *
     * @private
     * @returns {any[]}
     *
     * @memberOf PatientsStoreService
     */
    public getStoredPatients(): any[] {
        let storedPatients = []

        let store: any[] = this.client.cache["data"]["data"]

        for (var j = 0, keys = Object.keys(store); j < keys.length; j++) {
            if (keys[j].startsWith("Patient:"))
                storedPatients.push({
                    generated: false,
                    id: keys[j],
                    type: "id",
                    typename: "Patient"
                })
        }

        // console.time("readPatients-loop3")
        // //@ read store and find for patients
        // Object.keys(this.client.cache["data"]["data"]).map((key, index) => {
        //     // @ looking for patients
        //     if (key.startsWith("Patient:"))
        //         storedPatients.push({
        //             generated: false,
        //             id: key,
        //             type: "id",
        //             typename: "Patient"
        //         })
        // })
        // console.timeEnd("readPatients-loop3")

        return storedPatients
    }

    /**
     * return array of objects refernces found in root query (patients)
     *
     * @private
     * @returns {any[]}
     *
     * @memberOf PatientsStoreService
     */
    public getRootQueryPatients(): any[] {
        let rootQuery = []
        let patientsArray: Patient[] | null | undefined = this.client.cache["data"]["data"][
            "ROOT_QUERY"
        ][this.ObjectKey]

        if (patientsArray && patientsArray.length) rootQuery = Object.assign([], patientsArray)

        return rootQuery
    }

    /**
     * Read patients from ROOT_QUERY with no args (variables : {})
     *
     * @returns {Patient[]}
     *
     * @memberOf PatientsStoreService
     */
    readPatients(): Patient[] {
        let patients: Patient[] = []

        try {
            const patientsObj: any = this.client.cache.readQuery({
                query: patientsQ,
                variables: {}
            })
            if (patientsObj && patientsObj.patients) patients = patientsObj.patients
        } catch (err) {
            // @ if patients rootQuery not found
            this.client.cache.writeQuery({
                query: patientsQ,
                variables: {},
                data: { patients: [] }
            })
        }
        return patients
    }

    pushToStore(patients: Patient[]): void {
        if (!patients.length) return

        // @ load all fragments
        let FragmentsStore = Object.assign([], this.client.cache["data"]["data"])

        // @ this array will hold new patients that are not found in store to be persisted in store later on
        let newPatientsRef: any[] = []

        patients.map((patient: Patient, index) => {
            // @ check if patient exists in store (fragment)
            if (FragmentsStore["Patient:" + patient.id]) {
            } else {
                // @ add the patient to fragments store
                this.writeFragment(patient)

                // @ then prepare this patient object reference to be pushed
                newPatientsRef.push({
                    generated: false,
                    id: "Patient:" + patient.id,
                    type: "id",
                    typename: "Patient"
                })
            }
        })

        // @ new patients need to be pushed to ROOT_QUERY
        if (newPatientsRef.length) {
            // @ push new patients to ROOT_QUERY
            this.client.cache["data"]["data"]["ROOT_QUERY"][this.ObjectKey].push(...newPatientsRef)

            // @ Important : update in order changes take effect
            this.updateRootQuery()

            // @ broadcast new list, bcs there are new patients added to store
            let patients_ = this.readPatients()
            if (patients_ && patients_.length) this.patientsSubject.next(patients_)
        }
    }

    writeFragment(patient: Patient): void {
        this.client.writeFragment({
            id: "Patient:" + patient.id,
            fragment: gql`
                ${patientFragment}
            `,
            data: patient
        })
    }

    /**
     * 1. calling updateRootQuery() will update PatientsModfied date in rootQuery
     * 2. important to call updateRootQuery() after setting any item in rootQuery to value in order changes to take effect
     *       ex: client.cache['data']['data']['ROOT_QUERY']['xyz'] = arrayOfReference
     *         then call updateRootQuery()
     *
     *
     * @memberOf PatientsStoreService
     */
    updateRootQuery(): void {
        // this.client.cache.writeData({ data: { PatientsModfied: new Date().toISOString() } })
    }

    private addNonPatientDummyData() {
        let dataCache = this.cache["data"]
        for (let i = 0; i < 30000; i++) {
            dataCache.set(`LightData:${i}`, { data: i })
        }
    }

    private addDummyPatientsData(count) {
        // @ at least 1 Patient in store to clone
        let PatientKey = Object.keys(this.client.cache["data"]["data"]).find((x) =>
            x.startsWith("Patient:")
        )

        if (!PatientKey) return

        let ExtractedPatient: Patient = this.client.readFragment({
            fragment: gql`
                ${patientFragment}
            `,
            id: PatientKey
        })

        for (let i = 0; i < count; i++) {
            let patient: Patient = Object.assign({}, ExtractedPatient)

            patient.id = AppUtils.GenerateObjectId()

            this.client.writeFragment({
                id: "Patient:" + patient.id,
                fragment: gql`
                    ${patientFragment}
                `,
                data: patient
            })
        }
    }
}
