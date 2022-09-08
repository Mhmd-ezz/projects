import { AppUtils } from 'app/blocks/utils';
import { AppointmentBase, RotaBase } from './../graphql/generated/bases';
import { LightPatient, LightPatientBase } from '../models/LightPatient';
import { Injectable } from '@angular/core';
import * as automapper from 'automapper-ts';
import { LookupInputBase, LookupBase, DrugViewInputBase, DrugViewBase, DrugInputBase, DrugBase } from '../graphql/generated/bases';

@Injectable({
    providedIn: 'root'
})
export class MappingProfileService {

    constructor() { }

    init() {

        automapper
            .createMap('Lookup', 'LookupInputBase')
            .forMember('__typename', 'LookupInput')
            .convertToType(LookupInputBase);

        automapper
            .createMap('LookupInputBase', 'LookupBase')
            .forMember('__typename', 'Lookup')
            .convertToType(LookupBase);

        automapper
            .createMap("DrugInput", "DrugViewInputBase")
            .forMember('__typename', 'DrugViewInput')
            .convertToType(DrugViewInputBase);

        automapper
            .createMap("DrugInput", "DrugViewBase")
            .forMember('__typename', 'DrugView')
            .convertToType(DrugViewBase);

        automapper
            .createMap("DrugView", "DrugInputBase")
            .forMember('__typename', 'DrugInput')
            .convertToType(DrugInputBase);

        automapper
            .createMap("DrugInputBase", "DrugBase")
            .forMember('__typename', 'Drug')
            .convertToType(DrugBase);

        automapper
            .createMap("Patient", "LightPatient")
            .forMember('__typename', 'Patient')
            .convertToType(LightPatientBase);

        automapper
            .createMap("Contact", "LightPatient")
            .forMember('__typename', 'Contact')
            .convertToType(LightPatientBase);

        automapper
            .createMap("Any", "AppointmentBase")
            .forMember('__typename', 'Appointment')
            .forMember('contact', (opts: AutoMapperJs.IMemberConfigurationOptions) => {
                let sourceObject = opts["sourceObject"]
                // @ if contact is empty then return null
                return !sourceObject['contact'] || !sourceObject['contact']["id"] ? null : sourceObject["contact"]
            })
            .forMember('location', (opts: AutoMapperJs.IMemberConfigurationOptions) => {
                let sourceObject = opts["sourceObject"]
                // @ if location is empty then return null
                return !sourceObject['location'] || !sourceObject['location']["id"] ? null : sourceObject["location"]
            })
            .convertToType(AppointmentBase);
    }
}
