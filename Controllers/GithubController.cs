using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using ndso_bowling.Database;
using Octokit;
using ndso_bowling.Enums;

namespace ndso_bowling.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class GithubController : ControllerBase
    {

        private readonly ILogger<GithubController> _logger;

        private readonly IGitHubClient _github;

        public GithubController(ILogger<GithubController> logger, IGitHubClient github)
        {
            _github = github;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> ReportIssue([FromQuery] string type, [FromQuery] string body)
        {
            var issue = new NewIssue(type){
                Body = body
            };

            var createdIssue = await this._github.Issue.Create("colathro", "ndso-bowling", issue);

            return Ok(createdIssue);
        }
    }
}
