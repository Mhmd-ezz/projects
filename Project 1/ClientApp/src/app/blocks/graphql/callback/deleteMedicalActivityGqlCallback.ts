import { gql } from 'apollo-angular';
import { SpecialityEnum } from 'app/blocks/enum/speciality.enum';
import { PatientBase } from 'app/blocks/graphql/generated/bases';
import { IsMedicalActivityDuplicated } from 'app/blocks/interface/is-medical-activity-duplicated';
import { DeleteMedicalActivityMutation } from '../generated/gqlServices';
import { MedicalActivityArgs } from './../../interface/medical-activity-args';
import { patientFragment } from './../gqlFragments';

export class deleteMedicalActivityGqlCallback {
    public static optimisticResponse(variables) :DeleteMedicalActivityMutation {

        const response = {
            __typename: "Mutation",
            deleteMedicalActivity: variables
        };
        return response as DeleteMedicalActivityMutation ;
    }

    public static update(proxy, ev, data: MedicalActivityArgs) {
        // @ REMARK : ev.data.remarkDuplicateActivity variable will always return null from server 
        // @ use data rather than ev.data.remarkDuplicateActivity

        // @ If errors exists, do nothing, or data is null
        if ((ev.data.errors && data == null) || (Object.keys(data).length == 0))
            return;

        let patient: PatientBase = proxy.readFragment({
            fragment: gql`
                    ${patientFragment}
                `,
            id: `Patient:${data.patientId}`
        });


        let mappedPatient = this.delectActivityInPatient(patient, data);

        if (mappedPatient) {
            // @ Update fragment
            proxy.writeFragment({
                id: "Patient:" + patient.id,
                fragment: gql`
                        ${patientFragment}
                    `,
                data: mappedPatient
            });
        }
    }

    /**
     * @description : 
     * 
     * @static
     * 
     * @memberOf remarkDuplicateActivityGqlCallback
     */
    public static delectActivityInPatient(patient_: PatientBase, data: IsMedicalActivityDuplicated) {

        let patient: PatientBase = JSON.parse(JSON.stringify(patient_))

        if (patient) {

            // @ Working on general speciality
            if (data.speciality.toLowerCase() == SpecialityEnum.general.toLowerCase()) {

                // @ Modify patient activities
                let condition = patient.patientInfo.specialities['general']
                    .conditions
                    .find((condition) => condition.id == data.conditionId)

                if (condition) {
                    // @ Updating sub activity like (followup or operation)
                    if (data.activityId) {
                        let activity = null;
                        if (data.activityType.toLowerCase() == 'operation') {
                            let index = condition.activities.operations.findIndex(o => o.id == data.activityId && o.isDuplicate == true)
                            if (index > -1)
                                condition.activities.operations.splice(index, 1)
                        }
                        else if (data.activityType.toLowerCase() == 'followup') {
                            let index = condition.activities.followups.findIndex(o => o.id == data.activityId && o.isDuplicate == true)
                            if (index > -1)
                                condition.activities.followups.splice(index, 1)
                        }
                    }
                    else {
                        // @ Updating condition
                        let index = patient.patientInfo.specialities.general.conditions.findIndex(o => o.id == data.conditionId && o.isDuplicate == true)
                        if (index > -1)
                            patient.patientInfo.specialities.general.conditions.splice(index, 1)
                    }
                }
            }
            // @ Working on general speciality
            else if (data.speciality.toLowerCase() == SpecialityEnum.cardiology.toLowerCase()) {

                // @ Modify patient activities
                let condition = patient.patientInfo.specialities['cardiology']
                    .conditions
                    .find((condition) => condition.id == data.conditionId)

                if (condition) {
                    // @ Updating sub activity like (followup or operation)
                    if (data.activityId) {
                        let activity = null;
                        if (data.activityType.toLowerCase() == 'operation') {
                            let index = condition.activities.operations.findIndex(o => o.id == data.activityId && o.isDuplicate == true)
                            if (index > -1)
                                condition.activities.operations.splice(index, 1)
                        }
                        else if (data.activityType.toLowerCase() == 'followup') {
                            let index = condition.activities.followups.findIndex(o => o.id == data.activityId && o.isDuplicate == true)
                            if (index > -1)
                                condition.activities.followups.splice(index, 1)
                        }
                    }
                    else {
                        // @ Updating condition
                        let index = patient.patientInfo.specialities.cardiology.conditions.findIndex(o => o.id == data.conditionId && o.isDuplicate == true)
                        if (index > -1)
                            patient.patientInfo.specialities.cardiology.conditions.splice(index, 1)
                    }
                }
            }
        }


        return patient;
    }
}
