import { gql, InMemoryCache } from '@apollo/client/core';
import * as automapper from 'automapper-ts';
import { CreatePatientMutation, Patient } from '../generated/gqlServices';
import { lightPatientFragment } from '../gqlFragments';
import { patientQ } from './../gqlQueries';

export class createPatientGqlCallback {

    /**
     * 
     * 
     * @static
     * @param {any} variables 
     * @returns 
     * 
     * @memberOf createPatientGqlCallback
     */
    public static optimisticResponse(variables) : CreatePatientMutation {

        // @ Random ID
        // variables.id = !variables.id ? Math.round(Math.random() * -1000000) : variables.id
        const response = {
            __typename: "Mutation",
            createPatient: variables
        };
        return response as CreatePatientMutation ;
    }

    /**
     * 
     * 
     * @static
     * @param {any} proxy_ 
     * @param {any} ev 
     * @returns 
     * 
     * @memberOf createPatientGqlCallback
     */
    public static update(proxy_, ev) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.createPatient === null)
            return;

        let proxy: InMemoryCache = proxy_;

        let createdPatient: Patient = ev.data.createPatient

        // @ new light patient fragment
        this.writeLightPatientFragment(proxy, createdPatient);

        // @ add a patient query args :id
        this.writePatientQuery(proxy, createdPatient);


    }

    private static writePatientQuery(proxy: InMemoryCache, patient: Patient) {

        try {
            // @ note: patient fragment will be created automatically
            proxy.writeQuery({ query: patientQ, variables: { id: patient.id }, data: { patient: patient } });
        } catch (error) {
            throw new error(error)
        }
    }

    private static writeLightPatientFragment(proxy: InMemoryCache, patient: Patient) {

        const LightPatient = automapper.map("Patient", "LightPatient", patient)

        try {
            proxy.writeFragment({
                id: "LightPatient:" + patient.id,
                fragment: gql`
                    ${lightPatientFragment}
                `,
                data: LightPatient
            });
        } catch (error) {
            throw new error(error)
        }
    }

}
