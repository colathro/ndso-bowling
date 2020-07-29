using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
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

        public AdminController(ILogger<AdminController> logger, DatabaseConnection Database)
        {
            _logger = logger;
            _database = Database;
        }

        [HttpGet("AllAthletes")]
        public IActionResult GetAllAthletes()
        {
            var athletes = this._database.Athletes.ToList();
            return Ok(athletes);
        }

        [HttpGet("AllUnapprovedAthletes")]
        public IActionResult GetAllUnapprovedAthletes()
        {
            var athletes = this._database.Athletes.Where(a => a.Approved == ApprovalStatus.Pending).ToList();
            return Ok(athletes);
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
            if (athlete.MiddleName != null)
            {
                athleteObject.MiddleName = athlete.MiddleName;
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
            this._database.Athletes.Add(athlete);
            this._database.SaveChanges();

            return Ok();
        }

        [HttpPost("ApproveAthlete")]
        public IActionResult ApproveAthlete(int id)
        {
            var athlete = this._database.Athletes.Where(a => a.Id == id).FirstOrDefault();
            athlete.Approved = ApprovalStatus.Approved;
            this._database.SaveChanges();
            return Ok(athlete);
        }

        [HttpPost("DenyAthlete")]
        public IActionResult DenyAthlete(int id)
        {
            var athlete = this._database.Athletes.Where(a => a.Id == id).FirstOrDefault();
            athlete.Approved = ApprovalStatus.Denied;
            this._database.SaveChanges();
            return Ok(athlete);
        }

        [HttpGet("GameFromAthlete")]
        public IActionResult GetGameFromAthlete(int id)
        {
            var game = this._database.Games.Where(g => g.Athlete.Id == id);
            return Ok(game);
        }

        [HttpGet("AllGames")]
        public IActionResult GetAllGames()
        {
            var games = this._database.Games.ToList();
            return Ok(games);
        }

        [HttpGet("UnreviewedGames")]
        public IActionResult GetUnreviewedGames()
        {
            var games = this._database.Games.Where(g => g.Review == ReviewStatus.NotReviewed).ToList();
            return Ok(games);
        }

        [HttpPut("ApproveGame")]
        public IActionResult ApproveGame(int id)
        {
            var game = this._database.Games.Where(g => g.Id == id).FirstOrDefault();
            game.Review = ReviewStatus.Reviewed;
            this._database.SaveChanges();
            return Ok(game);
        }

        [HttpPut("DenyGame")]
        public IActionResult DenyGame(int id)
        {
            var game = this._database.Games.Where(g => g.Id == id).FirstOrDefault();
            game.Review = ReviewStatus.Denied;
            this._database.SaveChanges();
            return Ok(game);
        }
    }
}
