using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WarThunderForum.Models;
using WarThunderForum.Services;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddSession();
builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<WarThunderContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("DefaultConnection")
));

builder.Services.AddTransient<ForumService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

//app.MapFallbackToFile("index.html");

app.Run();

