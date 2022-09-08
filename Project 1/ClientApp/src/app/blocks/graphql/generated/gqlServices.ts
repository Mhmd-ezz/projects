import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
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



export type Appointment = {
  __typename?: 'Appointment';
  /** The id of the appointment. */
  id?: Maybe<Scalars['String']>;
  /** The title of appointment. */
  subject?: Maybe<Scalars['String']>;
  /** The start time of appointment. */
  startTime?: Maybe<Scalars['DateTime']>;
  /** The end time of appointment. */
  endTime?: Maybe<Scalars['DateTime']>;
  /** The reason of appointment. */
  reason?: Maybe<Scalars['String']>;
  /** The color of appointment.  Ex: '#fff'  */
  color?: Maybe<Scalars['String']>;
  /** Any related notes. */
  note?: Maybe<Scalars['String']>;
  conditionId?: Maybe<Scalars['String']>;
  speciality?: Maybe<Scalars['String']>;
  recurrenceId?: Maybe<Scalars['String']>;
  recurrenceException?: Maybe<Scalars['String']>;
  recurrenceRule?: Maybe<Scalars['String']>;
  /** If reservations are blocked due to time range. */
  isBlock?: Maybe<Scalars['Boolean']>;
  /** Is appointment readonly? */
  isReadonly?: Maybe<Scalars['Boolean']>;
  /** If appointment is all day event. */
  isAllDay?: Maybe<Scalars['Boolean']>;
  /** The type of appointment. */
  type?: Maybe<Scalars['String']>;
  /** The status of appointment. */
  status?: Maybe<Scalars['String']>;
  /** The location associated with the appointment. */
  location?: Maybe<LocationViewType>;
  /** The contact associated with the appointment. */
  contact?: Maybe<Contact>;
};

export type AppointmentEventType = {
  __typename?: 'AppointmentEventType';
  content?: Maybe<Appointment>;
  event?: Maybe<Scalars['String']>;
  sentAt?: Maybe<Scalars['DateTime']>;
  sub?: Maybe<Scalars['String']>;
  from?: Maybe<EventFromType>;
};

export type AppointmentInput = {
  id?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  reason?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  isBlock?: Maybe<Scalars['Boolean']>;
  isReadonly?: Maybe<Scalars['Boolean']>;
  isAllDay?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
  conditionId?: Maybe<Scalars['String']>;
  speciality?: Maybe<Scalars['String']>;
  recurrenceRule?: Maybe<Scalars['String']>;
  recurrenceId?: Maybe<Scalars['String']>;
  recurrenceException?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  contact?: Maybe<ContactInput>;
  location?: Maybe<LocationViewInputType>;
};

export type Cardiology = {
  __typename?: 'Cardiology';
  conditions?: Maybe<Array<Maybe<CardiologyCondition>>>;
  medicalHistory?: Maybe<CardiologyMedicalHistory>;
};

export type CardiologyActivities = {
  __typename?: 'CardiologyActivities';
  followups?: Maybe<Array<Maybe<CardiologyFollowup>>>;
  operations?: Maybe<Array<Maybe<CardiologyOperation>>>;
};

export type CardiologyActivitiesInput = {
  followups?: Maybe<Array<Maybe<CardiologyFollowupInput>>>;
  operations?: Maybe<Array<Maybe<CardiologyOperationInput>>>;
};

export type CardiologyClinicalExamination = {
  __typename?: 'CardiologyClinicalExamination';
  /** The examined Bp. */
  bp?: Maybe<Scalars['String']>;
  /** The examined Hr. */
  hr?: Maybe<Scalars['String']>;
  /** The examined Pulse. */
  pulse?: Maybe<Scalars['String']>;
  /** The Classification of examined Pulse. */
  pulseClassification?: Maybe<Scalars['String']>;
  /** The examined Sound of Cardiac Ausculation. */
  sound?: Maybe<Scalars['String']>;
  /** The examined value of Cardiac Ausculation. */
  value?: Maybe<Scalars['String']>;
  /** The examined Intensity. */
  intensity?: Maybe<Scalars['String']>;
  /** The examined Pericardial Friction. */
  pericardialFriction?: Maybe<Scalars['Boolean']>;
  /** The examined Lung Auscultation. */
  lungAuscultation?: Maybe<Scalars['String']>;
  /** The examined Extremities Aspect. */
  aspect?: Maybe<Scalars['String']>;
  /** The examined Extremities Puls. */
  puls?: Maybe<Scalars['Boolean']>;
  rightSuperior?: Maybe<Scalars['Boolean']>;
  rightTransverse?: Maybe<Scalars['Boolean']>;
  rightInferior?: Maybe<Scalars['Boolean']>;
  leftSuperior?: Maybe<Scalars['Boolean']>;
  leftTransverse?: Maybe<Scalars['Boolean']>;
  leftInferior?: Maybe<Scalars['Boolean']>;
  /** The examined Neck Hepato Jugular Reflux. */
  hepatoJugularReflux?: Maybe<Scalars['Boolean']>;
  /** The examined Neck Carotid Murmur. */
  neckCarotidMurmur?: Maybe<Scalars['String']>;
  /** The examined Abdomen Soft. */
  soft?: Maybe<Scalars['Boolean']>;
  /** The examined Abdomen Tender. */
  tender?: Maybe<Scalars['String']>;
  /** The examined Abdomen Hepatomegaly. */
  hepatomegaly?: Maybe<Scalars['Boolean']>;
  /** The examined Abdomen Ascites. */
  ascites?: Maybe<Scalars['Boolean']>;
};

export type CardiologyClinicalExaminationInput = {
  bp?: Maybe<Scalars['String']>;
  hr?: Maybe<Scalars['String']>;
  pulse?: Maybe<Scalars['String']>;
  pulseClassification?: Maybe<Scalars['String']>;
  sound?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  intensity?: Maybe<Scalars['String']>;
  pericardialFriction?: Maybe<Scalars['Boolean']>;
  lungAuscultation?: Maybe<Scalars['String']>;
  aspect?: Maybe<Scalars['String']>;
  puls?: Maybe<Scalars['Boolean']>;
  rightSuperior?: Maybe<Scalars['Boolean']>;
  rightInferior?: Maybe<Scalars['Boolean']>;
  rightTransverse?: Maybe<Scalars['Boolean']>;
  leftTransverse?: Maybe<Scalars['Boolean']>;
  leftSuperior?: Maybe<Scalars['Boolean']>;
  leftInferior?: Maybe<Scalars['Boolean']>;
  hepatoJugularReflux?: Maybe<Scalars['Boolean']>;
  neckCarotidMurmur?: Maybe<Scalars['String']>;
  soft?: Maybe<Scalars['Boolean']>;
  tender?: Maybe<Scalars['String']>;
  hepatomegaly?: Maybe<Scalars['Boolean']>;
  ascites?: Maybe<Scalars['Boolean']>;
};

export type CardiologyCondition = {
  __typename?: 'CardiologyCondition';
  /** The id of the Condition. */
  id?: Maybe<Scalars['String']>;
  /** The name of the Condition. */
  name?: Maybe<Scalars['String']>;
  /** The type of the Condition. */
  type?: Maybe<Scalars['String']>;
  /** The status of the Condition. */
  status?: Maybe<Scalars['String']>;
  /** The sub-location that inherets from location. */
  subLocation?: Maybe<Scalars['String']>;
  /** The opening date of the Condition. */
  opened?: Maybe<Scalars['DateTime']>;
  /** The closing date of the Condition. */
  closed?: Maybe<Scalars['DateTime']>;
  location?: Maybe<LocationViewType>;
  /** The list of Cheif Complaint of the Condition. */
  cheifComplaint?: Maybe<DataPartition>;
  /** The list of Present History of the Condition. */
  presentHistory?: Maybe<DataPartition>;
  /** The list of Diagnosis of the Condition. */
  diagnosis?: Maybe<DataPartition>;
  /** The list of Differential Diagnosis of the Condition. */
  differentialDiagnosis?: Maybe<DataPartition>;
  /** The list of Consultations of the Condition. */
  consultation?: Maybe<DataPartition>;
  /** The list of OtherTreatments of the Condition. */
  otherTreatments?: Maybe<DataPartition>;
  /** The list of physical exam of the Condition. */
  physicalExam?: Maybe<DataPartition>;
  /** The list of Laboratory test of the Condition. */
  laboratory?: Maybe<DataPartition>;
  /** The list of Radio of the Condition. */
  radio?: Maybe<DataPartition>;
  /** The list of notes of the Condition. */
  note?: Maybe<DataPartition>;
  /** A remark to identify if a condition is duplicated. */
  isDuplicate?: Maybe<Scalars['Boolean']>;
  /** The show/hide status of the condition. */
  isHidden?: Maybe<Scalars['Boolean']>;
  medications?: Maybe<Array<Maybe<Medication>>>;
  activities?: Maybe<CardiologyActivities>;
  height?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
  bmi?: Maybe<Scalars['Float']>;
  cardiologyClinicalExamination?: Maybe<CardiologyClinicalExamination>;
};

export type CardiologyConditionInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  subLocation?: Maybe<Scalars['String']>;
  opened?: Maybe<Scalars['DateTime']>;
  closed?: Maybe<Scalars['DateTime']>;
  location?: Maybe<LocationViewInputType>;
  cheifComplaint?: Maybe<DataPartitionInput>;
  presentHistory?: Maybe<DataPartitionInput>;
  diagnosis?: Maybe<DataPartitionInput>;
  differentialDiagnosis?: Maybe<DataPartitionInput>;
  consultation?: Maybe<DataPartitionInput>;
  otherTreatments?: Maybe<DataPartitionInput>;
  physicalExam?: Maybe<DataPartitionInput>;
  laboratory?: Maybe<DataPartitionInput>;
  radio?: Maybe<DataPartitionInput>;
  note?: Maybe<DataPartitionInput>;
  activities?: Maybe<CardiologyActivitiesInput>;
  isDuplicate?: Maybe<Scalars['Boolean']>;
  medications?: Maybe<Array<Maybe<MedicationInput>>>;
  isHidden?: Maybe<Scalars['Boolean']>;
  height?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
  bmi?: Maybe<Scalars['Float']>;
  cardiologyClinicalExamination?: Maybe<CardiologyClinicalExaminationInput>;
};

export type CardiologyFollowup = {
  __typename?: 'CardiologyFollowup';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  /** The sub-location that inherets from location. */
  subLocation?: Maybe<Scalars['String']>;
  /** A remark to identify if a followup is duplicated. */
  isDuplicate?: Maybe<Scalars['Boolean']>;
  opened?: Maybe<Scalars['DateTime']>;
  closed?: Maybe<Scalars['DateTime']>;
  location?: Maybe<LocationViewType>;
  subjective?: Maybe<DataPartition>;
  diagnosis?: Maybe<DataPartition>;
  medication?: Maybe<DataPartition>;
  otherTreatments?: Maybe<DataPartition>;
  assessment?: Maybe<DataPartition>;
  consultation?: Maybe<DataPartition>;
  physicalExam?: Maybe<DataPartition>;
  laboratory?: Maybe<DataPartition>;
  note?: Maybe<DataPartition>;
  radio?: Maybe<DataPartition>;
  /** The show/hide status of the condition. */
  isHidden?: Maybe<Scalars['Boolean']>;
  medications?: Maybe<Array<Maybe<Medication>>>;
  cardiologyClinicalExamination?: Maybe<CardiologyClinicalExamination>;
};

export type CardiologyFollowupInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  subLocation?: Maybe<Scalars['String']>;
  opened?: Maybe<Scalars['DateTime']>;
  closed?: Maybe<Scalars['DateTime']>;
  location?: Maybe<LocationViewInputType>;
  subjective?: Maybe<DataPartitionInput>;
  medication?: Maybe<DataPartitionInput>;
  otherTreatments?: Maybe<DataPartitionInput>;
  assessment?: Maybe<DataPartitionInput>;
  consultation?: Maybe<DataPartitionInput>;
  physicalExam?: Maybe<DataPartitionInput>;
  laboratory?: Maybe<DataPartitionInput>;
  radio?: Maybe<DataPartitionInput>;
  note?: Maybe<DataPartitionInput>;
  diagnosis?: Maybe<DataPartitionInput>;
  isDuplicate?: Maybe<Scalars['Boolean']>;
  isHidden?: Maybe<Scalars['Boolean']>;
  medications?: Maybe<Array<Maybe<MedicationInput>>>;
  cardiologyClinicalExamination?: Maybe<CardiologyClinicalExaminationInput>;
};

export type CardiologyInput = {
  conditions?: Maybe<Array<Maybe<CardiologyConditionInput>>>;
  medicalHistory?: Maybe<CardiologyMedicalHistoryInput>;
};

export type CardiologyMedicalHistory = {
  __typename?: 'CardiologyMedicalHistory';
  /** Alerts */
  alerts?: Maybe<MedicalHistoryAlert>;
  allergies?: Maybe<MedicalHistoryAlert>;
  familyHistory?: Maybe<MedicalHistoryAlert>;
  medicalIssues?: Maybe<MedicalHistoryAlert>;
  cardioVascular?: Maybe<MedicalHistoryAlert>;
  gi?: Maybe<MedicalHistoryAlert>;
  endocrinology?: Maybe<MedicalHistoryAlert>;
  lungDiseases?: Maybe<MedicalHistoryAlert>;
  neurology?: Maybe<MedicalHistoryAlert>;
  physiomaticDisorder?: Maybe<MedicalHistoryAlert>;
  riskFactors?: Maybe<MedicalHistoryAlert>;
  pastMedication?: Maybe<MedicalHistoryMedication>;
  presentMedication?: Maybe<MedicalHistoryMedication>;
  surgicalHistory?: Maybe<CardiologyMedicalHistorySurgery>;
};

export type CardiologyMedicalHistoryInput = {
  alerts?: Maybe<MedicalHistoryAlertInput>;
  allergies?: Maybe<MedicalHistoryAlertInput>;
  familyHistory?: Maybe<MedicalHistoryAlertInput>;
  medicalIssues?: Maybe<MedicalHistoryAlertInput>;
  cardioVascular?: Maybe<MedicalHistoryAlertInput>;
  gi?: Maybe<MedicalHistoryAlertInput>;
  endocrinology?: Maybe<MedicalHistoryAlertInput>;
  lungDiseases?: Maybe<MedicalHistoryAlertInput>;
  neurology?: Maybe<MedicalHistoryAlertInput>;
  physiomaticDisorder?: Maybe<MedicalHistoryAlertInput>;
  riskFactors?: Maybe<MedicalHistoryAlertInput>;
  pastMedication?: Maybe<MedicalHistoryMedicationInput>;
  presentMedication?: Maybe<MedicalHistoryMedicationInput>;
  surgicalHistory?: Maybe<CardiologyMedicalHistorySurgeryInput>;
};

export type CardiologyMedicalHistorySurgery = {
  __typename?: 'CardiologyMedicalHistorySurgery';
  alert?: Maybe<Scalars['Boolean']>;
  lastUpdate?: Maybe<Scalars['DateTime']>;
  data?: Maybe<Array<Maybe<CardiologySurgicalHistory>>>;
};

export type CardiologyMedicalHistorySurgeryInput = {
  alert?: Maybe<Scalars['Boolean']>;
  lastUpdate?: Maybe<Scalars['DateTime']>;
  data?: Maybe<Array<Maybe<CardiologySurgicalHistoryInput>>>;
};

export type CardiologyOperation = {
  __typename?: 'CardiologyOperation';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  /** The sub-location that inherets from location. */
  subLocation?: Maybe<Scalars['String']>;
  /** A remark to identify if a operation is duplicated. */
  isDuplicate?: Maybe<Scalars['Boolean']>;
  opened?: Maybe<Scalars['DateTime']>;
  closed?: Maybe<Scalars['DateTime']>;
  location?: Maybe<LocationViewType>;
  department?: Maybe<Scalars['String']>;
  anesthesia?: Maybe<DataPartition>;
  code?: Maybe<Array<Maybe<Scalars['String']>>>;
  operationType?: Maybe<DataPartition>;
  operationPerformed?: Maybe<DataPartition>;
  operationDiagnosis?: Maybe<DataPartition>;
  operationPostDiagnosis?: Maybe<DataPartition>;
  operationPreFindings?: Maybe<DataPartition>;
  operationCategory?: Maybe<DataPartition>;
  physicalExam?: Maybe<DataPartition>;
  surgeons?: Maybe<DataPartition>;
  operationDetails?: Maybe<Scalars['String']>;
};

export type CardiologyOperationInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  subLocation?: Maybe<Scalars['String']>;
  opened?: Maybe<Scalars['DateTime']>;
  closed?: Maybe<Scalars['DateTime']>;
  location?: Maybe<LocationViewInputType>;
  department?: Maybe<Scalars['String']>;
  anesthesia?: Maybe<DataPartitionInput>;
  code?: Maybe<Array<Maybe<Scalars['String']>>>;
  operationType?: Maybe<DataPartitionInput>;
  operationPerformed?: Maybe<DataPartitionInput>;
  operationDiagnosis?: Maybe<DataPartitionInput>;
  operationPostDiagnosis?: Maybe<DataPartitionInput>;
  operationPreFindings?: Maybe<DataPartitionInput>;
  operationCategory?: Maybe<DataPartitionInput>;
  physicalExam?: Maybe<DataPartitionInput>;
  surgeons?: Maybe<DataPartitionInput>;
  operationDetails?: Maybe<Scalars['String']>;
  isDuplicate?: Maybe<Scalars['Boolean']>;
};

export type CardiologySurgicalHistory = {
  __typename?: 'CardiologySurgicalHistory';
  note?: Maybe<Scalars['String']>;
  what?: Maybe<Array<Maybe<LookupView>>>;
  type?: Maybe<Scalars['String']>;
  when?: Maybe<Scalars['DateTime']>;
};

export type CardiologySurgicalHistoryInput = {
  type?: Maybe<Scalars['String']>;
  what?: Maybe<Array<Maybe<LookupViewModelInput>>>;
  when?: Maybe<Scalars['DateTime']>;
  note?: Maybe<Scalars['String']>;
};

export type Condition = {
  __typename?: 'Condition';
  /** The name of the Condition. */
  name?: Maybe<Scalars['String']>;
  /** The type of the Condition. */
  type?: Maybe<Scalars['String']>;
  /** The closing date of the Condition. */
  closed?: Maybe<Scalars['DateTime']>;
  /** The opening date of the Condition. */
  opened?: Maybe<Scalars['DateTime']>;
  /** The status of the Condition. */
  status?: Maybe<Scalars['DateTime']>;
};

export type Contact = {
  __typename?: 'Contact';
  /** The id of the patient. */
  id?: Maybe<Scalars['String']>;
  /** A remark to identify if a contact is duplicated. */
  isDuplicate?: Maybe<Scalars['Boolean']>;
  /** The name of the contact. */
  name?: Maybe<Scalars['String']>;
  /** The sex of the patient. */
  gender?: Maybe<Scalars['String']>;
  /** Telphone number of the patient. */
  telephone?: Maybe<Scalars['String']>;
  /** Contact Numbers of the patient. */
  contactNumbers?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The birthdate of the patient. */
  birthDate?: Maybe<Scalars['DateTime']>;
  /** The Occupation of the patient. */
  occupation?: Maybe<Scalars['String']>;
  /** The Partner of the patient. */
  partner?: Maybe<Scalars['String']>;
  /** The name of the patient. */
  country?: Maybe<Scalars['String']>;
  /** The city of the patient. */
  city?: Maybe<Scalars['String']>;
  /** The identity number (Identity card or passport) of the patient. */
  identityNumber?: Maybe<Scalars['String']>;
  /** The Country of the patient. */
  email?: Maybe<Scalars['String']>;
  /** Creation Date. */
  createdOn?: Maybe<Scalars['DateTime']>;
  /** Modified Date. */
  modified?: Maybe<Scalars['DateTime']>;
  /** Contact type. */
  contactType?: Maybe<Scalars['String']>;
};

export type ContactInput = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  telephone: Scalars['String'];
  contactNumbers?: Maybe<Array<Maybe<Scalars['String']>>>;
  gender?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['DateTime']>;
  occupation?: Maybe<Scalars['String']>;
  partner?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  identityNumber?: Maybe<Scalars['String']>;
  createdOn?: Maybe<Scalars['DateTime']>;
  modified?: Maybe<Scalars['DateTime']>;
  contactType?: Maybe<Scalars['String']>;
  isDuplicate?: Maybe<Scalars['Boolean']>;
};

export type DataPartition = {
  __typename?: 'DataPartition';
  /** Text */
  text?: Maybe<Array<Maybe<LookupView>>>;
  /** Media */
  media?: Maybe<Array<Maybe<MediaPartition>>>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type DataPartitionInput = {
  text?: Maybe<Array<Maybe<LookupViewModelInput>>>;
  media?: Maybe<Array<Maybe<MediaPartitionInput>>>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};



export type Drug = {
  __typename?: 'Drug';
  id?: Maybe<Scalars['String']>;
  atcCode?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  dosage?: Maybe<Scalars['String']>;
  form?: Maybe<Scalars['String']>;
};

export type DrugInput = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  dosage?: Maybe<Scalars['String']>;
  atcCode?: Maybe<Scalars['String']>;
  form?: Maybe<Scalars['String']>;
  route?: Maybe<Scalars['String']>;
};

export type DrugView = {
  __typename?: 'DrugView';
  /** The id of the drug. */
  id?: Maybe<Scalars['String']>;
  /** The name of the drug. */
  name?: Maybe<Scalars['String']>;
  /** Drug Dosage Ex :20mg or 20mg/10ml. */
  dosage?: Maybe<Scalars['String']>;
};

export type DrugViewInput = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  dosage?: Maybe<Scalars['String']>;
};

export type EventFromType = {
  __typename?: 'EventFromType';
  id: Scalars['String'];
  displayName: Scalars['String'];
};

export type General = {
  __typename?: 'General';
  conditions?: Maybe<Array<Maybe<GeneralCondition>>>;
  medicalHistory?: Maybe<GeneralMedicalHistory>;
};

export type GeneralActivities = {
  __typename?: 'GeneralActivities';
  followups?: Maybe<Array<Maybe<GeneralFollowup>>>;
  operations?: Maybe<Array<Maybe<GeneralOperation>>>;
};

export type GeneralActivitiesInput = {
  followups?: Maybe<Array<Maybe<GeneralFollowupInput>>>;
  operations?: Maybe<Array<Maybe<GeneralOperationInput>>>;
};

export type GeneralCondition = {
  __typename?: 'GeneralCondition';
  /** The id of the Condition. */
  id?: Maybe<Scalars['String']>;
  /** The name of the Condition. */
  name?: Maybe<Scalars['String']>;
  /** The type of the Condition. */
  type?: Maybe<Scalars['String']>;
  /** The status of the Condition. */
  status?: Maybe<Scalars['String']>;
  /** The sub-location that inherets from location. */
  subLocation?: Maybe<Scalars['String']>;
  /** The opening date of the Condition. */
  opened?: Maybe<Scalars['DateTime']>;
  /** The closing date of the Condition. */
  closed?: Maybe<Scalars['DateTime']>;
  location?: Maybe<LocationViewType>;
  /** The list of Cheif Complaint of the Condition. */
  cheifComplaint?: Maybe<DataPartition>;
  /** The list of Present History of the Condition. */
  presentHistory?: Maybe<DataPartition>;
  /** The list of Diagnosis of the Condition. */
  diagnosis?: Maybe<DataPartition>;
  /** The list of Differential Diagnosis of the Condition. */
  differentialDiagnosis?: Maybe<DataPartition>;
  /** The list of Consultations of the Condition. */
  consultation?: Maybe<DataPartition>;
  /** The list of OtherTreatments of the Condition. */
  otherTreatments?: Maybe<DataPartition>;
  /** The list of physical exam of the Condition. */
  physicalExam?: Maybe<DataPartition>;
  /** The list of Laboratory test of the Condition. */
  laboratory?: Maybe<DataPartition>;
  /** The list of Radio of the Condition. */
  radio?: Maybe<DataPartition>;
  /** The list of notes of the Condition. */
  note?: Maybe<DataPartition>;
  /** A remark to identify if a condition is duplicated. */
  isDuplicate?: Maybe<Scalars['Boolean']>;
  /** The show/hide status of the condition. */
  isHidden?: Maybe<Scalars['Boolean']>;
  medications?: Maybe<Array<Maybe<Medication>>>;
  activities?: Maybe<GeneralActivities>;
};

export type GeneralConditionInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  subLocation?: Maybe<Scalars['String']>;
  opened?: Maybe<Scalars['DateTime']>;
  closed?: Maybe<Scalars['DateTime']>;
  location?: Maybe<LocationViewInputType>;
  cheifComplaint?: Maybe<DataPartitionInput>;
  presentHistory?: Maybe<DataPartitionInput>;
  diagnosis?: Maybe<DataPartitionInput>;
  differentialDiagnosis?: Maybe<DataPartitionInput>;
  consultation?: Maybe<DataPartitionInput>;
  otherTreatments?: Maybe<DataPartitionInput>;
  physicalExam?: Maybe<DataPartitionInput>;
  laboratory?: Maybe<DataPartitionInput>;
  radio?: Maybe<DataPartitionInput>;
  note?: Maybe<DataPartitionInput>;
  activities?: Maybe<GeneralActivitiesInput>;
  isDuplicate?: Maybe<Scalars['Boolean']>;
  medications?: Maybe<Array<Maybe<MedicationInput>>>;
  isHidden?: Maybe<Scalars['Boolean']>;
};

export type GeneralFollowup = {
  __typename?: 'GeneralFollowup';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  /** The sub-location that inherets from location. */
  subLocation?: Maybe<Scalars['String']>;
  /** A remark to identify if a followup is duplicated. */
  isDuplicate?: Maybe<Scalars['Boolean']>;
  opened?: Maybe<Scalars['DateTime']>;
  closed?: Maybe<Scalars['DateTime']>;
  location?: Maybe<LocationViewType>;
  subjective?: Maybe<DataPartition>;
  diagnosis?: Maybe<DataPartition>;
  medication?: Maybe<DataPartition>;
  otherTreatments?: Maybe<DataPartition>;
  assessment?: Maybe<DataPartition>;
  consultation?: Maybe<DataPartition>;
  physicalExam?: Maybe<DataPartition>;
  laboratory?: Maybe<DataPartition>;
  note?: Maybe<DataPartition>;
  radio?: Maybe<DataPartition>;
  /** The show/hide status of the condition. */
  isHidden?: Maybe<Scalars['Boolean']>;
  medications?: Maybe<Array<Maybe<Medication>>>;
};

export type GeneralFollowupInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  subLocation?: Maybe<Scalars['String']>;
  opened?: Maybe<Scalars['DateTime']>;
  closed?: Maybe<Scalars['DateTime']>;
  location?: Maybe<LocationViewInputType>;
  subjective?: Maybe<DataPartitionInput>;
  medication?: Maybe<DataPartitionInput>;
  otherTreatments?: Maybe<DataPartitionInput>;
  assessment?: Maybe<DataPartitionInput>;
  consultation?: Maybe<DataPartitionInput>;
  physicalExam?: Maybe<DataPartitionInput>;
  laboratory?: Maybe<DataPartitionInput>;
  radio?: Maybe<DataPartitionInput>;
  note?: Maybe<DataPartitionInput>;
  diagnosis?: Maybe<DataPartitionInput>;
  isDuplicate?: Maybe<Scalars['Boolean']>;
  medications?: Maybe<Array<Maybe<MedicationInput>>>;
  isHidden?: Maybe<Scalars['Boolean']>;
};

export type GeneralInput = {
  conditions?: Maybe<Array<Maybe<GeneralConditionInput>>>;
  medicalHistory?: Maybe<GeneralMedicalHistoryInput>;
};

export type GeneralMedicalHistory = {
  __typename?: 'GeneralMedicalHistory';
  alerts?: Maybe<MedicalHistoryAlert>;
  allergies?: Maybe<MedicalHistoryAlert>;
  familyHistory?: Maybe<MedicalHistoryAlert>;
  medicalIssues?: Maybe<MedicalHistoryAlert>;
  pastMedication?: Maybe<MedicalHistoryMedication>;
  presentMedication?: Maybe<MedicalHistoryMedication>;
  surgicalHistory?: Maybe<MedicalHistorySurgery>;
};

export type GeneralMedicalHistoryInput = {
  alerts?: Maybe<MedicalHistoryAlertInput>;
  allergies?: Maybe<MedicalHistoryAlertInput>;
  familyHistory?: Maybe<MedicalHistoryAlertInput>;
  medicalIssues?: Maybe<MedicalHistoryAlertInput>;
  pastMedication?: Maybe<MedicalHistoryMedicationInput>;
  presentMedication?: Maybe<MedicalHistoryMedicationInput>;
  surgicalHistory?: Maybe<MedicalHistorySurgeryInput>;
};

export type GeneralOperation = {
  __typename?: 'GeneralOperation';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  /** The sub-location that inherets from location. */
  subLocation?: Maybe<Scalars['String']>;
  /** A remark to identify if a operation is duplicated. */
  isDuplicate?: Maybe<Scalars['Boolean']>;
  opened?: Maybe<Scalars['DateTime']>;
  closed?: Maybe<Scalars['DateTime']>;
  location?: Maybe<LocationViewType>;
  department?: Maybe<Scalars['String']>;
  anesthesia?: Maybe<DataPartition>;
  code?: Maybe<Array<Maybe<Scalars['String']>>>;
  operationType?: Maybe<DataPartition>;
  operationPerformed?: Maybe<DataPartition>;
  operationDiagnosis?: Maybe<DataPartition>;
  operationPostDiagnosis?: Maybe<DataPartition>;
  operationPreFindings?: Maybe<DataPartition>;
  operationCategory?: Maybe<DataPartition>;
  physicalExam?: Maybe<DataPartition>;
  surgeons?: Maybe<DataPartition>;
  operationDetails?: Maybe<Scalars['String']>;
};

export type GeneralOperationInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  subLocation?: Maybe<Scalars['String']>;
  opened?: Maybe<Scalars['DateTime']>;
  closed?: Maybe<Scalars['DateTime']>;
  location?: Maybe<LocationViewInputType>;
  department?: Maybe<Scalars['String']>;
  anesthesia?: Maybe<DataPartitionInput>;
  code?: Maybe<Array<Maybe<Scalars['String']>>>;
  operationType?: Maybe<DataPartitionInput>;
  operationPerformed?: Maybe<DataPartitionInput>;
  operationDiagnosis?: Maybe<DataPartitionInput>;
  operationPostDiagnosis?: Maybe<DataPartitionInput>;
  operationPreFindings?: Maybe<DataPartitionInput>;
  operationCategory?: Maybe<DataPartitionInput>;
  physicalExam?: Maybe<DataPartitionInput>;
  surgeons?: Maybe<DataPartitionInput>;
  operationDetails?: Maybe<Scalars['String']>;
  isDuplicate?: Maybe<Scalars['Boolean']>;
};

export type Grantor = {
  __typename?: 'Grantor';
  /** Id of the Grantors */
  id?: Maybe<Scalars['String']>;
  /** Name of the Grantors */
  name?: Maybe<Scalars['String']>;
};

