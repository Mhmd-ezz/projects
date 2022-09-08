import { Pipe, PipeTransform } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';
import * as moment from 'moment';
import { Memoize } from 'lodash-decorators';
import { AppUtils } from 'app/blocks/utils';

@Pipe({
    name: 'mdAgeCalculator',
    pure: true
})
export class AgeCalculatorPipe implements PipeTransform {

    /**
     *Creates an instance of AgeCalculatorPipe.
     * @param {Logger} _logger
     * @memberof AgeCalculatorPipe
     */
    constructor(
        private _logger: Logger
    ) { }

    transform(dateArg: string): any {
        if (!dateArg || !moment(dateArg).isValid()) return;

        /*
        * @ IOS Safari bug fixes : safari could not read format : MM-DD-YYYY
        * @ Set date to string with 0 time to benefit memoize
        */
        let startdate = moment(dateArg).utcOffset(0).hours(0).minutes(0).seconds(0).milliseconds(0).toISOString();
        let now = moment().utcOffset(0).hours(0).minutes(0).seconds(0).milliseconds(0).toISOString();

        if (moment(startdate).isValid()) {
            if (moment(startdate).isSame(now))
                return `Happy Birthday`;

            if (moment(startdate).isAfter(moment(now)))
                return;
        }
        else
            return;


        let difference = AppUtils.dateDifferenceOptimized(startdate, now);
        if (difference) {
            if (difference.years > 1) {
                return (Math.abs(difference.years) + " y old").toString();
            }
            else if (difference.years === 1) {
                return (Math.abs(difference.years) + " y old").toString();
            }
            else if (difference.years < 1) {
                return (Math.abs(difference.months) + " m" + " , " + Math.abs(difference.days) + " d old").toString();
            }
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

}
