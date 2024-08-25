import React from "react";
import { Customer, useGetCustomersQuery } from "../../../graphql/schema";
import { Grid, Typography } from "@mui/material";
import CustomerList from "./CustomerList";
import OMLoading from "../../../components/elements/OMLoading";
import OMAlert from "../../../components/elements/OMAlert";

export default function CustomersDashboard() {
    const {data:customerData, loading, error} = useGetCustomersQuery();

    if (loading) {
        return <OMLoading />
    }

    if (error || !customerData) {
        return <OMAlert message={"Coule not Find Information about Customers"} />
    }
    const customers = customerData.customers as Customer[]
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography component='div' variant="h5" display='block' gutterBottom align='center'>
                    Customers List
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <CustomerList customers={customers} />
            </Grid>
        </Grid>
    )
}