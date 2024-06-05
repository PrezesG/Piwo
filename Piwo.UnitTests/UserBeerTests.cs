using NUnit.Framework;
using Piwo.Services;
using Piwo.Data;
using Microsoft.EntityFrameworkCore;
using Piwo.Models;


namespace Piwo.UnitTests
{
    [TestFixture]
    public class UserBeerTests
    {
        private AppDbContext _context;
        private UserBeerService _service;

        [SetUp]
        public void SetUp()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            _context = new AppDbContext(options);

            _service = new UserBeerService(_context);
        }
        //Ten test sprawdza, czy metoda AddToFavouritesAsync dodaje piwo do ulubionych, gdy piwo nie jest jeszcze w ulubionych.
        //Najpierw dodaje piwo, które nie jest ulubione, a następnie sprawdza, czy metoda zmienia jego status na ulubione.
        [Test]
        public async Task AddToFavouritesAsync_BeerNotInFavourites_AddsToFavourites()
        {
            // Arrange
            var userBeer = new UserBeer { UserId = "1", BeerId = 1, IsFavourite = false };
            _context.UserBeers.Add(userBeer);
            await _context.SaveChangesAsync();

            // Act
            var result = await _service.AddToFavouritesAsync("1", 1);

            // Assert
            Assert.That(result.IsFavourite, Is.True);
        }
        //Ten test sprawdza, czy metoda AddToFavouritesAsync rzuca wyjątek, gdy piwo jest już w ulubionych.
        //Najpierw dodaje ulubione piwo, a następnie próbuje dodać je do ulubionych ponownie.
        [Test]
        public async Task AddToFavouritesAsync_BeerAlreadyInFavourites_ThrowsException()
        {
            // Arrange
            var userBeer = new UserBeer { UserId = "1", BeerId = 1, IsFavourite = true };
            _context.UserBeers.Add(userBeer);
            await _context.SaveChangesAsync();

            // Act
            async Task TestAction() => await _service.AddToFavouritesAsync("1", 1);

            // Assert
            Exception ex = Assert.ThrowsAsync<Exception>(TestAction);
            Assert.That(ex.Message, Is.EqualTo("Beer is already in favourites"));
        }

        //Ten test sprawdza, czy metoda RateBeerAsync ocenia piwo, które nie zostało jeszcze ocenione.
        //Najpierw dodaje piwo bez oceny, a następnie sprawdza, czy metoda dodaje ocenę.
        [Test]
        public async Task RateBeerAsync_BeerNotRated_RatesBeer()
        {
            // Arrange
            var userBeer = new UserBeer { UserId = "1", BeerId = 1 };
            _context.UserBeers.Add(userBeer);
            await _context.SaveChangesAsync();

            // Act
            var result = await _service.RateBeerAsync("1", 1, 5);

            // Assert
            Assert.That(result.Score, Is.EqualTo(5));
        }
        //Ten test sprawdza, czy metoda RateBeerAsync aktualizuje ocenę piwa, które już zostało ocenione.
        //Najpierw dodaje piwo z oceną, a następnie sprawdza, czy metoda aktualizuje tę ocenę.
        [Test]
        public async Task RateBeerAsync_BeerAlreadyRated_UpdatesRating()
        {
            // Arrange
            var userBeer = new UserBeer { UserId = "1", BeerId = 1, Score = 3 };
            _context.UserBeers.Add(userBeer);
            await _context.SaveChangesAsync();

            // Act
            var result = await _service.RateBeerAsync("1", 1, 5);

            // Assert
            Assert.That(result.Score, Is.EqualTo(5));
        }

    }
}


