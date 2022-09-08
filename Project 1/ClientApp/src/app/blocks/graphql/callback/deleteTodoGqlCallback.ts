import { InMemoryCache } from '@apollo/client/core';
import { DeleteTodoMutation } from '../generated/gqlServices';

export class deleteTodoGqlCallback {

    /**
     * 
     * 
     * @static
     * @param {any} variables 
     * @returns 
     * 
     * @memberOf deleteTodoGqlCallback
     */
    public static optimisticResponse(variables) : DeleteTodoMutation {

        // @ Random ID
        // variables.id = !variables.id ? Math.round(Math.random() * -1000000) : variables.id
        const response = {
            __typename: "Mutation",
            deleteTodo: {
                id: variables,
            }
        };
        return response as DeleteTodoMutation ;
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
        if (ev?.data?.errors && ev?.data?.deleteTodo?.id === null)
            return;

        let proxy: InMemoryCache = proxy_;

        // let createdPatient: Patient = ev.data.createPatient
        const idToRemove = "Todo:" + ev.data.deleteGrantor.id;

        

        this.deleteTodo(proxy, idToRemove);
    }

    private static deleteTodo(proxy: InMemoryCache, id: string) {
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
