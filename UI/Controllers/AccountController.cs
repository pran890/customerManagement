// Controllers/AccountController.cs
using System.Security.Claims;
using System.Text;
// using Db.Data;
using Management.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using api_application.Controllers;
namespace Mangement.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserRepository _userRepository;

        public AccountController(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

      
        public IActionResult Register()
        {
            return View();
        }

        
        public IActionResult Login()
        {

            return View();
        }

       

  public IActionResult AccessDenied()
        {
            return View();
        }
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
         return RedirectToAction("Login", "Account");// Redirect to the home page after logout
    }
     
    }
}
