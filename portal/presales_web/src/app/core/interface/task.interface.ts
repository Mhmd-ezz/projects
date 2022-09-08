/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable quotes */
import { User } from "../user/user.types";

/* eslint-disable @typescript-eslint/naming-convention */
export interface Task__ {
    id?: number;
    title?: string;
    type: 'task' | 'section';
    dueDate?: any;
    completed?: boolean;
    notes?: string;
    opportunity_id?: string;
    created_by?: User;
    assigned_to?: User;
    order?: number;
    priority?: 0 | 1 | 2;
    created_at?: any;
    updated_at?: any;
    tags: string[];

};
