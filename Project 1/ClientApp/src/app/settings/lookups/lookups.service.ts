import { Injectable } from '@angular/core';
import { LookupsByGroupGQL } from './../../blocks/graphql/generated/gqlServices';

@Injectable()
export class LookupsService {

    constructor(
        private _lookupsByGroupGQL: LookupsByGroupGQL,
    ) { }

    getLookupsByGroup(group, filter = "", page = 1, size = 10, filterPredefined = false, options: any = {}) {
        return this._lookupsByGroupGQL.watch({ group, filter, page, size, filterPredefined }, options)
            .valueChanges
    }
}
