import { lookupByTextQ } from './../gqlQueries';
import { Logger } from '@nsalaun/ng-logger';
import * as automapper from 'automapper-ts';
import { lookupsQ, lookupsByGroupQ, lookupsByGroupsQ, lookupQ } from 'app/blocks/graphql/gqlQueries';
import map from 'lodash/map';
import { CreateLookupMutation, LookupInput } from '../generated/gqlServices';
import cloneDeep from 'lodash/cloneDeep';


export class createLookupGqlCallback {

    public static optimisticResponse(variables):CreateLookupMutation  {

        variables.id = !variables.id ? Math.round(Math.random() * -1000000) : variables.id

        const response = {
            __typename: "Mutation",
            createLookup: variables
        };
        return response as CreateLookupMutation ;
    }

    public static update(proxy, ev, customLookup = null) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.createLookup === null)
            return;

        let lookup = customLookup === null ? Object.assign({}, ev.data.createLookup) : customLookup;
        lookup = cloneDeep(lookup)

        // @ add lookup query by id 
        proxy.writeQuery({ query: lookupByTextQ, variables: { group: lookup.groupKey, text: lookup.text }, data: { lookup: lookup } });

    }

}
