import React, { useMemo} from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface OMGridProps {
    rowData: any
    columnDefs: any
}

export default function OMGrid({rowData, columnDefs}: OMGridProps) {
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true
    }), []);

    return (
        <div style={{height: 500, width: '100%'}} className="ag-theme-alpine">
            <AgGridReact 
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
            />
        </div>
    )
}