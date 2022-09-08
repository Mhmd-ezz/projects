import { MediaFile } from "app/blocks/graphql/generated/gqlServices";

export interface CardiologyActivityMediaFiles {
    other?: MediaFile[]
    physicalExam?: MediaFile[]
    radio?: MediaFile[]
    laboratory?: MediaFile[]
}
