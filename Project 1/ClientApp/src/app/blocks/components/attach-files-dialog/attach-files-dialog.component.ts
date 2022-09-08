import { FileSystemTagsEnum } from '../../enum/file-system-tags.enum';
import { AppUtils } from 'app/blocks/utils';
import { MediaFile, LookupsByGroupsGQL, CreateLookupGQL } from './../../graphql/generated/gqlServices';
import { Component, OnInit, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Patient, PatientGQL, GeneralCondition } from 'app/blocks/graphql/generated/gqlServices';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { outputDataEvent } from '../mdc-lookup-input/eventData.model';
import { Logger } from '@nsalaun/ng-logger';
import { createLookupGqlCallback } from 'app/blocks/graphql/callback/createLookupGqlCallback';
import { AuthService } from '../../auth/auth.service';
import * as automapper from 'automapper-ts';
import groupBy from 'lodash/groupBy';
import { MediaFileBase, DataPartitionBase, LookupViewBase } from 'app/blocks/graphql/generated/bases';
import { Tenant } from 'app/blocks/common/tenant.model';
import { TenantsService } from 'app/blocks/services/tenants.service';

import { Store } from '@ngrx/store';
import * as fromSelectors from '@appStore/selectors';
import { AppState } from '@appStore/reducers';


@Component({
    selector: 'attach-files-dialog',
    templateUrl: './attach-files-dialog.component.html',
    styleUrls: ['./attach-files-dialog.component.scss']
})
export class AttachFilesDialogComponent implements OnInit {
    // Private
    private _unsubscribeAll: Subject<any>;
    private onCurrentPatientChanged: Subject<any>;
    public tagsControl = new FormControl('');
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    public tags = new DataPartitionBase();
    public lookups: any = {
        media_tags: [],
        media_system_tags: []
    };

    mediaFile: MediaFileBase = new MediaFileBase();
    condition;
    speciality;
    patientId;
    patient: Patient;
    conditionsList;
    activitiesList;
    noGeneralFollowups: boolean;
    noGeneralOperatons: boolean;
    attachToActivity = false;

    selectedPatientId: string;
    selectedSpeciality;
    selectedCondition;
    selectedActivity;
    tenantId: any;

    constructor(
        public dialogRef: MatDialogRef<AttachFilesDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _patientGql: PatientGQL,
        private _lookupsByGroupsGQL: LookupsByGroupsGQL,
        private _logger: Logger,
        private _createLookupGQL: CreateLookupGQL,
        private _tenantsService: TenantsService,
        public _authService: AuthService,
        private _store: Store<AppState>,
    ) {
        // @ Set the private defaults
        this._unsubscribeAll = new Subject();
        this.onCurrentPatientChanged = new Subject();
        this.tenantId = this._authService.identityClaims['tenantId'];

        // @ Try to get a patient from files
        if (data && data.files) {
            // @ Update patient selector
            this.selectedPatientId = data.files[0].patientId;

            // @ Avoid calling patient data from server in case the selected image was related medcilia pool not a patient
            if (this.selectedPatientId) {
                this.getPatientById(this.selectedPatientId);
            }
        }
    }

    ngOnInit() {

        // @ load lookups
        this._lookupsByGroupsGQL
            .watch({ groups: ['media_tags', 'media_system_tags'] })
            .valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                response => {
                    if (response.data && response.data.lookupsByGroups) {
                        const lookups = groupBy(response.data.lookupsByGroups, 'groupKey');
                        // @ extend lookups, to avoid null reference when calling lookup properties
                        this.lookups = Object.assign(this.lookups, lookups);
                    }
                },
                error => {
                    this._logger.error('[error]: ', error);
                }
            );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // ------------------------------------------------------------------
    //  @ Public Methods
    // ------------------------------------------------------------------

    // @ Handle Multi input data from mdc-input-component (Lookups)
    notifyHandler(eventData: outputDataEvent) {
        const modelName = eventData.modelName;
        if (modelName) {
            // @ modelName is required to specify which object property is updated
            this.tags.text = eventData.data;
            // @ fire observable to send server request
            // this.onConditionChange.next(this.condition);
        }
    }

    onPatientChanged(patientId) {
        this.getPatientById(patientId);
    }

