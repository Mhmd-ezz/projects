import { lookupsQ, lookupsByGroupsQ, lookupByTextQ } from 'app/blocks/graphql/gqlQueries';
import { lookupQ } from './../gqlQueries';

import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
import { UpdateLookupMutation } from '../generated/gqlServices';

export class updateLookupGqlCallback {

    public static optimisticResponse(variables):UpdateLookupMutation  {
        const response = {
            __typename: "Mutation",
            updateLookup: variables
        };
        return response as UpdateLookupMutation ;
    }

    public static update(proxy, ev) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.updateLookup === null)
            return;

        let lookup = Object.assign({}, ev.data.updateLookup);

        // @ IMPORTANT NOTE: because of using `groupKey:text` as objectId
        // @ if we change groupKey or text for a lookup, the lookup will be duplicated
        // @ to avoid duplicate remove any lookup with same id except current updated
        let store: any[] = proxy["data"]["data"];

        for (var j = 0, keys = Object.keys(store); j < keys.length; j++) {
            if (keys[j].startsWith(`Lookup:`) &&
                proxy["data"]["data"][keys[j]].id == lookup.id &&
                (
                    proxy["data"]["data"][keys[j]].groupKey != lookup.groupKey ||
                    proxy["data"]["data"][keys[j]].text != lookup.text
                )
            ) {

                let lookup_ = proxy["data"]["data"][keys[j]]
                let groupKey = lookup_.groupKey
                let text = lookup_.text
                // @ delete the detected duplicate from store
                proxy.data.delete(`Lookup:${groupKey}:${text}`)
            }
        }

        // @ update lookup query
        proxy.writeQuery({ query: lookupByTextQ, variables: { group: lookup.groupKey, text: lookup.text }, data: { lookup: lookup } });

    }

}
