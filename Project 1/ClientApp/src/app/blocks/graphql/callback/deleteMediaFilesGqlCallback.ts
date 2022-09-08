import { DeleteMediaFilesMutation, MediaFile, Patient } from './../generated/gqlServices';
import { mediaFileQ, mediaFilesQ, trashedMediaFilesQ, patientQ } from "app/blocks/graphql/gqlQueries";
import { SpecialityEnum } from 'app/blocks/enum/speciality.enum';
import { updateMediaFilesGqlCallback } from './updateMediaFilesGqlCallback';
import { mediaFileFragment } from '../gqlFragments';
import gql from 'graphql-tag';

export class deleteMediaFilesGqlCallback {
    public static optimisticResponse(variables): DeleteMediaFilesMutation {

        const response = {
            __typename: "Mutation",
            deleteMediaFiles: variables
        };
        return response as DeleteMediaFilesMutation ;
    }
    public static update(proxy, ev) {

        // @ Step 1: loop through returned ids and get each file by file

        // @ Step 2: remove file from destinations in store ( use updateMediaCallback -> removeFilesFromStore)

        // @ update mediaFile in store


        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.deleteMediaFiles === null)
            return;

        const ids: string[] = ev.data.deleteMediaFiles

        ids.map((id: string) => {

            try {
                // @ first get the file from cache ( media file still untouched  )
                var fileInStore: MediaFile = proxy.readQuery({ query: mediaFileQ, variables: { id: id } })['mediaFile']

                if (fileInStore) {

                    // @ remove file from all destinations
                    updateMediaFilesGqlCallback.removeFileFromStore(proxy, fileInStore)

                    // @ update mediaFile deletedOn property
                    this.mediaFileSoftDelete(proxy, fileInStore)
                }

            } catch (error) { }




        })
    }

    public static mediaFileSoftDelete(proxy, fileInStore) {

        let file: MediaFile = proxy.readFragment({
            fragment: gql`
                ${mediaFileFragment}
            `,
            id: `MediaFile:${fileInStore.id}`
        });

        // @ update file propety
        file.deletedOn = new Date()


        proxy.writeFragment({
            fragment: gql`
            ${mediaFileFragment}
        `,
            id: `MediaFile:${fileInStore.id}`,
            data: file
        });
    }
}
