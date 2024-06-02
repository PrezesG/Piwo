using Piwo.Dtos;

namespace Piwo.Interfaces
{
    public interface IBeerCommentService
    {
        Task<BeerCommentDto> AddCommentAsync(string userId, int beerId, string comment);
        Task<BeerCommentDto> DeleteCommentAsync(int commentId);
        Task<BeerCommentDto> EditCommentAsync(int commentId, string newComment);
    }
}