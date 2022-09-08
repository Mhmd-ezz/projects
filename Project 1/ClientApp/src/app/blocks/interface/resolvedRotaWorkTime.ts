
import { Rota } from '../graphql/generated/gqlServices';

export interface ResolvedRotaWorkTime extends Rota {
    resolvedDates?: (TimeRange | null)[] | null;
}

export interface TimeRange {
    startTime: any
    endTime: any
}
