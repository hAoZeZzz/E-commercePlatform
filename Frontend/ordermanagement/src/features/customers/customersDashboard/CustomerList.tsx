import React, {useState, useMemo} from "react";
import { Address, Customer } from "../../../graphql/schema";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface CustomerListProps {
    customers: Customer[]
}

export default function CustomerList({customers}: CustomerListProps) {
    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'id',
            width: 50,
            SuppressedSizeToFit: true
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

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true
    }), []);

    return (
        <div style={{height: 500, width: '100%'}} className="ag-theme-alpine">
            <AgGridReact 
                rowData={customers}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
            />
        </div>
    )
}