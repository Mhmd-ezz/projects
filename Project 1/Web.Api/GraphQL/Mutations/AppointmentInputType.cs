using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class AppointmentInputType : InputObjectGraphType
    {
        public AppointmentInputType()
        {
            Name = "AppointmentInput";

            Field<StringGraphType>("id");
            Field<StringGraphType>("subject");
            Field<DateTimeGraphType>("startTime");
            Field<DateTimeGraphType>("endTime");
            Field<StringGraphType>("reason");
            Field<StringGraphType>("color");
            Field<StringGraphType>("note");
            Field<BooleanGraphType>("isBlock");
            Field<BooleanGraphType>("isReadonly");
            Field<BooleanGraphType>("isAllDay");
            Field<StringGraphType>("type");
            Field<StringGraphType>("conditionId");
            Field<StringGraphType>("speciality");
            Field<StringGraphType>("recurrenceRule");
            Field<StringGraphType>("recurrenceId");
            Field<StringGraphType>("recurrenceException");

            Field<StringGraphType>("status");
            Field<ContactInputType>("contact");
            Field<LocationViewInputType>("location");

        }
    }
}
