/* eslint-disable no-trailing-spaces */
import { RfpStatusEnum } from './../enum/rfpStatus.enum';
import { StatusEnum } from './../enum/status.enum';
import { Branch } from './branch.interface';
import { User } from '../user/user.types';
import { Client } from './client.interface';
import { IFile } from './file.interface';

/* eslint-disable @typescript-eslint/naming-convention */
export interface Opportunity {
    tasks?: any[];
    id?: number;
    name?: string;
    release_date?: any;
    submission_date?: any;
    subsidiary_date?: any;
    description?: string;
    observation?: string;
    external_resources?: string;
    duration?: string;
    required_technology?: string;
    winning_chance?: string;
    learned?: string;
    competitors?: string;
    budget?: any;
    currency_code?: string;
    submission_type?: string;
    contact_name?: string;
    contact_title?: string;
    contact_email?: string;
    contact_number?: string;
    create_at?: any;
    updated_at?: any;
    client_id?: number | Client;
    user_id?: number | User;
    category?: string;
    solution?: string;
    demo_date?: any;
    lost_reason?: any;
    
    country_manager_id?: number | User;
    executive_manager_id?: number | User;
    sales_manager_id?: number | User;
    branch_id?: number | Branch;
    user?: number | User;
    client?: Client;

    files?: IFile[];

    // @ SUBMISSION
    department_action?: any;
    department_manager_action?: any;
    reminder_date?: any;
    status?: StatusEnum;
    rfp_status?: RfpStatusEnum;
    proposed_value?: any;
    awarded_amount?: any;
}
