import { Pipe, PipeTransform } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';
import * as moment from 'moment';
import { Memoize } from 'lodash-decorators';
import { AppUtils } from 'app/blocks/utils';
import { GeneralConditionBase } from '../graphql/generated/bases';

@Pipe({
    name: 'conditionDiagnosis',
    pure: true
})
export class ConditionDiagnosisPipe implements PipeTransform {

    /**
     *Creates an instance of ConditionDiagnosisPipe.
     * @param {Logger} _logger
     * @memberof ConditionDiagnosisPipe
     */
    constructor(
        private _logger: Logger
    ) { }

    transform(condition: GeneralConditionBase): any {
        let diagnosisList = '';

        if (condition && condition.diagnosis) {
            diagnosisList += condition.diagnosis.text.map(e => e.text).join(' & ')
        }

        if (condition && condition.activities && condition.activities.followups && condition.activities.followups.length) {
            let diagnosis_ = condition.activities.followups?.map(e => e.diagnosis.text?.map(e => e.text).join(' & ')).join('  =>  ')
            if (diagnosis_)
                diagnosisList += '  =>  ' + diagnosis_
        }

        if (condition && condition.activities && condition.activities.operations && condition.activities.operations.length) {
            let diagnosis_ = condition.activities.operations?.map(e => e.operationDiagnosis.text?.map(e => e.text).join(' & ')).join('  =>  ')
            if (diagnosis_)
                diagnosisList += '  =>  ' + diagnosis_
        }

        return diagnosisList;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

}
