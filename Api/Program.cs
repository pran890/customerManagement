using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;

using System.Collections.Generic;
using System.Web.Http.Cors;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("cp",
                      policy  =>
                      {
                          policy.WithOrigins("*").AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//  config.EnableCors();
// Default Policy


app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("cp");
app.MapControllers();


var connectionString = app.Configuration.GetConnectionString("DefaultConnection");

app.Run();
