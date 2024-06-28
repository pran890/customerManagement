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
    public class CustomerController : ControllerBase
    {
        [HttpPost]
        [Route("AddCustomer")]
        public string AddCustomer(Customer cus)
        {
            // Response responses = new Response();
            // List<Customer> lstCustomer = new List<Customer>();
            string result;
            DALC dal = new DALC();
            result = dal.AddCustomer(cus);

            return result;
        }

        [HttpGet]
        [Route("GetCustomer/{id}")]
        public string GetCustomer(int id)
        {
            // Response responses = new Response();
            // List<Customer> lstCustomer = new List<Customer>();
            string result;
            DALC dal = new DALC();
            result = dal.GetCustomer(id);

            return result;
        }
    }
}
