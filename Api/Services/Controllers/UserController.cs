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
    public class UserController : ControllerBase
    {
        [HttpGet]
        [Route("GetUser/{id}")]
        public string GetUser(int id)
        {
            // Response responses = new Response();
            // List<User> lstUser = new List<User>();
            string result;
            DALU dal = new DALU();
            result = dal.GetUser(id);

            return result;
        }


         [HttpPost]
        [Route("AddUser")]
        public int AddUser(User u)
        {
            // Response responses = new Response();
            // List<User> lstUser = new List<User>();
            Console.WriteLine("mn");
            int result;
            DALU dal = new DALU();
            result = dal.AddUser(u);

            return 1;
        }
          [HttpPost]
        [Route("AddUserRole")]
        public int AddUserRole(UserRole u)
        {
            // Response responses = new Response();
            // List<User> lstUser = new List<User>();
            Console.WriteLine("mn");
            int result;
            DALU dal = new DALU();
            result = dal.AddUserRole(u);

            return 1;
        }
        [HttpGet]
        [Route("GetAllUser")]
        public string GetAllUser()
        {
         
            string result;
            DALU dal = new DALU();
            result = dal.GetAllUser();

            return result;
        }
    }
}
