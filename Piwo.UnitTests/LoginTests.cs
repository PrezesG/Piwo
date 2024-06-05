using Moq;
using NUnit.Framework;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Piwo.Services;
using Piwo.Dtos;
using Piwo.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Piwo.Data;

namespace Piwo.UnitTests
{
    [TestFixture]
    public class LoginAndRegisterServiceTests
    {
        private UserManager<User> _userManager;
        private RoleManager<IdentityRole> _roleManager;
        private IConfiguration _configuration;
        private LoginAndRegisterService _service;

        [SetUp]
        public void SetUp()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            var context = new AppDbContext(options);

            var userStore = new UserStore<User>(context);
            _userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);

            var roleStore = new RoleStore<IdentityRole>(context);
            _roleManager = new RoleManager<IdentityRole>(roleStore, null, null, null, null);

            _configuration = new ConfigurationBuilder().Build();

            _service = new LoginAndRegisterService(_roleManager, _userManager, _configuration);
        }
        //Ten test sprawdza, czy metoda LoginUserAsync rzuca wyjątek UnauthorizedAccessException, gdy podane są nieprawidłowe dane uwierzytelniające.
        //Próbuje zalogować się z nieistniejącym adresem e-mail.
        [Test]
        public void LoginUserAsync_InvalidCredentials_ThrowsUnauthorizedAccessException()
        {
            // Arrange
            var loginDto = new LoginDto { Email = "test@test.com", Password = "Test1234" };

            // Act & Assert
            Assert.ThrowsAsync<UnauthorizedAccessException>(async () => await _service.LoginUserAsync(loginDto));
        }

    }
}





