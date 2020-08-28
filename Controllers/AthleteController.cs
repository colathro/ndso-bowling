using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using ndso_bowling.Database;
using ndso_bowling.Enums;

namespace ndso_bowling.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class AthleteController : ControllerBase
    {

        private readonly ILogger<AthleteController> _logger;
        private readonly DatabaseConnection _database;

        public AthleteController(ILogger<AthleteController> logger, DatabaseConnection Database)
        {
            _logger = logger;
            _database = Database;
        }

        [HttpGet("me")]
        public IActionResult GetMe()
        {
            var userId = this.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            var user = this._database.Users.Include(u => u.Athlete).FirstOrDefault(u => u.Id == userId);

            if (user?.Athlete?.Id == null)
            {
                user.Athlete = new Athlete
                {
                    FirstName = "",
                    LastName = "",
                    Birthday = "",
                    PhoneNumber = "",
                    Email = "",
                    City = ""
                };
            }

            this._database.SaveChanges();

            return Ok(user.Athlete);
        }

        [HttpPut("update")]
        public IActionResult UpdateAthlete([FromBody] Athlete athlete)
        {
            var userId = this.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            var user = this._database.Users.Include(u => u.Athlete).FirstOrDefault(u => u.Id == userId);

            if (athlete.Birthday != null)
            {
                user.Athlete.Birthday = athlete.Birthday;
            }
            if (athlete.FirstName != null)
            {
                user.Athlete.FirstName = athlete.FirstName;
            }
            if (athlete.LastName != null)
            {
                user.Athlete.LastName = athlete.LastName;
            }
            if (athlete.City != null)
            {
                user.Athlete.City = athlete.City;
            }
            if (athlete.PhoneNumber != null)
            {
                user.Athlete.PhoneNumber = athlete.PhoneNumber;
            }
            if (athlete.Email != null)
            {
                user.Athlete.Email = athlete.Email;
            }

            this._database.SaveChanges();

            return Ok();
        }
    }
}
