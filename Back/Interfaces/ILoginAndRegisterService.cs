using Microsoft.AspNetCore.Identity;
using Piwo.Dtos;

namespace Piwo.Interfaces;

public interface ILoginAndRegisterService
{
    Task CreateRoles();
    Task<IdentityResult> RegisterUserAsync(RegisterDto registerDto);
    Task<TokenDto> LoginUserAsync(LoginDto loginDto);
    
}