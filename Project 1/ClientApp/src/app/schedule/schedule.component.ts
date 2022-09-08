import { data } from './../dashboard/data';
import { SubscriptionsService } from './../blocks/services/subscriptions.service';
import { LocalDbInstancesService } from './../blocks/common/local-db-instances.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { ScheduleComponent, TimeScaleModel } from '@syncfusion/ej2-angular-schedule';
import { extend } from '@syncfusion/ej2-base';
import { ItemModel } from '@syncfusion/ej2-navigations';
import {
    ActionEventArgs,
    DragEventArgs,
    EventRenderedArgs,
    EventSettingsModel,
    PopupOpenEventArgs,
    RenderCellEventArgs,
    ResizeEventArgs,
    ToolbarActionArgs,
    View,
    WorkHoursModel,
} from '@syncfusion/ej2-schedule';
import { QuickPopups } from '@syncfusion/ej2-schedule/src/schedule/popups/quick-popups';
import { Tenant } from 'app/blocks/common/tenant.model';
import { EventActionTypesEnum } from 'app/blocks/enum/event-action-types.enum';
import { EventStatusEnum } from 'app/blocks/enum/event-status.enum';
import { EventTypesEnum } from 'app/blocks/enum/event-types.enum';
import { SpecialityEnum } from 'app/blocks/enum/speciality.enum';
import { RotaBase } from 'app/blocks/graphql/generated/bases';
import { AppointmentEventSubscription, AppointmentInput, RotaAllGQL, Schedule } from 'app/blocks/graphql/generated/gqlServices';
import { EventActionModel } from 'app/blocks/interface/event-action-model';
import { ScheduleFilterArgs } from 'app/blocks/interface/schedule-filter-args';
import { TenantsService } from 'app/blocks/services/tenants.service';
import { AppUtils } from 'app/blocks/utils';
import { FormUtilsService } from 'app/blocks/utils/form-utils.service';
import * as automapper from 'automapper-ts';
import * as moment from 'moment';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { filter, takeUntil } from 'rxjs/operators';

import { AppointmentDialogService } from './../blocks/components/appointment-dialog/appointment-dialog.service';
import { ConfirmActionSheetComponent } from './../blocks/components/confirm-action-sheet/confirm-action-sheet.component';
import { AppointmentBase } from './../blocks/graphql/generated/bases';
import {
    Appointment,
    AppointmentsGQL,
    DeleteAppointmentGQL,
    ScheduleGQL,
    UpdateAppointmentGQL,
} from './../blocks/graphql/generated/gqlServices';
import { ConfirmActionSheetArgs } from './../blocks/interface/confirm-action-sheet-args';
import { ResolvedRotaWorkTime, TimeRange } from './../blocks/interface/resolvedRotaWorkTime';
import { subscriptionEventEnum } from 'app/blocks/enum/subscription-events.enum';
import { MatSelectChange } from '@angular/material/select';

import * as fromRoot from '../store/reducers';
import * as fromSelectors from '../store/selectors';
import { Store as NgrxStore }  from '@ngrx/store';


const dcopy = require('deep-copy');
@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss'],
})
export class AppScheduleComponent implements OnInit {

    @ViewChild('scheduleObj', { static: false }) scheduleObj: ScheduleComponent;

    // Private
    private _unsubscribeAll: Subject<any>;
    public tenant: Tenant;

    public isAppointmentsLoading = false;
    public isSettingsLoading = false;
    public timeScaleOptions: TimeScaleModel = { enable: true, slotCount: 2 };
    public startHour = '08:00';
    public endHour = '24:00';
    public workHours: WorkHoursModel = { start: '8:00', end: '24:00' };
    public scheduleSettings: Schedule = {};
    public viewChanged = false;
    public rota: RotaBase[] = [];
    public reslovedRotaWorkTime: ResolvedRotaWorkTime[] = [];
    public locationsSubject = new BehaviorSubject<Location[]>([]);
    public locations$: Observable<any> = this.locationsSubject.asObservable();
    public eventStatuses = Object.values(EventStatusEnum);
    public EventTypesEnum: typeof EventTypesEnum = EventTypesEnum;
    public currentView: View = 'Week';
    public filterOptions: ScheduleFilterArgs = { isDirty: false };
    public errors = [];
    public appointmentsSubject = new BehaviorSubject<Appointment[]>([]);
    public eventSettings: EventSettingsModel = {
        dataSource: <Object[]>extend([], [], null, true),
        fields: {
            id: 'id',
            subject: { name: 'subject', default: 'Untitled' },
            startTime: { name: 'startTime' },
            endTime: { name: 'endTime' },
            isAllDay: { name: 'isAllDay' },
            isReadonly: 'isReadonly',
            isBlock: 'isBlock',
        }
    };

