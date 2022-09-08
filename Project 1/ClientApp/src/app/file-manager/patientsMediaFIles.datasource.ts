import { Injectable } from '@angular/core';
import { PatientsMediaFiles, PatientsMediaFilesGQL } from '../blocks/graphql/generated/gqlServices';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable()
export class PatientsMediaFilesDataSource {

    private recordsSubject = new BehaviorSubject<PatientsMediaFiles[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    private totalSubject = new BehaviorSubject<number>(4);
    public total$ = this.totalSubject.asObservable();

    private noMoreRecordsSubject = new BehaviorSubject<boolean>(false);
    public noMoreRecords$ = this.noMoreRecordsSubject.asObservable();

    constructor(
        private _patientsMediaFilesGQL: PatientsMediaFilesGQL
    ) { }

    loadRecords(
        filter: string,
        // sortDirection: string,
        page: number | null,
        size: number | null,
        patientId: string | null = "",
    ) {
        this.loadingSubject.next(true);

        this._patientsMediaFilesGQL
            .watch({ filter, page, size, patientId })
            .valueChanges
            .pipe(
                catchError((error, source) => {
                    console.log(error)
                    return of([]);
                    return source
                }),
                tap((res: any) => {
                    this.loadingSubject.next(false)
                })
            )
            .subscribe(({ data, loading }) => {
                if (data && data.patientsMediaFiles) {

                    // @ Because of the difficulty of returning wrapped pageInfo from graphql
                    // @ then, try to handle total records from response
                    // @ just in case server responded
                    this.recordsSubject.next(data.patientsMediaFiles);

                    // @ calc total where total is number of page (given) * size (given)
                    // @ hack : always add 1 to total until records returned are less than size 
                    if (data.patientsMediaFiles.length < size) {
                        this.totalSubject.next((page) * size);
                    } else {
                        this.totalSubject.next((page * size) + 1);
                    }

                    // @ no more recordss found
                    if (data.patientsMediaFiles.length > 0) {
                        this.noMoreRecordsSubject.next(false);
                    } else {
                        this.noMoreRecordsSubject.next(true);
                    }
                }
                (error) => {
                    throw new error(error)
                }
            });
    }

    connect(): Observable<PatientsMediaFiles[]> {
        console.log("Connecting data source");
        return this.recordsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.noMoreRecordsSubject.complete();
        this.recordsSubject.complete();
        this.loadingSubject.complete();
        this.totalSubject.complete();
    }
}