export type GrantorInput = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type Location = {
  __typename?: 'Location';
  /** The id of the location. */
  id?: Maybe<Scalars['String']>;
  /** The name of the location. */
  name?: Maybe<Scalars['String']>;
  /** the contact number of the location. */
  contact?: Maybe<Scalars['String']>;
  /** The address of the location. */
  address?: Maybe<Scalars['String']>;
  /** The type of the location. */
  type?: Maybe<Scalars['String']>;
  /** List of sub-locations. */
  subLocations?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type LocationInput = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  contact?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  subLocations?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type LocationViewInputType = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type LocationViewType = {
  __typename?: 'LocationViewType';
  /** The id of the location. */
  id?: Maybe<Scalars['String']>;
  /** The name of the location. */
  name?: Maybe<Scalars['String']>;
};


export type Lookup = {
  __typename?: 'Lookup';
  /** The id of the lookup. */
  id?: Maybe<Scalars['String']>;
  /** The tenantId of the lookup. */
  tenantId?: Maybe<Scalars['String']>;
  /** The groupKey of the lookup. */
  groupKey?: Maybe<Scalars['String']>;
  /** Value of the lookup. */
  value?: Maybe<Scalars['String']>;
  /** Symbol of the lookup. */
  symbol?: Maybe<Scalars['String']>;
  /** The display text of the lookup. */
  text?: Maybe<Scalars['String']>;
  /** The description of the lookup. */
  description?: Maybe<Scalars['String']>;
  /** The culture of the lookup. */
  cultureName?: Maybe<Scalars['String']>;
  /** The Parent value of the lookup. */
  parentValue?: Maybe<Scalars['String']>;
  /** Parent value */
  parentId?: Maybe<Scalars['String']>;
  /** Created Date. */
  createdDate?: Maybe<Scalars['DateTime']>;
  /** Modified Date */
  modifiedDate?: Maybe<Scalars['DateTime']>;
  /** The order of the lookup entry in a list */
  order?: Maybe<Scalars['Int']>;
  /** Whether the lookup entry is predefined. */
  predefined?: Maybe<Scalars['Boolean']>;
};

export type LookupInput = {
  id?: Maybe<Scalars['String']>;
  groupKey: Scalars['String'];
  value?: Maybe<Scalars['String']>;
  text: Scalars['String'];
  predefined?: Maybe<Scalars['Boolean']>;
};

export type LookupView = {
  __typename?: 'LookupView';
  /** The group of the lookup. */
  group?: Maybe<Scalars['String']>;
  /** Value of the lookup. */
  value?: Maybe<Scalars['String']>;
  /** The display text of the lookup. */
  text?: Maybe<Scalars['String']>;
};

export type LookupViewModelInput = {
  group: Scalars['String'];
  value: Scalars['String'];
  text: Scalars['String'];
};

export type MediaFile = {
  __typename?: 'MediaFile';
  /** Id of the File. */
  id?: Maybe<Scalars['String']>;
  /** Name of the File. */
  name?: Maybe<Scalars['String']>;
  /** Path of the File. */
  path?: Maybe<Scalars['String']>;
  /** Type of the File. */
  type?: Maybe<Scalars['String']>;
  /** Size of the File. */
  size?: Maybe<Scalars['String']>;
  /** To which tenant this file belongs. */
  tenantId?: Maybe<Scalars['String']>;
  /** To which patient this file belongs. */
  patientId?: Maybe<Scalars['String']>;
  /** Patient name that file belongs to. */
  patientName?: Maybe<Scalars['String']>;
  /** In which speciality the file exists. */
  speciality?: Maybe<Scalars['String']>;
  /** In which condition the file exists. */
  conditionId?: Maybe<Scalars['String']>;
  /** Specified activity type Ex: (followup, operation). */
  activityType?: Maybe<Scalars['String']>;
  /** In which activity the file exists. */
  activityId?: Maybe<Scalars['String']>;
  /** To which ticket this file belongs. */
  ticketNumber?: Maybe<Scalars['String']>;
  /** If file is deleted. */
  isDeleted?: Maybe<Scalars['Boolean']>;
  /** Last modified date. */
  modified?: Maybe<Scalars['DateTime']>;
  /** Date of delete. */
  deletedOn?: Maybe<Scalars['DateTime']>;
  /** Built-in tags. */
  systemTagging?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Custom tags. */
  tags?: Maybe<DataPartition>;
};

export type MediaFileInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  patientId?: Maybe<Scalars['String']>;
  patientName?: Maybe<Scalars['String']>;
  speciality?: Maybe<Scalars['String']>;
  conditionId?: Maybe<Scalars['String']>;
  activityType?: Maybe<Scalars['String']>;
  activityId?: Maybe<Scalars['String']>;
  ticketNumber?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  deletedOn?: Maybe<Scalars['DateTime']>;
  modified?: Maybe<Scalars['DateTime']>;
  tags?: Maybe<DataPartitionInput>;
  systemTagging?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type MediaPartition = {
  __typename?: 'MediaPartition';
  text?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  date?: Maybe<Scalars['DateTime']>;
};

export type MediaPartitionInput = {
  text?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  date?: Maybe<Scalars['DateTime']>;
};

export type MedicalHistoryAlert = {
  __typename?: 'MedicalHistoryAlert';
  alert?: Maybe<Scalars['Boolean']>;
  lastUpdate?: Maybe<Scalars['DateTime']>;
  data?: Maybe<Array<Maybe<LookupView>>>;
};

export type MedicalHistoryAlertInput = {
  alert?: Maybe<Scalars['Boolean']>;
  lastUpdate?: Maybe<Scalars['DateTime']>;
  data?: Maybe<Array<Maybe<LookupViewModelInput>>>;
};

export type MedicalHistoryMedication = {
  __typename?: 'MedicalHistoryMedication';
  alert?: Maybe<Scalars['Boolean']>;
  lastUpdate?: Maybe<Scalars['DateTime']>;
  data?: Maybe<Array<Maybe<Medication>>>;
};

export type MedicalHistoryMedicationInput = {
  alert?: Maybe<Scalars['Boolean']>;
  lastUpdate?: Maybe<Scalars['DateTime']>;
  data?: Maybe<Array<Maybe<MedicationInput>>>;
};

export type MedicalHistorySurgery = {
  __typename?: 'MedicalHistorySurgery';
  alert?: Maybe<Scalars['Boolean']>;
  lastUpdate?: Maybe<Scalars['DateTime']>;
  data?: Maybe<Array<Maybe<SurgicalHistory>>>;
};

export type MedicalHistorySurgeryInput = {
  alert?: Maybe<Scalars['Boolean']>;
  lastUpdate?: Maybe<Scalars['DateTime']>;
  data?: Maybe<Array<Maybe<SurgicalHistoryInput>>>;
};

export type Medication = {
  __typename?: 'Medication';
  frequency?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  usageType?: Maybe<Scalars['String']>;
  noSubstitutes?: Maybe<Scalars['Boolean']>;
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  describedBy?: Maybe<Scalars['String']>;
  drug?: Maybe<DrugView>;
};

export type MedicationInput = {
  frequency?: Maybe<Scalars['String']>;
  drug: DrugViewInput;
  note?: Maybe<Scalars['String']>;
  usageType?: Maybe<Scalars['String']>;
  describedBy?: Maybe<Scalars['String']>;
  noSubstitutes?: Maybe<Scalars['Boolean']>;
  isActive?: Maybe<Scalars['Boolean']>;
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
};

export type MessageFromType = {
  __typename?: 'MessageFromType';
  id: Scalars['String'];
  displayName: Scalars['String'];
};

export type MessageInputType = {
  fromId?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  sentAt?: Maybe<Scalars['Date']>;
};

export type MessageType = {
  __typename?: 'MessageType';
  content: Scalars['String'];
  sentAt?: Maybe<Scalars['Date']>;
  sub?: Maybe<Scalars['String']>;
  from?: Maybe<MessageFromType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateSchedule?: Maybe<Schedule>;
  createRota?: Maybe<Rota>;
  updateRota?: Maybe<Rota>;
  deleteRota?: Maybe<Scalars['String']>;
  createLocation?: Maybe<Location>;
  updateLocation?: Maybe<Location>;
  deleteLocation?: Maybe<Location>;
  deleteSubLocation?: Maybe<Location>;
  updateSettings?: Maybe<Settings>;
  createAppointment?: Maybe<Appointment>;
  updateAppointment?: Maybe<Appointment>;
  addMessage?: Maybe<MessageType>;
  deleteAppointment?: Maybe<Scalars['String']>;
  createContact?: Maybe<Contact>;
  updateContact?: Maybe<Contact>;
  createPatient?: Maybe<Patient>;
  updatePatient?: Maybe<Patient>;
  updateCardiologyMedicalHistory?: Maybe<CardiologyMedicalHistory>;
  updateGeneralMedicalHistory?: Maybe<GeneralMedicalHistory>;
  createCardiologyCondition?: Maybe<CardiologyCondition>;
  createGeneralCondition?: Maybe<GeneralCondition>;
  updateCardiologyCondition?: Maybe<CardiologyCondition>;
  updateGeneralCondition?: Maybe<GeneralCondition>;
  createCardiologyFollowup?: Maybe<CardiologyFollowup>;
  createGeneralFollowup?: Maybe<GeneralFollowup>;
  updateCardiologyFollowup?: Maybe<CardiologyFollowup>;
  updateGeneralFollowup?: Maybe<GeneralFollowup>;
  createCardiologyOperation?: Maybe<CardiologyOperation>;
  createGeneralOperation?: Maybe<GeneralOperation>;
  updateCardiologyOperation?: Maybe<CardiologyOperation>;
  updateGeneralOperation?: Maybe<GeneralOperation>;
  remarkDuplicateActivity?: Maybe<Scalars['String']>;
  deleteMedicalActivity?: Maybe<Scalars['String']>;
  remarkDuplicatePatient?: Maybe<Scalars['String']>;
  deletePatient?: Maybe<Scalars['String']>;
  createLookup?: Maybe<Lookup>;
  createLookups?: Maybe<Array<Maybe<Lookup>>>;
  updateLookup?: Maybe<Lookup>;
  deleteLookup?: Maybe<Lookup>;
  createDrug?: Maybe<Drug>;
  updateDrug?: Maybe<Drug>;
  deleteDrug?: Maybe<Drug>;
  createGrantor?: Maybe<Grantor>;
  updateGrantor?: Maybe<Grantor>;
  deleteGrantor?: Maybe<Grantor>;
  createTag?: Maybe<Tag>;
  updateTag?: Maybe<Tag>;
  deleteTag?: Maybe<Tag>;
  createMediaFile?: Maybe<MediaFile>;
  updateMediaFiles?: Maybe<Array<Maybe<MediaFile>>>;
  deleteMediaFiles?: Maybe<Array<Maybe<Scalars['String']>>>;
  createMedication?: Maybe<PatientMedications>;
  updateMedications?: Maybe<PatientMedications>;
  createTodo?: Maybe<Todo>;
  updateTodo?: Maybe<Todo>;
  deleteTodo?: Maybe<Todo>;
  createTicket?: Maybe<Ticket>;
  updateTicket?: Maybe<Ticket>;
  updateTicketAdmin?: Maybe<Ticket>;
};


export type MutationUpdateScheduleArgs = {
  schedule: ScheduleInput;
};


export type MutationCreateRotaArgs = {
  rota: RotaInput;
};


export type MutationUpdateRotaArgs = {
  rota: RotaInput;
};


export type MutationDeleteRotaArgs = {
  id: Scalars['String'];
};


export type MutationCreateLocationArgs = {
  location: LocationInput;
};


export type MutationUpdateLocationArgs = {
  location: LocationInput;
};


export type MutationDeleteLocationArgs = {
  id: Scalars['String'];
};


export type MutationDeleteSubLocationArgs = {
  id: Scalars['String'];
  subLocation: Scalars['String'];
};


export type MutationUpdateSettingsArgs = {
  settings: SettingsInput;
};


export type MutationCreateAppointmentArgs = {
  appointment: AppointmentInput;
};


export type MutationUpdateAppointmentArgs = {
  appointment: AppointmentInput;
};


export type MutationAddMessageArgs = {
  message?: Maybe<MessageInputType>;
};


export type MutationDeleteAppointmentArgs = {
  id: Scalars['String'];
};


export type MutationCreateContactArgs = {
  contact: ContactInput;
};


export type MutationUpdateContactArgs = {
  contact: ContactInput;
};


export type MutationCreatePatientArgs = {
  patient: PatientInput;
};


export type MutationUpdatePatientArgs = {
  patient: PatientInput;
};


export type MutationUpdateCardiologyMedicalHistoryArgs = {
  patientId: Scalars['String'];
  medicalHistory: CardiologyMedicalHistoryInput;
};


export type MutationUpdateGeneralMedicalHistoryArgs = {
  patientId: Scalars['String'];
  medicalHistory: GeneralMedicalHistoryInput;
};


export type MutationCreateCardiologyConditionArgs = {
  patientId: Scalars['String'];
  condition: CardiologyConditionInput;
};


export type MutationCreateGeneralConditionArgs = {
  patientId: Scalars['String'];
  condition: GeneralConditionInput;
};


export type MutationUpdateCardiologyConditionArgs = {
  patientId: Scalars['String'];
  condition: CardiologyConditionInput;
};


export type MutationUpdateGeneralConditionArgs = {
  patientId: Scalars['String'];
  condition: GeneralConditionInput;
};


export type MutationCreateCardiologyFollowupArgs = {
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  followup: CardiologyFollowupInput;
};


export type MutationCreateGeneralFollowupArgs = {
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  followup: GeneralFollowupInput;
};


export type MutationUpdateCardiologyFollowupArgs = {
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  replacedConditionId?: Maybe<Scalars['String']>;
  followup: CardiologyFollowupInput;
};


export type MutationUpdateGeneralFollowupArgs = {
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  replacedConditionId?: Maybe<Scalars['String']>;
  followup: GeneralFollowupInput;
};


export type MutationCreateCardiologyOperationArgs = {
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  operation: CardiologyOperationInput;
};


export type MutationCreateGeneralOperationArgs = {
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  operation: GeneralOperationInput;
};


export type MutationUpdateCardiologyOperationArgs = {
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  replacedConditionId?: Maybe<Scalars['String']>;
  operation: CardiologyOperationInput;
};


export type MutationUpdateGeneralOperationArgs = {
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  replacedConditionId?: Maybe<Scalars['String']>;
  operation: GeneralOperationInput;
};


export type MutationRemarkDuplicateActivityArgs = {
  patientId: Scalars['String'];
  speciality: Scalars['String'];
  conditionId: Scalars['String'];
  activityType?: Maybe<Scalars['String']>;
  activityId?: Maybe<Scalars['String']>;
  isDuplicate?: Maybe<Scalars['Boolean']>;
};


export type MutationDeleteMedicalActivityArgs = {
  patientId: Scalars['String'];
  speciality: Scalars['String'];
  conditionId: Scalars['String'];
  activityType?: Maybe<Scalars['String']>;
  activityId?: Maybe<Scalars['String']>;
};


export type MutationRemarkDuplicatePatientArgs = {
  patientId: Scalars['String'];
  isDuplicate?: Maybe<Scalars['Boolean']>;
};


export type MutationDeletePatientArgs = {
  patientId: Scalars['String'];
};


export type MutationCreateLookupArgs = {
  lookup: LookupInput;
};


export type MutationCreateLookupsArgs = {
  lookups: Array<Maybe<LookupInput>>;
};


export type MutationUpdateLookupArgs = {
  lookup: LookupInput;
};


export type MutationDeleteLookupArgs = {
  id: Scalars['String'];
};


export type MutationCreateDrugArgs = {
  drug: DrugInput;
};


export type MutationUpdateDrugArgs = {
  drug: DrugInput;
};


export type MutationDeleteDrugArgs = {
  id: Scalars['String'];
};


export type MutationCreateGrantorArgs = {
  grantor: GrantorInput;
};


export type MutationUpdateGrantorArgs = {
  grantor: GrantorInput;
};


export type MutationDeleteGrantorArgs = {
  id: Scalars['String'];
};


export type MutationCreateTagArgs = {
  tag: TagInput;
};


export type MutationUpdateTagArgs = {
  tag: TagInput;
};


export type MutationDeleteTagArgs = {
  id: Scalars['String'];
};


export type MutationCreateMediaFileArgs = {
  mediaFile: MediaFileInput;
};


export type MutationUpdateMediaFilesArgs = {
  mediaFiles: Array<Maybe<MediaFileInput>>;
};


export type MutationDeleteMediaFilesArgs = {
  id: Array<Maybe<Scalars['String']>>;
};


export type MutationCreateMedicationArgs = {
  patientMedications: PatientMedicationsInput;
};


export type MutationUpdateMedicationsArgs = {
  patientMedications: PatientMedicationsInput;
  patientId: Scalars['String'];
  medicationId: Scalars['String'];
};


export type MutationCreateTodoArgs = {
  todo: TodoInput;
};


export type MutationUpdateTodoArgs = {
  todo: TodoInput;
};


export type MutationDeleteTodoArgs = {
  id: Scalars['String'];
};


export type MutationCreateTicketArgs = {
  ticket: TicketInput;
};


export type MutationUpdateTicketArgs = {
  ticket: TicketInput;
  broadcast?: Maybe<Scalars['Boolean']>;
};


export type MutationUpdateTicketAdminArgs = {
  ticket: TicketInput;
  broadcast?: Maybe<Scalars['Boolean']>;
};

export type PageResultTicket = {
  __typename?: 'PageResultTicket';
  /** count of the tickets. */
  count?: Maybe<Scalars['Long']>;
  /** Tickets. */
  items?: Maybe<Array<Maybe<Ticket>>>;
};

export type Patient = {
  __typename?: 'Patient';
  /** The id of the patient. */
  id?: Maybe<Scalars['String']>;
  /** The name of the patient. */
  name?: Maybe<Scalars['String']>;
  /** The sex of the patient. */
  gender?: Maybe<Scalars['String']>;
  /** Telphone number of the patient. */
  telephone?: Maybe<Scalars['String']>;
  /** Contact Numbers of the patient. */
  contactNumbers?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The birthdate of the patient. */
  birthDate?: Maybe<Scalars['DateTime']>;
  /** The Occupation of the patient. */
  occupation?: Maybe<Scalars['String']>;
  /** The Partner of the patient. */
  partner?: Maybe<Scalars['String']>;
  /** The name of the patient. */
  country?: Maybe<Scalars['String']>;
  /** The city of the patient. */
  city?: Maybe<Scalars['String']>;
  /** The identity number (Identity card or passport) of the patient. */
  identityNumber?: Maybe<Scalars['String']>;
  /** The Country of the patient. */
  email?: Maybe<Scalars['String']>;
  /** Creation Date. */
  createdOn?: Maybe<Scalars['DateTime']>;
  /** Modified Date. */
  modified?: Maybe<Scalars['DateTime']>;
  /** Modified Date. */
  isDuplicate?: Maybe<Scalars['Boolean']>;
  patientInfo?: Maybe<PatientInfo>;
};

export type PatientInfo = {
  __typename?: 'PatientInfo';
  /** The blood type of the patient. */
  bloodType?: Maybe<Scalars['String']>;
  /** The marital status of the patient. */
  maritalStatus?: Maybe<Scalars['String']>;
  /** The Emergancy Contact of the patient. */
  emergancyContact?: Maybe<Scalars['String']>;
  /** Entry Date. */
  entryDate?: Maybe<Scalars['DateTime']>;
  /** The File Number (papers) of the patient. */
  fileNumber?: Maybe<Scalars['String']>;
  /** Who reffered this patient. */
  referral?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** A date represents the last activity date  */
  lastSeen?: Maybe<Scalars['DateTime']>;
  /** Percentage of process moving from patient paper files to Digitized. */
  totalDigitizedData?: Maybe<Scalars['Int']>;
  /** Patient's flags. */
  flags?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The grantors of the patient */
  grantors?: Maybe<Array<Maybe<Grantor>>>;
  /** The tags of the patient */
  tags?: Maybe<Array<Maybe<Tag>>>;
  /** Creation Date. */
  createdOn?: Maybe<Scalars['DateTime']>;
  /** Modified Date. */
  modified?: Maybe<Scalars['DateTime']>;
  specialities?: Maybe<Speciality>;
};

export type PatientInfoInput = {
  entryDate?: Maybe<Scalars['DateTime']>;
  lastSeen?: Maybe<Scalars['DateTime']>;
  maritalStatus?: Maybe<Scalars['String']>;
  referral?: Maybe<Array<Maybe<Scalars['String']>>>;
  emergancyContact?: Maybe<Scalars['String']>;
  fileNumber?: Maybe<Scalars['String']>;
  grantors?: Maybe<Array<Maybe<GrantorInput>>>;
  tags?: Maybe<Array<Maybe<TagInput>>>;
  bloodType?: Maybe<Scalars['String']>;
  totalDigitizedData?: Maybe<Scalars['Int']>;
  flags?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdOn?: Maybe<Scalars['DateTime']>;
  modified?: Maybe<Scalars['DateTime']>;
  specialities?: Maybe<SpecialityInput>;
};

export type PatientInput = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  gender: Scalars['String'];
  telephone: Scalars['String'];
  contactNumbers?: Maybe<Array<Maybe<Scalars['String']>>>;
  birthDate: Scalars['DateTime'];
  occupation?: Maybe<Scalars['String']>;
  partner?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  isDuplicate?: Maybe<Scalars['Boolean']>;
  identityNumber?: Maybe<Scalars['String']>;
  createdOn?: Maybe<Scalars['DateTime']>;
  modified?: Maybe<Scalars['DateTime']>;
  patientInfo?: Maybe<PatientInfoInput>;
};

export type PatientMedications = {
  __typename?: 'PatientMedications';
  /** The id of the medication. */
  medicationId?: Maybe<Scalars['String']>;
  /** The id of patient. */
  patientId?: Maybe<Scalars['String']>;
  /** The id of the condition. */
  conditionId?: Maybe<Scalars['String']>;
  /** The id of followup. */
  followupId?: Maybe<Scalars['String']>;
  /** The start time of medication. */
  startTime?: Maybe<Scalars['DateTime']>;
  /** The end time of medication. */
  endTime?: Maybe<Scalars['DateTime']>;
  /** The drug of the appointment. */
  drug?: Maybe<DrugView>;
  /** The status of medication. */
  isActive?: Maybe<Scalars['Boolean']>;
  reason?: Maybe<Scalars['String']>;
  /** The history of the appointment. */
  history?: Maybe<Array<Maybe<PatientMedicationsHistory>>>;
};

export type PatientMedicationsHistory = {
  __typename?: 'PatientMedicationsHistory';
  /** The start time of medication history. */
  startDate?: Maybe<Scalars['DateTime']>;
  /** The end time of medication history. */
  endDate?: Maybe<Scalars['DateTime']>;
  /** The duration of the medication. */
  duration?: Maybe<Scalars['String']>;
  /** The frequency of the medication. */
  frequency?: Maybe<Scalars['String']>;
  /** note of the medication. */
  note?: Maybe<Scalars['String']>;
  /** The status of medication. */
  status?: Maybe<Scalars['String']>;
};

export type PatientMedicationsHistoryInput = {
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  duration?: Maybe<Scalars['String']>;
  frequency?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type PatientMedicationsInput = {
  medicationId?: Maybe<Scalars['String']>;
  patientId?: Maybe<Scalars['String']>;
  conditionId?: Maybe<Scalars['String']>;
  followupId?: Maybe<Scalars['String']>;
  drug?: Maybe<DrugViewInput>;
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  reason?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  history?: Maybe<Array<Maybe<PatientMedicationsHistoryInput>>>;
};

export type PatientsMediaFiles = {
  __typename?: 'PatientsMediaFiles';
  /** ID of patient */
  id?: Maybe<Scalars['String']>;
  /** Patient name */
  patientName?: Maybe<Scalars['String']>;
  /** Total patient images */
  imagesCount?: Maybe<Scalars['Int']>;
  /** Total patient PDF files */
  pdfCount?: Maybe<Scalars['Int']>;
  /** List of files found in patient pool */
  pool?: Maybe<Array<Maybe<MediaFile>>>;
  /** List of files found in patient activities */
  files?: Maybe<Array<Maybe<MediaFile>>>;
};

export type Query = {
  __typename?: 'Query';
  messages?: Maybe<Array<Maybe<MessageType>>>;
  getAppointmentsEvents?: Maybe<Array<Maybe<AppointmentEventType>>>;
  schedule?: Maybe<Schedule>;
  rotaAll?: Maybe<Array<Maybe<Rota>>>;
  rota?: Maybe<Rota>;
  locations?: Maybe<Array<Maybe<Location>>>;
  location?: Maybe<Location>;
  settings?: Maybe<Array<Maybe<Settings>>>;
  appointments?: Maybe<Array<Maybe<Appointment>>>;
  appointment?: Maybe<Appointment>;
  contactsTotal?: Maybe<Scalars['Int']>;
  contacts?: Maybe<Array<Maybe<Contact>>>;
  contact?: Maybe<Contact>;
  patientsTotal?: Maybe<Scalars['Int']>;
  patients?: Maybe<Array<Maybe<Patient>>>;
  patient?: Maybe<Patient>;
  lookups?: Maybe<Array<Maybe<Lookup>>>;
  lookup?: Maybe<Lookup>;
  lookupByText?: Maybe<Lookup>;
  lookupByValue?: Maybe<Lookup>;
  lookupsByGroup?: Maybe<Array<Maybe<Lookup>>>;
  lookupsByGroupTotal?: Maybe<Scalars['Int']>;
  lookupsByGroups?: Maybe<Array<Maybe<Lookup>>>;
  conditions?: Maybe<Array<Maybe<Condition>>>;
  grantorsTotal?: Maybe<Scalars['Int']>;
  grantors?: Maybe<Array<Maybe<Grantor>>>;
  grantor?: Maybe<Grantor>;
  todosTotal?: Maybe<Scalars['Int']>;
  todos?: Maybe<Array<Maybe<Todo>>>;
  todo?: Maybe<Todo>;
  tagsTotal?: Maybe<Scalars['Int']>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  tag?: Maybe<Tag>;
  drugs?: Maybe<Array<Maybe<Drug>>>;
  drug?: Maybe<Drug>;
  patientsMediaFiles?: Maybe<Array<Maybe<PatientsMediaFiles>>>;
  tenantPoolMediaFiles?: Maybe<Array<Maybe<MediaFile>>>;
  /** Get media files by patient id */
  patientMediaFiles?: Maybe<Array<Maybe<MediaFile>>>;
  patientMediaFilesTotal?: Maybe<Scalars['Int']>;
  /** Get patient pool media files by patient id */
  patientMediaPoolFiles?: Maybe<Array<Maybe<MediaFile>>>;
  /** Get media files by activity */
  activityMediaFiles?: Maybe<Array<Maybe<MediaFile>>>;
  mediaFiles?: Maybe<Array<Maybe<MediaFile>>>;
  mediaFile?: Maybe<MediaFile>;
  trashedMediaFiles?: Maybe<Array<Maybe<MediaFile>>>;
  ticketMediaFiles?: Maybe<Array<Maybe<MediaFile>>>;
  patientMedications?: Maybe<Array<Maybe<PatientMedications>>>;
  patientMedication?: Maybe<Array<Maybe<PatientMedications>>>;
  patientMedicationByCondition?: Maybe<Array<Maybe<PatientMedications>>>;
  patientMedicationByFollowup?: Maybe<Array<Maybe<PatientMedications>>>;
  tickets?: Maybe<PageResultTicket>;
  allTickets?: Maybe<PageResultTicket>;
  ticket?: Maybe<Ticket>;
  ticketTenant?: Maybe<Scalars['String']>;
};


export type QueryRotaArgs = {
  id: Scalars['String'];
};


export type QueryLocationArgs = {
  id: Scalars['String'];
};


export type QueryAppointmentsArgs = {
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  sortBy?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  descending?: Maybe<Scalars['Boolean']>;
};


export type QueryAppointmentArgs = {
  id: Scalars['String'];
};


export type QueryContactsTotalArgs = {
  sortBy?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  descending?: Maybe<Scalars['Boolean']>;
};


export type QueryContactsArgs = {
  sortBy?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  descending?: Maybe<Scalars['Boolean']>;
};


export type QueryContactArgs = {
  id: Scalars['String'];
};


export type QueryPatientsTotalArgs = {
  sortBy?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  descending?: Maybe<Scalars['Boolean']>;
};


export type QueryPatientsArgs = {
  sortBy?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  descending?: Maybe<Scalars['Boolean']>;
};


export type QueryPatientArgs = {
  id: Scalars['String'];
};


export type QueryLookupArgs = {
  id: Scalars['String'];
};


export type QueryLookupByTextArgs = {
  text: Scalars['String'];
  group: Scalars['String'];
};


export type QueryLookupByValueArgs = {
  value: Scalars['String'];
  group: Scalars['String'];
};


export type QueryLookupsByGroupArgs = {
  group: Scalars['String'];
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filterPredefined?: Maybe<Scalars['Boolean']>;
};


export type QueryLookupsByGroupTotalArgs = {
  group: Scalars['String'];
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filterPredefined?: Maybe<Scalars['Boolean']>;
};


export type QueryLookupsByGroupsArgs = {
  groups: Array<Maybe<Scalars['String']>>;
  filterPredefined?: Maybe<Scalars['Boolean']>;
};


export type QueryGrantorsTotalArgs = {
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
};


export type QueryGrantorsArgs = {
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
};


export type QueryGrantorArgs = {
  id: Scalars['String'];
};


export type QueryTodosTotalArgs = {
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  patientId?: Maybe<Scalars['String']>;
};


export type QueryTodosArgs = {
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  patientId?: Maybe<Scalars['String']>;
};


export type QueryTodoArgs = {
  id: Scalars['String'];
};


export type QueryTagsTotalArgs = {
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
};


export type QueryTagsArgs = {
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
};


export type QueryTagArgs = {
  id: Scalars['String'];
};


export type QueryDrugsArgs = {
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
};


export type QueryDrugArgs = {
  id: Scalars['String'];
};


export type QueryPatientsMediaFilesArgs = {
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  patientId?: Maybe<Scalars['String']>;
};


export type QueryTenantPoolMediaFilesArgs = {
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
};


export type QueryPatientMediaFilesArgs = {
  patientId: Scalars['String'];
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
};


export type QueryPatientMediaFilesTotalArgs = {
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  patientId?: Maybe<Scalars['String']>;
};


export type QueryPatientMediaPoolFilesArgs = {
  patientId: Scalars['String'];
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
};


export type QueryActivityMediaFilesArgs = {
  patientId: Scalars['String'];
  speciality?: Maybe<Scalars['String']>;
  conditionId?: Maybe<Scalars['String']>;
  activitType?: Maybe<Scalars['String']>;
  activityId?: Maybe<Scalars['String']>;
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
};


export type QueryMediaFileArgs = {
  id: Scalars['String'];
};


export type QueryTicketMediaFilesArgs = {
  text: Scalars['String'];
  ticketNumber: Scalars['String'];
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
};


export type QueryPatientMedicationsArgs = {
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  sortBy?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  descending?: Maybe<Scalars['Boolean']>;
};


export type QueryPatientMedicationArgs = {
  patientId: Scalars['String'];
};


export type QueryPatientMedicationByConditionArgs = {
  patientId: Scalars['String'];
  conditionId?: Maybe<Scalars['String']>;
};


export type QueryPatientMedicationByFollowupArgs = {
  patientId: Scalars['String'];
  followupId?: Maybe<Scalars['String']>;
};


export type QueryTicketsArgs = {
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  descending?: Maybe<Scalars['Boolean']>;
  sortBy?: Maybe<Scalars['String']>;
};


export type QueryAllTicketsArgs = {
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  descending?: Maybe<Scalars['Boolean']>;
  sortBy?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};


export type QueryTicketArgs = {
  id: Scalars['String'];
};


export type QueryTicketTenantArgs = {
  id: Scalars['String'];
};

export type Recurrence = {
  __typename?: 'Recurrence';
  /** The startTime of the recurrence. */
  startTime?: Maybe<Scalars['DateTime']>;
  /** The endTime of the recurrence. */
  endTime?: Maybe<Scalars['DateTime']>;
  /** The rule of the recurrence. */
  rule?: Maybe<Scalars['String']>;
};

export type RecurrenceInput = {
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  rule?: Maybe<Scalars['String']>;
};

export type Rota = {
  __typename?: 'Rota';
  /** The id of the rota. */
  id?: Maybe<Scalars['String']>;
  /** The name of the rota. */
  name?: Maybe<Scalars['String']>;
  /** The sign color to rota. */
  color?: Maybe<Scalars['String']>;
  /** The location associated with the rota. */
  location?: Maybe<LocationViewType>;
  /** The list of recurrence rules associated with the rota. */
  recurrence?: Maybe<Array<Maybe<Recurrence>>>;
};

export type RotaInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  location?: Maybe<LocationViewInputType>;
  recurrence?: Maybe<Array<Maybe<RecurrenceInput>>>;
};

export type Schedule = {
  __typename?: 'Schedule';
  /** The id of the schedule. */
  id?: Maybe<Scalars['String']>;
  /** The startHour of the schedule. */
  startHour?: Maybe<Scalars['String']>;
  /** The startHour of the schedule. */
  endHour?: Maybe<Scalars['String']>;
  /** Whether to mark rota on schedule cells or not. */
  displayRota?: Maybe<Scalars['Boolean']>;
};

