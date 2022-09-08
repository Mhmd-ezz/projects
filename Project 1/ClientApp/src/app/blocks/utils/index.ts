import { ResolvedRotaWorkTime, TimeRange } from './../interface/resolvedRotaWorkTime';
import { RotaBase, RecurrenceBase } from './../graphql/generated/bases';
import * as moment from 'moment';
import { Memoize } from 'lodash-decorators';
import { NgForm } from '@angular/forms';

import isArray from 'lodash/isArray';
import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';
import mergeWith from 'lodash/mergeWith';
import map from 'lodash/map';
import { GraphQLError } from 'graphql';
import values from 'lodash/fp/values';
import uniqBy from 'lodash/uniqBy';
import { Medication } from '../graphql/generated/gqlServices';
import { MedicationBase } from '../graphql/generated/bases';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecurrenceEditor } from '@syncfusion/ej2-schedule';

export class AppUtils {

    /**
     *  DateDifferenceOptimized
     * 
     * @remarks
     * Method Uses Memoize
     * IMPORTANT : Params format MM-DD-YYYYT00L00:00Z to benefit Memoize
     * 
     * @static
     * @param {string} startdate
     * @param {string} enddate
     * @returns {*} {years, months, days} | undefined
     * @memberof Utils
     */
    @Memoize()
    public static dateDifferenceOptimized(startdate: string, enddate: string): any {
        // define moments for the startdate and enddate
        let startdateMoment = moment(startdate);
        let enddateMoment = moment(enddate);

        if (startdateMoment.isValid() === true && enddateMoment.isValid() === true) {
            // getting the difference in years
            let years = enddateMoment.diff(startdateMoment, 'years');

            // moment returns the total months between the two dates, subtracting the years
            const months = enddateMoment.diff(startdateMoment, 'months') - (years * 12);

            // to calculate the days, first get the previous month and then subtract it
            startdateMoment.add(years, 'years').add(months, 'months');
            const days = enddateMoment.diff(startdateMoment, 'days');

            return {
                years: years,
                months: months,
                days: days
            };
        }
        else {
            return undefined;
        }
    }


    /**
     * @remarks
     * - Concat, arrays included
     * - Returns Imuutable 
     * 
     * @static
     * @param {*} destination 
     * @param {*} source 
     * @returns {*} 
     * 
     * @memberOf AppUtils
     */
    public static deepMergeWith(destination: any, source: any): any {
        function customizer(objValue, srcValue) {
            // @ if array concat objects that they are : equal and unique
            if (isArray(objValue)) {
                return uniqWith(objValue.concat(srcValue), isEqual);
            }
        }
        const _dest = this.DeepClone(destination);
        const _src = this.DeepClone(source);
        return this.DeepClone(mergeWith(_dest, _src, customizer));
    }

    /**
     * 
     * @remarks
     * Optimized Memoize
     * 
     * @static
     * @param {string} value 
     * @returns {string} 
     * 
     * @memberOf AppUtils
     */
    @Memoize()
    public static slugCapitalToUnderscore(value: string): string {
        return value.replace(/([A-Z])/g, (g) => `_${g[0].toLowerCase()}`);
    }


    /**
     * @remarks
     * Optimized Memoize
     * 
     * @static
     * @param {*} value 
     * @returns {string} 
     * 
     * @memberOf AppUtils
     */
    @Memoize()
    public static StringfyDate(value: any): string {
        if (value === null) {
            return null;
        }

        if (typeof value === 'object' || typeof value === 'string') {
            return moment(value).isValid() ? moment(value).format('MM/DD/YYYY') : null;
        }

        return value;
    }


    /**
     * 
     * 
     * @static
     * @returns {string} 
     * 
     * @memberOf AppUtils
     */
    public static GenerateObjectId(): string {
        const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }

    /**
     * Remark: returns Imuutable 
     * 
     * @static
     * @param {*} object 
     * @returns {(any | null)} 
     * 
     * @memberOf AppUtils
     */
    public static DeepClone(object: any): any | null {
        if (!object) {
            return null;
        }

        return JSON.parse(JSON.stringify(object));
    }



    // ----------------------------------------------------------
    //      FORMS
    // ----------------------------------------------------------

