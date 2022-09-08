import { Contact } from 'app/blocks/graphql/generated/gqlServices';

export interface ContactsResponse {
    data?: Contact[];
    fromServer?: boolean;
}
