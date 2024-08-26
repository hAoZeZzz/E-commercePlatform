import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Customer, useGetCustomersByIdQuery } from '../../../graphql/schema';
import OMLoading from '../../../components/elements/OMLoading';
import OMAlert from '../../../components/elements/OMAlert';
import { Container, Grid, Typography } from '@mui/material';
import CustomerForm from '../customersForm/CustomerForm';

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

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <Typography component='div' variant='h5' display='block' gutterBottom align='center'>
                        Customer Details
                    </Typography>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={12}>
                    <CustomerForm customer={customer} />
                </Grid>
            </Grid>
        </Container>
    )
}