using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Core.Entities;
using Core.Enums;

namespace Infrastructure.Data
{
    public class OMAContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public OMAContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {{
            modelBuilder.Entity<Customer>().HasData(
                new Customer
                {
                    Id = 1,
                    FirstName = "Haoze",
                    LastName = "Zhang",
                    ContactNumber = "0478240111",
                    Email = "haoze883@gmail.com",
                    IsDeleted = false
                },
                new Customer
                {
                    Id = 2,
                    FirstName = "Melody",
                    LastName = "Yuan",
                    ContactNumber = "0423219000",
                    Email = "yyuan219098@gmail.com",
                    IsDeleted = false
                }
            );

            modelBuilder.Entity<Address>().HasData(
                new Address
                {
                    Id = 1,
                    CustomerId = 1,
                    AddressLine1 = "Bunmarra St",
                    AddressLine2 = "There",
                    City = "Syd",
                    State = "NSW",
                    Country = "AU"
                },
                new Address
                {
                    Id = 2,
                    CustomerId = 2,
                    AddressLine1 = "Epsom St",
                    AddressLine2 = "Here",
                    City = "Syd",
                    State = "NSW",
                    Country = "AU"
                }
            );

            modelBuilder.Entity<Order>().HasData(
                new Order
                {
                    Id = 1,
                    CustomerId = 1,
                    OrderDate = new DateTime(2024, 8, 19),
                    Description = "New",
                    TotalAmount = 500,
                    DepositAmount = 10,
                    IsDelivery = true,
                    Status = Status.PENDING,
                    OtherNotes = "Something",
                    IsDeleted = false
                },
                new Order
                {
                    Id = 2,
                    CustomerId = 2,
                    OrderDate = new DateTime(2024, 9, 1),
                    Description = "Old",
                    TotalAmount = 450,
                    DepositAmount = 20,
                    IsDelivery = true,
                    Status = Status.DRAFT,
                    OtherNotes = "Something Old",
                    IsDeleted = false
                }
            );
        }}
    }
}