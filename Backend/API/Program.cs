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

var builder = WebApplication.CreateBuilder(args);
var AllowSpecificOrigins = "_allowSpecificOrigins";

// Add services to the container.
builder.Services.AddDbContextFactory<OMAContext>(options => 
{
    options.UseInMemoryDatabase("InMemoryDb");
});
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IOrderService, OrderService>();

//GraphQL
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
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

var app = builder.Build();

app.UseCors(AllowSpecificOrigins);

app.MapGraphQL();

app.UseGraphQLVoyager("/graphql-voyager", new VoyagerOptions {GraphQLEndPoint = "/graphql"});

app.Run();
