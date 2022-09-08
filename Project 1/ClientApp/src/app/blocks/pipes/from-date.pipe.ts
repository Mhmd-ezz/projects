import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { AppUtils } from '../utils';

@Pipe({
  name: 'mdFromDate'
})
export class FromDatePipe implements PipeTransform {

  transform(dateArg: any, todateArg: any): any {

    if (!dateArg) return;

    /*
    * @ IOS Safari bug fixes : safari could not read format : MM-DD-YYYY
    * @ Set date to string with 0 time to benefit memoize
    */
    let startdate = moment(dateArg).hours(0).minutes(0).seconds(0).milliseconds(0).utcOffset(0).toISOString();
    let todate = moment(todateArg).hours(0).minutes(0).seconds(0).milliseconds(0).utcOffset(0).toISOString();

    
    if (moment(startdate).isValid()) {
      if (moment(startdate).isSame(todate))      
        return `Same Day`;

      // if(moment(startdate).isAfter(moment(todate)))
      //   return ;
    }
    else
      return;

    let difference = AppUtils.dateDifferenceOptimized(startdate, todate);
    if (difference)
      return `
        ${ difference.years > 0 ? difference.years + 'Y' : ''} 
        ${ difference.years > 0 && difference.months > 0 ? ', ' : ''} 
        ${ difference.months > 0 ? difference.months + 'M' : ''} 
        ${ difference.months > 0 && difference.days > 0 ? ', ' : ''} 
        ${ difference.days > 0 ? difference.days + 'D' : ''}
        `;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
}
