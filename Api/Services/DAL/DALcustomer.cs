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
    public class DALC
    {
        ESPL espl = new ESPL();

        public string AddCustomer(Customer cus)
        {
            // Console.WriteLine(id);
            DataTable dt = new DataTable();

            dt = espl.RunProcedure(
                "usp_Insert_Customer",
                new
                {
                    cus.Email,
                    cus.Name,
                    cus.ManagerId,
                    cus.CoordinatorId,
                    cus.ExecutiveId
                }
            );

         
            string finalJsonResult = JsonConvert.SerializeObject(dt, Formatting.Indented);

            return finalJsonResult;
        }


         public string GetCustomer(int uid)
        {
            Console.WriteLine(uid);
            DataTable dt = new DataTable();

            dt = espl.RunProcedure(
                "usp_GetRelatedCustomersDetails",
                new
                {
                    @UserId=uid
                    
                }
            );

          
            string finalJsonResult = JsonConvert.SerializeObject(dt, Formatting.Indented);

            return finalJsonResult;
        }
    }
}
