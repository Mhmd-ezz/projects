
import { gql, InMemoryCache } from '@apollo/client/core';
import * as automapper from 'automapper-ts';
import { Patient, UpdatePatientMutation } from '../generated/gqlServices';
import { lightPatientFragment } from '../gqlFragments';
import { patientQ } from '../gqlQueries';


export class updatePatientGqlCallback {

    public static optimisticResponse(variables) :UpdatePatientMutation {
        const response = {
            __typename: "Mutation",
            updatePatient: variables
        };
        return response as UpdatePatientMutation;
    }

    public static update(proxy_, ev) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.updatePatient === null)
            return;

        let proxy: InMemoryCache = proxy_;

        let updatedPatient = Object.assign({}, ev.data.updatePatient);

        // @ update light patient fragment
        this.writeLightPatientFragment(proxy, updatedPatient);

        this.writePatientQuery(proxy, updatedPatient);

    }
    private static writePatientQuery(proxy: InMemoryCache, patient: Patient) {

        try {
            // @ Note: writeQuery will update patient Fragment
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
