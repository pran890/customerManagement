using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Linq;
using System.Security.Claims;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
public class AuthorizePrivilegeAttribute : AuthorizeAttribute, IAuthorizationFilter
{
    private readonly string[] _privileges;

    public AuthorizePrivilegeAttribute(params string[] privileges)
    {
        _privileges = privileges;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var user = context.HttpContext.User;
        if (!user.Identity.IsAuthenticated)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        var hasPrivilege = user.Claims
            .Any(c => c.Type == "Privilege" && _privileges.Contains(c.Value));

        if (!hasPrivilege)
        {
            context.Result = new ForbidResult();
        }
    }
}
