import { AppUtils } from 'app/blocks/utils';
import { tagQ } from '../gqlQueries';
import { tagsQ } from 'app/blocks/graphql/gqlQueries';
import { CreateTagMutation } from '../generated/gqlServices';

export class createTagGqlCallback {
    public static optimisticResponse(variables):CreateTagMutation  {

        variables.id = !variables.id ? AppUtils.GenerateObjectId() : variables.id

        const response = {
            __typename: "Mutation",
            createTag: variables
        };
        return response as CreateTagMutation ;
    }
    public static update(proxy, ev) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.createTag === null)
            return;

        let tag = Object.assign({}, ev.data.createTag)

        // @ add tag query by id
        proxy.writeQuery({ query: tagQ, variables: { id: tag.id }, data: { tag: tag } });

    }
}
