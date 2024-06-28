using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Net;
using System.Reflection;
using System.Text;
using CRUD.Data;
using CRUD.Models;
using Newtonsoft.Json;

namespace api_application_dal
{
    public class DALU
    {
        ESPL espl = new ESPL();

        public string GetUser(int UserId)
        {
            // Console.WriteLine(id);
            DataTable dt = new DataTable();
            // usp_GetRelatedUsers
            // usp_getUsers
            dt = espl.RunProcedure("usp_GetRelatedUsersa", new { UserId });

            string finalJsonResult = JsonConvert.SerializeObject(dt, Formatting.Indented);

            return finalJsonResult;
        }

        public int AddUser(User u)
        {
            Console.WriteLine("nb");
            DataTable dt = new DataTable();

            dt = espl.RunProcedure(
                "usp_Insert_User",
                new
                {
                    u.Email,
                    u.Name,
                    u.Password
                }
            );

            string finalJsonResult = JsonConvert.SerializeObject(dt, Formatting.Indented);

            return 1;
        }
          public int AddUserRole(UserRole u)
        {
            Console.WriteLine("nb");
            DataTable dt = new DataTable();

            dt = espl.RunProcedure(
                "usp_Add_User_Role",
                new
                {
                    u.Id,u.rId
                }
            );

            string finalJsonResult = JsonConvert.SerializeObject(dt, Formatting.Indented);

            return 1;
        }
        public string GetAllUser()
        {
            
            DataTable dt = new DataTable();

            dt = espl.RunProcedure(
                "usp_GetAll_User",
                new
                {
                
                }
            );

            string finalJsonResult = JsonConvert.SerializeObject(dt, Formatting.Indented);

            return finalJsonResult;
        }
    }
}
