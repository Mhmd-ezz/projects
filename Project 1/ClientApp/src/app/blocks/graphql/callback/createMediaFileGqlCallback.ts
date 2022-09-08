import { MediaFile, PatientsMediaFiles } from './../generated/gqlServices';
import { tenantPoolMediaFilesQ, patientsMediaFilesQ, activityMediaFilesQ, patientMediaFilesQ, } from '../gqlQueries';
import { mediaFileQ, mediaFilesQ } from "app/blocks/graphql/gqlQueries";
import concat from 'lodash/concat';
import { patientsMediaFileFragment } from '../gqlFragments';
import gql from 'graphql-tag';
import { ActivityMediaFilesQueryArgs } from 'app/blocks/interface/activityMediaFiles.interface';
import cloneDeep from 'lodash/cloneDeep';


export class createMediaFileGqlCallback {

    public static optimisticResponse(variables) {

        const response = {
            __typename: "Mutation",
            createMediaFile: variables
        };
        return response;
    }

    public static update(proxy, ev) {

        // @ todo : update the method to use fragments

        let mediaFile: MediaFile = Object.assign({}, ev.data.createMediaFile)
        mediaFile = cloneDeep(mediaFile)

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.createMediaFile === null)
            return;

        // @ add file to the right destinations
        this.addFileToStore(proxy, mediaFile)

        //-------------------------------------------------------------------
        //      add media file to store
        //-------------------------------------------------------------------

