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
    public class InsertNewLookups : SqlBatchOperation
    {
        public InsertNewLookups() : base("DestinationDb")
        {
            BatchSize = 100;
        }

        public InsertNewLookups(ConnectionStringSettings connectionStringSettings) : base(connectionStringSettings)
        {
        }

        protected override void PrepareCommand(Row row, SqlCommand command)
        {

            command.CommandText =
                @"INSERT INTO [LookUps]
           ([Id]
           ,[GroupKey]
           ,[Value]
           ,[Symbol]
           ,[Visible]
           ,[Text]
           ,[Description]
           ,[CultureName]
           ,[ParentValue]
           ,[ParentId]
           ,[Order]
           ,[CreatedDate]
           ,[ModifiedDate])
     VALUES
           (@Id
           ,@GroupKey
           ,@Value
           ,@Symbol
           ,@Visible
           ,@Text
           ,@DESCRIPTION
           ,@CultureName
           ,@ParentValue
           ,@ParentId
           ,@ORDER
           ,@CreatedDate
           ,@ModifiedDate)";

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
            AddParameter(command, "CreatedDate", row["CreatedDate"]);
            AddParameter(command, "ModifiedDate", row["ModifiedDate"]);
        }
    }
}
