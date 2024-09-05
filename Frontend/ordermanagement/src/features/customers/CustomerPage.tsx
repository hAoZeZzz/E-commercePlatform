import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Customer, Order, useGetCustomersByIdQuery } from '../../graphql/schema';
import OMLoading from '../../components/elements/OMLoading';
import OMAlert from '../../components/elements/OMAlert';
import { Button, Container, Grid } from '@mui/material';
import CustomerForm from './customersForm/CustomerForm';
import OMHeader from '../../components/elements/OMHeader';
import OrderList from '../orders/ordersDashboard/OrderList';

export default function CustomerPage() {
    const params = useParams();
    const customerId = parseInt(params.customerId || '0');
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const {data: customerData, loading: customerLoading, error: customerError} = useGetCustomersByIdQuery({
        variables: {
            id: customerId
        }
    });

    if (customerLoading) {
        return <OMLoading />;
    }

    if (customerError || !customerData || !customerData.customers) {
        return <OMAlert message='Error of retreiving customer data'/>;
    }
    
    const customer = customerData.customers[0] as Customer;
    const customerOrders = customer.orders as Order[];

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <OMHeader header="Customer Details" />
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={12}>
                    <CustomerForm customer={customer} />
                </Grid>
                <Grid item xs={12}>
                    <OMHeader header="Customer Orders" />
                </Grid>
                <Grid item xs={12}>
                    <OrderList orders={customerOrders} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' fullWidth={true} href={`/customers/${customer.id}/neworder`}>
                        Add New Order
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}