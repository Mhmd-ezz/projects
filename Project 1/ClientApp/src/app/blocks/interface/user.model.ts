
export interface IUsersResult {
    items: User[];
    total: number;
}

export class User {
    id?: string;
    tenantId?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    phone?: string;
    isEnabled?: boolean;
    roles?: string[];
}
