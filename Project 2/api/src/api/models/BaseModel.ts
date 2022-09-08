/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {Column} from 'typeorm';
import { Exclude } from 'class-transformer';
export abstract class BaseModel {
    @Exclude()
    @Column({ name: 'created_by', nullable: true })
    public createdBy: number;

    @Column({ name: 'created_date' })
    public createdDate: string;

    @Exclude()
    @Column({ name: 'modified_by', nullable: true })
    public modifiedBy: number;

    @Exclude()
    @Column({ name: 'modified_date', nullable: true })
    public modifiedDate: string;
}
