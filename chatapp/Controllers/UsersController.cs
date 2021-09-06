using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using ChatTest.App.Models;
using ChatTest.App.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChatTest.App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;



        public UsersController(IUserService userService)
        {
            _userService = userService;
        }



        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public ActionResult<IEnumerable<UserGetModel>> Get([FromHeader(Name = "Authorisation")] string userToken)
        {
            if (string.IsNullOrEmpty(userToken))
                return Unauthorized();

            UserModel user = _userService.GetUser(userToken);

            if (user == null || !_userService.IsValid(user))
                return Forbid();
                
            var users = _userService.GetAll();

            return Ok(users);
        }
    }
}
