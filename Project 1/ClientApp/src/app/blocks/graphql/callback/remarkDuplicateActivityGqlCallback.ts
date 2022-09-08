import { SpecialityEnum } from 'app/blocks/enum/speciality.enum';
import { patientQ } from 'app/blocks/graphql/gqlQueries';
import { PatientBase } from 'app/blocks/graphql/generated/bases';
import { contactFragment, patientFragment } from './../gqlFragments';
import { IsMedicalActivityDuplicated } from 'app/blocks/interface/is-medical-activity-duplicated';
import { lightPatientFragment } from '../gqlFragments';
import gql from 'graphql-tag';
import { RemarkDuplicateActivityMutation } from '../generated/gqlServices';
import { ApolloClient } from '@apollo/client/core';
import cloneDeep from 'lodash/cloneDeep';

export class remarkDuplicateActivityGqlCallback {
    public static optimisticResponse(variables):RemarkDuplicateActivityMutation  {

        const response = {
            __typename: "Mutation",
            remarkDuplicateActivity: variables
        };
        return response as RemarkDuplicateActivityMutation;
    }

    public static update(client: ApolloClient<any>, ev, data: IsMedicalActivityDuplicated) {
        // @ REMARK : ev.data.remarkDuplicateActivity variable will always return null from server 
        // @ use data rather than ev.data.remarkDuplicateActivity

        // @ If errors exists, do nothing, or data is null
        if ((ev.data.errors && data == null) || (Object.keys(data).length == 0))
            return;

        let patient: PatientBase = client.readFragment({
            fragment: gql`
                    ${patientFragment}
                `,
            id: `Patient:${data.patientId}`
        });


        let mappedPatient = this.updateActivityDupInPatient(patient, data);

        if (mappedPatient) {
            // @ Update fragment
            client.writeFragment({
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
    public static updateActivityDupInPatient(patient_: PatientBase, data: IsMedicalActivityDuplicated) {

        let patient: PatientBase = JSON.parse(JSON.stringify(patient_))
        patient = cloneDeep(patient)

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
                            activity = condition.activities.operations.find((obj) => obj.id == data.activityId);
                        }
                        else if (data.activityType.toLowerCase() == 'followup') {
                            activity = condition.activities.followups.find((obj) => obj.id == data.activityId);
                        }

                        // @ Now Update is duplicate for the sub activity if activity was found
                        if (activity != null) activity.isDuplicate = data.isDuplicate || false;
                    }
                    else {
                        // @ Updating condition
                        condition.isDuplicate = data.isDuplicate || false;
                    }
                }
            } 
             // @ Working on cardiology speciality
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
                            activity = condition.activities.operations.find((obj) => obj.id == data.activityId);
                        }
                        else if (data.activityType.toLowerCase() == 'followup') {
                            activity = condition.activities.followups.find((obj) => obj.id == data.activityId);
                        }

                        // @ Now Update is duplicate for the sub activity if activity was found
                        if (activity != null) activity.isDuplicate = data.isDuplicate || false;
                    }
                    else {
                        // @ Updating condition
                        condition.isDuplicate = data.isDuplicate || false;
                    }
                }
            }
        }

        return patient;
    }
}
