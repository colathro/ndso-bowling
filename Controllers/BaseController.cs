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
    [Route("[controller]")]
    public class BaseController : ControllerBase
    {

        private readonly ILogger<BaseController> _logger;
        private readonly DatabaseConnection _database;

        public BaseController(ILogger<BaseController> logger, DatabaseConnection Database)
        {
            _logger = logger;
            _database = Database;
        }

        [HttpGet]
        public IActionResult Get()
        {
            this._database.Games.Where(e => e.Review == ReviewStatus.NotReviewed).ToList();
            return Ok("Working!");
        }
    }
}
