import { AppUtils } from 'app/blocks/utils';
import { locationQ } from './../gqlQueries';
import { locationsQ } from 'app/blocks/graphql/gqlQueries';
import { CreateLocationMutation } from '../generated/gqlServices';
import cloneDeep from 'lodash/cloneDeep';

export class createLocationGqlCallback {
    public static optimisticResponse(variables):CreateLocationMutation {

        variables.id = !variables.id ? AppUtils.GenerateObjectId() : variables.id

        const response = {
            __typename: "Mutation",
            createLocation: variables
        };
        return response as any;
    }
    public static update(proxy, ev) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.createLocation === null)
            return;

        let location = Object.assign({}, ev.data.createLocation)
        location = cloneDeep(ev.data.createLocation)

        // @ add location query by id
        proxy.writeQuery({ query: locationQ, variables: { id: location.id }, data: { location: location } });

    }
}
