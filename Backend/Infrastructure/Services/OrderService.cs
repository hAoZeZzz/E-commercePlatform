using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IDbContextFactory<OMAContext> _contextFactory;

        public OrderService(IDbContextFactory<OMAContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public IQueryable<Order> GetOrders()
        {
            var context = _contextFactory.CreateDbContext();
            context.Database.EnsureCreated();

            return context.Orders
                    .Where(o => !o.IsDeleted)
                    .Include(o => o.Customer);
        }
    }
}