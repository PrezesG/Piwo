using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using NUnit.Framework;
using Piwo.Data;
using Piwo.Dtos;
using Piwo.Services;
using Piwo.Models;
using Microsoft.Extensions.Logging;
using Castle.Components.DictionaryAdapter.Xml;
using NUnit.Framework.Internal;
using System;

namespace Piwo.UnitTests
{
    [TestFixture]
    public class RegisterTests
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
            var roleStore = new RoleStore<IdentityRole>(context);

            var userValidators = new List<IUserValidator<User>>();
            var passwordValidators = new List<IPasswordValidator<User>>();

            userValidators.Add(new UserValidator<User>());
            passwordValidators.Add(new PasswordValidator<User>());

            var hasher = new PasswordHasher<User>();
            var logger = Mock.Of<ILogger<UserManager<User>>>();

            _userManager = new UserManager<User>(userStore, null, hasher, userValidators, passwordValidators, new UpperInvariantLookupNormalizer(), new IdentityErrorDescriber(), null, logger);

            _roleManager = new RoleManager<IdentityRole>(roleStore, new List<IRoleValidator<IdentityRole>> { new RoleValidator<IdentityRole>() }, new UpperInvariantLookupNormalizer(), new IdentityErrorDescriber(), Mock.Of<ILogger<RoleManager<IdentityRole>>>());

            _configuration = new ConfigurationBuilder().Build();

            _service = new LoginAndRegisterService(_roleManager, _userManager, _configuration);
        }

        [Test]
        
        ///Ten test sprawdza, czy metoda RegisterUserAsync zwraca niepowodzenie, gdy próbujemy zarejestrować użytkownika, który już istnieje.
        ///Najpierw dodaje użytkownika do bazy danych, a następnie próbuje zarejestrować użytkownika o tym samym adresie e-mail.
        public async Task RegisterUserAsync_UserExists_ReturnsFailedResult()
        {
            // Arrange
            var registerDto = new RegisterDto { Email = "test@test.com", Password = "Test1234" };
            var user = new User { UserName = registerDto.Email, Email = registerDto.Email };
            await _userManager.CreateAsync(user, registerDto.Password);

            // Act
            var result = await _service.RegisterUserAsync(registerDto);

            // Assert
            Assert.That(result.Succeeded, Is.False);
        }
        /// Ten test sprawdza, czy metoda RegisterUserAsync zwraca niepowodzenie, gdy hasło jest za krótkie.
        /// Próbuje zarejestrować użytkownika z hasłem, które ma mniej niż 6 znaków.
        
        [Test]
        public async Task RegisterUserAsync_PasswordTooShort_ReturnsFailedResult()
        {
            // Arrange
            var registerDto = new RegisterDto { Email = "test@test.com", Password = "123" };

            // Act
            var result = await _service.RegisterUserAsync(registerDto);

            // Assert
            Assert.That(result.Succeeded, Is.False);
        }

    }
}
