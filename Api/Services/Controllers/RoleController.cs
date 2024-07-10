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
        

         [HttpPost]
        [Route("AddUserRole")]
        public int AddUserRole(UserRole r)
        {
            
            int result;
            DALR dal = new DALR();
            result = dal.AddUserRole(r);

            return 1;
        }

          [HttpPost]
        [Route("EditUserRoles")]
        public string EditUserRoles(UserRole r)
        {
           
          
            string result;
            DALR dal = new DALR();
            result = dal.EditUserRoles(r);

            return result;
        }
         
    }
}
