import React, { useState} from "react";
import { Order, Customer } from "../../../graphql/schema";
import OMGrid from "../../../components/elements/OMGrid";

interface OrderListProps {
    orders: Order[]
}

export default function OrderList({orders}: OrderListProps) {
    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'id',
            width: 50,
            SuppressedSizeToFit: true
        }, 
        {
            field:'customer',
            cellRenderer: function(params: any) {
                const customer = params.value as Customer;
                return customer.firstName + " " + customer.lastName;
            }
        },
        {
            field:'orderDate'
        },
        {
            field:'status'
        },
    ])

    return (
        <OMGrid rowData={orders} columnDefs={columnDefs} />
    )
}