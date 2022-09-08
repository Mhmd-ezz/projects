/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
@Entity('activity')
export class Activity  {
    @PrimaryGeneratedColumn({ name: 'customer_activity_id' })
    public customerActivityId: number;

    @Column({ name: 'activity_name' })
    public activityName: string;

    @Column({ name: 'is_active' })
    public isActive: number;
}
