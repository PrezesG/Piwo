using Piwo.Dtos;
using Piwo.Interfaces;
using Piwo.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Piwo.Models;

namespace Piwo.Services
{
    public class BeerService : IBeerService
    {
        private readonly AppDbContext _context;

        public BeerService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BeerDto>> GetAllBeersAsync()
        {
            return await _context.Beers
                .Select(b => new BeerDto
                {
                    BeerId = b.BeerId,
                    Name = b.Name,
                    Producer = b.Producer,
                    Description = b.Description,
                    Image = b.Image,
                    Alcohol = b.Alcohol,
                    Price = b.Price,
                    AverageRating = b.UserBeers.Any(ub => ub.Score.HasValue) ? b.UserBeers.Average(ub => ub.Score.Value) : (double?)null,
                    RatingCount = b.UserBeers.Any(ub => ub.Score.HasValue) ? b.UserBeers.Count(ub => ub.Score.HasValue) : (int?)null
                })
                .ToListAsync();
        }

        public async Task<BeerDto> GetBeerByIdAsync(int id)
        {
            var beer = await _context.Beers.FindAsync(id);

            if (beer == null)
            {
                return null;
            }

            return new BeerDto
            {
                BeerId = beer.BeerId,
                Name = beer.Name,
                Producer = beer.Producer,
                Description = beer.Description,
                Image = beer.Image,
                Alcohol = beer.Alcohol,
                Price = beer.Price,
                AverageRating = beer.UserBeers.Any(ub => ub.Score.HasValue) ? beer.UserBeers.Average(ub => ub.Score.Value) : (double?)null,
                RatingCount = beer.UserBeers.Any(ub => ub.Score.HasValue) ? beer.UserBeers.Count(ub => ub.Score.HasValue) : (int?)null
            };
        }

        public async Task<IEnumerable<BeerDto>> GetFavouriteBeersAsync(string userId)
        {
            var favouriteBeers = await _context.UserBeers
                .Where(ub => ub.UserId == userId && ub.IsFavourite)
                .Select(ub => new BeerDto
                {
                    BeerId = ub.Beer.BeerId,
                    Name = ub.Beer.Name,
                    Producer = ub.Beer.Producer,
                    Description = ub.Beer.Description,
                    Image = ub.Beer.Image,
                    Alcohol = ub.Beer.Alcohol,
                    Price = ub.Beer.Price,
                    AverageRating = ub.Beer.UserBeers.Any(ub => ub.Score.HasValue) ? ub.Beer.UserBeers.Average(ub => ub.Score.Value) : (double?)null,
                    RatingCount = ub.Beer.UserBeers.Any(ub => ub.Score.HasValue) ? ub.Beer.UserBeers.Count(ub => ub.Score.HasValue) : (int?)null
                })
                .ToListAsync();

            return favouriteBeers;
        }

        public async Task InitializeBeerAsync()
        {
            
            var beer1 = new Beer { Name = "Tyskie", Producer = "Tyskie S.P. Zoo", Description = "Piwo Tyskie", Alcohol = 5.0, Price =9.0 };
            var beer2 = new Beer { Name = "Żubr", Producer = "Żubr S.P.Zoo", Description = "Piwo żubr",  Alcohol = 5.0, Price = 7.0 };
            var beer3 = new Beer { Name = "Lech", Producer = "Lech S.P.Zoo", Description = "Piwo Lech", Alcohol = 5.0, Price = 6.0 };

           
            _context.Beers.Add(beer1);
            _context.Beers.Add(beer2);
            _context.Beers.Add(beer3);

            
            await _context.SaveChangesAsync();
        }
    }
}