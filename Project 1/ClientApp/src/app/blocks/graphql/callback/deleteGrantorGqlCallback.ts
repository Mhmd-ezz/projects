import { InMemoryCache } from '@apollo/client/core';
import { DeleteGrantorMutation } from '../generated/gqlServices';

export class deleteGrantorGqlCallback {

    /**
     * 
     * 
     * @static
     * @param {any} variables 
     * @returns 
     * 
     * @memberOf deleteGrantorGqlCallback
     */
    public static optimisticResponse(variables) : DeleteGrantorMutation {

        // @ Random ID
        // variables.id = !variables.id ? Math.round(Math.random() * -1000000) : variables.id
        const response = {
            __typename: "Mutation",
            deleteGrantor: {
                id: variables,
            }
        };
        return response as DeleteGrantorMutation ;
    }

    /**
     * 
     * 
     * @static
     * @param {any} proxy_ 
     * @param {any} ev 
     * @returns 
     * 
     * @memberOf deleteGrantorGqlCallback
     */
    public static update(proxy_, ev) {

        // @ If errors exists, do nothing
        if (ev?.data?.errors && ev?.data?.deleteGrantor?.id === null)
            return;

        let proxy: InMemoryCache = proxy_;

        // let createdPatient: Patient = ev.data.createPatient
        const idToRemove = "Grantor:" + ev.data.deleteGrantor.id;

        

        this.deleteGrantor(proxy, idToRemove);
    }

    private static deleteGrantor(proxy: InMemoryCache, id: string) {
        try {
            proxy.evict({id: id});
            proxy.gc();
        } catch (error) {
            throw new error(error)
        }
    }

    // private static writePatientQuery(proxy: InMemoryCache, patient: Patient) {

    //     try {
    //         // @ note: patient fragment will be created automatically
    //         proxy.writeQuery({ query: patientQ, variables: { id: patient.id }, data: { patient: patient } });
    //     } catch (error) {
    //         throw new error(error)
    //     }
    // }

    // private static writeLightPatientFragment(proxy: InMemoryCache, patient: Patient) {

    //     const LightPatient = automapper.map("Patient", "LightPatient", patient)

    //     try {
    //         proxy.writeFragment({
    //             id: "LightPatient:" + patient.id,
    //             fragment: gql`
    //                 ${lightPatientFragment}
    //             `,
    //             data: LightPatient
    //         });
    //     } catch (error) {
    //         throw new error(error)
    //     }
    // }

}
