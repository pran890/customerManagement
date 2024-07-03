using System.Net;
using System.Net.Http.Headers;
using System.Text;
using CRUD.Models;
using api_application_dal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace api_application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrivelageController : ControllerBase
    {
        

          [HttpGet]
        [Route("GetPrivelage")]
        public string GetPrivelage()
        {
           
            // Response responses = new Response();
            // List<FollowUps> lstFollowUps = new List<FollowUps>();
            string result;
            DALP dal = new DALP();
            result = dal.GetPrivelage();

            return result;
        }

   [HttpPost]
        [Route("AddRolePrivelage")]
        public int  AddRolePrivelage(Privelage r)
        {
            // Response responses = new Response();
            // List<Role> lstRole = new List<Role>();
            Console.WriteLine("mn");
            int result;
            DALP dal = new DALP();
            result = dal. AddRolePrivelage(r);

            return 1;
        }

        
        [HttpPost]
        [Route("EditRolePrivelage")]
        public int  EditRolePrivelage(Privelage r)
        {
            // Response responses = new Response();
            // List<Role> lstRole = new List<Role>();
            Console.WriteLine("mn");
            int result;
            DALP dal = new DALP();
            result = dal. EditRolePrivelage(r);

            return 1;
        }
         
    }
}
