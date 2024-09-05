import React from "react";
import { Container, Grid } from "@mui/material";
import OMHeader from "../../components/elements/OMHeader";
import { useParams } from "react-router-dom";
import { Order } from "../../graphql/schema";
import OrderForm from "./ordersForm/OrderForm";

export default function NewOrderPage() {
    const params = useParams();
    const customerId = parseInt(params.customerId || "0");

    const order ={
        customerId: customerId
    } as Order;

    return(
        <Container>
            <Grid item spacing={12}>
                <Grid item xs={12}>
                    <OMHeader header={"New Order Details"} />
                </Grid>
                <Grid item xs={12}>
                    <OrderForm order={order} />
                </Grid>
            </Grid>
        </Container>
    )
}