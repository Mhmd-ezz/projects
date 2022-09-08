using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Reflection;
using AutoMapper;
using GraphQL;
using GraphQL.Types;
using Medcilia.Clinic.Common.Dates;
using Medcilia.Clinic.Infrastructure;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Enums;
using Medcilia.Clinic.Infrastructure.Helper;
using Medcilia.Clinic.Infrastructure.Repository.Drug;
using Medcilia.Clinic.Infrastructure.Repository.Grantor;
using Medcilia.Clinic.Infrastructure.Repository.Location;
using Medcilia.Clinic.Infrastructure.Repository.Lookup;
using Medcilia.Clinic.Infrastructure.Repository.MediaFile;
using Medcilia.Clinic.Infrastructure.Repository.Patient;
using Medcilia.Clinic.Infrastructure.Repository.Settings;
using Medcilia.Clinic.Infrastructure.Repository.Subscription;
using Medcilia.Clinic.Infrastructure.Services.Lookups;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using Medcilia.Clinic.WebApi.GraphQL.Mutations;
using Medcilia.Clinic.WebApi.GraphQL.Types;
using Medcilia.Clinic.Common.Extensions;
using Medcilia.Clinic.Common.Enumerations;
using Medcilia.Clinic.WebApi.Helpers;
using Medcilia.Clinic.WebApi.GraphQL.sub;
using Medcilia.Clinic.WebApi.GraphQL.Subscriptions;
using System.Runtime.InteropServices;
using System.Dynamic;
using Medcilia.Clinic.WebApi.Enum;

namespace Medcilia.Clinic.WebApi.GraphQL
{
    public class TenantMutation : ObjectGraphType<object>
    {
        public TenantMutation(
            IUnitOfWork uow,
            ISettingsRepository settingsRepository,
            ISubscriptionRepository subscriptionRepository,
            CacheController cacheController,
            IChat chat,
            IAppointmentsSubscribtions appointmentsSubscribtions,
            ITicketsSubscribtions ticketsSubscribtions,
            // ILookupRepository lookupRepository,
            // IDrugRepository drugRepository,
            IMapper mapper)
        {
            Name = "Mutation";

            #region Schedule

            FieldAsync<ScheduleType>(
              "updateSchedule",
              arguments: new QueryArguments(
                  new QueryArgument<NonNullGraphType<ScheduleInputType>> { Name = "schedule" }
              ),
              resolve: async context =>
              {
                  if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                  var model = context.GetArgument<ScheduleModel>("schedule");
                  var schedule = await uow.ScheduleRepository.GetByIdAsync(model.Id);
                  mapper.Map(model, schedule);
                  var updatedSchedule = uow.ScheduleRepository.Update(schedule);
                  var mapped = mapper.Map<ScheduleModel>(updatedSchedule);
                  return mapped;
              });
            #endregion

            #region Rota

            Field<RotaType>(
               "createRota",
               arguments: new QueryArguments(
                   new QueryArgument<NonNullGraphType<RotaInputType>> { Name = "rota" }
               ),
               resolve: context =>
               {
                   if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                   var model = context.GetArgument<RotaModel>("rota");
                   var rota = mapper.Map<Rota>(model);
                   rota.TenantId = new DocumentRef(uow.TenantCollectionName, tenantId);
                   var newRota = uow.RotaRepository.Add(rota);
                   cacheController.UpsertRota(newRota);
                   var mapped = mapper.Map<RotaModel>(newRota);
                   return mapped;
               });

            FieldAsync<RotaType>(
               "updateRota",
               arguments: new QueryArguments(
                   new QueryArgument<NonNullGraphType<RotaInputType>> { Name = "rota" }
               ),
               resolve: async context =>
               {
                   if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                   var model = context.GetArgument<RotaModel>("rota");
                   var rota = await uow.RotaRepository.GetByIdAsync(model.Id);
                   mapper.Map(model, rota);
                   var updatedRota = uow.RotaRepository.Update(rota);
                   cacheController.UpsertRota(updatedRota);
                   var mapped = mapper.Map<RotaModel>(updatedRota);
                   return mapped;
               });

            FieldAsync<StringGraphType>(
               "deleteRota",
               arguments: new QueryArguments(
                   new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id", Description = "id of the rota" }
               ),
               resolve: async context =>
               {
                   if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                   var id = context.GetArgument<string>("id");
                   var rota = await uow.RotaRepository.GetByIdAsync(id);
                   rota.IsDeleted = true;
                   var updatedRota = uow.RotaRepository.Update(rota);
                   cacheController.UpsertRota(updatedRota);
                   var mapped = mapper.Map<RotaModel>(updatedRota);

                   return id;
               });

            #endregion

            #region Locations

            Field<LocationType>(
                "createLocation",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<LocationInputType>> { Name = "location" }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var exc = new ExecutionError("validation");
                    var model = context.GetArgument<LocationModel>("location");
                    var location = mapper.Map<Location>(model);

                    var location_ = uow.LocationRepository.GetByName(location.Name, tenantId);

                    if (location_ != null)
                    {
                        exc.Data.Add("message", $"The location '{location.Name}' already exists .");
                        context.Errors.Add(exc);
                        return null;
                    }

                    location.TenantId = new DocumentRef(uow.TenantCollectionName, tenantId);
                    var newLocation = uow.LocationRepository.Add(location);
                    cacheController.UpsertLocation(newLocation);
                    var mapped = mapper.Map<LocationModel>(newLocation);
                    return mapped;
                });

            FieldAsync<LocationType>(
                "updateLocation",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<LocationInputType>> { Name = "location" }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var exc = new ExecutionError("validation");

                    var model = context.GetArgument<LocationModel>("location");
                    var location = await uow.LocationRepository.GetByIdAsync(model.Id);
                    var locationByName = uow.LocationRepository.GetByName(model.Name, tenantId);

                    if (locationByName != null && locationByName.Id != location.Id)
                    {
                        exc.Data.Add("message", $"The location '{location.Name}' already exists .");
                        context.Errors.Add(exc);
                        return null;
                    }
                    //Mapper.Map<Location>(model, location);

                    mapper.Map(model, location);
                    var updatedLocation = uow.LocationRepository.Update(location);
                    cacheController.UpsertLocation(updatedLocation);
                    var mapped = mapper.Map<LocationModel>(updatedLocation);
                    return mapped;
                });

            Field<LocationType>(
               "deleteLocation",
               arguments: new QueryArguments(
                   new QueryArgument<NonNullGraphType<StringGraphType>>
                   {
                       Name = "id",
                       Description = "id of the location"
                   }
               ),
               resolve: context =>
               {
                   if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                   var exc = new ExecutionError("validation");

                   var id = context.GetArgument<string>("id");
                   var location = uow.LocationRepository.GetById(id);
                   if (location != null)
                   {
                       var canDelete = uow.LocationRepository.CanDelete(id);
                       if (!canDelete)
                       {
                           exc.Data.Add("message", "You can not delete this location, because it's already used.");
                       }
                       else
                       {
                           uow.LocationRepository.Delete(location);
                       }
                   }
                   else
                   {
                       exc.Data.Add("message", $"Couldn't find location.");
                   }

                   // @ check for errors 
                   if (exc.Data.Count > 0)
                   {
                       context.Errors.Add(exc);
                       return null;
                   }

                   cacheController.deleteLocation(location);
                   var mapped = mapper.Map<LocationModel>(location);
                   return mapped;
               });

