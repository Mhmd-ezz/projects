import { ContactBase } from 'app/blocks/graphql/generated/bases';
import { LightPatientBase } from './../../models/LightPatient';
import { contactFragment } from './../gqlFragments';
import { PatientBase } from '../generated/bases';
import gql from 'graphql-tag';
import { patientFragment, lightPatientFragment } from '../gqlFragments';
import { RemarkDuplicatePatientMutation } from '../generated/gqlServices';
import cloneDeep from 'lodash/cloneDeep';

export class remarkDuplicatePatientGqlCallback {

    public static optimisticResponse(variables): RemarkDuplicatePatientMutation {

        const response = {
            __typename: "Mutation",
            remarkDuplicatePatient: variables
        };
        return response as RemarkDuplicatePatientMutation;
    }

    public static update(proxy, ev, data: any) {
        // @ REMARK : ev.data.remarkDuplicatePatient variable will always return null from server 
        // @ use data rather than ev.data.remarkDuplicatePatient

        // @ If errors exists, do nothing, or data is null
        if ((ev.data.errors && data == null) || (Object.keys(data).length == 0))
            return;

        this.updatePatientFragment(proxy, data)
        this.updateLightPatientFragment(proxy, data)
        this.updateContactFragment(proxy, data)

    }

    public static updatePatientFragment(proxy, data) {

        try {

            let patient: PatientBase = proxy.readFragment({
                fragment: gql`
                    ${patientFragment}
                `,
                id: `Patient:${data.patientId}`
            });
            patient = cloneDeep(patient)

            if (patient) {

                patient.isDuplicate = data.isDuplicate

                // @ Update fragment
                proxy.writeFragment({
                    id: "Patient:" + patient.id,
                    fragment: gql`
                        ${patientFragment}
                    `,
                    data: patient
                });
            }

        } catch (error) {
            console.error("[ERROR]: updatePatientFragment ", error)
        }
    }

    public static updateLightPatientFragment(proxy, data) {

        try {

            let lightPatient: LightPatientBase = proxy.readFragment({
                fragment: gql`
                        ${lightPatientFragment}
                    `,
                id: `LightPatient:${data.patientId}`
            });

            lightPatient = cloneDeep(lightPatient)

            if (lightPatient) {

                lightPatient.isDuplicate = data.isDuplicate

                // @ Update fragment
                proxy.writeFragment({
                    id: "LightPatient:" + lightPatient.id,
                    fragment: gql`
                            ${lightPatientFragment}
                        `,
                    data: lightPatient
                });
            }
        } catch (error) {
            console.error("[ERROR]: updateLightPatientFragment ", error)
        }
    }

    public static updateContactFragment(proxy, data) {

        try {

            let contact: ContactBase = proxy.readFragment({
                fragment: gql`
                    ${contactFragment}
                `,
                id: `Contact:${data.patientId}`
            });
            contact = cloneDeep(contact)

            if (contact) {

                contact.isDuplicate = data.isDuplicate

                // @ Update fragment
                proxy.writeFragment({
                    id: "Contact:" + contact.id,
                    fragment: gql`
                        ${contactFragment}
                    `,
                    data: contact
                });
            }

        } catch (error) {
            console.error("[ERROR]: updateContactFragment ", error)
        }
    }
}