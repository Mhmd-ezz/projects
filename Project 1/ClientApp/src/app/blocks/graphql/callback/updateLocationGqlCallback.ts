import { locationQ, locationsQ } from '../gqlQueries';
import findIndex from 'lodash/findIndex';
import { LocationInput, UpdateLocationMutation } from '../generated/gqlServices';
import cloneDeep from 'lodash/cloneDeep';

export class updateLocationGqlCallback {

    public static optimisticResponse(variables): UpdateLocationMutation {
        const response = {
            __typename: "Mutation",
            updateLocation: variables
        };
        return response as any;
    }

    public static update(proxy, ev) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.updateLocation === null)
            return;

        let location = Object.assign({}, ev.data.updateLocation)

        // @ update location query
        proxy.writeQuery({ query: locationQ, variables: { id: ev.data.updateLocation.id }, data: { location: location } });

        // @ then
        // @ update locations query
        // @ check if query data exists in ROOT_QUERY then proceed
        // @ https://github.com/apollographql/apollo-client/issues/1542
        if (!proxy.data.data.ROOT_QUERY['locations'])
            proxy.writeQuery({ query: locationsQ, data: { locations: [] } });

        var query = locationsQ;
        var data = proxy.readQuery({ query: query });
        data = cloneDeep(data)

        var locationIndex = findIndex(data.locations, function (obj: any) { return obj.id == location.id; });
        data.locations[locationIndex] = ev.data.updateLocation;
        proxy.writeQuery({ query: query, data: data });


    }

}
