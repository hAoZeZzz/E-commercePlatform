import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Customer, Order, useGetOrdersByIdQuery } from '../../../graphql/schema';
import OMLoading from '../../../components/elements/OMLoading';
import OMAlert from '../../../components/elements/OMAlert';
import { Container, Grid } from '@mui/material';
import OrderFrom from '../ordersForm/OrderForm';
import OMHeader from '../../../components/elements/OMHeader';

export default function OrderPage() {
    const params = useParams();
    const orderId = parseInt(params.orderId || '0');
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const {data: orderData, loading: orderLoading, error: orderError} = useGetOrdersByIdQuery({
        variables: {
            id: orderId
        }
    });

    if (orderLoading) {
        return <OMLoading />
    }
    
    if (orderError || !orderData || !orderData.orders) {
        return <OMAlert message='Error retreiving order data' />
    }

    const order = orderData.orders[0] as Order;
    const customer = order.customer as Customer;

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <OMHeader header="Order Details" />
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={12}>
                    <OrderFrom order={order} />
                </Grid>
            </Grid>
        </Container>
    )
}