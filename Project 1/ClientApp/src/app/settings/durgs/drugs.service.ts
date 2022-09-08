import { Injectable } from '@angular/core';
import { DrugsGQL } from 'app/blocks/graphql/generated/gqlServices';

@Injectable({
    providedIn: 'root'
})
export class DrugsService {

    constructor(
        private _drugsGQL: DrugsGQL,
    ) { }

    getDrugs(filter = "", page = 1, size = 10, options: any = {}) {
        return this._drugsGQL.watch({ filter, page, size }, options)
            .valueChanges
    }

}
