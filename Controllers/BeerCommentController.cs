using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Piwo.Dtos;
using Piwo.Interfaces;

namespace Piwo.Controllers
{
    [Authorize (Roles = "Member")]
    [ApiController]
    [Route("api/beer/{beerId}/[controller]")]
    public class BeerCommentController : ControllerBase
    {
        private readonly IBeerCommentService _beerCommentService;

        public BeerCommentController(IBeerCommentService beerCommentService)
        {
            _beerCommentService = beerCommentService;
        }

        [HttpPost]
        public async Task<BeerCommentDto> AddComment(int beerId, string userId, string comment)
        {
            return await _beerCommentService.AddCommentAsync(userId, beerId, comment);
        }
        
        [HttpDelete("{id}")]
        public async Task<BeerCommentDto> DeleteComment(int beerId, int id)
        {
            return await _beerCommentService.DeleteCommentAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<BeerCommentDto> EditComment(int beerId, int id, string newComment)
        {
            return await _beerCommentService.EditCommentAsync(id, newComment);
        }
    }
}