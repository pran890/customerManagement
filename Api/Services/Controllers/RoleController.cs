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
    public class RoleController : ControllerBase
    {
        // [HttpGet]
        // [Route("GetRole/{id}")]
        // public string GetRole(int id)
        // {
        //     // Response responses = new Response();
        //     // List<Role> lstRole = new List<Role>();
        //     string result;
        //     DALU dal = new DALU();
        //     result = dal.GetRole(id);

        //     return result;
        // }


         [HttpPost]
        [Route("AddUserRole")]
        public int AddUserRole(UserRole r)
        {
            // Response responses = new Response();
            // List<Role> lstRole = new List<Role>();
            Console.WriteLine("mn");
            int result;
            DALR dal = new DALR();
            result = dal.AddUserRole(r);

            return 1;
        }

          [HttpPost]
        [Route("EditUserRoles")]
        public string EditUserRoles(UserRole r)
        {
           
            // Response responses = new Response();
            // List<FollowUps> lstFollowUps = new List<FollowUps>();
            string result;
            DALR dal = new DALR();
            result = dal.EditUserRoles(r);

            return result;
        }
         
    }
}
