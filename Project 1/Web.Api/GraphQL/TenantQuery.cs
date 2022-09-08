using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using GraphQL;
using GraphQL.Types;
using Medcilia.Clinic.Infrastructure;
using Medcilia.Clinic.Infrastructure.Domain;
using Medcilia.Clinic.Infrastructure.Repository.Lookup;
using Medcilia.Clinic.Infrastructure.Repository.Settings;
using Medcilia.Clinic.Infrastructure.Repository.Subscription;
using Medcilia.Clinic.WebApi.GraphQL.Models;
using Medcilia.Clinic.WebApi.GraphQL.sub;
using Medcilia.Clinic.WebApi.GraphQL.Subscriptions;
using Medcilia.Clinic.WebApi.GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL
{
    public class TenantQuery : ObjectGraphType
    {
        public TenantQuery(
            IUnitOfWork uow,
            ISettingsRepository settingsRepository,
            ISubscriptionRepository subscriptionRepository,
            IChat chat,
            IAppointmentsSubscribtions appointmentsSubscribtions,
            IMapper mapper)
        {
            Name = "Query";

            Field<ListGraphType<MessageType>>("messages", resolve: context => chat.AllMessages.Take(100));
            Field<ListGraphType<AppointmentEventType>>("GetAppointmentsEvents", resolve: context => appointmentsSubscribtions.AllAppointments.Take(100));

            #region Schedule
            FieldAsync<ScheduleType>(
               "schedule",
               resolve: async context =>
               {
                   if (GetTenantFromContext(context, out var tenantId)) return null;

                   var schedule =  uow.ScheduleRepository.get(tenantId);
                   var mapped = mapper.Map<ScheduleModel>(schedule);
                   return mapped;
               }
           );
            #endregion

            #region Rota

            FieldAsync<ListGraphType<RotaType>>(
                "rotaAll",
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var result = await uow.RotaRepository.Search("", tenantId, 1, 1000);
                    var mapped = mapper.Map<List<RotaModel>>(result.Items);
                    return mapped;
                });

            FieldAsync<RotaType>(
                "rota",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id", Description = "id of the rota" }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var id = context.GetArgument<string>("id");
                    var rota = await uow.RotaRepository.GetByIdAsync(id);
                    var mapped = mapper.Map<RotaModel>(rota);
                    return mapped;
                }
            );

            #endregion

            #region Locations

            FieldAsync<ListGraphType<LocationType>>(
                "locations",
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var result = await uow.LocationRepository.Search("", tenantId, 1, 200);
                    var mapped = mapper.Map<List<LocationModel>>(result.Items);
                    return mapped;
                });

            FieldAsync<LocationType>(
                "location",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>>
                    {
                        Name = "id",
                        Description = "id of the location"
                    }
                ),
                resolve: async context =>
                {
                    var id = context.GetArgument<string>("id");
                    var location = await uow.LocationRepository.GetByIdAsync(id);
                    var mapped = mapper.Map<LocationModel>(location);
                    return mapped;
                }
            );

            #endregion

            #region Settings

            Field<ListGraphType<SettingsType>>(
                "settings",
                resolve: context =>
                {
                    var settings = settingsRepository.AsQueryable().ToList();
                    var mapped = mapper.Map<List<SettingsModel>>(settings);
                    return mapped;
                });


            #endregion

            //#region Subscriptions

            //Field<ListGraphType<SubscriptionType>>(
            //    "subscriptions",
            //    resolve: context =>
            //    {
            //        var settings = subscriptionRepository.AsQueryable().ToList();
            //        var mapped = mapper.Map<List<SubscriptionModel>>(settings);
            //        return mapped;
            //    });

            //Field<SubscriptionType>(
            //    "subscription",
            //    arguments: new QueryArguments(
            //        new QueryArgument<NonNullGraphType<StringGraphType>>
            //        {
            //            Name = "id",
            //            Description = "id of the subscription"
            //        }
            //    ),
            //    resolve: context =>
            //    {
            //        var id = context.GetArgument<string>("id");
            //        var subscription = subscriptionRepository.GetById(id);
            //        var mapped = mapper.Map<SubscriptionModel>(subscription);
            //        return mapped;
            //    }
            //);

            //Field<SubscriptionType>(
            //    "activeSubscription",
            //    resolve: context =>
            //    {
            //        // TODO: Calculate active subscription start -> expire 
            //        var subscription = subscriptionRepository.AsQueryable().OrderByDescending(x => x.ProcessTime).FirstOrDefault();
            //        var mapped = mapper.Map<SubscriptionModel>(subscription);
            //        return mapped;
            //    }
            //);

            //#endregion

            #region Appointments

            FieldAsync<ListGraphType<AppointmentType>>(
                "appointments",
                  arguments: new QueryArguments(
                   new QueryArgument<DateTimeGraphType> { Name = "startTime" },
                   new QueryArgument<DateTimeGraphType> { Name = "endTime" },
                   new QueryArgument<StringGraphType> { Name = "sortBy" },
                   new QueryArgument<IntGraphType> { Name = "page" },
                   new QueryArgument<IntGraphType> { Name = "size" },
                   new QueryArgument<StringGraphType> { Name = "filter" },
                   new QueryArgument<BooleanGraphType> { Name = "descending" }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var startTime = context.GetArgument<DateTime>("startTime");
                    var endTime = context.GetArgument<DateTime>("endTime");
                    var page = context.GetArgument<int>("page");
                    var size = context.GetArgument<int?>("size") ?? 1000;
                    var filter = context.GetArgument<string>("filter");
                    var sortBy = context.GetArgument<string>("sortBy");
                    var descending = context.GetArgument<bool>("descending");

                    var result = await uow.AppointmentRepository.Search(startTime, endTime, filter, sortBy, descending, tenantId, page, size);
                    var mapped = mapper.Map<List<AppointmentModel>>(result.Items);
                    return mapped;
                });

            Field<AppointmentType>(
                "appointment",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>>
                    {
                        Name = "id",
                        Description = "id of the appointment"
                    }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var id = context.GetArgument<string>("id");
                    var appointment = uow.AppointmentRepository.GetById(id);
                    var mapped = mapper.Map<AppointmentModel>(appointment);
                    return mapped;
                }
            );

            #endregion

            #region Contacts

            FieldAsync<IntGraphType>(
             "contactsTotal",
               arguments: new QueryArguments(
                new QueryArgument<StringGraphType> { Name = "sortBy" },
                new QueryArgument<IntGraphType> { Name = "page" },
                new QueryArgument<IntGraphType> { Name = "size" },
                new QueryArgument<StringGraphType> { Name = "filter" },
                new QueryArgument<BooleanGraphType> { Name = "descending" }
             ),
             resolve: async context =>
             {
                 if (GetTenantFromContext(context, out var tenantId)) return null;

                 var page = context.GetArgument<int>("page");
                 var size = context.GetArgument<int>("size");
                 var filter = context.GetArgument<string>("filter");
                 var sortBy = context.GetArgument<string>("sortBy");
                 var descending = context.GetArgument<bool>("descending");

                 var result = await uow.ContactRepository.Search(filter, sortBy, descending, tenantId, page, size);

                 return result.Total;
             });

            FieldAsync<ListGraphType<ContactType>>(
                "contacts",
                  arguments: new QueryArguments(
                   new QueryArgument<StringGraphType> { Name = "sortBy" },
                   new QueryArgument<IntGraphType> { Name = "page" },
                   new QueryArgument<IntGraphType> { Name = "size" },
                   new QueryArgument<StringGraphType> { Name = "filter" },
                   new QueryArgument<BooleanGraphType> { Name = "descending" }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var page = context.GetArgument<int>("page");
                    var size = context.GetArgument<int>("size");
                    var filter = context.GetArgument<string>("filter");
                    var sortBy = context.GetArgument<string>("sortBy");
                    var descending = context.GetArgument<bool>("descending");

                    var result = await uow.ContactRepository.Search(filter, sortBy, descending, tenantId, page, size);
                    var mapped = mapper.Map<List<ContactModel>>(result.Items);

                    return mapped;
                });

            Field<ContactType>(
                "contact",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>>
                    {
                        Name = "id",
                        Description = "id of the contact"
                    }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var id = context.GetArgument<string>("id");
                    var Contact = uow.ContactRepository.GetById(id);
                    var mapped = mapper.Map<ContactModel>(Contact);
                    return mapped;
                }
            );

            #endregion

            #region Patients

            FieldAsync<IntGraphType>(
               "patientsTotal",
                 arguments: new QueryArguments(
                  new QueryArgument<StringGraphType> { Name = "sortBy" },
                  new QueryArgument<IntGraphType> { Name = "page" },
                  new QueryArgument<IntGraphType> { Name = "size" },
                  new QueryArgument<StringGraphType> { Name = "filter" },
                  new QueryArgument<BooleanGraphType> { Name = "descending" }
               ),
               resolve: async context =>
               {
                   if (GetTenantFromContext(context, out var tenantId)) return null;

                   var page = context.GetArgument<int>("page");
                   var size = context.GetArgument<int>("size");
                   var filter = context.GetArgument<string>("filter");
                   var sortBy = context.GetArgument<string>("sortBy");
                   var descending = context.GetArgument<bool>("descending");
                   
                   chat.AddMessage(new Message { Content = "AddMessage by 123 user" + DateTime.Now, From = new MessageFrom{ Id = "123",DisplayName="123" } });
                   chat.AddMessage(new ReceivedMessage { Content = "ReceivedMessage by 123 user" + DateTime.Now, FromId = "123" });
                   chat.AddMessage(new ReceivedMessage { Content = "ReceivedMessage by 1 user" + DateTime.Now, FromId = "1" });

                   //var model = new AppointmentModel {Color="red" };
                   //appointmentsSubscribtions.AppointmentCreated(model,tenantId);

                   //chat.AppointmentCreated(a,tenantId);

                   var result = await uow.ContactRepository.SearchPatients(filter, sortBy, descending, tenantId, page, size);

                   return result.Total;
               });

            FieldAsync<ListGraphType<PatientType>>(
                "patients",
                  arguments: new QueryArguments(
                   new QueryArgument<StringGraphType> { Name = "sortBy" },
                   new QueryArgument<IntGraphType> { Name = "page" },
                   new QueryArgument<IntGraphType> { Name = "size" },
                   new QueryArgument<StringGraphType> { Name = "filter" },
                   new QueryArgument<BooleanGraphType> { Name = "descending" }
                ),
                resolve: async context =>
                {
                   if (GetTenantFromContext(context, out var tenantId)) return null;

                    var page = context.GetArgument<int>("page");
                    var size = context.GetArgument<int>("size");
                    var filter = context.GetArgument<string>("filter");
                    var sortBy = context.GetArgument<string>("sortBy");
                    var descending = context.GetArgument<bool>("descending");



                    var result = await uow.ContactRepository.SearchPatients(filter, sortBy, descending, tenantId, page, size);
                    var mapped = mapper.Map<List<ContactModel>>(result.Items);

                    return mapped;
                });

            Field<PatientType>(
                "patient",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>>
                    {
                        Name = "id",
                        Description = "id of the patient"
                    }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var id = context.GetArgument<string>("id");
                    var Contact = uow.ContactRepository.GetById(id);
                    var mapped = mapper.Map<ContactModel>(Contact);
                    return mapped;
                }
            );

            #endregion

            #region Lookups

            Field<ListGraphType<LookupType>>(
                "lookups",
                resolve: context =>
                {
                    if (IsUserNotAuthenticated(context)) return true;

                    var lookups = uow.LookupRepository.AsQueryable().ToList();
                    var mapped = mapper.Map<List<LookupModel>>(lookups);
                    return mapped;

                });

            Field<LookupType>(
                "lookup",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>>
                    {
                        Name = "id",
                        Description = "id of the lookup"
                    }
                ),
                resolve: context =>
                {
                    if (IsUserNotAuthenticated(context)) return true;

                    var id = context.GetArgument<string>("id");
                    var lookup = uow.LookupRepository.GetById(id);
                    var mapped = mapper.Map<LookupModel>(lookup);
                    return mapped;
                }
            );

            Field<LookupType>(
                "lookupByText",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>>
                    {
                        Name = "text",
                        Description = "text of a lookup entry"
                    },
                    new QueryArgument<NonNullGraphType<StringGraphType>>
                    {
                        Name = "group",
                        Description = "groupKey of a lookup entry"
                    }
                ),
                resolve: context =>
                {
                    //if (IsUserNotAuthenticated(context)) return true;
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var text = context.GetArgument<string>("text");
                    var group = context.GetArgument<string>("group");
                    var lookup = uow.LookupRepository.GetByText(tenantId, group, text);
                    var mapped = mapper.Map<LookupModel>(lookup);
                    return mapped;
                }
            );

            Field<LookupType>(
                "lookupByValue",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>>
                    {
                        Name = "value",
                        Description = "value of a lookup entry"
                    },
                    new QueryArgument<NonNullGraphType<StringGraphType>>
                    {
                        Name = "group",
                        Description = "groupKey of a lookup entry"
                    }
                ),
                resolve: context =>
                {
                    // if (IsUserNotAuthenticated(context)) return true;
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var value = context.GetArgument<string>("value");
                    var group = context.GetArgument<string>("group");
                    //var culture = AppSettings.get().Culture;
                    var lookup = uow.LookupRepository.GetByValue(tenantId, group, value);
                    var mapped = mapper.Map<LookupModel>(lookup);
                    return mapped;
                }
            );

            Field<ListGraphType<LookupType>>(
                "lookupsByGroup",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>>
                    {
                        Name = "group",
                        Description = "groupKey of a lookup entry"
                    },
                    new QueryArgument<StringGraphType> { Name = "filter" },
                    new QueryArgument<IntGraphType> { Name = "page" },
                    new QueryArgument<IntGraphType> { Name = "size" },
                    new QueryArgument<BooleanGraphType> { Name = "filterPredefined" }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var page = context.GetArgument<int>("page");
                    var size = context.GetArgument<int>("size");
                    var filter = context.GetArgument<string>("filter");
                    var group = context.GetArgument<string>("group");
                    var filterPredefined = context.GetArgument<bool>("filterPredefined");

                    var result = uow.LookupRepository.SearchByGroup(filter, group, tenantId, page, size, filterPredefined);
                    var mapped = mapper.Map<List<LookupModel>>(result.Items);

                    return mapped;

                    //var group = context.GetArgument<string>("group");
                    ////var culture = AppSettings.get().Culture;
                    //var lookups = lookupRepository.GetByGroup(group);
                    //var mapped = mapper.Map<List<LookupModel>>(lookups);
                    //return mapped;
                });

            Field<IntGraphType>(
                "lookupsByGroupTotal",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>>
                    {
                        Name = "group",
                        Description = "groupKey of a lookup entry"
                    },
                    new QueryArgument<StringGraphType> { Name = "filter" },
                    new QueryArgument<IntGraphType> { Name = "page" },
                    new QueryArgument<IntGraphType> { Name = "size" },
                    new QueryArgument<BooleanGraphType> { Name = "filterPredefined" }
                ),
                resolve: context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var page = context.GetArgument<int>("page");
                    var size = context.GetArgument<int>("size");
                    var filter = context.GetArgument<string>("filter");
                    var group = context.GetArgument<string>("group");
                    var filterPredefined = context.GetArgument<bool>("filterPredefined");

                    var result = uow.LookupRepository.SearchByGroup(filter, group, tenantId, page, size, filterPredefined);

                    return result.Total;
                });

            Field<ListGraphType<LookupType>>(
                "lookupsByGroups",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ListGraphType<StringGraphType>>>
                    {
                        Name = "groups",
                        Description = "groupKey of a lookup entry"
                    },
                    new QueryArgument<BooleanGraphType> { Name = "filterPredefined" }

                ),
                resolve: context =>
                {
                    //if (IsUserNotAuthenticated(context)) return true;
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var groups = context.GetArgument<List<string>>("groups");
                    var filterPredefined = context.GetArgument<bool>("filterPredefined");


                    var lookups = uow.LookupRepository.GetByGroups(tenantId, groups, filterPredefined);
                    var mapped = mapper.Map<List<LookupModel>>(lookups);
                    return mapped;
                });

            
            #endregion

            #region Conditions

            Field<ListGraphType<ConditionType>>(
                "conditions",
                resolve: context =>
                {
                    var conditions = uow.ContactRepository.AsQueryable().ToList();
                    var mapped = mapper.Map<List<ConditionModel>>(conditions);
                    return mapped;

                });


            #endregion

            #region Grantors

            FieldAsync<IntGraphType>(
                "grantorsTotal",
                 arguments: new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "filter" },
                    new QueryArgument<IntGraphType> { Name = "page" },
                    new QueryArgument<IntGraphType> { Name = "size" }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var filter = context.GetArgument<string>("filter");
                    var page = context.GetArgument<int>("page");
                    var size = context.GetArgument<int>("size");

                    var result = await uow.GrantorRepository.Search(filter, tenantId, page, size);

                    return result.Total;
                });

            FieldAsync<ListGraphType<GrantorType>>(
                "grantors",
                 arguments: new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "filter" },
                    new QueryArgument<IntGraphType> { Name = "page" },
                    new QueryArgument<IntGraphType> { Name = "size" }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var filter = context.GetArgument<string>("filter");
                    var page = context.GetArgument<int>("page");
                    var size = context.GetArgument<int>("size");

                    var result = await uow.GrantorRepository.Search(filter, tenantId, page, size);

                    //var grantors = uow.GrantorRepository.AsQueryable().ToList();
                    var mapped = mapper.Map<List<GrantorModel>>(result.Items);
                    return mapped;
                });

            FieldAsync<GrantorType>(
                "grantor",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>>
                    {
                        Name = "id",
                        Description = "id of the grantor"
                    }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var id = context.GetArgument<string>("id");
                    var grantor = await uow.GrantorRepository.GetByIdAsync(id);
                    var mapped = mapper.Map<GrantorModel>(grantor);
                    return mapped;
                }
            );

            #endregion

            #region Todos

            FieldAsync<IntGraphType>(
                "todosTotal",
                 arguments: new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "filter" },
                    new QueryArgument<IntGraphType> { Name = "page" },
                    new QueryArgument<IntGraphType> { Name = "size" },
                    new QueryArgument<StringGraphType> { Name = "patientId" }
                ),
                resolve: async context =>
                {
                     if (GetTenantFromContext(context, out var tenantId)) return null;

                    var filter = context.GetArgument<string>("filter");
                    var page = context.GetArgument<int>("page");
                    var size = context.GetArgument<int>("size");
                    var patientId = context.GetArgument<string>("patientId");

                    var result = await uow.TodoRepository.Search(filter, tenantId, page, size, patientId);

                    return result.Total;
                });

            FieldAsync<ListGraphType<TodoType>>(
                "todos",
                 arguments: new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "filter" },
                    new QueryArgument<IntGraphType> { Name = "page" },
                    new QueryArgument<IntGraphType> { Name = "size" },
                    new QueryArgument<StringGraphType> { Name = "patientId" }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var filter = context.GetArgument<string>("filter");
                    var page = context.GetArgument<int>("page");
                    var size = context.GetArgument<int>("size");
                    var patientId = context.GetArgument<string>("patientId");

                    var result = await uow.TodoRepository.Search(filter, tenantId, page, size, patientId);

                    //var grantors = uow.GrantorRepository.AsQueryable().ToList();
                    var mapped = mapper.Map<List<TodoModel>>(result.Items);
                    return mapped;
                });

            FieldAsync<TodoType>(
                "todo",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>>
                    {
                        Name = "id",
                        Description = "id of the todo"
                    }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var id = context.GetArgument<string>("id");
                    var todo = await uow.TodoRepository.GetByIdAsync(id);
                    var mapped = mapper.Map<TodoModel>(todo);
                    return mapped;
                }
            );

            #endregion
            #region Tags

            FieldAsync<IntGraphType>(
                "tagsTotal",
                 arguments: new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "filter" },
                    new QueryArgument<IntGraphType> { Name = "page" },
                    new QueryArgument<IntGraphType> { Name = "size" }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var filter = context.GetArgument<string>("filter");
                    var page = context.GetArgument<int>("page");
                    var size = context.GetArgument<int>("size");

                    var result = await uow.TagRepository.Search(filter, tenantId, page, size);

                    return result.Total;
                });

            FieldAsync<ListGraphType<TagType>>(
                "tags",
                 arguments: new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "filter" },
                    new QueryArgument<IntGraphType> { Name = "page" },
                    new QueryArgument<IntGraphType> { Name = "size" }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var filter = context.GetArgument<string>("filter");
                    var page = context.GetArgument<int>("page");
                    var size = context.GetArgument<int>("size");

                    var result = await uow.TagRepository.Search(filter, tenantId, page, size);

                    //var tags = uow.TagRepository.AsQueryable().ToList();
                    var mapped = mapper.Map<List<TagModel>>(result.Items);
                    return mapped;
                });

            FieldAsync<TagType>(
                "tag",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>>
                    {
                        Name = "id",
                        Description = "id of the tag"
                    }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var id = context.GetArgument<string>("id");
                    var tag = await uow.TagRepository.GetByIdAsync(id);
                    var mapped = mapper.Map<TagModel>(tag);
                    return mapped;
                }
            );

            #endregion

            #region Drugs

            FieldAsync<ListGraphType<DrugType>>(
                "drugs",
                arguments: new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "filter" },
                    new QueryArgument<IntGraphType> { Name = "page" },
                    new QueryArgument<IntGraphType> { Name = "size" }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var filter = context.GetArgument<string>("filter");
                    var page = context.GetArgument<int>("page");
                    var size = context.GetArgument<int>("size");

                    var result = await uow.DrugRepository.Search(filter, tenantId, page, size);

                    var mapped = mapper.Map<List<DrugModel>>(result.Items);
                    return mapped;

                });

            Field<DrugType>(
                "drug",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>>
                    {
                        Name = "id",
                        Description = "id of the drug"
                    }
                ),
                resolve: context =>
                {
                    var id = context.GetArgument<string>("id");
                    var drug = uow.DrugRepository.GetById(id);
                    var mapped = mapper.Map<DrugModel>(drug);
                    return mapped;
                }
            );

            #endregion

            #region Media

            FieldAsync<ListGraphType<PatientMediaFilesType>>(
                "patientsMediaFiles",
                 arguments: new QueryArguments(
                   new QueryArgument<IntGraphType> { Name = "page" },
                   new QueryArgument<IntGraphType> { Name = "size" },
                   new QueryArgument<StringGraphType> { Name = "filter" },
                   new QueryArgument<StringGraphType> { Name = "patientId" }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var page = context.GetArgument<int>("page");
                    var size = context.GetArgument<int>("size");
                    var filter = context.GetArgument<string>("filter");
                    var patientId = context.GetArgument<string>("patientId");

                    var patientsFiles = await uow.MediaFileRepository.SearchPatientsMediaFiles(filter, patientId, tenantId, page, size);

                    var mapped = mapper.Map<List<PatientMediaFilesViewModel>>(patientsFiles.Items);
                    return mapped;
                });

            FieldAsync<ListGraphType<MediaFileType>>(
               "tenantPoolMediaFiles",
                arguments: new QueryArguments(
                  new QueryArgument<IntGraphType> { Name = "page" },
                  new QueryArgument<IntGraphType> { Name = "size" },
                  new QueryArgument<StringGraphType> { Name = "filter" }
               ),
               resolve: async context =>
               {
                   if (GetTenantFromContext(context, out var tenantId)) return null;

                   var page = context.GetArgument<int?>("page");
                   var size = context.GetArgument<int?>("size");
                   var filter = context.GetArgument<string>("filter");

                   var mediaFiles = await uow.MediaFileRepository.GetTenantPoolMediaFiles(filter, tenantId, page ?? 1, size ?? int.MaxValue);

                   var mapped = mapper.Map<List<MediaFileModel>>(mediaFiles.Items);
                   return mapped;
               });

            FieldAsync<ListGraphType<MediaFileType>>(
                "patientMediaFiles",
                description: "Get media files by patient id",
                arguments: new QueryArguments(
                  new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" },
                  new QueryArgument<IntGraphType> { Name = "page" },
                  new QueryArgument<IntGraphType> { Name = "size" },
                  new QueryArgument<StringGraphType> { Name = "filter" }
               ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var patientId = context.GetArgument<string>("patientId");
                    var speciality = context.GetArgument<string>("speciality");
                    var conditionId = context.GetArgument<string>("conditionId");
                    var activitType = context.GetArgument<string>("activitType");
                    var activityId = context.GetArgument<string>("activityId");

                    var page = context.GetArgument<int?>("page");
                    var size = context.GetArgument<int?>("size");
                    var filter = context.GetArgument<string>("filter");

                    var patientFiles = await uow.MediaFileRepository.SearchByPatientId(filter, tenantId, patientId, page ?? 1 , size ?? int.MaxValue);

                    var mapped = mapper.Map<List<MediaFileModel>>(patientFiles.Items);
                    return mapped;
                });
            FieldAsync<IntGraphType>(
              "patientMediaFilesTotal",
               arguments: new QueryArguments(
                 new QueryArgument<IntGraphType> { Name = "page" },
                 new QueryArgument<IntGraphType> { Name = "size" },
                 new QueryArgument<StringGraphType> { Name = "filter" },
                 new QueryArgument<StringGraphType> { Name = "patientId" }
              ),
              resolve: async context =>
              {
                  if (GetTenantFromContext(context, out var tenantId)) return null;

                  var page = context.GetArgument<int?>("page");
                  var size = context.GetArgument<int?>("size");
                  var filter = context.GetArgument<string>("filter");
                  var patientId = context.GetArgument<string>("patientId");

                  var patientFiles = await uow.MediaFileRepository.SearchByPatientId(filter, tenantId, patientId, page ?? 1, size ?? int.MaxValue);
                  return patientFiles.Total;
              });

            FieldAsync<ListGraphType<MediaFileType>>(
                "patientMediaPoolFiles",
                description: "Get patient pool media files by patient id",
                arguments: new QueryArguments(
                  new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" },
                  new QueryArgument<IntGraphType> { Name = "page" },
                  new QueryArgument<IntGraphType> { Name = "size" },
                  new QueryArgument<StringGraphType> { Name = "filter" }
               ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var patientId = context.GetArgument<string>("patientId");
                  

                    var page = context.GetArgument<int?>("page");
                    var size = context.GetArgument<int?>("size");
                    var filter = context.GetArgument<string>("filter");

                    var patientFiles = await uow.MediaFileRepository.GetMediaPoolByPatientId(filter, tenantId, patientId, page ?? 1, size ?? int.MaxValue);

                    var mapped = mapper.Map<List<MediaFileModel>>(patientFiles.Items);
                    return mapped;
                });



            FieldAsync<ListGraphType<MediaFileType>>(
            "activityMediaFiles",
            description: "Get media files by activity",
            arguments: new QueryArguments(
              new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" },
              new QueryArgument<StringGraphType> { Name = "speciality" },
              new QueryArgument<StringGraphType> { Name = "conditionId" },
              new QueryArgument<StringGraphType> { Name = "activitType" },
              new QueryArgument<StringGraphType> { Name = "activityId" },
              new QueryArgument<StringGraphType> { Name = "filter" },
              new QueryArgument<IntGraphType> { Name = "page" },
              new QueryArgument<IntGraphType> { Name = "size" }
           ),
            resolve: async context =>
            {
                if (GetTenantFromContext(context, out var tenantId)) return null;

                var patientId = context.GetArgument<string>("patientId");
                var speciality = context.GetArgument<string>("speciality");
                var conditionId = context.GetArgument<string>("conditionId");
                var activitType = context.GetArgument<string>("activitType");
                var activityId = context.GetArgument<string>("activityId");

                var page = context.GetArgument<int?>("page");
                var size = context.GetArgument<int?>("size");
                var filter = context.GetArgument<string>("filter");

                var files = await uow.MediaFileRepository.SearchByActivity(filter, tenantId, patientId, speciality, conditionId, activitType, activityId, page ?? 1, size ?? int.MaxValue);

                var mapped = mapper.Map<List<MediaFileModel>>(files.Items);
                return mapped;
            });

            FieldAsync<ListGraphType<MediaFileType>>(
                "mediaFiles",
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var mediaFiles = await uow.MediaFileRepository.Search("", tenantId, 1, 10);
                    var mapped = mapper.Map<List<MediaFileModel>>(mediaFiles.Items);
                    return mapped;
                });

            FieldAsync<MediaFileType>(
                "MediaFile",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>>
                    {
                        Name = "id",
                        Description = "id of the file"
                    }
                ),
                resolve: async context =>
                {
                    var id = context.GetArgument<string>("id");
                    var file = await uow.MediaFileRepository.GetByIdAsync(id);
                    var mapped = mapper.Map<MediaFileModel>(file);
                    return mapped;
                }
            );

            Field<ListGraphType<MediaFileType>>(
                "trashedMediaFiles",
                resolve: context =>
                {
                    var mediaFiles = uow.MediaFileRepository.GetAllDeleted();
                    var mapped = mapper.Map<List<MediaFileModel>>(mediaFiles);
                    return mapped;
                });
            FieldAsync<ListGraphType<MediaFileType>>(
                "ticketMediaFiles",
            arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "text" },
              new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "ticketNumber" },              
              new QueryArgument<IntGraphType> { Name = "page" },
              new QueryArgument<IntGraphType> { Name = "size" }
           ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;
                    var text = context.GetArgument<string>("text");
                    var ticketNumber = context.GetArgument<string>("ticketNumber");
                    var page = context.GetArgument<int>("page");
                    var size = context.GetArgument<int>("size");

                    var mediaFiles = await uow.MediaFileRepository.SearchTicketsMediaFiles(text, ticketNumber, page, size);
                    var mapped = mapper.Map<List<MediaFileModel>>(mediaFiles.Items);
                    
                    return mapped;
                });
            #endregion

            #region PatientMedications

            FieldAsync<ListGraphType<PatientMedicationsType>>(
                "patientMedications",
                  arguments: new QueryArguments(
                   new QueryArgument<DateTimeGraphType> { Name = "startTime" },
                   new QueryArgument<DateTimeGraphType> { Name = "endTime" },
                   new QueryArgument<StringGraphType> { Name = "sortBy" },
                   new QueryArgument<IntGraphType> { Name = "page" },
                   new QueryArgument<IntGraphType> { Name = "size" },
                   // new QueryArgument<StringGraphType> { Name = "filter" },
                   new QueryArgument<BooleanGraphType> { Name = "descending" }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var startTime = context.GetArgument<DateTime>("startTime");
                    var endTime = context.GetArgument<DateTime>("endTime");
                    var page = context.GetArgument<int>("page");
                    var size = context.GetArgument<int?>("size") ?? 1000;
                    //var filter = context.GetArgument<string>("filter");
                    var sortBy = context.GetArgument<string>("sortBy");
                    var descending = context.GetArgument<bool>("descending");

                    var result = await uow.PatientMedicationsRepository.Search(startTime, endTime, sortBy, descending, tenantId, page, size);
                    var mapped = mapper.Map<List<PatientMedicationsModel>>(result.Items);
                    return mapped;
                });

            FieldAsync< ListGraphType<PatientMedicationsType>>(
                "patientMedication",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>>
                    {
                        Name = "patientId",
                        Description = "The id of patient."
                    }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var id = context.GetArgument<string>("patientId");
                    var patientMedications = await uow.PatientMedicationsRepository.SearchPatientMedications(id,tenantId);
                    var mapped = mapper.Map<List<PatientMedicationsModel>>(patientMedications.Items);
                    return mapped;

                }
            );
            FieldAsync<ListGraphType<PatientMedicationsType>>(
               "patientMedicationByCondition",
               arguments: new QueryArguments(
                   new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" },
                   new QueryArgument<StringGraphType> { Name = "conditionId" }                  
               ),
               resolve: async context =>
               {
                   if (GetTenantFromContext(context, out var tenantId)) return null;

                   var id = context.GetArgument<string>("patientId");
                   var conditionId= context.GetArgument<string>("conditionId");
                   var patientMedications = await uow.PatientMedicationsRepository.SearchPatientMedicationsByCondition(id, conditionId, tenantId);
                   var mapped = mapper.Map<List<PatientMedicationsModel>>(patientMedications.Items);
                   return mapped;

               }
           );
            FieldAsync<ListGraphType<PatientMedicationsType>>(
               "patientMedicationByFollowup",
               arguments: new QueryArguments(
                   new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "patientId" },
                   new QueryArgument<StringGraphType> { Name = "followupId" }
               ),
               resolve: async context =>
               {
                   if (GetTenantFromContext(context, out var tenantId)) return null;

                   var id = context.GetArgument<string>("patientId");
                   var followupId = context.GetArgument<string>("followupId");
                   var patientMedications = await uow.PatientMedicationsRepository.SearchPatientMedicationsByFollowup(id, followupId, tenantId);
                   var mapped = mapper.Map<List<PatientMedicationsModel>>(patientMedications.Items);
                   return mapped;

               }
           );

        #endregion

        #region Tickets
