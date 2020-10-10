using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
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
            var user = this._database.Users.Include(u => u.Coach).FirstOrDefault(x => x.Id == userId);

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

        [HttpPost("AthleteGame")]
        public IActionResult SubmitGame([FromBody] Game game, int id)
        {
            if (this.ModelState.IsValid)
            {
                var coach = this.GetAndValidateCoach();

                if (coach == null)
                {
                    return BadRequest();
                }

                var athlete = this._database.Athletes.FirstOrDefault(a => a.Id == id && a.Coach == coach);

                if (athlete == default)
                {
                    return NotFound();
                }

                if (athlete.Coach != coach)
                {
                    return BadRequest();
                }

                game.Athlete = athlete;

                this._database.Games.Add(game);
                this._database.SaveChanges();

                return Ok();
            }
            else
            {
                return BadRequest(this.ModelState);
            }
        }

        [HttpGet("Athletes")]
        public IActionResult GetAthletes()
        {
            var coach = this.GetAndValidateCoach();

            if (coach == null)
            {
                return BadRequest();
            }

            var athletes = this._database.Athletes.Where(a => a.Coach == coach);

            if (athletes == default)
            {
                return NotFound();
            }

            return Ok(athletes);
        }

        [HttpPost("DeleteAthlete")]
        public IActionResult GetAthletes(int id)
        {
            var coach = this.GetAndValidateCoach();

            if (coach == null)
            {
                return BadRequest();
            }

            var athlete = this._database.Athletes.FirstOrDefault(a => a.Coach == coach && a.Id == id);

            if (athlete == default)
            {
                return NotFound();
            }

            var games = this._database.Games.Where(g => g.Athlete == athlete);

            this._database.Games.RemoveRange(games);

            this._database.Athletes.Remove(athlete);

            this._database.SaveChanges();

            return Ok();
        }

        [HttpPut("Athlete")]
        public IActionResult UpdateAthlete([FromBody] Athlete athlete)
        {
            if (this.ModelState.IsValid)
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
            else
            {
                return BadRequest(this.ModelState);
            }
        }


        [HttpPost("RegisterAthlete")]
        public IActionResult RegisterAthlete([FromBody] Athlete athlete)
        {
            if (this.ModelState.IsValid)
            {
                var coach = this.GetAndValidateCoach();

                if (coach == null)
                {
                    return BadRequest();
                }
                athlete.Coach = coach;

                this._database.Athletes.Add(athlete);
                this._database.SaveChanges();

                return Ok();
            }
            else
            {
                return BadRequest(this.ModelState);
            }
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

            if (athlete == null)
            {
                return BadRequest("Not valid athlete.");
            }

            var games = this._database.Games.Where(g => g.Athlete == athlete).ToList();
            return Ok(games);
        }

        [HttpPut("register")]
        public IActionResult RegisterCoach([FromBody] Coach coach)
        {
            var userId = this.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            var user = this._database.Users.Include(u => u.Coach).FirstOrDefault(u => u.Id == userId);

            if (user.Coach == null)
            {
                if (ModelState.IsValid)
                {
                    user.Coach = coach;
                    this._database.SaveChanges();
                    return Ok();
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }

            if (coach.Birthday != null)
            {
                user.Coach.Birthday = coach.Birthday;
            }
            if (coach.FirstName != null)
            {
                user.Coach.FirstName = coach.FirstName;
            }
            if (coach.LastName != null)
            {
                user.Coach.LastName = coach.LastName;
            }
            if (coach.City != null)
            {
                user.Coach.City = coach.City;
            }
            if (coach.PhoneNumber != null)
            {
                user.Coach.PhoneNumber = coach.PhoneNumber;
            }
            if (coach.Email != null)
            {
                user.Coach.Email = coach.Email;
            }

            this._database.SaveChanges();

            return Ok();
        }
    }
}
