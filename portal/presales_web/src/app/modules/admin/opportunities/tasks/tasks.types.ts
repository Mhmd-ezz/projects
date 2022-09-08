/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable quotes */
import { User } from "app/core/user/user.types";

/* eslint-disable @typescript-eslint/naming-convention */
export interface Tag
{
    id?: string;
    title?: string;
}

export interface Task
{
    // id: string;
    // type: 'task' | 'section';
    // title: string;
    // notes: string;
    // completed: boolean;
    // dueDate: string | null;
    // priority: 0 | 1 | 2;
    tags?: string[];
    // order: number;


    id?: any;
    title?: string;
    type?: 'task' | 'section';
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
}
