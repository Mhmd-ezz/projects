import { MediaFile } from "app/blocks/graphql/generated/gqlServices";

export interface GeneralActivityMediaFiles {
    other?: MediaFile[]
    physicalExam?: MediaFile[]
    radio?: MediaFile[]
    laboratory?: MediaFile[]
}