    /**
    * Remark: returns Imuutable 
    * 
    * @static
    * @param {*} destination 
    * @param {*} source 
    * @returns {*} 
    * 
    * @memberOf AppUtils
    */
    public static mergeForForms(destination: any, source: any): any {
        function customizer(objValue, srcValue) {
            // @ if array concat objects that they are : equal and unique
            if (isArray(objValue)) {

                // @ ALWAYS TAKE LOOKUPS FROM SOURCE (SERVER) WHEN DUPLICATE EXISTS
                // @ COMPARE LookupView VIA TEXT PROPERTY
                if (
                    (srcValue.length && srcValue[0]['__typename'] === 'LookupView') ||
                    (objValue.length && objValue[0]['__typename'] === 'LookupView')
                ) {
                    // @ PUSH DESTINATION TO END, PRIORITY IS FOR SOURCE
                    return uniqBy(srcValue.concat(objValue), (obj: any) => (obj.text as string).toLowerCase());
                }


                return uniqWith(objValue.concat(srcValue), isEqual);
            }
            // @ Issue Fixes, why ? ex: destination => (form) , source => (server)
            // @ magine if we did some changes in form after sending an update request
            // @ if we merge source over destination as usual, then changes made by form will be lost
            // @ solution: switch the case to take values of string,number and boolean from destination except arrays and objects
            else if (
                typeof objValue === 'string' ||
                typeof objValue === 'number' ||
                typeof objValue === 'boolean' &&
                srcValue === null) {
                return objValue;
            }
        }

        const _dest = this.DeepClone(destination);
        const _src = this.DeepClone(source);
        return this.DeepClone(mergeWith(_dest, _src, customizer));

    }



    /**
     * 
     * 
     * @static
     * @param {NgForm} form 
     * @param {boolean} showErrors 
     * @returns {boolean} Boolean
     * 
     * @memberOf AppUtils
     */
    public static validateForm(form: NgForm, showErrors: boolean): boolean {
        if (!form.valid) {
            if (showErrors) {
                map(form.controls, (value, key) => {
                    form.controls[key].markAsDirty();
                    form.controls[key].markAsTouched();
                });
            }
            return false;
        }
        return true;
    }

    /**
     * 
     * 
     * @static
     * @param {any} form 
     * 
     * @memberOf AppUtils
     */
    public static SetFormPrestine(form): void {
        Object.keys(form.controls).forEach(control => {
            form.controls[control].markAsPristine();
        });
    }


    /**
     * REMARK: Memoize
     * 
     * @static
     * @param {*} value 
     * @returns {string} 
     * 
     * @memberOf AppUtils
     */
    @Memoize()
    public static RegexImage(value: string): boolean {
        if (value === null) {
            return false;
        }

        const result = /image\/(jpe?g|png|gif|bmp)$/i.test(value) || /(jpe?g|png|gif|bmp)$/i.test(value)

        return result;
    }

    public static cloneArray(value: any[]) {
        if (!value) {
            return null;
        }

        if (Array.isArray(value)) {
            return Array.of(value)[0];
        }
    }

    public static cloneObject(value: any) {
        if (!value) {
            return null;
        }

        if (typeof value === 'object') {
            return Object.assign({}, value);
        }
    }

    public static handleValidationGqlErrors(errors: readonly GraphQLError[]): any[] {

        if (!errors.length) { return []; }

        let result = [];
        errors.map(error => {
            if (error.message.toLocaleLowerCase() === 'GraphQL.ExecutionError: validation'.toLocaleLowerCase() && error.extensions) {
                result = error.extensions.data;
            }
        });

        // @ convert object values to array
        result = values(result);

        return result;
    }

