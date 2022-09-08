import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment from 'moment';

@Entity('ambassador_setting')
export class AmbassadorSetting extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'ambassador_setting_id' })
    @IsNotEmpty()
    public settingId: number;

    @Column({ name: 'default_commission' })
    public defaultCommission: number;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
