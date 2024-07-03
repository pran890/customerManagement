using System.Security.Claims;
using System.Text;
// using Db.Data;
using api_application_dal;
using Management.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using api_application.Controllers;
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

        [Route("Login")]
        [HttpPost]
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
                        new Claim(ClaimTypes.Role, usr.Role),
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

                    HttpContext.SignInAsync(
                        CookieAuthenticationDefaults.AuthenticationScheme,
                        principal
                    );
                    // Console.WriteLine(usr.Name);
                    return usr.Id;
                }

                ModelState.AddModelError(string.Empty, "Invalid login attempt.");
            }

            return 0;
        }
    }
}
