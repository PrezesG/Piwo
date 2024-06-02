using Piwo.Dtos;
namespace Piwo.Interfaces;

public interface IBeerService
{
    Task<IEnumerable<BeerDto>> GetAllBeersAsync();
    Task<BeerDto> GetBeerByIdAsync(int id);
    Task<IEnumerable<BeerDto>> GetFavouriteBeersAsync(string userId);
}