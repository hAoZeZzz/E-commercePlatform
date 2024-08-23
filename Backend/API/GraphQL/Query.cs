using Core.Entities;
using Infrastructure.Data;
using System.Linq;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Data;
using System;
using Microsoft.EntityFrameworkCore;
using Core.interfaces;

namespace API.GraphQL
{
    public class Query
    {
        [UseFiltering]
        public IQueryable<Customer> GetCustomers([Service] ICustomerService customerService)
        {
            return customerService.GetCustomersAndOrders();
        }

        [UseFiltering]
        public IQueryable<Order> GetOrders([Service] IOrderService orderService)
        {
            return orderService.GetOrders();
        }
    }
}