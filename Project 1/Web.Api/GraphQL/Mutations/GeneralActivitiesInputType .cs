using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class GeneralActivitiesInputType : InputObjectGraphType
    {
        public GeneralActivitiesInputType()
        {
            Name = "GeneralActivitiesInput";

            Field<ListGraphType<GeneralFollowupInputType>>("followups");
            Field<ListGraphType<GeneralOperationInputType>>("operations");
        }
    }
}
