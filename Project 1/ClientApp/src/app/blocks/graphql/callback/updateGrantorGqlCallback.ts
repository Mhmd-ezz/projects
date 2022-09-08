import { UpdateGrantorMutation } from '../generated/gqlServices';
import { grantorQ } from '../gqlQueries';

export class updateGrantorGqlCallback {

    public static optimisticResponse(variables):UpdateGrantorMutation  {

        const response = {
            __typename: "Mutation",
            updateGrantor: variables
        };
        return response as UpdateGrantorMutation ;
    }

    public static update(proxy, ev) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.updateGrantor === null)
            return;

        let grantor = Object.assign({}, ev.data.updateGrantor)

        // @ update grantor query
        proxy.writeQuery({ query: grantorQ, variables: { id: ev.data.updateGrantor.id }, data: { grantor: grantor } });

    }

}
