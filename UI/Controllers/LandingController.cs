
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
    [Route("api/[controller]")]
    [ApiController]
    public class LandingController : ControllerBase
    {
        private readonly UserRepository _userRepository;

        public LandingController(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // POST: Landing/Register
        // [HttpPost]
        // [Route("AddUser")]
        // public IActionResult AddUser(User user)
        // {
        //     Console.WriteLine(user.Name);
        //     if (ModelState.IsValid)
        //     {
        //         Console.WriteLine(user.Name);
        //         _userRepository.AddUser(user);
        //         ModelState.Clear();
        //         return RedirectToAction(nameof(Login));
        //     }
        //     return RedirectToAction("Account", "Login");
        // }

     
        [Route("Login")]
        [HttpPost]
        // [ValidateAntiForgeryToken]
        public int Login(UserLogin login)
        {
            if (ModelState.IsValid)
            {
                Console.WriteLine(login.Email);
                var usr = _userRepository.GetUser(login.Email, login.Password);
               
                if (usr != null)
                {
                    var privileges = _userRepository.GetPrivilegesByRoleIdAsync(usr.Id);
                  
                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, usr.Name),
                        new Claim(ClaimTypes.Email, usr.Email),
                        new Claim(ClaimTypes.Role, usr.Role), // Add the role claim
                        new Claim(ClaimTypes.NameIdentifier, usr.Id.ToString())
                        
                    };
                    claims.AddRange(
                        privileges.Select(privilege => new Claim("Privilege", privilege))
                    );
                    var identity = new ClaimsIdentity(
                        claims,
                        CookieAuthenticationDefaults.AuthenticationScheme
                    );
                    var principal = new ClaimsPrincipal(identity);


                    // Sign in the user
                    HttpContext.SignInAsync(
                        CookieAuthenticationDefaults.AuthenticationScheme,
                        principal
                    );
                    Console.WriteLine(usr.Name);
                    return usr.Id;
                }

                ModelState.AddModelError(string.Empty, "Invalid login attempt.");
            }

            return 0;
        }
       
    }
}
