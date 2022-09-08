import { DataPartitionBase } from '../graphql/generated/bases';
import { GeneralConditionBase } from '../graphql/generated/bases'
import * as moment from 'moment';

export class MedicalUtils {

    /**
     * @DESCRIPTION : GO through the whole condition activities and return the latest diagnosis 
     * 
     * @static
     * @param {GeneralConditionBase} condition 
     * @returns {DataPartitionBase} 
     * 
     * @memberOf AppUtils
     */
    public static extractConditionDiagnosis(condition: GeneralConditionBase): DataPartitionBase | null {

        if (condition.activities.followups.length) {
            // @ try get latest followup that contains any diagnosis
            let followup = condition.activities.followups.reduce((preF, curF) => {
                if (curF.diagnosis.text.length)
                    if (moment(curF.opened).isAfter(moment(preF.opened)))
                        return curF

                return preF
            })
            // @ maybe all followups dosn't contain diagnosis
            if (followup.diagnosis.text.length)
                return followup.diagnosis
            else
                // @ try add condition diagnosis
                if (condition.diagnosis.text.length)
                    return condition.diagnosis
        }
        else {
            // @ try add condition diagnosis
            if (condition.diagnosis.text.length)
                return condition.diagnosis
        }

        return null

    }

    public static calculateBmi(weight, height) {

        // let bmi = weight / ((height / 100) * (height / 100))
        let bmi = weight / Math.pow(height / 100, 2)
        console.log(bmi, weight, height)
        return parseFloat(bmi.toFixed(1)) as any;
        // return bmi.toFixed(2) as any
        // return  weight / (height ** 2);
    }

    public static classifyBmi(bmi: number) {
        if (bmi < 18.5) {
            return "Underweight";
        } else if (bmi < 25) {
            return "Normal";
        } else if (bmi < 30) {
            return "Overweight";
        } else {
            return "Obese";
        }
    }



}