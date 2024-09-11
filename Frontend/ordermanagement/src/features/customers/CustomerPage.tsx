import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Customer, Order, useGetCustomersByIdQuery, useDeleteCustomerMutation } from '../../graphql/schema';
import OMLoading from '../../components/elements/OMLoading';
import OMAlert from '../../components/elements/OMAlert';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import CustomerForm from './customersForm/CustomerForm';
import OMHeader from '../../components/elements/OMHeader';
import OrderList from '../orders/ordersDashboard/OrderList';
import Delete from '@mui/icons-material/Delete';

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

    const [deleteCustomer, {loading:deleteCustomerLoading, error:deleteCustomerError}] = useDeleteCustomerMutation();

    async function deleteCustomerDetails() {
        const response = await deleteCustomer({
            variables:{
                id: customerId
            }
        });

        if(!response.errors) {
            navigate('/customers');
        }
    }

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    if (customerLoading || deleteCustomerLoading) {
        return <OMLoading />;
    }

    if (customerError || !customerData || !customerData.customers) {
        return <OMAlert message='Error of retreiving customer data'/>;
    }

    if (deleteCustomerError) {
        return <OMAlert message='Error of deleting customer data'/>;
    }
    
    const customer = customerData.customers[0] as Customer;
    const customerOrders = customer.orders as Order[];

    return (
        <Container>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Customer Details?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You are about to remove this customer and all related orders. Confirm to continue or cancel
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={deleteCustomerDetails} color='error' autoFocus>Delete</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <OMHeader header="Customer Details" />
                </Grid>
                <Grid item xs={2}>
                    <Button variant='outlined' color="error" startIcon={<Delete />} onClick={handleClickOpen}>
                        Delete
                    </Button>
                </Grid>
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