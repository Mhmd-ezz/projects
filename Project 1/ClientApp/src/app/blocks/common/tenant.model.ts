import { User } from '../interface/user.model';
import { ITuple } from './../interface/tuple';
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
    speciality: ITuple;
    address: string;
    currentUser: User
}


