import React, { useState } from "react";
import { Address, Customer } from "../../../graphql/schema";
import OMGrid from "../../../components/elements/OMGrid";
import { IconButton } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

interface CustomerListProps {
    customers: Customer[]
}

export default function CustomerList({customers}: CustomerListProps) {
    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'id',
            width: 50,
            SuppressedSizeToFit: true,
            cellRenderer: function(params: any) {
                return (
                    <IconButton onClick={() => window.open(`/customers/${params.value}`, "_black")}>
                        <LaunchIcon fontSize="small" color="secondary" />
                    </IconButton>
                );
            }
        }, 
        {field:'firstName'},
        {field:'lastName'},
        {field:'contactNumber'},
        {field:'email'},
        {
            field:'address',
            cellRenderer: function(params: any) {
                const address = params.value as Address
                return address.addressLine1 
                        + ', ' + address.addressLine2
                        + ', ' + address.city
                        + ', ' + address.state
                        + ', ' + address.country
            }
        }
    ])
    return (
        <OMGrid rowData={customers} columnDefs={columnDefs}/>
    )
}