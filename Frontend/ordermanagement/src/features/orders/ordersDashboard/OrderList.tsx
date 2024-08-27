import React, { useState} from "react";
import { Order, Customer } from "../../../graphql/schema";
import OMGrid from "../../../components/elements/OMGrid";
import { IconButton } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

interface OrderListProps {
    orders: Order[]
}

export default function OrderList({orders}: OrderListProps) {
    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'id',
            width: 50,
            SuppressedSizeToFit: true,
            cellRenderer: function(params: any) {
                return (
                    <IconButton onClick={() => window.open(`/orders/${params.value}`, "_black")}>
                        <LaunchIcon fontSize="small" color="secondary" />
                    </IconButton>
                );
            }
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