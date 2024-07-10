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
    public class DALR
    {
        ESPL espl = new ESPL();

          public int AddUserRole(UserRole u)
        {
            
              IterateOverProperties(u);
            DataTable dt = new DataTable();

            dt = espl.RunProcedure(
                "usp_Add_User_Role",
                new
                {
                    u.Id,u.rId,u.cId,u.mId
                }
            );

            string finalJsonResult = JsonConvert.SerializeObject(dt, Formatting.Indented);

            return 1;
        }
         public static void IterateOverProperties(object obj)
        {
            Type type = obj.GetType();
            PropertyInfo[] properties = type.GetProperties();

            foreach (PropertyInfo property in properties)
            {
                string name = property.Name;
                object value = property.GetValue(obj, null);
                Console.WriteLine($"Property: {name}, Value: {value}");
            }
        }

         public string EditUserRoles(UserRole u)
        {
         
            DataTable dt = new DataTable();
           
          
      
            // IterateOverProperties(f);
            dt = espl.RunProcedure(
                "usp_Edit_user_role",
                new
                {
                     u.Id,u.rId
                }
            );

         
            string finalJsonResult = JsonConvert.SerializeObject(dt, Formatting.Indented);

            return finalJsonResult;
        }


       
    }
}
