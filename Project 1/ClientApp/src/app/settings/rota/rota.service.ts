import { RotaBase } from 'app/blocks/graphql/generated/bases';
import { BehaviorSubject } from 'rxjs';
import { RotaAllGQL } from './../../blocks/graphql/generated/gqlServices';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RotaService {

    allRota$ = new BehaviorSubject<RotaBase[]>([]);
    records: RotaBase[] = [];

    constructor(
        private _rotaAllGQL: RotaAllGQL
    ) { }

    getAllRota(): void {
        this._rotaAllGQL
            .watch()
            .valueChanges
            .subscribe(({ data, loading }) => {
                if (data && data.rotaAll) {
                    this.records = Object.assign([], data.rotaAll);
                    this.allRota$.next(this.records)
                }
            })
    }

    add(rota: RotaBase): void {
        this.records.push(rota)
        this.allRota$.next(this.records)
    }

    update(rota: RotaBase) {
        let index = this.records.findIndex(obj => obj.id == rota.id)
        if (index > -1) {
            this.records[index] = rota
            this.allRota$.next(this.records)
        }
    }

    delete(id: string) {
        let index = this.records.findIndex(obj => obj.id == id)
        if (index > -1) {
            this.records.splice(index, 1)
            this.allRota$.next(this.records)
        }
    }

}