    constructor(
        private _updateAppointmentGQL: UpdateAppointmentGQL,
        private _deleteAppointmentGQL: DeleteAppointmentGQL,
        private _appointmentsGQL: AppointmentsGQL,
        private _dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private _bottomSheet: MatBottomSheet,
        private _appointmentDialogService: AppointmentDialogService,
        private _rotaAllGQL: RotaAllGQL,
        private _fuseSidebarService: FuseSidebarService,
        private _scheduleGQL: ScheduleGQL,
        private _formUtilsService: FormUtilsService,
        private _tenantsService: TenantsService,
        private _router: Router,
        private _localDbInstancesService: LocalDbInstancesService,
        private _subscriptionsService: SubscriptionsService,
        private _store: NgrxStore<fromRoot.AppState>,

    ) {
        // @@@@ SCHEDULE QUICKPOPS BUG FIXES
        (QuickPopups.prototype as any).applyFormValidation = () => { };

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this._localDbInstancesService.getAppontmentSettingsInstance()
    }

    ngOnInit(): void {
        this.getScheduleSettings();
        this.loadTenantData();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    ngAfterViewInit() {
        console.log("this ==> ", this)
        this.subscribeToAppointments()
    }

    // --------------------------------------------------------------------
    //  Public methods
    // --------------------------------------------------------------------

    onPopupOpen(args: PopupOpenEventArgs): void {

        if (args.type === 'QuickInfo') {

            // @ If appointment click, (popup header) add contact type label after event name
            if (args.target.classList.contains('e-appointment')) {

                const appointment_ = args.data as AppointmentBase;

                if (appointment_.contact && appointment_.contact.id) {

                    this.pushContactTypeToHtml(appointment_, args);
                }
            }

            // @ prevent quickPopup on cell click
            if (args.target.classList.contains('e-work-cells') || args.target.classList.contains('e-header-cells')) {
                args.cancel = true;
            }
        }

        if (args.type === 'Editor') {

            // @ Prevent native popup editor 
            args.cancel = true;

            let predefinedLocation = null;
            const appointment_ = args.data as AppointmentBase;

            // @ Try to get location attr if its rota preset
            if (args.target != null && args.target.classList.contains('e-work-cells')) {
                predefinedLocation = JSON.parse(args.target.getAttribute('location'));
                if (predefinedLocation != null) {
                    appointment_.location = predefinedLocation;
                }
            }

            // @ Open Dialog
            const AppointmentDialogRef = this._appointmentDialogService.openDialog(appointment_);

            // @ Subscribe for dialog response
            AppointmentDialogRef
                .afterClosed()
                .subscribe((result: EventActionModel) => {
                    if (result && typeof result !== 'undefined') {

                        console.log("on edit", result)

                        const appointment: AppointmentBase = automapper.map('Any', 'AppointmentBase', result.event);

                        if (result.actionType === EventActionTypesEnum.new) {
                            // this.scheduleObj.addEvent(appointment);
                            this.saveEvent(appointment);
                        }
                        else if (result.actionType === EventActionTypesEnum.edit) {
                            // this.scheduleObj.saveEvent(appointment as any, "Save");
                            this.saveEvent(appointment);
                        }
                        else if (result.actionType === EventActionTypesEnum.delete) {
                            this.scheduleObj.deleteEvent(appointment.id);
                        }
                    }
                });
        }
    }


    onActionBegin(args: ActionEventArgs & ToolbarActionArgs) {

        if (args.requestType === 'toolbarItemRendering') {

            // @ New appointment
            const add: ItemModel = {
                align: 'Left', tooltipText: 'New event', text: 'New event', prefixIcon: 'e-icon-add', cssClass: 'e-add e-hide-on-mobile', click: this.onHeaderAddAppointment.bind(this)
            };
            args.items.push(add);


            // @ Filter
            const filter: ItemModel = {
                id: 'filter', align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icon-filter', cssClass: 'e-icon filter', click: this.toggleSidebar.bind(this)
            };
            args.items.push(filter);

        }

        if (args.requestType === 'viewNavigate' || args.requestType === 'dateNavigate') {
            this.viewChanged = true;
        }

        if (args.requestType === 'eventChange') {
            this.saveEventLocally(args.data);
        }

        if (args.requestType === 'eventCreate') {
            this.addEventLocally(args.data as any[]);
        }

        if (args.requestType === 'eventRemove') {

            // @ Quick Popup delete btn will return (args.data) as array then we need determine if type is array to send delete request to server
            // @ while editor dialog will return (args.data) as string
            // @ usually editor dialog will send delete request to server then no need to send request again 
            if (Array.isArray(args.data)) {
                args.data.forEach(ev => {
                    const appointment: AppointmentBase = automapper.map('Any', 'AppointmentBase', ev);
                    const appointments = this.appointmentsSubject.getValue().filter(obj => obj.id !== appointment.id);
                    this.appointmentsSubject.next(appointments);
                    this.refreshSchedule(appointments);
                    this.deleteAppointment(appointment);
                });
            }
        }
    }

    actionComplete(args: ActionEventArgs) {
        if (args.requestType === 'viewNavigate' || args.requestType === 'dateNavigate') {
            this.loadData();
        }
    }

    // @ Fetch events data from server when calendar is ready
    created() {
        this.loadData();

        // @ Scroll to current time by default
        setTimeout(() => {
            const currentTime = moment().format('HH:mm');
            this.scheduleObj.scrollTo(currentTime);
        }, 1000);
    }

    onDragStop(args: DragEventArgs) {

        // const appointment: AppointmentBase = automapper.map("Any", "AppointmentBase", args.data)
        const appointment: any = Object.assign({}, args.data);

        // @ Handle the originalAppointment object bcs onActionBegin() will automatically update the appointments
        const originalAppointment = this.appointmentsSubject.getValue().find(obj => obj.id === appointment.id);

        const result = this.isAppointmentChanged(appointment);

        // @ Remove extra Guid attr added by the plugin
        delete appointment['Guid'];
        if (result) {
            this.confirmUpdateAppointment(appointment, originalAppointment);
        }
    }

    onResizeStop(args: ResizeEventArgs) {

        // const appointment: AppointmentBase = automapper.map("Any", "AppointmentBase", args.data)
        // this.updateAppointment(appointment)

        const appointment: any = Object.assign({}, args.data);

        // @ Handle the originalAppointment object bcs onActionBegin() will automatically update the appointments
        const originalAppointment = this.appointmentsSubject.getValue().find(obj => obj.id === appointment.id);
        const result = this.isAppointmentChanged(appointment);

        // @ Remove extra Guid attr added by the plugin
        delete appointment['Guid'];
        if (result) {
            this.confirmUpdateAppointment(appointment, originalAppointment);
        }
    }


    /**
     * @DEPRIATED: not used by UI anymore
     * 
     * @param {any} event 
     * @param {any} data 
     * 
     * @memberOf AppScheduleComponent
     */
    onChangeStatus(event, data) {
        // this.scheduleObj.quickPopup.deleteClick()

        // @ TODO : send appointment to backend
        // this.scheduleObj.saveEvent(data)
        alert('Change status not implemented !');
    }

    renderCell(args: RenderCellEventArgs) {

        // @ Update workTime rota once at schedule view change or date navigation
        if (this.reslovedRotaWorkTime != null && this.viewChanged === true) {
            this.rotaWorkTimeProcessor();
            this.viewChanged = false;
        }

        if (this.reslovedRotaWorkTime.length >= 0 && this.scheduleSettings.displayRota === true) {

            if (args.elementType === 'workCells') {

                this.reslovedRotaWorkTime.forEach((rota: ResolvedRotaWorkTime) => {

                    rota.resolvedDates.forEach((timeRange: TimeRange) => {

                        if (+new Date(args.date) >= +new Date(timeRange.startTime) && +new Date(args.date) <= +new Date(timeRange.endTime)) {
                            // args.element['style'].backgroundColor = AppUtils.convertHexToRgba(rota.color, 0.2);
                            args.element['style'].background = this.convertHexToRgba(rota.color, 0.15);
                            args.element['style'].borderLeft = '4px solid ' + rota.color;
                            args.element.setAttribute('location', JSON.stringify(rota.location));

                            if (+new Date(args.date) === +new Date(timeRange.startTime)) {
                                args.element.pseudoStyle('before', 'content', `'${rota.name}'`);
                                args.element.pseudoStyle('before', 'font-size', `13px`);
                                args.element.pseudoStyle('before', 'text-transform', `capitalize`);
                                args.element.pseudoStyle('before', 'color', `#5e5d5d`);
                            }
                        }
                    });
                });
            }
        }
    }

    oneventRendered(args: EventRenderedArgs): void {
        const color: string = args.data.color as string;
        const status: string = args.data.status as string;

        if (args.data.status) {
            let classname = status == 'checked in' ? ['accent-500-bg'] :
                status == 'admitted' ? ['green-500-bg'] :
                    status == 'checked out' ? ['grey-300-bg', 'grey-600-fg'] :
                        status == 'delayed' ? ['orange-500-bg'] :
                            ['canceled', 'interrupted', 'paused', 'no show'].includes(status) ? ['red-300-bg'] : null;
            if (classname)
                args.element.classList.add(...classname);
        }

        if (!args.element || !color) {
            return;
        }

        if (this.currentView === 'Agenda') {
            (args.element.firstChild as HTMLElement).style.borderLeftColor = color;
        } else {
            args.element.style.backgroundColor = color;
        }
    }

    isSameDate(startTime, endTime): boolean {
        if (moment(startTime).isValid() && moment(endTime).isValid()) {
            return moment(moment(startTime).format('YYYY-MM-DD')).isSame(moment(endTime).format('YYYY-MM-DD'));
        } else {
            return false;
        }
    }

    onHeaderAddAppointment(): void {
        this.scheduleObj.openEditor(this.scheduleObj.activeCellsData, 'Add');
    }

    toggleSidebar(): void {
        this._fuseSidebarService.getSidebar('schedule-filter-sidebar').toggleOpen();
    }

    onFilterChange(event: ScheduleFilterArgs) {

        this.filterOptions = event;

        // @ Make filter icon coloful when filter is active
        const filterEl: HTMLElement = this.scheduleObj?.element?.querySelector('.filter') as HTMLElement;
        if (filterEl) {
            if (event.isDirty) {
                filterEl.classList.add('filter-active');
            } else {
                filterEl.classList.remove('filter-active');
            }
        }

        // @ Filter events
        const appointments = this.appointmentsSubject.getValue();

        const filtered = this.filterEvents(appointments);

        this.refreshSchedule(filtered);
    }

    onStatusChange($event: MatSelectChange, appointmentId: string) {
        console.log($event, appointmentId);
        if (!appointmentId) {
            // @ error
        }

        let appointment = this.appointmentsSubject.getValue().find(app => app.id == appointmentId);
        if (appointment)
            appointment = Object.assign({}, appointment);
        appointment.status = $event.value;
        this.updateAppointment(appointment);
    }
    // --------------------------------------------------------------------
    //  Private methods
    // --------------------------------------------------------------------

    public navigateToCreatepatient(contactId) {

        if (!contactId) { return 0; }

        if (this.tenant.speciality.key === SpecialityEnum.cardiology) {
            this._router.navigate(['/patients', contactId, 'editCardio']);
        }
        else if (this.tenant.speciality.key === SpecialityEnum.general) {
            this._router.navigate(['/patients', contactId, 'edit']);
        }
    }

    private updateAppointment(appointment: AppointmentBase, appointmentBeforeUpdate: AppointmentBase = null) {

        let appointment_ = Object.assign({}, appointment) as AppointmentInput

        this._updateAppointmentGQL
            .mutate(
                { appointment: appointment_ },
                // GQL Callback .... {}
            )
            .pipe(
                // @ Catch validation errors
                filter((response) => this.handleXhrError(response, appointment)),
                // @ Catch when saved locally
                filter((response) => this._formUtilsService.savedLocallyFilter(response)),
            )
            .subscribe(
                (response) => {
                    console.log(response)
                    this._snackBar.open('Appointment updated.', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 3000,
                    });
                    this.saveEvent(appointment)
                    // this.scheduleObj.saveEvent(appointment as any);
                },
                (error) => {

                    console.error('[Error]:', error);
                    this._snackBar.open('An error occurred while updating the appointment.', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 5000,
                    });

                    // @ Roleback
                    if (appointmentBeforeUpdate)
                        this.rollbackUpdated(appointmentBeforeUpdate);

                }
            );
    }

    private deleteAppointment(appointment: AppointmentBase) {

        this._deleteAppointmentGQL.mutate(
            { id: appointment.id },
            // GQL Callback .... {}
        )
            .pipe(
                // @ Catch validation errors
                filter((response) => this.handleXhrError(response, appointment)),
                // @ Catch when saved locally
                filter((response) => this._formUtilsService.savedLocallyFilter(response)),
            )
            .subscribe(
                (response) => {

                    this._snackBar.open('Appointment deleted.', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 3000,
                    });
                },
                (error) => {

                    console.error('[Error]:', error);
                    this._snackBar.open('An error occurred while deleting the appointment.', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 5000,
                    });
                    this.scheduleObj.addEvent(appointment);
                }
            );
    }

    private rollbackUpdated(appointmentBeforeUpdate: AppointmentBase) {

        // const appointment_ = this.appointmentsSubject.getValue().find(obj => obj.id === appointment.id);
        this.scheduleObj.saveEvent(appointmentBeforeUpdate as any);
    }

    private refreshSchedule(data) {
        this.scheduleObj.eventSettings.dataSource = <Object[]>extend([], data || [], null, true);
    }

    private refreshFilteredSchedule(data: Appointment[]) {
        const filtered = this.filterEvents(data);
        this.refreshSchedule(filtered);
    }

    /**
     * @Remark : Will update appointmentsSubject
     * 
     * @private
     * @param {Appointment} appointment 
     * 
     * @memberOf AppScheduleComponent
     */
    private addEventLocally(appointment: Appointment[]): void {

        if (Array.isArray(appointment) && appointment.length) {
            const appointments = [...this.appointmentsSubject.getValue(), appointment[0]];
            this.appointmentsSubject.next(appointments);
        }
    }

    /**
     * 
     * @Remark : Will update appointmentsSubject
     * 
     * @private
     * @param {Appointment} appointment 
     * 
     * @memberOf AppScheduleComponent
     */
    private saveEventLocally(appnt: any): void {

        const appointment = appnt as Appointment;
        const appointments = [...this.appointmentsSubject.getValue()];
        const appointmentIndex = appointments.findIndex(obj => obj.id === appointment.id);

        if (appointmentIndex > -1) {
            appointments[appointmentIndex] = appointment;
            this.appointmentsSubject.next(appointments);
        }
    }


    /**
     * 
     * @Remark : Update or add appointment if not found in appointmentsSubject and update schedule
     * 
     * @private
     * @param {Appointment} appointment 
     * 
     * @memberOf AppScheduleComponent
     */
    private saveEvent(appnt: any): void {

        const appointment = appnt as Appointment;
        const appointments = [...this.appointmentsSubject.getValue()];
        const appointmentIndex = appointments.findIndex(obj => obj.id === appointment.id);

        if (appointmentIndex > -1) {
            appointments[appointmentIndex] = appointment;
            this.appointmentsSubject.next(appointments);
            this.scheduleObj.saveEvent(appointment);
        } else {
            this.appointmentsSubject.next([...appointments, appointment]);
            this.scheduleObj.addEvent(appointment);
        }
    }

    private getCurrentViewDatesRange() {

        // @ Get current view start and end date range
        const moments = this.scheduleObj.getCurrentViewDates().map(d => moment(d));
        if (!moments.length) { return null; }

        return {
            min: moment.min(moments).toDate(),
            max: moment.max(moments).endOf('day').toDate()
        };
    }


    private filterEvents(appointments: Appointment[]) {

        // @ Usually filter if not touched for the first time the this.filterOptions.filtered will be null
        if (!this.filterOptions.filtered)
            return appointments;

        const filtered = appointments.filter(app => {
            const filter = this.filterOptions.filtered.find(o => o.name === app.type);
            if (filter) {
                return filter.value;
            }
            else { false; }
        });

        return filtered;
    }

    private loadData() {

        this.isAppointmentsLoading = true;

        // @ Get calendar dates range
        const dateRange = this.getCurrentViewDatesRange();
        if (!dateRange) { return null; }

        // @ Get dates by the calendar dates range
        this._appointmentsGQL
            .watch(
                { startTime: dateRange.min, endTime: dateRange.max }
            )
            .valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ data, loading }) => {

                this.isAppointmentsLoading = false;

                if (data && data.appointments) {
                    this.appointmentsSubject.next(data.appointments);

                    // @ If filter is not active load all events
                    if (this.filterOptions.isDirty === false) {
                        this.refreshSchedule(this.appointmentsSubject.getValue());
                    }
                    else {
                        // @ Filter events
                        const appointments = this.appointmentsSubject.getValue();

                        const filtered = this.filterEvents(appointments);

                        this.refreshSchedule(filtered);
                    }
                }
            },
                (error) => {
                    this.isAppointmentsLoading = false;
                });
    }


    /**
     * @Description Confirm if appointment dialog should be closed
     * 
     * @private
     * @param {MatDialogRef<any, any>} dialog 
     * 
     * @memberOf AppScheduleComponent
     */
    private confirmDialogClose(dialog: MatDialogRef<any, any>) {

        const args: ConfirmActionSheetArgs = {
            yes: 'Exit and discard changes',
            no: 'Don\'t exit'
        };
        const Confirmsheet = this._bottomSheet.open(ConfirmActionSheetComponent, {
            data: args,
            disableClose: true
        });

        Confirmsheet.afterDismissed().subscribe(result => {
            if (result) {
                dialog.close(null);
            }
        });
    }

    private getScheduleSettings() {

        this.isSettingsLoading = true;
        this._scheduleGQL
            .watch()
            .valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ data, loading }) => {

                this.isSettingsLoading = false;

                if (data && data.schedule) {

                    // @ Get rota and rerender cells only when displayRota is altered
                    if (data.schedule.displayRota !== this.scheduleSettings.displayRota) {
                        this.getRota();
                    }

                    this.scheduleSettings = dcopy(data.schedule);
                    this.startHour = this.scheduleSettings.startHour;
                    this.endHour = this.scheduleSettings.endHour;
                }
            },
                (error) => {
                    this.isSettingsLoading = false;
                });
    }

    private getRota() {

        this._rotaAllGQL
            .fetch()
            .subscribe(({ data, loading }) => {
                if (data && data.rotaAll) {
                    this.rota = data.rotaAll as RotaBase[];
                    // @ Build rota recurrence rule time
                    this.rotaWorkTimeProcessor();
                    this.scheduleObj.refresh();
                }
            });
    }

    private rotaWorkTimeProcessor() {
        if (this.rota.length) {

            // @ Current view dates range
            const dateRange = this.getCurrentViewDatesRange();
            if (!dateRange) { return null; }

            this.reslovedRotaWorkTime = [];

            // @ Resolve each rota rules and combine them in ResolvedRotaWorkTime.resolvedDates
            this.rota.forEach(rota => {
                const rotaObject: ResolvedRotaWorkTime = AppUtils.rotaRecurrenceObject(rota, dateRange.min, dateRange.max);
                this.reslovedRotaWorkTime.push(rotaObject);
            });

            if (this.reslovedRotaWorkTime.length === 0) {
                this.reslovedRotaWorkTime = null;
            }
        }
    }

    private convertHexToRgba(hex, opacity): string {
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `linear-gradient(to left, rgba(194, 24, 91, 0) 4%, rgba(${r}, ${g}, ${b}, ${opacity}) 5%)`;
    }


    /**
     * @description add contact type to schedule popup header, exactly below header title
     * 
     * @private
     * @param {AppointmentBase} appointment 
     * @param {any} args 
     * 
     * @memberOf AppScheduleComponent
     */
    private pushContactTypeToHtml(appointment: AppointmentBase, args) {

        const contactTypeEl = document.createElement('div');
        contactTypeEl.innerHTML = appointment.contact.contactType || '';
        contactTypeEl.style.color = 'white';
        contactTypeEl.style.fontSize = '12px';
        const subjectWarp = (<HTMLElement>args.element).querySelector('.e-subject-wrap');
        subjectWarp.append(contactTypeEl);
    }

    private isAppointmentChanged(appointment: Appointment): boolean {

        // @urgent
        let result = false;
        const appointments: Appointment[] = this.appointmentsSubject.getValue();

        if (appointment.id) {
            const filteredAppointment = appointments.find(obj => obj.id === appointment.id);

            if (filteredAppointment) {
                if (!moment(filteredAppointment.startTime).isSame(appointment.startTime) ||
                    !moment(filteredAppointment.endTime).isSame(appointment.endTime)) {
                    result = true;
                }
            }
        }
        return result;
    }

    private confirmUpdateAppointment(appointment: AppointmentBase, originalAppointment: Appointment): void {

        const args: ConfirmActionSheetArgs = {
            yes: 'I am sure, I want to update the appointment.',
            no: 'Don\'t update.'
        };
        const Confirmsheet = this._bottomSheet.open(ConfirmActionSheetComponent, {
            data: args,
            disableClose: true
        });

        Confirmsheet.afterDismissed().subscribe(result => {
            if (result) {
                this.updateAppointment(appointment, originalAppointment);
            } else {
                // @ Rollback
                this.scheduleObj.saveEvent(originalAppointment as any);
            }
        });
    }

    private handleXhrError(response, appointment: AppointmentBase) {

        const isErrorExists = response.errors !== undefined && response.errors.length ? true : false;

        // @ Errors exists
        if (isErrorExists) {
            this.errors = AppUtils.handleValidationGqlErrors(response.errors);
            // @ Roleback
            this.scheduleObj.addEvent(appointment);
        }

        // @ Found validation errors
        if (this.errors.length) {
            this._snackBar.open('An error occurred', 'CLOSE', {
                panelClass: 'm-24',
                duration: 4000,
            });
        }
        // @ Unknown error
        else if (response.errors) {
            console.error('[Error]: ', response.errors);
        }

        // @ if errors 
        return !isErrorExists;

    }

    private loadTenantData() {

        this._store.select(fromSelectors.getTenant)
        // this._tenantsService.currentTenant$
            .subscribe(
                (tenant) => {
                    if (tenant === null) { return; }

                    this.tenant = Object.assign({}, tenant);
                },
                (error) => {
                    console.error('[ERROR]:', error);
                });
    }

    private subscribeToAppointments() {
        this._subscriptionsService.onEventAppointment$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                console.log(data)
                if (data.event == subscriptionEventEnum.appointment_created)
                    this.createdAppointmentEvent(data);
                else if (data.event == subscriptionEventEnum.appointment_updated)
                    this.updatedAppointmentEvent(data);
            });
    }

    private createdAppointmentEvent(data: AppointmentEventSubscription["appointmentEvent"]) {
        let createdAppointment = data.content;

        if (!createdAppointment) return;

        const appointments = [...this.appointmentsSubject.getValue()];
        console.log('appointments', appointments)

        let thisAppointment = appointments.find(app => app.id == createdAppointment.id);
        console.log('thisAppointment', thisAppointment)

        if (thisAppointment) {
            thisAppointment.subject = "uuuooo"
            thisAppointment.reason = "uuu"
        } else {
            appointments.push(createdAppointment)
        }

        this.appointmentsSubject.next(appointments)

        this.refreshFilteredSchedule(appointments);
    }

    private updatedAppointmentEvent(data: AppointmentEventSubscription["appointmentEvent"]) {
        let updatedAppointment = data.content;
        if (!updatedAppointment) return;

        let appointments = [...this.appointmentsSubject.getValue()];
        let appointmentIndex = appointments.findIndex(a => a.id == updatedAppointment.id);

        if (appointmentIndex > -1) {
            appointments[appointmentIndex] = updatedAppointment;
            console.log(appointments)
            this.appointmentsSubject.next(appointments);
            this.refreshFilteredSchedule(appointments);
        }
    }
}

