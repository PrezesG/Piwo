using Microsoft.EntityFrameworkCore;
using Piwo.Dtos;
using Piwo.Interfaces;
using Piwo.Data;
using Piwo.Models;

namespace Piwo.Services
{
    public class BeerCommentService : IBeerCommentService
    {
        private readonly AppDbContext _context;

        public BeerCommentService(AppDbContext context)
        {
            _context = context;
        }

         public async Task<BeerCommentDto> AddCommentAsync(string userId, int beerId, string comment)
        {
            var user = await _context.Users.FindAsync(userId);
            var beerComment = new BeerComment
            {
                UserId = userId,
                BeerId = beerId,
                Comment = comment
            };

            _context.BeerComments.Add(beerComment);
            await _context.SaveChangesAsync();

            return new BeerCommentDto
            {
                CommentId = beerComment.CommentId,
                UserId = beerComment.UserId,
                UserName = user.Name,
                BeerId = beerComment.BeerId,
                Comment = beerComment.Comment,
                DateAdded = beerComment.DateAdded
            };
        }

        public async Task<BeerCommentDto> DeleteCommentAsync(string userId, int commentId)
        {
            var beerComment = await _context.BeerComments.FindAsync(commentId);
            var user = await _context.Users.FindAsync(beerComment.UserId);
            if (beerComment == null)
            {
                throw new Exception("Comment not found");
            }
            if (beerComment.UserId != userId)
            {
                throw new Exception("User is not authorized to delete this comment");
            }
            _context.BeerComments.Remove(beerComment);
            await _context.SaveChangesAsync();

            return new BeerCommentDto
            {
                CommentId = beerComment.CommentId,
                UserId = beerComment.UserId,
                UserName = user.Name,
                BeerId = beerComment.BeerId,
                Comment = beerComment.Comment,
                DateAdded = beerComment.DateAdded
            };
        }

        public async Task<BeerCommentDto> EditCommentAsync(string userId, int commentId, string newComment)
        {
            var beerComment = await _context.BeerComments.FindAsync(commentId);
            var user = await _context.Users.FindAsync(beerComment.UserId);
            if (beerComment == null)
            {
                throw new Exception("Comment not found");
            }
            if (beerComment.UserId != userId)
            {
                throw new Exception("User is not authorized to delete this comment");
            }

            beerComment.Comment = newComment;
            await _context.SaveChangesAsync();

            return new BeerCommentDto
            {
                CommentId = beerComment.CommentId,
                UserId = beerComment.UserId,
                UserName = user.Name,
                BeerId = beerComment.BeerId,
                Comment = beerComment.Comment,
                DateAdded = beerComment.DateAdded
            };
        }
        public async Task<IEnumerable<BeerCommentDto>> GetCommentsByBeerIdAsync(int beerId)
        {
            var beerComments = await _context.BeerComments
                .Where(bc => bc.BeerId == beerId)
                .ToListAsync();

            var beerCommentDtos = new List<BeerCommentDto>();

            foreach (var beerComment in beerComments)
            {
                var user = await _context.Users.FindAsync(beerComment.UserId);
                beerCommentDtos.Add(new BeerCommentDto
                {
                    CommentId = beerComment.CommentId,
                    UserId = beerComment.UserId,
                    UserName = user.Name,
                    BeerId = beerComment.BeerId,
                    Comment = beerComment.Comment,
                    DateAdded = beerComment.DateAdded
                });
            }

            return beerCommentDtos;
        }
    }
}