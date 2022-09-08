import { DataPartition } from '../graphql/generated/gqlServices';

export interface StoredFile {
    file: any | null
    metadata?: metadata | null
}

interface metadata {
    id?: string | null
    name: string | null
    patientId?: string | null
    speciality?: string | null
    conditionId?: string | null
    activityType?: string | null
    activityId?: string | null
    isDeleted?: boolean | null
    type?: string | null
    tags?: DataPartition | null
    systemTagging?: any[] | null
    ticketNumber?: string | null
}
