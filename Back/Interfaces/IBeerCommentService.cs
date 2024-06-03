using Piwo.Dtos;

namespace Piwo.Interfaces
{
    public interface IBeerCommentService
    {
        Task<BeerCommentDto> AddCommentAsync(string userId, int beerId, string comment);
        Task<BeerCommentDto> DeleteCommentAsync(string userId, int commentId);
        Task<BeerCommentDto> EditCommentAsync(string userId, int commentId, string newComment);
        Task<IEnumerable<BeerCommentDto>> GetCommentsByBeerIdAsync(int beerId);
    }
}