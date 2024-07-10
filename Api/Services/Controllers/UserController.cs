using System.Net;
using System.Net.Http.Headers;
using System.Text;
using api_application_dal;
using CRUD.Models;
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
            string result;
            DALU dal = new DALU();
            result = dal.GetUser(id);

            return result;
        }

        [HttpPost]
        [Route("AddUser")]
        public int AddUser(User u)
        {
            int result;
            DALU dal = new DALU();
            result = dal.AddUser(u);

            return 1;
        }

        [HttpPost]
        [Route("AddUserRole")]
        public int AddUserRole(UserRole u)
        {
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
