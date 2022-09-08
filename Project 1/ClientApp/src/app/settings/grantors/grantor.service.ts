import { GrantorsGQL } from './../../blocks/graphql/generated/gqlServices';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GrantorService {

    constructor(
        private _grantorsGQL: GrantorsGQL

    ) { }

    getGrantors(filter = "", page = 1, size = 10, options: any = {}) {
        return this._grantorsGQL.watch({filter, page, size},options)
            .valueChanges
    }

}
