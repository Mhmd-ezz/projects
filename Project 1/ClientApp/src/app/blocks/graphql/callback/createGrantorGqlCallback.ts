import { AppUtils } from 'app/blocks/utils';
import { grantorQ } from './../gqlQueries';
import { grantorsQ } from 'app/blocks/graphql/gqlQueries';
import { CreateGrantorMutation } from '../generated/gqlServices';
import cloneDeep from 'lodash/cloneDeep';

export class createGrantorGqlCallback {
    public static optimisticResponse(variables): CreateGrantorMutation {

        variables.id = !variables.id ? AppUtils.GenerateObjectId() : variables.id

        const response = {
            __typename: "Mutation",
            createGrantor: variables
        };
        return response as CreateGrantorMutation;
    }
    public static update(proxy, ev) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.createGrantor === null)
            return;

        let grantor = Object.assign({}, ev.data.createGrantor)
        grantor = cloneDeep(ev.data.createGrantor)

        // @ add grantor query by id
        proxy.writeQuery({ query: grantorQ, variables: { id: grantor.id }, data: { grantor: grantor } });

    }
}
