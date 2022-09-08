import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { AppUtils } from '../utils';

@Pipe({
    name: 'mdHumanizeToday'
})
export class HumanizeTodayPipe implements PipeTransform {

    transform(dateArg: any): any {
        if (!dateArg) return;

        /*
        * @ IOS Safari bug fixes : safari could not read format : MM-DD-YYYY
        * @ Set date to string with 0 time to benefit memoize
        */
        let startdate = moment(dateArg).hours(0).minutes(0).seconds(0).milliseconds(0).utcOffset(0).toISOString();
        let now = moment().hours(0).minutes(0).seconds(0).milliseconds(0).utcOffset(0).toISOString();

        if (moment(startdate).isValid()) {
            if (moment(startdate).isSame(now))
                return `Today`;
            else
                return moment(startdate).format('DD-MM-YYYY');

        }
    }
}