        // @ add file to mediaFile cache by file id
        proxy.writeQuery({ query: mediaFileQ, variables: { id: mediaFile.id }, data: { mediaFile: mediaFile } });


    }

    public static rebuildPatientMediaFiles(patientMediaFile: PatientsMediaFiles, mediafile: MediaFile): PatientsMediaFiles {

        // @ file should be added to files property
        if (mediafile.speciality) {
            patientMediaFile.files.push(mediafile)

            const files: Array<MediaFile> = concat(patientMediaFile.files, patientMediaFile.pool)
            patientMediaFile.imagesCount = files.filter(x => x.type.indexOf("image") > -1).length
            patientMediaFile.pdfCount = files.filter(x => x.type.indexOf("pdf") > -1).length
        } else {
            // @ file should be added to pool property
            patientMediaFile.pool.push(mediafile)

            const files: Array<MediaFile> = concat(patientMediaFile.files, patientMediaFile.pool)
            patientMediaFile.imagesCount = files.filter(x => x.type.indexOf("image") > -1).length
            patientMediaFile.pdfCount = files.filter(x => x.type.indexOf("pdf") > -1).length
        }
        return patientMediaFile;
    }

    public static addFileToStore(proxy, file) {

        // --------------------------------------------------------------------------------------
        //           PatientMediaFiles
        // --------------------------------------------------------------------------------------

        try {

            // -----------------------------------------------------
            //           Add the incoming record (use file)
            // -----------------------------------------------------

            // @ the file we are adding is related to a patient then add it to related patientMediaFiles
            if (file.patientId) {


                let patientMediaFiles: MediaFile[]

                // @ When patientMediaFiles exists in root_query push file to list
                try {
                    patientMediaFiles = proxy.readQuery({ query: patientMediaFilesQ, variables: { patientId: file.patientId } })['patientMediaFiles']

                    patientMediaFiles.push(file)
                    proxy.writeQuery({ query: patientMediaFilesQ, variables: { patientId: file.patientId }, data: { patientMediaFiles: patientMediaFiles } })

                } catch (error) { }

                // @ When patientMediaFiles doesn't exists in root_query create query and push file to empty list
                if (!patientMediaFiles) {
                    proxy.writeQuery({ query: patientMediaFilesQ, variables: { patientId: file.patientId }, data: { patientMediaFiles: [file] } })
                }
            }

        } catch (error) { }


        // --------------------------------------------------------------------------------------------------
        //           PatientsMediaFiles
        // --------------------------------------------------------------------------------------------------

        // patientsMediaFiles is collection of PatientsMediaFilesType (fragment) =>

        // Files: MediaFile[]
        // Pool: MediaFile[]
        // imagesCount: number
        // pdfCount: number
        // id: string (patientId)
        // name: string
        try {

            // -----------------------------------------------------
            //           Add the incoming record (use file)
            // -----------------------------------------------------

            // @ the file we are adding is related to a patient then add it to the related patientsMediaFiles fragment
            if (file.patientId) {

                let PatientsMediaFiles: PatientsMediaFiles = proxy.readFragment({
                    fragment: gql`
                    ${patientsMediaFileFragment}
                `,
                    id: `PatientsMediaFiles:${file.patientId}`
                });

                // @ file that is related to activity will be pushed to files array
                // @ file that is not related to activity will be pushed to pool array
                if (file.speciality) PatientsMediaFiles.files.push(file)
                else PatientsMediaFiles.pool.push(file)

                // @ recalculate statistics
                const files: Array<MediaFile> = concat(PatientsMediaFiles.files, PatientsMediaFiles.pool)
                PatientsMediaFiles.imagesCount = files.filter(x => x.type.indexOf("image") > -1).length
                PatientsMediaFiles.pdfCount = files.filter(x => x.type.indexOf("pdf") > -1).length


                proxy.writeFragment({
                    fragment: gql`
                    ${patientsMediaFileFragment}
                `,
                    id: `PatientsMediaFiles:${file.patientId}`,
                    data: PatientsMediaFiles
                });
            }


        } catch (error) { }

        // ------------------------------------------------------------------------------------------------------------
        //                  Pool
        // ------------------------------------------------------------------------------------------------------------

        try {

            // -----------------------------------------------------
            //           Add the incoming record (use file)
            // -----------------------------------------------------

            // @ the file we are adding is not related to a patient then add it to related pool
            if (!file.patientId) {

                let pool;

                // @ When tenantPoolMediaFiles exists in root_query push file to list
                try {

                    pool = proxy.readQuery({ query: tenantPoolMediaFilesQ })['tenantPoolMediaFiles']

                    // @ push the file to tenantPoolMediaFiles array
                    pool.push(file)
                    proxy.writeQuery({ query: tenantPoolMediaFilesQ, data: { tenantPoolMediaFiles: pool } })
                } catch (error) { }


                // @ When tenantPoolMediaFiles doesn't exists in root_query create query and push file to empty list
                if (!pool)
                    proxy.writeQuery({ query: tenantPoolMediaFilesQ, data: { tenantPoolMediaFiles: [file] } })
            }

        } catch (error) { }


        // -----------------------------------------------------------------------------
        //                  ActivityMediaFiles
        // -----------------------------------------------------------------------------
        try {

            // -----------------------------------------------------
            //           Add the incoming record (use file)
            // -----------------------------------------------------

            if (file.patientId && file.speciality && file.conditionId) {
                let variables: ActivityMediaFilesQueryArgs = {
                    patientId: file.patientId,
                    speciality: file.speciality,
                    conditionId: file.conditionId
                }

                // @ activity type and id are optional if exists
                file.activityType ? variables.activitType = file.activityType : null;
                file.activityId ? variables.activityId = file.activityId : null;

                let activityMediaFiles: MediaFile[];

                // @ When activityMediaFiles exists in root_query push file to list
                try {
                    activityMediaFiles = proxy.readQuery({ query: activityMediaFilesQ, variables: variables })['activityMediaFiles']

                    activityMediaFiles.push(file)
                    proxy.writeQuery({ query: activityMediaFilesQ, variables: variables, data: { activityMediaFiles: activityMediaFiles } })

                } catch (error) { }

                // @ When activityMediaFiles doesn't exists in root_query create query and push file to empty list
                if (!activityMediaFiles)
                    proxy.writeQuery({ query: activityMediaFilesQ, variables: variables, data: { activityMediaFiles: [file] } })
            }

        } catch (error) { }
    }



}
