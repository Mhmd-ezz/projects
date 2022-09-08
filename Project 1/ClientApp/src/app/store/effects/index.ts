import { RouterEffects } from './router.effect';
import { NetworkEffects } from './network.effects';
import { TenantEffects } from './tenant.effect';
import { ClaimsEffects } from './claims.effect';
import { ContactsEffects } from './contacts.effect';
import { PatientsEffects } from './patients.effect';
import { LookupsEffects } from './lookups.effect';
import { DrugsEffects } from './drugs.effect';
import { GrantorsEffects } from './grantors.effect';
import { TagsEffects } from './tags.effect';
import { AppointmentsEffects } from './appointments.effect';
import { TodosEffects } from './todos.effect';
import { TicketsEffects } from './tickets.effect';

export const effects: any[] = [
    RouterEffects,
    NetworkEffects,
    TenantEffects,
    ClaimsEffects,
    ContactsEffects,
    PatientsEffects,
    LookupsEffects,
    DrugsEffects,
    GrantorsEffects,
    TagsEffects,
    AppointmentsEffects,
    TodosEffects,
    TicketsEffects
];

export * from './router.effect';
export * from './network.effects';
export * from './tenant.effect';
export * from './claims.effect';
export * from './contacts.effect';
export * from './patients.effect';
export * from './lookups.effect';
export * from './drugs.effect';
export * from './grantors.effect';
export * from './tags.effect';
export * from './appointments.effect';
export * from './todos.effect';
export * from './tickets.effect';