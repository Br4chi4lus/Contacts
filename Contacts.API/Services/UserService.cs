using AutoMapper;
using Contacts.API.Entities;
using Contacts.API.Exceptions;
using Contacts.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Contacts.API.Services
{
    public class UserService : IUserService
    {
        private ContactsDbContext _dbContext;
        private IPasswordHasher<User> _passwordHasher;
        private IMapper _mapper;
        private AuthenticationSettings _authenticationSettings;
        public UserService(ContactsDbContext dbContext, IPasswordHasher<User> passwordHasher, IMapper mapper, AuthenticationSettings authenticationSettings)
        {
            _dbContext = dbContext;
            _passwordHasher = passwordHasher;
            _mapper = mapper;
            _authenticationSettings = authenticationSettings;
        }

        public async Task<UserDto> RegisterUser(RegisterUserDto dto)
        {
            var user = new User()
            {
                Email = dto.Email,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                PhoneNumber = dto.PhoneNumber,
                DateOfBirth = dto.DateOfBirth,
            };

            var passwordHash = _passwordHasher.HashPassword(user, dto.Password);
            user.PasswordHash = passwordHash;
            await _dbContext.User.AddAsync(user);
            await _dbContext.SaveChangesAsync();

            var userDto = _mapper.Map<UserDto>(user);
            return userDto;
        }

        public async Task<IEnumerable<UserDto>> GetAllUsers()
        {
            var users = await _dbContext.User.ToListAsync();
            var userDtos = _mapper.Map<List<UserDto>>(users);

            return userDtos;
        }

        public async Task<UserDto> GetUserById(int id)
        {
            var user = await _dbContext.User.FirstOrDefaultAsync(u => u.Id == id);

            if (user is null)
                throw new NotFoundException("User with given Id was not found.");

            var userDto = _mapper.Map<UserDto>(user);

            return userDto;
        }

        public async Task<string> LoginUser(LoginUserDto dto)
        {
            var user = await _dbContext.User.FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user is null)
                throw new BadRequestException("Invalid password or email.");

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);

            if (result == PasswordVerificationResult.Failed)
                throw new BadRequestException("Invalid password or email.");

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddMinutes(_authenticationSettings.JwtExpireMinutes);
            var token = new JwtSecurityToken(
                _authenticationSettings.JwtIssuer,
                _authenticationSettings.JwtIssuer,
                claims,
                expires: expires,
                signingCredentials: cred
                );

            var tokenHandler = new JwtSecurityTokenHandler();
            
            return tokenHandler.WriteToken(token);
        }
    }

    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllUsers();
        Task<UserDto> RegisterUser(RegisterUserDto dto);
        Task<UserDto> GetUserById(int id);
        Task<string> LoginUser(LoginUserDto dto);
    }
}
