using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Reflection;
using System.Threading.Tasks;
using api_application_dal;
using CRUD.Data;
using CRUD.Models;
using Microsoft.Extensions.Configuration;

namespace api_application.Controllers
{
    public class UserRepository
    {
        ESPL espl = new ESPL();

        public User GetUser(string email, string password)
        {
            DataTable dt = espl.RunProcedure(
                "usp_Get_User_details",
                new { Email = email, Password = password }
            );

            if (dt.Rows.Count > 0)
            {
                DataRow row = dt.Rows[0];
                return new User
                {
                    Id = (int)row["UserId"],
                    Name = (string)row["Username"],
                    Email = (string)row["Email"],
                    Role = (string)row["RoleName"]
                };
            }

         
            return null;
        }

        public List<string> GetPrivilegesByRoleIdAsync(int roleId)
        {
            var privileges = new List<string>();

            DataTable dt = espl.RunProcedure("usp_GetPrivilegesByRoleId", new { Id = roleId });

            foreach (DataRow row in dt.Rows)
            {
                privileges.Add(row["PrivilegeCode"].ToString());
            }

            return privileges;
        }
    }
}
