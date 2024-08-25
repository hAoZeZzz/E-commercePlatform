import React, { useState, useMemo } from "react";
import { Order, Customer } from "../../../graphql/schema";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

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

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true
    }), []);

    return (
        <div style={{height: 500, width: '100%'}} className="ag-theme-alpine">
            <AgGridReact 
                rowData={orders}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
            />
        </div>
    )
}