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
    public class DALF
    {
        ESPL espl = new ESPL();

        public string AddFollowups(FollowUps f)
        {
            Console.WriteLine(f.cId);
            DataTable dt = new DataTable();
            DateTime followUpDate = DateTime.Parse(f.FollowUpDate);
            TimeSpan followUpTime = TimeSpan.Parse(f.time);
          
            // IterateOverProperties(f);
            dt = espl.RunProcedure(
                "usp_Insert_Followups",
                new
                {
                    @cusid = f.cId,
                    @note = f.Note,
                    @createdbyid = f.uId,
                    @FollowUpDate = f.FollowUpDate,
                    @FollowUpTime = f.time,
                }
            );

            // GetAllMessages();
            string finalJsonResult = JsonConvert.SerializeObject(dt, Formatting.Indented);

            return finalJsonResult;
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

        public string GetFollowups(int uid)
        {
            // Console.WriteLine(uid);
            DataTable dt = new DataTable();

            dt = espl.RunProcedure("usp_GetRelatedFollowupDetails", new { @UserId = uid });

            // GetAllMessages();
            string finalJsonResult = JsonConvert.SerializeObject(dt, Formatting.Indented);

            return finalJsonResult;
        }
         public string EditFollowups(FollowUps f)
        {
            Console.WriteLine(f.cId);
            DataTable dt = new DataTable();
            DateTime followUpDate = DateTime.Parse(f.FollowUpDate);
            TimeSpan followUpTime = TimeSpan.Parse(f.time);
          
      
            // IterateOverProperties(f);
            dt = espl.RunProcedure(
                "usp_Edit_Followups",
                new
                {
                    @fid = f.fId,
                    @note = f.Note,
                    @createdbyid = f.uId,
                    @FollowUpDate = f.FollowUpDate,
                    @FollowUpTime = f.time,
                    @status=f.status
                }
            );

         
            string finalJsonResult = JsonConvert.SerializeObject(dt, Formatting.Indented);

            return finalJsonResult;
        }
    }
}
