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

        [HttpGet("mygames")]
        public IActionResult GetMyGames()
        {
            var userId = this.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            var athlete = this._database.Users.Include(u => u.Athlete).FirstOrDefault(u => u.Id == userId).Athlete;

            var games = this._database.Games.Where(a => a.Athlete == athlete).OrderBy(g => g.Date).ToList();
            return Ok(games);
        }

        [HttpPost("submitmygame")]
        public IActionResult SubmitGame([FromBody] Game game)
        {
            if (this.ModelState.IsValid)
            {
                var userId = this.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

                var athlete = this._database.Users.Include(u => u.Athlete).FirstOrDefault(u => u.Id == userId).Athlete;

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

        [HttpDelete("deletemygame")]
        public IActionResult DeleteGame([FromQuery] int gameId)
        {
            if (this.ModelState.IsValid)
            {
                var userId = this.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

                var athlete = this._database.Users.Include(u => u.Athlete).FirstOrDefault(u => u.Id == userId).Athlete;

                var game = this._database.Games.FirstOrDefault(g => g.Athlete == athlete && g.Id == gameId);

                if (game == default){
                    return NotFound("Could not find game.");
                }

                this._database.Games.Remove(game);
                this._database.SaveChanges();

                return Ok();
            }
            else
            {
                return BadRequest(this.ModelState);
            }

        }
    }
}
