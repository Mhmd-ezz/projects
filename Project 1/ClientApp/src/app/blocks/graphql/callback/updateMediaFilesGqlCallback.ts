import { MediaFileInput, UpdateMediaFilesMutation } from 'app/blocks/graphql/generated/gqlServices';
import { mediaFileQ } from 'app/blocks/graphql/gqlQueries';
import { ActivityMediaFilesQueryArgs } from 'app/blocks/interface/activityMediaFiles.interface';
import gql from 'graphql-tag';
import concat from 'lodash/concat';

import { patientsMediaFileFragment } from '../gqlFragments';
import {  MediaFile, PatientsMediaFiles } from './../generated/gqlServices';
import { activityMediaFilesQ, patientMediaFilesQ, tenantPoolMediaFilesQ } from './../gqlQueries';


export class updateMediaFilesGqlCallback {

    public static optimisticResponse(variables): UpdateMediaFilesMutation   {
        const response = {
            __typename: "Mutation",
            updateMediaFiles: variables
        }
        return response as UpdateMediaFilesMutation ;
    }
    public static update(proxy, ev) {


        // @ Step 1 : remove file from patientMediaFiles, patientsMediaFiles, tenantPool, activityMediaFiles if exists

        // @ Step 2 : add file to correct destinations in store

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.updateMediaFiles === null) {
            return
        }

        const _mediaFiles: Array<MediaFile> = ev.data.updateMediaFiles


        _mediaFiles.map((file: MediaFile) => {


            try {
                // @ Remark PatientsMediaFiles.id is identical to MediaFile.patientId
                // @ first get the file from cache ( media file still untouched  )
                var fileInStore: MediaFile = proxy.readQuery({ query: mediaFileQ, variables: { id: file.id } })['mediaFile']
            } catch (error) { }


            // ---------------------------------------------------------------------
            //                  Remove file from old destinations
            // ---------------------------------------------------------------------
            this.removeFileFromStore(proxy, fileInStore)


            // ---------------------------------------------------------------------
            //                  Push file to right destinations
            // ---------------------------------------------------------------------
            this.addFileToStore(proxy, file)

        })


        // @ update each file in media files by query id
        if (_mediaFiles && _mediaFiles.length) {
            _mediaFiles.map(file => {
                proxy.writeQuery({ query: mediaFileQ, variables: { id: file.id }, data: { mediaFile: file } })
            })
        }
    }

    // @ remove file from patientMediaFiles, patientsMediaFiles, tenantPool, activityMediaFiles if exists
    public static removeFileFromStore(proxy, fileInStore) {

        // ------------------------------------------
        //           PatientMediaFiles
        // ------------------------------------------

        try {

            // ------------------------------------------------------
            //           Remove store record (use fileInStore)
            // ------------------------------------------------------

            // @ file is related to a patient then remove it from patientMediaFiles
            if (fileInStore.patientId) {

                // @ get the patientMediaFiles for the cached mediafile ( before updating the mediaFile via incoming mediaFile )
                let patientMediaFiles: MediaFile[] = proxy.readQuery({ query: patientMediaFilesQ, variables: { patientId: fileInStore.patientId } })['patientMediaFiles']

                // @ remove the file from patientMediaFiles array
                if (patientMediaFiles.length) {
                    let filtered = patientMediaFiles.filter((obj: MediaFile) => obj.id != fileInStore.id)
                    proxy.writeQuery({ query: patientMediaFilesQ, variables: { patientId: fileInStore.patientId }, data: { patientMediaFiles: filtered } })
                }
            }


        } catch (error) { }

        // ------------------------------------------
        //           PatientsMediaFiles
        // ------------------------------------------

        // patientsMediaFiles is collection of PatientsMediaFilesType (fragment) =>

        // Files: MediaFile[]
        // Pool: MediaFile[]
        // imagesCount: number
        // pdfCount: number
        // id: string (patientId)
        // name: string

        try {

            // ----------------------------------------------------
            //           Remove store record (use fileInStore)
            // ----------------------------------------------------

            // @ file is related to a patient then remove it from to the PatientsMediaFiles fragment
            if (fileInStore.patientId) {

                // @ readFragment and then remove the file from files or pool array 
                let PatientsMediaFiles: PatientsMediaFiles = proxy.readFragment({
                    fragment: gql`
                        ${patientsMediaFileFragment}
                    `,
                    id: `PatientsMediaFiles:${fileInStore.patientId}`
                });

                // @ remove file from PatientsMediaFiles files if exists
                PatientsMediaFiles.files = PatientsMediaFiles.files.filter((obj: MediaFile) => obj.id != fileInStore.id)
                PatientsMediaFiles.pool = PatientsMediaFiles.pool.filter((obj: MediaFile) => obj.id != fileInStore.id)

                // @ recalculate statistics
                const files: Array<MediaFile> = concat(PatientsMediaFiles.files, PatientsMediaFiles.pool)
                PatientsMediaFiles.imagesCount = files.filter(x => x.type.indexOf("image") > -1).length
                PatientsMediaFiles.pdfCount = files.filter(x => x.type.indexOf("pdf") > -1).length

                // @ update fragment 
                proxy.writeFragment({
                    fragment: gql`
                        ${patientsMediaFileFragment}
                    `,
                    id: `PatientsMediaFiles:${fileInStore.patientId}`,
                    data: PatientsMediaFiles
                });
            }

        } catch (error) { }



        // ------------------------------------------
        //                  Pool
        // ------------------------------------------

        try {

            // ----------------------------------------------------
            //           Remove store record (use fileInStore)
            // ----------------------------------------------------

            if (!fileInStore.patientId) {

                let pool = proxy.readQuery({ query: tenantPoolMediaFilesQ })['tenantPoolMediaFiles']

                // @ remove the file from tenantPoolMediaFiles array
                if (pool.length) {
                    let filtered = pool.filter((obj: MediaFile) => obj.id != fileInStore.id)
                    proxy.writeQuery({ query: tenantPoolMediaFilesQ, data: { tenantPoolMediaFiles: filtered } })
                }
            }

        } catch (error) { }


        // -----------------------------------------------------
        //                  ActivityMediaFiles
        // -----------------------------------------------------
        try {

            // ----------------------------------------------------
            //           Remove store record (use fileInStore)
            // ----------------------------------------------------

            // @ MediaFile related to condition
            if (fileInStore.patientId && fileInStore.speciality && fileInStore.conditionId) {
                let variables: ActivityMediaFilesQueryArgs = {
                    patientId: fileInStore.patientId,
                    speciality: fileInStore.speciality,
                    conditionId: fileInStore.conditionId
                }

                // @ activity type and id are optional if exists
                fileInStore.activityType ? variables.activitType = fileInStore.activityType : null
                fileInStore.activityId ? variables.activityId = fileInStore.activityId : null

                let activityMediaFiles: MediaFile[] = proxy.readQuery({ query: activityMediaFilesQ, variables: variables })['activityMediaFiles']

                if (activityMediaFiles.length) {
                    let filtered = activityMediaFiles.filter((obj: MediaFile) => obj.id != fileInStore.id)
                    proxy.writeQuery({ query: activityMediaFilesQ, variables: variables, data: { activityMediaFiles: filtered } })
                }
            }


        } catch (error) { }
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
