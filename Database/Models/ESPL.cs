using System.Data;
using Microsoft.Data.SqlClient;
using System.Configuration;
using Microsoft.Extensions.Configuration;
using System.Data.Common;
using System.Reflection;

namespace CRUD.Data
{
    public class ESPL
    {

       Connection c=new Connection();
           



        public DataTable RunProcedure(string name, dynamic parameters)
        {
           DataTable dt = new DataTable();
            using ( var connection = c.GetConnection("customermanagement"))
            using (var command = CreateCommand(connection, name, parameters))
            {
               
                dt.Load(command.ExecuteReader());
                return dt;
            }
        }
       

      

        private DbCommand CreateCommand(DbConnection conn, string commandText,
            object parameters)
        {
            var cmd = conn.CreateCommand();
            cmd.CommandText = commandText;
            cmd.CommandType = CommandType.StoredProcedure;
            conn.Open();
            foreach (PropertyInfo parameter in parameters.GetType().GetProperties())
            {
                var commandParameter = cmd.CreateParameter();
                commandParameter.ParameterName = "@" + parameter.Name;
                commandParameter.Value = parameter.GetValue(parameters);
                cmd.Parameters.Add(commandParameter);
            }
            return cmd;
        }
    }
}
