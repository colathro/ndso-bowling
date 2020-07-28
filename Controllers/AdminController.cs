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

        [HttpPut("ApproveAthlete")]
        public IActionResult ApproveAthlete(int id)
        {
            var athlete = this._database.Athletes.Where(a => a.Id == id).FirstOrDefault();
            athlete.Approved = true;
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
