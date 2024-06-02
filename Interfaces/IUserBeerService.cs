using Piwo.Dtos;
using System.Threading.Tasks;

namespace Piwo.Interfaces
{
    public interface IUserBeerService
    {
        Task<UserBeerDto> AddToFavouritesAsync(string userId, int beerId);
        Task<UserBeerDto> RateBeerAsync(string userId, int beerId, int score);
    }
}