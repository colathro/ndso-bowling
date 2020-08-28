using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using ndso_bowling.Database;
using System.Security.Claims;


namespace ndso_bowling.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoachController : ControllerBase
    {

        private readonly ILogger<CoachController> _logger;
        private readonly DatabaseConnection _database;

        public CoachController(ILogger<CoachController> logger, DatabaseConnection Database)
        {
            _logger = logger;
            _database = Database;
        }

        private Coach GetAndValidateCoach()
        {
            var userId = this.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            var user = this._database.Users.FirstOrDefault(x => x.Id == userId);

            if (user == default)
            {
                return null;
            }

            if (user.Coach == null)
            {
                return null;
            }

            return user.Coach;
        }

        [HttpGet("Athlete")]
        public IActionResult GetAthlete(int id)
        {
            var coach = this.GetAndValidateCoach();

            if (coach == null)
            {
                return BadRequest();
            }

            var athlete = this._database.Athletes.FirstOrDefault(a => a.Id == id);

            if (athlete == default)
            {
                return NotFound();
            }

            if (athlete.Coach != coach)
            {
                return BadRequest();
            }

            return Ok(athlete);
        }

        [HttpPut("Athlete")]
        public IActionResult UpdateAthlete([FromBody] Athlete athlete)
        {
            var coach = this.GetAndValidateCoach();

            if (coach == null)
            {
                return BadRequest();
            }

            var athleteObject = this._database.Athletes.FirstOrDefault(a => a.Id == athlete.Id);
            if (athleteObject.Coach != coach)
            {
                return BadRequest();
            }

            if (athlete.Birthday != null)
            {
                athleteObject.Birthday = athlete.Birthday;
            }
            if (athlete.FirstName != null)
            {
                athleteObject.FirstName = athlete.FirstName;
            }
            if (athlete.LastName != null)
            {
                athleteObject.LastName = athlete.LastName;
            }
            if (athlete.City != null)
            {
                athleteObject.City = athlete.City;
            }
            if (athlete.PhoneNumber != null)
            {
                athleteObject.PhoneNumber = athlete.PhoneNumber;
            }
            if (athlete.Email != null)
            {
                athleteObject.Email = athlete.Email;
            }

            this._database.SaveChanges();

            return Ok();
        }


        [HttpPost("RegisterAthlete")]
        public IActionResult RegisterAthlete([FromBody] Athlete athlete)
        {
            var coach = this.GetAndValidateCoach();

            if (coach == null)
            {
                return BadRequest();
            }

            this._database.Athletes.Add(athlete);
            this._database.SaveChanges();

            return Ok();
        }

        [HttpPost("MakeCoach")]
        public IActionResult MakeCoach([FromBody] User user)
        {
            var userObject = this._database.Users.Where(u => u.Id == user.Id).FirstOrDefault();
            userObject.Coach = new Coach();
            this._database.SaveChanges();

            return Ok();
        }

        [HttpGet("AthleteGames")]
        public IActionResult GetAllGames(int id)
        {
            var coach = this.GetAndValidateCoach();

            if (coach == null)
            {
                return BadRequest();
            }

            var athlete = this._database.Athletes.FirstOrDefault(a => a.Id == id && a.Coach == coach);

            var games = this._database.Games.Where(g => g.Athlete == athlete).ToList();
            return Ok(games);
        }
    }
}
