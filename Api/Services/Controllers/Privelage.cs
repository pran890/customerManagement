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
    public class PrivelageController : ControllerBase
    {
        [HttpGet]
        [Route("GetPrivelage")]
        public string GetPrivelage()
        {
            string result;
            DALP dal = new DALP();
            result = dal.GetPrivelage();

            return result;
        }

        [HttpPost]
        [Route("AddRolePrivelage")]
        public int AddRolePrivelage(Privelage r)
        {
            int result;
            DALP dal = new DALP();
            result = dal.AddRolePrivelage(r);

            return 1;
        }

        [HttpPost]
        [Route("EditRolePrivelage")]
        public int EditRolePrivelage(Privelage r)
        {
            int result;
            DALP dal = new DALP();
            result = dal.EditRolePrivelage(r);

            return 1;
        }

         [HttpPost]
        [Route("AddNewPrivelage")]
        public int AddNewPrivelage(Privelage r)
        { 
            Console.WriteLine("mnk");
            int result;
            DALP dal = new DALP();
            result = dal.AddNewPrivelage(r);

            return 1;
        }
    }
}
