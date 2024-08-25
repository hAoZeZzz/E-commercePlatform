import React from "react";
import { Order, useGetOrdersQuery } from "../../../graphql/schema";
import { Grid, Typography } from "@mui/material";
import OrderList from "./OrderList";
import OMLoading from "../../../components/elements/OMLoading";
import OMAlert from "../../../components/elements/OMAlert";

export default function OrderDashboard() {
    const {data:ordersData, loading, error} = useGetOrdersQuery();

    if (loading) {
        return <OMLoading />
    }

    if (error || !ordersData) {
        return <OMAlert message={"Coule not Find Information about Orders"} />
    }
    const orders = ordersData.orders as Order[]
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography component='div' variant="h5" display='block' gutterBottom align='center'>
                    Orders List
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <OrderList orders={orders} />
            </Grid>
        </Grid>
    )
}