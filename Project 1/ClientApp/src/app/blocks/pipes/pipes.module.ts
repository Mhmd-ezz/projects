import { ConditionDiagnosisPipe } from './condition-diagnosis.pipe';
import { HumanizeTodayPipe } from './humanize-today.pipe';
import { FromTodayPipe } from './from-today.pipe';
import { FromDatePipe } from './from-date.pipe';
import { AgeCalculatorPipe } from './age-calculator.pipe';
import { NgModule } from '@angular/core';
import { FuzzySearchPipe } from './fuzzy-search.pipe';
import { TimeAgoPipe } from './time-ago.pipe';


@NgModule({
   declarations: [
      AgeCalculatorPipe,
      FromDatePipe,
      FromTodayPipe,
      FuzzySearchPipe,
      HumanizeTodayPipe,
      ConditionDiagnosisPipe,
      TimeAgoPipe
   ],
   imports: [],
   exports: [
      AgeCalculatorPipe,
      FromDatePipe,
      FromTodayPipe,
      FuzzySearchPipe,
      HumanizeTodayPipe,
      ConditionDiagnosisPipe,
      TimeAgoPipe
   ]
})
export class MdcPipesModule {
}
