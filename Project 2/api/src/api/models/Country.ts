/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {Column, PrimaryGeneratedColumn, Entity, OneToMany} from 'typeorm';
import {Zone} from './Zone';
import {Customer} from './Customer';

@Entity('country')
export class Country {

    @PrimaryGeneratedColumn({name: 'country_id'})
    public countryId: number;

    @Column({name: 'name'})
    public name: string;

    @Column({name: 'iso_code_2'})
    public isoCode2: string;

    @Column({name: 'iso_code_3'})
    public isoCode3: string;

    @Column({name: 'address_format'})
    public addressFormat: string;

    @Column({name: 'postcode_required'})
    public postcodeRequired: number;

    @Column({name: 'is_active'})
    public isActive: number;

    @Column({name: 'is_allowed'})
    public isAllowed: number;

    @OneToMany(type => Zone, zone => zone.country)
    public zone: Zone[];

    @OneToMany(type => Customer, customer => customer.country)
    public customer: Customer[];
}
