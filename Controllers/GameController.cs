using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using ndso_bowling.Database;
using ndso_bowling.Enums;

namespace ndso_bowling.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class GameController : ControllerBase
    {

        private readonly ILogger<GameController> _logger;
        private readonly DatabaseConnection _database;

        public GameController(ILogger<GameController> logger, DatabaseConnection Database)
        {
            _logger = logger;
            _database = Database;
        }

        [HttpGet("games")]
        public IActionResult GetGames(string first, string last, string pin)
        {
            first = first.ToLower();
            last = last.ToLower();

            var athlete = this._database.Athletes.Where(a => a.FirstName == first && a.LastName == last && a.Pin == pin).FirstOrDefault();
            if (athlete == default)
            {
                return NotFound();
            }

            var games = this._database.Games.Where(g => g.Athlete == athlete).ToList();

            return Ok(games);
        }

        [HttpGet("mygames")]
        public IActionResult GetMyGames()
        {
            var userId = this.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            var athlete = this._database.Users.Include(u => u.Athlete).FirstOrDefault(u => u.Id == userId).Athlete;

            var games = this._database.Games.Where(a => a.Athlete == athlete).OrderByDescending(g => g.Date).ToList();
            return Ok(games);
        }

        [HttpPost("submitmygame")]
        public IActionResult SubmitGame([FromBody] Game game)
        {
            var userId = this.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            var athlete = this._database.Users.Include(u => u.Athlete).FirstOrDefault(u => u.Id == userId).Athlete;

            game.Review = ReviewStatus.NotReviewed;
            game.Athlete = athlete;
            this._database.Games.Add(game);

            this._database.SaveChanges();
            return Ok();
        }
    }
}
