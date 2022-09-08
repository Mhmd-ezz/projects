using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class CardiologyActivitiesInputType : InputObjectGraphType
    {
        public CardiologyActivitiesInputType()
        {
            Name = "CardiologyActivitiesInput";

            Field<ListGraphType<CardiologyFollowupInputType>>("followups");
            Field<ListGraphType<CardiologyOperationInputType>>("operations");
        }
    }
}