FieldAsync<PageResultTicketType>(
                "tickets",
                 arguments: new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "filter" },
                    new QueryArgument<IntGraphType> { Name = "page" },
                    new QueryArgument<IntGraphType> { Name = "size" },
                    new QueryArgument<BooleanGraphType> { Name = "descending" },
                    new QueryArgument<StringGraphType> { Name = "sortBy" }
                    //new QueryArgument<StringGraphType> { Name = "patientId" }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var filter = context.GetArgument<string>("filter");
                    var page = context.GetArgument<int>("page");
                    var size = context.GetArgument<int>("size");
                    var sortBy = context.GetArgument<string>("sortBy");
                    var descending = context.GetArgument<bool>("descending");
                    //var patientId = context.GetArgument<string>("patientId");
                    
                    var result = await uow.TicketRepository.Search(filter, "Modified",true, tenantId, page, size);


                    var mapped = mapper.Map<List<TicketModel>>(result.Items);
                    var TicketsResult = new PageResultTicketModel();
                    TicketsResult.Count = result.Total;
                    TicketsResult.Items = mapped;
                    
                    return TicketsResult;
                });
            FieldAsync<PageResultTicketType>(
                "allTickets",
                 arguments: new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "filter" },
                    new QueryArgument<IntGraphType> { Name = "page" },
                    new QueryArgument<IntGraphType> { Name = "size" },
                    new QueryArgument<BooleanGraphType> { Name = "descending" },
                    new QueryArgument<StringGraphType> { Name = "sortBy" },
                    new QueryArgument<StringGraphType> { Name = "type" }
                    //new QueryArgument<StringGraphType> { Name = "patientId" }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;

                    var filter = context.GetArgument<string>("filter");
                    var page = context.GetArgument<int>("page");
                    var size = context.GetArgument<int>("size");
                    var sortBy = context.GetArgument<string>("sortBy");
                    var descending = context.GetArgument<bool>("descending");
                    var type = context.GetArgument<string>("type");

                    var result = await uow.TicketRepository.SearchAll(filter, "Modified", descending, page, size,type);

                    var mapped = mapper.Map<List<TicketModel>>(result.Items);
                    var TicketsResult = new PageResultTicketModel();
                    TicketsResult.Count = result.Total;
                    TicketsResult.Items = mapped;

                    return TicketsResult;
                });

            FieldAsync<TicketType>(
                "ticket",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>>
                    {
                        Name = "id",
                        Description = "id of the ticket"
                    }
                ),
                resolve: async context =>
                {
                    if (GetTenantFromContext(context, out var tenantId)) return null;
                    Tenant tenant;
                    var id = context.GetArgument<string>("id");
                    var ticket = await uow.TicketRepository.GetByIdAsync(id);
                
                    var mapped = mapper.Map<TicketModel>(ticket);             
                    if (tenantId == "")
                    {
                        tenant = await uow.TenantRepository.GetByIdAsync(ticket.TenantId.DocumentId);
                        mapped.tenantName = tenant.Name;
                    }
                    return mapped;
                }
            );
            FieldAsync<StringGraphType>(
              "ticketTenant",
              arguments: new QueryArguments(
                  new QueryArgument<NonNullGraphType<StringGraphType>>
                  {
                      Name = "id",
                      Description = "id of the ticket"
                  }
              ),
              resolve: async context =>
              {
                  if (GetAdminFromContext(context, out string userId, out string userName)) 
                      return null;
                  //Tenant tenant;
                  var id = context.GetArgument<string>("id");
                  var ticket = await uow.TicketRepository.GetByIdAsync(id);

                 
                  return ticket.TenantId.DocumentId;
              }
          );

            #endregion

        }

        private bool GetTenantFromContext(IResolveFieldContext<object> context, out string tenantId)
        {
            tenantId = string.Empty;
            if (IsUserNotAuthenticated(context)) return true;

            var userContext = context.UserContext as GraphQLUserContext;
            var tenantClaim =
                userContext.User.Claims.FirstOrDefault(x => x.Type == "tenantId");
            tenantId = tenantClaim == null ? "" : tenantClaim.Value;
            return false;
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
                userContext.User.Claims.FirstOrDefault(x => x.Type == "firstname").Value + " " +
                userContext.User.Claims.FirstOrDefault(x => x.Type == "lastname").Value;
            //tenantId = tenantClaim == null ? "" : tenantClaim.Value;
            userName = userNameClaim == null ? "" : userNameClaim;
            var userIdClaim =
               userContext.User.Claims.FirstOrDefault(x => x.Type == "sub");
            userId = userIdClaim == null ? "" : userIdClaim.Value;
            return false;
        }
        private bool IsUserNotAuthenticated(IResolveFieldContext<object> context)
        {
            var userContext = context.UserContext as GraphQLUserContext;
            var identity = userContext.User?.Identity;
            var authenticated = identity?.IsAuthenticated ?? false;
            if (!authenticated)
            {
                context.Errors.Add(
                    new ExecutionError($"Authorization is required to access {this.Name}."));
                return true;
            }

            return false;
        }
    }
}
