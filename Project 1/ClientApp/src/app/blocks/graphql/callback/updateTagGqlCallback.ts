import { tagQ, tagsQ } from '../gqlQueries';
import findIndex from 'lodash/findIndex';
import { UpdateTagMutation } from '../generated/gqlServices';

export class updateTagGqlCallback {

    public static optimisticResponse(variables):UpdateTagMutation  {

        const response = {
            __typename: "Mutation",
            updateTag: variables
        };
        return response as UpdateTagMutation ;
    }

    public static update(proxy, ev) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.updateTag === null)
            return;

        let tag = Object.assign({}, ev.data.updateTag)

        // @ update tag query
        proxy.writeQuery({ query: tagQ, variables: { id: ev.data.updateTag.id }, data: { tag: tag } });

    }

}
