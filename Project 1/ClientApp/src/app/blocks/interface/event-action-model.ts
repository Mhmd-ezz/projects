import { Appointment } from "../graphql/generated/gqlServices";

export interface EventActionModel {
  actionType: string
  event: Appointment
}
