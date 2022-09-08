import { drugQ, drugsQ } from '../gqlQueries';
import findIndex from 'lodash/findIndex';
import { UpdateDrugMutation } from '../generated/gqlServices';

export class updateDrugGqlCallback {
    public static optimisticResponse(variables): UpdateDrugMutation  {

        const response = {
            __typename: "Mutation",
            updateDrug: variables
        };
        return response as UpdateDrugMutation ;
    }
    public static update(proxy, ev) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.updateDrug === null)
            return;

        let drug = Object.assign({}, ev.data.updateDrug)

        // @ update drug query
        proxy.writeQuery({ query: drugQ, variables: { id: drug.id }, data: { drug: drug } });

    }
}
