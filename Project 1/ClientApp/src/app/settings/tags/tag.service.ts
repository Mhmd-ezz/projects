import { TagsGQL } from './../../blocks/graphql/generated/gqlServices';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TagService {

    constructor(
        private _tagsGQL: TagsGQL

    ) { }

    getTags(filter = "", page = 1, size = 10, options: any = {}) {
        return this._tagsGQL.watch({filter, page, size},options)
            .valueChanges
    }

}
