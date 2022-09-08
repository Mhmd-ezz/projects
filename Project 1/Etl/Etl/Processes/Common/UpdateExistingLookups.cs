using Rhino.Etl.Core;
using Rhino.Etl.Core.Operations;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Etl.Processes.Common
{
    public class UpdateExistingLookups : SqlBatchOperation
    {
        public UpdateExistingLookups() : base("DestinationDb")
        {
            BatchSize = 100;
        }

        public UpdateExistingLookups(ConnectionStringSettings connectionStringSettings) : base(connectionStringSettings)
        {
        }


        protected override void PrepareCommand(Row row, SqlCommand command)
        {
            command.CommandText =
                @"UPDATE [LookUps]
                  SET          
                       [GroupKey] = @GroupKey
                       ,[Value] = @Value
                       ,[Symbol] = @Symbol
                       ,[Visible] = @Visible
                       ,[Text] = @Text
                       ,[Description] = @DESCRIPTION
                       ,[CultureName] = @CultureName
                       ,[ParentValue] = @ParentValue
                       ,[ParentId] = @ParentId
                       ,[Order] = @ORDER
                       ,[ModifiedDate] = @ModifiedDate
                 WHERE  [Id] = @Id";

            AddParameter(command, "Id", row["Id"]);
            AddParameter(command, "GroupKey", row["GroupKey"]);
            AddParameter(command, "Value", row["Value"]);
            AddParameter(command, "Symbol", row["Symbol"]);
            AddParameter(command, "Visible", row["Visible"]);
            AddParameter(command, "Text", row["Text"]);
            AddParameter(command, "DESCRIPTION", row["DESCRIPTION"]);
            AddParameter(command, "CultureName", row["CultureName"]);
            AddParameter(command, "ParentValue", row["ParentValue"]);
            AddParameter(command, "ParentId", row["ParentId"]);
            AddParameter(command, "ORDER", row["ORDER"]);
            AddParameter(command, "ModifiedDate", row["ModifiedDate"]);
        }
    }

    // Much slower than the batch operation
    //public class UpdateExistingLookups : OutputCommandOperation
    //{
    //    public UpdateExistingLookups() : base("ArchiveDb")
    //    {
    //    }

    //    public UpdateExistingLookups(ConnectionStringSettings connectionStringSettings) : base(connectionStringSettings)
    //    {
    //    }

    //    protected override void PrepareCommand(IDbCommand cmd, Row row)
    //    {
    //        cmd.CommandText =
    //            @"UPDATE [dbo].[LookUps]
    //              SET          
    //                   [GroupKey] = @GroupKey
    //                   ,[Value] = @Value
    //                   ,[Symbol] = @Symbol
    //                   ,[Visible] = @Visible
    //                   ,[Text] = @Text
    //                   ,[Description] = @DESCRIPTION
    //                   ,[CultureName] = @CultureName
    //                   ,[ParentValue] = @ParentValue
    //                   ,[ParentId] = @ParentId
    //                   ,[Order] = @ORDER
    //                   ,[CreatedDate] = @CreatedDate
    //                   ,[ModifiedDate] = @ModifiedDate
    //             WHERE  [Id] = @Id";

    //        AddParameter("Id", row["Id"]);
    //        AddParameter("GroupKey", row["GroupKey"]);
    //        AddParameter("Value", row["Value"]);
    //        AddParameter("Symbol", row["Symbol"]);
    //        AddParameter("Visible", row["Visible"]);
    //        AddParameter("Text", row["Text"]);
    //        AddParameter("DESCRIPTION", row["DESCRIPTION"]);
    //        AddParameter("CultureName", row["CultureName"]);
    //        AddParameter("ParentValue", row["ParentValue"]);
    //        AddParameter("ParentId", row["ParentId"]);
    //        AddParameter("ORDER", row["ORDER"]);
    //        AddParameter("CreatedDate", row["CreatedDate"]);
    //        AddParameter("ModifiedDate", row["ModifiedDate"]);
    //    }
    //}
}
