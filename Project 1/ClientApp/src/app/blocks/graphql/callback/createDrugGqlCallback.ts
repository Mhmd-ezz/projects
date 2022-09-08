import { drugQ } from './../gqlQueries';
import { drugsQ } from "app/blocks/graphql/gqlQueries";
import { AppUtils } from 'app/blocks/utils';
import { CreateDrugMutation } from '../generated/gqlServices';
import cloneDeep from 'lodash/cloneDeep';

export class createDrugGqlCallback {

    public static optimisticResponse(variables):CreateDrugMutation  {

        // @ Random ID
        variables.id = !variables.id ? AppUtils.GenerateObjectId() : variables.id

        const response = {
            __typename: "Mutation",
            createDrug: variables
        };
        return response as CreateDrugMutation;
    }

    public static update(proxy, ev) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.createDrug === null)
            return;

        let drug = Object.assign({}, ev.data.createDrug)
        drug = cloneDeep(ev.data.createDrug)

        proxy.writeQuery({ query: drugQ, variables: { id: drug.id }, data: { drug: drug } });

    }

}
