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
        
        [HttpGet]
        public IActionResult GetAllAthletes()
        {
            var athletes = this._database.Athletes.ToList();
            return Ok(athletes);
        }

        [HttpPut]
        public IActionResult ApproveAthlete(string first, string last)
        {
            var athlete = this._database.Athletes.Where(a => a.FirstName.Equals(first) && a.LastName.Equals(last)).FirstOrDefault();
            athlete.Approved = true;
            this._database.SaveChanges();
            return Ok(athlete);
        }

        [HttpGet]
        public IActionResult GetGameFromAthlete(string first, string last)
        {
            var game = this._database.Games.Where(e => e.Athlete.FirstName.Equals(first) && e.Athlete.LastName.Equals(last));
            return Ok(game);
        }

        [HttpGet]
        public IActionResult GetAllGames()
        {
            var games = this._database.Games.ToList();
            return Ok(games);
        }

        [HttpGet]
        public IActionResult GetUnreviewedGames()
        {
            var games = this._database.Games.Where(e => e.Review == ReviewStatus.NotReviewed).ToList();
            return Ok(games);
        }        
    }
}
