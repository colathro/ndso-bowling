using System;
using System.Collections.Generic;
using System.Linq;
using System.Globalization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using ndso_bowling.Database;
using ndso_bowling.Enums;


namespace ndso_bowling.Controllers
{
    [ApiController]
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {

        private readonly ILogger<AdminController> _logger;
        private readonly DatabaseConnection _database;

        private string r(string s)
        { // r for remove semicolons
            if (s == null) { return ""; }
            return s.Replace(';', ' ');
        }

        [HttpGet("GetScoreReport")]
        public IActionResult DownloadScoresReport()
        {
            var games = this._database.Games.Include(g => g.Athlete).ToList();

            string csv = "Id;Score;Location;Date;AthleteId;Witness;WitnessPhone;FirstName;LastName;City" + Environment.NewLine;

            foreach (Game g in games)
            {
                csv += $"{r(g.Id.ToString())};{r(g.Score.ToString())};{r(g.Location)};{DateTime.Parse(r(g.Date)).ToString("d")};{r(g.Athlete?.Id.ToString())};{r(g.Witness)};{r(g.WitnessPhone)};{r(g.Athlete?.FirstName)};{r(g.Athlete?.LastName)};{r(g.Athlete?.City)}" + Environment.NewLine;
            }

            return Ok(csv);
        }

        [HttpGet("GetAthleteReport")]
        public IActionResult DownloadAthleteReport()
        {
            var athletes = this._database.Athletes.ToList();

            string csv = "Id;FirstName;LastName;Birthday;PhoneNumber;Email;City" + Environment.NewLine;

            foreach (Athlete a in athletes)
            {
                csv += $"{r(a.Id.ToString())};{r(a.FirstName)};{r(a.LastName)};{r(a.Birthday)};{r(a.PhoneNumber.ToString())};{r(a.Email)};{r(a.City)}" + Environment.NewLine;
            }

            return Ok(csv);
        }

        public AdminController(ILogger<AdminController> logger, DatabaseConnection Database)
        {
            _logger = logger;
            _database = Database;
        }

        [HttpGet("Athlete")]
        public IActionResult GetAthlete(int id)
        {
            var athlete = this._database.Athletes.FirstOrDefault(a => a.Id == id);

            if (athlete == default)
            {
                return NotFound();
            }

            return Ok(athlete);
        }

        [HttpPut("Athlete")]
        public IActionResult UpdateAthlete([FromBody] Athlete athlete)
        {
            if (this.ModelState.IsValid)
            {
                var athleteObject = this._database.Athletes.FirstOrDefault(a => a.Id == athlete.Id);

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

        [HttpGet("AllAthletes")]
        public IActionResult AllAthletes(string lastname)
        {
            List<Athlete> athletes;
            if (lastname == null)
            {
                athletes = this._database.Athletes.ToList();
            }
            else
            {
                athletes = this._database.Athletes.Where(a => a.LastName.Contains(lastname)).ToList();
            }

            return Ok(athletes);
        }

        [HttpGet("GameFromAthlete")]
        public IActionResult GetGameFromAthlete(int id)
        {
            var game = this._database.Games.Include(g => g.Athlete).Where(g => g.Athlete.Id == id);
            return Ok(game);
        }

        [HttpGet("AllGames")]
        public IActionResult GetAllGames()
        {
            var games = this._database.Games.Include(g => g.Athlete).ToList();
            return Ok(games);
        }

        [HttpPost("DeleteAthlete")]
        public IActionResult DeleteAthlete(int id)
        {
            var athlete = this._database.Athletes.FirstOrDefault(a => a.Id == id);

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

        [HttpPost("AthleteGame")]
        public IActionResult SubmitGame([FromBody] Game game, int id)
        {
            if (this.ModelState.IsValid)
            {
                var athlete = this._database.Athletes.FirstOrDefault(a => a.Id == id);

                if (athlete == default)
                {
                    return NotFound();
                }

                var userId = this.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
                var userRole = this.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value;

                if (userId == null)
                {
                    return NotFound();
                }

                var user = this._database.Users.Include(u => u.Athlete).Include(u => u.Coach).Where(u => u.Id == userId).FirstOrDefault();

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

        [HttpGet("AllCoaches")]
        public IActionResult AllCoaches(string lastname)
        {
            List<Coach> coaches;
            if (lastname == null)
            {
                coaches = this._database.Coaches.ToList();
            }
            else
            {
                coaches = this._database.Coaches.Where(a => a.LastName.Contains(lastname)).ToList();
            }

            return Ok(coaches);
        }

        [HttpPut("Coach")]
        public IActionResult UpdateCoach([FromBody] Coach coach)
        {
            if (this.ModelState.IsValid)
            {
                var coachObject = this._database.Coaches.FirstOrDefault(a => a.Id == coach.Id);

                if (coach.Birthday != null)
                {
                    coachObject.Birthday = coach.Birthday;
                }
                if (coach.FirstName != null)
                {
                    coachObject.FirstName = coach.FirstName;
                }
                if (coach.LastName != null)
                {
                    coachObject.LastName = coach.LastName;
                }
                if (coach.City != null)
                {
                    coachObject.City = coach.City;
                }
                if (coach.PhoneNumber != null)
                {
                    coachObject.PhoneNumber = coach.PhoneNumber;
                }
                if (coach.Email != null)
                {
                    coachObject.Email = coach.Email;
                }

                this._database.SaveChanges();

                return Ok();
            }
            else
            {
                return BadRequest(this.ModelState);
            }
        }
        
        [HttpPost("DeleteCoach")]
        public IActionResult DeleteCoach(int id)
        {
            var coach = this._database.Coaches.FirstOrDefault(a => a.Id == id);

            if (coach == default)
            {
                return NotFound();
            }

            var athletes = this._database.Athletes.Where(a => a.Coach == coach).ToList();

            foreach (var athlete in athletes)
            {
                athlete.Coach = null;
            }

            var user = this._database.Users.Where(u => u.Coach == coach).First();

            user.Coach = null;

            this._database.SaveChanges();

            this._database.Coaches.Remove(coach);

            this._database.SaveChanges();

            return Ok();
        }


        [HttpGet("AllCoachAthletes")]
        public IActionResult AllCoachAthletes(int id)
        {
            List<Athlete> athletes;
            var coach = this._database.Coaches.FirstOrDefault(c => c.Id == id);
            athletes = this._database.Athletes.Where(a => a.Coach == coach).ToList();

            return Ok(athletes);
        }
    }
}
