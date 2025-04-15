using System.Security.Claims;

namespace Contacts.API.Services
{
    public class UserContextService : IUserContextService
    {
        private IHttpContextAccessor _contextAccessor;
        public UserContextService(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

        public ClaimsPrincipal User => _contextAccessor.HttpContext?.User;
        public int? GetUserId => User is null ? null : int.Parse(User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier).Value);
    }
    public interface IUserContextService
    {
        int? GetUserId { get; }
        ClaimsPrincipal User { get; }
    }
}