export type ScheduleInput = {
  id?: Maybe<Scalars['String']>;
  startHour?: Maybe<Scalars['String']>;
  endHour?: Maybe<Scalars['String']>;
  displayRota?: Maybe<Scalars['Boolean']>;
};

export type Settings = {
  __typename?: 'Settings';
  /** The id. */
  id?: Maybe<Scalars['String']>;
  /** The assigned specialties to a tenant. */
  specialties?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type SettingsInput = {
  id?: Maybe<Scalars['String']>;
  specialties?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Speciality = {
  __typename?: 'Speciality';
  general?: Maybe<General>;
  cardiology?: Maybe<Cardiology>;
};

export type SpecialityInput = {
  general?: Maybe<GeneralInput>;
  cardiology?: Maybe<CardiologyInput>;
};

export type Subscription = {
  __typename?: 'Subscription';
  messageAdded?: Maybe<MessageType>;
  messageAddedByUser?: Maybe<MessageType>;
  appointmentEvent?: Maybe<AppointmentEventType>;
  ticketEvent?: Maybe<TicketEventType>;
  ticketEventAdmin?: Maybe<TicketEventType>;
};


export type SubscriptionMessageAddedByUserArgs = {
  id: Scalars['String'];
};


export type SubscriptionAppointmentEventArgs = {
  tenantId: Scalars['String'];
  userId: Scalars['String'];
};


export type SubscriptionTicketEventArgs = {
  tenantId: Scalars['String'];
  userId: Scalars['String'];
};

export type SurgicalHistory = {
  __typename?: 'SurgicalHistory';
  note?: Maybe<Scalars['String']>;
  what?: Maybe<Scalars['String']>;
  when?: Maybe<Scalars['DateTime']>;
};

export type SurgicalHistoryInput = {
  what?: Maybe<Scalars['String']>;
  when?: Maybe<Scalars['DateTime']>;
  note?: Maybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  /** Id of the Tags */
  id?: Maybe<Scalars['String']>;
  /** Name of the Tags */
  name?: Maybe<Scalars['String']>;
  /** Group of the Tags */
  group?: Maybe<Scalars['String']>;
};

export type TagInput = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  group: Scalars['String'];
};

export type Ticket = {
  __typename?: 'Ticket';
  /** Id of the Ticket */
  id?: Maybe<Scalars['String']>;
  /** Ticket number of the Ticket */
  ticketNumber?: Maybe<Scalars['String']>;
  /** tenantName of the Ticket */
  tenantName?: Maybe<Scalars['String']>;
  /** Subject of the Ticket */
  subject?: Maybe<Scalars['String']>;
  /** Details of the Ticket */
  details?: Maybe<Scalars['String']>;
  /** Status of the Ticket */
  status?: Maybe<Scalars['Int']>;
  /** Attached File of the Ticket */
  attachFile?: Maybe<Scalars['Boolean']>;
  /** Admin read the ticket */
  isReadByAdmin?: Maybe<Scalars['Boolean']>;
  /** Client read the ticket */
  isReadByClient?: Maybe<Scalars['Boolean']>;
  /** date of replay message */
  ticketDate?: Maybe<Scalars['DateTime']>;
  messages?: Maybe<Array<Maybe<TicketMessages>>>;
};

export type TicketEventType = {
  __typename?: 'TicketEventType';
  content?: Maybe<Ticket>;
  event?: Maybe<Scalars['String']>;
  sentAt?: Maybe<Scalars['DateTime']>;
  sub?: Maybe<Scalars['String']>;
  from?: Maybe<EventFromType>;
};

export type TicketInput = {
  id?: Maybe<Scalars['String']>;
  ticketNumber?: Maybe<Scalars['String']>;
  tenantName?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  attachFile?: Maybe<Scalars['Boolean']>;
  isReadByAdmin?: Maybe<Scalars['Boolean']>;
  isReadByClient?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['Int']>;
  ticketDate?: Maybe<Scalars['DateTime']>;
  messages?: Maybe<Array<Maybe<TicketMessagesInput>>>;
};

export type TicketMessages = {
  __typename?: 'TicketMessages';
  /** Message content */
  message?: Maybe<Scalars['String']>;
  /** name of the requester */
  requestBy?: Maybe<Scalars['String']>;
  /** date of replay message */
  messageDate?: Maybe<Scalars['DateTime']>;
};

export type TicketMessagesInput = {
  message?: Maybe<Scalars['String']>;
  requestBy?: Maybe<Scalars['String']>;
  messageDate?: Maybe<Scalars['DateTime']>;
};

export type Todo = {
  __typename?: 'Todo';
  /** Id of the Todos */
  id?: Maybe<Scalars['String']>;
  /** Title of the Todos */
  title?: Maybe<Scalars['String']>;
  /** Notes of the Todos */
  notes?: Maybe<Scalars['String']>;
  /** Start Date of the Todos */
  startDate?: Maybe<Scalars['DateTime']>;
  /** Due Date of the Todos */
  dueDate?: Maybe<Scalars['DateTime']>;
  /** Completed of the Todos */
  isCompleted?: Maybe<Scalars['Boolean']>;
  /** Starred of the Todos */
  isStarred?: Maybe<Scalars['Boolean']>;
  /** Important of the Todos */
  isImportant?: Maybe<Scalars['Boolean']>;
  /** Patient Id of the Todos */
  patientId?: Maybe<Scalars['String']>;
};

export type TodoInput = {
  id?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['DateTime']>;
  dueDate?: Maybe<Scalars['DateTime']>;
  isCompleted?: Maybe<Scalars['Boolean']>;
  isStarred?: Maybe<Scalars['Boolean']>;
  isImportant?: Maybe<Scalars['Boolean']>;
  patientId?: Maybe<Scalars['String']>;
};

export type AddMessageMutationVariables = Exact<{
  message?: Maybe<MessageInputType>;
}>;


export type AddMessageMutation = { __typename?: 'Mutation', addMessage?: Maybe<{ __typename?: 'MessageType', content: string, sentAt?: Maybe<any>, sub?: Maybe<string>, from?: Maybe<{ __typename?: 'MessageFromType', id: string, displayName: string }> }> };

export type CreateAppointmentMutationVariables = Exact<{
  appointment: AppointmentInput;
}>;


export type CreateAppointmentMutation = { __typename?: 'Mutation', createAppointment?: Maybe<{ __typename?: 'Appointment', id?: Maybe<string>, subject?: Maybe<string>, startTime?: Maybe<any>, endTime?: Maybe<any>, reason?: Maybe<string>, color?: Maybe<string>, note?: Maybe<string>, conditionId?: Maybe<string>, speciality?: Maybe<string>, recurrenceId?: Maybe<string>, recurrenceException?: Maybe<string>, recurrenceRule?: Maybe<string>, isBlock?: Maybe<boolean>, isReadonly?: Maybe<boolean>, isAllDay?: Maybe<boolean>, type?: Maybe<string>, status?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, contact?: Maybe<{ __typename?: 'Contact', id?: Maybe<string>, isDuplicate?: Maybe<boolean>, name?: Maybe<string>, gender?: Maybe<string>, telephone?: Maybe<string>, contactNumbers?: Maybe<Array<Maybe<string>>>, birthDate?: Maybe<any>, occupation?: Maybe<string>, partner?: Maybe<string>, country?: Maybe<string>, city?: Maybe<string>, identityNumber?: Maybe<string>, email?: Maybe<string>, createdOn?: Maybe<any>, modified?: Maybe<any>, contactType?: Maybe<string> }> }> };

export type CreateCardiologyConditionMutationVariables = Exact<{
  patientId: Scalars['String'];
  condition: CardiologyConditionInput;
}>;


export type CreateCardiologyConditionMutation = { __typename?: 'Mutation', createCardiologyCondition?: Maybe<{ __typename?: 'CardiologyCondition', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, opened?: Maybe<any>, closed?: Maybe<any>, isDuplicate?: Maybe<boolean>, isHidden?: Maybe<boolean>, height?: Maybe<number>, weight?: Maybe<number>, bmi?: Maybe<number>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, cheifComplaint?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, presentHistory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, differentialDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>>, activities?: Maybe<{ __typename?: 'CardiologyActivities', followups?: Maybe<Array<Maybe<{ __typename?: 'CardiologyFollowup', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, isHidden?: Maybe<boolean>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, subjective?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medication?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, assessment?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>>, cardiologyClinicalExamination?: Maybe<{ __typename?: 'CardiologyClinicalExamination', bp?: Maybe<string>, hr?: Maybe<string>, pulse?: Maybe<string>, pulseClassification?: Maybe<string>, sound?: Maybe<string>, value?: Maybe<string>, intensity?: Maybe<string>, pericardialFriction?: Maybe<boolean>, lungAuscultation?: Maybe<string>, aspect?: Maybe<string>, puls?: Maybe<boolean>, rightSuperior?: Maybe<boolean>, rightTransverse?: Maybe<boolean>, rightInferior?: Maybe<boolean>, leftSuperior?: Maybe<boolean>, leftTransverse?: Maybe<boolean>, leftInferior?: Maybe<boolean>, hepatoJugularReflux?: Maybe<boolean>, neckCarotidMurmur?: Maybe<string>, soft?: Maybe<boolean>, tender?: Maybe<string>, hepatomegaly?: Maybe<boolean>, ascites?: Maybe<boolean> }> }>>>, operations?: Maybe<Array<Maybe<{ __typename?: 'CardiologyOperation', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, department?: Maybe<string>, code?: Maybe<Array<Maybe<string>>>, operationDetails?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, anesthesia?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationType?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPerformed?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPostDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPreFindings?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationCategory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, surgeons?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }>>> }>, cardiologyClinicalExamination?: Maybe<{ __typename?: 'CardiologyClinicalExamination', bp?: Maybe<string>, hr?: Maybe<string>, pulse?: Maybe<string>, pulseClassification?: Maybe<string>, sound?: Maybe<string>, value?: Maybe<string>, intensity?: Maybe<string>, pericardialFriction?: Maybe<boolean>, lungAuscultation?: Maybe<string>, aspect?: Maybe<string>, puls?: Maybe<boolean>, rightSuperior?: Maybe<boolean>, rightTransverse?: Maybe<boolean>, rightInferior?: Maybe<boolean>, leftSuperior?: Maybe<boolean>, leftTransverse?: Maybe<boolean>, leftInferior?: Maybe<boolean>, hepatoJugularReflux?: Maybe<boolean>, neckCarotidMurmur?: Maybe<string>, soft?: Maybe<boolean>, tender?: Maybe<string>, hepatomegaly?: Maybe<boolean>, ascites?: Maybe<boolean> }> }> };

export type CreateCardiologyFollowupMutationVariables = Exact<{
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  followup: CardiologyFollowupInput;
}>;


export type CreateCardiologyFollowupMutation = { __typename?: 'Mutation', createCardiologyFollowup?: Maybe<{ __typename?: 'CardiologyFollowup', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, isHidden?: Maybe<boolean>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, subjective?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medication?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, assessment?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>>, cardiologyClinicalExamination?: Maybe<{ __typename?: 'CardiologyClinicalExamination', bp?: Maybe<string>, hr?: Maybe<string>, pulse?: Maybe<string>, pulseClassification?: Maybe<string>, sound?: Maybe<string>, value?: Maybe<string>, intensity?: Maybe<string>, pericardialFriction?: Maybe<boolean>, lungAuscultation?: Maybe<string>, aspect?: Maybe<string>, puls?: Maybe<boolean>, rightSuperior?: Maybe<boolean>, rightTransverse?: Maybe<boolean>, rightInferior?: Maybe<boolean>, leftSuperior?: Maybe<boolean>, leftTransverse?: Maybe<boolean>, leftInferior?: Maybe<boolean>, hepatoJugularReflux?: Maybe<boolean>, neckCarotidMurmur?: Maybe<string>, soft?: Maybe<boolean>, tender?: Maybe<string>, hepatomegaly?: Maybe<boolean>, ascites?: Maybe<boolean> }> }> };

export type CreateCardiologyOperationMutationVariables = Exact<{
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  operation: CardiologyOperationInput;
}>;


export type CreateCardiologyOperationMutation = { __typename?: 'Mutation', createCardiologyOperation?: Maybe<{ __typename?: 'CardiologyOperation', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, department?: Maybe<string>, code?: Maybe<Array<Maybe<string>>>, operationDetails?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, anesthesia?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationType?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPerformed?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPostDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPreFindings?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationCategory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, surgeons?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }> };

export type CreateContactMutationVariables = Exact<{
  contact: ContactInput;
}>;


export type CreateContactMutation = { __typename?: 'Mutation', createContact?: Maybe<{ __typename?: 'Contact', id?: Maybe<string>, isDuplicate?: Maybe<boolean>, name?: Maybe<string>, gender?: Maybe<string>, telephone?: Maybe<string>, contactNumbers?: Maybe<Array<Maybe<string>>>, birthDate?: Maybe<any>, occupation?: Maybe<string>, partner?: Maybe<string>, country?: Maybe<string>, city?: Maybe<string>, identityNumber?: Maybe<string>, email?: Maybe<string>, createdOn?: Maybe<any>, modified?: Maybe<any>, contactType?: Maybe<string> }> };

export type CreateDrugMutationVariables = Exact<{
  drug: DrugInput;
}>;


export type CreateDrugMutation = { __typename?: 'Mutation', createDrug?: Maybe<{ __typename?: 'Drug', id?: Maybe<string>, atcCode?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string>, form?: Maybe<string> }> };

export type CreateGeneralConditionMutationVariables = Exact<{
  patientId: Scalars['String'];
  condition: GeneralConditionInput;
}>;


export type CreateGeneralConditionMutation = { __typename?: 'Mutation', createGeneralCondition?: Maybe<{ __typename?: 'GeneralCondition', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, opened?: Maybe<any>, closed?: Maybe<any>, isDuplicate?: Maybe<boolean>, isHidden?: Maybe<boolean>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, cheifComplaint?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, presentHistory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, differentialDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>>, activities?: Maybe<{ __typename?: 'GeneralActivities', followups?: Maybe<Array<Maybe<{ __typename?: 'GeneralFollowup', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, isHidden?: Maybe<boolean>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, subjective?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medication?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, assessment?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>>>, operations?: Maybe<Array<Maybe<{ __typename?: 'GeneralOperation', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, department?: Maybe<string>, code?: Maybe<Array<Maybe<string>>>, operationDetails?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, anesthesia?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationType?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPerformed?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPostDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPreFindings?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationCategory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, surgeons?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }>>> }> }> };

export type CreateGeneralFollowupMutationVariables = Exact<{
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  followup: GeneralFollowupInput;
}>;


export type CreateGeneralFollowupMutation = { __typename?: 'Mutation', createGeneralFollowup?: Maybe<{ __typename?: 'GeneralFollowup', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, isHidden?: Maybe<boolean>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, subjective?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medication?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, assessment?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }> };

export type CreateGeneralOperationMutationVariables = Exact<{
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  operation: GeneralOperationInput;
}>;


export type CreateGeneralOperationMutation = { __typename?: 'Mutation', createGeneralOperation?: Maybe<{ __typename?: 'GeneralOperation', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, department?: Maybe<string>, code?: Maybe<Array<Maybe<string>>>, operationDetails?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, anesthesia?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationType?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPerformed?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPostDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPreFindings?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationCategory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, surgeons?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }> };

export type CreateGrantorMutationVariables = Exact<{
  grantor: GrantorInput;
}>;


export type CreateGrantorMutation = { __typename?: 'Mutation', createGrantor?: Maybe<{ __typename?: 'Grantor', id?: Maybe<string>, name?: Maybe<string> }> };

export type CreateLocationMutationVariables = Exact<{
  location: LocationInput;
}>;


export type CreateLocationMutation = { __typename?: 'Mutation', createLocation?: Maybe<{ __typename?: 'Location', id?: Maybe<string>, name?: Maybe<string>, contact?: Maybe<string>, address?: Maybe<string>, type?: Maybe<string>, subLocations?: Maybe<Array<Maybe<string>>> }> };

export type CreateLookupMutationVariables = Exact<{
  lookup: LookupInput;
}>;


export type CreateLookupMutation = { __typename?: 'Mutation', createLookup?: Maybe<{ __typename?: 'Lookup', id?: Maybe<string>, tenantId?: Maybe<string>, groupKey?: Maybe<string>, value?: Maybe<string>, symbol?: Maybe<string>, text?: Maybe<string>, description?: Maybe<string>, cultureName?: Maybe<string>, parentValue?: Maybe<string>, parentId?: Maybe<string>, createdDate?: Maybe<any>, modifiedDate?: Maybe<any>, order?: Maybe<number>, predefined?: Maybe<boolean> }> };

export type CreateLookupsMutationVariables = Exact<{
  lookups: Array<Maybe<LookupInput>> | Maybe<LookupInput>;
}>;


export type CreateLookupsMutation = { __typename?: 'Mutation', createLookups?: Maybe<Array<Maybe<{ __typename?: 'Lookup', id?: Maybe<string>, tenantId?: Maybe<string>, groupKey?: Maybe<string>, value?: Maybe<string>, symbol?: Maybe<string>, text?: Maybe<string>, description?: Maybe<string>, cultureName?: Maybe<string>, parentValue?: Maybe<string>, parentId?: Maybe<string>, createdDate?: Maybe<any>, modifiedDate?: Maybe<any>, order?: Maybe<number>, predefined?: Maybe<boolean> }>>> };

export type CreateMediaFileMutationVariables = Exact<{
  mediaFile: MediaFileInput;
}>;


export type CreateMediaFileMutation = { __typename?: 'Mutation', createMediaFile?: Maybe<{ __typename?: 'MediaFile', id?: Maybe<string>, name?: Maybe<string>, path?: Maybe<string>, type?: Maybe<string>, size?: Maybe<string>, tenantId?: Maybe<string>, patientId?: Maybe<string>, patientName?: Maybe<string>, speciality?: Maybe<string>, conditionId?: Maybe<string>, activityType?: Maybe<string>, activityId?: Maybe<string>, ticketNumber?: Maybe<string>, isDeleted?: Maybe<boolean>, modified?: Maybe<any>, deletedOn?: Maybe<any>, systemTagging?: Maybe<Array<Maybe<string>>>, tags?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }> };

export type CreateMedicationMutationVariables = Exact<{
  patientMedications: PatientMedicationsInput;
}>;


export type CreateMedicationMutation = { __typename?: 'Mutation', createMedication?: Maybe<{ __typename?: 'PatientMedications', medicationId?: Maybe<string>, patientId?: Maybe<string>, conditionId?: Maybe<string>, followupId?: Maybe<string>, startTime?: Maybe<any>, endTime?: Maybe<any>, isActive?: Maybe<boolean>, reason?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }>, history?: Maybe<Array<Maybe<{ __typename?: 'PatientMedicationsHistory', startDate?: Maybe<any>, endDate?: Maybe<any>, duration?: Maybe<string>, frequency?: Maybe<string>, note?: Maybe<string>, status?: Maybe<string> }>>> }> };

export type CreatePatientMutationVariables = Exact<{
  patient: PatientInput;
}>;


export type CreatePatientMutation = { __typename?: 'Mutation', createPatient?: Maybe<{ __typename?: 'Patient', id?: Maybe<string>, name?: Maybe<string>, gender?: Maybe<string>, telephone?: Maybe<string>, contactNumbers?: Maybe<Array<Maybe<string>>>, birthDate?: Maybe<any>, occupation?: Maybe<string>, partner?: Maybe<string>, country?: Maybe<string>, city?: Maybe<string>, identityNumber?: Maybe<string>, email?: Maybe<string>, createdOn?: Maybe<any>, modified?: Maybe<any>, isDuplicate?: Maybe<boolean>, patientInfo?: Maybe<{ __typename?: 'PatientInfo', bloodType?: Maybe<string>, maritalStatus?: Maybe<string>, emergancyContact?: Maybe<string>, entryDate?: Maybe<any>, fileNumber?: Maybe<string>, referral?: Maybe<Array<Maybe<string>>>, lastSeen?: Maybe<any>, totalDigitizedData?: Maybe<number>, flags?: Maybe<Array<Maybe<string>>>, createdOn?: Maybe<any>, modified?: Maybe<any>, grantors?: Maybe<Array<Maybe<{ __typename?: 'Grantor', id?: Maybe<string>, name?: Maybe<string> }>>>, tags?: Maybe<Array<Maybe<{ __typename?: 'Tag', id?: Maybe<string>, name?: Maybe<string>, group?: Maybe<string> }>>>, specialities?: Maybe<{ __typename?: 'Speciality', general?: Maybe<{ __typename?: 'General', conditions?: Maybe<Array<Maybe<{ __typename?: 'GeneralCondition', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, opened?: Maybe<any>, closed?: Maybe<any>, isDuplicate?: Maybe<boolean>, isHidden?: Maybe<boolean>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, cheifComplaint?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, presentHistory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, differentialDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>>, activities?: Maybe<{ __typename?: 'GeneralActivities', followups?: Maybe<Array<Maybe<{ __typename?: 'GeneralFollowup', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, isHidden?: Maybe<boolean>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, subjective?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medication?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, assessment?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>>>, operations?: Maybe<Array<Maybe<{ __typename?: 'GeneralOperation', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, department?: Maybe<string>, code?: Maybe<Array<Maybe<string>>>, operationDetails?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, anesthesia?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationType?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPerformed?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPostDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPreFindings?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationCategory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, surgeons?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }>>> }> }>>>, medicalHistory?: Maybe<{ __typename?: 'GeneralMedicalHistory', alerts?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, allergies?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, familyHistory?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, medicalIssues?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, pastMedication?: Maybe<{ __typename?: 'MedicalHistoryMedication', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>, presentMedication?: Maybe<{ __typename?: 'MedicalHistoryMedication', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>, surgicalHistory?: Maybe<{ __typename?: 'MedicalHistorySurgery', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'SurgicalHistory', note?: Maybe<string>, what?: Maybe<string>, when?: Maybe<any> }>>> }> }> }>, cardiology?: Maybe<{ __typename?: 'Cardiology', conditions?: Maybe<Array<Maybe<{ __typename?: 'CardiologyCondition', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, opened?: Maybe<any>, closed?: Maybe<any>, isDuplicate?: Maybe<boolean>, isHidden?: Maybe<boolean>, height?: Maybe<number>, weight?: Maybe<number>, bmi?: Maybe<number>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, cheifComplaint?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, presentHistory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, differentialDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>>, activities?: Maybe<{ __typename?: 'CardiologyActivities', followups?: Maybe<Array<Maybe<{ __typename?: 'CardiologyFollowup', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, isHidden?: Maybe<boolean>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, subjective?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medication?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, assessment?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>>, cardiologyClinicalExamination?: Maybe<{ __typename?: 'CardiologyClinicalExamination', bp?: Maybe<string>, hr?: Maybe<string>, pulse?: Maybe<string>, pulseClassification?: Maybe<string>, sound?: Maybe<string>, value?: Maybe<string>, intensity?: Maybe<string>, pericardialFriction?: Maybe<boolean>, lungAuscultation?: Maybe<string>, aspect?: Maybe<string>, puls?: Maybe<boolean>, rightSuperior?: Maybe<boolean>, rightTransverse?: Maybe<boolean>, rightInferior?: Maybe<boolean>, leftSuperior?: Maybe<boolean>, leftTransverse?: Maybe<boolean>, leftInferior?: Maybe<boolean>, hepatoJugularReflux?: Maybe<boolean>, neckCarotidMurmur?: Maybe<string>, soft?: Maybe<boolean>, tender?: Maybe<string>, hepatomegaly?: Maybe<boolean>, ascites?: Maybe<boolean> }> }>>>, operations?: Maybe<Array<Maybe<{ __typename?: 'CardiologyOperation', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, department?: Maybe<string>, code?: Maybe<Array<Maybe<string>>>, operationDetails?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, anesthesia?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationType?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPerformed?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPostDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPreFindings?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationCategory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, surgeons?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }>>> }>, cardiologyClinicalExamination?: Maybe<{ __typename?: 'CardiologyClinicalExamination', bp?: Maybe<string>, hr?: Maybe<string>, pulse?: Maybe<string>, pulseClassification?: Maybe<string>, sound?: Maybe<string>, value?: Maybe<string>, intensity?: Maybe<string>, pericardialFriction?: Maybe<boolean>, lungAuscultation?: Maybe<string>, aspect?: Maybe<string>, puls?: Maybe<boolean>, rightSuperior?: Maybe<boolean>, rightTransverse?: Maybe<boolean>, rightInferior?: Maybe<boolean>, leftSuperior?: Maybe<boolean>, leftTransverse?: Maybe<boolean>, leftInferior?: Maybe<boolean>, hepatoJugularReflux?: Maybe<boolean>, neckCarotidMurmur?: Maybe<string>, soft?: Maybe<boolean>, tender?: Maybe<string>, hepatomegaly?: Maybe<boolean>, ascites?: Maybe<boolean> }> }>>>, medicalHistory?: Maybe<{ __typename?: 'CardiologyMedicalHistory', alerts?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, allergies?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, familyHistory?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, medicalIssues?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, cardioVascular?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, gi?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, endocrinology?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, lungDiseases?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, neurology?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, physiomaticDisorder?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, riskFactors?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, pastMedication?: Maybe<{ __typename?: 'MedicalHistoryMedication', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>, presentMedication?: Maybe<{ __typename?: 'MedicalHistoryMedication', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>, surgicalHistory?: Maybe<{ __typename?: 'CardiologyMedicalHistorySurgery', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'CardiologySurgicalHistory', note?: Maybe<string>, type?: Maybe<string>, when?: Maybe<any>, what?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>>> }> }> }> }> }> }> };

export type CreateRotaMutationVariables = Exact<{
  rota: RotaInput;
}>;


export type CreateRotaMutation = { __typename?: 'Mutation', createRota?: Maybe<{ __typename?: 'Rota', id?: Maybe<string>, name?: Maybe<string>, color?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, recurrence?: Maybe<Array<Maybe<{ __typename?: 'Recurrence', startTime?: Maybe<any>, endTime?: Maybe<any>, rule?: Maybe<string> }>>> }> };

export type CreateTagMutationVariables = Exact<{
  tag: TagInput;
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag?: Maybe<{ __typename?: 'Tag', id?: Maybe<string>, name?: Maybe<string>, group?: Maybe<string> }> };

export type CreateTicketMutationVariables = Exact<{
  ticket: TicketInput;
}>;


export type CreateTicketMutation = { __typename?: 'Mutation', createTicket?: Maybe<{ __typename?: 'Ticket', id?: Maybe<string>, ticketNumber?: Maybe<string>, tenantName?: Maybe<string>, subject?: Maybe<string>, details?: Maybe<string>, status?: Maybe<number>, attachFile?: Maybe<boolean>, isReadByAdmin?: Maybe<boolean>, isReadByClient?: Maybe<boolean>, ticketDate?: Maybe<any>, messages?: Maybe<Array<Maybe<{ __typename?: 'TicketMessages', message?: Maybe<string>, requestBy?: Maybe<string>, messageDate?: Maybe<any> }>>> }> };

export type CreateTodoMutationVariables = Exact<{
  todo: TodoInput;
}>;


export type CreateTodoMutation = { __typename?: 'Mutation', createTodo?: Maybe<{ __typename?: 'Todo', id?: Maybe<string>, title?: Maybe<string>, notes?: Maybe<string>, startDate?: Maybe<any>, dueDate?: Maybe<any>, isCompleted?: Maybe<boolean>, isStarred?: Maybe<boolean>, isImportant?: Maybe<boolean>, patientId?: Maybe<string> }> };

export type DeleteAppointmentMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteAppointmentMutation = { __typename?: 'Mutation', deleteAppointment?: Maybe<string> };

export type DeleteDrugMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteDrugMutation = { __typename?: 'Mutation', deleteDrug?: Maybe<{ __typename?: 'Drug', id?: Maybe<string>, atcCode?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string>, form?: Maybe<string> }> };

export type DeleteGrantorMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteGrantorMutation = { __typename?: 'Mutation', deleteGrantor?: Maybe<{ __typename?: 'Grantor', id?: Maybe<string>, name?: Maybe<string> }> };

export type DeleteLocationMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteLocationMutation = { __typename?: 'Mutation', deleteLocation?: Maybe<{ __typename?: 'Location', id?: Maybe<string>, name?: Maybe<string>, contact?: Maybe<string>, address?: Maybe<string>, type?: Maybe<string>, subLocations?: Maybe<Array<Maybe<string>>> }> };

export type DeleteLookupMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteLookupMutation = { __typename?: 'Mutation', deleteLookup?: Maybe<{ __typename?: 'Lookup', id?: Maybe<string>, tenantId?: Maybe<string>, groupKey?: Maybe<string>, value?: Maybe<string>, symbol?: Maybe<string>, text?: Maybe<string>, description?: Maybe<string>, cultureName?: Maybe<string>, parentValue?: Maybe<string>, parentId?: Maybe<string>, createdDate?: Maybe<any>, modifiedDate?: Maybe<any>, order?: Maybe<number>, predefined?: Maybe<boolean> }> };

export type DeleteMediaFilesMutationVariables = Exact<{
  id: Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>;
}>;


export type DeleteMediaFilesMutation = { __typename?: 'Mutation', deleteMediaFiles?: Maybe<Array<Maybe<string>>> };

export type DeleteMedicalActivityMutationVariables = Exact<{
  patientId: Scalars['String'];
  speciality: Scalars['String'];
  conditionId: Scalars['String'];
  activityType?: Maybe<Scalars['String']>;
  activityId?: Maybe<Scalars['String']>;
}>;


export type DeleteMedicalActivityMutation = { __typename?: 'Mutation', deleteMedicalActivity?: Maybe<string> };

export type DeletePatientMutationVariables = Exact<{
  patientId: Scalars['String'];
}>;


export type DeletePatientMutation = { __typename?: 'Mutation', deletePatient?: Maybe<string> };

export type DeleteRotaMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteRotaMutation = { __typename?: 'Mutation', deleteRota?: Maybe<string> };

export type DeleteSubLocationMutationVariables = Exact<{
  id: Scalars['String'];
  subLocation: Scalars['String'];
}>;


export type DeleteSubLocationMutation = { __typename?: 'Mutation', deleteSubLocation?: Maybe<{ __typename?: 'Location', id?: Maybe<string>, name?: Maybe<string>, contact?: Maybe<string>, address?: Maybe<string>, type?: Maybe<string>, subLocations?: Maybe<Array<Maybe<string>>> }> };

export type DeleteTagMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteTagMutation = { __typename?: 'Mutation', deleteTag?: Maybe<{ __typename?: 'Tag', id?: Maybe<string>, name?: Maybe<string>, group?: Maybe<string> }> };

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteTodoMutation = { __typename?: 'Mutation', deleteTodo?: Maybe<{ __typename?: 'Todo', id?: Maybe<string>, title?: Maybe<string>, notes?: Maybe<string>, startDate?: Maybe<any>, dueDate?: Maybe<any>, isCompleted?: Maybe<boolean>, isStarred?: Maybe<boolean>, isImportant?: Maybe<boolean>, patientId?: Maybe<string> }> };

export type RemarkDuplicateActivityMutationVariables = Exact<{
  patientId: Scalars['String'];
  speciality: Scalars['String'];
  conditionId: Scalars['String'];
  activityType?: Maybe<Scalars['String']>;
  activityId?: Maybe<Scalars['String']>;
  isDuplicate?: Maybe<Scalars['Boolean']>;
}>;


export type RemarkDuplicateActivityMutation = { __typename?: 'Mutation', remarkDuplicateActivity?: Maybe<string> };

export type RemarkDuplicatePatientMutationVariables = Exact<{
  patientId: Scalars['String'];
  isDuplicate?: Maybe<Scalars['Boolean']>;
}>;


export type RemarkDuplicatePatientMutation = { __typename?: 'Mutation', remarkDuplicatePatient?: Maybe<string> };

export type UpdateAppointmentMutationVariables = Exact<{
  appointment: AppointmentInput;
}>;


export type UpdateAppointmentMutation = { __typename?: 'Mutation', updateAppointment?: Maybe<{ __typename?: 'Appointment', id?: Maybe<string>, subject?: Maybe<string>, startTime?: Maybe<any>, endTime?: Maybe<any>, reason?: Maybe<string>, color?: Maybe<string>, note?: Maybe<string>, conditionId?: Maybe<string>, speciality?: Maybe<string>, recurrenceId?: Maybe<string>, recurrenceException?: Maybe<string>, recurrenceRule?: Maybe<string>, isBlock?: Maybe<boolean>, isReadonly?: Maybe<boolean>, isAllDay?: Maybe<boolean>, type?: Maybe<string>, status?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, contact?: Maybe<{ __typename?: 'Contact', id?: Maybe<string>, isDuplicate?: Maybe<boolean>, name?: Maybe<string>, gender?: Maybe<string>, telephone?: Maybe<string>, contactNumbers?: Maybe<Array<Maybe<string>>>, birthDate?: Maybe<any>, occupation?: Maybe<string>, partner?: Maybe<string>, country?: Maybe<string>, city?: Maybe<string>, identityNumber?: Maybe<string>, email?: Maybe<string>, createdOn?: Maybe<any>, modified?: Maybe<any>, contactType?: Maybe<string> }> }> };

export type UpdateCardiologyConditionMutationVariables = Exact<{
  patientId: Scalars['String'];
  condition: CardiologyConditionInput;
}>;


export type UpdateCardiologyConditionMutation = { __typename?: 'Mutation', updateCardiologyCondition?: Maybe<{ __typename?: 'CardiologyCondition', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, opened?: Maybe<any>, closed?: Maybe<any>, isDuplicate?: Maybe<boolean>, isHidden?: Maybe<boolean>, height?: Maybe<number>, weight?: Maybe<number>, bmi?: Maybe<number>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, cheifComplaint?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, presentHistory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, differentialDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>>, activities?: Maybe<{ __typename?: 'CardiologyActivities', followups?: Maybe<Array<Maybe<{ __typename?: 'CardiologyFollowup', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, isHidden?: Maybe<boolean>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, subjective?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medication?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, assessment?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>>, cardiologyClinicalExamination?: Maybe<{ __typename?: 'CardiologyClinicalExamination', bp?: Maybe<string>, hr?: Maybe<string>, pulse?: Maybe<string>, pulseClassification?: Maybe<string>, sound?: Maybe<string>, value?: Maybe<string>, intensity?: Maybe<string>, pericardialFriction?: Maybe<boolean>, lungAuscultation?: Maybe<string>, aspect?: Maybe<string>, puls?: Maybe<boolean>, rightSuperior?: Maybe<boolean>, rightTransverse?: Maybe<boolean>, rightInferior?: Maybe<boolean>, leftSuperior?: Maybe<boolean>, leftTransverse?: Maybe<boolean>, leftInferior?: Maybe<boolean>, hepatoJugularReflux?: Maybe<boolean>, neckCarotidMurmur?: Maybe<string>, soft?: Maybe<boolean>, tender?: Maybe<string>, hepatomegaly?: Maybe<boolean>, ascites?: Maybe<boolean> }> }>>>, operations?: Maybe<Array<Maybe<{ __typename?: 'CardiologyOperation', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, department?: Maybe<string>, code?: Maybe<Array<Maybe<string>>>, operationDetails?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, anesthesia?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationType?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPerformed?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPostDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPreFindings?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationCategory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, surgeons?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }>>> }>, cardiologyClinicalExamination?: Maybe<{ __typename?: 'CardiologyClinicalExamination', bp?: Maybe<string>, hr?: Maybe<string>, pulse?: Maybe<string>, pulseClassification?: Maybe<string>, sound?: Maybe<string>, value?: Maybe<string>, intensity?: Maybe<string>, pericardialFriction?: Maybe<boolean>, lungAuscultation?: Maybe<string>, aspect?: Maybe<string>, puls?: Maybe<boolean>, rightSuperior?: Maybe<boolean>, rightTransverse?: Maybe<boolean>, rightInferior?: Maybe<boolean>, leftSuperior?: Maybe<boolean>, leftTransverse?: Maybe<boolean>, leftInferior?: Maybe<boolean>, hepatoJugularReflux?: Maybe<boolean>, neckCarotidMurmur?: Maybe<string>, soft?: Maybe<boolean>, tender?: Maybe<string>, hepatomegaly?: Maybe<boolean>, ascites?: Maybe<boolean> }> }> };

export type UpdateCardiologyFollowupMutationVariables = Exact<{
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  replacedConditionId?: Maybe<Scalars['String']>;
  followup: CardiologyFollowupInput;
}>;


export type UpdateCardiologyFollowupMutation = { __typename?: 'Mutation', updateCardiologyFollowup?: Maybe<{ __typename?: 'CardiologyFollowup', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, isHidden?: Maybe<boolean>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, subjective?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medication?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, assessment?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>>, cardiologyClinicalExamination?: Maybe<{ __typename?: 'CardiologyClinicalExamination', bp?: Maybe<string>, hr?: Maybe<string>, pulse?: Maybe<string>, pulseClassification?: Maybe<string>, sound?: Maybe<string>, value?: Maybe<string>, intensity?: Maybe<string>, pericardialFriction?: Maybe<boolean>, lungAuscultation?: Maybe<string>, aspect?: Maybe<string>, puls?: Maybe<boolean>, rightSuperior?: Maybe<boolean>, rightTransverse?: Maybe<boolean>, rightInferior?: Maybe<boolean>, leftSuperior?: Maybe<boolean>, leftTransverse?: Maybe<boolean>, leftInferior?: Maybe<boolean>, hepatoJugularReflux?: Maybe<boolean>, neckCarotidMurmur?: Maybe<string>, soft?: Maybe<boolean>, tender?: Maybe<string>, hepatomegaly?: Maybe<boolean>, ascites?: Maybe<boolean> }> }> };

export type UpdateCardiologyMedicalHistoryMutationVariables = Exact<{
  patientId: Scalars['String'];
  medicalHistory: CardiologyMedicalHistoryInput;
}>;


export type UpdateCardiologyMedicalHistoryMutation = { __typename?: 'Mutation', updateCardiologyMedicalHistory?: Maybe<{ __typename?: 'CardiologyMedicalHistory', alerts?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, allergies?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, familyHistory?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, medicalIssues?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, cardioVascular?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, gi?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, endocrinology?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, lungDiseases?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, neurology?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, physiomaticDisorder?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, riskFactors?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, pastMedication?: Maybe<{ __typename?: 'MedicalHistoryMedication', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>, presentMedication?: Maybe<{ __typename?: 'MedicalHistoryMedication', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>, surgicalHistory?: Maybe<{ __typename?: 'CardiologyMedicalHistorySurgery', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'CardiologySurgicalHistory', note?: Maybe<string>, type?: Maybe<string>, when?: Maybe<any>, what?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>>> }> }> };

export type UpdateCardiologyOperationMutationVariables = Exact<{
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  replacedConditionId?: Maybe<Scalars['String']>;
  operation: CardiologyOperationInput;
}>;


export type UpdateCardiologyOperationMutation = { __typename?: 'Mutation', updateCardiologyOperation?: Maybe<{ __typename?: 'CardiologyOperation', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, department?: Maybe<string>, code?: Maybe<Array<Maybe<string>>>, operationDetails?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, anesthesia?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationType?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPerformed?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPostDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPreFindings?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationCategory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, surgeons?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }> };

export type UpdateContactMutationVariables = Exact<{
  contact: ContactInput;
}>;


export type UpdateContactMutation = { __typename?: 'Mutation', updateContact?: Maybe<{ __typename?: 'Contact', id?: Maybe<string>, isDuplicate?: Maybe<boolean>, name?: Maybe<string>, gender?: Maybe<string>, telephone?: Maybe<string>, contactNumbers?: Maybe<Array<Maybe<string>>>, birthDate?: Maybe<any>, occupation?: Maybe<string>, partner?: Maybe<string>, country?: Maybe<string>, city?: Maybe<string>, identityNumber?: Maybe<string>, email?: Maybe<string>, createdOn?: Maybe<any>, modified?: Maybe<any>, contactType?: Maybe<string> }> };

export type UpdateDrugMutationVariables = Exact<{
  drug: DrugInput;
}>;


export type UpdateDrugMutation = { __typename?: 'Mutation', updateDrug?: Maybe<{ __typename?: 'Drug', id?: Maybe<string>, atcCode?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string>, form?: Maybe<string> }> };

export type UpdateGeneralConditionMutationVariables = Exact<{
  patientId: Scalars['String'];
  condition: GeneralConditionInput;
}>;


export type UpdateGeneralConditionMutation = { __typename?: 'Mutation', updateGeneralCondition?: Maybe<{ __typename?: 'GeneralCondition', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, opened?: Maybe<any>, closed?: Maybe<any>, isDuplicate?: Maybe<boolean>, isHidden?: Maybe<boolean>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, cheifComplaint?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, presentHistory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, differentialDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>>, activities?: Maybe<{ __typename?: 'GeneralActivities', followups?: Maybe<Array<Maybe<{ __typename?: 'GeneralFollowup', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, isHidden?: Maybe<boolean>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, subjective?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medication?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, assessment?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>>>, operations?: Maybe<Array<Maybe<{ __typename?: 'GeneralOperation', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, department?: Maybe<string>, code?: Maybe<Array<Maybe<string>>>, operationDetails?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, anesthesia?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationType?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPerformed?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPostDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPreFindings?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationCategory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, surgeons?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }>>> }> }> };

export type UpdateGeneralFollowupMutationVariables = Exact<{
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  replacedConditionId?: Maybe<Scalars['String']>;
  followup: GeneralFollowupInput;
}>;


export type UpdateGeneralFollowupMutation = { __typename?: 'Mutation', updateGeneralFollowup?: Maybe<{ __typename?: 'GeneralFollowup', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, isHidden?: Maybe<boolean>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, subjective?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medication?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, assessment?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }> };

export type UpdateGeneralMedicalHistoryMutationVariables = Exact<{
  patientId: Scalars['String'];
  medicalHistory: GeneralMedicalHistoryInput;
}>;


export type UpdateGeneralMedicalHistoryMutation = { __typename?: 'Mutation', updateGeneralMedicalHistory?: Maybe<{ __typename?: 'GeneralMedicalHistory', alerts?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, allergies?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, familyHistory?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, medicalIssues?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, pastMedication?: Maybe<{ __typename?: 'MedicalHistoryMedication', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>, presentMedication?: Maybe<{ __typename?: 'MedicalHistoryMedication', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>, surgicalHistory?: Maybe<{ __typename?: 'MedicalHistorySurgery', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'SurgicalHistory', note?: Maybe<string>, what?: Maybe<string>, when?: Maybe<any> }>>> }> }> };

export type UpdateGeneralOperationMutationVariables = Exact<{
  patientId: Scalars['String'];
  conditionId: Scalars['String'];
  replacedConditionId?: Maybe<Scalars['String']>;
  operation: GeneralOperationInput;
}>;


export type UpdateGeneralOperationMutation = { __typename?: 'Mutation', updateGeneralOperation?: Maybe<{ __typename?: 'GeneralOperation', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, department?: Maybe<string>, code?: Maybe<Array<Maybe<string>>>, operationDetails?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, anesthesia?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationType?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPerformed?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPostDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPreFindings?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationCategory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, surgeons?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }> };

export type UpdateGrantorMutationVariables = Exact<{
  grantor: GrantorInput;
}>;


export type UpdateGrantorMutation = { __typename?: 'Mutation', updateGrantor?: Maybe<{ __typename?: 'Grantor', id?: Maybe<string>, name?: Maybe<string> }> };

export type UpdateLocationMutationVariables = Exact<{
  location: LocationInput;
}>;


export type UpdateLocationMutation = { __typename?: 'Mutation', updateLocation?: Maybe<{ __typename?: 'Location', id?: Maybe<string>, name?: Maybe<string>, contact?: Maybe<string>, address?: Maybe<string>, type?: Maybe<string>, subLocations?: Maybe<Array<Maybe<string>>> }> };

export type UpdateLookupMutationVariables = Exact<{
  lookup: LookupInput;
}>;


export type UpdateLookupMutation = { __typename?: 'Mutation', updateLookup?: Maybe<{ __typename?: 'Lookup', id?: Maybe<string>, tenantId?: Maybe<string>, groupKey?: Maybe<string>, value?: Maybe<string>, symbol?: Maybe<string>, text?: Maybe<string>, description?: Maybe<string>, cultureName?: Maybe<string>, parentValue?: Maybe<string>, parentId?: Maybe<string>, createdDate?: Maybe<any>, modifiedDate?: Maybe<any>, order?: Maybe<number>, predefined?: Maybe<boolean> }> };

export type UpdateMediaFilesMutationVariables = Exact<{
  mediaFiles: Array<Maybe<MediaFileInput>> | Maybe<MediaFileInput>;
}>;


export type UpdateMediaFilesMutation = { __typename?: 'Mutation', updateMediaFiles?: Maybe<Array<Maybe<{ __typename?: 'MediaFile', id?: Maybe<string>, name?: Maybe<string>, path?: Maybe<string>, type?: Maybe<string>, size?: Maybe<string>, tenantId?: Maybe<string>, patientId?: Maybe<string>, patientName?: Maybe<string>, speciality?: Maybe<string>, conditionId?: Maybe<string>, activityType?: Maybe<string>, activityId?: Maybe<string>, ticketNumber?: Maybe<string>, isDeleted?: Maybe<boolean>, modified?: Maybe<any>, deletedOn?: Maybe<any>, systemTagging?: Maybe<Array<Maybe<string>>>, tags?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }>>> };

export type UpdateMedicationsMutationVariables = Exact<{
  patientMedications: PatientMedicationsInput;
  patientId: Scalars['String'];
  medicationId: Scalars['String'];
}>;


export type UpdateMedicationsMutation = { __typename?: 'Mutation', updateMedications?: Maybe<{ __typename?: 'PatientMedications', medicationId?: Maybe<string>, patientId?: Maybe<string>, conditionId?: Maybe<string>, followupId?: Maybe<string>, startTime?: Maybe<any>, endTime?: Maybe<any>, isActive?: Maybe<boolean>, reason?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }>, history?: Maybe<Array<Maybe<{ __typename?: 'PatientMedicationsHistory', startDate?: Maybe<any>, endDate?: Maybe<any>, duration?: Maybe<string>, frequency?: Maybe<string>, note?: Maybe<string>, status?: Maybe<string> }>>> }> };

export type UpdatePatientMutationVariables = Exact<{
  patient: PatientInput;
}>;


export type UpdatePatientMutation = { __typename?: 'Mutation', updatePatient?: Maybe<{ __typename?: 'Patient', id?: Maybe<string>, name?: Maybe<string>, gender?: Maybe<string>, telephone?: Maybe<string>, contactNumbers?: Maybe<Array<Maybe<string>>>, birthDate?: Maybe<any>, occupation?: Maybe<string>, partner?: Maybe<string>, country?: Maybe<string>, city?: Maybe<string>, identityNumber?: Maybe<string>, email?: Maybe<string>, createdOn?: Maybe<any>, modified?: Maybe<any>, isDuplicate?: Maybe<boolean>, patientInfo?: Maybe<{ __typename?: 'PatientInfo', bloodType?: Maybe<string>, maritalStatus?: Maybe<string>, emergancyContact?: Maybe<string>, entryDate?: Maybe<any>, fileNumber?: Maybe<string>, referral?: Maybe<Array<Maybe<string>>>, lastSeen?: Maybe<any>, totalDigitizedData?: Maybe<number>, flags?: Maybe<Array<Maybe<string>>>, createdOn?: Maybe<any>, modified?: Maybe<any>, grantors?: Maybe<Array<Maybe<{ __typename?: 'Grantor', id?: Maybe<string>, name?: Maybe<string> }>>>, tags?: Maybe<Array<Maybe<{ __typename?: 'Tag', id?: Maybe<string>, name?: Maybe<string>, group?: Maybe<string> }>>>, specialities?: Maybe<{ __typename?: 'Speciality', general?: Maybe<{ __typename?: 'General', conditions?: Maybe<Array<Maybe<{ __typename?: 'GeneralCondition', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, opened?: Maybe<any>, closed?: Maybe<any>, isDuplicate?: Maybe<boolean>, isHidden?: Maybe<boolean>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, cheifComplaint?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, presentHistory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, differentialDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>>, activities?: Maybe<{ __typename?: 'GeneralActivities', followups?: Maybe<Array<Maybe<{ __typename?: 'GeneralFollowup', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, isHidden?: Maybe<boolean>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, subjective?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medication?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, assessment?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>>>, operations?: Maybe<Array<Maybe<{ __typename?: 'GeneralOperation', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, department?: Maybe<string>, code?: Maybe<Array<Maybe<string>>>, operationDetails?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, anesthesia?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationType?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPerformed?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPostDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPreFindings?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationCategory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, surgeons?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }>>> }> }>>>, medicalHistory?: Maybe<{ __typename?: 'GeneralMedicalHistory', alerts?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, allergies?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, familyHistory?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, medicalIssues?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, pastMedication?: Maybe<{ __typename?: 'MedicalHistoryMedication', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>, presentMedication?: Maybe<{ __typename?: 'MedicalHistoryMedication', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>, surgicalHistory?: Maybe<{ __typename?: 'MedicalHistorySurgery', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'SurgicalHistory', note?: Maybe<string>, what?: Maybe<string>, when?: Maybe<any> }>>> }> }> }>, cardiology?: Maybe<{ __typename?: 'Cardiology', conditions?: Maybe<Array<Maybe<{ __typename?: 'CardiologyCondition', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, opened?: Maybe<any>, closed?: Maybe<any>, isDuplicate?: Maybe<boolean>, isHidden?: Maybe<boolean>, height?: Maybe<number>, weight?: Maybe<number>, bmi?: Maybe<number>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, cheifComplaint?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, presentHistory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, differentialDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>>, activities?: Maybe<{ __typename?: 'CardiologyActivities', followups?: Maybe<Array<Maybe<{ __typename?: 'CardiologyFollowup', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, isHidden?: Maybe<boolean>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, subjective?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medication?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, assessment?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>>, cardiologyClinicalExamination?: Maybe<{ __typename?: 'CardiologyClinicalExamination', bp?: Maybe<string>, hr?: Maybe<string>, pulse?: Maybe<string>, pulseClassification?: Maybe<string>, sound?: Maybe<string>, value?: Maybe<string>, intensity?: Maybe<string>, pericardialFriction?: Maybe<boolean>, lungAuscultation?: Maybe<string>, aspect?: Maybe<string>, puls?: Maybe<boolean>, rightSuperior?: Maybe<boolean>, rightTransverse?: Maybe<boolean>, rightInferior?: Maybe<boolean>, leftSuperior?: Maybe<boolean>, leftTransverse?: Maybe<boolean>, leftInferior?: Maybe<boolean>, hepatoJugularReflux?: Maybe<boolean>, neckCarotidMurmur?: Maybe<string>, soft?: Maybe<boolean>, tender?: Maybe<string>, hepatomegaly?: Maybe<boolean>, ascites?: Maybe<boolean> }> }>>>, operations?: Maybe<Array<Maybe<{ __typename?: 'CardiologyOperation', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, department?: Maybe<string>, code?: Maybe<Array<Maybe<string>>>, operationDetails?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, anesthesia?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationType?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPerformed?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPostDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPreFindings?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationCategory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, surgeons?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }>>> }>, cardiologyClinicalExamination?: Maybe<{ __typename?: 'CardiologyClinicalExamination', bp?: Maybe<string>, hr?: Maybe<string>, pulse?: Maybe<string>, pulseClassification?: Maybe<string>, sound?: Maybe<string>, value?: Maybe<string>, intensity?: Maybe<string>, pericardialFriction?: Maybe<boolean>, lungAuscultation?: Maybe<string>, aspect?: Maybe<string>, puls?: Maybe<boolean>, rightSuperior?: Maybe<boolean>, rightTransverse?: Maybe<boolean>, rightInferior?: Maybe<boolean>, leftSuperior?: Maybe<boolean>, leftTransverse?: Maybe<boolean>, leftInferior?: Maybe<boolean>, hepatoJugularReflux?: Maybe<boolean>, neckCarotidMurmur?: Maybe<string>, soft?: Maybe<boolean>, tender?: Maybe<string>, hepatomegaly?: Maybe<boolean>, ascites?: Maybe<boolean> }> }>>>, medicalHistory?: Maybe<{ __typename?: 'CardiologyMedicalHistory', alerts?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, allergies?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, familyHistory?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, medicalIssues?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, cardioVascular?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, gi?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, endocrinology?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, lungDiseases?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, neurology?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, physiomaticDisorder?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, riskFactors?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, pastMedication?: Maybe<{ __typename?: 'MedicalHistoryMedication', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>, presentMedication?: Maybe<{ __typename?: 'MedicalHistoryMedication', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>, surgicalHistory?: Maybe<{ __typename?: 'CardiologyMedicalHistorySurgery', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'CardiologySurgicalHistory', note?: Maybe<string>, type?: Maybe<string>, when?: Maybe<any>, what?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>>> }> }> }> }> }> }> };

export type UpdateRotaMutationVariables = Exact<{
  rota: RotaInput;
}>;


export type UpdateRotaMutation = { __typename?: 'Mutation', updateRota?: Maybe<{ __typename?: 'Rota', id?: Maybe<string>, name?: Maybe<string>, color?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, recurrence?: Maybe<Array<Maybe<{ __typename?: 'Recurrence', startTime?: Maybe<any>, endTime?: Maybe<any>, rule?: Maybe<string> }>>> }> };

export type UpdateScheduleMutationVariables = Exact<{
  schedule: ScheduleInput;
}>;


export type UpdateScheduleMutation = { __typename?: 'Mutation', updateSchedule?: Maybe<{ __typename?: 'Schedule', id?: Maybe<string>, startHour?: Maybe<string>, endHour?: Maybe<string>, displayRota?: Maybe<boolean> }> };

export type UpdateSettingsMutationVariables = Exact<{
  settings: SettingsInput;
}>;


export type UpdateSettingsMutation = { __typename?: 'Mutation', updateSettings?: Maybe<{ __typename?: 'Settings', id?: Maybe<string>, specialties?: Maybe<Array<Maybe<string>>> }> };

export type UpdateTagMutationVariables = Exact<{
  tag: TagInput;
}>;


export type UpdateTagMutation = { __typename?: 'Mutation', updateTag?: Maybe<{ __typename?: 'Tag', id?: Maybe<string>, name?: Maybe<string>, group?: Maybe<string> }> };

export type UpdateTicketMutationVariables = Exact<{
  ticket: TicketInput;
  broadcast?: Maybe<Scalars['Boolean']>;
}>;


export type UpdateTicketMutation = { __typename?: 'Mutation', updateTicket?: Maybe<{ __typename?: 'Ticket', id?: Maybe<string>, ticketNumber?: Maybe<string>, tenantName?: Maybe<string>, subject?: Maybe<string>, details?: Maybe<string>, status?: Maybe<number>, attachFile?: Maybe<boolean>, isReadByAdmin?: Maybe<boolean>, isReadByClient?: Maybe<boolean>, ticketDate?: Maybe<any>, messages?: Maybe<Array<Maybe<{ __typename?: 'TicketMessages', message?: Maybe<string>, requestBy?: Maybe<string>, messageDate?: Maybe<any> }>>> }> };

export type UpdateTicketAdminMutationVariables = Exact<{
  ticket: TicketInput;
  broadcast?: Maybe<Scalars['Boolean']>;
}>;


export type UpdateTicketAdminMutation = { __typename?: 'Mutation', updateTicketAdmin?: Maybe<{ __typename?: 'Ticket', id?: Maybe<string>, ticketNumber?: Maybe<string>, tenantName?: Maybe<string>, subject?: Maybe<string>, details?: Maybe<string>, status?: Maybe<number>, attachFile?: Maybe<boolean>, isReadByAdmin?: Maybe<boolean>, isReadByClient?: Maybe<boolean>, ticketDate?: Maybe<any>, messages?: Maybe<Array<Maybe<{ __typename?: 'TicketMessages', message?: Maybe<string>, requestBy?: Maybe<string>, messageDate?: Maybe<any> }>>> }> };

export type UpdateTodoMutationVariables = Exact<{
  todo: TodoInput;
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo?: Maybe<{ __typename?: 'Todo', id?: Maybe<string>, title?: Maybe<string>, notes?: Maybe<string>, startDate?: Maybe<any>, dueDate?: Maybe<any>, isCompleted?: Maybe<boolean>, isStarred?: Maybe<boolean>, isImportant?: Maybe<boolean>, patientId?: Maybe<string> }> };

export type ActivityMediaFilesQueryVariables = Exact<{
  patientId: Scalars['String'];
  speciality?: Maybe<Scalars['String']>;
  conditionId?: Maybe<Scalars['String']>;
  activitType?: Maybe<Scalars['String']>;
  activityId?: Maybe<Scalars['String']>;
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
}>;


export type ActivityMediaFilesQuery = { __typename?: 'Query', activityMediaFiles?: Maybe<Array<Maybe<{ __typename?: 'MediaFile', id?: Maybe<string>, name?: Maybe<string>, path?: Maybe<string>, type?: Maybe<string>, size?: Maybe<string>, tenantId?: Maybe<string>, patientId?: Maybe<string>, patientName?: Maybe<string>, speciality?: Maybe<string>, conditionId?: Maybe<string>, activityType?: Maybe<string>, activityId?: Maybe<string>, ticketNumber?: Maybe<string>, isDeleted?: Maybe<boolean>, modified?: Maybe<any>, deletedOn?: Maybe<any>, systemTagging?: Maybe<Array<Maybe<string>>>, tags?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }>>> };

export type AllTicketsQueryVariables = Exact<{
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  descending?: Maybe<Scalars['Boolean']>;
  sortBy?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
}>;


export type AllTicketsQuery = { __typename?: 'Query', allTickets?: Maybe<{ __typename?: 'PageResultTicket', count?: Maybe<any>, items?: Maybe<Array<Maybe<{ __typename?: 'Ticket', id?: Maybe<string>, ticketNumber?: Maybe<string>, tenantName?: Maybe<string>, subject?: Maybe<string>, details?: Maybe<string>, status?: Maybe<number>, attachFile?: Maybe<boolean>, isReadByAdmin?: Maybe<boolean>, isReadByClient?: Maybe<boolean>, ticketDate?: Maybe<any>, messages?: Maybe<Array<Maybe<{ __typename?: 'TicketMessages', message?: Maybe<string>, requestBy?: Maybe<string>, messageDate?: Maybe<any> }>>> }>>> }> };

export type AppointmentQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type AppointmentQuery = { __typename?: 'Query', appointment?: Maybe<{ __typename?: 'Appointment', id?: Maybe<string>, subject?: Maybe<string>, startTime?: Maybe<any>, endTime?: Maybe<any>, reason?: Maybe<string>, color?: Maybe<string>, note?: Maybe<string>, conditionId?: Maybe<string>, speciality?: Maybe<string>, recurrenceId?: Maybe<string>, recurrenceException?: Maybe<string>, recurrenceRule?: Maybe<string>, isBlock?: Maybe<boolean>, isReadonly?: Maybe<boolean>, isAllDay?: Maybe<boolean>, type?: Maybe<string>, status?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, contact?: Maybe<{ __typename?: 'Contact', id?: Maybe<string>, isDuplicate?: Maybe<boolean>, name?: Maybe<string>, gender?: Maybe<string>, telephone?: Maybe<string>, contactNumbers?: Maybe<Array<Maybe<string>>>, birthDate?: Maybe<any>, occupation?: Maybe<string>, partner?: Maybe<string>, country?: Maybe<string>, city?: Maybe<string>, identityNumber?: Maybe<string>, email?: Maybe<string>, createdOn?: Maybe<any>, modified?: Maybe<any>, contactType?: Maybe<string> }> }> };

export type AppointmentsQueryVariables = Exact<{
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  sortBy?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  descending?: Maybe<Scalars['Boolean']>;
}>;


export type AppointmentsQuery = { __typename?: 'Query', appointments?: Maybe<Array<Maybe<{ __typename?: 'Appointment', id?: Maybe<string>, subject?: Maybe<string>, startTime?: Maybe<any>, endTime?: Maybe<any>, reason?: Maybe<string>, color?: Maybe<string>, note?: Maybe<string>, conditionId?: Maybe<string>, speciality?: Maybe<string>, recurrenceId?: Maybe<string>, recurrenceException?: Maybe<string>, recurrenceRule?: Maybe<string>, isBlock?: Maybe<boolean>, isReadonly?: Maybe<boolean>, isAllDay?: Maybe<boolean>, type?: Maybe<string>, status?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, contact?: Maybe<{ __typename?: 'Contact', id?: Maybe<string>, isDuplicate?: Maybe<boolean>, name?: Maybe<string>, gender?: Maybe<string>, telephone?: Maybe<string>, contactNumbers?: Maybe<Array<Maybe<string>>>, birthDate?: Maybe<any>, occupation?: Maybe<string>, partner?: Maybe<string>, country?: Maybe<string>, city?: Maybe<string>, identityNumber?: Maybe<string>, email?: Maybe<string>, createdOn?: Maybe<any>, modified?: Maybe<any>, contactType?: Maybe<string> }> }>>> };

export type ConditionsQueryVariables = Exact<{ [key: string]: never; }>;


export type ConditionsQuery = { __typename?: 'Query', conditions?: Maybe<Array<Maybe<{ __typename?: 'Condition', name?: Maybe<string>, type?: Maybe<string>, closed?: Maybe<any>, opened?: Maybe<any>, status?: Maybe<any> }>>> };

export type ContactQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ContactQuery = { __typename?: 'Query', contact?: Maybe<{ __typename?: 'Contact', id?: Maybe<string>, isDuplicate?: Maybe<boolean>, name?: Maybe<string>, gender?: Maybe<string>, telephone?: Maybe<string>, contactNumbers?: Maybe<Array<Maybe<string>>>, birthDate?: Maybe<any>, occupation?: Maybe<string>, partner?: Maybe<string>, country?: Maybe<string>, city?: Maybe<string>, identityNumber?: Maybe<string>, email?: Maybe<string>, createdOn?: Maybe<any>, modified?: Maybe<any>, contactType?: Maybe<string> }> };

export type ContactsQueryVariables = Exact<{
  sortBy?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  descending?: Maybe<Scalars['Boolean']>;
}>;


export type ContactsQuery = { __typename?: 'Query', contacts?: Maybe<Array<Maybe<{ __typename?: 'Contact', id?: Maybe<string>, isDuplicate?: Maybe<boolean>, name?: Maybe<string>, gender?: Maybe<string>, telephone?: Maybe<string>, contactNumbers?: Maybe<Array<Maybe<string>>>, birthDate?: Maybe<any>, occupation?: Maybe<string>, partner?: Maybe<string>, country?: Maybe<string>, city?: Maybe<string>, identityNumber?: Maybe<string>, email?: Maybe<string>, createdOn?: Maybe<any>, modified?: Maybe<any>, contactType?: Maybe<string> }>>> };

export type ContactsTotalQueryVariables = Exact<{
  sortBy?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  descending?: Maybe<Scalars['Boolean']>;
}>;


export type ContactsTotalQuery = { __typename?: 'Query', contactsTotal?: Maybe<number> };

export type DrugQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type DrugQuery = { __typename?: 'Query', drug?: Maybe<{ __typename?: 'Drug', id?: Maybe<string>, atcCode?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string>, form?: Maybe<string> }> };

export type DrugsQueryVariables = Exact<{
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
}>;


export type DrugsQuery = { __typename?: 'Query', drugs?: Maybe<Array<Maybe<{ __typename?: 'Drug', id?: Maybe<string>, atcCode?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string>, form?: Maybe<string> }>>> };

export type GetAppointmentsEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAppointmentsEventsQuery = { __typename?: 'Query', getAppointmentsEvents?: Maybe<Array<Maybe<{ __typename?: 'AppointmentEventType', event?: Maybe<string>, sentAt?: Maybe<any>, sub?: Maybe<string>, content?: Maybe<{ __typename?: 'Appointment', id?: Maybe<string>, subject?: Maybe<string>, startTime?: Maybe<any>, endTime?: Maybe<any>, reason?: Maybe<string>, color?: Maybe<string>, note?: Maybe<string>, conditionId?: Maybe<string>, speciality?: Maybe<string>, recurrenceId?: Maybe<string>, recurrenceException?: Maybe<string>, recurrenceRule?: Maybe<string>, isBlock?: Maybe<boolean>, isReadonly?: Maybe<boolean>, isAllDay?: Maybe<boolean>, type?: Maybe<string>, status?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, contact?: Maybe<{ __typename?: 'Contact', id?: Maybe<string>, isDuplicate?: Maybe<boolean>, name?: Maybe<string>, gender?: Maybe<string>, telephone?: Maybe<string>, contactNumbers?: Maybe<Array<Maybe<string>>>, birthDate?: Maybe<any>, occupation?: Maybe<string>, partner?: Maybe<string>, country?: Maybe<string>, city?: Maybe<string>, identityNumber?: Maybe<string>, email?: Maybe<string>, createdOn?: Maybe<any>, modified?: Maybe<any>, contactType?: Maybe<string> }> }>, from?: Maybe<{ __typename?: 'EventFromType', id: string, displayName: string }> }>>> };

export type GrantorQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GrantorQuery = { __typename?: 'Query', grantor?: Maybe<{ __typename?: 'Grantor', id?: Maybe<string>, name?: Maybe<string> }> };

export type GrantorsQueryVariables = Exact<{
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
}>;


export type GrantorsQuery = { __typename?: 'Query', grantors?: Maybe<Array<Maybe<{ __typename?: 'Grantor', id?: Maybe<string>, name?: Maybe<string> }>>> };

export type GrantorsTotalQueryVariables = Exact<{
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
}>;


export type GrantorsTotalQuery = { __typename?: 'Query', grantorsTotal?: Maybe<number> };

export type LocationQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type LocationQuery = { __typename?: 'Query', location?: Maybe<{ __typename?: 'Location', id?: Maybe<string>, name?: Maybe<string>, contact?: Maybe<string>, address?: Maybe<string>, type?: Maybe<string>, subLocations?: Maybe<Array<Maybe<string>>> }> };

export type LocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type LocationsQuery = { __typename?: 'Query', locations?: Maybe<Array<Maybe<{ __typename?: 'Location', id?: Maybe<string>, name?: Maybe<string>, contact?: Maybe<string>, address?: Maybe<string>, type?: Maybe<string>, subLocations?: Maybe<Array<Maybe<string>>> }>>> };

export type LookupQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type LookupQuery = { __typename?: 'Query', lookup?: Maybe<{ __typename?: 'Lookup', id?: Maybe<string>, tenantId?: Maybe<string>, groupKey?: Maybe<string>, value?: Maybe<string>, symbol?: Maybe<string>, text?: Maybe<string>, description?: Maybe<string>, cultureName?: Maybe<string>, parentValue?: Maybe<string>, parentId?: Maybe<string>, createdDate?: Maybe<any>, modifiedDate?: Maybe<any>, order?: Maybe<number>, predefined?: Maybe<boolean> }> };

export type LookupByTextQueryVariables = Exact<{
  text: Scalars['String'];
  group: Scalars['String'];
}>;


export type LookupByTextQuery = { __typename?: 'Query', lookupByText?: Maybe<{ __typename?: 'Lookup', id?: Maybe<string>, tenantId?: Maybe<string>, groupKey?: Maybe<string>, value?: Maybe<string>, symbol?: Maybe<string>, text?: Maybe<string>, description?: Maybe<string>, cultureName?: Maybe<string>, parentValue?: Maybe<string>, parentId?: Maybe<string>, createdDate?: Maybe<any>, modifiedDate?: Maybe<any>, order?: Maybe<number>, predefined?: Maybe<boolean> }> };

export type LookupByValueQueryVariables = Exact<{
  value: Scalars['String'];
  group: Scalars['String'];
}>;


export type LookupByValueQuery = { __typename?: 'Query', lookupByValue?: Maybe<{ __typename?: 'Lookup', id?: Maybe<string>, tenantId?: Maybe<string>, groupKey?: Maybe<string>, value?: Maybe<string>, symbol?: Maybe<string>, text?: Maybe<string>, description?: Maybe<string>, cultureName?: Maybe<string>, parentValue?: Maybe<string>, parentId?: Maybe<string>, createdDate?: Maybe<any>, modifiedDate?: Maybe<any>, order?: Maybe<number>, predefined?: Maybe<boolean> }> };

export type LookupsQueryVariables = Exact<{ [key: string]: never; }>;


export type LookupsQuery = { __typename?: 'Query', lookups?: Maybe<Array<Maybe<{ __typename?: 'Lookup', id?: Maybe<string>, tenantId?: Maybe<string>, groupKey?: Maybe<string>, value?: Maybe<string>, symbol?: Maybe<string>, text?: Maybe<string>, description?: Maybe<string>, cultureName?: Maybe<string>, parentValue?: Maybe<string>, parentId?: Maybe<string>, createdDate?: Maybe<any>, modifiedDate?: Maybe<any>, order?: Maybe<number>, predefined?: Maybe<boolean> }>>> };

export type LookupsByGroupQueryVariables = Exact<{
  group: Scalars['String'];
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filterPredefined?: Maybe<Scalars['Boolean']>;
}>;


export type LookupsByGroupQuery = { __typename?: 'Query', lookupsByGroup?: Maybe<Array<Maybe<{ __typename?: 'Lookup', id?: Maybe<string>, tenantId?: Maybe<string>, groupKey?: Maybe<string>, value?: Maybe<string>, symbol?: Maybe<string>, text?: Maybe<string>, description?: Maybe<string>, cultureName?: Maybe<string>, parentValue?: Maybe<string>, parentId?: Maybe<string>, createdDate?: Maybe<any>, modifiedDate?: Maybe<any>, order?: Maybe<number>, predefined?: Maybe<boolean> }>>> };

export type LookupsByGroupTotalQueryVariables = Exact<{
  group: Scalars['String'];
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filterPredefined?: Maybe<Scalars['Boolean']>;
}>;


export type LookupsByGroupTotalQuery = { __typename?: 'Query', lookupsByGroupTotal?: Maybe<number> };

export type LookupsByGroupsQueryVariables = Exact<{
  groups: Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>;
  filterPredefined?: Maybe<Scalars['Boolean']>;
}>;


export type LookupsByGroupsQuery = { __typename?: 'Query', lookupsByGroups?: Maybe<Array<Maybe<{ __typename?: 'Lookup', id?: Maybe<string>, tenantId?: Maybe<string>, groupKey?: Maybe<string>, value?: Maybe<string>, symbol?: Maybe<string>, text?: Maybe<string>, description?: Maybe<string>, cultureName?: Maybe<string>, parentValue?: Maybe<string>, parentId?: Maybe<string>, createdDate?: Maybe<any>, modifiedDate?: Maybe<any>, order?: Maybe<number>, predefined?: Maybe<boolean> }>>> };

export type MediaFileQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type MediaFileQuery = { __typename?: 'Query', mediaFile?: Maybe<{ __typename?: 'MediaFile', id?: Maybe<string>, name?: Maybe<string>, path?: Maybe<string>, type?: Maybe<string>, size?: Maybe<string>, tenantId?: Maybe<string>, patientId?: Maybe<string>, patientName?: Maybe<string>, speciality?: Maybe<string>, conditionId?: Maybe<string>, activityType?: Maybe<string>, activityId?: Maybe<string>, ticketNumber?: Maybe<string>, isDeleted?: Maybe<boolean>, modified?: Maybe<any>, deletedOn?: Maybe<any>, systemTagging?: Maybe<Array<Maybe<string>>>, tags?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }> };

export type MediaFilesQueryVariables = Exact<{ [key: string]: never; }>;


export type MediaFilesQuery = { __typename?: 'Query', mediaFiles?: Maybe<Array<Maybe<{ __typename?: 'MediaFile', id?: Maybe<string>, name?: Maybe<string>, path?: Maybe<string>, type?: Maybe<string>, size?: Maybe<string>, tenantId?: Maybe<string>, patientId?: Maybe<string>, patientName?: Maybe<string>, speciality?: Maybe<string>, conditionId?: Maybe<string>, activityType?: Maybe<string>, activityId?: Maybe<string>, ticketNumber?: Maybe<string>, isDeleted?: Maybe<boolean>, modified?: Maybe<any>, deletedOn?: Maybe<any>, systemTagging?: Maybe<Array<Maybe<string>>>, tags?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }>>> };

export type MessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type MessagesQuery = { __typename?: 'Query', messages?: Maybe<Array<Maybe<{ __typename?: 'MessageType', content: string, sentAt?: Maybe<any>, sub?: Maybe<string>, from?: Maybe<{ __typename?: 'MessageFromType', id: string, displayName: string }> }>>> };

export type PatientQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PatientQuery = { __typename?: 'Query', patient?: Maybe<{ __typename?: 'Patient', id?: Maybe<string>, name?: Maybe<string>, gender?: Maybe<string>, telephone?: Maybe<string>, contactNumbers?: Maybe<Array<Maybe<string>>>, birthDate?: Maybe<any>, occupation?: Maybe<string>, partner?: Maybe<string>, country?: Maybe<string>, city?: Maybe<string>, identityNumber?: Maybe<string>, email?: Maybe<string>, createdOn?: Maybe<any>, modified?: Maybe<any>, isDuplicate?: Maybe<boolean>, patientInfo?: Maybe<{ __typename?: 'PatientInfo', bloodType?: Maybe<string>, maritalStatus?: Maybe<string>, emergancyContact?: Maybe<string>, entryDate?: Maybe<any>, fileNumber?: Maybe<string>, referral?: Maybe<Array<Maybe<string>>>, lastSeen?: Maybe<any>, totalDigitizedData?: Maybe<number>, flags?: Maybe<Array<Maybe<string>>>, createdOn?: Maybe<any>, modified?: Maybe<any>, grantors?: Maybe<Array<Maybe<{ __typename?: 'Grantor', id?: Maybe<string>, name?: Maybe<string> }>>>, tags?: Maybe<Array<Maybe<{ __typename?: 'Tag', id?: Maybe<string>, name?: Maybe<string>, group?: Maybe<string> }>>>, specialities?: Maybe<{ __typename?: 'Speciality', general?: Maybe<{ __typename?: 'General', conditions?: Maybe<Array<Maybe<{ __typename?: 'GeneralCondition', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, opened?: Maybe<any>, closed?: Maybe<any>, isDuplicate?: Maybe<boolean>, isHidden?: Maybe<boolean>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, cheifComplaint?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, presentHistory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, differentialDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>>, activities?: Maybe<{ __typename?: 'GeneralActivities', followups?: Maybe<Array<Maybe<{ __typename?: 'GeneralFollowup', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, isHidden?: Maybe<boolean>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, subjective?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medication?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, assessment?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>>>, operations?: Maybe<Array<Maybe<{ __typename?: 'GeneralOperation', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, department?: Maybe<string>, code?: Maybe<Array<Maybe<string>>>, operationDetails?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, anesthesia?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationType?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPerformed?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPostDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPreFindings?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationCategory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, surgeons?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }>>> }> }>>>, medicalHistory?: Maybe<{ __typename?: 'GeneralMedicalHistory', alerts?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, allergies?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, familyHistory?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, medicalIssues?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, pastMedication?: Maybe<{ __typename?: 'MedicalHistoryMedication', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>, presentMedication?: Maybe<{ __typename?: 'MedicalHistoryMedication', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>, surgicalHistory?: Maybe<{ __typename?: 'MedicalHistorySurgery', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'SurgicalHistory', note?: Maybe<string>, what?: Maybe<string>, when?: Maybe<any> }>>> }> }> }>, cardiology?: Maybe<{ __typename?: 'Cardiology', conditions?: Maybe<Array<Maybe<{ __typename?: 'CardiologyCondition', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, opened?: Maybe<any>, closed?: Maybe<any>, isDuplicate?: Maybe<boolean>, isHidden?: Maybe<boolean>, height?: Maybe<number>, weight?: Maybe<number>, bmi?: Maybe<number>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, cheifComplaint?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, presentHistory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, differentialDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>>, activities?: Maybe<{ __typename?: 'CardiologyActivities', followups?: Maybe<Array<Maybe<{ __typename?: 'CardiologyFollowup', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, isHidden?: Maybe<boolean>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, subjective?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medication?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, assessment?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>>, cardiologyClinicalExamination?: Maybe<{ __typename?: 'CardiologyClinicalExamination', bp?: Maybe<string>, hr?: Maybe<string>, pulse?: Maybe<string>, pulseClassification?: Maybe<string>, sound?: Maybe<string>, value?: Maybe<string>, intensity?: Maybe<string>, pericardialFriction?: Maybe<boolean>, lungAuscultation?: Maybe<string>, aspect?: Maybe<string>, puls?: Maybe<boolean>, rightSuperior?: Maybe<boolean>, rightTransverse?: Maybe<boolean>, rightInferior?: Maybe<boolean>, leftSuperior?: Maybe<boolean>, leftTransverse?: Maybe<boolean>, leftInferior?: Maybe<boolean>, hepatoJugularReflux?: Maybe<boolean>, neckCarotidMurmur?: Maybe<string>, soft?: Maybe<boolean>, tender?: Maybe<string>, hepatomegaly?: Maybe<boolean>, ascites?: Maybe<boolean> }> }>>>, operations?: Maybe<Array<Maybe<{ __typename?: 'CardiologyOperation', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, department?: Maybe<string>, code?: Maybe<Array<Maybe<string>>>, operationDetails?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, anesthesia?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationType?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPerformed?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPostDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPreFindings?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationCategory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, surgeons?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }>>> }>, cardiologyClinicalExamination?: Maybe<{ __typename?: 'CardiologyClinicalExamination', bp?: Maybe<string>, hr?: Maybe<string>, pulse?: Maybe<string>, pulseClassification?: Maybe<string>, sound?: Maybe<string>, value?: Maybe<string>, intensity?: Maybe<string>, pericardialFriction?: Maybe<boolean>, lungAuscultation?: Maybe<string>, aspect?: Maybe<string>, puls?: Maybe<boolean>, rightSuperior?: Maybe<boolean>, rightTransverse?: Maybe<boolean>, rightInferior?: Maybe<boolean>, leftSuperior?: Maybe<boolean>, leftTransverse?: Maybe<boolean>, leftInferior?: Maybe<boolean>, hepatoJugularReflux?: Maybe<boolean>, neckCarotidMurmur?: Maybe<string>, soft?: Maybe<boolean>, tender?: Maybe<string>, hepatomegaly?: Maybe<boolean>, ascites?: Maybe<boolean> }> }>>>, medicalHistory?: Maybe<{ __typename?: 'CardiologyMedicalHistory', alerts?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, allergies?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, familyHistory?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, medicalIssues?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, cardioVascular?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, gi?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, endocrinology?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, lungDiseases?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, neurology?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, physiomaticDisorder?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, riskFactors?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, pastMedication?: Maybe<{ __typename?: 'MedicalHistoryMedication', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>, presentMedication?: Maybe<{ __typename?: 'MedicalHistoryMedication', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>, surgicalHistory?: Maybe<{ __typename?: 'CardiologyMedicalHistorySurgery', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'CardiologySurgicalHistory', note?: Maybe<string>, type?: Maybe<string>, when?: Maybe<any>, what?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>>> }> }> }> }> }> }> };

export type PatientMediaFilesQueryVariables = Exact<{
  patientId: Scalars['String'];
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
}>;


export type PatientMediaFilesQuery = { __typename?: 'Query', patientMediaFiles?: Maybe<Array<Maybe<{ __typename?: 'MediaFile', id?: Maybe<string>, name?: Maybe<string>, path?: Maybe<string>, type?: Maybe<string>, size?: Maybe<string>, tenantId?: Maybe<string>, patientId?: Maybe<string>, patientName?: Maybe<string>, speciality?: Maybe<string>, conditionId?: Maybe<string>, activityType?: Maybe<string>, activityId?: Maybe<string>, ticketNumber?: Maybe<string>, isDeleted?: Maybe<boolean>, modified?: Maybe<any>, deletedOn?: Maybe<any>, systemTagging?: Maybe<Array<Maybe<string>>>, tags?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }>>> };

export type PatientMediaFilesTotalQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  patientId?: Maybe<Scalars['String']>;
}>;


export type PatientMediaFilesTotalQuery = { __typename?: 'Query', patientMediaFilesTotal?: Maybe<number> };

export type PatientMediaPoolFilesQueryVariables = Exact<{
  patientId: Scalars['String'];
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
}>;


export type PatientMediaPoolFilesQuery = { __typename?: 'Query', patientMediaPoolFiles?: Maybe<Array<Maybe<{ __typename?: 'MediaFile', id?: Maybe<string>, name?: Maybe<string>, path?: Maybe<string>, type?: Maybe<string>, size?: Maybe<string>, tenantId?: Maybe<string>, patientId?: Maybe<string>, patientName?: Maybe<string>, speciality?: Maybe<string>, conditionId?: Maybe<string>, activityType?: Maybe<string>, activityId?: Maybe<string>, ticketNumber?: Maybe<string>, isDeleted?: Maybe<boolean>, modified?: Maybe<any>, deletedOn?: Maybe<any>, systemTagging?: Maybe<Array<Maybe<string>>>, tags?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }>>> };

export type PatientMedicationQueryVariables = Exact<{
  patientId: Scalars['String'];
}>;


export type PatientMedicationQuery = { __typename?: 'Query', patientMedication?: Maybe<Array<Maybe<{ __typename?: 'PatientMedications', medicationId?: Maybe<string>, patientId?: Maybe<string>, conditionId?: Maybe<string>, followupId?: Maybe<string>, startTime?: Maybe<any>, endTime?: Maybe<any>, isActive?: Maybe<boolean>, reason?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }>, history?: Maybe<Array<Maybe<{ __typename?: 'PatientMedicationsHistory', startDate?: Maybe<any>, endDate?: Maybe<any>, duration?: Maybe<string>, frequency?: Maybe<string>, note?: Maybe<string>, status?: Maybe<string> }>>> }>>> };

export type PatientMedicationByConditionQueryVariables = Exact<{
  patientId: Scalars['String'];
  conditionId?: Maybe<Scalars['String']>;
}>;


export type PatientMedicationByConditionQuery = { __typename?: 'Query', patientMedicationByCondition?: Maybe<Array<Maybe<{ __typename?: 'PatientMedications', medicationId?: Maybe<string>, patientId?: Maybe<string>, conditionId?: Maybe<string>, followupId?: Maybe<string>, startTime?: Maybe<any>, endTime?: Maybe<any>, isActive?: Maybe<boolean>, reason?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }>, history?: Maybe<Array<Maybe<{ __typename?: 'PatientMedicationsHistory', startDate?: Maybe<any>, endDate?: Maybe<any>, duration?: Maybe<string>, frequency?: Maybe<string>, note?: Maybe<string>, status?: Maybe<string> }>>> }>>> };

export type PatientMedicationByFollowupQueryVariables = Exact<{
  patientId: Scalars['String'];
  followupId?: Maybe<Scalars['String']>;
}>;


export type PatientMedicationByFollowupQuery = { __typename?: 'Query', patientMedicationByFollowup?: Maybe<Array<Maybe<{ __typename?: 'PatientMedications', medicationId?: Maybe<string>, patientId?: Maybe<string>, conditionId?: Maybe<string>, followupId?: Maybe<string>, startTime?: Maybe<any>, endTime?: Maybe<any>, isActive?: Maybe<boolean>, reason?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }>, history?: Maybe<Array<Maybe<{ __typename?: 'PatientMedicationsHistory', startDate?: Maybe<any>, endDate?: Maybe<any>, duration?: Maybe<string>, frequency?: Maybe<string>, note?: Maybe<string>, status?: Maybe<string> }>>> }>>> };

export type PatientMedicationsQueryVariables = Exact<{
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  sortBy?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  descending?: Maybe<Scalars['Boolean']>;
}>;


export type PatientMedicationsQuery = { __typename?: 'Query', patientMedications?: Maybe<Array<Maybe<{ __typename?: 'PatientMedications', medicationId?: Maybe<string>, patientId?: Maybe<string>, conditionId?: Maybe<string>, followupId?: Maybe<string>, startTime?: Maybe<any>, endTime?: Maybe<any>, isActive?: Maybe<boolean>, reason?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }>, history?: Maybe<Array<Maybe<{ __typename?: 'PatientMedicationsHistory', startDate?: Maybe<any>, endDate?: Maybe<any>, duration?: Maybe<string>, frequency?: Maybe<string>, note?: Maybe<string>, status?: Maybe<string> }>>> }>>> };

export type PatientsQueryVariables = Exact<{
  sortBy?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  descending?: Maybe<Scalars['Boolean']>;
}>;


export type PatientsQuery = { __typename?: 'Query', patients?: Maybe<Array<Maybe<{ __typename?: 'Patient', id?: Maybe<string>, name?: Maybe<string>, gender?: Maybe<string>, telephone?: Maybe<string>, contactNumbers?: Maybe<Array<Maybe<string>>>, birthDate?: Maybe<any>, occupation?: Maybe<string>, partner?: Maybe<string>, country?: Maybe<string>, city?: Maybe<string>, identityNumber?: Maybe<string>, email?: Maybe<string>, createdOn?: Maybe<any>, modified?: Maybe<any>, isDuplicate?: Maybe<boolean>, patientInfo?: Maybe<{ __typename?: 'PatientInfo', bloodType?: Maybe<string>, maritalStatus?: Maybe<string>, emergancyContact?: Maybe<string>, entryDate?: Maybe<any>, fileNumber?: Maybe<string>, referral?: Maybe<Array<Maybe<string>>>, lastSeen?: Maybe<any>, totalDigitizedData?: Maybe<number>, flags?: Maybe<Array<Maybe<string>>>, createdOn?: Maybe<any>, modified?: Maybe<any>, grantors?: Maybe<Array<Maybe<{ __typename?: 'Grantor', id?: Maybe<string>, name?: Maybe<string> }>>>, tags?: Maybe<Array<Maybe<{ __typename?: 'Tag', id?: Maybe<string>, name?: Maybe<string>, group?: Maybe<string> }>>>, specialities?: Maybe<{ __typename?: 'Speciality', general?: Maybe<{ __typename?: 'General', conditions?: Maybe<Array<Maybe<{ __typename?: 'GeneralCondition', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, opened?: Maybe<any>, closed?: Maybe<any>, isDuplicate?: Maybe<boolean>, isHidden?: Maybe<boolean>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, cheifComplaint?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, presentHistory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, differentialDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>>, activities?: Maybe<{ __typename?: 'GeneralActivities', followups?: Maybe<Array<Maybe<{ __typename?: 'GeneralFollowup', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, isHidden?: Maybe<boolean>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, subjective?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medication?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, assessment?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>>>, operations?: Maybe<Array<Maybe<{ __typename?: 'GeneralOperation', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, department?: Maybe<string>, code?: Maybe<Array<Maybe<string>>>, operationDetails?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, anesthesia?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationType?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPerformed?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPostDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPreFindings?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationCategory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, surgeons?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }>>> }> }>>>, medicalHistory?: Maybe<{ __typename?: 'GeneralMedicalHistory', alerts?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, allergies?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, familyHistory?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, medicalIssues?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, pastMedication?: Maybe<{ __typename?: 'MedicalHistoryMedication', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>, presentMedication?: Maybe<{ __typename?: 'MedicalHistoryMedication', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>, surgicalHistory?: Maybe<{ __typename?: 'MedicalHistorySurgery', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'SurgicalHistory', note?: Maybe<string>, what?: Maybe<string>, when?: Maybe<any> }>>> }> }> }>, cardiology?: Maybe<{ __typename?: 'Cardiology', conditions?: Maybe<Array<Maybe<{ __typename?: 'CardiologyCondition', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, opened?: Maybe<any>, closed?: Maybe<any>, isDuplicate?: Maybe<boolean>, isHidden?: Maybe<boolean>, height?: Maybe<number>, weight?: Maybe<number>, bmi?: Maybe<number>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, cheifComplaint?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, presentHistory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, differentialDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>>, activities?: Maybe<{ __typename?: 'CardiologyActivities', followups?: Maybe<Array<Maybe<{ __typename?: 'CardiologyFollowup', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, isHidden?: Maybe<boolean>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, subjective?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, diagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medication?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, otherTreatments?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, assessment?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, consultation?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, laboratory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, note?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, radio?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, medications?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>>, cardiologyClinicalExamination?: Maybe<{ __typename?: 'CardiologyClinicalExamination', bp?: Maybe<string>, hr?: Maybe<string>, pulse?: Maybe<string>, pulseClassification?: Maybe<string>, sound?: Maybe<string>, value?: Maybe<string>, intensity?: Maybe<string>, pericardialFriction?: Maybe<boolean>, lungAuscultation?: Maybe<string>, aspect?: Maybe<string>, puls?: Maybe<boolean>, rightSuperior?: Maybe<boolean>, rightTransverse?: Maybe<boolean>, rightInferior?: Maybe<boolean>, leftSuperior?: Maybe<boolean>, leftTransverse?: Maybe<boolean>, leftInferior?: Maybe<boolean>, hepatoJugularReflux?: Maybe<boolean>, neckCarotidMurmur?: Maybe<string>, soft?: Maybe<boolean>, tender?: Maybe<string>, hepatomegaly?: Maybe<boolean>, ascites?: Maybe<boolean> }> }>>>, operations?: Maybe<Array<Maybe<{ __typename?: 'CardiologyOperation', id?: Maybe<string>, name?: Maybe<string>, type?: Maybe<string>, status?: Maybe<string>, subLocation?: Maybe<string>, isDuplicate?: Maybe<boolean>, opened?: Maybe<any>, closed?: Maybe<any>, department?: Maybe<string>, code?: Maybe<Array<Maybe<string>>>, operationDetails?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, anesthesia?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationType?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPerformed?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPostDiagnosis?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationPreFindings?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, operationCategory?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, physicalExam?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }>, surgeons?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }>>> }>, cardiologyClinicalExamination?: Maybe<{ __typename?: 'CardiologyClinicalExamination', bp?: Maybe<string>, hr?: Maybe<string>, pulse?: Maybe<string>, pulseClassification?: Maybe<string>, sound?: Maybe<string>, value?: Maybe<string>, intensity?: Maybe<string>, pericardialFriction?: Maybe<boolean>, lungAuscultation?: Maybe<string>, aspect?: Maybe<string>, puls?: Maybe<boolean>, rightSuperior?: Maybe<boolean>, rightTransverse?: Maybe<boolean>, rightInferior?: Maybe<boolean>, leftSuperior?: Maybe<boolean>, leftTransverse?: Maybe<boolean>, leftInferior?: Maybe<boolean>, hepatoJugularReflux?: Maybe<boolean>, neckCarotidMurmur?: Maybe<string>, soft?: Maybe<boolean>, tender?: Maybe<string>, hepatomegaly?: Maybe<boolean>, ascites?: Maybe<boolean> }> }>>>, medicalHistory?: Maybe<{ __typename?: 'CardiologyMedicalHistory', alerts?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, allergies?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, familyHistory?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, medicalIssues?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, cardioVascular?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, gi?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, endocrinology?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, lungDiseases?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, neurology?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, physiomaticDisorder?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, riskFactors?: Maybe<{ __typename?: 'MedicalHistoryAlert', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>, pastMedication?: Maybe<{ __typename?: 'MedicalHistoryMedication', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>, presentMedication?: Maybe<{ __typename?: 'MedicalHistoryMedication', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'Medication', frequency?: Maybe<string>, note?: Maybe<string>, isActive?: Maybe<boolean>, usageType?: Maybe<string>, noSubstitutes?: Maybe<boolean>, startDate?: Maybe<any>, endDate?: Maybe<any>, describedBy?: Maybe<string>, drug?: Maybe<{ __typename?: 'DrugView', id?: Maybe<string>, name?: Maybe<string>, dosage?: Maybe<string> }> }>>> }>, surgicalHistory?: Maybe<{ __typename?: 'CardiologyMedicalHistorySurgery', alert?: Maybe<boolean>, lastUpdate?: Maybe<any>, data?: Maybe<Array<Maybe<{ __typename?: 'CardiologySurgicalHistory', note?: Maybe<string>, type?: Maybe<string>, when?: Maybe<any>, what?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>> }>>> }> }> }> }> }> }>>> };

export type PatientsMediaFilesQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  patientId?: Maybe<Scalars['String']>;
}>;


export type PatientsMediaFilesQuery = { __typename?: 'Query', patientsMediaFiles?: Maybe<Array<Maybe<{ __typename?: 'PatientsMediaFiles', id?: Maybe<string>, patientName?: Maybe<string>, imagesCount?: Maybe<number>, pdfCount?: Maybe<number>, pool?: Maybe<Array<Maybe<{ __typename?: 'MediaFile', id?: Maybe<string>, name?: Maybe<string>, path?: Maybe<string>, type?: Maybe<string>, size?: Maybe<string>, tenantId?: Maybe<string>, patientId?: Maybe<string>, patientName?: Maybe<string>, speciality?: Maybe<string>, conditionId?: Maybe<string>, activityType?: Maybe<string>, activityId?: Maybe<string>, ticketNumber?: Maybe<string>, isDeleted?: Maybe<boolean>, modified?: Maybe<any>, deletedOn?: Maybe<any>, systemTagging?: Maybe<Array<Maybe<string>>>, tags?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }>>>, files?: Maybe<Array<Maybe<{ __typename?: 'MediaFile', id?: Maybe<string>, name?: Maybe<string>, path?: Maybe<string>, type?: Maybe<string>, size?: Maybe<string>, tenantId?: Maybe<string>, patientId?: Maybe<string>, patientName?: Maybe<string>, speciality?: Maybe<string>, conditionId?: Maybe<string>, activityType?: Maybe<string>, activityId?: Maybe<string>, ticketNumber?: Maybe<string>, isDeleted?: Maybe<boolean>, modified?: Maybe<any>, deletedOn?: Maybe<any>, systemTagging?: Maybe<Array<Maybe<string>>>, tags?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }>>> }>>> };

export type PatientsTotalQueryVariables = Exact<{
  sortBy?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  descending?: Maybe<Scalars['Boolean']>;
}>;


export type PatientsTotalQuery = { __typename?: 'Query', patientsTotal?: Maybe<number> };

export type RotaQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type RotaQuery = { __typename?: 'Query', rota?: Maybe<{ __typename?: 'Rota', id?: Maybe<string>, name?: Maybe<string>, color?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, recurrence?: Maybe<Array<Maybe<{ __typename?: 'Recurrence', startTime?: Maybe<any>, endTime?: Maybe<any>, rule?: Maybe<string> }>>> }> };

export type RotaAllQueryVariables = Exact<{ [key: string]: never; }>;


export type RotaAllQuery = { __typename?: 'Query', rotaAll?: Maybe<Array<Maybe<{ __typename?: 'Rota', id?: Maybe<string>, name?: Maybe<string>, color?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, recurrence?: Maybe<Array<Maybe<{ __typename?: 'Recurrence', startTime?: Maybe<any>, endTime?: Maybe<any>, rule?: Maybe<string> }>>> }>>> };

export type ScheduleQueryVariables = Exact<{ [key: string]: never; }>;


export type ScheduleQuery = { __typename?: 'Query', schedule?: Maybe<{ __typename?: 'Schedule', id?: Maybe<string>, startHour?: Maybe<string>, endHour?: Maybe<string>, displayRota?: Maybe<boolean> }> };

export type SettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsQuery = { __typename?: 'Query', settings?: Maybe<Array<Maybe<{ __typename?: 'Settings', id?: Maybe<string>, specialties?: Maybe<Array<Maybe<string>>> }>>> };

export type TagQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TagQuery = { __typename?: 'Query', tag?: Maybe<{ __typename?: 'Tag', id?: Maybe<string>, name?: Maybe<string>, group?: Maybe<string> }> };

export type TagsQueryVariables = Exact<{
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
}>;


export type TagsQuery = { __typename?: 'Query', tags?: Maybe<Array<Maybe<{ __typename?: 'Tag', id?: Maybe<string>, name?: Maybe<string>, group?: Maybe<string> }>>> };

export type TagsTotalQueryVariables = Exact<{
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
}>;


export type TagsTotalQuery = { __typename?: 'Query', tagsTotal?: Maybe<number> };

export type TenantPoolMediaFilesQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
}>;


export type TenantPoolMediaFilesQuery = { __typename?: 'Query', tenantPoolMediaFiles?: Maybe<Array<Maybe<{ __typename?: 'MediaFile', id?: Maybe<string>, name?: Maybe<string>, path?: Maybe<string>, type?: Maybe<string>, size?: Maybe<string>, tenantId?: Maybe<string>, patientId?: Maybe<string>, patientName?: Maybe<string>, speciality?: Maybe<string>, conditionId?: Maybe<string>, activityType?: Maybe<string>, activityId?: Maybe<string>, ticketNumber?: Maybe<string>, isDeleted?: Maybe<boolean>, modified?: Maybe<any>, deletedOn?: Maybe<any>, systemTagging?: Maybe<Array<Maybe<string>>>, tags?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }>>> };

export type TicketQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TicketQuery = { __typename?: 'Query', ticket?: Maybe<{ __typename?: 'Ticket', id?: Maybe<string>, ticketNumber?: Maybe<string>, tenantName?: Maybe<string>, subject?: Maybe<string>, details?: Maybe<string>, status?: Maybe<number>, attachFile?: Maybe<boolean>, isReadByAdmin?: Maybe<boolean>, isReadByClient?: Maybe<boolean>, ticketDate?: Maybe<any>, messages?: Maybe<Array<Maybe<{ __typename?: 'TicketMessages', message?: Maybe<string>, requestBy?: Maybe<string>, messageDate?: Maybe<any> }>>> }> };

export type TicketMediaFilesQueryVariables = Exact<{
  text: Scalars['String'];
  ticketNumber: Scalars['String'];
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
}>;


export type TicketMediaFilesQuery = { __typename?: 'Query', ticketMediaFiles?: Maybe<Array<Maybe<{ __typename?: 'MediaFile', id?: Maybe<string>, name?: Maybe<string>, path?: Maybe<string>, type?: Maybe<string>, size?: Maybe<string>, tenantId?: Maybe<string>, patientId?: Maybe<string>, patientName?: Maybe<string>, speciality?: Maybe<string>, conditionId?: Maybe<string>, activityType?: Maybe<string>, activityId?: Maybe<string>, ticketNumber?: Maybe<string>, isDeleted?: Maybe<boolean>, modified?: Maybe<any>, deletedOn?: Maybe<any>, systemTagging?: Maybe<Array<Maybe<string>>>, tags?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }>>> };

export type TicketTenantQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TicketTenantQuery = { __typename?: 'Query', ticketTenant?: Maybe<string> };

export type TicketsQueryVariables = Exact<{
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  descending?: Maybe<Scalars['Boolean']>;
  sortBy?: Maybe<Scalars['String']>;
}>;


export type TicketsQuery = { __typename?: 'Query', tickets?: Maybe<{ __typename?: 'PageResultTicket', count?: Maybe<any>, items?: Maybe<Array<Maybe<{ __typename?: 'Ticket', id?: Maybe<string>, ticketNumber?: Maybe<string>, tenantName?: Maybe<string>, subject?: Maybe<string>, details?: Maybe<string>, status?: Maybe<number>, attachFile?: Maybe<boolean>, isReadByAdmin?: Maybe<boolean>, isReadByClient?: Maybe<boolean>, ticketDate?: Maybe<any>, messages?: Maybe<Array<Maybe<{ __typename?: 'TicketMessages', message?: Maybe<string>, requestBy?: Maybe<string>, messageDate?: Maybe<any> }>>> }>>> }> };

export type TodoQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TodoQuery = { __typename?: 'Query', todo?: Maybe<{ __typename?: 'Todo', id?: Maybe<string>, title?: Maybe<string>, notes?: Maybe<string>, startDate?: Maybe<any>, dueDate?: Maybe<any>, isCompleted?: Maybe<boolean>, isStarred?: Maybe<boolean>, isImportant?: Maybe<boolean>, patientId?: Maybe<string> }> };

export type TodosQueryVariables = Exact<{
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  patientId?: Maybe<Scalars['String']>;
}>;


export type TodosQuery = { __typename?: 'Query', todos?: Maybe<Array<Maybe<{ __typename?: 'Todo', id?: Maybe<string>, title?: Maybe<string>, notes?: Maybe<string>, startDate?: Maybe<any>, dueDate?: Maybe<any>, isCompleted?: Maybe<boolean>, isStarred?: Maybe<boolean>, isImportant?: Maybe<boolean>, patientId?: Maybe<string> }>>> };

export type TodosTotalQueryVariables = Exact<{
  filter?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  patientId?: Maybe<Scalars['String']>;
}>;


export type TodosTotalQuery = { __typename?: 'Query', todosTotal?: Maybe<number> };

export type TrashedMediaFilesQueryVariables = Exact<{ [key: string]: never; }>;


export type TrashedMediaFilesQuery = { __typename?: 'Query', trashedMediaFiles?: Maybe<Array<Maybe<{ __typename?: 'MediaFile', id?: Maybe<string>, name?: Maybe<string>, path?: Maybe<string>, type?: Maybe<string>, size?: Maybe<string>, tenantId?: Maybe<string>, patientId?: Maybe<string>, patientName?: Maybe<string>, speciality?: Maybe<string>, conditionId?: Maybe<string>, activityType?: Maybe<string>, activityId?: Maybe<string>, ticketNumber?: Maybe<string>, isDeleted?: Maybe<boolean>, modified?: Maybe<any>, deletedOn?: Maybe<any>, systemTagging?: Maybe<Array<Maybe<string>>>, tags?: Maybe<{ __typename?: 'DataPartition', tags?: Maybe<Array<Maybe<string>>>, text?: Maybe<Array<Maybe<{ __typename?: 'LookupView', group?: Maybe<string>, value?: Maybe<string>, text?: Maybe<string> }>>>, media?: Maybe<Array<Maybe<{ __typename?: 'MediaPartition', text?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, date?: Maybe<any> }>>> }> }>>> };

export type AppointmentEventSubscriptionVariables = Exact<{
  tenantId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type AppointmentEventSubscription = { __typename?: 'Subscription', appointmentEvent?: Maybe<{ __typename?: 'AppointmentEventType', event?: Maybe<string>, sentAt?: Maybe<any>, sub?: Maybe<string>, content?: Maybe<{ __typename?: 'Appointment', id?: Maybe<string>, subject?: Maybe<string>, startTime?: Maybe<any>, endTime?: Maybe<any>, reason?: Maybe<string>, color?: Maybe<string>, note?: Maybe<string>, conditionId?: Maybe<string>, speciality?: Maybe<string>, recurrenceId?: Maybe<string>, recurrenceException?: Maybe<string>, recurrenceRule?: Maybe<string>, isBlock?: Maybe<boolean>, isReadonly?: Maybe<boolean>, isAllDay?: Maybe<boolean>, type?: Maybe<string>, status?: Maybe<string>, location?: Maybe<{ __typename?: 'LocationViewType', id?: Maybe<string>, name?: Maybe<string> }>, contact?: Maybe<{ __typename?: 'Contact', id?: Maybe<string>, isDuplicate?: Maybe<boolean>, name?: Maybe<string>, gender?: Maybe<string>, telephone?: Maybe<string>, contactNumbers?: Maybe<Array<Maybe<string>>>, birthDate?: Maybe<any>, occupation?: Maybe<string>, partner?: Maybe<string>, country?: Maybe<string>, city?: Maybe<string>, identityNumber?: Maybe<string>, email?: Maybe<string>, createdOn?: Maybe<any>, modified?: Maybe<any>, contactType?: Maybe<string> }> }>, from?: Maybe<{ __typename?: 'EventFromType', id: string, displayName: string }> }> };

export type MessageAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MessageAddedSubscription = { __typename?: 'Subscription', messageAdded?: Maybe<{ __typename?: 'MessageType', content: string, sentAt?: Maybe<any>, sub?: Maybe<string>, from?: Maybe<{ __typename?: 'MessageFromType', id: string, displayName: string }> }> };

export type MessageAddedByUserSubscriptionVariables = Exact<{
  id: Scalars['String'];
}>;


export type MessageAddedByUserSubscription = { __typename?: 'Subscription', messageAddedByUser?: Maybe<{ __typename?: 'MessageType', content: string, sentAt?: Maybe<any>, sub?: Maybe<string>, from?: Maybe<{ __typename?: 'MessageFromType', id: string, displayName: string }> }> };

export type TicketEventSubscriptionVariables = Exact<{
  tenantId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type TicketEventSubscription = { __typename?: 'Subscription', ticketEvent?: Maybe<{ __typename?: 'TicketEventType', event?: Maybe<string>, sentAt?: Maybe<any>, sub?: Maybe<string>, content?: Maybe<{ __typename?: 'Ticket', id?: Maybe<string>, ticketNumber?: Maybe<string>, tenantName?: Maybe<string>, subject?: Maybe<string>, details?: Maybe<string>, status?: Maybe<number>, attachFile?: Maybe<boolean>, isReadByAdmin?: Maybe<boolean>, isReadByClient?: Maybe<boolean>, ticketDate?: Maybe<any>, messages?: Maybe<Array<Maybe<{ __typename?: 'TicketMessages', message?: Maybe<string>, requestBy?: Maybe<string>, messageDate?: Maybe<any> }>>> }>, from?: Maybe<{ __typename?: 'EventFromType', id: string, displayName: string }> }> };

export type TicketEventAdminSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TicketEventAdminSubscription = { __typename?: 'Subscription', ticketEventAdmin?: Maybe<{ __typename?: 'TicketEventType', event?: Maybe<string>, sentAt?: Maybe<any>, sub?: Maybe<string>, content?: Maybe<{ __typename?: 'Ticket', id?: Maybe<string>, ticketNumber?: Maybe<string>, tenantName?: Maybe<string>, subject?: Maybe<string>, details?: Maybe<string>, status?: Maybe<number>, attachFile?: Maybe<boolean>, isReadByAdmin?: Maybe<boolean>, isReadByClient?: Maybe<boolean>, ticketDate?: Maybe<any>, messages?: Maybe<Array<Maybe<{ __typename?: 'TicketMessages', message?: Maybe<string>, requestBy?: Maybe<string>, messageDate?: Maybe<any> }>>> }>, from?: Maybe<{ __typename?: 'EventFromType', id: string, displayName: string }> }> };

export const AddMessageDocument = gql`
    mutation addMessage($message: MessageInputType) {
  addMessage(message: $message) {
    content
    sentAt
    sub
    from {
      id
      displayName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddMessageGQL extends Apollo.Mutation<AddMessageMutation, AddMessageMutationVariables> {
    document = AddMessageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateAppointmentDocument = gql`
    mutation createAppointment($appointment: AppointmentInput!) {
  createAppointment(appointment: $appointment) {
    id
    subject
    startTime
    endTime
    reason
    color
    note
    conditionId
    speciality
    recurrenceId
    recurrenceException
    recurrenceRule
    isBlock
    isReadonly
    isAllDay
    type
    status
    location {
      id
      name
    }
    contact {
      id
      isDuplicate
      name
      gender
      telephone
      contactNumbers
      birthDate
      occupation
      partner
      country
      city
      identityNumber
      email
      createdOn
      modified
      contactType
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateAppointmentGQL extends Apollo.Mutation<CreateAppointmentMutation, CreateAppointmentMutationVariables> {
    document = CreateAppointmentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateCardiologyConditionDocument = gql`
    mutation createCardiologyCondition($patientId: String!, $condition: CardiologyConditionInput!) {
  createCardiologyCondition(patientId: $patientId, condition: $condition) {
    id
    name
    type
    status
    subLocation
    opened
    closed
    location {
      id
      name
    }
    cheifComplaint {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    presentHistory {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    diagnosis {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    differentialDiagnosis {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    consultation {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    otherTreatments {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    physicalExam {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    laboratory {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    radio {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    note {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    isDuplicate
    isHidden
    medications {
      frequency
      note
      isActive
      usageType
      noSubstitutes
      startDate
      endDate
      describedBy
      drug {
        id
        name
        dosage
      }
    }
    activities {
      followups {
        id
        name
        type
        status
        subLocation
        isDuplicate
        opened
        closed
        location {
          id
          name
        }
        subjective {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        diagnosis {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        medication {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        otherTreatments {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        assessment {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        consultation {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        physicalExam {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        laboratory {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        note {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        radio {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        isHidden
        medications {
          frequency
          note
          isActive
          usageType
          noSubstitutes
          startDate
          endDate
          describedBy
          drug {
            id
            name
            dosage
          }
        }
        cardiologyClinicalExamination {
          bp
          hr
          pulse
          pulseClassification
          sound
          value
          intensity
          pericardialFriction
          lungAuscultation
          aspect
          puls
          rightSuperior
          rightTransverse
          rightInferior
          leftSuperior
          leftTransverse
          leftInferior
          hepatoJugularReflux
          neckCarotidMurmur
          soft
          tender
          hepatomegaly
          ascites
        }
      }
      operations {
        id
        name
        type
        status
        subLocation
        isDuplicate
        opened
        closed
        location {
          id
          name
        }
        department
        anesthesia {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        code
        operationType {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationPerformed {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationDiagnosis {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationPostDiagnosis {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationPreFindings {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationCategory {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        physicalExam {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        surgeons {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationDetails
      }
    }
    height
    weight
    bmi
    cardiologyClinicalExamination {
      bp
      hr
      pulse
      pulseClassification
      sound
      value
      intensity
      pericardialFriction
      lungAuscultation
      aspect
      puls
      rightSuperior
      rightTransverse
      rightInferior
      leftSuperior
      leftTransverse
      leftInferior
      hepatoJugularReflux
      neckCarotidMurmur
      soft
      tender
      hepatomegaly
      ascites
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCardiologyConditionGQL extends Apollo.Mutation<CreateCardiologyConditionMutation, CreateCardiologyConditionMutationVariables> {
    document = CreateCardiologyConditionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateCardiologyFollowupDocument = gql`
    mutation createCardiologyFollowup($patientId: String!, $conditionId: String!, $followup: CardiologyFollowupInput!) {
  createCardiologyFollowup(
    patientId: $patientId
    conditionId: $conditionId
    followup: $followup
  ) {
    id
    name
    type
    status
    subLocation
    isDuplicate
    opened
    closed
    location {
      id
      name
    }
    subjective {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    diagnosis {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    medication {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    otherTreatments {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    assessment {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    consultation {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    physicalExam {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    laboratory {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    note {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    radio {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    isHidden
    medications {
      frequency
      note
      isActive
      usageType
      noSubstitutes
      startDate
      endDate
      describedBy
      drug {
        id
        name
        dosage
      }
    }
    cardiologyClinicalExamination {
      bp
      hr
      pulse
      pulseClassification
      sound
      value
      intensity
      pericardialFriction
      lungAuscultation
      aspect
      puls
      rightSuperior
      rightTransverse
      rightInferior
      leftSuperior
      leftTransverse
      leftInferior
      hepatoJugularReflux
      neckCarotidMurmur
      soft
      tender
      hepatomegaly
      ascites
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCardiologyFollowupGQL extends Apollo.Mutation<CreateCardiologyFollowupMutation, CreateCardiologyFollowupMutationVariables> {
    document = CreateCardiologyFollowupDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateCardiologyOperationDocument = gql`
    mutation createCardiologyOperation($patientId: String!, $conditionId: String!, $operation: CardiologyOperationInput!) {
  createCardiologyOperation(
    patientId: $patientId
    conditionId: $conditionId
    operation: $operation
  ) {
    id
    name
    type
    status
    subLocation
    isDuplicate
    opened
    closed
    location {
      id
      name
    }
    department
    anesthesia {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    code
    operationType {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationPerformed {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationDiagnosis {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationPostDiagnosis {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationPreFindings {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationCategory {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    physicalExam {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    surgeons {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationDetails
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCardiologyOperationGQL extends Apollo.Mutation<CreateCardiologyOperationMutation, CreateCardiologyOperationMutationVariables> {
    document = CreateCardiologyOperationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateContactDocument = gql`
    mutation createContact($contact: ContactInput!) {
  createContact(contact: $contact) {
    id
    isDuplicate
    name
    gender
    telephone
    contactNumbers
    birthDate
    occupation
    partner
    country
    city
    identityNumber
    email
    createdOn
    modified
    contactType
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateContactGQL extends Apollo.Mutation<CreateContactMutation, CreateContactMutationVariables> {
    document = CreateContactDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateDrugDocument = gql`
    mutation createDrug($drug: DrugInput!) {
  createDrug(drug: $drug) {
    id
    atcCode
    name
    dosage
    form
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateDrugGQL extends Apollo.Mutation<CreateDrugMutation, CreateDrugMutationVariables> {
    document = CreateDrugDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateGeneralConditionDocument = gql`
    mutation createGeneralCondition($patientId: String!, $condition: GeneralConditionInput!) {
  createGeneralCondition(patientId: $patientId, condition: $condition) {
    id
    name
    type
    status
    subLocation
    opened
    closed
    location {
      id
      name
    }
    cheifComplaint {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    presentHistory {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    diagnosis {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    differentialDiagnosis {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    consultation {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    otherTreatments {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    physicalExam {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    laboratory {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    radio {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    note {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    isDuplicate
    isHidden
    medications {
      frequency
      note
      isActive
      usageType
      noSubstitutes
      startDate
      endDate
      describedBy
      drug {
        id
        name
        dosage
      }
    }
    activities {
      followups {
        id
        name
        type
        status
        subLocation
        isDuplicate
        opened
        closed
        location {
          id
          name
        }
        subjective {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        diagnosis {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        medication {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        otherTreatments {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        assessment {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        consultation {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        physicalExam {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        laboratory {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        note {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        radio {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        isHidden
        medications {
          frequency
          note
          isActive
          usageType
          noSubstitutes
          startDate
          endDate
          describedBy
          drug {
            id
            name
            dosage
          }
        }
      }
      operations {
        id
        name
        type
        status
        subLocation
        isDuplicate
        opened
        closed
        location {
          id
          name
        }
        department
        anesthesia {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        code
        operationType {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationPerformed {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationDiagnosis {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationPostDiagnosis {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationPreFindings {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationCategory {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        physicalExam {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        surgeons {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationDetails
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateGeneralConditionGQL extends Apollo.Mutation<CreateGeneralConditionMutation, CreateGeneralConditionMutationVariables> {
    document = CreateGeneralConditionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateGeneralFollowupDocument = gql`
    mutation createGeneralFollowup($patientId: String!, $conditionId: String!, $followup: GeneralFollowupInput!) {
  createGeneralFollowup(
    patientId: $patientId
    conditionId: $conditionId
    followup: $followup
  ) {
    id
    name
    type
    status
    subLocation
    isDuplicate
    opened
    closed
    location {
      id
      name
    }
    subjective {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    diagnosis {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    medication {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    otherTreatments {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    assessment {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    consultation {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    physicalExam {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    laboratory {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    note {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    radio {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    isHidden
    medications {
      frequency
      note
      isActive
      usageType
      noSubstitutes
      startDate
      endDate
      describedBy
      drug {
        id
        name
        dosage
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateGeneralFollowupGQL extends Apollo.Mutation<CreateGeneralFollowupMutation, CreateGeneralFollowupMutationVariables> {
    document = CreateGeneralFollowupDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateGeneralOperationDocument = gql`
    mutation createGeneralOperation($patientId: String!, $conditionId: String!, $operation: GeneralOperationInput!) {
  createGeneralOperation(
    patientId: $patientId
    conditionId: $conditionId
    operation: $operation
  ) {
    id
    name
    type
    status
    subLocation
    isDuplicate
    opened
    closed
    location {
      id
      name
    }
    department
    anesthesia {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    code
    operationType {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationPerformed {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationDiagnosis {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationPostDiagnosis {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationPreFindings {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationCategory {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    physicalExam {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    surgeons {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationDetails
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateGeneralOperationGQL extends Apollo.Mutation<CreateGeneralOperationMutation, CreateGeneralOperationMutationVariables> {
    document = CreateGeneralOperationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateGrantorDocument = gql`
    mutation createGrantor($grantor: GrantorInput!) {
  createGrantor(grantor: $grantor) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateGrantorGQL extends Apollo.Mutation<CreateGrantorMutation, CreateGrantorMutationVariables> {
    document = CreateGrantorDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateLocationDocument = gql`
    mutation createLocation($location: LocationInput!) {
  createLocation(location: $location) {
    id
    name
    contact
    address
    type
    subLocations
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateLocationGQL extends Apollo.Mutation<CreateLocationMutation, CreateLocationMutationVariables> {
    document = CreateLocationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateLookupDocument = gql`
    mutation createLookup($lookup: LookupInput!) {
  createLookup(lookup: $lookup) {
    id
    tenantId
    groupKey
    value
    symbol
    text
    description
    cultureName
    parentValue
    parentId
    createdDate
    modifiedDate
    order
    predefined
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateLookupGQL extends Apollo.Mutation<CreateLookupMutation, CreateLookupMutationVariables> {
    document = CreateLookupDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateLookupsDocument = gql`
    mutation createLookups($lookups: [LookupInput]!) {
  createLookups(lookups: $lookups) {
    id
    tenantId
    groupKey
    value
    symbol
    text
    description
    cultureName
    parentValue
    parentId
    createdDate
    modifiedDate
    order
    predefined
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateLookupsGQL extends Apollo.Mutation<CreateLookupsMutation, CreateLookupsMutationVariables> {
    document = CreateLookupsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateMediaFileDocument = gql`
    mutation createMediaFile($mediaFile: MediaFileInput!) {
  createMediaFile(mediaFile: $mediaFile) {
    id
    name
    path
    type
    size
    tenantId
    patientId
    patientName
    speciality
    conditionId
    activityType
    activityId
    ticketNumber
    isDeleted
    modified
    deletedOn
    systemTagging
    tags {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateMediaFileGQL extends Apollo.Mutation<CreateMediaFileMutation, CreateMediaFileMutationVariables> {
    document = CreateMediaFileDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateMedicationDocument = gql`
    mutation createMedication($patientMedications: PatientMedicationsInput!) {
  createMedication(patientMedications: $patientMedications) {
    medicationId
    patientId
    conditionId
    followupId
    startTime
    endTime
    drug {
      id
      name
      dosage
    }
    isActive
    reason
    history {
      startDate
      endDate
      duration
      frequency
      note
      status
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateMedicationGQL extends Apollo.Mutation<CreateMedicationMutation, CreateMedicationMutationVariables> {
    document = CreateMedicationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreatePatientDocument = gql`
    mutation createPatient($patient: PatientInput!) {
  createPatient(patient: $patient) {
    id
    name
    gender
    telephone
    contactNumbers
    birthDate
    occupation
    partner
    country
    city
    identityNumber
    email
    createdOn
    modified
    isDuplicate
    patientInfo {
      bloodType
      maritalStatus
      emergancyContact
      entryDate
      fileNumber
      referral
      lastSeen
      totalDigitizedData
      flags
      grantors {
        id
        name
      }
      tags {
        id
        name
        group
      }
      createdOn
      modified
      specialities {
        general {
          conditions {
            id
            name
            type
            status
            subLocation
            opened
            closed
            location {
              id
              name
            }
            cheifComplaint {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            presentHistory {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            diagnosis {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            differentialDiagnosis {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            consultation {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            otherTreatments {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            physicalExam {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            laboratory {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            radio {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            note {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            isDuplicate
            isHidden
            medications {
              frequency
              note
              isActive
              usageType
              noSubstitutes
              startDate
              endDate
              describedBy
              drug {
                id
                name
                dosage
              }
            }
            activities {
              followups {
                id
                name
                type
                status
                subLocation
                isDuplicate
                opened
                closed
                location {
                  id
                  name
                }
                subjective {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                diagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                medication {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                otherTreatments {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                assessment {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                consultation {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                physicalExam {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                laboratory {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                note {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                radio {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                isHidden
                medications {
                  frequency
                  note
                  isActive
                  usageType
                  noSubstitutes
                  startDate
                  endDate
                  describedBy
                  drug {
                    id
                    name
                    dosage
                  }
                }
              }
              operations {
                id
                name
                type
                status
                subLocation
                isDuplicate
                opened
                closed
                location {
                  id
                  name
                }
                department
                anesthesia {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                code
                operationType {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPerformed {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationDiagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPostDiagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPreFindings {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationCategory {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                physicalExam {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                surgeons {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationDetails
              }
            }
          }
          medicalHistory {
            alerts {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            allergies {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            familyHistory {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            medicalIssues {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            pastMedication {
              alert
              lastUpdate
              data {
                frequency
                note
                isActive
                usageType
                noSubstitutes
                startDate
                endDate
                describedBy
                drug {
                  id
                  name
                  dosage
                }
              }
            }
            presentMedication {
              alert
              lastUpdate
              data {
                frequency
                note
                isActive
                usageType
                noSubstitutes
                startDate
                endDate
                describedBy
                drug {
                  id
                  name
                  dosage
                }
              }
            }
            surgicalHistory {
              alert
              lastUpdate
              data {
                note
                what
                when
              }
            }
          }
        }
        cardiology {
          conditions {
            id
            name
            type
            status
            subLocation
            opened
            closed
            location {
              id
              name
            }
            cheifComplaint {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            presentHistory {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            diagnosis {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            differentialDiagnosis {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            consultation {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            otherTreatments {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            physicalExam {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            laboratory {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            radio {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            note {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            isDuplicate
            isHidden
            medications {
              frequency
              note
              isActive
              usageType
              noSubstitutes
              startDate
              endDate
              describedBy
              drug {
                id
                name
                dosage
              }
            }
            activities {
              followups {
                id
                name
                type
                status
                subLocation
                isDuplicate
                opened
                closed
                location {
                  id
                  name
                }
                subjective {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                diagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                medication {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                otherTreatments {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                assessment {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                consultation {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                physicalExam {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                laboratory {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                note {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                radio {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                isHidden
                medications {
                  frequency
                  note
                  isActive
                  usageType
                  noSubstitutes
                  startDate
                  endDate
                  describedBy
                  drug {
                    id
                    name
                    dosage
                  }
                }
                cardiologyClinicalExamination {
                  bp
                  hr
                  pulse
                  pulseClassification
                  sound
                  value
                  intensity
                  pericardialFriction
                  lungAuscultation
                  aspect
                  puls
                  rightSuperior
                  rightTransverse
                  rightInferior
                  leftSuperior
                  leftTransverse
                  leftInferior
                  hepatoJugularReflux
                  neckCarotidMurmur
                  soft
                  tender
                  hepatomegaly
                  ascites
                }
              }
              operations {
                id
                name
                type
                status
                subLocation
                isDuplicate
                opened
                closed
                location {
                  id
                  name
                }
                department
                anesthesia {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                code
                operationType {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPerformed {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationDiagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPostDiagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPreFindings {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationCategory {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                physicalExam {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                surgeons {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationDetails
              }
            }
            height
            weight
            bmi
            cardiologyClinicalExamination {
              bp
              hr
              pulse
              pulseClassification
              sound
              value
              intensity
              pericardialFriction
              lungAuscultation
              aspect
              puls
              rightSuperior
              rightTransverse
              rightInferior
              leftSuperior
              leftTransverse
              leftInferior
              hepatoJugularReflux
              neckCarotidMurmur
              soft
              tender
              hepatomegaly
              ascites
            }
          }
          medicalHistory {
            alerts {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            allergies {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            familyHistory {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            medicalIssues {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            cardioVascular {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            gi {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            endocrinology {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            lungDiseases {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            neurology {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            physiomaticDisorder {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            riskFactors {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            pastMedication {
              alert
              lastUpdate
              data {
                frequency
                note
                isActive
                usageType
                noSubstitutes
                startDate
                endDate
                describedBy
                drug {
                  id
                  name
                  dosage
                }
              }
            }
            presentMedication {
              alert
              lastUpdate
              data {
                frequency
                note
                isActive
                usageType
                noSubstitutes
                startDate
                endDate
                describedBy
                drug {
                  id
                  name
                  dosage
                }
              }
            }
            surgicalHistory {
              alert
              lastUpdate
              data {
                note
                what {
                  group
                  value
                  text
                }
                type
                when
              }
            }
          }
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreatePatientGQL extends Apollo.Mutation<CreatePatientMutation, CreatePatientMutationVariables> {
    document = CreatePatientDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateRotaDocument = gql`
    mutation createRota($rota: RotaInput!) {
  createRota(rota: $rota) {
    id
    name
    color
    location {
      id
      name
    }
    recurrence {
      startTime
      endTime
      rule
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateRotaGQL extends Apollo.Mutation<CreateRotaMutation, CreateRotaMutationVariables> {
    document = CreateRotaDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateTagDocument = gql`
    mutation createTag($tag: TagInput!) {
  createTag(tag: $tag) {
    id
    name
    group
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateTagGQL extends Apollo.Mutation<CreateTagMutation, CreateTagMutationVariables> {
    document = CreateTagDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateTicketDocument = gql`
    mutation createTicket($ticket: TicketInput!) {
  createTicket(ticket: $ticket) {
    id
    ticketNumber
    tenantName
    subject
    details
    status
    attachFile
    isReadByAdmin
    isReadByClient
    ticketDate
    messages {
      message
      requestBy
      messageDate
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateTicketGQL extends Apollo.Mutation<CreateTicketMutation, CreateTicketMutationVariables> {
    document = CreateTicketDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateTodoDocument = gql`
    mutation createTodo($todo: TodoInput!) {
  createTodo(todo: $todo) {
    id
    title
    notes
    startDate
    dueDate
    isCompleted
    isStarred
    isImportant
    patientId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateTodoGQL extends Apollo.Mutation<CreateTodoMutation, CreateTodoMutationVariables> {
    document = CreateTodoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteAppointmentDocument = gql`
    mutation deleteAppointment($id: String!) {
  deleteAppointment(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteAppointmentGQL extends Apollo.Mutation<DeleteAppointmentMutation, DeleteAppointmentMutationVariables> {
    document = DeleteAppointmentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteDrugDocument = gql`
    mutation deleteDrug($id: String!) {
  deleteDrug(id: $id) {
    id
    atcCode
    name
    dosage
    form
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteDrugGQL extends Apollo.Mutation<DeleteDrugMutation, DeleteDrugMutationVariables> {
    document = DeleteDrugDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteGrantorDocument = gql`
    mutation deleteGrantor($id: String!) {
  deleteGrantor(id: $id) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteGrantorGQL extends Apollo.Mutation<DeleteGrantorMutation, DeleteGrantorMutationVariables> {
    document = DeleteGrantorDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteLocationDocument = gql`
    mutation deleteLocation($id: String!) {
  deleteLocation(id: $id) {
    id
    name
    contact
    address
    type
    subLocations
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteLocationGQL extends Apollo.Mutation<DeleteLocationMutation, DeleteLocationMutationVariables> {
    document = DeleteLocationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteLookupDocument = gql`
    mutation deleteLookup($id: String!) {
  deleteLookup(id: $id) {
    id
    tenantId
    groupKey
    value
    symbol
    text
    description
    cultureName
    parentValue
    parentId
    createdDate
    modifiedDate
    order
    predefined
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteLookupGQL extends Apollo.Mutation<DeleteLookupMutation, DeleteLookupMutationVariables> {
    document = DeleteLookupDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteMediaFilesDocument = gql`
    mutation deleteMediaFiles($id: [String]!) {
  deleteMediaFiles(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteMediaFilesGQL extends Apollo.Mutation<DeleteMediaFilesMutation, DeleteMediaFilesMutationVariables> {
    document = DeleteMediaFilesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteMedicalActivityDocument = gql`
    mutation deleteMedicalActivity($patientId: String!, $speciality: String!, $conditionId: String!, $activityType: String, $activityId: String) {
  deleteMedicalActivity(
    patientId: $patientId
    speciality: $speciality
    conditionId: $conditionId
    activityType: $activityType
    activityId: $activityId
  )
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteMedicalActivityGQL extends Apollo.Mutation<DeleteMedicalActivityMutation, DeleteMedicalActivityMutationVariables> {
    document = DeleteMedicalActivityDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeletePatientDocument = gql`
    mutation deletePatient($patientId: String!) {
  deletePatient(patientId: $patientId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeletePatientGQL extends Apollo.Mutation<DeletePatientMutation, DeletePatientMutationVariables> {
    document = DeletePatientDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteRotaDocument = gql`
    mutation deleteRota($id: String!) {
  deleteRota(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteRotaGQL extends Apollo.Mutation<DeleteRotaMutation, DeleteRotaMutationVariables> {
    document = DeleteRotaDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteSubLocationDocument = gql`
    mutation deleteSubLocation($id: String!, $subLocation: String!) {
  deleteSubLocation(id: $id, subLocation: $subLocation) {
    id
    name
    contact
    address
    type
    subLocations
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteSubLocationGQL extends Apollo.Mutation<DeleteSubLocationMutation, DeleteSubLocationMutationVariables> {
    document = DeleteSubLocationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteTagDocument = gql`
    mutation deleteTag($id: String!) {
  deleteTag(id: $id) {
    id
    name
    group
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteTagGQL extends Apollo.Mutation<DeleteTagMutation, DeleteTagMutationVariables> {
    document = DeleteTagDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteTodoDocument = gql`
    mutation deleteTodo($id: String!) {
  deleteTodo(id: $id) {
    id
    title
    notes
    startDate
    dueDate
    isCompleted
    isStarred
    isImportant
    patientId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteTodoGQL extends Apollo.Mutation<DeleteTodoMutation, DeleteTodoMutationVariables> {
    document = DeleteTodoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RemarkDuplicateActivityDocument = gql`
    mutation remarkDuplicateActivity($patientId: String!, $speciality: String!, $conditionId: String!, $activityType: String, $activityId: String, $isDuplicate: Boolean) {
  remarkDuplicateActivity(
    patientId: $patientId
    speciality: $speciality
    conditionId: $conditionId
    activityType: $activityType
    activityId: $activityId
    isDuplicate: $isDuplicate
  )
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RemarkDuplicateActivityGQL extends Apollo.Mutation<RemarkDuplicateActivityMutation, RemarkDuplicateActivityMutationVariables> {
    document = RemarkDuplicateActivityDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RemarkDuplicatePatientDocument = gql`
    mutation remarkDuplicatePatient($patientId: String!, $isDuplicate: Boolean) {
  remarkDuplicatePatient(patientId: $patientId, isDuplicate: $isDuplicate)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RemarkDuplicatePatientGQL extends Apollo.Mutation<RemarkDuplicatePatientMutation, RemarkDuplicatePatientMutationVariables> {
    document = RemarkDuplicatePatientDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateAppointmentDocument = gql`
    mutation updateAppointment($appointment: AppointmentInput!) {
  updateAppointment(appointment: $appointment) {
    id
    subject
    startTime
    endTime
    reason
    color
    note
    conditionId
    speciality
    recurrenceId
    recurrenceException
    recurrenceRule
    isBlock
    isReadonly
    isAllDay
    type
    status
    location {
      id
      name
    }
    contact {
      id
      isDuplicate
      name
      gender
      telephone
      contactNumbers
      birthDate
      occupation
      partner
      country
      city
      identityNumber
      email
      createdOn
      modified
      contactType
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateAppointmentGQL extends Apollo.Mutation<UpdateAppointmentMutation, UpdateAppointmentMutationVariables> {
    document = UpdateAppointmentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateCardiologyConditionDocument = gql`
    mutation updateCardiologyCondition($patientId: String!, $condition: CardiologyConditionInput!) {
  updateCardiologyCondition(patientId: $patientId, condition: $condition) {
    id
    name
    type
    status
    subLocation
    opened
    closed
    location {
      id
      name
    }
    cheifComplaint {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    presentHistory {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    diagnosis {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    differentialDiagnosis {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    consultation {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    otherTreatments {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    physicalExam {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    laboratory {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    radio {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    note {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    isDuplicate
    isHidden
    medications {
      frequency
      note
      isActive
      usageType
      noSubstitutes
      startDate
      endDate
      describedBy
      drug {
        id
        name
        dosage
      }
    }
    activities {
      followups {
        id
        name
        type
        status
        subLocation
        isDuplicate
        opened
        closed
        location {
          id
          name
        }
        subjective {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        diagnosis {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        medication {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        otherTreatments {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        assessment {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        consultation {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        physicalExam {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        laboratory {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        note {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        radio {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        isHidden
        medications {
          frequency
          note
          isActive
          usageType
          noSubstitutes
          startDate
          endDate
          describedBy
          drug {
            id
            name
            dosage
          }
        }
        cardiologyClinicalExamination {
          bp
          hr
          pulse
          pulseClassification
          sound
          value
          intensity
          pericardialFriction
          lungAuscultation
          aspect
          puls
          rightSuperior
          rightTransverse
          rightInferior
          leftSuperior
          leftTransverse
          leftInferior
          hepatoJugularReflux
          neckCarotidMurmur
          soft
          tender
          hepatomegaly
          ascites
        }
      }
      operations {
        id
        name
        type
        status
        subLocation
        isDuplicate
        opened
        closed
        location {
          id
          name
        }
        department
        anesthesia {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        code
        operationType {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationPerformed {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationDiagnosis {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationPostDiagnosis {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationPreFindings {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationCategory {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        physicalExam {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        surgeons {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationDetails
      }
    }
    height
    weight
    bmi
    cardiologyClinicalExamination {
      bp
      hr
      pulse
      pulseClassification
      sound
      value
      intensity
      pericardialFriction
      lungAuscultation
      aspect
      puls
      rightSuperior
      rightTransverse
      rightInferior
      leftSuperior
      leftTransverse
      leftInferior
      hepatoJugularReflux
      neckCarotidMurmur
      soft
      tender
      hepatomegaly
      ascites
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCardiologyConditionGQL extends Apollo.Mutation<UpdateCardiologyConditionMutation, UpdateCardiologyConditionMutationVariables> {
    document = UpdateCardiologyConditionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateCardiologyFollowupDocument = gql`
    mutation updateCardiologyFollowup($patientId: String!, $conditionId: String!, $replacedConditionId: String, $followup: CardiologyFollowupInput!) {
  updateCardiologyFollowup(
    patientId: $patientId
    conditionId: $conditionId
    replacedConditionId: $replacedConditionId
    followup: $followup
  ) {
    id
    name
    type
    status
    subLocation
    isDuplicate
    opened
    closed
    location {
      id
      name
    }
    subjective {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    diagnosis {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    medication {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    otherTreatments {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    assessment {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    consultation {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    physicalExam {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    laboratory {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    note {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    radio {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    isHidden
    medications {
      frequency
      note
      isActive
      usageType
      noSubstitutes
      startDate
      endDate
      describedBy
      drug {
        id
        name
        dosage
      }
    }
    cardiologyClinicalExamination {
      bp
      hr
      pulse
      pulseClassification
      sound
      value
      intensity
      pericardialFriction
      lungAuscultation
      aspect
      puls
      rightSuperior
      rightTransverse
      rightInferior
      leftSuperior
      leftTransverse
      leftInferior
      hepatoJugularReflux
      neckCarotidMurmur
      soft
      tender
      hepatomegaly
      ascites
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCardiologyFollowupGQL extends Apollo.Mutation<UpdateCardiologyFollowupMutation, UpdateCardiologyFollowupMutationVariables> {
    document = UpdateCardiologyFollowupDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateCardiologyMedicalHistoryDocument = gql`
    mutation updateCardiologyMedicalHistory($patientId: String!, $medicalHistory: CardiologyMedicalHistoryInput!) {
  updateCardiologyMedicalHistory(
    patientId: $patientId
    medicalHistory: $medicalHistory
  ) {
    alerts {
      alert
      lastUpdate
      data {
        group
        value
        text
      }
    }
    allergies {
      alert
      lastUpdate
      data {
        group
        value
        text
      }
    }
    familyHistory {
      alert
      lastUpdate
      data {
        group
        value
        text
      }
    }
    medicalIssues {
      alert
      lastUpdate
      data {
        group
        value
        text
      }
    }
    cardioVascular {
      alert
      lastUpdate
      data {
        group
        value
        text
      }
    }
    gi {
      alert
      lastUpdate
      data {
        group
        value
        text
      }
    }
    endocrinology {
      alert
      lastUpdate
      data {
        group
        value
        text
      }
    }
    lungDiseases {
      alert
      lastUpdate
      data {
        group
        value
        text
      }
    }
    neurology {
      alert
      lastUpdate
      data {
        group
        value
        text
      }
    }
    physiomaticDisorder {
      alert
      lastUpdate
      data {
        group
        value
        text
      }
    }
    riskFactors {
      alert
      lastUpdate
      data {
        group
        value
        text
      }
    }
    pastMedication {
      alert
      lastUpdate
      data {
        frequency
        note
        isActive
        usageType
        noSubstitutes
        startDate
        endDate
        describedBy
        drug {
          id
          name
          dosage
        }
      }
    }
    presentMedication {
      alert
      lastUpdate
      data {
        frequency
        note
        isActive
        usageType
        noSubstitutes
        startDate
        endDate
        describedBy
        drug {
          id
          name
          dosage
        }
      }
    }
    surgicalHistory {
      alert
      lastUpdate
      data {
        note
        what {
          group
          value
          text
        }
        type
        when
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCardiologyMedicalHistoryGQL extends Apollo.Mutation<UpdateCardiologyMedicalHistoryMutation, UpdateCardiologyMedicalHistoryMutationVariables> {
    document = UpdateCardiologyMedicalHistoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateCardiologyOperationDocument = gql`
    mutation updateCardiologyOperation($patientId: String!, $conditionId: String!, $replacedConditionId: String, $operation: CardiologyOperationInput!) {
  updateCardiologyOperation(
    patientId: $patientId
    conditionId: $conditionId
    replacedConditionId: $replacedConditionId
    operation: $operation
  ) {
    id
    name
    type
    status
    subLocation
    isDuplicate
    opened
    closed
    location {
      id
      name
    }
    department
    anesthesia {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    code
    operationType {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationPerformed {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationDiagnosis {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationPostDiagnosis {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationPreFindings {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationCategory {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    physicalExam {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    surgeons {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationDetails
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCardiologyOperationGQL extends Apollo.Mutation<UpdateCardiologyOperationMutation, UpdateCardiologyOperationMutationVariables> {
    document = UpdateCardiologyOperationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateContactDocument = gql`
    mutation updateContact($contact: ContactInput!) {
  updateContact(contact: $contact) {
    id
    isDuplicate
    name
    gender
    telephone
    contactNumbers
    birthDate
    occupation
    partner
    country
    city
    identityNumber
    email
    createdOn
    modified
    contactType
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateContactGQL extends Apollo.Mutation<UpdateContactMutation, UpdateContactMutationVariables> {
    document = UpdateContactDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateDrugDocument = gql`
    mutation updateDrug($drug: DrugInput!) {
  updateDrug(drug: $drug) {
    id
    atcCode
    name
    dosage
    form
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateDrugGQL extends Apollo.Mutation<UpdateDrugMutation, UpdateDrugMutationVariables> {
    document = UpdateDrugDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateGeneralConditionDocument = gql`
    mutation updateGeneralCondition($patientId: String!, $condition: GeneralConditionInput!) {
  updateGeneralCondition(patientId: $patientId, condition: $condition) {
    id
    name
    type
    status
    subLocation
    opened
    closed
    location {
      id
      name
    }
    cheifComplaint {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    presentHistory {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    diagnosis {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    differentialDiagnosis {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    consultation {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    otherTreatments {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    physicalExam {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    laboratory {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    radio {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    note {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    isDuplicate
    isHidden
    medications {
      frequency
      note
      isActive
      usageType
      noSubstitutes
      startDate
      endDate
      describedBy
      drug {
        id
        name
        dosage
      }
    }
    activities {
      followups {
        id
        name
        type
        status
        subLocation
        isDuplicate
        opened
        closed
        location {
          id
          name
        }
        subjective {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        diagnosis {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        medication {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        otherTreatments {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        assessment {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        consultation {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        physicalExam {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        laboratory {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        note {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        radio {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        isHidden
        medications {
          frequency
          note
          isActive
          usageType
          noSubstitutes
          startDate
          endDate
          describedBy
          drug {
            id
            name
            dosage
          }
        }
      }
      operations {
        id
        name
        type
        status
        subLocation
        isDuplicate
        opened
        closed
        location {
          id
          name
        }
        department
        anesthesia {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        code
        operationType {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationPerformed {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationDiagnosis {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationPostDiagnosis {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationPreFindings {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationCategory {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        physicalExam {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        surgeons {
          text {
            group
            value
            text
          }
          media {
            text
            tags
            date
          }
          tags
        }
        operationDetails
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateGeneralConditionGQL extends Apollo.Mutation<UpdateGeneralConditionMutation, UpdateGeneralConditionMutationVariables> {
    document = UpdateGeneralConditionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateGeneralFollowupDocument = gql`
    mutation updateGeneralFollowup($patientId: String!, $conditionId: String!, $replacedConditionId: String, $followup: GeneralFollowupInput!) {
  updateGeneralFollowup(
    patientId: $patientId
    conditionId: $conditionId
    replacedConditionId: $replacedConditionId
    followup: $followup
  ) {
    id
    name
    type
    status
    subLocation
    isDuplicate
    opened
    closed
    location {
      id
      name
    }
    subjective {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    diagnosis {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    medication {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    otherTreatments {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    assessment {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    consultation {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    physicalExam {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    laboratory {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    note {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    radio {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    isHidden
    medications {
      frequency
      note
      isActive
      usageType
      noSubstitutes
      startDate
      endDate
      describedBy
      drug {
        id
        name
        dosage
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateGeneralFollowupGQL extends Apollo.Mutation<UpdateGeneralFollowupMutation, UpdateGeneralFollowupMutationVariables> {
    document = UpdateGeneralFollowupDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateGeneralMedicalHistoryDocument = gql`
    mutation updateGeneralMedicalHistory($patientId: String!, $medicalHistory: GeneralMedicalHistoryInput!) {
  updateGeneralMedicalHistory(
    patientId: $patientId
    medicalHistory: $medicalHistory
  ) {
    alerts {
      alert
      lastUpdate
      data {
        group
        value
        text
      }
    }
    allergies {
      alert
      lastUpdate
      data {
        group
        value
        text
      }
    }
    familyHistory {
      alert
      lastUpdate
      data {
        group
        value
        text
      }
    }
    medicalIssues {
      alert
      lastUpdate
      data {
        group
        value
        text
      }
    }
    pastMedication {
      alert
      lastUpdate
      data {
        frequency
        note
        isActive
        usageType
        noSubstitutes
        startDate
        endDate
        describedBy
        drug {
          id
          name
          dosage
        }
      }
    }
    presentMedication {
      alert
      lastUpdate
      data {
        frequency
        note
        isActive
        usageType
        noSubstitutes
        startDate
        endDate
        describedBy
        drug {
          id
          name
          dosage
        }
      }
    }
    surgicalHistory {
      alert
      lastUpdate
      data {
        note
        what
        when
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateGeneralMedicalHistoryGQL extends Apollo.Mutation<UpdateGeneralMedicalHistoryMutation, UpdateGeneralMedicalHistoryMutationVariables> {
    document = UpdateGeneralMedicalHistoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateGeneralOperationDocument = gql`
    mutation updateGeneralOperation($patientId: String!, $conditionId: String!, $replacedConditionId: String, $operation: GeneralOperationInput!) {
  updateGeneralOperation(
    patientId: $patientId
    conditionId: $conditionId
    replacedConditionId: $replacedConditionId
    operation: $operation
  ) {
    id
    name
    type
    status
    subLocation
    isDuplicate
    opened
    closed
    location {
      id
      name
    }
    department
    anesthesia {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    code
    operationType {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationPerformed {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationDiagnosis {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationPostDiagnosis {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationPreFindings {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationCategory {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    physicalExam {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    surgeons {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
    operationDetails
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateGeneralOperationGQL extends Apollo.Mutation<UpdateGeneralOperationMutation, UpdateGeneralOperationMutationVariables> {
    document = UpdateGeneralOperationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateGrantorDocument = gql`
    mutation updateGrantor($grantor: GrantorInput!) {
  updateGrantor(grantor: $grantor) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateGrantorGQL extends Apollo.Mutation<UpdateGrantorMutation, UpdateGrantorMutationVariables> {
    document = UpdateGrantorDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateLocationDocument = gql`
    mutation updateLocation($location: LocationInput!) {
  updateLocation(location: $location) {
    id
    name
    contact
    address
    type
    subLocations
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateLocationGQL extends Apollo.Mutation<UpdateLocationMutation, UpdateLocationMutationVariables> {
    document = UpdateLocationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateLookupDocument = gql`
    mutation updateLookup($lookup: LookupInput!) {
  updateLookup(lookup: $lookup) {
    id
    tenantId
    groupKey
    value
    symbol
    text
    description
    cultureName
    parentValue
    parentId
    createdDate
    modifiedDate
    order
    predefined
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateLookupGQL extends Apollo.Mutation<UpdateLookupMutation, UpdateLookupMutationVariables> {
    document = UpdateLookupDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateMediaFilesDocument = gql`
    mutation updateMediaFiles($mediaFiles: [MediaFileInput]!) {
  updateMediaFiles(mediaFiles: $mediaFiles) {
    id
    name
    path
    type
    size
    tenantId
    patientId
    patientName
    speciality
    conditionId
    activityType
    activityId
    ticketNumber
    isDeleted
    modified
    deletedOn
    systemTagging
    tags {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateMediaFilesGQL extends Apollo.Mutation<UpdateMediaFilesMutation, UpdateMediaFilesMutationVariables> {
    document = UpdateMediaFilesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateMedicationsDocument = gql`
    mutation updateMedications($patientMedications: PatientMedicationsInput!, $patientId: String!, $medicationId: String!) {
  updateMedications(
    patientMedications: $patientMedications
    patientId: $patientId
    medicationId: $medicationId
  ) {
    medicationId
    patientId
    conditionId
    followupId
    startTime
    endTime
    drug {
      id
      name
      dosage
    }
    isActive
    reason
    history {
      startDate
      endDate
      duration
      frequency
      note
      status
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateMedicationsGQL extends Apollo.Mutation<UpdateMedicationsMutation, UpdateMedicationsMutationVariables> {
    document = UpdateMedicationsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdatePatientDocument = gql`
    mutation updatePatient($patient: PatientInput!) {
  updatePatient(patient: $patient) {
    id
    name
    gender
    telephone
    contactNumbers
    birthDate
    occupation
    partner
    country
    city
    identityNumber
    email
    createdOn
    modified
    isDuplicate
    patientInfo {
      bloodType
      maritalStatus
      emergancyContact
      entryDate
      fileNumber
      referral
      lastSeen
      totalDigitizedData
      flags
      grantors {
        id
        name
      }
      tags {
        id
        name
        group
      }
      createdOn
      modified
      specialities {
        general {
          conditions {
            id
            name
            type
            status
            subLocation
            opened
            closed
            location {
              id
              name
            }
            cheifComplaint {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            presentHistory {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            diagnosis {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            differentialDiagnosis {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            consultation {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            otherTreatments {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            physicalExam {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            laboratory {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            radio {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            note {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            isDuplicate
            isHidden
            medications {
              frequency
              note
              isActive
              usageType
              noSubstitutes
              startDate
              endDate
              describedBy
              drug {
                id
                name
                dosage
              }
            }
            activities {
              followups {
                id
                name
                type
                status
                subLocation
                isDuplicate
                opened
                closed
                location {
                  id
                  name
                }
                subjective {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                diagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                medication {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                otherTreatments {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                assessment {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                consultation {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                physicalExam {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                laboratory {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                note {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                radio {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                isHidden
                medications {
                  frequency
                  note
                  isActive
                  usageType
                  noSubstitutes
                  startDate
                  endDate
                  describedBy
                  drug {
                    id
                    name
                    dosage
                  }
                }
              }
              operations {
                id
                name
                type
                status
                subLocation
                isDuplicate
                opened
                closed
                location {
                  id
                  name
                }
                department
                anesthesia {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                code
                operationType {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPerformed {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationDiagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPostDiagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPreFindings {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationCategory {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                physicalExam {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                surgeons {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationDetails
              }
            }
          }
          medicalHistory {
            alerts {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            allergies {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            familyHistory {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            medicalIssues {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            pastMedication {
              alert
              lastUpdate
              data {
                frequency
                note
                isActive
                usageType
                noSubstitutes
                startDate
                endDate
                describedBy
                drug {
                  id
                  name
                  dosage
                }
              }
            }
            presentMedication {
              alert
              lastUpdate
              data {
                frequency
                note
                isActive
                usageType
                noSubstitutes
                startDate
                endDate
                describedBy
                drug {
                  id
                  name
                  dosage
                }
              }
            }
            surgicalHistory {
              alert
              lastUpdate
              data {
                note
                what
                when
              }
            }
          }
        }
        cardiology {
          conditions {
            id
            name
            type
            status
            subLocation
            opened
            closed
            location {
              id
              name
            }
            cheifComplaint {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            presentHistory {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            diagnosis {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            differentialDiagnosis {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            consultation {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            otherTreatments {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            physicalExam {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            laboratory {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            radio {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            note {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            isDuplicate
            isHidden
            medications {
              frequency
              note
              isActive
              usageType
              noSubstitutes
              startDate
              endDate
              describedBy
              drug {
                id
                name
                dosage
              }
            }
            activities {
              followups {
                id
                name
                type
                status
                subLocation
                isDuplicate
                opened
                closed
                location {
                  id
                  name
                }
                subjective {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                diagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                medication {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                otherTreatments {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                assessment {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                consultation {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                physicalExam {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                laboratory {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                note {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                radio {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                isHidden
                medications {
                  frequency
                  note
                  isActive
                  usageType
                  noSubstitutes
                  startDate
                  endDate
                  describedBy
                  drug {
                    id
                    name
                    dosage
                  }
                }
                cardiologyClinicalExamination {
                  bp
                  hr
                  pulse
                  pulseClassification
                  sound
                  value
                  intensity
                  pericardialFriction
                  lungAuscultation
                  aspect
                  puls
                  rightSuperior
                  rightTransverse
                  rightInferior
                  leftSuperior
                  leftTransverse
                  leftInferior
                  hepatoJugularReflux
                  neckCarotidMurmur
                  soft
                  tender
                  hepatomegaly
                  ascites
                }
              }
              operations {
                id
                name
                type
                status
                subLocation
                isDuplicate
                opened
                closed
                location {
                  id
                  name
                }
                department
                anesthesia {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                code
                operationType {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPerformed {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationDiagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPostDiagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPreFindings {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationCategory {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                physicalExam {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                surgeons {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationDetails
              }
            }
            height
            weight
            bmi
            cardiologyClinicalExamination {
              bp
              hr
              pulse
              pulseClassification
              sound
              value
              intensity
              pericardialFriction
              lungAuscultation
              aspect
              puls
              rightSuperior
              rightTransverse
              rightInferior
              leftSuperior
              leftTransverse
              leftInferior
              hepatoJugularReflux
              neckCarotidMurmur
              soft
              tender
              hepatomegaly
              ascites
            }
          }
          medicalHistory {
            alerts {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            allergies {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            familyHistory {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            medicalIssues {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            cardioVascular {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            gi {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            endocrinology {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            lungDiseases {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            neurology {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            physiomaticDisorder {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            riskFactors {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            pastMedication {
              alert
              lastUpdate
              data {
                frequency
                note
                isActive
                usageType
                noSubstitutes
                startDate
                endDate
                describedBy
                drug {
                  id
                  name
                  dosage
                }
              }
            }
            presentMedication {
              alert
              lastUpdate
              data {
                frequency
                note
                isActive
                usageType
                noSubstitutes
                startDate
                endDate
                describedBy
                drug {
                  id
                  name
                  dosage
                }
              }
            }
            surgicalHistory {
              alert
              lastUpdate
              data {
                note
                what {
                  group
                  value
                  text
                }
                type
                when
              }
            }
          }
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdatePatientGQL extends Apollo.Mutation<UpdatePatientMutation, UpdatePatientMutationVariables> {
    document = UpdatePatientDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateRotaDocument = gql`
    mutation updateRota($rota: RotaInput!) {
  updateRota(rota: $rota) {
    id
    name
    color
    location {
      id
      name
    }
    recurrence {
      startTime
      endTime
      rule
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateRotaGQL extends Apollo.Mutation<UpdateRotaMutation, UpdateRotaMutationVariables> {
    document = UpdateRotaDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateScheduleDocument = gql`
    mutation updateSchedule($schedule: ScheduleInput!) {
  updateSchedule(schedule: $schedule) {
    id
    startHour
    endHour
    displayRota
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateScheduleGQL extends Apollo.Mutation<UpdateScheduleMutation, UpdateScheduleMutationVariables> {
    document = UpdateScheduleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateSettingsDocument = gql`
    mutation updateSettings($settings: SettingsInput!) {
  updateSettings(settings: $settings) {
    id
    specialties
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateSettingsGQL extends Apollo.Mutation<UpdateSettingsMutation, UpdateSettingsMutationVariables> {
    document = UpdateSettingsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateTagDocument = gql`
    mutation updateTag($tag: TagInput!) {
  updateTag(tag: $tag) {
    id
    name
    group
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateTagGQL extends Apollo.Mutation<UpdateTagMutation, UpdateTagMutationVariables> {
    document = UpdateTagDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateTicketDocument = gql`
    mutation updateTicket($ticket: TicketInput!, $broadcast: Boolean) {
  updateTicket(ticket: $ticket, broadcast: $broadcast) {
    id
    ticketNumber
    tenantName
    subject
    details
    status
    attachFile
    isReadByAdmin
    isReadByClient
    ticketDate
    messages {
      message
      requestBy
      messageDate
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateTicketGQL extends Apollo.Mutation<UpdateTicketMutation, UpdateTicketMutationVariables> {
    document = UpdateTicketDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateTicketAdminDocument = gql`
    mutation updateTicketAdmin($ticket: TicketInput!, $broadcast: Boolean) {
  updateTicketAdmin(ticket: $ticket, broadcast: $broadcast) {
    id
    ticketNumber
    tenantName
    subject
    details
    status
    attachFile
    isReadByAdmin
    isReadByClient
    ticketDate
    messages {
      message
      requestBy
      messageDate
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateTicketAdminGQL extends Apollo.Mutation<UpdateTicketAdminMutation, UpdateTicketAdminMutationVariables> {
    document = UpdateTicketAdminDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateTodoDocument = gql`
    mutation updateTodo($todo: TodoInput!) {
  updateTodo(todo: $todo) {
    id
    title
    notes
    startDate
    dueDate
    isCompleted
    isStarred
    isImportant
    patientId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateTodoGQL extends Apollo.Mutation<UpdateTodoMutation, UpdateTodoMutationVariables> {
    document = UpdateTodoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ActivityMediaFilesDocument = gql`
    query activityMediaFiles($patientId: String!, $speciality: String, $conditionId: String, $activitType: String, $activityId: String, $filter: String, $page: Int, $size: Int) {
  activityMediaFiles(
    patientId: $patientId
    speciality: $speciality
    conditionId: $conditionId
    activitType: $activitType
    activityId: $activityId
    filter: $filter
    page: $page
    size: $size
  ) {
    id
    name
    path
    type
    size
    tenantId
    patientId
    patientName
    speciality
    conditionId
    activityType
    activityId
    ticketNumber
    isDeleted
    modified
    deletedOn
    systemTagging
    tags {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ActivityMediaFilesGQL extends Apollo.Query<ActivityMediaFilesQuery, ActivityMediaFilesQueryVariables> {
    document = ActivityMediaFilesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AllTicketsDocument = gql`
    query allTickets($filter: String, $page: Int, $size: Int, $descending: Boolean, $sortBy: String, $type: String) {
  allTickets(
    filter: $filter
    page: $page
    size: $size
    descending: $descending
    sortBy: $sortBy
    type: $type
  ) {
    count
    items {
      id
      ticketNumber
      tenantName
      subject
      details
      status
      attachFile
      isReadByAdmin
      isReadByClient
      ticketDate
      messages {
        message
        requestBy
        messageDate
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllTicketsGQL extends Apollo.Query<AllTicketsQuery, AllTicketsQueryVariables> {
    document = AllTicketsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AppointmentDocument = gql`
    query appointment($id: String!) {
  appointment(id: $id) {
    id
    subject
    startTime
    endTime
    reason
    color
    note
    conditionId
    speciality
    recurrenceId
    recurrenceException
    recurrenceRule
    isBlock
    isReadonly
    isAllDay
    type
    status
    location {
      id
      name
    }
    contact {
      id
      isDuplicate
      name
      gender
      telephone
      contactNumbers
      birthDate
      occupation
      partner
      country
      city
      identityNumber
      email
      createdOn
      modified
      contactType
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AppointmentGQL extends Apollo.Query<AppointmentQuery, AppointmentQueryVariables> {
    document = AppointmentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AppointmentsDocument = gql`
    query appointments($startTime: DateTime, $endTime: DateTime, $sortBy: String, $page: Int, $size: Int, $filter: String, $descending: Boolean) {
  appointments(
    startTime: $startTime
    endTime: $endTime
    sortBy: $sortBy
    page: $page
    size: $size
    filter: $filter
    descending: $descending
  ) {
    id
    subject
    startTime
    endTime
    reason
    color
    note
    conditionId
    speciality
    recurrenceId
    recurrenceException
    recurrenceRule
    isBlock
    isReadonly
    isAllDay
    type
    status
    location {
      id
      name
    }
    contact {
      id
      isDuplicate
      name
      gender
      telephone
      contactNumbers
      birthDate
      occupation
      partner
      country
      city
      identityNumber
      email
      createdOn
      modified
      contactType
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AppointmentsGQL extends Apollo.Query<AppointmentsQuery, AppointmentsQueryVariables> {
    document = AppointmentsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ConditionsDocument = gql`
    query conditions {
  conditions {
    name
    type
    closed
    opened
    status
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ConditionsGQL extends Apollo.Query<ConditionsQuery, ConditionsQueryVariables> {
    document = ConditionsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ContactDocument = gql`
    query contact($id: String!) {
  contact(id: $id) {
    id
    isDuplicate
    name
    gender
    telephone
    contactNumbers
    birthDate
    occupation
    partner
    country
    city
    identityNumber
    email
    createdOn
    modified
    contactType
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ContactGQL extends Apollo.Query<ContactQuery, ContactQueryVariables> {
    document = ContactDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ContactsDocument = gql`
    query contacts($sortBy: String, $page: Int, $size: Int, $filter: String, $descending: Boolean) {
  contacts(
    sortBy: $sortBy
    page: $page
    size: $size
    filter: $filter
    descending: $descending
  ) {
    id
    isDuplicate
    name
    gender
    telephone
    contactNumbers
    birthDate
    occupation
    partner
    country
    city
    identityNumber
    email
    createdOn
    modified
    contactType
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ContactsGQL extends Apollo.Query<ContactsQuery, ContactsQueryVariables> {
    document = ContactsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ContactsTotalDocument = gql`
    query contactsTotal($sortBy: String, $page: Int, $size: Int, $filter: String, $descending: Boolean) {
  contactsTotal(
    sortBy: $sortBy
    page: $page
    size: $size
    filter: $filter
    descending: $descending
  )
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ContactsTotalGQL extends Apollo.Query<ContactsTotalQuery, ContactsTotalQueryVariables> {
    document = ContactsTotalDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DrugDocument = gql`
    query drug($id: String!) {
  drug(id: $id) {
    id
    atcCode
    name
    dosage
    form
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DrugGQL extends Apollo.Query<DrugQuery, DrugQueryVariables> {
    document = DrugDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DrugsDocument = gql`
    query drugs($filter: String, $page: Int, $size: Int) {
  drugs(filter: $filter, page: $page, size: $size) {
    id
    atcCode
    name
    dosage
    form
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DrugsGQL extends Apollo.Query<DrugsQuery, DrugsQueryVariables> {
    document = DrugsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAppointmentsEventsDocument = gql`
    query getAppointmentsEvents {
  getAppointmentsEvents {
    content {
      id
      subject
      startTime
      endTime
      reason
      color
      note
      conditionId
      speciality
      recurrenceId
      recurrenceException
      recurrenceRule
      isBlock
      isReadonly
      isAllDay
      type
      status
      location {
        id
        name
      }
      contact {
        id
        isDuplicate
        name
        gender
        telephone
        contactNumbers
        birthDate
        occupation
        partner
        country
        city
        identityNumber
        email
        createdOn
        modified
        contactType
      }
    }
    event
    sentAt
    sub
    from {
      id
      displayName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAppointmentsEventsGQL extends Apollo.Query<GetAppointmentsEventsQuery, GetAppointmentsEventsQueryVariables> {
    document = GetAppointmentsEventsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GrantorDocument = gql`
    query grantor($id: String!) {
  grantor(id: $id) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GrantorGQL extends Apollo.Query<GrantorQuery, GrantorQueryVariables> {
    document = GrantorDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GrantorsDocument = gql`
    query grantors($filter: String, $page: Int, $size: Int) {
  grantors(filter: $filter, page: $page, size: $size) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GrantorsGQL extends Apollo.Query<GrantorsQuery, GrantorsQueryVariables> {
    document = GrantorsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GrantorsTotalDocument = gql`
    query grantorsTotal($filter: String, $page: Int, $size: Int) {
  grantorsTotal(filter: $filter, page: $page, size: $size)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GrantorsTotalGQL extends Apollo.Query<GrantorsTotalQuery, GrantorsTotalQueryVariables> {
    document = GrantorsTotalDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LocationDocument = gql`
    query location($id: String!) {
  location(id: $id) {
    id
    name
    contact
    address
    type
    subLocations
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LocationGQL extends Apollo.Query<LocationQuery, LocationQueryVariables> {
    document = LocationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LocationsDocument = gql`
    query locations {
  locations {
    id
    name
    contact
    address
    type
    subLocations
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LocationsGQL extends Apollo.Query<LocationsQuery, LocationsQueryVariables> {
    document = LocationsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LookupDocument = gql`
    query lookup($id: String!) {
  lookup(id: $id) {
    id
    tenantId
    groupKey
    value
    symbol
    text
    description
    cultureName
    parentValue
    parentId
    createdDate
    modifiedDate
    order
    predefined
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LookupGQL extends Apollo.Query<LookupQuery, LookupQueryVariables> {
    document = LookupDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LookupByTextDocument = gql`
    query lookupByText($text: String!, $group: String!) {
  lookupByText(text: $text, group: $group) {
    id
    tenantId
    groupKey
    value
    symbol
    text
    description
    cultureName
    parentValue
    parentId
    createdDate
    modifiedDate
    order
    predefined
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LookupByTextGQL extends Apollo.Query<LookupByTextQuery, LookupByTextQueryVariables> {
    document = LookupByTextDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LookupByValueDocument = gql`
    query lookupByValue($value: String!, $group: String!) {
  lookupByValue(value: $value, group: $group) {
    id
    tenantId
    groupKey
    value
    symbol
    text
    description
    cultureName
    parentValue
    parentId
    createdDate
    modifiedDate
    order
    predefined
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LookupByValueGQL extends Apollo.Query<LookupByValueQuery, LookupByValueQueryVariables> {
    document = LookupByValueDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LookupsDocument = gql`
    query lookups {
  lookups {
    id
    tenantId
    groupKey
    value
    symbol
    text
    description
    cultureName
    parentValue
    parentId
    createdDate
    modifiedDate
    order
    predefined
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LookupsGQL extends Apollo.Query<LookupsQuery, LookupsQueryVariables> {
    document = LookupsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LookupsByGroupDocument = gql`
    query lookupsByGroup($group: String!, $filter: String, $page: Int, $size: Int, $filterPredefined: Boolean) {
  lookupsByGroup(
    group: $group
    filter: $filter
    page: $page
    size: $size
    filterPredefined: $filterPredefined
  ) {
    id
    tenantId
    groupKey
    value
    symbol
    text
    description
    cultureName
    parentValue
    parentId
    createdDate
    modifiedDate
    order
    predefined
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LookupsByGroupGQL extends Apollo.Query<LookupsByGroupQuery, LookupsByGroupQueryVariables> {
    document = LookupsByGroupDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LookupsByGroupTotalDocument = gql`
    query lookupsByGroupTotal($group: String!, $filter: String, $page: Int, $size: Int, $filterPredefined: Boolean) {
  lookupsByGroupTotal(
    group: $group
    filter: $filter
    page: $page
    size: $size
    filterPredefined: $filterPredefined
  )
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LookupsByGroupTotalGQL extends Apollo.Query<LookupsByGroupTotalQuery, LookupsByGroupTotalQueryVariables> {
    document = LookupsByGroupTotalDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LookupsByGroupsDocument = gql`
    query lookupsByGroups($groups: [String]!, $filterPredefined: Boolean) {
  lookupsByGroups(groups: $groups, filterPredefined: $filterPredefined) {
    id
    tenantId
    groupKey
    value
    symbol
    text
    description
    cultureName
    parentValue
    parentId
    createdDate
    modifiedDate
    order
    predefined
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LookupsByGroupsGQL extends Apollo.Query<LookupsByGroupsQuery, LookupsByGroupsQueryVariables> {
    document = LookupsByGroupsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const MediaFileDocument = gql`
    query mediaFile($id: String!) {
  mediaFile(id: $id) {
    id
    name
    path
    type
    size
    tenantId
    patientId
    patientName
    speciality
    conditionId
    activityType
    activityId
    ticketNumber
    isDeleted
    modified
    deletedOn
    systemTagging
    tags {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MediaFileGQL extends Apollo.Query<MediaFileQuery, MediaFileQueryVariables> {
    document = MediaFileDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const MediaFilesDocument = gql`
    query mediaFiles {
  mediaFiles {
    id
    name
    path
    type
    size
    tenantId
    patientId
    patientName
    speciality
    conditionId
    activityType
    activityId
    ticketNumber
    isDeleted
    modified
    deletedOn
    systemTagging
    tags {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MediaFilesGQL extends Apollo.Query<MediaFilesQuery, MediaFilesQueryVariables> {
    document = MediaFilesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const MessagesDocument = gql`
    query messages {
  messages {
    content
    sentAt
    sub
    from {
      id
      displayName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MessagesGQL extends Apollo.Query<MessagesQuery, MessagesQueryVariables> {
    document = MessagesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PatientDocument = gql`
    query patient($id: String!) {
  patient(id: $id) {
    id
    name
    gender
    telephone
    contactNumbers
    birthDate
    occupation
    partner
    country
    city
    identityNumber
    email
    createdOn
    modified
    isDuplicate
    patientInfo {
      bloodType
      maritalStatus
      emergancyContact
      entryDate
      fileNumber
      referral
      lastSeen
      totalDigitizedData
      flags
      grantors {
        id
        name
      }
      tags {
        id
        name
        group
      }
      createdOn
      modified
      specialities {
        general {
          conditions {
            id
            name
            type
            status
            subLocation
            opened
            closed
            location {
              id
              name
            }
            cheifComplaint {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            presentHistory {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            diagnosis {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            differentialDiagnosis {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            consultation {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            otherTreatments {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            physicalExam {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            laboratory {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            radio {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            note {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            isDuplicate
            isHidden
            medications {
              frequency
              note
              isActive
              usageType
              noSubstitutes
              startDate
              endDate
              describedBy
              drug {
                id
                name
                dosage
              }
            }
            activities {
              followups {
                id
                name
                type
                status
                subLocation
                isDuplicate
                opened
                closed
                location {
                  id
                  name
                }
                subjective {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                diagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                medication {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                otherTreatments {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                assessment {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                consultation {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                physicalExam {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                laboratory {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                note {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                radio {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                isHidden
                medications {
                  frequency
                  note
                  isActive
                  usageType
                  noSubstitutes
                  startDate
                  endDate
                  describedBy
                  drug {
                    id
                    name
                    dosage
                  }
                }
              }
              operations {
                id
                name
                type
                status
                subLocation
                isDuplicate
                opened
                closed
                location {
                  id
                  name
                }
                department
                anesthesia {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                code
                operationType {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPerformed {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationDiagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPostDiagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPreFindings {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationCategory {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                physicalExam {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                surgeons {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationDetails
              }
            }
          }
          medicalHistory {
            alerts {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            allergies {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            familyHistory {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            medicalIssues {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            pastMedication {
              alert
              lastUpdate
              data {
                frequency
                note
                isActive
                usageType
                noSubstitutes
                startDate
                endDate
                describedBy
                drug {
                  id
                  name
                  dosage
                }
              }
            }
            presentMedication {
              alert
              lastUpdate
              data {
                frequency
                note
                isActive
                usageType
                noSubstitutes
                startDate
                endDate
                describedBy
                drug {
                  id
                  name
                  dosage
                }
              }
            }
            surgicalHistory {
              alert
              lastUpdate
              data {
                note
                what
                when
              }
            }
          }
        }
        cardiology {
          conditions {
            id
            name
            type
            status
            subLocation
            opened
            closed
            location {
              id
              name
            }
            cheifComplaint {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            presentHistory {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            diagnosis {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            differentialDiagnosis {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            consultation {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            otherTreatments {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            physicalExam {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            laboratory {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            radio {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            note {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            isDuplicate
            isHidden
            medications {
              frequency
              note
              isActive
              usageType
              noSubstitutes
              startDate
              endDate
              describedBy
              drug {
                id
                name
                dosage
              }
            }
            activities {
              followups {
                id
                name
                type
                status
                subLocation
                isDuplicate
                opened
                closed
                location {
                  id
                  name
                }
                subjective {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                diagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                medication {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                otherTreatments {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                assessment {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                consultation {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                physicalExam {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                laboratory {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                note {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                radio {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                isHidden
                medications {
                  frequency
                  note
                  isActive
                  usageType
                  noSubstitutes
                  startDate
                  endDate
                  describedBy
                  drug {
                    id
                    name
                    dosage
                  }
                }
                cardiologyClinicalExamination {
                  bp
                  hr
                  pulse
                  pulseClassification
                  sound
                  value
                  intensity
                  pericardialFriction
                  lungAuscultation
                  aspect
                  puls
                  rightSuperior
                  rightTransverse
                  rightInferior
                  leftSuperior
                  leftTransverse
                  leftInferior
                  hepatoJugularReflux
                  neckCarotidMurmur
                  soft
                  tender
                  hepatomegaly
                  ascites
                }
              }
              operations {
                id
                name
                type
                status
                subLocation
                isDuplicate
                opened
                closed
                location {
                  id
                  name
                }
                department
                anesthesia {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                code
                operationType {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPerformed {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationDiagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPostDiagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPreFindings {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationCategory {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                physicalExam {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                surgeons {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationDetails
              }
            }
            height
            weight
            bmi
            cardiologyClinicalExamination {
              bp
              hr
              pulse
              pulseClassification
              sound
              value
              intensity
              pericardialFriction
              lungAuscultation
              aspect
              puls
              rightSuperior
              rightTransverse
              rightInferior
              leftSuperior
              leftTransverse
              leftInferior
              hepatoJugularReflux
              neckCarotidMurmur
              soft
              tender
              hepatomegaly
              ascites
            }
          }
          medicalHistory {
            alerts {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            allergies {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            familyHistory {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            medicalIssues {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            cardioVascular {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            gi {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            endocrinology {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            lungDiseases {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            neurology {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            physiomaticDisorder {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            riskFactors {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            pastMedication {
              alert
              lastUpdate
              data {
                frequency
                note
                isActive
                usageType
                noSubstitutes
                startDate
                endDate
                describedBy
                drug {
                  id
                  name
                  dosage
                }
              }
            }
            presentMedication {
              alert
              lastUpdate
              data {
                frequency
                note
                isActive
                usageType
                noSubstitutes
                startDate
                endDate
                describedBy
                drug {
                  id
                  name
                  dosage
                }
              }
            }
            surgicalHistory {
              alert
              lastUpdate
              data {
                note
                what {
                  group
                  value
                  text
                }
                type
                when
              }
            }
          }
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PatientGQL extends Apollo.Query<PatientQuery, PatientQueryVariables> {
    document = PatientDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PatientMediaFilesDocument = gql`
    query patientMediaFiles($patientId: String!, $page: Int, $size: Int, $filter: String) {
  patientMediaFiles(
    patientId: $patientId
    page: $page
    size: $size
    filter: $filter
  ) {
    id
    name
    path
    type
    size
    tenantId
    patientId
    patientName
    speciality
    conditionId
    activityType
    activityId
    ticketNumber
    isDeleted
    modified
    deletedOn
    systemTagging
    tags {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PatientMediaFilesGQL extends Apollo.Query<PatientMediaFilesQuery, PatientMediaFilesQueryVariables> {
    document = PatientMediaFilesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PatientMediaFilesTotalDocument = gql`
    query patientMediaFilesTotal($page: Int, $size: Int, $filter: String, $patientId: String) {
  patientMediaFilesTotal(
    page: $page
    size: $size
    filter: $filter
    patientId: $patientId
  )
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PatientMediaFilesTotalGQL extends Apollo.Query<PatientMediaFilesTotalQuery, PatientMediaFilesTotalQueryVariables> {
    document = PatientMediaFilesTotalDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PatientMediaPoolFilesDocument = gql`
    query patientMediaPoolFiles($patientId: String!, $page: Int, $size: Int, $filter: String) {
  patientMediaPoolFiles(
    patientId: $patientId
    page: $page
    size: $size
    filter: $filter
  ) {
    id
    name
    path
    type
    size
    tenantId
    patientId
    patientName
    speciality
    conditionId
    activityType
    activityId
    ticketNumber
    isDeleted
    modified
    deletedOn
    systemTagging
    tags {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PatientMediaPoolFilesGQL extends Apollo.Query<PatientMediaPoolFilesQuery, PatientMediaPoolFilesQueryVariables> {
    document = PatientMediaPoolFilesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PatientMedicationDocument = gql`
    query patientMedication($patientId: String!) {
  patientMedication(patientId: $patientId) {
    medicationId
    patientId
    conditionId
    followupId
    startTime
    endTime
    drug {
      id
      name
      dosage
    }
    isActive
    reason
    history {
      startDate
      endDate
      duration
      frequency
      note
      status
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PatientMedicationGQL extends Apollo.Query<PatientMedicationQuery, PatientMedicationQueryVariables> {
    document = PatientMedicationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PatientMedicationByConditionDocument = gql`
    query patientMedicationByCondition($patientId: String!, $conditionId: String) {
  patientMedicationByCondition(patientId: $patientId, conditionId: $conditionId) {
    medicationId
    patientId
    conditionId
    followupId
    startTime
    endTime
    drug {
      id
      name
      dosage
    }
    isActive
    reason
    history {
      startDate
      endDate
      duration
      frequency
      note
      status
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PatientMedicationByConditionGQL extends Apollo.Query<PatientMedicationByConditionQuery, PatientMedicationByConditionQueryVariables> {
    document = PatientMedicationByConditionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PatientMedicationByFollowupDocument = gql`
    query patientMedicationByFollowup($patientId: String!, $followupId: String) {
  patientMedicationByFollowup(patientId: $patientId, followupId: $followupId) {
    medicationId
    patientId
    conditionId
    followupId
    startTime
    endTime
    drug {
      id
      name
      dosage
    }
    isActive
    reason
    history {
      startDate
      endDate
      duration
      frequency
      note
      status
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PatientMedicationByFollowupGQL extends Apollo.Query<PatientMedicationByFollowupQuery, PatientMedicationByFollowupQueryVariables> {
    document = PatientMedicationByFollowupDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PatientMedicationsDocument = gql`
    query patientMedications($startTime: DateTime, $endTime: DateTime, $sortBy: String, $page: Int, $size: Int, $descending: Boolean) {
  patientMedications(
    startTime: $startTime
    endTime: $endTime
    sortBy: $sortBy
    page: $page
    size: $size
    descending: $descending
  ) {
    medicationId
    patientId
    conditionId
    followupId
    startTime
    endTime
    drug {
      id
      name
      dosage
    }
    isActive
    reason
    history {
      startDate
      endDate
      duration
      frequency
      note
      status
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PatientMedicationsGQL extends Apollo.Query<PatientMedicationsQuery, PatientMedicationsQueryVariables> {
    document = PatientMedicationsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PatientsDocument = gql`
    query patients($sortBy: String, $page: Int, $size: Int, $filter: String, $descending: Boolean) {
  patients(
    sortBy: $sortBy
    page: $page
    size: $size
    filter: $filter
    descending: $descending
  ) {
    id
    name
    gender
    telephone
    contactNumbers
    birthDate
    occupation
    partner
    country
    city
    identityNumber
    email
    createdOn
    modified
    isDuplicate
    patientInfo {
      bloodType
      maritalStatus
      emergancyContact
      entryDate
      fileNumber
      referral
      lastSeen
      totalDigitizedData
      flags
      grantors {
        id
        name
      }
      tags {
        id
        name
        group
      }
      createdOn
      modified
      specialities {
        general {
          conditions {
            id
            name
            type
            status
            subLocation
            opened
            closed
            location {
              id
              name
            }
            cheifComplaint {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            presentHistory {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            diagnosis {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            differentialDiagnosis {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            consultation {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            otherTreatments {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            physicalExam {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            laboratory {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            radio {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            note {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            isDuplicate
            isHidden
            medications {
              frequency
              note
              isActive
              usageType
              noSubstitutes
              startDate
              endDate
              describedBy
              drug {
                id
                name
                dosage
              }
            }
            activities {
              followups {
                id
                name
                type
                status
                subLocation
                isDuplicate
                opened
                closed
                location {
                  id
                  name
                }
                subjective {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                diagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                medication {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                otherTreatments {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                assessment {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                consultation {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                physicalExam {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                laboratory {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                note {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                radio {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                isHidden
                medications {
                  frequency
                  note
                  isActive
                  usageType
                  noSubstitutes
                  startDate
                  endDate
                  describedBy
                  drug {
                    id
                    name
                    dosage
                  }
                }
              }
              operations {
                id
                name
                type
                status
                subLocation
                isDuplicate
                opened
                closed
                location {
                  id
                  name
                }
                department
                anesthesia {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                code
                operationType {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPerformed {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationDiagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPostDiagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPreFindings {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationCategory {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                physicalExam {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                surgeons {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationDetails
              }
            }
          }
          medicalHistory {
            alerts {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            allergies {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            familyHistory {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            medicalIssues {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            pastMedication {
              alert
              lastUpdate
              data {
                frequency
                note
                isActive
                usageType
                noSubstitutes
                startDate
                endDate
                describedBy
                drug {
                  id
                  name
                  dosage
                }
              }
            }
            presentMedication {
              alert
              lastUpdate
              data {
                frequency
                note
                isActive
                usageType
                noSubstitutes
                startDate
                endDate
                describedBy
                drug {
                  id
                  name
                  dosage
                }
              }
            }
            surgicalHistory {
              alert
              lastUpdate
              data {
                note
                what
                when
              }
            }
          }
        }
        cardiology {
          conditions {
            id
            name
            type
            status
            subLocation
            opened
            closed
            location {
              id
              name
            }
            cheifComplaint {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            presentHistory {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            diagnosis {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            differentialDiagnosis {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            consultation {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            otherTreatments {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            physicalExam {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            laboratory {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            radio {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            note {
              text {
                group
                value
                text
              }
              media {
                text
                tags
                date
              }
              tags
            }
            isDuplicate
            isHidden
            medications {
              frequency
              note
              isActive
              usageType
              noSubstitutes
              startDate
              endDate
              describedBy
              drug {
                id
                name
                dosage
              }
            }
            activities {
              followups {
                id
                name
                type
                status
                subLocation
                isDuplicate
                opened
                closed
                location {
                  id
                  name
                }
                subjective {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                diagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                medication {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                otherTreatments {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                assessment {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                consultation {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                physicalExam {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                laboratory {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                note {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                radio {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                isHidden
                medications {
                  frequency
                  note
                  isActive
                  usageType
                  noSubstitutes
                  startDate
                  endDate
                  describedBy
                  drug {
                    id
                    name
                    dosage
                  }
                }
                cardiologyClinicalExamination {
                  bp
                  hr
                  pulse
                  pulseClassification
                  sound
                  value
                  intensity
                  pericardialFriction
                  lungAuscultation
                  aspect
                  puls
                  rightSuperior
                  rightTransverse
                  rightInferior
                  leftSuperior
                  leftTransverse
                  leftInferior
                  hepatoJugularReflux
                  neckCarotidMurmur
                  soft
                  tender
                  hepatomegaly
                  ascites
                }
              }
              operations {
                id
                name
                type
                status
                subLocation
                isDuplicate
                opened
                closed
                location {
                  id
                  name
                }
                department
                anesthesia {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                code
                operationType {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPerformed {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationDiagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPostDiagnosis {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationPreFindings {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationCategory {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                physicalExam {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                surgeons {
                  text {
                    group
                    value
                    text
                  }
                  media {
                    text
                    tags
                    date
                  }
                  tags
                }
                operationDetails
              }
            }
            height
            weight
            bmi
            cardiologyClinicalExamination {
              bp
              hr
              pulse
              pulseClassification
              sound
              value
              intensity
              pericardialFriction
              lungAuscultation
              aspect
              puls
              rightSuperior
              rightTransverse
              rightInferior
              leftSuperior
              leftTransverse
              leftInferior
              hepatoJugularReflux
              neckCarotidMurmur
              soft
              tender
              hepatomegaly
              ascites
            }
          }
          medicalHistory {
            alerts {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            allergies {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            familyHistory {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            medicalIssues {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            cardioVascular {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            gi {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            endocrinology {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            lungDiseases {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            neurology {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            physiomaticDisorder {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            riskFactors {
              alert
              lastUpdate
              data {
                group
                value
                text
              }
            }
            pastMedication {
              alert
              lastUpdate
              data {
                frequency
                note
                isActive
                usageType
                noSubstitutes
                startDate
                endDate
                describedBy
                drug {
                  id
                  name
                  dosage
                }
              }
            }
            presentMedication {
              alert
              lastUpdate
              data {
                frequency
                note
                isActive
                usageType
                noSubstitutes
                startDate
                endDate
                describedBy
                drug {
                  id
                  name
                  dosage
                }
              }
            }
            surgicalHistory {
              alert
              lastUpdate
              data {
                note
                what {
                  group
                  value
                  text
                }
                type
                when
              }
            }
          }
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PatientsGQL extends Apollo.Query<PatientsQuery, PatientsQueryVariables> {
    document = PatientsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PatientsMediaFilesDocument = gql`
    query patientsMediaFiles($page: Int, $size: Int, $filter: String, $patientId: String) {
  patientsMediaFiles(
    page: $page
    size: $size
    filter: $filter
    patientId: $patientId
  ) {
    id
    patientName
    imagesCount
    pdfCount
    pool {
      id
      name
      path
      type
      size
      tenantId
      patientId
      patientName
      speciality
      conditionId
      activityType
      activityId
      ticketNumber
      isDeleted
      modified
      deletedOn
      systemTagging
      tags {
        text {
          group
          value
          text
        }
        media {
          text
          tags
          date
        }
        tags
      }
    }
    files {
      id
      name
      path
      type
      size
      tenantId
      patientId
      patientName
      speciality
      conditionId
      activityType
      activityId
      ticketNumber
      isDeleted
      modified
      deletedOn
      systemTagging
      tags {
        text {
          group
          value
          text
        }
        media {
          text
          tags
          date
        }
        tags
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PatientsMediaFilesGQL extends Apollo.Query<PatientsMediaFilesQuery, PatientsMediaFilesQueryVariables> {
    document = PatientsMediaFilesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PatientsTotalDocument = gql`
    query patientsTotal($sortBy: String, $page: Int, $size: Int, $filter: String, $descending: Boolean) {
  patientsTotal(
    sortBy: $sortBy
    page: $page
    size: $size
    filter: $filter
    descending: $descending
  )
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PatientsTotalGQL extends Apollo.Query<PatientsTotalQuery, PatientsTotalQueryVariables> {
    document = PatientsTotalDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RotaDocument = gql`
    query rota($id: String!) {
  rota(id: $id) {
    id
    name
    color
    location {
      id
      name
    }
    recurrence {
      startTime
      endTime
      rule
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RotaGQL extends Apollo.Query<RotaQuery, RotaQueryVariables> {
    document = RotaDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RotaAllDocument = gql`
    query rotaAll {
  rotaAll {
    id
    name
    color
    location {
      id
      name
    }
    recurrence {
      startTime
      endTime
      rule
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RotaAllGQL extends Apollo.Query<RotaAllQuery, RotaAllQueryVariables> {
    document = RotaAllDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ScheduleDocument = gql`
    query schedule {
  schedule {
    id
    startHour
    endHour
    displayRota
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ScheduleGQL extends Apollo.Query<ScheduleQuery, ScheduleQueryVariables> {
    document = ScheduleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SettingsDocument = gql`
    query settings {
  settings {
    id
    specialties
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SettingsGQL extends Apollo.Query<SettingsQuery, SettingsQueryVariables> {
    document = SettingsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TagDocument = gql`
    query tag($id: String!) {
  tag(id: $id) {
    id
    name
    group
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TagGQL extends Apollo.Query<TagQuery, TagQueryVariables> {
    document = TagDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TagsDocument = gql`
    query tags($filter: String, $page: Int, $size: Int) {
  tags(filter: $filter, page: $page, size: $size) {
    id
    name
    group
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TagsGQL extends Apollo.Query<TagsQuery, TagsQueryVariables> {
    document = TagsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TagsTotalDocument = gql`
    query tagsTotal($filter: String, $page: Int, $size: Int) {
  tagsTotal(filter: $filter, page: $page, size: $size)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TagsTotalGQL extends Apollo.Query<TagsTotalQuery, TagsTotalQueryVariables> {
    document = TagsTotalDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TenantPoolMediaFilesDocument = gql`
    query tenantPoolMediaFiles($page: Int, $size: Int, $filter: String) {
  tenantPoolMediaFiles(page: $page, size: $size, filter: $filter) {
    id
    name
    path
    type
    size
    tenantId
    patientId
    patientName
    speciality
    conditionId
    activityType
    activityId
    ticketNumber
    isDeleted
    modified
    deletedOn
    systemTagging
    tags {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TenantPoolMediaFilesGQL extends Apollo.Query<TenantPoolMediaFilesQuery, TenantPoolMediaFilesQueryVariables> {
    document = TenantPoolMediaFilesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TicketDocument = gql`
    query ticket($id: String!) {
  ticket(id: $id) {
    id
    ticketNumber
    tenantName
    subject
    details
    status
    attachFile
    isReadByAdmin
    isReadByClient
    ticketDate
    messages {
      message
      requestBy
      messageDate
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TicketGQL extends Apollo.Query<TicketQuery, TicketQueryVariables> {
    document = TicketDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TicketMediaFilesDocument = gql`
    query ticketMediaFiles($text: String!, $ticketNumber: String!, $page: Int, $size: Int) {
  ticketMediaFiles(
    text: $text
    ticketNumber: $ticketNumber
    page: $page
    size: $size
  ) {
    id
    name
    path
    type
    size
    tenantId
    patientId
    patientName
    speciality
    conditionId
    activityType
    activityId
    ticketNumber
    isDeleted
    modified
    deletedOn
    systemTagging
    tags {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TicketMediaFilesGQL extends Apollo.Query<TicketMediaFilesQuery, TicketMediaFilesQueryVariables> {
    document = TicketMediaFilesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TicketTenantDocument = gql`
    query ticketTenant($id: String!) {
  ticketTenant(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TicketTenantGQL extends Apollo.Query<TicketTenantQuery, TicketTenantQueryVariables> {
    document = TicketTenantDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TicketsDocument = gql`
    query tickets($filter: String, $page: Int, $size: Int, $descending: Boolean, $sortBy: String) {
  tickets(
    filter: $filter
    page: $page
    size: $size
    descending: $descending
    sortBy: $sortBy
  ) {
    count
    items {
      id
      ticketNumber
      tenantName
      subject
      details
      status
      attachFile
      isReadByAdmin
      isReadByClient
      ticketDate
      messages {
        message
        requestBy
        messageDate
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TicketsGQL extends Apollo.Query<TicketsQuery, TicketsQueryVariables> {
    document = TicketsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TodoDocument = gql`
    query todo($id: String!) {
  todo(id: $id) {
    id
    title
    notes
    startDate
    dueDate
    isCompleted
    isStarred
    isImportant
    patientId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TodoGQL extends Apollo.Query<TodoQuery, TodoQueryVariables> {
    document = TodoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TodosDocument = gql`
    query todos($filter: String, $page: Int, $size: Int, $patientId: String) {
  todos(filter: $filter, page: $page, size: $size, patientId: $patientId) {
    id
    title
    notes
    startDate
    dueDate
    isCompleted
    isStarred
    isImportant
    patientId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TodosGQL extends Apollo.Query<TodosQuery, TodosQueryVariables> {
    document = TodosDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TodosTotalDocument = gql`
    query todosTotal($filter: String, $page: Int, $size: Int, $patientId: String) {
  todosTotal(filter: $filter, page: $page, size: $size, patientId: $patientId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TodosTotalGQL extends Apollo.Query<TodosTotalQuery, TodosTotalQueryVariables> {
    document = TodosTotalDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TrashedMediaFilesDocument = gql`
    query trashedMediaFiles {
  trashedMediaFiles {
    id
    name
    path
    type
    size
    tenantId
    patientId
    patientName
    speciality
    conditionId
    activityType
    activityId
    ticketNumber
    isDeleted
    modified
    deletedOn
    systemTagging
    tags {
      text {
        group
        value
        text
      }
      media {
        text
        tags
        date
      }
      tags
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TrashedMediaFilesGQL extends Apollo.Query<TrashedMediaFilesQuery, TrashedMediaFilesQueryVariables> {
    document = TrashedMediaFilesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AppointmentEventDocument = gql`
    subscription appointmentEvent($tenantId: String!, $userId: String!) {
  appointmentEvent(tenantId: $tenantId, userId: $userId) {
    content {
      id
      subject
      startTime
      endTime
      reason
      color
      note
      conditionId
      speciality
      recurrenceId
      recurrenceException
      recurrenceRule
      isBlock
      isReadonly
      isAllDay
      type
      status
      location {
        id
        name
      }
      contact {
        id
        isDuplicate
        name
        gender
        telephone
        contactNumbers
        birthDate
        occupation
        partner
        country
        city
        identityNumber
        email
        createdOn
        modified
        contactType
      }
    }
    event
    sentAt
    sub
    from {
      id
      displayName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AppointmentEventGQL extends Apollo.Subscription<AppointmentEventSubscription, AppointmentEventSubscriptionVariables> {
    document = AppointmentEventDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const MessageAddedDocument = gql`
    subscription messageAdded {
  messageAdded {
    content
    sentAt
    sub
    from {
      id
      displayName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MessageAddedGQL extends Apollo.Subscription<MessageAddedSubscription, MessageAddedSubscriptionVariables> {
    document = MessageAddedDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const MessageAddedByUserDocument = gql`
    subscription messageAddedByUser($id: String!) {
  messageAddedByUser(id: $id) {
    content
    sentAt
    sub
    from {
      id
      displayName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MessageAddedByUserGQL extends Apollo.Subscription<MessageAddedByUserSubscription, MessageAddedByUserSubscriptionVariables> {
    document = MessageAddedByUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TicketEventDocument = gql`
    subscription ticketEvent($tenantId: String!, $userId: String!) {
  ticketEvent(tenantId: $tenantId, userId: $userId) {
    content {
      id
      ticketNumber
      tenantName
      subject
      details
      status
      attachFile
      isReadByAdmin
      isReadByClient
      ticketDate
      messages {
        message
        requestBy
        messageDate
      }
    }
    event
    sentAt
    sub
    from {
      id
      displayName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TicketEventGQL extends Apollo.Subscription<TicketEventSubscription, TicketEventSubscriptionVariables> {
    document = TicketEventDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TicketEventAdminDocument = gql`
    subscription ticketEventAdmin {
  ticketEventAdmin {
    content {
      id
      ticketNumber
      tenantName
      subject
      details
      status
      attachFile
      isReadByAdmin
      isReadByClient
      ticketDate
      messages {
        message
        requestBy
        messageDate
      }
    }
    event
    sentAt
    sub
    from {
      id
      displayName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TicketEventAdminGQL extends Apollo.Subscription<TicketEventAdminSubscription, TicketEventAdminSubscriptionVariables> {
    document = TicketEventAdminDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }