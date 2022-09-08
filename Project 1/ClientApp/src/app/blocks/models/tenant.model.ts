export interface ITenantsApi {
    items: Tenant[];
    total: number;
}

export class Tenant {
    id: string;
    name: string;
    status: string;
    usersCount: number;
    createdDate: string;
    contactName: string;
    phone: string;
    address: string;
}

export interface IUsersResult {
    items: User[];
    total: number;
}

export class User {
    id: string;
    tenantId: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    isEnabled: boolean;
    roles: string[];
}
