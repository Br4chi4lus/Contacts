
using Contacts.API.Exceptions;

namespace Contacts.API.Middleware
{
    public class ErrorHandlingMiddleware : IMiddleware
    {
        public ErrorHandlingMiddleware()
        {
            
        }
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next.Invoke(context);
            }
            catch (NotFoundException ex)
            {
                context.Response.StatusCode = 404;
                await context.Response.WriteAsync(ex.Message);
            }
            catch (BadRequestException ex)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync(ex.Message);
            }
            catch (ForbidenException ex)
            {
                context.Response.StatusCode = 403;
            }
            catch (UnathorizedException ex) 
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync(ex.Message);
            }
        }
    }
}
