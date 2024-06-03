using Microsoft.AspNetCore.Identity;
using Piwo.Dtos;

namespace Piwo.Interfaces;

    public interface IMemberService
    {
        Task<MemberDto> GetMemberInfoAsync(string userId);
        Task<IdentityResult> UpdateMemberInfoAsync(string userId, MemberDto memberDto);
    }