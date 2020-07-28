using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Security.Claims;
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

        [HttpGet]
        public IActionResult GetAthlete(string first, string last, string pin)
        {
            first = first.ToLower();
            last = last.ToLower();

            var athlete = this._database.Athletes.Where(a => a.FirstName == first && a.LastName == last && a.Pin == pin).FirstOrDefault();
            if (athlete == default)
            {
                return NotFound();
            }

            return Ok(athlete);
        }

        [HttpGet("me")]
        public IActionResult GetMe()
        {
            var userId = this.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            var athlete = this._database.Users.FirstOrDefault(u => u.Id == userId).Athlete;

            return Ok(athlete);
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] Athlete athlete)
        {
            athlete.Id = null;
            this._database.Athletes.Add(athlete);

            return Ok();
        }

        [HttpPost("registerme")]
        public IActionResult RegisterMe([FromBody] Athlete athlete)
        {
            athlete.Id = null;
            var userId = this.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            var user = this._database.Users.FirstOrDefault(u => u.Id == userId);

            this._database.Athletes.Add(athlete);

            user.Athlete = athlete;
            this._database.SaveChanges();
            return Ok();
        }
    }
}
