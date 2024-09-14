using Infrastructure.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using API.GraphQL;
using GraphQL.Server.Ui.Voyager;
using Core.interfaces;
using Infrastructure.Services;
using Core.Entities;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);
var AllowSpecificOrigins = "_allowSpecificOrigins";

// Add services to the container.
builder.Services.AddDbContextFactory<OMAContext>(options => 
{
    options.UseSqlite(builder.Configuration["ConnectionStrings:DefaultConnection"]);
});
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IOrderService, OrderService>();

//GraphQL
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddFiltering();

//CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowSpecificOrigins,
        policy => 
        {
            policy.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddMvc(option => option.EnableEndpointRouting = false);

var app = builder.Build();

app.UseRouting();
app.UseMvc();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors(AllowSpecificOrigins);

app.MapGraphQL();

app.UseGraphQLVoyager("/graphql-voyager", new VoyagerOptions {GraphQLEndPoint = "/graphql"});

app.UseEndpoints(endpoints => 
{
    endpoints.MapFallbackToController("Index", "website");
});

// Migrate Database
try
{
    var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<OMAContext>();
    context.Database.Migrate();
}
catch (System.Exception ex)
{
    var logger = app.Services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}

app.Run();
