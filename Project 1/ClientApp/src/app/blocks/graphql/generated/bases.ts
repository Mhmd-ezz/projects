export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Date` scalar type represents a year, month and day in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
  Date: any;
  /** The `DateTime` scalar type represents a date and time. `DateTime` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
  DateTime: any;
  Long: any;
};

export class AppointmentBase {
  __typename?: 'Appointment';
  /** The id of the appointment. */
  public id?: Maybe<Scalars['String']> = null;
  /** The title of appointment. */
  public subject?: Maybe<Scalars['String']> = null;
  /** The start time of appointment. */
  public startTime?: Maybe<Scalars['DateTime']> = null;
  /** The end time of appointment. */
  public endTime?: Maybe<Scalars['DateTime']> = null;
  /** The reason of appointment. */
  public reason?: Maybe<Scalars['String']> = null;
  /** The color of appointment.  Ex: '#fff'  */
  public color?: Maybe<Scalars['String']> = null;
  /** Any related notes. */
  public note?: Maybe<Scalars['String']> = null;
  public conditionId?: Maybe<Scalars['String']> = null;
  public speciality?: Maybe<Scalars['String']> = null;
  public recurrenceId?: Maybe<Scalars['String']> = null;
  public recurrenceException?: Maybe<Scalars['String']> = null;
  public recurrenceRule?: Maybe<Scalars['String']> = null;
  /** If reservations are blocked due to time range. */
  public isBlock?: Maybe<Scalars['Boolean']> = null;
  /** Is appointment readonly? */
  public isReadonly?: Maybe<Scalars['Boolean']> = null;
  /** If appointment is all day event. */
  public isAllDay?: Maybe<Scalars['Boolean']> = null;
  /** The type of appointment. */
  public type?: Maybe<Scalars['String']> = null;
  /** The status of appointment. */
  public status?: Maybe<Scalars['String']> = null;
  /** The location associated with the appointment. */
  public location?: Maybe<LocationViewTypeBase> = new LocationViewTypeBase();
  /** The contact associated with the appointment. */
  public contact?: Maybe<ContactBase> = new ContactBase();
};

export class AppointmentEventTypeBase {
  __typename?: 'AppointmentEventType';
  public content?: Maybe<AppointmentBase> = new AppointmentBase();
  public event?: Maybe<Scalars['String']> = null;
  public sentAt?: Maybe<Scalars['DateTime']> = null;
  public sub?: Maybe<Scalars['String']> = null;
  public from?: Maybe<EventFromTypeBase> = new EventFromTypeBase();
};

export class AppointmentInputBase {
  id?: Maybe<Scalars['String']> = null;
  subject?: Maybe<Scalars['String']> = null;
  startTime?: Maybe<Scalars['DateTime']> = null;
  endTime?: Maybe<Scalars['DateTime']> = null;
  reason?: Maybe<Scalars['String']> = null;
  color?: Maybe<Scalars['String']> = null;
  note?: Maybe<Scalars['String']> = null;
  isBlock?: Maybe<Scalars['Boolean']> = null;
  isReadonly?: Maybe<Scalars['Boolean']> = null;
  isAllDay?: Maybe<Scalars['Boolean']> = null;
  type?: Maybe<Scalars['String']> = null;
  conditionId?: Maybe<Scalars['String']> = null;
  speciality?: Maybe<Scalars['String']> = null;
  recurrenceRule?: Maybe<Scalars['String']> = null;
  recurrenceId?: Maybe<Scalars['String']> = null;
  recurrenceException?: Maybe<Scalars['String']> = null;
  status?: Maybe<Scalars['String']> = null;
  contact?: Maybe<ContactInputBase> = new ContactInputBase();
  location?: Maybe<LocationViewInputTypeBase> = new LocationViewInputTypeBase();
};

export class CardiologyBase {
  __typename?: 'Cardiology';
  public conditions?: Maybe<Array<Maybe<CardiologyConditionBase>>> = [];
  public medicalHistory?: Maybe<CardiologyMedicalHistoryBase> = new CardiologyMedicalHistoryBase();
};

export class CardiologyActivitiesBase {
  __typename?: 'CardiologyActivities';
  public followups?: Maybe<Array<Maybe<CardiologyFollowupBase>>> = [];
  public operations?: Maybe<Array<Maybe<CardiologyOperationBase>>> = [];
};

export class CardiologyActivitiesInputBase {
  followups?: Maybe<Array<Maybe<CardiologyFollowupInputBase>>> = [];
  operations?: Maybe<Array<Maybe<CardiologyOperationInputBase>>> = [];
};

export class CardiologyClinicalExaminationBase {
  __typename?: 'CardiologyClinicalExamination';
  /** The examined Bp. */
  public bp?: Maybe<Scalars['String']> = null;
  /** The examined Hr. */
  public hr?: Maybe<Scalars['String']> = null;
  /** The examined Pulse. */
  public pulse?: Maybe<Scalars['String']> = null;
  /** The Classification of examined Pulse. */
  public pulseClassification?: Maybe<Scalars['String']> = null;
  /** The examined Sound of Cardiac Ausculation. */
  public sound?: Maybe<Scalars['String']> = null;
  /** The examined value of Cardiac Ausculation. */
  public value?: Maybe<Scalars['String']> = null;
  /** The examined Intensity. */
  public intensity?: Maybe<Scalars['String']> = null;
  /** The examined Pericardial Friction. */
  public pericardialFriction?: Maybe<Scalars['Boolean']> = null;
  /** The examined Lung Auscultation. */
  public lungAuscultation?: Maybe<Scalars['String']> = null;
  /** The examined Extremities Aspect. */
  public aspect?: Maybe<Scalars['String']> = null;
  /** The examined Extremities Puls. */
  public puls?: Maybe<Scalars['Boolean']> = null;
  public rightSuperior?: Maybe<Scalars['Boolean']> = null;
  public rightTransverse?: Maybe<Scalars['Boolean']> = null;
  public rightInferior?: Maybe<Scalars['Boolean']> = null;
  public leftSuperior?: Maybe<Scalars['Boolean']> = null;
  public leftTransverse?: Maybe<Scalars['Boolean']> = null;
  public leftInferior?: Maybe<Scalars['Boolean']> = null;
  /** The examined Neck Hepato Jugular Reflux. */
  public hepatoJugularReflux?: Maybe<Scalars['Boolean']> = null;
  /** The examined Neck Carotid Murmur. */
  public neckCarotidMurmur?: Maybe<Scalars['String']> = null;
  /** The examined Abdomen Soft. */
  public soft?: Maybe<Scalars['Boolean']> = null;
  /** The examined Abdomen Tender. */
  public tender?: Maybe<Scalars['String']> = null;
  /** The examined Abdomen Hepatomegaly. */
  public hepatomegaly?: Maybe<Scalars['Boolean']> = null;
  /** The examined Abdomen Ascites. */
  public ascites?: Maybe<Scalars['Boolean']> = null;
};

export class CardiologyClinicalExaminationInputBase {
  bp?: Maybe<Scalars['String']> = null;
  hr?: Maybe<Scalars['String']> = null;
  pulse?: Maybe<Scalars['String']> = null;
  pulseClassification?: Maybe<Scalars['String']> = null;
  sound?: Maybe<Scalars['String']> = null;
  value?: Maybe<Scalars['String']> = null;
  intensity?: Maybe<Scalars['String']> = null;
  pericardialFriction?: Maybe<Scalars['Boolean']> = null;
  lungAuscultation?: Maybe<Scalars['String']> = null;
  aspect?: Maybe<Scalars['String']> = null;
  puls?: Maybe<Scalars['Boolean']> = null;
  rightSuperior?: Maybe<Scalars['Boolean']> = null;
  rightInferior?: Maybe<Scalars['Boolean']> = null;
  rightTransverse?: Maybe<Scalars['Boolean']> = null;
  leftTransverse?: Maybe<Scalars['Boolean']> = null;
  leftSuperior?: Maybe<Scalars['Boolean']> = null;
  leftInferior?: Maybe<Scalars['Boolean']> = null;
  hepatoJugularReflux?: Maybe<Scalars['Boolean']> = null;
  neckCarotidMurmur?: Maybe<Scalars['String']> = null;
  soft?: Maybe<Scalars['Boolean']> = null;
  tender?: Maybe<Scalars['String']> = null;
  hepatomegaly?: Maybe<Scalars['Boolean']> = null;
  ascites?: Maybe<Scalars['Boolean']> = null;
};

export class CardiologyConditionBase {
  __typename?: 'CardiologyCondition';
  /** The id of the Condition. */
  public id?: Maybe<Scalars['String']> = null;
  /** The name of the Condition. */
  public name?: Maybe<Scalars['String']> = null;
  /** The type of the Condition. */
  public type?: Maybe<Scalars['String']> = null;
  /** The status of the Condition. */
  public status?: Maybe<Scalars['String']> = null;
  /** The sub-location that inherets from location. */
  public subLocation?: Maybe<Scalars['String']> = null;
  /** The opening date of the Condition. */
  public opened?: Maybe<Scalars['DateTime']> = null;
  /** The closing date of the Condition. */
  public closed?: Maybe<Scalars['DateTime']> = null;
  public location?: Maybe<LocationViewTypeBase> = new LocationViewTypeBase();
  /** The list of Cheif Complaint of the Condition. */
  public cheifComplaint?: Maybe<DataPartitionBase> = new DataPartitionBase();
  /** The list of Present History of the Condition. */
  public presentHistory?: Maybe<DataPartitionBase> = new DataPartitionBase();
  /** The list of Diagnosis of the Condition. */
  public diagnosis?: Maybe<DataPartitionBase> = new DataPartitionBase();
  /** The list of Differential Diagnosis of the Condition. */
  public differentialDiagnosis?: Maybe<DataPartitionBase> = new DataPartitionBase();
  /** The list of Consultations of the Condition. */
  public consultation?: Maybe<DataPartitionBase> = new DataPartitionBase();
  /** The list of OtherTreatments of the Condition. */
  public otherTreatments?: Maybe<DataPartitionBase> = new DataPartitionBase();
  /** The list of physical exam of the Condition. */
  public physicalExam?: Maybe<DataPartitionBase> = new DataPartitionBase();
  /** The list of Laboratory test of the Condition. */
  public laboratory?: Maybe<DataPartitionBase> = new DataPartitionBase();
  /** The list of Radio of the Condition. */
  public radio?: Maybe<DataPartitionBase> = new DataPartitionBase();
  /** The list of notes of the Condition. */
  public note?: Maybe<DataPartitionBase> = new DataPartitionBase();
  /** A remark to identify if a condition is duplicated. */
  public isDuplicate?: Maybe<Scalars['Boolean']> = null;
  /** The show/hide status of the condition. */
  public isHidden?: Maybe<Scalars['Boolean']> = null;
  public medications?: Maybe<Array<Maybe<MedicationBase>>> = [];
  public activities?: Maybe<CardiologyActivitiesBase> = new CardiologyActivitiesBase();
  public height?: Maybe<Scalars['Float']> = null;
  public weight?: Maybe<Scalars['Float']> = null;
  public bmi?: Maybe<Scalars['Float']> = null;
  public cardiologyClinicalExamination?: Maybe<CardiologyClinicalExaminationBase> = new CardiologyClinicalExaminationBase();
};

export class CardiologyConditionInputBase {
  id?: Maybe<Scalars['String']> = null;
  name?: Maybe<Scalars['String']> = null;
  type?: Maybe<Scalars['String']> = null;
  status?: Maybe<Scalars['String']> = null;
  subLocation?: Maybe<Scalars['String']> = null;
  opened?: Maybe<Scalars['DateTime']> = null;
  closed?: Maybe<Scalars['DateTime']> = null;
  location?: Maybe<LocationViewInputTypeBase> = new LocationViewInputTypeBase();
  cheifComplaint?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  presentHistory?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  diagnosis?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  differentialDiagnosis?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  consultation?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  otherTreatments?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  physicalExam?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  laboratory?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  radio?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  note?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  activities?: Maybe<CardiologyActivitiesInputBase> = new CardiologyActivitiesInputBase();
  isDuplicate?: Maybe<Scalars['Boolean']> = null;
  medications?: Maybe<Array<Maybe<MedicationInputBase>>> = [];
  isHidden?: Maybe<Scalars['Boolean']> = null;
  height?: Maybe<Scalars['Float']> = null;
  weight?: Maybe<Scalars['Float']> = null;
  bmi?: Maybe<Scalars['Float']> = null;
  cardiologyClinicalExamination?: Maybe<CardiologyClinicalExaminationInputBase> = new CardiologyClinicalExaminationInputBase();
};

export class CardiologyFollowupBase {
  __typename?: 'CardiologyFollowup';
  public id?: Maybe<Scalars['String']> = null;
  public name?: Maybe<Scalars['String']> = null;
  public type?: Maybe<Scalars['String']> = null;
  public status?: Maybe<Scalars['String']> = null;
  /** The sub-location that inherets from location. */
  public subLocation?: Maybe<Scalars['String']> = null;
  /** A remark to identify if a followup is duplicated. */
  public isDuplicate?: Maybe<Scalars['Boolean']> = null;
  public opened?: Maybe<Scalars['DateTime']> = null;
  public closed?: Maybe<Scalars['DateTime']> = null;
  public location?: Maybe<LocationViewTypeBase> = new LocationViewTypeBase();
  public subjective?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public diagnosis?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public medication?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public otherTreatments?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public assessment?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public consultation?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public physicalExam?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public laboratory?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public note?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public radio?: Maybe<DataPartitionBase> = new DataPartitionBase();
  /** The show/hide status of the condition. */
  public isHidden?: Maybe<Scalars['Boolean']> = null;
  public medications?: Maybe<Array<Maybe<MedicationBase>>> = [];
  public cardiologyClinicalExamination?: Maybe<CardiologyClinicalExaminationBase> = new CardiologyClinicalExaminationBase();
};

export class CardiologyFollowupInputBase {
  id?: Maybe<Scalars['String']> = null;
  name?: Maybe<Scalars['String']> = null;
  type?: Maybe<Scalars['String']> = null;
  status?: Maybe<Scalars['String']> = null;
  subLocation?: Maybe<Scalars['String']> = null;
  opened?: Maybe<Scalars['DateTime']> = null;
  closed?: Maybe<Scalars['DateTime']> = null;
  location?: Maybe<LocationViewInputTypeBase> = new LocationViewInputTypeBase();
  subjective?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  medication?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  otherTreatments?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  assessment?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  consultation?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  physicalExam?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  laboratory?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  radio?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  note?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  diagnosis?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  isDuplicate?: Maybe<Scalars['Boolean']> = null;
  isHidden?: Maybe<Scalars['Boolean']> = null;
  medications?: Maybe<Array<Maybe<MedicationInputBase>>> = [];
  cardiologyClinicalExamination?: Maybe<CardiologyClinicalExaminationInputBase> = new CardiologyClinicalExaminationInputBase();
};

export class CardiologyInputBase {
  conditions?: Maybe<Array<Maybe<CardiologyConditionInputBase>>> = [];
  medicalHistory?: Maybe<CardiologyMedicalHistoryInputBase> = new CardiologyMedicalHistoryInputBase();
};

export class CardiologyMedicalHistoryBase {
  __typename?: 'CardiologyMedicalHistory';
  /** Alerts */
  public alerts?: Maybe<MedicalHistoryAlertBase> = new MedicalHistoryAlertBase();
  public allergies?: Maybe<MedicalHistoryAlertBase> = new MedicalHistoryAlertBase();
  public familyHistory?: Maybe<MedicalHistoryAlertBase> = new MedicalHistoryAlertBase();
  public medicalIssues?: Maybe<MedicalHistoryAlertBase> = new MedicalHistoryAlertBase();
  public cardioVascular?: Maybe<MedicalHistoryAlertBase> = new MedicalHistoryAlertBase();
  public gi?: Maybe<MedicalHistoryAlertBase> = new MedicalHistoryAlertBase();
  public endocrinology?: Maybe<MedicalHistoryAlertBase> = new MedicalHistoryAlertBase();
  public lungDiseases?: Maybe<MedicalHistoryAlertBase> = new MedicalHistoryAlertBase();
  public neurology?: Maybe<MedicalHistoryAlertBase> = new MedicalHistoryAlertBase();
  public physiomaticDisorder?: Maybe<MedicalHistoryAlertBase> = new MedicalHistoryAlertBase();
  public riskFactors?: Maybe<MedicalHistoryAlertBase> = new MedicalHistoryAlertBase();
  public pastMedication?: Maybe<MedicalHistoryMedicationBase> = new MedicalHistoryMedicationBase();
  public presentMedication?: Maybe<MedicalHistoryMedicationBase> = new MedicalHistoryMedicationBase();
  public surgicalHistory?: Maybe<CardiologyMedicalHistorySurgeryBase> = new CardiologyMedicalHistorySurgeryBase();
};

export class CardiologyMedicalHistoryInputBase {
  alerts?: Maybe<MedicalHistoryAlertInputBase> = new MedicalHistoryAlertInputBase();
  allergies?: Maybe<MedicalHistoryAlertInputBase> = new MedicalHistoryAlertInputBase();
  familyHistory?: Maybe<MedicalHistoryAlertInputBase> = new MedicalHistoryAlertInputBase();
  medicalIssues?: Maybe<MedicalHistoryAlertInputBase> = new MedicalHistoryAlertInputBase();
  cardioVascular?: Maybe<MedicalHistoryAlertInputBase> = new MedicalHistoryAlertInputBase();
  gi?: Maybe<MedicalHistoryAlertInputBase> = new MedicalHistoryAlertInputBase();
  endocrinology?: Maybe<MedicalHistoryAlertInputBase> = new MedicalHistoryAlertInputBase();
  lungDiseases?: Maybe<MedicalHistoryAlertInputBase> = new MedicalHistoryAlertInputBase();
  neurology?: Maybe<MedicalHistoryAlertInputBase> = new MedicalHistoryAlertInputBase();
  physiomaticDisorder?: Maybe<MedicalHistoryAlertInputBase> = new MedicalHistoryAlertInputBase();
  riskFactors?: Maybe<MedicalHistoryAlertInputBase> = new MedicalHistoryAlertInputBase();
  pastMedication?: Maybe<MedicalHistoryMedicationInputBase> = new MedicalHistoryMedicationInputBase();
  presentMedication?: Maybe<MedicalHistoryMedicationInputBase> = new MedicalHistoryMedicationInputBase();
  surgicalHistory?: Maybe<CardiologyMedicalHistorySurgeryInputBase> = new CardiologyMedicalHistorySurgeryInputBase();
};

export class CardiologyMedicalHistorySurgeryBase {
  __typename?: 'CardiologyMedicalHistorySurgery';
  public alert?: Maybe<Scalars['Boolean']> = null;
  public lastUpdate?: Maybe<Scalars['DateTime']> = null;
  public data?: Maybe<Array<Maybe<CardiologySurgicalHistoryBase>>> = [];
};

export class CardiologyMedicalHistorySurgeryInputBase {
  alert?: Maybe<Scalars['Boolean']> = null;
  lastUpdate?: Maybe<Scalars['DateTime']> = null;
  data?: Maybe<Array<Maybe<CardiologySurgicalHistoryInputBase>>> = [];
};

export class CardiologyOperationBase {
  __typename?: 'CardiologyOperation';
  public id?: Maybe<Scalars['String']> = null;
  public name?: Maybe<Scalars['String']> = null;
  public type?: Maybe<Scalars['String']> = null;
  public status?: Maybe<Scalars['String']> = null;
  /** The sub-location that inherets from location. */
  public subLocation?: Maybe<Scalars['String']> = null;
  /** A remark to identify if a operation is duplicated. */
  public isDuplicate?: Maybe<Scalars['Boolean']> = null;
  public opened?: Maybe<Scalars['DateTime']> = null;
  public closed?: Maybe<Scalars['DateTime']> = null;
  public location?: Maybe<LocationViewTypeBase> = new LocationViewTypeBase();
  public department?: Maybe<Scalars['String']> = null;
  public anesthesia?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public code?: Maybe<Array<Maybe<Scalars['String']>>> = [];
  public operationType?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public operationPerformed?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public operationDiagnosis?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public operationPostDiagnosis?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public operationPreFindings?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public operationCategory?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public physicalExam?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public surgeons?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public operationDetails?: Maybe<Scalars['String']> = null;
};

export class CardiologyOperationInputBase {
  id?: Maybe<Scalars['String']> = null;
  name?: Maybe<Scalars['String']> = null;
  type?: Maybe<Scalars['String']> = null;
  status?: Maybe<Scalars['String']> = null;
  subLocation?: Maybe<Scalars['String']> = null;
  opened?: Maybe<Scalars['DateTime']> = null;
  closed?: Maybe<Scalars['DateTime']> = null;
  location?: Maybe<LocationViewInputTypeBase> = new LocationViewInputTypeBase();
  department?: Maybe<Scalars['String']> = null;
  anesthesia?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  code?: Maybe<Array<Maybe<Scalars['String']>>> = [];
  operationType?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  operationPerformed?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  operationDiagnosis?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  operationPostDiagnosis?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  operationPreFindings?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  operationCategory?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  physicalExam?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  surgeons?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  operationDetails?: Maybe<Scalars['String']> = null;
  isDuplicate?: Maybe<Scalars['Boolean']> = null;
};

export class CardiologySurgicalHistoryBase {
  __typename?: 'CardiologySurgicalHistory';
  public note?: Maybe<Scalars['String']> = null;
  public what?: Maybe<Array<Maybe<LookupViewBase>>> = [];
  public type?: Maybe<Scalars['String']> = null;
  public when?: Maybe<Scalars['DateTime']> = null;
};

export class CardiologySurgicalHistoryInputBase {
  type?: Maybe<Scalars['String']> = null;
  what?: Maybe<Array<Maybe<LookupViewModelInputBase>>> = [];
  when?: Maybe<Scalars['DateTime']> = null;
  note?: Maybe<Scalars['String']> = null;
};

export class ConditionBase {
  __typename?: 'Condition';
  /** The name of the Condition. */
  public name?: Maybe<Scalars['String']> = null;
  /** The type of the Condition. */
  public type?: Maybe<Scalars['String']> = null;
  /** The closing date of the Condition. */
  public closed?: Maybe<Scalars['DateTime']> = null;
  /** The opening date of the Condition. */
  public opened?: Maybe<Scalars['DateTime']> = null;
  /** The status of the Condition. */
  public status?: Maybe<Scalars['DateTime']> = null;
};

export class ContactBase {
  __typename?: 'Contact';
  /** The id of the patient. */
  public id?: Maybe<Scalars['String']> = null;
  /** A remark to identify if a contact is duplicated. */
  public isDuplicate?: Maybe<Scalars['Boolean']> = null;
  /** The name of the contact. */
  public name?: Maybe<Scalars['String']> = null;
  /** The sex of the patient. */
  public gender?: Maybe<Scalars['String']> = null;
  /** Telphone number of the patient. */
  public telephone?: Maybe<Scalars['String']> = null;
  /** Contact Numbers of the patient. */
  public contactNumbers?: Maybe<Array<Maybe<Scalars['String']>>> = [];
  /** The birthdate of the patient. */
  public birthDate?: Maybe<Scalars['DateTime']> = null;
  /** The Occupation of the patient. */
  public occupation?: Maybe<Scalars['String']> = null;
  /** The Partner of the patient. */
  public partner?: Maybe<Scalars['String']> = null;
  /** The name of the patient. */
  public country?: Maybe<Scalars['String']> = null;
  /** The city of the patient. */
  public city?: Maybe<Scalars['String']> = null;
  /** The identity number (Identity card or passport) of the patient. */
  public identityNumber?: Maybe<Scalars['String']> = null;
  /** The Country of the patient. */
  public email?: Maybe<Scalars['String']> = null;
  /** Creation Date. */
  public createdOn?: Maybe<Scalars['DateTime']> = null;
  /** Modified Date. */
  public modified?: Maybe<Scalars['DateTime']> = null;
  /** Contact type. */
  public contactType?: Maybe<Scalars['String']> = null;
};

export class ContactInputBase {
  id?: Maybe<Scalars['String']> = null;
  name: Maybe<Scalars['String']> = null;
  telephone: Maybe<Scalars['String']> = null;
  contactNumbers?: Maybe<Array<Maybe<Scalars['String']>>> = [];
  gender?: Maybe<Scalars['String']> = null;
  birthDate?: Maybe<Scalars['DateTime']> = null;
  occupation?: Maybe<Scalars['String']> = null;
  partner?: Maybe<Scalars['String']> = null;
  country?: Maybe<Scalars['String']> = null;
  city?: Maybe<Scalars['String']> = null;
  email?: Maybe<Scalars['String']> = null;
  identityNumber?: Maybe<Scalars['String']> = null;
  createdOn?: Maybe<Scalars['DateTime']> = null;
  modified?: Maybe<Scalars['DateTime']> = null;
  contactType?: Maybe<Scalars['String']> = null;
  isDuplicate?: Maybe<Scalars['Boolean']> = null;
};

export class DataPartitionBase {
  __typename?: 'DataPartition';
  /** Text */
  public text?: Maybe<Array<Maybe<LookupViewBase>>> = [];
  /** Media */
  public media?: Maybe<Array<Maybe<MediaPartitionBase>>> = [];
  public tags?: Maybe<Array<Maybe<Scalars['String']>>> = [];
};

export class DataPartitionInputBase {
  text?: Maybe<Array<Maybe<LookupViewModelInputBase>>> = [];
  media?: Maybe<Array<Maybe<MediaPartitionInputBase>>> = [];
  tags?: Maybe<Array<Maybe<Scalars['String']>>> = [];
};



export class DrugBase {
  __typename?: 'Drug';
  public id?: Maybe<Scalars['String']> = null;
  public atcCode?: Maybe<Scalars['String']> = null;
  public name?: Maybe<Scalars['String']> = null;
  public dosage?: Maybe<Scalars['String']> = null;
  public form?: Maybe<Scalars['String']> = null;
};

export class DrugInputBase {
  id?: Maybe<Scalars['String']> = null;
  name: Maybe<Scalars['String']> = null;
  dosage?: Maybe<Scalars['String']> = null;
  atcCode?: Maybe<Scalars['String']> = null;
  form?: Maybe<Scalars['String']> = null;
  route?: Maybe<Scalars['String']> = null;
};

export class DrugViewBase {
  __typename?: 'DrugView';
  /** The id of the drug. */
  public id?: Maybe<Scalars['String']> = null;
  /** The name of the drug. */
  public name?: Maybe<Scalars['String']> = null;
  /** Drug Dosage Ex :20mg or 20mg/10ml. */
  public dosage?: Maybe<Scalars['String']> = null;
};

export class DrugViewInputBase {
  id?: Maybe<Scalars['String']> = null;
  name: Maybe<Scalars['String']> = null;
  dosage?: Maybe<Scalars['String']> = null;
};

export class EventFromTypeBase {
  __typename?: 'EventFromType';
  public id: Maybe<Scalars['String']> = null;
  public displayName: Maybe<Scalars['String']> = null;
};

export class GeneralBase {
  __typename?: 'General';
  public conditions?: Maybe<Array<Maybe<GeneralConditionBase>>> = [];
  public medicalHistory?: Maybe<GeneralMedicalHistoryBase> = new GeneralMedicalHistoryBase();
};

export class GeneralActivitiesBase {
  __typename?: 'GeneralActivities';
  public followups?: Maybe<Array<Maybe<GeneralFollowupBase>>> = [];
  public operations?: Maybe<Array<Maybe<GeneralOperationBase>>> = [];
};

export class GeneralActivitiesInputBase {
  followups?: Maybe<Array<Maybe<GeneralFollowupInputBase>>> = [];
  operations?: Maybe<Array<Maybe<GeneralOperationInputBase>>> = [];
};

export class GeneralConditionBase {
  __typename?: 'GeneralCondition';
  /** The id of the Condition. */
  public id?: Maybe<Scalars['String']> = null;
  /** The name of the Condition. */
  public name?: Maybe<Scalars['String']> = null;
  /** The type of the Condition. */
  public type?: Maybe<Scalars['String']> = null;
  /** The status of the Condition. */
  public status?: Maybe<Scalars['String']> = null;
  /** The sub-location that inherets from location. */
  public subLocation?: Maybe<Scalars['String']> = null;
  /** The opening date of the Condition. */
  public opened?: Maybe<Scalars['DateTime']> = null;
  /** The closing date of the Condition. */
  public closed?: Maybe<Scalars['DateTime']> = null;
  public location?: Maybe<LocationViewTypeBase> = new LocationViewTypeBase();
  /** The list of Cheif Complaint of the Condition. */
  public cheifComplaint?: Maybe<DataPartitionBase> = new DataPartitionBase();
  /** The list of Present History of the Condition. */
  public presentHistory?: Maybe<DataPartitionBase> = new DataPartitionBase();
  /** The list of Diagnosis of the Condition. */
  public diagnosis?: Maybe<DataPartitionBase> = new DataPartitionBase();
  /** The list of Differential Diagnosis of the Condition. */
  public differentialDiagnosis?: Maybe<DataPartitionBase> = new DataPartitionBase();
  /** The list of Consultations of the Condition. */
  public consultation?: Maybe<DataPartitionBase> = new DataPartitionBase();
  /** The list of OtherTreatments of the Condition. */
  public otherTreatments?: Maybe<DataPartitionBase> = new DataPartitionBase();
  /** The list of physical exam of the Condition. */
  public physicalExam?: Maybe<DataPartitionBase> = new DataPartitionBase();
  /** The list of Laboratory test of the Condition. */
  public laboratory?: Maybe<DataPartitionBase> = new DataPartitionBase();
  /** The list of Radio of the Condition. */
  public radio?: Maybe<DataPartitionBase> = new DataPartitionBase();
  /** The list of notes of the Condition. */
  public note?: Maybe<DataPartitionBase> = new DataPartitionBase();
  /** A remark to identify if a condition is duplicated. */
  public isDuplicate?: Maybe<Scalars['Boolean']> = null;
  /** The show/hide status of the condition. */
  public isHidden?: Maybe<Scalars['Boolean']> = null;
  public medications?: Maybe<Array<Maybe<MedicationBase>>> = [];
  public activities?: Maybe<GeneralActivitiesBase> = new GeneralActivitiesBase();
};

export class GeneralConditionInputBase {
  id?: Maybe<Scalars['String']> = null;
  name?: Maybe<Scalars['String']> = null;
  type?: Maybe<Scalars['String']> = null;
  status?: Maybe<Scalars['String']> = null;
  subLocation?: Maybe<Scalars['String']> = null;
  opened?: Maybe<Scalars['DateTime']> = null;
  closed?: Maybe<Scalars['DateTime']> = null;
  location?: Maybe<LocationViewInputTypeBase> = new LocationViewInputTypeBase();
  cheifComplaint?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  presentHistory?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  diagnosis?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  differentialDiagnosis?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  consultation?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  otherTreatments?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  physicalExam?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  laboratory?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  radio?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  note?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  activities?: Maybe<GeneralActivitiesInputBase> = new GeneralActivitiesInputBase();
  isDuplicate?: Maybe<Scalars['Boolean']> = null;
  medications?: Maybe<Array<Maybe<MedicationInputBase>>> = [];
  isHidden?: Maybe<Scalars['Boolean']> = null;
};

export class GeneralFollowupBase {
  __typename?: 'GeneralFollowup';
  public id?: Maybe<Scalars['String']> = null;
  public name?: Maybe<Scalars['String']> = null;
  public type?: Maybe<Scalars['String']> = null;
  public status?: Maybe<Scalars['String']> = null;
  /** The sub-location that inherets from location. */
  public subLocation?: Maybe<Scalars['String']> = null;
  /** A remark to identify if a followup is duplicated. */
  public isDuplicate?: Maybe<Scalars['Boolean']> = null;
  public opened?: Maybe<Scalars['DateTime']> = null;
  public closed?: Maybe<Scalars['DateTime']> = null;
  public location?: Maybe<LocationViewTypeBase> = new LocationViewTypeBase();
  public subjective?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public diagnosis?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public medication?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public otherTreatments?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public assessment?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public consultation?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public physicalExam?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public laboratory?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public note?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public radio?: Maybe<DataPartitionBase> = new DataPartitionBase();
  /** The show/hide status of the condition. */
  public isHidden?: Maybe<Scalars['Boolean']> = null;
  public medications?: Maybe<Array<Maybe<MedicationBase>>> = [];
};

export class GeneralFollowupInputBase {
  id?: Maybe<Scalars['String']> = null;
  name?: Maybe<Scalars['String']> = null;
  type?: Maybe<Scalars['String']> = null;
  status?: Maybe<Scalars['String']> = null;
  subLocation?: Maybe<Scalars['String']> = null;
  opened?: Maybe<Scalars['DateTime']> = null;
  closed?: Maybe<Scalars['DateTime']> = null;
  location?: Maybe<LocationViewInputTypeBase> = new LocationViewInputTypeBase();
  subjective?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  medication?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  otherTreatments?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  assessment?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  consultation?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  physicalExam?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  laboratory?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  radio?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  note?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  diagnosis?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  isDuplicate?: Maybe<Scalars['Boolean']> = null;
  medications?: Maybe<Array<Maybe<MedicationInputBase>>> = [];
  isHidden?: Maybe<Scalars['Boolean']> = null;
};

export class GeneralInputBase {
  conditions?: Maybe<Array<Maybe<GeneralConditionInputBase>>> = [];
  medicalHistory?: Maybe<GeneralMedicalHistoryInputBase> = new GeneralMedicalHistoryInputBase();
};

export class GeneralMedicalHistoryBase {
  __typename?: 'GeneralMedicalHistory';
  public alerts?: Maybe<MedicalHistoryAlertBase> = new MedicalHistoryAlertBase();
  public allergies?: Maybe<MedicalHistoryAlertBase> = new MedicalHistoryAlertBase();
  public familyHistory?: Maybe<MedicalHistoryAlertBase> = new MedicalHistoryAlertBase();
  public medicalIssues?: Maybe<MedicalHistoryAlertBase> = new MedicalHistoryAlertBase();
  public pastMedication?: Maybe<MedicalHistoryMedicationBase> = new MedicalHistoryMedicationBase();
  public presentMedication?: Maybe<MedicalHistoryMedicationBase> = new MedicalHistoryMedicationBase();
  public surgicalHistory?: Maybe<MedicalHistorySurgeryBase> = new MedicalHistorySurgeryBase();
};

export class GeneralMedicalHistoryInputBase {
  alerts?: Maybe<MedicalHistoryAlertInputBase> = new MedicalHistoryAlertInputBase();
  allergies?: Maybe<MedicalHistoryAlertInputBase> = new MedicalHistoryAlertInputBase();
  familyHistory?: Maybe<MedicalHistoryAlertInputBase> = new MedicalHistoryAlertInputBase();
  medicalIssues?: Maybe<MedicalHistoryAlertInputBase> = new MedicalHistoryAlertInputBase();
  pastMedication?: Maybe<MedicalHistoryMedicationInputBase> = new MedicalHistoryMedicationInputBase();
  presentMedication?: Maybe<MedicalHistoryMedicationInputBase> = new MedicalHistoryMedicationInputBase();
  surgicalHistory?: Maybe<MedicalHistorySurgeryInputBase> = new MedicalHistorySurgeryInputBase();
};

export class GeneralOperationBase {
  __typename?: 'GeneralOperation';
  public id?: Maybe<Scalars['String']> = null;
  public name?: Maybe<Scalars['String']> = null;
  public type?: Maybe<Scalars['String']> = null;
  public status?: Maybe<Scalars['String']> = null;
  /** The sub-location that inherets from location. */
  public subLocation?: Maybe<Scalars['String']> = null;
  /** A remark to identify if a operation is duplicated. */
  public isDuplicate?: Maybe<Scalars['Boolean']> = null;
  public opened?: Maybe<Scalars['DateTime']> = null;
  public closed?: Maybe<Scalars['DateTime']> = null;
  public location?: Maybe<LocationViewTypeBase> = new LocationViewTypeBase();
  public department?: Maybe<Scalars['String']> = null;
  public anesthesia?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public code?: Maybe<Array<Maybe<Scalars['String']>>> = [];
  public operationType?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public operationPerformed?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public operationDiagnosis?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public operationPostDiagnosis?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public operationPreFindings?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public operationCategory?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public physicalExam?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public surgeons?: Maybe<DataPartitionBase> = new DataPartitionBase();
  public operationDetails?: Maybe<Scalars['String']> = null;
};

export class GeneralOperationInputBase {
  id?: Maybe<Scalars['String']> = null;
  name?: Maybe<Scalars['String']> = null;
  type?: Maybe<Scalars['String']> = null;
  status?: Maybe<Scalars['String']> = null;
  subLocation?: Maybe<Scalars['String']> = null;
  opened?: Maybe<Scalars['DateTime']> = null;
  closed?: Maybe<Scalars['DateTime']> = null;
  location?: Maybe<LocationViewInputTypeBase> = new LocationViewInputTypeBase();
  department?: Maybe<Scalars['String']> = null;
  anesthesia?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  code?: Maybe<Array<Maybe<Scalars['String']>>> = [];
  operationType?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  operationPerformed?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  operationDiagnosis?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  operationPostDiagnosis?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  operationPreFindings?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  operationCategory?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  physicalExam?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  surgeons?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  operationDetails?: Maybe<Scalars['String']> = null;
  isDuplicate?: Maybe<Scalars['Boolean']> = null;
};

export class GrantorBase {
  __typename?: 'Grantor';
  /** Id of the Grantors */
  public id?: Maybe<Scalars['String']> = null;
  /** Name of the Grantors */
  public name?: Maybe<Scalars['String']> = null;
};

export class GrantorInputBase {
  id?: Maybe<Scalars['String']> = null;
  name: Maybe<Scalars['String']> = null;
};

export class LocationBase {
  __typename?: 'Location';
  /** The id of the location. */
  public id?: Maybe<Scalars['String']> = null;
  /** The name of the location. */
  public name?: Maybe<Scalars['String']> = null;
  /** the contact number of the location. */
  public contact?: Maybe<Scalars['String']> = null;
  /** The address of the location. */
  public address?: Maybe<Scalars['String']> = null;
  /** The type of the location. */
  public type?: Maybe<Scalars['String']> = null;
  /** List of sub-locations. */
  public subLocations?: Maybe<Array<Maybe<Scalars['String']>>> = [];
};

export class LocationInputBase {
  id?: Maybe<Scalars['String']> = null;
  name: Maybe<Scalars['String']> = null;
  contact?: Maybe<Scalars['String']> = null;
  address?: Maybe<Scalars['String']> = null;
  type?: Maybe<Scalars['String']> = null;
  subLocations?: Maybe<Array<Maybe<Scalars['String']>>> = [];
};

export class LocationViewInputTypeBase {
  id: Maybe<Scalars['String']> = null;
  name?: Maybe<Scalars['String']> = null;
};

export class LocationViewTypeBase {
  __typename?: 'LocationViewType';
  /** The id of the location. */
  public id?: Maybe<Scalars['String']> = null;
  /** The name of the location. */
  public name?: Maybe<Scalars['String']> = null;
};


export class LookupBase {
  __typename?: 'Lookup';
  /** The id of the lookup. */
  public id?: Maybe<Scalars['String']> = null;
  /** The tenantId of the lookup. */
  public tenantId?: Maybe<Scalars['String']> = null;
  /** The groupKey of the lookup. */
  public groupKey?: Maybe<Scalars['String']> = null;
  /** Value of the lookup. */
  public value?: Maybe<Scalars['String']> = null;
  /** Symbol of the lookup. */
  public symbol?: Maybe<Scalars['String']> = null;
  /** The display text of the lookup. */
  public text?: Maybe<Scalars['String']> = null;
  /** The description of the lookup. */
  public description?: Maybe<Scalars['String']> = null;
  /** The culture of the lookup. */
  public cultureName?: Maybe<Scalars['String']> = null;
  /** The Parent value of the lookup. */
  public parentValue?: Maybe<Scalars['String']> = null;
  /** Parent value */
  public parentId?: Maybe<Scalars['String']> = null;
  /** Created Date. */
  public createdDate?: Maybe<Scalars['DateTime']> = null;
  /** Modified Date */
  public modifiedDate?: Maybe<Scalars['DateTime']> = null;
  /** The order of the lookup entry in a list */
  public order?: Maybe<Scalars['Int']> = null;
  /** Whether the lookup entry is predefined. */
  public predefined?: Maybe<Scalars['Boolean']> = null;
};

export class LookupInputBase {
  id?: Maybe<Scalars['String']> = null;
  groupKey: Maybe<Scalars['String']> = null;
  value?: Maybe<Scalars['String']> = null;
  text: Maybe<Scalars['String']> = null;
  predefined?: Maybe<Scalars['Boolean']> = null;
};

export class LookupViewBase {
  __typename?: 'LookupView';
  /** The group of the lookup. */
  public group?: Maybe<Scalars['String']> = null;
  /** Value of the lookup. */
  public value?: Maybe<Scalars['String']> = null;
  /** The display text of the lookup. */
  public text?: Maybe<Scalars['String']> = null;
};

export class LookupViewModelInputBase {
  group: Maybe<Scalars['String']> = null;
  value: Maybe<Scalars['String']> = null;
  text: Maybe<Scalars['String']> = null;
};

export class MediaFileBase {
  __typename?: 'MediaFile';
  /** Id of the File. */
  public id?: Maybe<Scalars['String']> = null;
  /** Name of the File. */
  public name?: Maybe<Scalars['String']> = null;
  /** Path of the File. */
  public path?: Maybe<Scalars['String']> = null;
  /** Type of the File. */
  public type?: Maybe<Scalars['String']> = null;
  /** Size of the File. */
  public size?: Maybe<Scalars['String']> = null;
  /** To which tenant this file belongs. */
  public tenantId?: Maybe<Scalars['String']> = null;
  /** To which patient this file belongs. */
  public patientId?: Maybe<Scalars['String']> = null;
  /** Patient name that file belongs to. */
  public patientName?: Maybe<Scalars['String']> = null;
  /** In which speciality the file exists. */
  public speciality?: Maybe<Scalars['String']> = null;
  /** In which condition the file exists. */
  public conditionId?: Maybe<Scalars['String']> = null;
  /** Specified activity type Ex: (followup, operation). */
  public activityType?: Maybe<Scalars['String']> = null;
  /** In which activity the file exists. */
  public activityId?: Maybe<Scalars['String']> = null;
  /** To which ticket this file belongs. */
  public ticketNumber?: Maybe<Scalars['String']> = null;
  /** If file is deleted. */
  public isDeleted?: Maybe<Scalars['Boolean']> = null;
  /** Last modified date. */
  public modified?: Maybe<Scalars['DateTime']> = null;
  /** Date of delete. */
  public deletedOn?: Maybe<Scalars['DateTime']> = null;
  /** Built-in tags. */
  public systemTagging?: Maybe<Array<Maybe<Scalars['String']>>> = [];
  /** Custom tags. */
  public tags?: Maybe<DataPartitionBase> = new DataPartitionBase();
};

export class MediaFileInputBase {
  id?: Maybe<Scalars['String']> = null;
  name?: Maybe<Scalars['String']> = null;
  path?: Maybe<Scalars['String']> = null;
  type?: Maybe<Scalars['String']> = null;
  size?: Maybe<Scalars['String']> = null;
  tenantId?: Maybe<Scalars['String']> = null;
  patientId?: Maybe<Scalars['String']> = null;
  patientName?: Maybe<Scalars['String']> = null;
  speciality?: Maybe<Scalars['String']> = null;
  conditionId?: Maybe<Scalars['String']> = null;
  activityType?: Maybe<Scalars['String']> = null;
  activityId?: Maybe<Scalars['String']> = null;
  ticketNumber?: Maybe<Scalars['String']> = null;
  isDeleted?: Maybe<Scalars['Boolean']> = null;
  deletedOn?: Maybe<Scalars['DateTime']> = null;
  modified?: Maybe<Scalars['DateTime']> = null;
  tags?: Maybe<DataPartitionInputBase> = new DataPartitionInputBase();
  systemTagging?: Maybe<Array<Maybe<Scalars['String']>>> = [];
};

export class MediaPartitionBase {
  __typename?: 'MediaPartition';
  public text?: Maybe<Scalars['String']> = null;
  public tags?: Maybe<Array<Maybe<Scalars['String']>>> = [];
  public date?: Maybe<Scalars['DateTime']> = null;
};

export class MediaPartitionInputBase {
  text?: Maybe<Scalars['String']> = null;
  tags?: Maybe<Array<Maybe<Scalars['String']>>> = [];
  date?: Maybe<Scalars['DateTime']> = null;
};

export class MedicalHistoryAlertBase {
  __typename?: 'MedicalHistoryAlert';
  public alert?: Maybe<Scalars['Boolean']> = null;
  public lastUpdate?: Maybe<Scalars['DateTime']> = null;
  public data?: Maybe<Array<Maybe<LookupViewBase>>> = [];
};

export class MedicalHistoryAlertInputBase {
  alert?: Maybe<Scalars['Boolean']> = null;
  lastUpdate?: Maybe<Scalars['DateTime']> = null;
  data?: Maybe<Array<Maybe<LookupViewModelInputBase>>> = [];
};

export class MedicalHistoryMedicationBase {
  __typename?: 'MedicalHistoryMedication';
  public alert?: Maybe<Scalars['Boolean']> = null;
  public lastUpdate?: Maybe<Scalars['DateTime']> = null;
  public data?: Maybe<Array<Maybe<MedicationBase>>> = [];
};

export class MedicalHistoryMedicationInputBase {
  alert?: Maybe<Scalars['Boolean']> = null;
  lastUpdate?: Maybe<Scalars['DateTime']> = null;
  data?: Maybe<Array<Maybe<MedicationInputBase>>> = [];
};

export class MedicalHistorySurgeryBase {
  __typename?: 'MedicalHistorySurgery';
  public alert?: Maybe<Scalars['Boolean']> = null;
  public lastUpdate?: Maybe<Scalars['DateTime']> = null;
  public data?: Maybe<Array<Maybe<SurgicalHistoryBase>>> = [];
};

export class MedicalHistorySurgeryInputBase {
  alert?: Maybe<Scalars['Boolean']> = null;
  lastUpdate?: Maybe<Scalars['DateTime']> = null;
  data?: Maybe<Array<Maybe<SurgicalHistoryInputBase>>> = [];
};

export class MedicationBase {
  __typename?: 'Medication';
  public frequency?: Maybe<Scalars['String']> = null;
  public note?: Maybe<Scalars['String']> = null;
  public isActive?: Maybe<Scalars['Boolean']> = null;
  public usageType?: Maybe<Scalars['String']> = null;
  public noSubstitutes?: Maybe<Scalars['Boolean']> = null;
  public startDate?: Maybe<Scalars['DateTime']> = null;
  public endDate?: Maybe<Scalars['DateTime']> = null;
  public describedBy?: Maybe<Scalars['String']> = null;
  public drug?: Maybe<DrugViewBase> = new DrugViewBase();
};

export class MedicationInputBase {
  frequency?: Maybe<Scalars['String']> = null;
  drug: Maybe<DrugViewInputBase> = new DrugViewInputBase();
  note?: Maybe<Scalars['String']> = null;
  usageType?: Maybe<Scalars['String']> = null;
  describedBy?: Maybe<Scalars['String']> = null;
  noSubstitutes?: Maybe<Scalars['Boolean']> = null;
  isActive?: Maybe<Scalars['Boolean']> = null;
  startDate?: Maybe<Scalars['DateTime']> = null;
  endDate?: Maybe<Scalars['DateTime']> = null;
};

export class MessageFromTypeBase {
  __typename?: 'MessageFromType';
  public id: Maybe<Scalars['String']> = null;
  public displayName: Maybe<Scalars['String']> = null;
};

export class MessageInputTypeBase {
  fromId?: Maybe<Scalars['String']> = null;
  content?: Maybe<Scalars['String']> = null;
  sentAt?: Maybe<Scalars['Date']> = null;
};

export class MessageTypeBase {
  __typename?: 'MessageType';
  public content: Maybe<Scalars['String']> = null;
  public sentAt?: Maybe<Scalars['Date']> = null;
  public sub?: Maybe<Scalars['String']> = null;
  public from?: Maybe<MessageFromTypeBase> = new MessageFromTypeBase();
};

export class MutationBase {
  __typename?: 'Mutation';
  public updateSchedule?: Maybe<ScheduleBase> = new ScheduleBase();
  public createRota?: Maybe<RotaBase> = new RotaBase();
  public updateRota?: Maybe<RotaBase> = new RotaBase();
  public deleteRota?: Maybe<Scalars['String']> = null;
  public createLocation?: Maybe<LocationBase> = new LocationBase();
  public updateLocation?: Maybe<LocationBase> = new LocationBase();
  public deleteLocation?: Maybe<LocationBase> = new LocationBase();
  public deleteSubLocation?: Maybe<LocationBase> = new LocationBase();
  public updateSettings?: Maybe<SettingsBase> = new SettingsBase();
  public createAppointment?: Maybe<AppointmentBase> = new AppointmentBase();
  public updateAppointment?: Maybe<AppointmentBase> = new AppointmentBase();
  public addMessage?: Maybe<MessageTypeBase> = new MessageTypeBase();
  public deleteAppointment?: Maybe<Scalars['String']> = null;
  public createContact?: Maybe<ContactBase> = new ContactBase();
  public updateContact?: Maybe<ContactBase> = new ContactBase();
  public createPatient?: Maybe<PatientBase> = new PatientBase();
  public updatePatient?: Maybe<PatientBase> = new PatientBase();
  public updateCardiologyMedicalHistory?: Maybe<CardiologyMedicalHistoryBase> = new CardiologyMedicalHistoryBase();
  public updateGeneralMedicalHistory?: Maybe<GeneralMedicalHistoryBase> = new GeneralMedicalHistoryBase();
  public createCardiologyCondition?: Maybe<CardiologyConditionBase> = new CardiologyConditionBase();
  public createGeneralCondition?: Maybe<GeneralConditionBase> = new GeneralConditionBase();
  public updateCardiologyCondition?: Maybe<CardiologyConditionBase> = new CardiologyConditionBase();
  public updateGeneralCondition?: Maybe<GeneralConditionBase> = new GeneralConditionBase();
  public createCardiologyFollowup?: Maybe<CardiologyFollowupBase> = new CardiologyFollowupBase();
  public createGeneralFollowup?: Maybe<GeneralFollowupBase> = new GeneralFollowupBase();
  public updateCardiologyFollowup?: Maybe<CardiologyFollowupBase> = new CardiologyFollowupBase();
  public updateGeneralFollowup?: Maybe<GeneralFollowupBase> = new GeneralFollowupBase();
  public createCardiologyOperation?: Maybe<CardiologyOperationBase> = new CardiologyOperationBase();
  public createGeneralOperation?: Maybe<GeneralOperationBase> = new GeneralOperationBase();
  public updateCardiologyOperation?: Maybe<CardiologyOperationBase> = new CardiologyOperationBase();
  public updateGeneralOperation?: Maybe<GeneralOperationBase> = new GeneralOperationBase();
  public remarkDuplicateActivity?: Maybe<Scalars['String']> = null;
  public deleteMedicalActivity?: Maybe<Scalars['String']> = null;
  public remarkDuplicatePatient?: Maybe<Scalars['String']> = null;
  public deletePatient?: Maybe<Scalars['String']> = null;
  public createLookup?: Maybe<LookupBase> = new LookupBase();
  public createLookups?: Maybe<Array<Maybe<LookupBase>>> = [];
  public updateLookup?: Maybe<LookupBase> = new LookupBase();
  public deleteLookup?: Maybe<LookupBase> = new LookupBase();
  public createDrug?: Maybe<DrugBase> = new DrugBase();
  public updateDrug?: Maybe<DrugBase> = new DrugBase();
  public deleteDrug?: Maybe<DrugBase> = new DrugBase();
  public createGrantor?: Maybe<GrantorBase> = new GrantorBase();
  public updateGrantor?: Maybe<GrantorBase> = new GrantorBase();
  public deleteGrantor?: Maybe<GrantorBase> = new GrantorBase();
  public createTag?: Maybe<TagBase> = new TagBase();
  public updateTag?: Maybe<TagBase> = new TagBase();
  public deleteTag?: Maybe<TagBase> = new TagBase();
  public createMediaFile?: Maybe<MediaFileBase> = new MediaFileBase();
  public updateMediaFiles?: Maybe<Array<Maybe<MediaFileBase>>> = [];
  public deleteMediaFiles?: Maybe<Array<Maybe<Scalars['String']>>> = [];
  public createMedication?: Maybe<PatientMedicationsBase> = new PatientMedicationsBase();
  public updateMedications?: Maybe<PatientMedicationsBase> = new PatientMedicationsBase();
  public createTodo?: Maybe<TodoBase> = new TodoBase();
  public updateTodo?: Maybe<TodoBase> = new TodoBase();
  public deleteTodo?: Maybe<TodoBase> = new TodoBase();
  public createTicket?: Maybe<TicketBase> = new TicketBase();
  public updateTicket?: Maybe<TicketBase> = new TicketBase();
  public updateTicketAdmin?: Maybe<TicketBase> = new TicketBase();
};


export type MutationUpdateScheduleArgsBase = {
  schedule: ScheduleInputBase;
};


export type MutationCreateRotaArgsBase = {
  rota: RotaInputBase;
};


export type MutationUpdateRotaArgsBase = {
  rota: RotaInputBase;
};


export type MutationDeleteRotaArgsBase = {
  id: Scalars['String'];
};


export type MutationCreateLocationArgsBase = {
  location: LocationInputBase;
};


export type MutationUpdateLocationArgsBase = {
  location: LocationInputBase;
};


export type MutationDeleteLocationArgsBase = {
  id: Scalars['String'];
};


export type MutationDeleteSubLocationArgsBase = {
  id: Scalars['String'];
  subLocation: Scalars['String'];
};


export type MutationUpdateSettingsArgsBase = {
  settings: SettingsInputBase;
};


export type MutationCreateAppointmentArgsBase = {
  appointment: AppointmentInputBase;
};


export type MutationUpdateAppointmentArgsBase = {
  appointment: AppointmentInputBase;
};


export type MutationAddMessageArgsBase = {
  message?: Maybe<MessageInputTypeBase>;
};


export type MutationDeleteAppointmentArgsBase = {
  id: Scalars['String'];
};


export type MutationCreateContactArgsBase = {
  contact: ContactInputBase;
};


export type MutationUpdateContactArgsBase = {
  contact: ContactInputBase;
};


export type MutationCreatePatientArgsBase = {
  patient: PatientInputBase;
};


export type MutationUpdatePatientArgsBase = {
  patient: PatientInputBase;
};


export type MutationUpdateCardiologyMedicalHistoryArgsBase = {
  patientId: Scalars['String'];
  medicalHistory: CardiologyMedicalHistoryInputBase;
};


export type MutationUpdateGeneralMedicalHistoryArgsBase = {
  patientId: Scalars['String'];
  medicalHistory: GeneralMedicalHistoryInputBase;
};


export type MutationCreateCardiologyConditionArgsBase = {
  patientId: Scalars['String'];
  condition: CardiologyConditionInputBase;
};


export type MutationCreateGeneralConditionArgsBase = {
  patientId: Scalars['String'];
  condition: GeneralConditionInputBase;
};


export type MutationUpdateCardiologyConditionArgsBase = {
  patientId: Scalars['String'];
  condition: CardiologyConditionInputBase;
};


export type MutationUpdateGeneralConditionArgsBase = {
  patientId: Scalars['String'];
  condition: GeneralConditionInputBase;
};


export type MutationCreateCardiologyFollowupArgsBase = {
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  followup: CardiologyFollowupInputBase;
};


export type MutationCreateGeneralFollowupArgsBase = {
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  followup: GeneralFollowupInputBase;
};


export type MutationUpdateCardiologyFollowupArgsBase = {
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  replacedConditionId?: Maybe<Scalars['String']>;
  followup: CardiologyFollowupInputBase;
};


export type MutationUpdateGeneralFollowupArgsBase = {
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  replacedConditionId?: Maybe<Scalars['String']>;
  followup: GeneralFollowupInputBase;
};


export type MutationCreateCardiologyOperationArgsBase = {
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  operation: CardiologyOperationInputBase;
};


export type MutationCreateGeneralOperationArgsBase = {
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  operation: GeneralOperationInputBase;
};


export type MutationUpdateCardiologyOperationArgsBase = {
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  replacedConditionId?: Maybe<Scalars['String']>;
  operation: CardiologyOperationInputBase;
};


export type MutationUpdateGeneralOperationArgsBase = {
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  replacedConditionId?: Maybe<Scalars['String']>;
  operation: GeneralOperationInputBase;
};


export type MutationRemarkDuplicateActivityArgsBase = {
  patientId: Scalars['String'];
  speciality: Scalars['String'];
  conditionId: Scalars['String'];
  activityType?: Maybe<Scalars['String']>;
  activityId?: Maybe<Scalars['String']>;
  isDuplicate?: Maybe<Scalars['Boolean']>;
};


export type MutationDeleteMedicalActivityArgsBase = {
  patientId: Scalars['String'];
  speciality: Scalars['String'];
  conditionId: Scalars['String'];
  activityType?: Maybe<Scalars['String']>;
  activityId?: Maybe<Scalars['String']>;
};


export type MutationRemarkDuplicatePatientArgsBase = {
  patientId: Scalars['String'];
  isDuplicate?: Maybe<Scalars['Boolean']>;
};


export type MutationDeletePatientArgsBase = {
  patientId: Scalars['String'];
};


export type MutationCreateLookupArgsBase = {
  lookup: LookupInputBase;
};


export type MutationCreateLookupsArgsBase = {
  lookups: Array<Maybe<LookupInputBase>>;
};


export type MutationUpdateLookupArgsBase = {
  lookup: LookupInputBase;
};


export type MutationDeleteLookupArgsBase = {
  id: Scalars['String'];
};


export type MutationCreateDrugArgsBase = {
  drug: DrugInputBase;
};


export type MutationUpdateDrugArgsBase = {
  drug: DrugInputBase;
};


export type MutationDeleteDrugArgsBase = {
  id: Scalars['String'];
};


export type MutationCreateGrantorArgsBase = {
  grantor: GrantorInputBase;
};


export type MutationUpdateGrantorArgsBase = {
  grantor: GrantorInputBase;
};


export type MutationDeleteGrantorArgsBase = {
  id: Scalars['String'];
};


export type MutationCreateTagArgsBase = {
  tag: TagInputBase;
};


export type MutationUpdateTagArgsBase = {
  tag: TagInputBase;
};


export type MutationDeleteTagArgsBase = {
  id: Scalars['String'];
};


export type MutationCreateMediaFileArgsBase = {
  mediaFile: MediaFileInputBase;
};


export type MutationUpdateMediaFilesArgsBase = {
  mediaFiles: Array<Maybe<MediaFileInputBase>>;
};


export type MutationDeleteMediaFilesArgsBase = {
  id: Array<Maybe<Scalars['String']>>;
};


export type MutationCreateMedicationArgsBase = {
  patientMedications: PatientMedicationsInputBase;
};


export type MutationUpdateMedicationsArgsBase = {
  patientMedications: PatientMedicationsInputBase;
  patientId: Scalars['String'];
  medicationId: Scalars['String'];
};


export type MutationCreateTodoArgsBase = {
  todo: TodoInputBase;
};


export type MutationUpdateTodoArgsBase = {
  todo: TodoInputBase;
};


export type MutationDeleteTodoArgsBase = {
  id: Scalars['String'];
};


export type MutationCreateTicketArgsBase = {
  ticket: TicketInputBase;
};


export type MutationUpdateTicketArgsBase = {
  ticket: TicketInputBase;
  broadcast?: Maybe<Scalars['Boolean']>;
};


export type MutationUpdateTicketAdminArgsBase = {
  ticket: TicketInputBase;
  broadcast?: Maybe<Scalars['Boolean']>;
};

export class PageResultTicketBase {
  __typename?: 'PageResultTicket';
  /** count of the tickets. */
  public count?: Maybe<Scalars['Long']> = null;
  /** Tickets. */
  public items?: Maybe<Array<Maybe<TicketBase>>> = [];
};

export class PatientBase {
  __typename?: 'Patient';
  /** The id of the patient. */
  public id?: Maybe<Scalars['String']> = null;
  /** The name of the patient. */
  public name?: Maybe<Scalars['String']> = null;
  /** The sex of the patient. */
  public gender?: Maybe<Scalars['String']> = null;
  /** Telphone number of the patient. */
  public telephone?: Maybe<Scalars['String']> = null;
  /** Contact Numbers of the patient. */
  public contactNumbers?: Maybe<Array<Maybe<Scalars['String']>>> = [];
  /** The birthdate of the patient. */
  public birthDate?: Maybe<Scalars['DateTime']> = null;
  /** The Occupation of the patient. */
  public occupation?: Maybe<Scalars['String']> = null;
  /** The Partner of the patient. */
  public partner?: Maybe<Scalars['String']> = null;
  /** The name of the patient. */
  public country?: Maybe<Scalars['String']> = null;
  /** The city of the patient. */
  public city?: Maybe<Scalars['String']> = null;
  /** The identity number (Identity card or passport) of the patient. */
  public identityNumber?: Maybe<Scalars['String']> = null;
  /** The Country of the patient. */
  public email?: Maybe<Scalars['String']> = null;
  /** Creation Date. */
  public createdOn?: Maybe<Scalars['DateTime']> = null;
  /** Modified Date. */
  public modified?: Maybe<Scalars['DateTime']> = null;
  /** Modified Date. */
  public isDuplicate?: Maybe<Scalars['Boolean']> = null;
  public patientInfo?: Maybe<PatientInfoBase> = new PatientInfoBase();
};

export class PatientInfoBase {
  __typename?: 'PatientInfo';
  /** The blood type of the patient. */
  public bloodType?: Maybe<Scalars['String']> = null;
  /** The marital status of the patient. */
  public maritalStatus?: Maybe<Scalars['String']> = null;
  /** The Emergancy Contact of the patient. */
  public emergancyContact?: Maybe<Scalars['String']> = null;
  /** Entry Date. */
  public entryDate?: Maybe<Scalars['DateTime']> = null;
  /** The File Number (papers) of the patient. */
  public fileNumber?: Maybe<Scalars['String']> = null;
  /** Who reffered this patient. */
  public referral?: Maybe<Array<Maybe<Scalars['String']>>> = [];
  /** A date represents the last activity date  */
  public lastSeen?: Maybe<Scalars['DateTime']> = null;
  /** Percentage of process moving from patient paper files to Digitized. */
  public totalDigitizedData?: Maybe<Scalars['Int']> = null;
  /** Patient's flags. */
  public flags?: Maybe<Array<Maybe<Scalars['String']>>> = [];
  /** The grantors of the patient */
  public grantors?: Maybe<Array<Maybe<GrantorBase>>> = [];
  /** The tags of the patient */
  public tags?: Maybe<Array<Maybe<TagBase>>> = [];
  /** Creation Date. */
  public createdOn?: Maybe<Scalars['DateTime']> = null;
  /** Modified Date. */
  public modified?: Maybe<Scalars['DateTime']> = null;
  public specialities?: Maybe<SpecialityBase> = new SpecialityBase();
};

export class PatientInfoInputBase {
  entryDate?: Maybe<Scalars['DateTime']> = null;
  lastSeen?: Maybe<Scalars['DateTime']> = null;
  maritalStatus?: Maybe<Scalars['String']> = null;
  referral?: Maybe<Array<Maybe<Scalars['String']>>> = [];
  emergancyContact?: Maybe<Scalars['String']> = null;
  fileNumber?: Maybe<Scalars['String']> = null;
  grantors?: Maybe<Array<Maybe<GrantorInputBase>>> = [];
  tags?: Maybe<Array<Maybe<TagInputBase>>> = [];
  bloodType?: Maybe<Scalars['String']> = null;
  totalDigitizedData?: Maybe<Scalars['Int']> = null;
  flags?: Maybe<Array<Maybe<Scalars['String']>>> = [];
  createdOn?: Maybe<Scalars['DateTime']> = null;
  modified?: Maybe<Scalars['DateTime']> = null;
  specialities?: Maybe<SpecialityInputBase> = new SpecialityInputBase();
};

export class PatientInputBase {
  id?: Maybe<Scalars['String']> = null;
  name: Maybe<Scalars['String']> = null;
  gender: Maybe<Scalars['String']> = null;
  telephone: Maybe<Scalars['String']> = null;
  contactNumbers?: Maybe<Array<Maybe<Scalars['String']>>> = [];
  birthDate: Maybe<Scalars['DateTime']> = null;
  occupation?: Maybe<Scalars['String']> = null;
  partner?: Maybe<Scalars['String']> = null;
  country?: Maybe<Scalars['String']> = null;
  city?: Maybe<Scalars['String']> = null;
  email?: Maybe<Scalars['String']> = null;
  isDuplicate?: Maybe<Scalars['Boolean']> = null;
  identityNumber?: Maybe<Scalars['String']> = null;
  createdOn?: Maybe<Scalars['DateTime']> = null;
  modified?: Maybe<Scalars['DateTime']> = null;
  patientInfo?: Maybe<PatientInfoInputBase> = new PatientInfoInputBase();
};

export class PatientMedicationsBase {
  __typename?: 'PatientMedications';
  /** The id of the medication. */
  public medicationId?: Maybe<Scalars['String']> = null;
  /** The id of patient. */
  public patientId?: Maybe<Scalars['String']> = null;
  /** The id of the condition. */
  public conditionId?: Maybe<Scalars['String']> = null;
  /** The id of followup. */
  public followupId?: Maybe<Scalars['String']> = null;
  /** The start time of medication. */
  public startTime?: Maybe<Scalars['DateTime']> = null;
  /** The end time of medication. */
  public endTime?: Maybe<Scalars['DateTime']> = null;
  /** The drug of the appointment. */
  public drug?: Maybe<DrugViewBase> = new DrugViewBase();
  /** The status of medication. */
  public isActive?: Maybe<Scalars['Boolean']> = null;
  public reason?: Maybe<Scalars['String']> = null;
  /** The history of the appointment. */
  public history?: Maybe<Array<Maybe<PatientMedicationsHistoryBase>>> = [];
};

export class PatientMedicationsHistoryBase {
  __typename?: 'PatientMedicationsHistory';
  /** The start time of medication history. */
  public startDate?: Maybe<Scalars['DateTime']> = null;
  /** The end time of medication history. */
  public endDate?: Maybe<Scalars['DateTime']> = null;
  /** The duration of the medication. */
  public duration?: Maybe<Scalars['String']> = null;
  /** The frequency of the medication. */
  public frequency?: Maybe<Scalars['String']> = null;
  /** note of the medication. */
  public note?: Maybe<Scalars['String']> = null;
  /** The status of medication. */
  public status?: Maybe<Scalars['String']> = null;
};

export class PatientMedicationsHistoryInputBase {
  startDate?: Maybe<Scalars['DateTime']> = null;
  endDate?: Maybe<Scalars['DateTime']> = null;
  duration?: Maybe<Scalars['String']> = null;
  frequency?: Maybe<Scalars['String']> = null;
  note?: Maybe<Scalars['String']> = null;
  status?: Maybe<Scalars['String']> = null;
};

export class PatientMedicationsInputBase {
  medicationId?: Maybe<Scalars['String']> = null;
  patientId?: Maybe<Scalars['String']> = null;
  conditionId?: Maybe<Scalars['String']> = null;
  followupId?: Maybe<Scalars['String']> = null;
  drug?: Maybe<DrugViewInputBase> = new DrugViewInputBase();
  startTime?: Maybe<Scalars['DateTime']> = null;
  endTime?: Maybe<Scalars['DateTime']> = null;
  reason?: Maybe<Scalars['String']> = null;
  isActive?: Maybe<Scalars['Boolean']> = null;
  history?: Maybe<Array<Maybe<PatientMedicationsHistoryInputBase>>> = [];
};

export class PatientsMediaFilesBase {
  __typename?: 'PatientsMediaFiles';
  /** ID of patient */
  public id?: Maybe<Scalars['String']> = null;
  /** Patient name */
  public patientName?: Maybe<Scalars['String']> = null;
  /** Total patient images */
  public imagesCount?: Maybe<Scalars['Int']> = null;
  /** Total patient PDF files */
  public pdfCount?: Maybe<Scalars['Int']> = null;
  /** List of files found in patient pool */
  public pool?: Maybe<Array<Maybe<MediaFileBase>>> = [];
  /** List of files found in patient activities */
  public files?: Maybe<Array<Maybe<MediaFileBase>>> = [];
};

export class QueryBase {
  __typename?: 'Query';
  public messages?: Maybe<Array<Maybe<MessageTypeBase>>> = [];
  public getAppointmentsEvents?: Maybe<Array<Maybe<AppointmentEventTypeBase>>> = [];
  public schedule?: Maybe<ScheduleBase> = new ScheduleBase();
  public rotaAll?: Maybe<Array<Maybe<RotaBase>>> = [];
  public rota?: Maybe<RotaBase> = new RotaBase();
  public locations?: Maybe<Array<Maybe<LocationBase>>> = [];
  public location?: Maybe<LocationBase> = new LocationBase();
  public settings?: Maybe<Array<Maybe<SettingsBase>>> = [];
  public appointments?: Maybe<Array<Maybe<AppointmentBase>>> = [];
  public appointment?: Maybe<AppointmentBase> = new AppointmentBase();
  public contactsTotal?: Maybe<Scalars['Int']> = null;
  public contacts?: Maybe<Array<Maybe<ContactBase>>> = [];
  public contact?: Maybe<ContactBase> = new ContactBase();
  public patientsTotal?: Maybe<Scalars['Int']> = null;
  public patients?: Maybe<Array<Maybe<PatientBase>>> = [];
  public patient?: Maybe<PatientBase> = new PatientBase();
  public lookups?: Maybe<Array<Maybe<LookupBase>>> = [];
  public lookup?: Maybe<LookupBase> = new LookupBase();
  public lookupByText?: Maybe<LookupBase> = new LookupBase();
  public lookupByValue?: Maybe<LookupBase> = new LookupBase();
  public lookupsByGroup?: Maybe<Array<Maybe<LookupBase>>> = [];
  public lookupsByGroupTotal?: Maybe<Scalars['Int']> = null;
  public lookupsByGroups?: Maybe<Array<Maybe<LookupBase>>> = [];
  public conditions?: Maybe<Array<Maybe<ConditionBase>>> = [];
  public grantorsTotal?: Maybe<Scalars['Int']> = null;
  public grantors?: Maybe<Array<Maybe<GrantorBase>>> = [];
  public grantor?: Maybe<GrantorBase> = new GrantorBase();
  public todosTotal?: Maybe<Scalars['Int']> = null;
  public todos?: Maybe<Array<Maybe<TodoBase>>> = [];
  public todo?: Maybe<TodoBase> = new TodoBase();
  public tagsTotal?: Maybe<Scalars['Int']> = null;
  public tags?: Maybe<Array<Maybe<TagBase>>> = [];
  public tag?: Maybe<TagBase> = new TagBase();
  public drugs?: Maybe<Array<Maybe<DrugBase>>> = [];
  public drug?: Maybe<DrugBase> = new DrugBase();
  public patientsMediaFiles?: Maybe<Array<Maybe<PatientsMediaFilesBase>>> = [];
  public tenantPoolMediaFiles?: Maybe<Array<Maybe<MediaFileBase>>> = [];
  /** Get media files by patient id */
  public patientMediaFiles?: Maybe<Array<Maybe<MediaFileBase>>> = [];
  public patientMediaFilesTotal?: Maybe<Scalars['Int']> = null;
  /** Get patient pool media files by patient id */
  public patientMediaPoolFiles?: Maybe<Array<Maybe<MediaFileBase>>> = [];
  /** Get media files by activity */
  public activityMediaFiles?: Maybe<Array<Maybe<MediaFileBase>>> = [];
  public mediaFiles?: Maybe<Array<Maybe<MediaFileBase>>> = [];
  public mediaFile?: Maybe<MediaFileBase> = new MediaFileBase();
  public trashedMediaFiles?: Maybe<Array<Maybe<MediaFileBase>>> = [];
  public ticketMediaFiles?: Maybe<Array<Maybe<MediaFileBase>>> = [];
  public patientMedications?: Maybe<Array<Maybe<PatientMedicationsBase>>> = [];
  public patientMedication?: Maybe<Array<Maybe<PatientMedicationsBase>>> = [];
  public patientMedicationByCondition?: Maybe<Array<Maybe<PatientMedicationsBase>>> = [];
  public patientMedicationByFollowup?: Maybe<Array<Maybe<PatientMedicationsBase>>> = [];
  public tickets?: Maybe<PageResultTicketBase> = new PageResultTicketBase();
  public allTickets?: Maybe<PageResultTicketBase> = new PageResultTicketBase();
  public ticket?: Maybe<TicketBase> = new TicketBase();
  public ticketTenant?: Maybe<Scalars['String']> = null;
};


export type QueryRotaArgsBase = {
  id: Scalars['String'];
};


export type QueryLocationArgsBase = {
  id: Scalars['String'];
};


export type QueryAppointmentsArgsBase = {
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  sortBy?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  descending?: Maybe<Scalars['Boolean']>;
};


export type QueryAppointmentArgsBase = {
  id: Scalars['String'];
};


export type QueryContactsTotalArgsBase = {
  sortBy?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  descending?: Maybe<Scalars['Boolean']>;
};


export type QueryContactsArgsBase = {
  sortBy?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  descending?: Maybe<Scalars['Boolean']>;
};


export type QueryContactArgsBase = {
  id: Scalars['String'];
};


export type QueryPatientsTotalArgsBase = {
  sortBy?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  descending?: Maybe<Scalars['Boolean']>;
};


export type QueryPatientsArgsBase = {
  sortBy?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  descending?: Maybe<Scalars['Boolean']>;
};


export type QueryPatientArgsBase = {
  id: Scalars['String'];
};


export type QueryLookupArgsBase = {
  id: Scalars['String'];
};


export type QueryLookupByTextArgsBase = {
  text: Scalars['String'];
  group: Scalars['String'];
};


export type QueryLookupByValueArgsBase = {
  value: Scalars['String'];
  group: Scalars['String'];
};


export type QueryLookupsByGroupArgsBase = {
  group: Scalars['String'];
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filterPredefined?: Maybe<Scalars['Boolean']>;
};


export type QueryLookupsByGroupTotalArgsBase = {
  group: Scalars['String'];
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filterPredefined?: Maybe<Scalars['Boolean']>;
};


export type QueryLookupsByGroupsArgsBase = {
  groups: Array<Maybe<Scalars['String']>>;
  filterPredefined?: Maybe<Scalars['Boolean']>;
};


export type QueryGrantorsTotalArgsBase = {
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
};


export type QueryGrantorsArgsBase = {
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
};


export type QueryGrantorArgsBase = {
  id: Scalars['String'];
};


export type QueryTodosTotalArgsBase = {
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  patientId?: Maybe<Scalars['String']>;
};


export type QueryTodosArgsBase = {
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  patientId?: Maybe<Scalars['String']>;
};


export type QueryTodoArgsBase = {
  id: Scalars['String'];
};


export type QueryTagsTotalArgsBase = {
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
};


export type QueryTagsArgsBase = {
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
};


export type QueryTagArgsBase = {
  id: Scalars['String'];
};


export type QueryDrugsArgsBase = {
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
};


export type QueryDrugArgsBase = {
  id: Scalars['String'];
};


export type QueryPatientsMediaFilesArgsBase = {
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  patientId?: Maybe<Scalars['String']>;
};


export type QueryTenantPoolMediaFilesArgsBase = {
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
};


export type QueryPatientMediaFilesArgsBase = {
  patientId: Scalars['String'];
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
};


export type QueryPatientMediaFilesTotalArgsBase = {
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  patientId?: Maybe<Scalars['String']>;
};


export type QueryPatientMediaPoolFilesArgsBase = {
  patientId: Scalars['String'];
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
};


export type QueryActivityMediaFilesArgsBase = {
  patientId: Scalars['String'];
  speciality?: Maybe<Scalars['String']>;
  conditionId?: Maybe<Scalars['String']>;
  activitType?: Maybe<Scalars['String']>;
  activityId?: Maybe<Scalars['String']>;
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
};


export type QueryMediaFileArgsBase = {
  id: Scalars['String'];
};


export type QueryTicketMediaFilesArgsBase = {
  text: Scalars['String'];
  ticketNumber: Scalars['String'];
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
};


export type QueryPatientMedicationsArgsBase = {
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  sortBy?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  descending?: Maybe<Scalars['Boolean']>;
};


export type QueryPatientMedicationArgsBase = {
  patientId: Scalars['String'];
};


export type QueryPatientMedicationByConditionArgsBase = {
  patientId: Scalars['String'];
  conditionId?: Maybe<Scalars['String']>;
};


export type QueryPatientMedicationByFollowupArgsBase = {
  patientId: Scalars['String'];
  followupId?: Maybe<Scalars['String']>;
};


export type QueryTicketsArgsBase = {
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  descending?: Maybe<Scalars['Boolean']>;
  sortBy?: Maybe<Scalars['String']>;
};


export type QueryAllTicketsArgsBase = {
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  descending?: Maybe<Scalars['Boolean']>;
  sortBy?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};


export type QueryTicketArgsBase = {
  id: Scalars['String'];
};


export type QueryTicketTenantArgsBase = {
  id: Scalars['String'];
};

export class RecurrenceBase {
  __typename?: 'Recurrence';
  /** The startTime of the recurrence. */
  public startTime?: Maybe<Scalars['DateTime']> = null;
  /** The endTime of the recurrence. */
  public endTime?: Maybe<Scalars['DateTime']> = null;
  /** The rule of the recurrence. */
  public rule?: Maybe<Scalars['String']> = null;
};

export class RecurrenceInputBase {
  startTime?: Maybe<Scalars['DateTime']> = null;
  endTime?: Maybe<Scalars['DateTime']> = null;
  rule?: Maybe<Scalars['String']> = null;
};

export class RotaBase {
  __typename?: 'Rota';
  /** The id of the rota. */
  public id?: Maybe<Scalars['String']> = null;
  /** The name of the rota. */
  public name?: Maybe<Scalars['String']> = null;
  /** The sign color to rota. */
  public color?: Maybe<Scalars['String']> = null;
  /** The location associated with the rota. */
  public location?: Maybe<LocationViewTypeBase> = new LocationViewTypeBase();
  /** The list of recurrence rules associated with the rota. */
  public recurrence?: Maybe<Array<Maybe<RecurrenceBase>>> = [];
};

export class RotaInputBase {
  id?: Maybe<Scalars['String']> = null;
  name?: Maybe<Scalars['String']> = null;
  color?: Maybe<Scalars['String']> = null;
  location?: Maybe<LocationViewInputTypeBase> = new LocationViewInputTypeBase();
  recurrence?: Maybe<Array<Maybe<RecurrenceInputBase>>> = [];
};

export class ScheduleBase {
  __typename?: 'Schedule';
  /** The id of the schedule. */
  public id?: Maybe<Scalars['String']> = null;
  /** The startHour of the schedule. */
  public startHour?: Maybe<Scalars['String']> = null;
  /** The startHour of the schedule. */
  public endHour?: Maybe<Scalars['String']> = null;
  /** Whether to mark rota on schedule cells or not. */
  public displayRota?: Maybe<Scalars['Boolean']> = null;
};

export class ScheduleInputBase {
  id?: Maybe<Scalars['String']> = null;
  startHour?: Maybe<Scalars['String']> = null;
  endHour?: Maybe<Scalars['String']> = null;
  displayRota?: Maybe<Scalars['Boolean']> = null;
};

export class SettingsBase {
  __typename?: 'Settings';
  /** The id. */
  public id?: Maybe<Scalars['String']> = null;
  /** The assigned specialties to a tenant. */
  public specialties?: Maybe<Array<Maybe<Scalars['String']>>> = [];
};

export class SettingsInputBase {
  id?: Maybe<Scalars['String']> = null;
  specialties?: Maybe<Array<Maybe<Scalars['String']>>> = [];
};

export class SpecialityBase {
  __typename?: 'Speciality';
  public general?: Maybe<GeneralBase> = new GeneralBase();
  public cardiology?: Maybe<CardiologyBase> = new CardiologyBase();
};

export class SpecialityInputBase {
  general?: Maybe<GeneralInputBase> = new GeneralInputBase();
  cardiology?: Maybe<CardiologyInputBase> = new CardiologyInputBase();
};

export class SubscriptionBase {
  __typename?: 'Subscription';
  public messageAdded?: Maybe<MessageTypeBase> = new MessageTypeBase();
  public messageAddedByUser?: Maybe<MessageTypeBase> = new MessageTypeBase();
  public appointmentEvent?: Maybe<AppointmentEventTypeBase> = new AppointmentEventTypeBase();
  public ticketEvent?: Maybe<TicketEventTypeBase> = new TicketEventTypeBase();
  public ticketEventAdmin?: Maybe<TicketEventTypeBase> = new TicketEventTypeBase();
};


export type SubscriptionMessageAddedByUserArgsBase = {
  id: Scalars['String'];
};


export type SubscriptionAppointmentEventArgsBase = {
  tenantId: Scalars['String'];
  userId: Scalars['String'];
};


export type SubscriptionTicketEventArgsBase = {
  tenantId: Scalars['String'];
  userId: Scalars['String'];
};

export class SurgicalHistoryBase {
  __typename?: 'SurgicalHistory';
  public note?: Maybe<Scalars['String']> = null;
  public what?: Maybe<Scalars['String']> = null;
  public when?: Maybe<Scalars['DateTime']> = null;
};

export class SurgicalHistoryInputBase {
  what?: Maybe<Scalars['String']> = null;
  when?: Maybe<Scalars['DateTime']> = null;
  note?: Maybe<Scalars['String']> = null;
};

export class TagBase {
  __typename?: 'Tag';
  /** Id of the Tags */
  public id?: Maybe<Scalars['String']> = null;
  /** Name of the Tags */
  public name?: Maybe<Scalars['String']> = null;
  /** Group of the Tags */
  public group?: Maybe<Scalars['String']> = null;
};

export class TagInputBase {
  id?: Maybe<Scalars['String']> = null;
  name: Maybe<Scalars['String']> = null;
  group: Maybe<Scalars['String']> = null;
};

export class TicketBase {
  __typename?: 'Ticket';
  /** Id of the Ticket */
  public id?: Maybe<Scalars['String']> = null;
  /** Ticket number of the Ticket */
  public ticketNumber?: Maybe<Scalars['String']> = null;
  /** tenantName of the Ticket */
  public tenantName?: Maybe<Scalars['String']> = null;
  /** Subject of the Ticket */
  public subject?: Maybe<Scalars['String']> = null;
  /** Details of the Ticket */
  public details?: Maybe<Scalars['String']> = null;
  /** Status of the Ticket */
  public status?: Maybe<Scalars['Int']> = null;
  /** Attached File of the Ticket */
  public attachFile?: Maybe<Scalars['Boolean']> = null;
  /** Admin read the ticket */
  public isReadByAdmin?: Maybe<Scalars['Boolean']> = null;
  /** Client read the ticket */
  public isReadByClient?: Maybe<Scalars['Boolean']> = null;
  /** date of replay message */
  public ticketDate?: Maybe<Scalars['DateTime']> = null;
  public messages?: Maybe<Array<Maybe<TicketMessagesBase>>> = [];
};

export class TicketEventTypeBase {
  __typename?: 'TicketEventType';
  public content?: Maybe<TicketBase> = new TicketBase();
  public event?: Maybe<Scalars['String']> = null;
  public sentAt?: Maybe<Scalars['DateTime']> = null;
  public sub?: Maybe<Scalars['String']> = null;
  public from?: Maybe<EventFromTypeBase> = new EventFromTypeBase();
};

export class TicketInputBase {
  id?: Maybe<Scalars['String']> = null;
  ticketNumber?: Maybe<Scalars['String']> = null;
  tenantName?: Maybe<Scalars['String']> = null;
  subject?: Maybe<Scalars['String']> = null;
  details?: Maybe<Scalars['String']> = null;
  attachFile?: Maybe<Scalars['Boolean']> = null;
  isReadByAdmin?: Maybe<Scalars['Boolean']> = null;
  isReadByClient?: Maybe<Scalars['Boolean']> = null;
  status?: Maybe<Scalars['Int']> = null;
  ticketDate?: Maybe<Scalars['DateTime']> = null;
  messages?: Maybe<Array<Maybe<TicketMessagesInputBase>>> = [];
};

export class TicketMessagesBase {
  __typename?: 'TicketMessages';
  /** Message content */
  public message?: Maybe<Scalars['String']> = null;
  /** name of the requester */
  public requestBy?: Maybe<Scalars['String']> = null;
  /** date of replay message */
  public messageDate?: Maybe<Scalars['DateTime']> = null;
};

export class TicketMessagesInputBase {
  message?: Maybe<Scalars['String']> = null;
  requestBy?: Maybe<Scalars['String']> = null;
  messageDate?: Maybe<Scalars['DateTime']> = null;
};

export class TodoBase {
  __typename?: 'Todo';
  /** Id of the Todos */
  public id?: Maybe<Scalars['String']> = null;
  /** Title of the Todos */
  public title?: Maybe<Scalars['String']> = null;
  /** Notes of the Todos */
  public notes?: Maybe<Scalars['String']> = null;
  /** Start Date of the Todos */
  public startDate?: Maybe<Scalars['DateTime']> = null;
  /** Due Date of the Todos */
  public dueDate?: Maybe<Scalars['DateTime']> = null;
  /** Completed of the Todos */
  public isCompleted?: Maybe<Scalars['Boolean']> = null;
  /** Starred of the Todos */
  public isStarred?: Maybe<Scalars['Boolean']> = null;
  /** Important of the Todos */
  public isImportant?: Maybe<Scalars['Boolean']> = null;
  /** Patient Id of the Todos */
  public patientId?: Maybe<Scalars['String']> = null;
};

export class TodoInputBase {
  id?: Maybe<Scalars['String']> = null;
  title: Maybe<Scalars['String']> = null;
  notes?: Maybe<Scalars['String']> = null;
  startDate?: Maybe<Scalars['DateTime']> = null;
  dueDate?: Maybe<Scalars['DateTime']> = null;
  isCompleted?: Maybe<Scalars['Boolean']> = null;
  isStarred?: Maybe<Scalars['Boolean']> = null;
  isImportant?: Maybe<Scalars['Boolean']> = null;
  patientId?: Maybe<Scalars['String']> = null;
};