    /**
     * Get Patient by id
     *
     * @returns {void}
     */
    getPatientById(id): void {
        this._patientGql
            .watch({ id: id })
            .valueChanges.pipe(takeUntil(this._unsubscribeAll))
            .subscribe(response => {
                if (response.data && response.data.patient) {
                    this.patient = Object.assign({}, response.data.patient);
                }

                this.mediaFile.patientId = this.patient.id;
                this.mediaFile.patientName = this.patient.name;

                // @ clear mediaFile except custom tags
                this.mediaFile.speciality = null;
                this.mediaFile.conditionId = null;
                this.mediaFile.activityType = null;
                this.mediaFile.activityId = null;

                this.onCurrentPatientChanged.next(this.patient);
            });
    }

    onSpecialityChanged(event) {
        const speciality = event.value;
        // @ speciality is changed than reset other properties
        if (speciality !== this.mediaFile.speciality) {
            // @ set the new speciality
            this.mediaFile.speciality = speciality;

            // @ clear other properties in the lower tree of the mediaFile
            this.mediaFile.conditionId = null;
            this.mediaFile.activityType = null;
            this.mediaFile.activityId = null;
        }

        if (speciality != null && speciality !== '') {
            this.conditionsList = this.patient.patientInfo.specialities[speciality].conditions;
        }
    }

    onConditionChanged(event) {
        // @ assign condition object
        const condition = event.value;

        // @ condition is changed than reset other properties except speciality
        if (!!condition && condition.id !== this.mediaFile.conditionId && !this.mediaFile.conditionId) {
            // @ set the new conditionId
            this.mediaFile.conditionId = condition.id;

            // @ clear other properties in the lower tree of the mediaFile
            this.mediaFile.activityType = null;
            this.mediaFile.activityId = null;
        }

        // @ Create activities list for mat-select
        if (condition != null) {
            this.mediaFile.conditionId = condition.id;

            // @ General Speciality then group followups and operations
            if (this.mediaFile.speciality === 'general') {
                const _condition: GeneralCondition = condition;

                // @ update activities list
                this.activitiesList = [
                    {
                        name: 'Followups',
                        list: _condition.activities.followups
                    },
                    {
                        name: 'Operations',
                        list: _condition.activities.operations
                    }
                ];
                this.noGeneralFollowups = _condition.activities.followups.length === 0 ? true : false;
                this.noGeneralOperatons = _condition.activities.operations.length === 0 ? true : false;

            }
        }
    }

    onActivityChanged(event) {
        const _activity = event.value;

        if (_activity) {
            this.mediaFile.activityId = _activity.id;
            this.mediaFile.activityType = _activity.type;
        } else {
            this.mediaFile.activityId = null;
            this.mediaFile.activityType = null;
        }
    }

    // @ setSystemTagLookup() may call this method if lookup doesn't exist in database
    // @ Remark : will create a new lookup in database and update local store
    // @ return void
    // @Remark: depricated
    pushLookupToStore(lookup): void {
        const lookupInput = {
            groupKey: lookup.group,
            text: lookup.text,
            value: lookup.value,
            predefined: false,
            __typename: 'LookupInput'
        };

        // @ important :the new lookup is lookupInput type which has different properties from lookup type
        // @ while store expects normal lookup type
        // @ so we need to map the lookupInput type to lookup type to avoid store errors
        const mappedLookup = automapper.map('LookupInputBase', 'LookupBase', lookupInput);

        // @ then send a request
        this._createLookupGQL
            .mutate(
                { lookup: lookupInput },
                {
                    optimisticResponse: createLookupGqlCallback.optimisticResponse(mappedLookup),
                    update: (proxy, ev) => createLookupGqlCallback.update(proxy, ev)
                }
            )
            .subscribe(_ => { });
    }

    // @ setSystemTags will call this method
    // @ Remark: create new lookup if not exist
    // @ returns [LookupViewBase]
    // @ Remark: depricated
    setSystemTagLookup(text: string) {
        let lookUp: LookupViewBase = new LookupViewBase();

        const _lookup = this.lookups.media_system_tags.find(tag => tag.text === text);

        if (!_lookup) {
            // @ create new lookup
            lookUp = {
                text: text,
                value: '',
                group: 'media_system_tags',
                __typename: 'LookupView'
            };
            // @ send a request to create the lookup
            this.pushLookupToStore(lookUp);
        } else {
            // @ lookup exists
            lookUp = {
                text: _lookup.text,
                value: _lookup.value,
                group: _lookup.groupKey,
                __typename: 'LookupView'
            };
        }
        return lookUp;
    }

