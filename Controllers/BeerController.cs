using Microsoft.AspNetCore.Mvc;
using Piwo.Interfaces;

namespace Piwo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BeerController : ControllerBase
    {
        private readonly IBeerService _beerService;

        public BeerController(IBeerService beerService)
        {
            _beerService = beerService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBeers()
        {
            var beers = await _beerService.GetAllBeersAsync();
            return Ok(beers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBeerById(int id)
        {
            var beer = await _beerService.GetBeerByIdAsync(id);
            return Ok(beer);
        }
        [HttpGet("favourites/{userId}")]
        public async Task<IActionResult> GetFavouriteBeers(string userId)
        {
            var beers = await _beerService.GetFavouriteBeersAsync(userId);
            return Ok(beers);
        }
        [HttpGet("random")]
        public async Task<IActionResult> GetRandom()
        {
            var beer = await _beerService.GetRandomBeerAsync();
            return Ok(beer);
        }
    }
}