import { FlowFile } from '@flowjs/ngx-flow';
import { DataPartitionBase } from '../graphql/generated/bases';

export interface FlowFileMetadata extends FlowFile {
    id?: string | null
    name: string | null
    patientId?: string | null
    speciality?: string | null
    conditionId?: string | null
    activityType?: string | null
    activityId?: string | null
    isDeleted?: boolean | null
    type?: string | null
    tags?: DataPartitionBase | null
    systemTagging?:(string | null)[] | null 
    ticketNumber?: string | null
}