    /**
     * 
     * 
     * @static
     * @param {any} destination local
     * @param {any} source  Incoming
     * @returns {boolean} 
     * 
     * @memberOf AppUtils
     */
    public static resolveUniqMedications(destination, source): Medication[] | MedicationBase[] {
        try {
            return uniqBy(source.medications.concat(destination.medications),

                (obj: any) => (obj.drug.name as string).toLowerCase());
            //'drug.name') as Medication[] | MedicationBase[];
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @Description Round time to nearest 30 minutes or 0 minutes
     * 
     * @Instance
     * 01:18 AM -> 01:30 AM
     * 
     * @static
     * @param {any} date 
     * @returns 
     * 
     * @memberOf AppUtils
     */
    public static roundTime(date) {

        var ROUNDING = 30 * 60 * 1000; /*ms*/
        let dateTime = moment(date);
        dateTime = moment(Math.ceil((+dateTime) / ROUNDING) * ROUNDING);

        return dateTime
    }

    public static isIndexedDbSupported() {

        if (!window.indexedDB) {
            return false
        } else {
            return true
        }
    }

    /**
     * 
     * 
     * @static
     * @param {any} hex 
     * @param {any} opacity 
     * @returns {string} 
     * 
     * @memberOf AppUtils
     */
    public static convertHexToRgba(hex, opacity): string {
        hex = hex.replace('#', '');
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    /**
     * 
     * 
     * @static
     * @returns 
     * 
     * @memberOf AppUtils
     */
    public static getRecurrenceDates(startDate: Date, rule: string, exception: string, count: number, viewDate: Date) {

        let recObject: RecurrenceEditor = new RecurrenceEditor();
        let dates: number[] = recObject.getRecurrenceDates(new Date(startDate), rule, exception, count, new Date(viewDate))
        return dates;
    }

    /**
     * 
     * 
     * @static
     * @param {RotaBase} rota 
     * @param {Date} min 
     * @param {Date} max 
     * @returns {ResolvedRotaWorkTime} 
     * 
     * @memberOf AppUtils
     */
    public static rotaRecurrenceObject(rota: RotaBase, min: Date, max: Date): ResolvedRotaWorkTime {

        // @ Init ResolvedRotaWorkTime
        let ResolvedRotaWorkTime: ResolvedRotaWorkTime = {
            id: rota.id,
            name: rota.name,
            color: rota.color,
            location: rota.location,
            recurrence: rota.recurrence,
            resolvedDates: []
        }

        // @ Loop: rota recurrence rules => {startTime, endTime, rule}
        rota.recurrence.forEach((workTime: RecurrenceBase) => {

            let workTime_: RecurrenceBase = workTime;

            // @ Skip if any field is missing
            if (!workTime_.rule || !workTime_.startTime || !workTime_.endTime) return

            // @ Get dates based on rule and startTime and count just 30 items
            let dates: number[] = this.getRecurrenceDates(min, workTime.rule, '', 30, min);

            // @ Create {startTime, endTime} for each date returned by getRecurrenceDates 
            // @ and limit dates is before max
            dates.forEach((timestamp) => {

                if (+max >= timestamp) {
                    let workTime: TimeRange = {
                        startTime: moment(timestamp).set({ hour: new Date(workTime_.startTime).getHours(), minute: new Date(workTime_.startTime).getMinutes() }).toDate(),
                        endTime: moment(timestamp).set({ hour: new Date(workTime_.endTime).getHours(), minute: new Date(workTime_.endTime).getMinutes() }).toDate(),
                    }
                    ResolvedRotaWorkTime.resolvedDates.push(workTime)
                }
            })
        })

        return ResolvedRotaWorkTime;
    }

    /**
     * 
     * 
     * @static
     * @param {any} child 
     * @param {any} object 
     * @returns {Boolean} 
     * 
     * @memberOf AppUtils
     */
    public static isObjectReadOnly(value, container) {
        var tmp = container[value];
        var tmp2;
        var coolString = "cool";
        try {
            container[value] = "cool";
        } catch (e) {
            return true
        }
        tmp2 = container[value];
        container[value] = tmp;
        return coolString != tmp2;
    }

    /**
     * 
     * 
     * @static
     * @param {string} fieldName 
     * @returns {Array<T>} 
     * 
     * @memberOf AppUtils
     * Apollo InMemoryCache merge llst 
     * https://www.apollographql.com/docs/react/caching/cache-field-behavior/#merging-arrays-of-non-normalized-objects
     */
    public static mergeArrayByField<T>(fieldName: string) {
        return (existing: T[] = [], incoming: T[], { readField, mergeObjects }) => {
            const merged: any[] = existing ? existing.slice(0) : [];

            const objectFieldToIndex: Record<string, number> = Object.create(null);
            if (existing) {
                existing.forEach((obj, index) => {
                    objectFieldToIndex[readField(fieldName, obj)] = index;
                });
            }

            if (incoming) {
                incoming.forEach(obj => {
                    const field = readField(fieldName, obj);
                    const index = objectFieldToIndex[field];
                    if (typeof index === "number") {
                        // console.log(mergeObjects(merged[index], obj),merged[index],obj)
                        merged[index] = mergeObjects(merged[index], obj);
                    } else {
                        objectFieldToIndex[field] = merged.length;
                        merged.push(obj);
                    }
                });
                return merged;
            }

            // console.log(merged);
            // return merged;
        }
    }
    public static mergeArrayByFields<T>(fieldName: string) {
        return (existing: T[] = [], incoming: T[], { readField, mergeObjects }) => {
            const merged: any[] = existing ? existing.slice(0) : [];

            const objectFieldToIndex: Record<string, number> = Object.create(null);
            if (existing) {
                existing.forEach((obj, index) => {
                    objectFieldToIndex[readField(fieldName, obj)] = index;
                });
            }

            if (incoming) {
                incoming.forEach(obj => {
                    const field = readField(fieldName, obj);
                    const index = objectFieldToIndex[field];

                    if (typeof index === "number") {
                        // console.log(mergeObjects(merged[index], obj),merged[index],obj)
                        merged[index] = mergeObjects(merged[index], obj);
                    } else {
                        objectFieldToIndex[field] = merged.length;
                        merged.push(obj);
                    }
                });
                return merged;
            }

            // console.log(merged);
            // return merged;
        }
    }
}
