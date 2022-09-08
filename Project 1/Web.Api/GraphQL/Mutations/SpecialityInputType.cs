using GraphQL.Types;

namespace Medcilia.Clinic.WebApi.GraphQL.Mutations
{
    public class SpecialityInputType : InputObjectGraphType
    {
        public SpecialityInputType()
        {
            Name = "SpecialityInput";

            Field<GeneralInputType>("general");
            Field<CardiologyInputType>("cardiology");
            //Field<StringGraphType>("obstetric");
        }
    }
}
