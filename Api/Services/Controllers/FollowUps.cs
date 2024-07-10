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
    public class FollowUpsController : ControllerBase
    {
        [HttpPost]
        [Route("AddFollowUps")]
        public string AddFollowUps(FollowUps cus)
        {
            // Console.WriteLine(cus.cId);
            
            string result;
            DALF dal = new DALF();
            result = dal.AddFollowups(cus);

            return result;
        }

        [HttpGet]
        [Route("GetFollowUps/{id}")]
        public string GetFollowUps(int id)
        {
         
            string result;
            DALF dal = new DALF();
            result = dal.GetFollowups(id);

            return result;
        }

         [HttpPost]
        [Route("EditFollowUps")]
        public string EditFollowUps(FollowUps cus)
        {
           
            string result;
            DALF dal = new DALF();
            result = dal.EditFollowups(cus);

            return result;
        }
    }
}