            Field<LocationType>(
               "deleteSubLocation",
               arguments: new QueryArguments(
                   new QueryArgument<NonNullGraphType<StringGraphType>>
                   {
                       Name = "id",
                       Description = "id of the location"
                   },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "subLocation" }
               ),
               resolve: context =>
               {
                   if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                   var exc = new ExecutionError("validation");

                   var id = context.GetArgument<string>("id");
                   var subLocation = context.GetArgument<string>("subLocation");

                   var location = uow.LocationRepository.GetById(id);
                   var subLocationIndex = location.SubLocations.IndexOf(subLocation);

                   if (location != null && subLocationIndex > -1)
                   {
                       var canDelete = uow.LocationRepository.CanDeleteSubLocation(subLocation);
                       if (!canDelete)
                       {
                           exc.Data.Add("message", "You can not delete this sub-location, because it's already used.");
                       }
                       else
                       {
                           location.SubLocations.RemoveAt(subLocationIndex);
                           uow.LocationRepository.Update(location);
                       }
                   }
                   else
                   {
                       exc.Data.Add("message", $"Couldn't find sub-location'{subLocation}'.");
                   }

                   // @ check for errors 
                   if (exc.Data.Count > 0)
                   {
                       context.Errors.Add(exc);
                       return null;
                   }

                   cacheController.UpsertLocation(location);
                   var mapped = mapper.Map<LocationModel>(location);
                   return mapped;
               });


            #endregion

            //#region Subscriptions

            //Field<SubscriptionType>(
            //    "createSubscription",
            //    arguments: new QueryArguments(
            //        new QueryArgument<NonNullGraphType<SubscriptionInputType>> { Name = "subscription" }
            //    ),
            //    resolve: context =>
            //    {
            //        if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

            //        var model = context.GetArgument<SubscriptionModel>("subscription");
            //        var subscription = mapper.Map<Subscription>(model);
            //        var newSubscription = subscriptionRepository.Add(subscription);
            //        var mapped = mapper.Map<SubscriptionModel>(newSubscription);
            //        return mapped;
            //    });

            //Field<SubscriptionType>(
            //    "updateSubscription",
            //    arguments: new QueryArguments(
            //        new QueryArgument<NonNullGraphType<SubscriptionInputType>> { Name = "subscription" }
            //    ),
            //    resolve: context =>
            //    {
            //        var model = context.GetArgument<SubscriptionModel>("subscription");
            //        var subscription = mapper.Map<Subscription>(model);
            //        var updatedSubscription = subscriptionRepository.Update(subscription);
            //        var mapped = mapper.Map<SubscriptionModel>(updatedSubscription);
            //        return mapped;
            //    });

            //#endregion

            #region Settings

            Field<SettingsType>(
                "updateSettings",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<SettingsInputType>> { Name = "settings" }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var result = new Settings();
                    var _model = context.GetArgument<SettingsModel>("settings");
                    var model = mapper.Map<Settings>(_model);

                    result = String.IsNullOrEmpty(model.Id) ?
                        settingsRepository.Add(model) : settingsRepository.Update(model);

                    var mapped = mapper.Map<SettingsModel>(result);
                    return mapped;
                });

            #endregion

            #region Appointments

            Field<AppointmentType>(
           "createAppointment",
           arguments: new QueryArguments(
               new QueryArgument<NonNullGraphType<AppointmentInputType>> { Name = "appointment" }
           ),
           resolve: context =>
           {

               if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

               var model = context.GetArgument<AppointmentModel>("appointment");
               var appointment = mapper.Map<Appointment>(model);
               appointment.TenantId = new DocumentRef(uow.TenantCollectionName, tenantId);
               var newAppointment = uow.AppointmentRepository.Add(appointment);
               var mapped = mapper.Map<AppointmentModel>(newAppointment);

               var user = uow.UserRepository.GetUserByAltUserId(tenantId, userId);

               appointmentsSubscribtions.AppointmentChanges(model, SubscriptionEventEnum.appointment_created, tenantId, user.Id, user.getFullName());

               return mapped;
           });

            FieldAsync<AppointmentType>(
                "updateAppointment",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<AppointmentInputType>> { Name = "appointment" }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var model = context.GetArgument<AppointmentModel>("appointment");
                    var appointment = await uow.AppointmentRepository.GetByIdAsync(model.Id);
                    var originalAppStatus = appointment.StatusKey;
                    mapper.Map(model, appointment);
                    var updatedAppointment = uow.AppointmentRepository.Update(appointment);
                    var mapped = mapper.Map<AppointmentModel>(updatedAppointment);

                    try
                    {
                        var user = uow.UserRepository.GetUserByAltUserId(tenantId, userId);
                        if (model.Status != originalAppStatus)
                        {
                            appointmentsSubscribtions.AppointmentChanges(model, SubscriptionEventEnum.appointment_status_changed, tenantId, user.Id, user.getFullName());
                        }
                        else
                        {
                            appointmentsSubscribtions.AppointmentChanges(model, SubscriptionEventEnum.appointment_updated, tenantId, user.Id, user.getFullName());
                        }
                    }
                    catch (InvalidCastException e)
                    {
                        var exc = new ExecutionError(e.ToString());
                        context.Errors.Add(exc);
                        return null;
                    }
                    

                    return mapped;
                });

            Field<MessageType>("addMessage",
                arguments: new QueryArguments(
                    new QueryArgument<MessageInputType> { Name = "message" }
                ),
                resolve: context =>
                {
                    var receivedMessage = context.GetArgument<ReceivedMessage>("message");
                    var message = chat.AddMessage(receivedMessage);
                    return message;
                });

            FieldAsync<StringGraphType>(
                "deleteAppointment",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: async context =>
                {

                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var id = context.GetArgument<string>("id");
                    var appointment = await uow.AppointmentRepository.GetByIdAsync(id);
                    appointment.DeletedOn = DomainTime.Now();
                    var updatedAppointment = uow.AppointmentRepository.Update(appointment);
                    return id;
                });

            #endregion

            #region Contacts

            Field<ContactType>(
            "createContact",
            arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<ContactInputType>> { Name = "contact" }
            ),
            resolve: context =>
            {

                if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                var model = context.GetArgument<ContactModel>("contact");
                var contact = mapper.Map<Contact>(model);
                contact.TenantId = new DocumentRef(uow.TenantCollectionName, tenantId);
                var newContact = uow.ContactRepository.Add(contact);
                var mapped = mapper.Map<ContactModel>(newContact);
                cacheController.UpsertContact(mapped);
                return mapped;
            });

            FieldAsync<ContactType>(
                "updateContact",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ContactInputType>> { Name = "contact" }
                ),
                resolve: async context =>
                {

                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var model = context.GetArgument<ContactModel>("contact");
                    var contact = await uow.ContactRepository.GetByIdAsync(model.Id);
                    // @ ContactInputType miss patientInfo
                    var patientInfo = contact.PatientInfo;
                    mapper.Map(model, contact);
                    // @ Reassign  patientInfo
                    contact.PatientInfo = patientInfo;
                    var updatedPatient = uow.ContactRepository.Update(contact);
                    var mapped = mapper.Map<ContactModel>(updatedPatient);
                    cacheController.UpsertContact(mapped);
                    return mapped;
                });

            #endregion

            #region Patients

            Field<PatientType>(
                "createPatient",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<PatientInputType>> { Name = "patient" }
                ),
                resolve: context =>
                {

                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var model = context.GetArgument<ContactModel>("patient");
                    var contact = mapper.Map<Contact>(model);
                    contact.ContactType = ContactTypeEnum.Patient;
                    contact.TenantId = new DocumentRef(uow.TenantCollectionName, tenantId);
                    contact.PatientInfo.CreatedOn = DomainTime.Now();
                    contact.PatientInfo.Modified = DomainTime.Now();

                    var newContact = uow.ContactRepository.Add(contact);
                    var mapped = mapper.Map<ContactModel>(newContact);
                    cacheController.UpsertContact(mapped);
                    return mapped;
                });

            FieldAsync<PatientType>(
                "updatePatient",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<PatientInputType>> { Name = "patient" }
                ),
                resolve: async context =>
                {

                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var model = context.GetArgument<ContactModel>("patient");
                    var patient = await uow.ContactRepository.GetByIdAsync(model.Id);
                    mapper.Map(model, patient);
                    patient.ContactType = ContactTypeEnum.Patient;
                    var updatedPatient = uow.ContactRepository.Update(patient);
                    var mapped = mapper.Map<ContactModel>(updatedPatient);
                    cacheController.UpsertContact(mapped);
                    return mapped;
                });

            //////----
            Field<CardiologyMedicalHistoryType>(
                "updateCardiologyMedicalHistory",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" },
                    new QueryArgument<NonNullGraphType<CardiologyMedicalHistoryInputType>> { Name = "medicalHistory" }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var patientId = context.GetArgument<string>("patientId");
                    var patient = uow.ContactRepository.GetById(patientId);

                    var model = context.GetArgument<CardiologyMedicalHistoryModel>("medicalHistory");
                    var medicalHistory = mapper.Map<CardiologyMedicalHistory>(model);
                    patient.PatientInfo.Specialities.Cardiology.MedicalHistory = medicalHistory;

                    // @ TODO: update Medical history last update

                    var updatedPatient = uow.ContactRepository.Update(patient);
                    var mapped = mapper.Map<CardiologyMedicalHistoryModel>(medicalHistory);

                    return mapped;
                });

            //////----
            Field<GeneralMedicalHistoryType>(
                "updateGeneralMedicalHistory",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" },
                    new QueryArgument<NonNullGraphType<GeneralMedicalHistoryInputType>> { Name = "medicalHistory" }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var patientId = context.GetArgument<string>("patientId");
                    var patient = uow.ContactRepository.GetById(patientId);

                    var model = context.GetArgument<GeneralMedicalHistoryModel>("medicalHistory");
                    var medicalHistory = mapper.Map<GeneralMedicalHistory>(model);
                    patient.PatientInfo.Specialities.General.MedicalHistory = medicalHistory;

                    // @ TODO: update Medical history last update

                    var updatedPatient = uow.ContactRepository.Update(patient);
                    var mapped = mapper.Map<GeneralMedicalHistoryModel>(medicalHistory);

                    return mapped;
                });



            ///////
            Field<CardiologyConditionType>(
            "createCardiologyCondition",
            arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" },
                new QueryArgument<NonNullGraphType<CardiologyConditionInputType>> { Name = "condition" }
            ),
            resolve: context =>
            {
                if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                var patientId = context.GetArgument<string>("patientId");
                var patient = uow.ContactRepository.GetById(patientId);

                var model = context.GetArgument<CardiologyConditionModel>("condition");
                var condition = mapper.Map<CardiologyCondition>(model);
                condition.Modified = DateTime.Now;
                condition.CreatedOn = DateTime.Now;

                // @ Validate that condition wasn't added before
                var conditionExists = patient.PatientInfo.Specialities.Cardiology.Conditions.Find(obj => obj.Id == condition.Id);

                // @ Condition doesn't exist
                if (conditionExists == null)
                    patient.PatientInfo.Specialities.Cardiology.Conditions.Add(condition);

                // @ Update patient LastSeen property
                patient.PatientInfo.LastSeen = condition.Opened != null ? condition.Opened : DateTime.Now;
                var updatedPatient = uow.ContactRepository.Update(patient);
                var mapped = mapper.Map<CardiologyConditionModel>(condition);

                return mapped;
            });

            ///////
            Field<GeneralConditionType>(
                "createGeneralCondition",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" },
                    new QueryArgument<NonNullGraphType<GeneralConditionInputType>> { Name = "condition" }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var patientId = context.GetArgument<string>("patientId");
                    var patient = uow.ContactRepository.GetById(patientId);

                    var model = context.GetArgument<GeneralConditionModel>("condition");
                    var condition = mapper.Map<GeneralCondition>(model);
                    condition.Modified = DateTime.Now;
                    condition.CreatedOn = DateTime.Now;


                    // @ Validate that condition wasn't added before
                    var conditionExists = patient.PatientInfo.Specialities.General.Conditions.Find(obj => obj.Id == condition.Id);

                    // @ Condition doesn't exist
                    if (conditionExists == null)
                        patient.PatientInfo.Specialities.General.Conditions.Add(condition);

                    // @ Update patient LastSeen property
                    patient.PatientInfo.LastSeen = condition.Opened != null ? condition.Opened : DateTime.Now;
                    var updatedPatient = uow.ContactRepository.Update(patient);
                    var mapped = mapper.Map<GeneralConditionModel>(condition);

                    return mapped;
                });


            /////////
            Field<CardiologyConditionType>(
                "updateCardiologyCondition",
                 arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" },
                    new QueryArgument<NonNullGraphType<CardiologyConditionInputType>> { Name = "condition" }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var patientId = context.GetArgument<string>("patientId");
                    var patient = uow.ContactRepository.GetById(patientId);

                    var model = context.GetArgument<CardiologyConditionModel>("condition");
                    var condition = mapper.Map<CardiologyCondition>(model);
                    condition.Modified = DateTime.Now;
                    var conditions = patient.PatientInfo.Specialities.Cardiology.Conditions;

                    for (var i = 0; i < conditions.Count; i++)
                    {
                        if (conditions[i].Id != null && conditions[i].Id == condition.Id)
                        {
                            conditions[i] = condition;
                        }
                    }

                    // todo : ^^ if condition not found, then what to do ???
                    var updatedPatient = uow.ContactRepository.Update(patient);
                    var mapped = mapper.Map<CardiologyConditionModel>(condition);
                    return mapped;


                });

            /////////////
            Field<GeneralConditionType>(
                "updateGeneralCondition",
                 arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" },
                    new QueryArgument<NonNullGraphType<GeneralConditionInputType>> { Name = "condition" }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var patientId = context.GetArgument<string>("patientId");
                    var patient = uow.ContactRepository.GetById(patientId);

                    var model = context.GetArgument<GeneralConditionModel>("condition");
                    var condition = mapper.Map<GeneralCondition>(model);
                    condition.Modified = DateTime.Now;
                    var conditions = patient.PatientInfo.Specialities.General.Conditions;

                    for (var i = 0; i < conditions.Count; i++)
                    {
                        if (conditions[i].Id != null && conditions[i].Id == condition.Id)
                        {
                            conditions[i] = condition;
                        }
                    }

                    // todo : ^^ if condition not found, then what to do ???
                    var updatedPatient = uow.ContactRepository.Update(patient);
                    var mapped = mapper.Map<GeneralConditionModel>(condition);
                    return mapped;
                });

            //////
            Field<CardiologyFollowupType>(
                "createCardiologyFollowup",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "conditionId" },
                    new QueryArgument<NonNullGraphType<CardiologyFollowupInputType>> { Name = "followup" }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var patientId = context.GetArgument<string>("patientId");
                    var patient = uow.ContactRepository.GetById(patientId);

                    var conditionId = context.GetArgument<string>("conditionId");

                    var model = context.GetArgument<CardiologyFollowupModel>("followup");
                    var followup = mapper.Map<CardiologyFollowup>(model);
                    followup.Modified = DateTime.Now;

                    for (var i = 0; i < patient.PatientInfo.Specialities.Cardiology.Conditions.Count; i++)
                    {
                        var _condition = patient.PatientInfo.Specialities.Cardiology.Conditions[i];

                        if (_condition.Id != null && _condition.Id == conditionId)
                        {
                            // @ Validate that this followup wasn't added before
                            var followupExists = _condition.Activities.Followups.Find(o => o.Id == followup.Id);

                            if (followupExists == null)
                                _condition.Activities.Followups.Add(followup);
                        }
                    }
                    // @ Update patient LastSeen property
                    patient.PatientInfo.LastSeen = followup.Opened != null ? followup.Opened : DateTime.Now;
                    var updatedPatient = uow.ContactRepository.Update(patient);
                    var mapped = mapper.Map<CardiologyFollowupModel>(followup);

                    return mapped;
                });

            /////////
            Field<GeneralFollowupType>(
                "createGeneralFollowup",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "conditionId" },
                    new QueryArgument<NonNullGraphType<GeneralFollowupInputType>> { Name = "followup" }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var patientId = context.GetArgument<string>("patientId");
                    var patient = uow.ContactRepository.GetById(patientId);

                    var conditionId = context.GetArgument<string>("conditionId");

                    var model = context.GetArgument<GeneralFollowupModel>("followup");
                    var followup = mapper.Map<GeneralFollowup>(model);
                    followup.Modified = DateTime.Now;

                    for (var i = 0; i < patient.PatientInfo.Specialities.General.Conditions.Count; i++)
                    {
                        var _condition = patient.PatientInfo.Specialities.General.Conditions[i];

                        if (_condition.Id != null && _condition.Id == conditionId)
                        {
                            // @ Validate that this followup wasn't added before
                            var followupExists = _condition.Activities.Followups.Find(o => o.Id == followup.Id);

                            if (followupExists == null)
                                _condition.Activities.Followups.Add(followup);
                        }
                    }
                    // @ Update patient LastSeen property
                    patient.PatientInfo.LastSeen = followup.Opened != null ? followup.Opened : DateTime.Now;
                    var updatedPatient = uow.ContactRepository.Update(patient);
                    var mapped = mapper.Map<GeneralFollowupModel>(followup);

                    return mapped;
                });

            ////
            Field<CardiologyFollowupType>(
               "updateCardiologyFollowup",
                arguments: new QueryArguments(
                   new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" },
                   new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "conditionId" },
                   new QueryArgument<StringGraphType> { Name = "replacedConditionId" },
                   new QueryArgument<NonNullGraphType<CardiologyFollowupInputType>> { Name = "followup" }
               ),
               resolve: context =>
               {
                   if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                   var patientId = context.GetArgument<string>("patientId");
                   var patient = uow.ContactRepository.GetById(patientId);

                   var conditionId = context.GetArgument<string>("conditionId");
                   var replacedConditionId = context.GetArgument<string>("replacedConditionId");

                   var model = context.GetArgument<CardiologyFollowupModel>("followup");
                   var followup = mapper.Map<CardiologyFollowup>(model);
                   followup.Modified = DateTime.Now;


                   // @ if followup moved to another condition
                   if (!string.IsNullOrEmpty(replacedConditionId) && replacedConditionId != conditionId)
                   {
                       var _condition = patient.PatientInfo.Specialities.Cardiology.Conditions.Find(c => c.Id == conditionId);
                       if (_condition != null)
                       {
                           var idx = _condition.Activities.Followups.FindIndex((obj) => obj.Id == followup.Id);
                           if (idx == -1)
                           {
                               // @ push followup to the new condition
                               var followupsCount = _condition.Activities.Followups.Count;
                               followup.Name = "followup " + (followupsCount).ToString();
                               _condition.Activities.Followups.Add(followup);
                           }
                           var _replacedCondition = patient.PatientInfo.Specialities.Cardiology.Conditions.Find((obj) => obj.Id == replacedConditionId);
                           if (_replacedCondition != null)
                           {
                               // @ remove followup from old condition
                               _replacedCondition.Activities.Followups = _replacedCondition.Activities.Followups.FindAll((obj) => obj.Id != followup.Id);
                           }
                       }
                   }
                   else
                   {
                       var __condition = patient.PatientInfo.Specialities.Cardiology.Conditions.Find((obj) => obj.Id == conditionId);
                       if (__condition != null)
                       {
                           var idx = __condition.Activities.Followups.FindIndex((obj) => obj.Id == followup.Id);
                           if (idx > -1)
                           {
                               __condition.Activities.Followups[idx] = followup;
                           }
                       }
                   }

                   //TODO: ^^ if condition not found, then return an error ???
                   var updatedPatient = uow.ContactRepository.Update(patient);
                   var mapped = mapper.Map<CardiologyFollowupModel>(followup);
                   return mapped;
               });


            ///////
            Field<GeneralFollowupType>(
                "updateGeneralFollowup",
                 arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "conditionId" },
                    new QueryArgument<StringGraphType> { Name = "replacedConditionId" },
                    new QueryArgument<NonNullGraphType<GeneralFollowupInputType>> { Name = "followup" }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var patientId = context.GetArgument<string>("patientId");
                    var patient = uow.ContactRepository.GetById(patientId);

                    var conditionId = context.GetArgument<string>("conditionId");
                    var replacedConditionId = context.GetArgument<string>("replacedConditionId");

                    var model = context.GetArgument<GeneralFollowupModel>("followup");
                    var followup = mapper.Map<GeneralFollowup>(model);
                    followup.Modified = DateTime.Now;


                    // @ if followup moved to another condition
                    if (!string.IsNullOrEmpty(replacedConditionId) && replacedConditionId != conditionId)
                    {
                        var _condition = patient.PatientInfo.Specialities.General.Conditions.Find(c => c.Id == conditionId);
                        if (_condition != null)
                        {
                            var idx = _condition.Activities.Followups.FindIndex((obj) => obj.Id == followup.Id);
                            if (idx == -1)
                            {
                                // @ push followup to the new condition
                                var followupsCount = _condition.Activities.Followups.Count;
                                followup.Name = "followup " + (followupsCount).ToString();
                                _condition.Activities.Followups.Add(followup);
                            }
                            var _replacedCondition = patient.PatientInfo.Specialities.General.Conditions.Find((obj) => obj.Id == replacedConditionId);
                            if (_replacedCondition != null)
                            {
                                // @ remove followup from old condition
                                _replacedCondition.Activities.Followups = _replacedCondition.Activities.Followups.FindAll((obj) => obj.Id != followup.Id);
                            }
                        }
                    }
                    else
                    {
                        var __condition = patient.PatientInfo.Specialities.General.Conditions.Find((obj) => obj.Id == conditionId);
                        if (__condition != null)
                        {
                            var idx = __condition.Activities.Followups.FindIndex((obj) => obj.Id == followup.Id);
                            if (idx > -1)
                            {
                                __condition.Activities.Followups[idx] = followup;
                            }
                        }
                    }

                    //TODO: ^^ if condition not found, then return an error ???
                    var updatedPatient = uow.ContactRepository.Update(patient);
                    var mapped = mapper.Map<GeneralFollowupModel>(followup);
                    return mapped;
                });

            ///////////
            Field<CardiologyOperationType>(
                "createCardiologyOperation",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "conditionId" },
                    new QueryArgument<NonNullGraphType<CardiologyOperationInputType>> { Name = "operation" }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var patientId = context.GetArgument<string>("patientId");
                    var patient = uow.ContactRepository.GetById(patientId);

                    var conditionId = context.GetArgument<string>("conditionId");

                    var model = context.GetArgument<CardiologyOperationModel>("operation");
                    var operation = mapper.Map<CardiologyOperation>(model);
                    operation.Modified = DateTime.Now;

                    for (var i = 0; i < patient.PatientInfo.Specialities.Cardiology.Conditions.Count; i++)
                    {
                        var _condition = patient.PatientInfo.Specialities.Cardiology.Conditions[i];

                        if (_condition.Id != null && _condition.Id == conditionId)
                        {
                            // @ Validate that this operation wasn't added before
                            var operationExists = _condition.Activities.Operations.Find(o => o.Id == operation.Id);

                            if (operationExists == null)
                                _condition.Activities.Operations.Add(operation);
                        }
                    }

                    // @ Update patient LastSeen property
                    patient.PatientInfo.LastSeen = operation.Opened != null ? operation.Opened : DateTime.Now;
                    var updatedPatient = uow.ContactRepository.Update(patient);
                    var mapped = mapper.Map<CardiologyOperationModel>(operation);

                    return mapped;
                });

            ///////
            Field<GeneralOperationType>(
                "createGeneralOperation",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "conditionId" },
                    new QueryArgument<NonNullGraphType<GeneralOperationInputType>> { Name = "operation" }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var patientId = context.GetArgument<string>("patientId");
                    var patient = uow.ContactRepository.GetById(patientId);

                    var conditionId = context.GetArgument<string>("conditionId");

                    var model = context.GetArgument<GeneralOperationModel>("operation");
                    var operation = mapper.Map<GeneralOperation>(model);
                    operation.Modified = DateTime.Now;

                    for (var i = 0; i < patient.PatientInfo.Specialities.General.Conditions.Count; i++)
                    {
                        var _condition = patient.PatientInfo.Specialities.General.Conditions[i];

                        if (_condition.Id != null && _condition.Id == conditionId)
                        {
                            // @ Validate that this operation wasn't added before
                            var operationExists = _condition.Activities.Operations.Find(o => o.Id == operation.Id);

                            if (operationExists == null)
                                _condition.Activities.Operations.Add(operation);
                        }
                    }

                    // @ Update patient LastSeen property
                    patient.PatientInfo.LastSeen = operation.Opened != null ? operation.Opened : DateTime.Now;
                    var updatedPatient = uow.ContactRepository.Update(patient);
                    var mapped = mapper.Map<GeneralOperationModel>(operation);

                    return mapped;
                });


            ////////
            Field<CardiologyOperationType>(
                "updateCardiologyOperation",
                 arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "conditionId" },
                    new QueryArgument<StringGraphType> { Name = "replacedConditionId" },
                    new QueryArgument<NonNullGraphType<CardiologyOperationInputType>> { Name = "operation" }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var patientId = context.GetArgument<string>("patientId");
                    var patient = uow.ContactRepository.GetById(patientId);

                    var conditionId = context.GetArgument<string>("conditionId");
                    var replacedConditionId = context.GetArgument<string>("replacedConditionId");

                    var model = context.GetArgument<CardiologyOperationModel>("operation");
                    var operation = mapper.Map<CardiologyOperation>(model);
                    operation.Modified = DateTime.Now;


                    if (!string.IsNullOrEmpty(replacedConditionId) && replacedConditionId != conditionId)
                    {
                        var _condition = patient.PatientInfo.Specialities.Cardiology.Conditions.Find(c => c.Id == conditionId);
                        if (_condition != null)
                        {
                            var idx = _condition.Activities.Operations.FindIndex((obj) => obj.Id == operation.Id);

                            if (idx == -1)
                                _condition.Activities.Operations.Add(operation);

                            var _replacedCondition = patient.PatientInfo.Specialities.Cardiology.Conditions.Find((obj) => obj.Id == replacedConditionId);
                            if (_replacedCondition != null)
                            {
                                _replacedCondition.Activities.Operations = _replacedCondition.Activities.Operations.FindAll((obj) => obj.Id != operation.Id);
                            }
                        }
                    }
                    else
                    {
                        var __condition = patient.PatientInfo.Specialities.Cardiology.Conditions.Find((obj) => obj.Id == conditionId);
                        if (__condition != null)
                        {
                            var idx = __condition.Activities.Operations.FindIndex((obj) => obj.Id == operation.Id);
                            if (idx > -1)
                            {
                                __condition.Activities.Operations[idx] = operation;
                            }
                        }
                    }

                    var updatedPatient = uow.ContactRepository.Update(patient);
                    var mapped = mapper.Map<CardiologyOperationModel>(operation);
                    return mapped;
                });

            /////////////
            Field<GeneralOperationType>(
                "updateGeneralOperation",
                 arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "conditionId" },
                    new QueryArgument<StringGraphType> { Name = "replacedConditionId" },
                    new QueryArgument<NonNullGraphType<GeneralOperationInputType>> { Name = "operation" }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var patientId = context.GetArgument<string>("patientId");
                    var patient = uow.ContactRepository.GetById(patientId);

                    var conditionId = context.GetArgument<string>("conditionId");
                    var replacedConditionId = context.GetArgument<string>("replacedConditionId");

                    var model = context.GetArgument<GeneralOperationModel>("operation");
                    var operation = mapper.Map<GeneralOperation>(model);
                    operation.Modified = DateTime.Now;


                    if (!string.IsNullOrEmpty(replacedConditionId) && replacedConditionId != conditionId)
                    {
                        var _condition = patient.PatientInfo.Specialities.General.Conditions.Find(c => c.Id == conditionId);
                        if (_condition != null)
                        {
                            var idx = _condition.Activities.Operations.FindIndex((obj) => obj.Id == operation.Id);

                            if (idx == -1)
                                _condition.Activities.Operations.Add(operation);

                            var _replacedCondition = patient.PatientInfo.Specialities.General.Conditions.Find((obj) => obj.Id == replacedConditionId);
                            if (_replacedCondition != null)
                            {
                                _replacedCondition.Activities.Operations = _replacedCondition.Activities.Operations.FindAll((obj) => obj.Id != operation.Id);
                            }
                        }
                    }
                    else
                    {
                        var __condition = patient.PatientInfo.Specialities.General.Conditions.Find((obj) => obj.Id == conditionId);
                        if (__condition != null)
                        {
                            var idx = __condition.Activities.Operations.FindIndex((obj) => obj.Id == operation.Id);
                            if (idx > -1)
                            {
                                __condition.Activities.Operations[idx] = operation;
                            }
                        }
                    }

                    var updatedPatient = uow.ContactRepository.Update(patient);
                    var mapped = mapper.Map<GeneralOperationModel>(operation);
                    return mapped;
                });

            Field<StringGraphType>(
              "remarkDuplicateActivity",
               arguments: new QueryArguments(
                  new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" },
                  new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "speciality" },
                  new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "conditionId" },
                  new QueryArgument<StringGraphType> { Name = "activityType" },
                  new QueryArgument<StringGraphType> { Name = "activityId" },
                  new QueryArgument<BooleanGraphType> { Name = "isDuplicate" }
              ),
              resolve: context =>
              {
                  if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                  var patientId = context.GetArgument<string>("patientId");
                  var patient = uow.ContactRepository.GetById(patientId);
                  if (patient == null) return null;

                  var speciality = context.GetArgument<string>("speciality");
                  var conditionId = context.GetArgument<string>("conditionId");
                  var activityType = context.GetArgument<string>("activityType");
                  var activityId = context.GetArgument<string>("activityId");
                  var isDuplicate = context.GetArgument<bool>("isDuplicate");


                  // @ Update general speciality
                  if (speciality == SpecialityEnum.General.Key)
                  {
                      var condition = patient.PatientInfo.Specialities.General.Conditions.Find((obj) => obj.Id == conditionId);
                      if (condition != null)
                      {
                          // @ Updating sub activity like (followup or operation)
                          if (!string.IsNullOrEmpty(activityId))
                          {
                              dynamic activity = null;
                              if (activityType.ToLower() == KeyedEnumeration.FromKey<ConditionTypeEnum>("followup").Key.ToLower())
                              {
                                  activity = condition.Activities.Followups.Find((obj) => obj.Id == activityId);
                              }
                              else if (activityType.ToLower() == KeyedEnumeration.FromKey<ConditionTypeEnum>("operation").Key.ToLower())
                              {
                                  activity = condition.Activities.Operations.Find((obj) => obj.Id == activityId);
                              }

                              // @ Now Update is duplicate for the sub activity if activity was found
                              if (activity != null) activity.IsDuplicate = isDuplicate || false;
                          }
                          else
                          {
                              // @ Updating condition
                              condition.IsDuplicate = isDuplicate || false;
                          }
                      }
                  }

                  // @ Update cardiology speciality
                  if (speciality == SpecialityEnum.Cardiology.Key)
                  {
                      var condition = patient.PatientInfo.Specialities.Cardiology.Conditions.Find((obj) => obj.Id == conditionId);
                      if (condition != null)
                      {
                          // @ Updating sub activity like (followup or operation)
                          if (!string.IsNullOrEmpty(activityId))
                          {
                              dynamic activity = null;
                              if (activityType.ToLower() == KeyedEnumeration.FromKey<ConditionTypeEnum>("followup").Key.ToLower())
                              {
                                  activity = condition.Activities.Followups.Find((obj) => obj.Id == activityId);
                              }
                              else if (activityType.ToLower() == KeyedEnumeration.FromKey<ConditionTypeEnum>("operation").Key.ToLower())
                              {
                                  activity = condition.Activities.Operations.Find((obj) => obj.Id == activityId);
                              }

                              // @ Now Update is duplicate for the sub activity if activity was found
                              if (activity != null) activity.IsDuplicate = isDuplicate || false;
                          }
                          else
                          {
                              // @ Updating condition
                              condition.IsDuplicate = isDuplicate || false;
                          }
                      }
                  }

                  var updatedPatient = uow.ContactRepository.Update(patient);

                  return "ok";
              });

            ///////
            Field<StringGraphType>(
             "deleteMedicalActivity",
              arguments: new QueryArguments(
                 new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" },
                 new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "speciality" },
                 new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "conditionId" },
                 new QueryArgument<StringGraphType> { Name = "activityType" },
                 new QueryArgument<StringGraphType> { Name = "activityId" }
             ),
             resolve: context =>
             {
                 if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                 var patientId = context.GetArgument<string>("patientId");
                 var patient = uow.ContactRepository.GetById(patientId);
                 if (patient == null) return null;

                 var speciality = context.GetArgument<string>("speciality");
                 var conditionId = context.GetArgument<string>("conditionId");
                 var activityType = context.GetArgument<string>("activityType");
                 var activityId = context.GetArgument<string>("activityId");

                 // @ Update general speciality
                 if (speciality == SpecialityEnum.General.Key)
                 {
                     var condition = patient.PatientInfo.Specialities.General.Conditions.Find((obj) => obj.Id == conditionId);
                     if (condition != null)
                     {
                         // @ Updating sub activity like (followup or operation)
                         if (!string.IsNullOrEmpty(activityId))
                         {
                             if (activityType.ToLower() == KeyedEnumeration.FromKey<ConditionTypeEnum>("followup").Key.ToLower())
                             {
                                 var index = condition.Activities.Followups.FindIndex(x => x.Id == activityId && x.IsDuplicate == true);
                                 if (index > -1)
                                     condition.Activities.Followups.RemoveAt(index);
                             }
                             else if (activityType.ToLower() == KeyedEnumeration.FromKey<ConditionTypeEnum>("operation").Key.ToLower())
                             {
                                 var index = condition.Activities.Operations.FindIndex(x => x.Id == activityId && x.IsDuplicate == true);
                                 if (index > -1)
                                     condition.Activities.Operations.RemoveAt(index);
                             }
                         }
                         else
                         {
                             // @ Updating condition
                             var index = patient.PatientInfo.Specialities.General.Conditions.FindIndex(x => x.Id == conditionId && x.IsDuplicate == true);
                             if (index > -1)
                                 patient.PatientInfo.Specialities.General.Conditions.RemoveAt(index);
                         }
                     }
                 }

                 // @ Update cardiology speciality
                 if (speciality == SpecialityEnum.Cardiology.Key)
                 {
                     var condition = patient.PatientInfo.Specialities.Cardiology.Conditions.Find((obj) => obj.Id == conditionId);
                     if (condition != null)
                     {
                         // @ Updating sub activity like (followup or operation)
                         if (!string.IsNullOrEmpty(activityId))
                         {
                             if (activityType.ToLower() == KeyedEnumeration.FromKey<ConditionTypeEnum>("followup").Key.ToLower())
                             {
                                 var index = condition.Activities.Followups.FindIndex(x => x.Id == activityId && x.IsDuplicate == true);
                                 if (index > -1)
                                     condition.Activities.Followups.RemoveAt(index);
                             }
                             else if (activityType.ToLower() == KeyedEnumeration.FromKey<ConditionTypeEnum>("operation").Key.ToLower())
                             {
                                 var index = condition.Activities.Operations.FindIndex(x => x.Id == activityId && x.IsDuplicate == true);
                                 if (index > -1)
                                     condition.Activities.Operations.RemoveAt(index);
                             }
                         }
                         else
                         {
                             // @ Updating condition
                             var index = patient.PatientInfo.Specialities.General.Conditions.FindIndex(x => x.Id == conditionId && x.IsDuplicate == true);
                             if (index > -1)
                                 patient.PatientInfo.Specialities.General.Conditions.RemoveAt(index);
                         }
                     }
                 }

                 // TODO: delete media file related to condition or sub activity ( followup or operation)

                 var updatedPatient = uow.ContactRepository.Update(patient);

                 return "ok";
             });


            Field<StringGraphType>(
             "remarkDuplicatePatient",
              arguments: new QueryArguments(
                 new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" },
                 new QueryArgument<BooleanGraphType> { Name = "isDuplicate" }
             ),
             resolve: context =>
             {
                 if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                 var patientId = context.GetArgument<string>("patientId");
                 var patient = uow.ContactRepository.GetById(patientId);
                 if (patient == null) return null;

                 var isDuplicate = context.GetArgument<bool>("isDuplicate");

                 patient.IsDuplicate = isDuplicate || false;

                 var updatedPatient = uow.ContactRepository.Update(patient);

                 return "ok";
             });

            Field<StringGraphType>(
             "deletePatient",
              arguments: new QueryArguments(
                 new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" }
             ),
             resolve: context =>
             {
                 if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                 var patientId = context.GetArgument<string>("patientId");
                 var patient = uow.ContactRepository.GetById(patientId);
                 if (patient == null) return null;

                 if (patient.IsDuplicate == true)
                 {
                     uow.ContactRepository.Delete(patient);
                 }

                 return "ok";
             });

            #endregion

            #region Lookups

            Field<LookupType>(
                "createLookup",
          arguments: new QueryArguments(
              new QueryArgument<NonNullGraphType<LookupInputType>> { Name = "lookup" }
          ),
          resolve: context =>
          {
              if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

              var model = context.GetArgument<LookupModel>("lookup");
              var lookup = mapper.Map<LookUp>(model);
              lookup.TenantId = new DocumentRef(uow.TenantCollectionName, tenantId);

              var exc = new ExecutionError("validation");

              if (lookup.Value == null)
              {   // @ no value provided by user , then use count inc to set the value 

                  var count = uow.LookupRepository.GetByGroup(tenantId, lookup.GroupKey).Count;
                  lookup.Value = (count + 1).ToString();
              }
              else
              {

                  var getByValue = uow.LookupRepository.GetByValue(tenantId, lookup.GroupKey, lookup.Value);

                  if (getByValue != null)// @ value already exist
                      exc.Data.Add("message", "This value already exist below this group. Please, use another value or leave the field empty");
              }



              var getByText = uow.LookupRepository.GetByText(tenantId, lookup.GroupKey, lookup.Text);
              if (getByText != null)// @ text already exist
                  exc.Data.Add("message", "This text already exist below this group.");

              // @ check for errors 
              if (exc.Data.Count > 0)
              {
                  context.Errors.Add(exc);
                  return null;
              }


              var newLookup = uow.LookupRepository.Add(lookup);
              cacheController.UpsertLookup(newLookup);
              var mapped = mapper.Map<LookupModel>(newLookup);

              return mapped;
          });

            Field<ListGraphType<LookupType>>(
                "createLookups",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ListGraphType<LookupInputType>>> { Name = "lookups" }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var model = context.GetArgument<List<LookupModel>>("lookups");
                    var lookups = mapper.Map<List<LookUp>>(model);

                    var newLookups = uow.LookupRepository.Add(lookups);
                    foreach (var lookup in newLookups)
                    {
                        cacheController.UpsertLookup(lookup);
                    }

                    var mapped = mapper.Map<List<LookupModel>>(newLookups);
                    return mapped;
                });

            Field<LookupType>(
                "updateLookup",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<LookupInputType>> { Name = "lookup" }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var model = context.GetArgument<LookupModel>("lookup");
                    var lookup = mapper.Map<LookUp>(model);
                    lookup.TenantId = new DocumentRef(uow.TenantCollectionName, tenantId);

                    var exc = new ExecutionError("validation");

                    if (lookup.Value == null)
                    {   // @ no value provided by user , then use count inc to set the value 

                        var count = uow.LookupRepository.GetByGroup(tenantId, lookup.GroupKey).Count;
                        lookup.Value = (count + 1).ToString();
                    }
                    else
                    {

                        var getByValue = uow.LookupRepository.GetByValue(tenantId, lookup.GroupKey, lookup.Value);

                        if (getByValue != null && getByValue.Id != lookup.Id)// @ value already exist, not the same lookup model
                            exc.Data.Add("message", "This value already exist below this group. Please, use another value or leave the field empty");
                    }



                    var getByText = uow.LookupRepository.GetByText(tenantId, lookup.GroupKey, lookup.Text);
                    if (getByText != null && getByText.Id != lookup.Id)// @ text already exist
                        exc.Data.Add("message", "This text already exist below this group.");

                    // @ check for errors 
                    if (exc.Data.Count > 0)
                    {
                        context.Errors.Add(exc);
                        return null;
                    }


                    var updatedLookup = uow.LookupRepository.Update(lookup);
                    cacheController.UpsertLookup(updatedLookup);

                    var mapped = mapper.Map<LookupModel>(updatedLookup);
                    return mapped;
                });


            Field<LookupType>(
               "deleteLookup",
               arguments: new QueryArguments(
                   new QueryArgument<NonNullGraphType<StringGraphType>>
                   {
                       Name = "id",
                       Description = "id of the lookup"
                   }
               ),
               resolve: context =>
               {
                   if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                   var exc = new ExecutionError("validation");

                   var id = context.GetArgument<string>("id");

                   var lookUp = uow.LookupRepository.GetById(id);
                   if (lookUp != null)
                   {

                       var canDelete = uow.LookupRepository.CanDelete(id);
                       if (!canDelete)
                       {
                           exc.Data.Add("message", "You can not delete this lookup, because it is already used");
                       }
                       else
                       {

                           uow.LookupRepository.Delete(lookUp);
                       }
                   }

                   // @ check for errors 
                   if (exc.Data.Count > 0)
                   {
                       context.Errors.Add(exc);
                       return null;
                   }
                   cacheController.deleteLookup(lookUp);

                   var mapped = mapper.Map<LookupModel>(lookUp);
                   return mapped;
               });

            #endregion

            #region Drugs

            Field<DrugType>(
                "createDrug",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<DrugInputType>> { Name = "drug" }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var model = context.GetArgument<DrugModel>("drug");
                    var drug = mapper.Map<Drug>(model);

                    drug.TenantId = new DocumentRef(uow.TenantCollectionName, tenantId);
                    try
                    {
                        drug = uow.DrugRepository.Add(drug);

                    }
                    catch (Exception exc)
                    {
                        context.Errors.Add(new ExecutionError(exc.Message));
                        return null;
                    }
                    cacheController.UpsertDrug(drug);
                    var mapped = mapper.Map<DrugModel>(drug);
                    return mapped;
                });


            FieldAsync<DrugType>(
                "updateDrug",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<DrugInputType>> { Name = "drug" }
                ),

                resolve: async context =>
                {
                    var model = context.GetArgument<DrugModel>("drug");
                    var drug = await uow.DrugRepository.GetByIdAsync(model.Id);


                    mapper.Map(model, drug);
                    var updatedDrug = uow.DrugRepository.Update(drug);
                    cacheController.UpsertDrug(updatedDrug);
                    var mapped = mapper.Map<DrugModel>(updatedDrug);
                    return mapped;

                });


            FieldAsync<DrugType>(
              "deleteDrug",
              arguments: new QueryArguments(
                  new QueryArgument<NonNullGraphType<StringGraphType>>
                  {
                      Name = "id",
                      Description = "id of the drug"
                  }
              ),

              resolve: async context =>
              {
                  if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                  var exc = new ExecutionError("validation");

                  var id = context.GetArgument<string>("id");

                  var drug = await uow.DrugRepository.GetByIdAsync(id);
                  if (drug != null)
                  {

                      var canDelete = uow.DrugRepository.CanDelete(id);
                      if (!canDelete)
                      {
                          exc.Data.Add("message", "You can not delete this drug, because it is already used");
                      }
                      else
                      {
                          uow.DrugRepository.Delete(drug);
                      }
                  }

                  // @ check for errors 
                  if (exc.Data.Count > 0)
                  {
                      context.Errors.Add(exc);
                      return null;
                  }

                  cacheController.deleteDrug(drug);
                  var mapped = mapper.Map<DrugModel>(drug);

                  return mapped;
              });

            #endregion

            #region Grantors

            Field<GrantorType>(
                "createGrantor",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<GrantorInputType>> { Name = "grantor" }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var model = context.GetArgument<GrantorModel>("grantor");
                    var grantor = mapper.Map<Grantor>(model);
                    grantor.TenantId = new DocumentRef(uow.TenantCollectionName, tenantId);
                    var newGrantor = uow.GrantorRepository.Add(grantor);
                    cacheController.UpsertGrantor(newGrantor);
                    var mapped = mapper.Map<GrantorModel>(newGrantor);
                    return mapped;
                });

            FieldAsync<GrantorType>(
                "updateGrantor",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<GrantorInputType>> { Name = "grantor" }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var model = context.GetArgument<GrantorModel>("grantor");
                    var grantor = await uow.GrantorRepository.GetByIdAsync(model.Id);
                    mapper.Map(model, grantor);
                    var updatedGrantor = uow.GrantorRepository.Update(grantor);
                    cacheController.UpsertGrantor(updatedGrantor);
                    var mapped = mapper.Map<GrantorModel>(updatedGrantor);
                    return mapped;
                });

            FieldAsync<GrantorType>(
               "deleteGrantor",
               arguments: new QueryArguments(
                   new QueryArgument<NonNullGraphType<StringGraphType>>
                   {
                       Name = "id",
                       Description = "id of the grantor"
                   }
               ),
               resolve: async context =>
               {
                   if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                   var exc = new ExecutionError("validation");

                   var id = context.GetArgument<string>("id");
                   var grantor = await uow.GrantorRepository.GetByIdAsync(id);
                   if (grantor != null)
                   {
                       var canDelete = uow.GrantorRepository.CanDelete(id);
                       if (!canDelete)
                       {
                           exc.Data.Add("message", "You can not delete this grantor, because it is already used");
                       }
                       else
                       {
                           uow.GrantorRepository.Delete(grantor);
                       }
                   }

                   // @ check for errors 
                   if (exc.Data.Count > 0)
                   {
                       context.Errors.Add(exc);
                       return null;
                   }

                   cacheController.deleteGrantor(grantor);
                   var mapped = mapper.Map<GrantorModel>(grantor);
                   return mapped;
               });

            #endregion

            #region Tags

            Field<TagType>(
                "createTag",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<TagInputType>> { Name = "tag" }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var model = context.GetArgument<TagModel>("tag");
                    var tag = mapper.Map<Tag>(model);
                    tag.TenantId = new DocumentRef(uow.TenantCollectionName, tenantId);
                    var newTag = uow.TagRepository.Add(tag);
                    cacheController.UpsertTag(newTag);
                    var mapped = mapper.Map<TagModel>(newTag);
                    return mapped;
                });

            FieldAsync<TagType>(
                "updateTag",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<TagInputType>> { Name = "tag" }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var model = context.GetArgument<TagModel>("tag");
                    var tag = await uow.TagRepository.GetByIdAsync(model.Id);
                    mapper.Map(model, tag);
                    var updatedTag = uow.TagRepository.Update(tag);
                    cacheController.UpsertTag(updatedTag);
                    var mapped = mapper.Map<TagModel>(updatedTag);
                    return mapped;
                });

            FieldAsync<TagType>(
               "deleteTag",
               arguments: new QueryArguments(
                   new QueryArgument<NonNullGraphType<StringGraphType>>
                   {
                       Name = "id",
                       Description = "id of the tag"
                   }
               ),
               resolve: async context =>
               {
                   if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                   var exc = new ExecutionError("validation");

                   var id = context.GetArgument<string>("id");
                   var tag = await uow.TagRepository.GetByIdAsync(id);
                   if (tag != null)
                   {
                       var canDelete = uow.TagRepository.CanDelete(id);
                       if (!canDelete)
                       {
                           exc.Data.Add("message", "You can not delete this tag, because it is already used");
                       }
                       else
                       {
                           uow.TagRepository.Delete(tag);
                       }
                   }

                   // @ check for errors 
                   if (exc.Data.Count > 0)
                   {
                       context.Errors.Add(exc);
                       return null;
                   }

                   cacheController.deleteTag(tag);
                   var mapped = mapper.Map<TagModel>(tag);
                   return mapped;
               });

            #endregion

            #region Media

            Field<MediaFileType>(
               "createMediaFile",
               arguments: new QueryArguments(
                   new QueryArgument<NonNullGraphType<MediaFileInputType>> { Name = "mediaFile" }
               ),
               resolve: context =>
               {
                   if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                   var model = context.GetArgument<MediaFileModel>("mediaFile");
                   var mediaFile = mapper.Map<MediaFile>(model);
                   mediaFile.TenantId = new DocumentRef(uow.TenantCollectionName, tenantId);
                   var newMediaFile = uow.MediaFileRepository.Add(mediaFile);
                   cacheController.UpsertMediaFile(newMediaFile);

                   var mapped = mapper.Map<MediaFileModel>(newMediaFile);
                   return mapped;
               });

            Field<ListGraphType<MediaFileType>>(
               "updateMediaFiles",
               arguments: new QueryArguments(
                   new QueryArgument<NonNullGraphType<ListGraphType<MediaFileInputType>>> { Name = "mediaFiles" }
               ),
               resolve: context =>
               {
                   if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                   // @ TODO: remove code where trying to update patient media files
                   //var model = context.GetArgument<MediaFileModel>("mediaFiles");
                   var models = context.GetArgument<List<MediaFileModel>>("mediaFiles");
                   foreach (MediaFileModel model in models)
                   {
                       model.TenantId = GetTenantId(context);

                       var mediaFile = mapper.Map<MediaFile>(model);

                       var updateMediaFile = uow.MediaFileRepository.Update(mediaFile);
                       cacheController.UpsertMediaFile(updateMediaFile);
                   }

                   var mapped = mapper.Map<List<MediaFileModel>>(models);
                   return mapped;
               });


            Field<ListGraphType<StringGraphType>>(
               "deleteMediaFiles",
               arguments: new QueryArguments(
                   new QueryArgument<NonNullGraphType<ListGraphType<StringGraphType>>> { Name = "id" }
               ),
               resolve: context =>
               {
                   if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                   var ids = context.GetArgument<List<string>>("id");
                   foreach (var id in ids)
                   {
                       var mediaFile = uow.MediaFileRepository.GetById(id);

                       mediaFile.DeletedOn = DateTime.Now;
                       mediaFile.IsDeleted = true;
                       uow.MediaFileRepository.Update(mediaFile);
                       cacheController.UpsertMediaFile(mediaFile);
                   }


                   //var mapped = mapper.Map<MediaFileModel>(mediaFile);
                   return ids;
               });

            #endregion

        
            #region PatientMedications

            Field<PatientMedicationsType>(
           "createMedication",
           arguments: new QueryArguments(
               new QueryArgument<NonNullGraphType<PatientMedicationsInputType>> { Name = "PatientMedications" }
           ),
           resolve: context =>
           {

               if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

               var model = context.GetArgument<PatientMedicationsModel>("patientMedications");
               var patientMedication = mapper.Map<PatientMedications>(model);
               patientMedication.TenantId = new DocumentRef(uow.TenantCollectionName, tenantId);
               patientMedication.CreatedOn = DomainTime.Now();
               patientMedication.Modified = DomainTime.Now();
               var newPatientMedication = uow.PatientMedicationsRepository.Add(patientMedication);
               var mapped = mapper.Map<PatientMedicationsModel>(newPatientMedication);
               return mapped;
           });



            Field<PatientMedicationsType>(
                "updateMedications",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<PatientMedicationsInputType>> { Name = "PatientMedications" },
                      new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" },
                        new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "medicationId" }
                ),
                resolve: context =>
               {
                   if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                   var model = context.GetArgument<PatientMedicationsModel>("patientMedications");
                   var patientId = context.GetArgument<string>("patientId");
                   var medicationId = context.GetArgument<string>("medicationId");
                   var medication = uow.PatientMedicationsRepository.updateMedications(patientId, medicationId);
                   //var medication = uow.PatientMedicationsRepository.GetById(patient.MedicationId);
                   mapper.Map(model, medication);
                   var updatedMedication = uow.PatientMedicationsRepository.Update(medication);
                   var mapped = mapper.Map<PatientMedicationsModel>(updatedMedication);
                   return mapped;
               });
            #endregion

            #region Todos

            Field<TodoType>(
                "createTodo",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<TodoInputType>> { Name = "todo" }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var model = context.GetArgument<TodoModel>("todo");
                    var todo = mapper.Map<Todo>(model);
                    todo.TenantId = new DocumentRef(uow.TenantCollectionName, tenantId);
                    var newTodo = uow.TodoRepository.Add(todo);
                    cacheController.UpsertTodo(newTodo);
                    var mapped = mapper.Map<TodoModel>(newTodo);
                    return mapped;
                });

            FieldAsync<TodoType>(
                "updateTodo",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<TodoInputType>> { Name = "todo" }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var model = context.GetArgument<TodoModel>("todo");
                    var todo = await uow.TodoRepository.GetByIdAsync(model.Id);
                    mapper.Map(model, todo);
                    var updatedTodo = uow.TodoRepository.Update(todo);
                    cacheController.UpsertTodo(updatedTodo);
                    var mapped = mapper.Map<TodoModel>(updatedTodo);
                    return mapped;
                });

            FieldAsync<TodoType>(
               "deleteTodo",
               arguments: new QueryArguments(
                   new QueryArgument<NonNullGraphType<StringGraphType>>
                   {
                       Name = "id",
                       Description = "id of the todo"
                   }
               ),
               resolve: async context =>
               {
                   if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                   var exc = new ExecutionError("validation");

                   var id = context.GetArgument<string>("id");
                   var todo = await uow.TodoRepository.GetByIdAsync(id);
                   if (todo != null)
                   {
                       var canDelete = uow.TodoRepository.CanDelete(id);
                       if (!canDelete)
                       {
                           exc.Data.Add("message", "You can not delete this todo, because it is already used");
                       }
                       else
                       {
                           uow.TodoRepository.Delete(todo);
                       }
                   }

                   // @ check for errors 
                   if (exc.Data.Count > 0)
                   {
                       context.Errors.Add(exc);
                       return null;
                   }

                   cacheController.deleteTodo(todo);
                   var mapped = mapper.Map<TodoModel>(todo);
                   return mapped;
               });

            #endregion

            #region Tickets

            Field<TicketType>(
                "createTicket",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<TicketInputType>> { Name = "ticket" }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;

                    var model = context.GetArgument<TicketModel>("ticket");
                    var ticket = mapper.Map<Ticket>(model);
                    ticket.TenantId = new DocumentRef(uow.TenantCollectionName, tenantId);
                    var newTicket = uow.TicketRepository.Add(ticket);
                    cacheController.UpsertTicket(newTicket);
                    var mapped = mapper.Map<TicketModel>(newTicket);
                    var user = uow.UserRepository.GetUserByAltUserId(tenantId, userId);
                    model.Id = mapped.Id;
                    model.tenantName = user.Tenant.Name;
                    model.TicketDate = mapped.TicketDate;
                    ticketsSubscribtions.TicketChanges(model, SubscriptionEventEnum.ticket_created, tenantId, user.Id, user.getFullName(),true);

                    return mapped;
                });

            FieldAsync<TicketType>(
                "updateTicket",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<TicketInputType>> { Name = "ticket" },
                     new QueryArgument<BooleanGraphType> { Name = "broadcast" }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId, out var userId)) return null;
                    var broadcast = context.GetArgument<bool>("broadcast");
                    var model = context.GetArgument<TicketModel>("ticket");
                    var ticket = await uow.TicketRepository.GetByIdAsync(model.Id);                    
                    mapper.Map(model, ticket);
                    var updatedTicket = uow.TicketRepository.Update(ticket);
                    cacheController.UpsertTicket(updatedTicket);
                    var mapped = mapper.Map<TicketModel>(updatedTicket);
                    var user = uow.UserRepository.GetUserByAltUserId(tenantId, userId);
                    model.tenantName = user.Tenant.Name;
                    model.TicketDate = mapped.TicketDate;
                    if(broadcast==true)
                    ticketsSubscribtions.TicketChanges(model, SubscriptionEventEnum.ticket_updated, tenantId, user.Id, user.getFullName(), true);

                    return mapped;
                });
            FieldAsync<TicketType>(
               "updateTicketAdmin",
               arguments: new QueryArguments(
                   new QueryArgument<NonNullGraphType<TicketInputType>> { Name = "ticket" },
                    new QueryArgument<BooleanGraphType> { Name = "broadcast" }
               ),
               resolve: async context =>
               {
                   if (GetAdminFromContext(context, out var userId, out var userName)) return null;
                   var broadcast = context.GetArgument<bool>("broadcast");
                   var model = context.GetArgument<TicketModel>("ticket");
                   var ticket = await uow.TicketRepository.GetByIdAsync(model.Id);
                   mapper.Map(model, ticket);
                   var updatedTicket = uow.TicketRepository.Update(ticket);
                   cacheController.UpsertTicket(updatedTicket);
                   var mapped = mapper.Map<TicketModel>(updatedTicket);
                   model.TicketDate = mapped.TicketDate;
                   //var user = uow.UserRepository.GetByIdAsync( userId);

                   var tenantId = ticket.TenantId.DocumentId;
                   if (broadcast == true)
                       ticketsSubscribtions.TicketChanges(model, SubscriptionEventEnum.ticket_updated, tenantId, userId, userName,false);

                   return mapped;
               });

            #endregion

        }
        private bool GetAdminFromContext(IResolveFieldContext<object> context, out string userId, out string userName)
        {
            var userContext = context.UserContext as GraphQLUserContext;
            var identity = userContext.User?.Identity;
            var authenticated = identity?.IsAuthenticated ?? false;
            if (!authenticated)
            {
                context.Errors.Add(
                    new ExecutionError($"Authorization is required to access {this.Name}."));
                //tenantId = "";
                userId = "";
                userName = "";
                return true;
            }

           // var tenantClaim =
                //userContext.User.Claims.FirstOrDefault(x => x.Type == "tenantId");
            var userNameClaim =
                userContext.User.Claims.FirstOrDefault(x => x.Type == "firstname").Value+" "+
                userContext.User.Claims.FirstOrDefault(x => x.Type == "lastname").Value;
            //tenantId = tenantClaim == null ? "" : tenantClaim.Value;
            userName = userNameClaim == null ? "" : userNameClaim;
            var userIdClaim =
               userContext.User.Claims.FirstOrDefault(x => x.Type == "sub");
            userId = userIdClaim == null ? "" : userIdClaim.Value;
            return false;
        }
        private bool GetTenantFromContext(IResolveFieldContext<object> context, out string tenantId, out string userId)
        {
            var userContext = context.UserContext as GraphQLUserContext;
            var identity = userContext.User?.Identity;
            var authenticated = identity?.IsAuthenticated ?? false;
            if (!authenticated)
            {
                context.Errors.Add(
                    new ExecutionError($"Authorization is required to access {this.Name}."));
                tenantId = "";
                userId = "";
                return true;
            }

            var tenantClaim =
                userContext.User.Claims.FirstOrDefault(x => x.Type == "tenantId");
            var userIdClaim =
                userContext.User.Claims.FirstOrDefault(x => x.Type == "sub");
            tenantId = tenantClaim == null ? "" : tenantClaim.Value;
            userId = userIdClaim == null ? "" : userIdClaim.Value;

            return false;
        }

        private string GetTenantId(IResolveFieldContext<object> context)
        {
            var userContext = context.UserContext as GraphQLUserContext;
            var tenantClaim = userContext.User.Claims.FirstOrDefault(x => x.Type == "tenantId");
            var tenantId = tenantClaim == null ? "" : tenantClaim.Value;

            return tenantId;
        }
    }
    public class MessageInputType : InputObjectGraphType
    {
        public MessageInputType()
        {
            Field<StringGraphType>("fromId");
            Field<StringGraphType>("content");
            Field<DateGraphType>("sentAt");
        }
    }



}
