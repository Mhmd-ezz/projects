import { LocationViewInputTypeBase } from './../graphql/generated/bases';
import { EventTypesEnum } from '../enum/event-types.enum';
import { EventStatusEnum } from '../enum/event-status.enum';
import { Contact, LocationViewType } from '../graphql/generated/gqlServices';

export interface Event {
    id?: string | null
    subject?: string | null
    startTime?: any | null
    endTime?: any | null
    reason?: string | null
    status?: EventStatusEnum | null
    color?: string | null
    note?: string | null
    contact?: Contact | null
    location?: LocationViewType | null
    type?: EventTypesEnum | null
    isBlock?: boolean | null
    isReadonly?: boolean | null
    isAllDay?: boolean | null
}

export class EventBase implements Event {
    constructor(
        public id: string | null = null,
        public subject: string | null = null,
        public startTime: any | null = null,
        public endTime: any | null = null,
        public reason: string | null = null,
        public status: EventStatusEnum | null = null,
        public color: string | null = null,
        public note: string | null = null,
        public contact: Contact | null = null,
        public location: LocationViewType | null = null,
        public type: EventTypesEnum | null = null,
        public isBlock: boolean | null = null,
        public isReadonly: boolean | null = null,
        public isAllDay: boolean | null = null,
        public __typename: string = "Event",
    ) { }
}