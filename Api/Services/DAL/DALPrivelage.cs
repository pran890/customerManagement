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
    public class DALP
    {
        ESPL espl = new ESPL();

        public int AddRolePrivelage(Privelage p)
        {
            
            DataTable dt = new DataTable();

            dt = espl.RunProcedure("usp_Add_Role_Privelage", new { p.pId, p.rId });

            string finalJsonResult = JsonConvert.SerializeObject(dt, Formatting.Indented);

            return 1;
        }

        public string EditUserRoles(UserRole u)
        {
            DataTable dt = new DataTable();

            // IterateOverProperties(f);
            dt = espl.RunProcedure("usp_Edit_user_role", new { u.Id, u.rId });

            string finalJsonResult = JsonConvert.SerializeObject(dt, Formatting.Indented);

            return finalJsonResult;
        }

        public string GetPrivelage()
        {
            DataTable dt = new DataTable();

            // IterateOverProperties(f);
            dt = espl.RunProcedure("usp_get_Privelage", new { });

            string finalJsonResult = JsonConvert.SerializeObject(dt, Formatting.Indented);

            return finalJsonResult;
        }

        public int EditRolePrivelage(Privelage p)
        {
           
            IterateOverProperties(p);
            DataTable dt = new DataTable();

            dt = espl.RunProcedure(
                "usp_Edit_Role_Privelage",
                new
                {
                    p.pId,
                    p.ar,
                    p.mr,
                    p.cr,
                    p.er
                }
            );

            string finalJsonResult = JsonConvert.SerializeObject(dt, Formatting.Indented);

            return 1;
        }


         public int AddNewPrivelage(Privelage p)
        {
           
            IterateOverProperties(p);
            DataTable dt = new DataTable();

            dt = espl.RunProcedure(
                "usp_Add_Privelage",
                new
                {
                    p.pCode,
                    p.pDesc
                   
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

    }
}
