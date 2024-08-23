using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.interfaces
{
    public interface IOrderService
    {
        IQueryable<Order> GetOrders();
    }
}