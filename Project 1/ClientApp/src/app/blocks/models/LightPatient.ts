import { Grantor,Tag } from "../graphql/generated/gqlServices";
import { GrantorBase,TagBase } from "app/blocks/graphql/generated/bases";

export interface LightPatient {
    id?: string | null;
    name?: string | null;
    telephone?: string | null;
    contactNumbers?: (string | null)[] | null;
    birthDate?: Date | null;
    gender?: string | null;
    country?: string | null;
    isDuplicate?: boolean | null;
    city?: string | null;
    email?: string | null;
    createdOn?: Date | null;
    modified?: Date | null;
    patientInfo?: LightPatientInfo | null
}

export class LightPatientBase implements LightPatient {
    constructor(
        public id: string | null = null,
        public name: string | null = null,
        public telephone: string | null = null,
        public contactNumbers: (string | null)[] | null = [],
        public birthDate: Date | null = null,
        public gender: string | null = null,
        public country: string | null = null,
        public city: string | null = null,
        public email: string | null = null,
        public isDuplicate: boolean | null = false,
        public createdOn: Date | null = null,
        public modified: Date | null = null,
        public patientInfo: LightPatientInfoBase | null = new LightPatientInfoBase(),
        public __typename: string = "Contact",
    ) { }
}

interface LightPatientInfo {
    bloodType?: string | null;
    entryDate?: Date | null;
    emergancyContact?: string | null;
    fileNumber?: string | null;
    grantors?: (Grantor | null)[] | null;
    tags?: (Tag | null)[] | null;
    flags?: (string | null)[] | null;
    lastSeen?: Date | null;
    maritalStatus?: string | null;
    totalDigitizedData?: number | null;
    referral?: (string | null)[] | null;
    createdOn?: Date | null;
    modified?: Date | null;
}


export class LightPatientInfoBase {
    constructor(
        public __typename: string = "Patient",
        public bloodType: string | null = null,
        public emergancyContact: string | null = null,
        public entryDate: Date | null = null,
        public fileNumber: string | null = null,
        public flags: (string | null)[] | null = [],
        public grantors: (GrantorBase | null)[] | null = [],
        public tags: (TagBase | null)[] | null = [],
        public lastSeen: Date | null = null,
        public maritalStatus: string | null = null,
        public createdOn: Date | null = null,
        public modified: Date | null = null,
        public referral: (string | null)[] | null = [],
        public totalDigitizedData: number | null = null
    ) { }
}


