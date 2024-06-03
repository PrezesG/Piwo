using Microsoft.AspNetCore.Mvc;
using Piwo.Interfaces;
using Piwo.Models;
using Microsoft.AspNetCore.Identity;


namespace Piwo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BeerController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IBeerService _beerService;

        public BeerController(UserManager<User> userManager,IBeerService beerService)
        {

            _userManager = userManager;
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
        [HttpGet("favourites")]
        public async Task<IActionResult> GetFavouriteBeers()
        {
            var userId = _userManager.GetUserId(User);
            if (userId == null)
            {
                return Unauthorized("User is not logged in");
            }
            var beers = await _beerService.GetFavouriteBeersAsync(userId);
            return Ok(beers);
        }
    }
}