    // @ attach() will call this method to set system tags
    // @ depricated
    setSystemTags__(): LookupViewBase[] {
        const systemTagging: LookupViewBase[] = [];

        // @ if speciality is selected then add speciality to system tags
        if (this.mediaFile.activityType) {
            const _lookup = this.setSystemTagLookup(this.mediaFile.speciality);
            systemTagging.push(_lookup);
        }

        // @ if condition is selected then add condition name to system tags
        if (this.selectedCondition) {
            const _lookup = this.setSystemTagLookup(this.selectedCondition.name);
            systemTagging.push(_lookup);
        }

        // @ if operation selected then add operation name to system tags
        if (this.selectedActivity && this.selectedActivity.type.toLowerCase() === 'operation') {
            const _lookup = this.setSystemTagLookup(this.selectedActivity.name);
            systemTagging.push(_lookup);
        }

        return systemTagging;
    }

    // @ attach() will call this method to set system tags
    setSystemTags(): Array<string> {
        const systemTagging: Array<string> = [];

        // @ if speciality is selected then add speciality name to system tags
        if (this.mediaFile.speciality) {

            switch (this.mediaFile.speciality) {
                case 'general':
                    systemTagging.push(FileSystemTagsEnum.generalSpeciality);
            }
        }

        // @ if condition is selected  
        if (this.selectedCondition) {
            systemTagging.push(FileSystemTagsEnum.condition);
        }

        // @ if activity type is selected ex: (operation , followup)
        if (this.mediaFile.activityType) {
            if (FileSystemTagsEnum[this.mediaFile.activityType]) {
                systemTagging.push(FileSystemTagsEnum[this.mediaFile.activityType]);
            }
        }

        return systemTagging;
    }



    // @ close the dialog and returns list of modified media files
    attach() {
        // @ go through each selected File and modify properties changed in attach dialog
        // @ we will keep all old tags and appened new one
        const selectedFiles = this.data.files;
        const attachedFiles: Array<MediaFile> = [];
        const systemTagging = this.setSystemTags();
        const newCustomTags = this.mediaFile.tags.text;

        selectedFiles.map((_file, index) => {
            // let file = Object.assign({},  JSON.parse( JSON.stringify(_file) ) )
            // @ _file is immutable (read-only)
            const file: MediaFile = AppUtils.DeepClone(_file);

            file.patientId = this.mediaFile.patientId;
            file.tenantId = this.tenantId;

            file.patientName = this.mediaFile.patientName;
            file.conditionId = this.mediaFile.speciality ? this.mediaFile.conditionId : null;
            file.speciality = this.mediaFile.conditionId ? this.mediaFile.speciality : null;

            file.activityId = this.mediaFile.conditionId ? this.mediaFile.activityId : null;
            file.activityType = this.mediaFile.activityId ? this.mediaFile.activityType : null;

            // @ always overwrite systemTagging
            file.systemTagging = systemTagging;

            if (file.tags == null) { file.tags = new DataPartitionBase(); }

            // @ push new tags to file and keep the old
            file.tags.text = [...Array.from(new Set([...file.tags.text, ...newCustomTags]))];

            attachedFiles.push(file);
        });

        this.dialogRef.close(attachedFiles);
    }

    onAttachToActivityChange(event: MatSlideToggleChange) {
        console.log(event);

        // @  User want to attache the file(s) to activity
        if (event.checked) {

            this._store.select(fromSelectors.getTenant)
            // this._tenantsService.currentTenant$
                .subscribe((tenant: Tenant) => {
                    this.mediaFile.speciality = tenant.speciality.key;

                    this.mediaFile.conditionId = null;
                    this.mediaFile.activityType = null;
                    this.mediaFile.activityId = null;

                    if (tenant.speciality.key != null && tenant.speciality.key !== '') {
                        this.conditionsList = this.patient.patientInfo.specialities[tenant.speciality.key].conditions;
                    }
                });

        } else {

            this.mediaFile.speciality = null;
            this.mediaFile.conditionId = null;
            this.mediaFile.activityType = null;
            this.mediaFile.activityId = null;

        }
    }


}
