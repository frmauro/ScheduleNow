using Microsoft.AspNetCore.Http;
using System.Net;
using System.Text.Json;

namespace Scheduling.Api.Middlewares;

public class ExceptionMiddleware(RequestDelegate next)
{
    private readonly RequestDelegate _next = next;

    public async Task InvokeAsync(HttpContext httpContext)
    {
        try
        {
            await _next(httpContext);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(httpContext, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        // Simplify for MVP
        if (exception is ArgumentException || exception is InvalidOperationException || exception.Message.Contains("Invalid") || exception.Message.Contains("use"))
        {
            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
        }

        var response = new
        {
            context.Response.StatusCode,
            Message = exception.Message,
            Detailed = exception.StackTrace // For dev environment only usually
        };

        return context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }
}
