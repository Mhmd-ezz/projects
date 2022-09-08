import { RfpStatusEnum } from './../enum/rfpStatus.enum';
import { StatusEnum } from './../enum/status.enum';
import { Branch } from './branch.interface';
import { User } from '../user/user.types';
import { Client } from './client.interface';

/* eslint-disable @typescript-eslint/naming-convention */
export interface Product {
    id?: number;
    name: string;
    create_at?: any;
    updated_at?: any;
}
