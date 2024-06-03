using Piwo.Dtos;
using Microsoft.AspNetCore.Identity;

namespace Piwo.Interfaces
{
    public interface IAdminService
    {
        Task<BeerDto> CreateBeerAsync(BeerDto beerDto);
        Task<IEnumerable<BeerDto>> GetAllBeersAsync();
        Task<BeerDto> GetBeerByIdAsync(int id);
        Task UpdateBeerAsync(int id, BeerDto beerDto);
        Task DeleteBeerAsync(int id);
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<IdentityResult> DeleteUserAsync(string userId);
        Task InitializeAdminAsync();
    }
}