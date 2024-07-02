using System.Security.Claims;
using System.Text;
using Db.Data;
using Management.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mangement.Controllers
{
    public class DashBoardController : Controller
    {
        private readonly UserRepository _userRepository;

        public DashBoardController(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [Authorize(Policy = "RequireEmail")]
        public IActionResult AddC()
        {
            if (User.IsInRole("Admin") || User.IsInRole("Manager"))
            {
                return RedirectToAction("AddUsers", "DashBoard"); 
            }
            else
            {
                return RedirectToAction("AddCustomers", "DashBoard"); 
            }
        }

      
        //   [Authorize(Policy = "AdminOnly")]
        [Authorize(Policy = "RequireEmail")]
        public IActionResult AddUsers()
        {
            return View("AdminAddCustomers"); 
        }
        [Authorize(Policy = "RequireEmail")]
        public IActionResult AddCustomers()
        {
            return View("AddCustomers"); 

        }

        [Authorize(Policy = "RequireEmail")]
        public IActionResult ViewCustomers()
        {
            return View();
        }
         [Authorize(Policy = "RequireEmail")]
        public IActionResult Tree()
        {
            return View();
        }

        // [Authorize(Policy = "AdminOnly")]
        [AuthorizePrivilege("Settings")]
        public IActionResult Admin()
        {
            return View();
        }
    }
}
