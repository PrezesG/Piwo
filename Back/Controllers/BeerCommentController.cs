using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Piwo.Dtos;
using Piwo.Interfaces;
using Piwo.Models;

namespace Piwo.Controllers
{
    [Authorize (Roles = "Member")]
    [ApiController]
    [Route("api/beer/{beerId}/[controller]")]
    public class BeerCommentController : ControllerBase
    {
        private readonly IBeerCommentService _beerCommentService;
        private readonly UserManager<User> _userManager;

        
        public BeerCommentController(UserManager<User> userManager,IBeerCommentService beerCommentService)
        {
            _userManager = userManager;
            _beerCommentService = beerCommentService;
        }

        [HttpPost]
        public async Task<IActionResult> AddComment(int beerId, string comment)
        {
            var userId = _userManager.GetUserId(User);
            if (userId == null)
            {
                return Unauthorized("User is not logged in");
            }
            var result = await _beerCommentService.AddCommentAsync(userId, beerId, comment);
            return Ok(result);
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var userId = _userManager.GetUserId(User);
            if (userId == null)
            {
                return Unauthorized("User is not logged in");
            }
            var result = await _beerCommentService.DeleteCommentAsync(userId, id);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditComment(int id, string newComment)
        {
            var userId = _userManager.GetUserId(User);
            if (userId == null)
            {
                return Unauthorized("User is not logged in");
            }
            var result = await _beerCommentService.EditCommentAsync(userId, id, newComment);
            return Ok(result);
        }
        [HttpGet]
        public async Task<IEnumerable<BeerCommentDto>> GetComments(int beerId)
        {
            return await _beerCommentService.GetCommentsByBeerIdAsync(beerId);
        }
    }
}