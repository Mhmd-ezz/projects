import { Branch } from './../interface/branch.interface';
/* eslint-disable @typescript-eslint/naming-convention */
export interface User {
    // @ fuse
    id?: string | number;
    name?: string;
    avatar?: string;
    status?: string;


    // @ portal
    first_name?: string;
    last_name?: string;
    email?: string;
    contact_number?: string;
    new_opportunity_notification_enabled?: boolean;
    position?: string;
    reporting_to?: string;
    role?: string;
    password?: string;
    role_list?: string;
    branch?: Branch;
    branch_id?: string;

    country_manager_id?: number | User;
    executive_manager_id?: number | User;
    sales_manager_id?: number | User;

    menu_permissions?: string[];
}
