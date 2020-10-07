using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using ndso_bowling.Database;
using ndso_bowling.Enums;

namespace ndso_bowling.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {

        private readonly ILogger<UserController> _logger;
        private readonly DatabaseConnection _database;

        public UserController(ILogger<UserController> logger, DatabaseConnection Database)
        {
            _logger = logger;
            _database = Database;
        }

        [HttpGet("me")]
        public IActionResult GetMe()
        {
            var userId = this.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            var userRole = this.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value;

            if (userId == null)
            {
                return NotFound();
            }

            var user = this._database.Users.Include(u => u.Athlete).Include(u => u.Coach).Where(u => u.Id == userId).FirstOrDefault();

            if (user == null)
            {
                user = new User { Id = userId, IsAdmin = false };
                this._database.Users.Add(user);
            }

            if (userRole == "Admin")
            {
                user.IsAdmin = true;
            }

            this._database.SaveChanges();

            return Ok(user);
        }
    }
}
