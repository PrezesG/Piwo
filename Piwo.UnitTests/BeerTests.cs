using NUnit.Framework;
using Piwo.Services;
using Piwo.Data;
using Microsoft.EntityFrameworkCore;
using Piwo.Models;




namespace Piwo.UnitTests
{
    [TestFixture]
    public class BeerServiceTests
    {
        private AppDbContext _context;
        private BeerService _service;

        [SetUp]
        public void SetUp()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            _context = new AppDbContext(options);

            _service = new BeerService(_context);
        }

        [Test]
        ///Ten test sprawdza, czy metoda GetAllBeersAsync zwraca wszystkie piwa z bazy danych.
        ///Dodaje trzy piwa do bazy danych, a następnie sprawdza, czy metoda zwraca trzy piwa.
        public async Task GetAllBeersAsync_WhenCalled_ReturnsAllBeers()
        {
            // Arrange
            _context.Beers.AddRange(
                new Beer { Description = "Description1", Image = "Image1", Name = "Name1", Producer = "Producer1" },
                new Beer { Description = "Description2", Image = "Image2", Name = "Name2", Producer = "Producer2" },
                new Beer { Description = "Description3", Image = "Image3", Name = "Name3", Producer = "Producer3" }
            );
            await _context.SaveChangesAsync();

            // Act
            var result = await _service.GetAllBeersAsync();

            // Assert
            Assert.That(result.Count(), Is.EqualTo(3));
        }

        [Test]
        ///Ten test sprawdza, czy metoda GetBeerByIdAsync zwraca null, gdy podany jest nieprawidłowy identyfikator piwa.
        ///Dodaje jedno piwo do bazy danych, a następnie próbuje pobrać piwo o innym identyfikatorze.
        public async Task GetBeerByIdAsync_InvalidId_ReturnsNull()
        {
            // Arrange
            var beer = new Beer { BeerId = 1, Description = "Description", Image = "Image", Name = "Name", Producer = "Producer" };
            _context.Beers.Add(beer);
            await _context.SaveChangesAsync();

            // Act
            var result = await _service.GetBeerByIdAsync(2);

            // Assert
            Assert.That(result, Is.Null);
        }

        [Test]
        ///Ten test sprawdza, czy metoda GetFavouriteBeersAsync zwraca ulubione piwa użytkownika.
        ///Dodaje dwa piwa i dwa ulubione piwa użytkownika do bazy danych, a następnie sprawdza, czy metoda zwraca dwa piwa.
        public async Task GetFavouriteBeersAsync_ValidUserId_ReturnsFavouriteBeers()
        {
            // Arrange
            var beers = new List<Beer>
    {
        new Beer { BeerId = 1, Description = "Description1", Image = "Image1", Name = "Name1", Producer = "Producer1" },
        new Beer { BeerId = 2, Description = "Description2", Image = "Image2", Name = "Name2", Producer = "Producer2" }
    };
            var userBeers = new List<UserBeer>
    {
        new UserBeer { UserId = "1", IsFavourite = true, BeerId = 1 },
        new UserBeer { UserId = "1", IsFavourite = true, BeerId = 2 }
    };
            _context.Beers.AddRange(beers);
            _context.UserBeers.AddRange(userBeers);
            await _context.SaveChangesAsync();

            // Act
            var result = await _service.GetFavouriteBeersAsync("1");

            // Assert
            Assert.That(result.Count(), Is.EqualTo(2));
        }
    }
}
